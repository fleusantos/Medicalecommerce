# Generated by Django 3.0.8 on 2020-08-20 03:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('mr_tracker', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='locationofdoctor',
            name='order_id',
        ),
    ]