# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

# Register your models here.
from ordinances.models import LocalGovUnit, BusinessInfo, ConsultantCompany, BoardMember, Consultant

admin.site.register(LocalGovUnit)
admin.site.register(BusinessInfo)
admin.site.register(ConsultantCompany)
admin.site.register(Consultant)
admin.site.register(BoardMember)
