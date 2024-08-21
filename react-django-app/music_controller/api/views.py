
from rest_framework import generics
from .serializers import RoomSerializer
from .models import Room

# Create your views here.
# or we can use generics.ListAPIView
class RoomView(generics.CreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer