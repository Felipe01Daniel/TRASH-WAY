from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Produto(models.Model):
    cidade = models.CharField(max_length=50)
    descricao = models.TextField()
    estado_de_conservacao = models.TextField()
    telefone = models.CharField(max_length=11)
    email = models.EmailField()
    photo = models.ImageField()
    begin_date = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    

    def __str__(self):
        return str(self.id)

    class Meta:
        db_table = 'produto'

