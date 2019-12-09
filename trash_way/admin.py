from django.contrib import admin
from .models import Produto
# Register your models here.

@admin.register(Produto)
class ProdutoAdmin(admin.ModelAdmin):
    list_display = ['cidade', 'descricao', 'estado_de_conservacao', 'telefone', 'email', 'photo', 'user', 'id']
