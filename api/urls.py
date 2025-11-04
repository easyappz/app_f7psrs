from django.urls import path
from .views import (
    HelloView,
    RegisterView,
    LoginView,
    MeView,
    ChatMessageListCreateView,
    ChatMessageDestroyView,
)

urlpatterns = [
    path("hello/", HelloView.as_view(), name="hello"),

    # Auth
    path("auth/register/", RegisterView.as_view(), name="auth-register"),
    path("auth/login/", LoginView.as_view(), name="auth-login"),
    path("auth/me/", MeView.as_view(), name="auth-me"),

    # Chat
    path("chat/messages/", ChatMessageListCreateView.as_view(), name="chat-messages"),
    path("chat/messages/<int:pk>/", ChatMessageDestroyView.as_view(), name="chat-message-delete"),
]
