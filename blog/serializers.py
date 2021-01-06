from rest_framework import serializers
from .models import Post, Profile, Comments, Prediction
from django.contrib.auth.models import User


class PostSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField(many=False)
    category = serializers.StringRelatedField(many=False)
    keywords = serializers.StringRelatedField(many=True)

    class Meta:
        model = Post
        fields = (
            'id',
            'author',
            'title',
            'discription',
            'model_pic',
            'content',
            'created_date',
            'subscription',
            'published_date',
            'category',
            'keywords',
        )


class CommentsSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(many=False)

    class Meta:
        model = Comments
        fields = (
            'user',
            'content',
            'post',
            'created_date'
        )


class CommentAddSerializer(serializers.ModelSerializer):
    """
    Created to for post purpose since user_id is needed -
    and Comment Serializer is stringed user.
    """

    class Meta:
        model = Comments
        fields = (
            'user',
            'content',
            'post',
            'created_date'
        )

class PredictionSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField(many=False)

    class Meta:
        model = Prediction 
        fields = (
            'id',
            'author',
            'introduction',
            'team1',
            'team2',
            'goals_halftime',
            'goals_fulltime',
            'conclusion',
            'match_date',
            'actual_score'
        )


class UserProfileSerializer(serializers.ModelSerializer):

    class Meta:
        models = User
        fields = (
            'id',
            'username',
            'first_name',
            'last_name',
            'email',
        )