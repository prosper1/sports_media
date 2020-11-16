from django.shortcuts import render, get_object_or_404, render_to_response
from django.utils import timezone
from django.http import HttpResponse
from django.views import View
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.contrib.auth.models import User 
from .models import Blog , Category, Comments
from rest_framework import serializers
from rest_framework import viewsets, serializers
from values.models import SubscriptionPrices
from  accounts.models import ExtendedUser
from django.contrib.auth.models import User 


def index(request):
	x=[]
	posts = Blog.objects.filter(published_date__lte=timezone.now()).order_by('-published_date')[:4]
	for post in posts:
		x.append(post.pk)

	blog = Blog.objects.exclude(id__in=x).order_by('-published_date')[:4]

	y=[x[0],x[1],x[0]-2,x[0]-3,x[0]-4,x[0]-5]
	other = Blog.objects.exclude(id__in=y).order_by('-published_date')[:4]
	return render(request, 'blog/index.html', {'posts': posts, 'blog':blog, 'other':other})

def about(request):
	return render(request, 'blog/about.html')

def policy(request):
	return render(request, 'blog/policy.html')

def post_list(request):
	post_list = Blog.objects.filter(published_date__lte=timezone.now()).order_by('-published_date')
	lists = Blog.objects.all()[:3]
	categories = Category.objects.all()[:5]
	page = request.GET.get('page', 1)
	paginator = Paginator(post_list, 8)

	try:
		posts = paginator.page(page)
	except PageNotAnInteger:
		posts = paginator.page(1)
	except EmptyPage:
		posts = paginator.page(paginator.num_pages)

	
	return render(request, 'blog/blog.html', {'posts': posts,'lists': lists, 'categories': categories})

def post_detail(request, pk):
	categories = Category.objects.all()[:5]
	post = get_object_or_404(Blog, pk=pk)
	other = Blog.objects.exclude(pk=post.pk).order_by('-published_date')[:3]
	comments = Comments.objects.filter(blog=post)
	num = comments.__len__()
	user = {}

	if request.user.is_authenticated and post.subscription.all().__len__()>0:
		_user = ExtendedUser.objects.all().filter(user=request.user)

		if _user.__len__() >= 1:
			user = _user.get(user=request.user)
		
			if user.subscription in post.subscription.all():
				return render(request, 'blog/blog-post.html', {'post': post, 'other':other, 'categories':categories, 'comments': comments, 'num' : num})
		
		return render(request, 'blog/subscribe.html', {'msg':post.subscription.all(),'other':other, 'categories':categories, 'num' : num})
	
	elif post.subscription.all().__len__()==0:
		return render(request, 'blog/blog-post.html', {'post': post, 'other':other, 'categories':categories, 'comments': comments, 'num' : num})

	else:
		return render(request, 'blog/subscribe.html', {'msg':post.subscription.all(),'other':other, 'categories':categories, 'num' : num})
	

	# else:
	# 	return render(request, 'blog/subscribe.html', {'msg':post.subscription.all(),'other':other, 'categories':categories, 'num' : num})

	

def lazy_load_posts(request):
	page = request.POST.get('page')
	posts = Blog.objects.filter(published_date__lte=timezone.now()).order_by('-published_date')[:5] # get just 5 posts

	results_per_page = 5
	paginator = Paginator(posts, results_per_page)
	try:
		posts = paginator.page(page)
	except PageNotAnInteger:
		posts = paginator.page(2)
	except EmptyPage:
		posts = paginator.page(paginator.num_pages)

	# build a html posts list with the paginated posts
	posts_html = loader.render_to_string('blog/post.html', {'posts': posts})
	output_data = {'post_html': posts_html, 'has_next': posts.has_next()}
	return JsonResponse(output_data)

def category_view(request,name):

    lists = Blog.objects.all()[:3]
    category = get_object_or_404(Category, name=name)
    categories = Category.objects.all()[:5]
    posts = Blog.objects.filter(category=category)[:5]

    return render_to_response('blog/blog.html', {
        'categories': categories,
        'posts': posts,
        'lists':lists
    })


class AdsView(View):
    """Replace pub-0000000000000000 with your own publisher ID"""

    google_ad_req_line  =  "google.com, pub-6581313795321939, DIRECT, f08c47fec0942fa0"

    def get(self, request, *args, **kwargs):
        return HttpResponse(self.google_ad_req_line)

class CommentSerializer(serializers.ModelSerializer):

	class Meta:
		model = Comments
		fields = ('name','emails','content','blog')

class CommentsViewSet(viewsets.ModelViewSet):
    queryset = Comments.objects.all()
    serializer_class = CommentSerializer

