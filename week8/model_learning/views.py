from django.shortcuts import render
from rest_framework import routers, serializers, viewsets
from model_learning.serializers import UserSerializer
from django.contrib.auth.models import User
from model_learning.serializers import PostSerializer, LikeSerializer, CommentSerializer
from model_learning.models import Post, Like, Comment

# ViewSets for Models


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class LikeViewSet(viewsets.ModelViewSet):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
