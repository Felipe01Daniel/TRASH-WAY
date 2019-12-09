from django import forms
from trash_way.models import DoacaoUser

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
            'descricao',
        ]