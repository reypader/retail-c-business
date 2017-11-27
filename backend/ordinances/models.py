# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models as django_models
from cities import models as cities_models
from django.core.exceptions import ValidationError

# Create your models here.

POLITICAL_STANCES = (
    ("R", "Republican"),
    ("D", "Democrat"),
)

LGU_STAFF_GROUPS = (
    ("CNT_SUP", "County Board of Supervisors"),
    ("CNT_SHR", "County Sheriff"),
    ("CNT_HPL", "County Head Planner"),
    ("CNT_MGR", "County Manager"),
    ("CTY_CNL", "City Council"),

)
GENDERS = (
    ("M", "Male"),
    ("F", "Female"),
)

CIVIL_STATUSES = (
    ("S", "Single"),
    ("M", "Married"),
)

LGU_TYPES = (
    ("COUNTY", "County"),
    ("CITY", "City"),
)


def get_us():
    return cities_models.Country.objects.get(code="US")


def get_california():
    return cities_models.Region.objects.get(country__code="US", code="CA")


class ConsultantCompany(django_models.Model):
    name = django_models.CharField(max_length=100)
    address = django_models.CharField(max_length=255)
    postal_code = django_models.CharField(max_length=20)
    email = django_models.EmailField()
    telephone_number = django_models.CharField(max_length=20)
    fax_number = django_models.CharField(max_length=20)
    notes = django_models.TextField()


class Consultant(django_models.Model):
    name = django_models.CharField(max_length=100)
    age = django_models.PositiveSmallIntegerField()
    address = django_models.CharField(max_length=255)
    postal_code = django_models.CharField(max_length=20)
    email = django_models.EmailField()
    telephone_number = django_models.CharField(max_length=20)
    notes = django_models.TextField()
    company = django_models.ForeignKey(ConsultantCompany, on_delete=django_models.CASCADE, null=True)


class BusinessInfo(django_models.Model):
    population = django_models.PositiveIntegerField()
    financial_income = django_models.DecimalField(max_digits=12, decimal_places=2)
    financial_income_per_capita = django_models.DecimalField(max_digits=12, decimal_places=2)
    business_tax = django_models.DecimalField(max_digits=12, decimal_places=2)
    cannabis_tax = django_models.DecimalField(max_digits=12, decimal_places=2)
    dominant_political_stance = django_models.CharField(max_length=5, choices=POLITICAL_STANCES)
    vote_percent_democrat = django_models.DecimalField(max_digits=5, decimal_places=2)
    vote_percent_republican = django_models.DecimalField(max_digits=5, decimal_places=2)
    approved_cannabis = django_models.BooleanField(default=False)
    prop_64_vote = django_models.BooleanField(default=False)
    vote_percent_prop_64 = django_models.DecimalField(max_digits=5, decimal_places=2)
    medical_use = django_models.BooleanField(default=False)
    cultivation_license = django_models.BooleanField(default=False)
    cultivation_allowed_areas = django_models.TextField()
    manufacturing_license = django_models.BooleanField(default=False)
    manufacturing_allowed_areas = django_models.TextField()
    retail_license = django_models.BooleanField(default=False)
    retail_allowed_areas = django_models.TextField()
    distribution_license = django_models.BooleanField(default=False)
    microbusiness_license = django_models.BooleanField(default=False)
    laboratory_license = django_models.BooleanField(default=False)
    cannabis_consultant = django_models.ForeignKey(ConsultantCompany, null=True, blank=True,
                                                   on_delete=django_models.SET_NULL)
    cannabis_consultant_start_date = django_models.DateField(null=True, blank=True)
    other_localities_consulted = django_models.TextField()


class LocalGovUnit(django_models.Model):
    country = django_models.ForeignKey(cities_models.Country,
                                       default=get_us,
                                       limit_choices_to={"code": "US"})
    state = django_models.ForeignKey(cities_models.Region,
                                     default=get_california,
                                     limit_choices_to={"code": "CA", "country__code": "US"})
    county = django_models.ForeignKey(cities_models.Subregion,
                                      limit_choices_to={"region__code": "CA", "region__country__code": "US"})
    city = django_models.ForeignKey(cities_models.City,
                                    limit_choices_to={"region__code": "CA", "country__code": "US"},
                                    null=True)
    postal_code = django_models.ForeignKey(cities_models.PostalCode,
                                           limit_choices_to={"region__code": "CA", "country__code": "US"})
    land_area = django_models.DecimalField(max_digits=12, decimal_places=4)

    class Meta:
        unique_together = (
            ("county", "city"),
        )

    def clean(self):
        if self.city is not None and self.city.region != self.county:
            raise ValidationError({"city": "City is not within the selected County"})


class BoardMember(django_models.Model):
    group = django_models.CharField(max_length=10, choices=LGU_STAFF_GROUPS)
    name = django_models.CharField(max_length=100)
    date_of_birth = django_models.DateField()
    gender = django_models.CharField(max_length=5, choices=GENDERS)
    address = django_models.CharField(max_length=255)
    postal_code = django_models.CharField(max_length=20)
    email = django_models.EmailField()
    civil_status = django_models.CharField(max_length=5, choices=CIVIL_STATUSES)
    job_title = django_models.CharField(max_length=20)
    department = django_models.CharField(max_length=50)
    political_stance = django_models.CharField(max_length=5, choices=POLITICAL_STANCES)
    supports_cannabis_usage = django_models.BooleanField(default=False)
    annual_financial_income = django_models.DecimalField(max_digits=12, decimal_places=2)
    annual_tax = django_models.DecimalField(max_digits=12, decimal_places=2)
    organizations = django_models.TextField()
    notes = django_models.TextField()
    local_gov_unit = django_models.ForeignKey(LocalGovUnit, on_delete=django_models.CASCADE, null=True)


class Agenda(django_models.Model):
    local_gov_unit = django_models.ForeignKey(LocalGovUnit, on_delete=django_models.CASCADE, null=True)
    business_info = django_models.OneToOneField(BusinessInfo, on_delete=django_models.CASCADE, null=True)
    link_to_video = django_models.URLField(null=True, blank=True)
    date = django_models.DateField()
    notes = django_models.TextField()
