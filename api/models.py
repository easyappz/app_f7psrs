from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Profile(models.Model):
    class Role:
        ADMIN = "admin"
        MODERATOR = "moderator"
        USER = "user"

    ROLE_CHOICES = (
        (Role.ADMIN, "admin"),
        (Role.MODERATOR, "moderator"),
        (Role.USER, "user"),
    )

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    role = models.CharField(max_length=16, choices=ROLE_CHOICES, default=Role.USER)

    def __str__(self) -> str:  # pragma: no cover
        return f"Profile({self.user.username}, {self.role})"


class ChatMessage(models.Model):
    author = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="chat_messages"
    )
    content = models.TextField(max_length=2000)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["created_at"]
        indexes = [models.Index(fields=["created_at"])]

    def __str__(self) -> str:  # pragma: no cover
        return f"{self.author.username}: {self.content[:30]}"
