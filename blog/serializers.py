from rest_framework import serializers
from .models import Post, Profile, Comments, Prediction


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
            'match_date',
            'actual_score'
        )