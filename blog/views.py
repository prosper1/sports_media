from django.db.models.query import QuerySet
from django.shortcuts import render, get_object_or_404
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.contrib.auth.models import User
from rest_framework.response import Response
from .models import Post , Category, Comments, Prediction
from rest_framework import serializers
from rest_framework import viewsets, serializers
from rest_framework.authentication import (
	BasicAuthentication,
	TokenAuthentication,
	SessionAuthentication,
)
from values.models import SubscriptionPrices
from .serializers import (
	PostSerializer,
	CommentsSerializer,
	PredictionSerializer,
	CommentAddSerializer,
	UserProfileSerializer,
)
from django_filters.rest_framework import DjangoFilterBackend
from django.utils import timezone
from rest_framework.filters import SearchFilter
from rest_framework.views import APIView


class CommentViewSet(viewsets.ModelViewSet):
	serializer_class = CommentsSerializer
	queryset = Comments.objects.all()
	
	filter_backends = (DjangoFilterBackend, SearchFilter)
	filter_fields = ('user','post')
	http_method_names = ['get']


class MakeCommentViewSet(viewsets.ModelViewSet):
	serializer_class = CommentAddSerializer
	queryset = Comments.objects.all()
	authentication_classes = [
		SessionAuthentication,
		BasicAuthentication,
		TokenAuthentication
		]
	http_method_names = ['post','patch','put']


class PostViewSet(viewsets.ModelViewSet):
	serializer_class = PostSerializer
	queryset = Post.objects.filter(
		published_date__lte=timezone.now(),is_review=False).order_by('-published_date')
	filter_backends = (DjangoFilterBackend, SearchFilter)
	filter_fields = ('author','category')
	search_fields = ['author','discription','title','content']
	http_method_names = ['get']
	

class ReviewViewSet(viewsets.ModelViewSet):
	serializer_class = PostSerializer
	queryset = Post.objects.filter(
		published_date__lte=timezone.now(),is_review=True).order_by('-published_date')
	filter_backends = (DjangoFilterBackend, SearchFilter)
	filter_fields = ('author','category')
	search_fields = ['author','discription','title','content']
	http_method_names = ['get']


class PredictionViewSet(viewsets.ModelViewSet):
	serializer_class = PredictionSerializer
	queryset = Prediction.objects.all()
	filter_backends = (DjangoFilterBackend, SearchFilter)
	filter_fields = ('author','team1','team2')
	search_fields = ['author','team1','team2']
	http_method_names = ['get']


class UserViewSet(APIView):
	serializer_class = UserProfileSerializer
	queryset = User.objects.all()
	authentication_classes = [
		BasicAuthentication,
		SessionAuthentication,
		TokenAuthentication
	]


	def get(self,request,format='none'):
		"""
		Get User Account Content,
		"""
		user = request.user.pk

		user_content = get_object_or_404(User,pk=user)

		data = {
			'id': user_content.pk,
			'username': user_content.username,
			'first_name': user_content.first_name,
			'last_name': user_content.last_name,

		}

		return Response(data=data) 

	