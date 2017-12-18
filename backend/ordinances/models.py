# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models as django_models

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


class Place(django_models.Model):
    name = django_models.CharField(max_length=100)
    name_std = django_models.CharField(max_length=100)

    class Meta:
        abstract = True
        ordering = ('name',)

    def __unicode__(self):
        return self.name_std

    def __str__(self):
        return unicode(self).encode('utf-8')


class Region(Place):
    code = django_models.CharField(max_length=50)


class SubRegion(Place):
    region = django_models.ForeignKey(Region, related_name="subregions", on_delete=django_models.CASCADE)
    code = django_models.CharField(max_length=50)


class City(Place):
    region = django_models.ForeignKey(Region, related_name="cities", on_delete=django_models.CASCADE)
    subregion = django_models.ForeignKey(SubRegion, related_name="cities", on_delete=django_models.CASCADE)


class ConsultantCompany(django_models.Model):
    created_at = django_models.DateTimeField(auto_now_add=True)
    updated_at = django_models.DateTimeField(auto_now=True)
    name = django_models.CharField(max_length=100)
    address = django_models.CharField(max_length=255)
    postal_code = django_models.CharField(max_length=20)
    email = django_models.EmailField()
    telephone_number = django_models.CharField(max_length=20)
    fax_number = django_models.CharField(max_length=20)
    notes = django_models.TextField()

    class Meta:
        verbose_name = "Consultant Company"
        verbose_name_plural = "Consultant Companies"
        ordering = ('name',)


class Consultant(django_models.Model):
    created_at = django_models.DateTimeField(auto_now_add=True)
    updated_at = django_models.DateTimeField(auto_now=True)
    name = django_models.CharField(max_length=100)
    address = django_models.CharField(max_length=255)
    postal_code = django_models.CharField(max_length=20)
    email = django_models.EmailField()
    telephone_number = django_models.CharField(max_length=20)
    notes = django_models.TextField()
    company = django_models.ForeignKey(ConsultantCompany, related_name="consultants", on_delete=django_models.CASCADE,
                                       null=True)

    class Meta:
        ordering = ('name',)


class Agenda(django_models.Model):
    created_at = django_models.DateTimeField(auto_now_add=True)
    updated_at = django_models.DateTimeField(auto_now=True)
    city = django_models.ForeignKey(City, related_name="agendas", on_delete=django_models.CASCADE, null=True)
    subregion = django_models.ForeignKey(SubRegion, related_name="agendas", on_delete=django_models.CASCADE)
    land_area = django_models.DecimalField(max_digits=12, decimal_places=4)
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
    cultivation_allowed_areas = django_models.TextField(null=True, blank=True)
    manufacturing_license = django_models.BooleanField(default=False)
    manufacturing_allowed_areas = django_models.TextField(null=True, blank=True)
    retail_license = django_models.BooleanField(default=False)
    retail_allowed_areas = django_models.TextField(null=True, blank=True)
    distribution_license = django_models.BooleanField(default=False)
    microbusiness_license = django_models.BooleanField(default=False)
    laboratory_license = django_models.BooleanField(default=False)
    cannabis_consultant_company = django_models.ForeignKey(ConsultantCompany, null=True, blank=True,
                                                           on_delete=django_models.SET_NULL)
    cannabis_consultant_employee = django_models.ForeignKey(Consultant, null=True, blank=True,
                                                            on_delete=django_models.SET_NULL)
    cannabis_consultant_start_date = django_models.DateField(null=True, blank=True)
    other_localities_consulted = django_models.TextField(null=True, blank=True)
    link_to_video = django_models.URLField(null=True, blank=True)
    date = django_models.DateField()
    notes = django_models.TextField()

    class Meta:
        ordering = ('-date', '-created_at',)

    def __str__(self):
        return "[%s] %s" % (self.date, self.city)


class Politician(django_models.Model):
    created_at = django_models.DateTimeField(auto_now_add=True)
    updated_at = django_models.DateTimeField(auto_now=True)
    name = django_models.CharField(max_length=100)
    subregion = django_models.ForeignKey(SubRegion, related_name="politicians", on_delete=django_models.CASCADE)
    city = django_models.ForeignKey(City, related_name="politicians", on_delete=django_models.CASCADE, null=True)
    district = django_models.CharField(max_length=100)
    image_path = django_models.CharField(max_length=200,null=True, blank=True, default="assets/blank_male_avatar.jpg")

    class Meta:
        ordering = ('name',)


class Attendee(django_models.Model):
    created_at = django_models.DateTimeField(auto_now_add=True)
    updated_at = django_models.DateTimeField(auto_now=True)
    group = django_models.CharField(max_length=10, choices=LGU_STAFF_GROUPS)
    job_title = django_models.CharField(max_length=20)
    department = django_models.CharField(max_length=50)
    political_stance = django_models.CharField(max_length=5, choices=POLITICAL_STANCES)
    supports_cannabis_usage = django_models.BooleanField(default=False)
    notes = django_models.TextField()
    politician = django_models.ForeignKey(Politician, related_name="participations", on_delete=django_models.CASCADE)
    agenda = django_models.ForeignKey(Agenda, related_name="attendees", on_delete=django_models.CASCADE, null=True)

    class Meta:
        verbose_name = "Board Member"
