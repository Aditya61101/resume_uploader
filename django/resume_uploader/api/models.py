import os
from django.db import models
from datetime import datetime

def generate_unique_filename(filename, folder):
    ext = filename.split('.')[-1]
    name = filename.split('.')[0]
    date_time_str = datetime.now().strftime("%Y%m%d%H%M%S")
    return os.path.join(folder, f'{name}-{date_time_str}.{ext}')

def resume_file_path(instance, filename):
    return generate_unique_filename(filename, 'resumes')

def image_file_path(instance, filename):
    return generate_unique_filename(filename, 'images')

# Create your models here.
class Profile(models.Model):
    name=models.CharField(max_length=100)
    email=models.EmailField()
    dob=models.DateField()
    state=models.CharField(max_length=100)
    gender=models.CharField(max_length=100)
    location=models.TextField(blank=True, null=True)
    resume=models.FileField(upload_to=resume_file_path)
    image=models.ImageField(upload_to=image_file_path, blank=True, null=True)
    uploaded_at=models.DateTimeField(auto_now_add=True)

    def get_location(self):
        return self.location.split(',') if self.location else []
    
    def __str__(self):
        return self.name