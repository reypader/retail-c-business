from django_filters.rest_framework import DjangoFilterBackend

from ordinances.models import SubRegion, City, Region
from ordinances.serializers import UserSerializer, SubRegionSerializer, CitySerializer, RegionSerializer
from django.contrib.auth.models import User
from rest_framework import viewsets


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_object(self):
        pk = self.kwargs.get('pk')

        if pk == "current":
            return self.request.user

        return super(UserViewSet, self).get_object()


class RegionViewSet(viewsets.ModelViewSet):
    queryset = Region.objects.all()
    serializer_class = RegionSerializer


class SubRegionViewSet(viewsets.ModelViewSet):
    queryset = SubRegion.objects.all()
    serializer_class = SubRegionSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('region__id',)


class CityViewSet(viewsets.ModelViewSet):
    queryset = City.objects.all()
    serializer_class = CitySerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('subregion__id', 'region__id',)
