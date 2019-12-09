from django.contrib import admin
from .models import DoacaoAdmin, DoacaoUser
# Register your models here.

admin.site.register(DoacaoAdmin)
admin.site.register(DoacaoUser)