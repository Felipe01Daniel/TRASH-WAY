from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_protect
from django.contrib import messages 
from django.views.generic import RedirectView
from trash_way.forms import DoacaoForm
from trash_way.forms import CadastroForm
from trash_way.models import *
# Create your views here.

def home(request):
    return render(request, 'home.html')
def produtos(request):
    
    return render(request, 'produtos.html')

def mapa(request):
    return render(request, 'mapa.html')

def cadastro(request):
    return render(request, 'cadastro.html')

def cacamba(request):
    return render(request, 'cacamba.html')

def doacao(request):
    return render(request, 'doacao.html')

def sobrenos(request):
    return render(request, 'sobrenos.html')

def cadastro_doacao(request):
    form = DoacaoForm(request.POST or None, request.FILES)
    if form.is_valid():
        form.save()
        context = {
            'msg' : "Cadastro de doação realizado com sucesso"
        }
        return render(request, 'doacao.html', context) 
       
    context = {
        'doacaoforms': form
    }
    return render(request, 'doacao.html', context)    

def sobre(request):
    return render(request, 'sobre.html')

def cadastro_user(request):
    form = CadastroForm(request.POST or None)
    if form.is_valid():
        form.save()
        context = {
            'msg' : "Cadastro realizado com sucesso"
        }
        return render(request, 'cadastro.html', context) 
        
    context = {
        'cadastroforms': form
    }
    return render(request, 'cadastro.html', context)  

@csrf_protect
def login(request):
    if request.method == "POST":
        formulario_email = request.POST['email']
        formulario_senha = request.POST['senha']

        usuario_logado = CadastroUser.objects.filter(email = formulario_email,
                                              senha = formulario_senha).first()

        if usuario_logado is not None:
            args = {
                'dados': usuario_logado
            }
            return render(request, 'doacao.html', args)
        else:
            args = {
                'msg': 'Credenciais inválidas'
            }
            return render(request, 'login.html', args)

    return render(request, 'login.html')


