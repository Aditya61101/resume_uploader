from django.urls import path
from .views import ProfileList, ProfileCreate

urlpatterns = [
    path('resumes',ProfileList.as_view(), name='profile-list'),
    path('resume-upload', ProfileCreate.as_view(), name='profile-create')
]