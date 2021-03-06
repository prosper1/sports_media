from mptt.admin import MPTTModelAdmin
from django.contrib import admin
from .models import *
from ckeditor.fields import RichTextField

class BlogAdmin(admin.ModelAdmin):
    body = RichTextField()
    filter = ( 'title')
    search_fields = ['title']
    list_display = ['title','author','published_date']
    list_filter = ['created_date']
    
    class Meta:
        model = Post


class CategoryAdmin(admin.ModelAdmin):
    fields = ['name', 'parent']
    list_display = ['name', 'parent']


class KeywordsAdmin(admin.ModelAdmin):
    fields = ['name']


class InsertsAdmin(admin.ModelAdmin):
    field = ['nazvanie']


class PredictionAdmin(admin.ModelAdmin):
    body = RichTextField()
    filter = ( 'author','team1','team2')
    search_fields = ['team1','team2']
    list_display = ['team1','team2','goals_fulltime','match_date']
    list_filter = ['created_date']
    
    class Meta:
        model = Prediction


admin.site.register(Post, BlogAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Keywords, KeywordsAdmin)
admin.site.register(Inserts, InsertsAdmin)
admin.site.register(Comments)
admin.site.register(Prediction,PredictionAdmin)

