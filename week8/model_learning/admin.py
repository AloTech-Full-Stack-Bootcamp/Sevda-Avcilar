from django.contrib import admin
from . import models


# Comment'ler admin panelinde değil,post altında gözükür
# TabularInline, Comment'lerin nasıl gözükmesi gerektiğini ayarlamak için bir özellik
class CommentInline(admin.TabularInline):
    model = models.Comment
    # Altta boş gözüken yorum satırlarını kapamak için
    extra = 0
    # Yorumların content ve user'larını değiştirmemizi engeller
    readonly_fields = ('user', 'content')
    # Yorumu silemez hale getirir.
    can_delete = False

    # Yeni bir comment eklememizi engeller.
    def has_add_permission(self, request, obj):
        return False


# Comment'ler admin panelinde değil,post altında gözükür
# TabularInline, Comment'lerin nasıl gözükmesi gerektiğini ayarlamak için bir özellik
class LikeInline(admin.TabularInline):
    model = models.Like
    # Altta boş gözüken yorum satırlarını kapamak için
    extra = 0
    # Yorumların content ve user'larını değiştirmemizi engeller
    readonly_field = ('user')
    # Yorumu silemez hale getirir.
    can_delete = False

    # Yeni bir comment eklememizi engeller.
    def has_add_permission(self, request, obj):
        return False


@admin.register(models.Post)
class PostAdmin(admin.ModelAdmin):
    # list_display:Admin panelinde nasıl gösterileceğini belirtmemize yardımcı olur.
    list_display = ["id", "content", "author",
                    "created_at", "like_comment_values"]
    # list_filter:Post listesinin sağına kategoriler açar.Author ve created_at kategorisini açtık.
    list_filter = ["author", "created_at"]
    # search_field: Post listesinin üstüne bir arama bölümü açar. Özelliklere göre arama yapılabilir.
    # Author attribute'unun içindeki username'e ulaşmak için iki alt çizgi kullanılmalı.
    search_fields = ["content", "author__username"]
    # User'lar arasında arama yapmamıza yardımcı olur, post'u koyarken.
    autocomplete_fields = ["author"]
    # Post altına comment'leri koymak için inlines kullanılır.
    inlines = [LikeInline, CommentInline]

    def like_comment_values(self, post):
        return f"{post.like_count} / {post.comment_count}"


@admin.register(models.Like)
class LikeAdmin(admin.ModelAdmin):
    list_display = ["post", "user"]
    # ??Neden post__content ve user__username yapmadık?
