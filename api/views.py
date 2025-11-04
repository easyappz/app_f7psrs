from django.utils import timezone
from django.utils.dateparse import parse_datetime
from drf_spectacular.utils import extend_schema, OpenApiParameter
from drf_spectacular.types import OpenApiTypes
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import ValidationError
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import ChatMessage
from .serializers import (
    MessageSerializer,
    RegisterSerializer,
    UserSerializer,
    ChatMessageSerializer,
)


class HelloView(APIView):
    """
    A simple API endpoint that returns a greeting message.
    """

    @extend_schema(
        responses={200: MessageSerializer}, description="Get a hello world message"
    )
    def get(self, request):
        data = {"message": "Hello!", "timestamp": timezone.now()}
        serializer = MessageSerializer(data)
        return Response(serializer.data)


class RegisterView(APIView):
    authentication_classes: list = []
    permission_classes: list = []

    @extend_schema(
        description="Register a new user. Returns JWT tokens and user info.",
        request=RegisterSerializer,
        responses={201: OpenApiTypes.OBJECT},
    )
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        data = {
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "user": UserSerializer(user).data,
        }
        return Response(data, status=status.HTTP_201_CREATED)


class LoginView(TokenObtainPairView):
    authentication_classes: list = []
    permission_classes: list = []

    @extend_schema(
        description="Login with username and password. Returns JWT tokens and user info.",
        request=OpenApiTypes.OBJECT,
        responses={200: OpenApiTypes.OBJECT},
    )
    def post(self, request, *args, **kwargs):  # type: ignore[override]
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        tokens = serializer.validated_data
        user = serializer.user
        data = {
            "access": tokens["access"],
            "refresh": tokens["refresh"],
            "user": UserSerializer(user).data,
        }
        return Response(data, status=status.HTTP_200_OK)


class MeView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    @extend_schema(
        description="Get current authenticated user info.",
        responses={200: UserSerializer},
    )
    def get(self, request):
        return Response(UserSerializer(request.user).data)


class ChatMessageListCreateView(generics.ListCreateAPIView):
    queryset = ChatMessage.objects.select_related("author", "author__profile")
    serializer_class = ChatMessageSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        qs = super().get_queryset()
        after_id = self.request.query_params.get("after_id")
        after_ts = self.request.query_params.get("after_ts")
        limit_param = self.request.query_params.get("limit")

        if after_id:
            try:
                qs = qs.filter(id__gt=int(after_id))
            except (TypeError, ValueError):
                raise ValidationError({"after_id": "Must be an integer"})

        if after_ts:
            dt = parse_datetime(after_ts)
            if not dt:
                raise ValidationError({"after_ts": "Invalid ISO datetime"})
            if timezone.is_naive(dt):
                dt = timezone.make_aware(dt, timezone.get_current_timezone())
            qs = qs.filter(created_at__gt=dt)

        qs = qs.order_by("created_at")

        try:
            limit = int(limit_param) if limit_param is not None else 50
        except ValueError:
            raise ValidationError({"limit": "Must be an integer"})
        limit = max(1, min(limit, 200))
        return qs[:limit]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    @extend_schema(
        parameters=[
            OpenApiParameter(name="limit", description="Max messages to return (1-200). Default 50.", required=False, type=OpenApiTypes.INT),
            OpenApiParameter(name="after_id", description="Return messages with id greater than this.", required=False, type=OpenApiTypes.INT),
            OpenApiParameter(name="after_ts", description="Return messages created after this ISO timestamp.", required=False, type=OpenApiTypes.DATETIME),
        ],
        responses={200: ChatMessageSerializer(many=True)},
        description="List recent chat messages with optional incremental filters. POST creates a new message.",
    )
    def get(self, request, *args, **kwargs):  # type: ignore[override]
        return super().get(request, *args, **kwargs)

    @extend_schema(
        request=ChatMessageSerializer,
        responses={201: ChatMessageSerializer},
        description="Create a new chat message.",
    )
    def post(self, request, *args, **kwargs):  # type: ignore[override]
        return super().post(request, *args, **kwargs)


class IsAdminOrModerator(permissions.BasePermission):
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        role = getattr(getattr(request.user, "profile", None), "role", "user")
        return role in {"admin", "moderator"}


class ChatMessageDestroyView(generics.DestroyAPIView):
    queryset = ChatMessage.objects.all()
    serializer_class = ChatMessageSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated, IsAdminOrModerator]

    @extend_schema(
        description="Delete a chat message by id (admin/moderator only).",
        responses={204: None},
    )
    def delete(self, request, *args, **kwargs):  # type: ignore[override]
        return super().delete(request, *args, **kwargs)
