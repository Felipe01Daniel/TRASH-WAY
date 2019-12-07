from django.contrib import admin
from .models import Lixo
# Register your models here.

@admin.register(Lixo)
class LixoAdmin(admin.ModelAdmin):
    list_display = ['id', 'cidade']
