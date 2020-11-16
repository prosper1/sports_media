from django.db import models

# Create your models here.

class Tax(models.Model):
    name = models.CharField(max_length=10)
    value = models.FloatField(default=0.01)

    def __str__(self):
        return self.value

class SubscriptionPrices(models.Model):
    name = models.CharField(max_length=20)
    value = models.FloatField(default=0.0)
    description = models.CharField(max_length=100)

    def __str__(self):
        return self.name + '- R' + str(self.value)
