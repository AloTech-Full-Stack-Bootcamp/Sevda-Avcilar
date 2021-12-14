from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from model_learning.views import PostViewSet, LikeViewSet, CommentViewSet
from model_learning.views import UserViewSet

# Showing our viewsets in localhost
router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'posts', PostViewSet)
router.register(r'likes', LikeViewSet)
router.register(r'comments', CommentViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
]
