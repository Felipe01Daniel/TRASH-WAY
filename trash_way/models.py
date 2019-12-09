from django.db import models

# Create your models here.

class DoacaoAdmin(models.Model):
    tipo_produto = [
        ('MV', 'Moveis'),
        ('ED', 'Eletronico'),
    ]

    nome = models.CharField(max_length=140)
    cidade = models.CharField(max_length=140)
    email = models.EmailField()
    telefone = models.CharField(max_length=11)
    produto = models.CharField(max_length=2, choices=tipo_produto)
    imagem = models.ImageField(upload_to="")
    descricao = models.CharField(max_length=50)

    def __str__(self):
        return self.nome
    
class DoacaoUser(models.Model):
    tipo_produto = [
        ('MV', 'Moveis'),
        ('ED', 'Eletronico'),
    ]

    nome = models.CharField(max_length=140)
    cidade = models.CharField(max_length=140)
    email = models.EmailField()
    telefone = models.CharField(max_length=11)
    produto = models.CharField(max_length=2, choices=tipo_produto)
    imagem = models.ImageField(upload_to="")
    descricao = models.CharField(max_length=50)

    def __str__(self):
        return self.nome

