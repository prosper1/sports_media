from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^blog/', views.post_list, name='post_list'),
    url(r'^lazy_load_posts/', views.lazy_load_posts, name='lazy_load_posts'),
    url(r'^post/(?P<pk>\d+)/$', views.post_detail, name='post_detail'),
    url(r'^category/(?P<name>[^\.]+)', views.category_view, name='category'),
]
