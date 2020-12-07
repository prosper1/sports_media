from django.shortcuts import render, get_object_or_404
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.contrib.auth.models import User 
from .models import Post , Category, Comments
from rest_framework import serializers
from rest_framework import viewsets, serializers
from rest_framework.authentication import (
	BasicAuthentication,
	TokenAuthentication,
	SessionAuthentication,
)
from values.models import SubscriptionPrices
from .serializers import PostSerializer, CommentsSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter


class CommentViewSet(viewsets.ModelViewSet):
	serializer_class = CommentsSerializer
	queryset = Comments.objects.all()
	authentication_classes = [
		SessionAuthentication,
		BasicAuthentication,
		SessionAuthentication
		]
	filter_backends = (DjangoFilterBackend, SearchFilter)
	filter_fields = ('user','post')


class PostViewSet(viewsets.ModelViewSet):
	serializer_class = PostSerializer
	queryset = Post.objects.all()
	filter_backends = (DjangoFilterBackend, SearchFilter)
	filter_fields = ('author','category')
	search_fields = ['author','discription','title','content']
	http_method_names = ['get']
	

