from django.contrib.auth.models import User
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets

from ordinances.models import Consultant, Politician, Attendee
from ordinances.models import SubRegion, City, Region, Agenda, ConsultantCompany
from ordinances.serializers import ConsultantSerializer, PoliticianSerializer, AttendeeSerializer
from ordinances.serializers import UserSerializer, SubRegionSerializer, CitySerializer, RegionSerializer, \
    AgendaSerializer, ConsultantCompanySerializer


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


class ConsultantCompanyViewSet(viewsets.ModelViewSet):
    queryset = ConsultantCompany.objects.all()
    serializer_class = ConsultantCompanySerializer
    page_size = 1000


class ConsultantViewSet(viewsets.ModelViewSet):
    queryset = Consultant.objects.all()
    serializer_class = ConsultantSerializer
    page_size = 1000
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('company__id',)


class PoliticianViewSet(viewsets.ModelViewSet):
    queryset = Politician.objects.all()
    serializer_class = PoliticianSerializer


class AttendeeViewSet(viewsets.ModelViewSet):
    queryset = Attendee.objects.all()
    serializer_class = AttendeeSerializer
