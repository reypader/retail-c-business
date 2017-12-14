import urllib

from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.reverse import reverse

from ordinances.models import Consultant, Politician, Attendee
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


class AgendaSerializer(CustomSerializer):
    politicians = serializers.SerializerMethodField()

    class Meta:
        model = Agenda
        fields = "__all__"
        extra_fields = ["id", "attendees", ]

    def get_politicians(self, obj):
        request = self.context.get('request')
        return list(
            map(lambda x: request.build_absolute_uri(reverse('politician-detail', kwargs={'pk': x.politician.id})), obj.attendees.all()))


class ConsultantCompanySerializer(CustomSerializer):
    class Meta:
        model = ConsultantCompany
        fields = "__all__"
        extra_fields = ["id", ]


class ConsultantSerializer(CustomSerializer):
    class Meta:
        model = Consultant
        fields = "__all__"
        extra_fields = ["id", ]


class PoliticianSerializer(CustomSerializer):
    subregion_name = serializers.SerializerMethodField()
    city_name = serializers.SerializerMethodField()

    class Meta:
        model = Politician
        fields = "__all__"
        extra_fields = ["id", ]

    def get_subregion_name(self, obj):
        return str(obj.subregion)

    def get_city_name(self, obj):
        return str(obj.city)


class AttendeeSerializer(CustomSerializer):
    name = serializers.SerializerMethodField()
    subregion_name = serializers.SerializerMethodField()
    city_name = serializers.SerializerMethodField()
    district = serializers.SerializerMethodField()
    image_path = serializers.SerializerMethodField()

    class Meta:
        model = Attendee
        fields = "__all__"
        extra_fields = ["id", ]

    def get_name(self, obj):
        return obj.politician.name

    def get_district(self, obj):
        return obj.politician.district

    def get_image_path(self, obj):
        return obj.politician.image_path

    def get_subregion_name(self, obj):
        return str(obj.politician.subregion)

    def get_city_name(self, obj):
        return str(obj.politician.city)
