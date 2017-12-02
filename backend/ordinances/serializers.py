from rest_framework import serializers
from django.contrib.auth.models import User

from ordinances.models import SubRegion, City, Region


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email')


class RegionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Region
        fields = '__all__'


class SubRegionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = SubRegion
        fields = '__all__'


class CitySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = City
        fields = '__all__'
