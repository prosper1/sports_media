# Generated by Django 2.2.4 on 2019-10-16 10:54

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='SubscriptionPrices',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=20)),
                ('value', models.FloatField(default=0.0)),
            ],
        ),
        migrations.CreateModel(
            name='Tax',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=10)),
                ('value', models.FloatField(default=0.01)),
            ],
        ),
    ]
