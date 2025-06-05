from django.contrib import admin
from . models import *

# Register your models here.

class usr(admin.ModelAdmin):
    list_display = ('phone','user')

class eventschduler(admin.ModelAdmin):
    list_display = ('scheduleOn','notes','repeatation','usr')

admin.site.register(Usr,usr)
admin.site.register(EventScheduler,eventschduler)