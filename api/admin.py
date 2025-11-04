from django.contrib import admin
from .models import Profile, ChatMessage


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "role")
    list_filter = ("role",)
    search_fields = ("user__username",)


@admin.register(ChatMessage)
class ChatMessageAdmin(admin.ModelAdmin):
    list_display = ("id", "author", "short_content", "created_at")
    list_filter = ("author", "created_at")
    search_fields = ("content", "author__username")
    date_hierarchy = "created_at"

    @admin.display(description="content")
    def short_content(self, obj: ChatMessage) -> str:
        s = obj.content or ""
        return (s[:60] + "…") if len(s) > 60 else s
