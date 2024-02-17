# Generated by Django 5.0.2 on 2024-02-17 06:25

import api.models
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='uploaded_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='profile',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to=api.models.image_file_path),
        ),
        migrations.AlterField(
            model_name='profile',
            name='resume',
            field=models.FileField(upload_to=api.models.resume_file_path),
        ),
    ]
