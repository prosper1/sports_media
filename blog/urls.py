from django.conf.urls import url
from django.urls import path, include
from .views import (
    PostViewSet,
    CommentViewSet,
    PredictionViewSet,
    MakeCommentViewSet,
    ReviewViewSet,
)
from rest_framework.routers import DefaultRouter

api = DefaultRouter()
api.register(r'posts', PostViewSet)
api.register(r'comments', CommentViewSet)
api.register(r'prediction', PredictionViewSet)
api.register(r'add-comment', MakeCommentViewSet)
api.register(r'reviews', ReviewViewSet)

urlpatterns = [
    path('', include(api.urls), name='api'),  
]
