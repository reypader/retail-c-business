# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

# Register your models here.
from ordinances import models

admin.site.register(models.ConsultantCompany)
admin.site.register(models.Consultant)
admin.site.register(models.Politician)
admin.site.register(models.Attendee)
admin.site.register(models.Agenda)
