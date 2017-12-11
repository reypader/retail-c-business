import urllib
from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.relations import HyperlinkedIdentityField
from rest_framework.reverse import reverse

from ordinances.models import SubRegion, City, Region, Agenda, ConsultantCompany


class CustomSerializer(serializers.HyperlinkedModelSerializer):
    def get_field_names(self, declared_fields, info):
        expanded_fields = super(CustomSerializer, self).get_field_names(declared_fields, info)

        if getattr(self.Meta, "extra_fields", None):
            return expanded_fields + self.Meta.extra_fields
        else:
            return expanded_fields


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ("url", "username", "email")


class RegionSerializer(CustomSerializer):
    subregions = serializers.SerializerMethodField()
    cities = serializers.SerializerMethodField()

    class Meta:
        model = Region
        fields = "__all__"
        extra_fields = ["id"]

    def get_subregions(self, obj):
        request = self.context["request"]
        base = reverse("subregion-list", request=request)
        p = urllib.urlencode({"region__id": obj.id})
        result = "{}?{}".format(base, p)
        return result

    def get_cities(self, obj):
        request = self.context["request"]
        base = reverse("city-list", request=request)
        p = urllib.urlencode({"region__id": obj.id})
        result = "{}?{}".format(base, p)
        return result


class SubRegionSerializer(CustomSerializer):
    cities = serializers.SerializerMethodField()

    class Meta:
        model = SubRegion
        fields = "__all__"
        extra_fields = ["id"]

    def get_cities(self, obj):
        request = self.context["request"]
        base = reverse("city-list", request=request)
        p = urllib.urlencode({"subregion__id": obj.id})
        result = "{}?{}".format(base, p)
        return result


class CitySerializer(CustomSerializer):
    agendas = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='agenda-detail'
    )

    class Meta:
        model = City
        fields = "__all__"
        extra_fields = ["id", "agendas", ]


class CityAgendaSerializer(CustomSerializer):
    class Meta:
        model = City
        fields = "__all__"
        extra_fields = ["id"]


class AgendaSerializer(CustomSerializer):
    class Meta:
        model = Agenda
        fields = "__all__"


class ConsultantCompanySerializer(CustomSerializer):
    class Meta:
        model = ConsultantCompany
        fields = "__all__"
