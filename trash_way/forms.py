from django import forms
from trash_way.models import *

class DoacaoForm(forms.ModelForm):
    class Meta:
        model = DoacaoUser
        fields = [
            'nome',
            'cidade',
            'email',
            'telefone',
            'produto',
            'imagem',
            'descricao'
        ]

class CadastroForm(forms.ModelForm):
    class Meta:
        model = CadastroUser
        fields = [
            'nome',
            'email',
            'senha'
        ]