from __future__ import absolute_import
from django.db import models
from django.utils import timezone
from ckeditor_uploader.fields import RichTextUploadingField
from ckeditor.fields import RichTextField
# Create your models here.
import mptt
from mptt.models import MPTTModel, TreeForeignKey
from django.db import models

from ckeditor.fields import RichTextField
from ckeditor_uploader.fields import RichTextUploadingField
from values.models import SubscriptionPrices



class Keywords(models.Model):
    class Meta():
        db_table = 'keywords'
        verbose_name_plural = "keywords"
        verbose_name = "keywords"

    name = models.TextField(max_length=50, unique=True, verbose_name=u'Search')

    def __str__(self):
        return self.name


class Category(MPTTModel):
    class Meta():
        db_table = 'category'
        verbose_name_plural = "categories"
        verbose_name = "category"
        ordering = ('tree_id', 'level')

    name = models.CharField(max_length=150, verbose_name="category")
    parent = TreeForeignKey('self', null=True, blank=True, related_name='children', db_index=True ,on_delete=models.CASCADE)

    class MPTTMeta:
        order_insertion_py = ['name']

    def __str__(self):
        return self.name


mptt.register(Category, order_insertion_by=['name'])


class Inserts(models.Model):
    class Meta:
        db_table = 'vkladki'

    link = models.TextField('text field')
    nazvanie = models.TextField('name')

    def __str__(self):
        return self.link


class Genre(MPTTModel):
    name = models.TextField(max_length=50, unique=True)
    parent = TreeForeignKey('self', null=True, blank=True, related_name='children', db_index=True, on_delete=models.CASCADE)

    class MPTTMeta:
        order_insertion_by = ['name']

class Post(models.Model):

    author = models.ForeignKey('auth.User', on_delete=models.SET_NULL,null=True)
    title = models.CharField('header', max_length=200)
    discription = models.TextField()
    model_pic = models.ImageField(upload_to='pic_folder/', default = 'pic_folder/None/no-img.jpg', verbose_name='blogpics')
    content = RichTextUploadingField()
    created_date = models.DateTimeField(
            default=timezone.now)
    subscription = models.ManyToManyField(SubscriptionPrices, related_name="subscriptions",related_query_name="subscrptions",verbose_name=u'subs',blank=True)
    published_date = models.DateTimeField(
            blank=True, null=True)
    category = TreeForeignKey(Category, blank=True, null=True, related_name='catt', on_delete=models.SET_NULL)
    keywords = models.ManyToManyField(Keywords, related_name="keywordss", related_query_name="keywordss",
                                      verbose_name=u'tagss')
    is_review = models.BooleanField(default=False)

    def publish(self):
        self.published_date = timezone.now()
        self.save()

    def __unicode__(self):
        return self.title

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return "posts/get/%i/" % self.id


class Comments(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.SET_NULL,null=True)
    content = models.TextField()
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    created_date = models.DateTimeField(
            default=timezone.now)

    def __str__(self):
        return self.content[0:70]

class Contact(models.Model):
    name = models.CharField(max_length=20)
    emails = models.CharField(max_length=30)
    content = models.TextField()

class Profile(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.SET_NULL,null=True)
    bio = models.CharField(max_length=140)
    website = models.URLField(max_length=250)
    work_link1 = models.URLField(max_length=250)
    work_link2 = models.URLField(max_length=250)
    category = TreeForeignKey(Category, blank=True, null=True, related_name='categ', on_delete=models.SET_NULL)
    keywords = models.ManyToManyField(Keywords, related_name="kword", related_query_name="kwords",
                                      verbose_name=u'tgs')


class Prediction(models.Model):
    author = models.ForeignKey('auth.User',on_delete=models.CASCADE,null=True)
    introduction = models.CharField(max_length=100)
    team1 = models.CharField(max_length=30)
    team2 = models.CharField(max_length=30)
    goals_halftime = models.CharField(max_length=5)
    goals_fulltime = models.CharField(max_length=5)
    conclusion = models.CharField(max_length=300)
    actual_score = models.CharField(max_length=5,blank=True)
    match_date = models.DateTimeField(null=True)
    created_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.team1 + '-VS-' + self.team2
