
from rest_framework.generics import ListAPIView, CreateAPIView
from .models import Profile
from .serializers import ProfileSerializer

# Create your views here.
class ProfileList(ListAPIView):
    queryset=Profile.objects.all()
    serializer_class=ProfileSerializer

class ProfileCreate(CreateAPIView):
    queryset=Profile.objects.all()
    serializer_class=ProfileSerializer