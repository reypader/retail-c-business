from django_filters.rest_framework import DjangoFilterBackend

from ordinances.models import SubRegion, City, Region, Agenda
from ordinances.serializers import UserSerializer, SubRegionSerializer, CitySerializer, RegionSerializer, \
    AgendaSerializer
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
    queryset = SubRegion.objects.filter(region__id=5332921)
    serializer_class = SubRegionSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('region__id',)


class CityViewSet(viewsets.ModelViewSet):
    queryset = City.objects.filter(region__id=5332921)
    serializer_class = CitySerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('subregion__id', 'region__id',)


class AgendaViewSet(viewsets.ModelViewSet):
    queryset = Agenda.objects.all()
    serializer_class = AgendaSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('city__id',)
