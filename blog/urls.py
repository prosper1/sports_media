from django.conf.urls import url
from django.urls import path, include
from .views import PostViewSet, CommentViewSet
from rest_framework.routers import DefaultRouter

api = DefaultRouter()
api.register(r'posts',PostViewSet)
api.register(r'comments',CommentViewSet)

urlpatterns = [
    path('', include(api.urls), name='api'),  
]
