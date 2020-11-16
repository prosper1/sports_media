from django.contrib import admin
from .models import Tax, SubscriptionPrices

# Register your models here.
admin.site.register(Tax)
admin.site.register(SubscriptionPrices)
