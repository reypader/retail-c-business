# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

# Register your models here.
from ordinances import models

admin.site.register(models.LocalGovUnit)
admin.site.register(models.ConsultantCompany)
admin.site.register(models.Consultant)
admin.site.register(models.BoardMember)
admin.site.register(models.Agenda)
