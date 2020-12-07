from rest_framework import serializers
from .models import Post, Profile, Comments, Prediction


class PostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        fields = (
            'author',
            'title',
            'discription',
            'model_pic',
            'content',
            'created_date',
            'subscription',
            'published_date',
            'category'
        )


class CommentsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comments
        fields = (
            'user',
            'content',
            'post',
            'created_date'
        )


class PredictionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Prediction 
        fields = (
            'author',
            'introduction',
            'team1',
            'team2',
            'goals_halftime',
            'goals_fulltime',
            'conclusion',
        )