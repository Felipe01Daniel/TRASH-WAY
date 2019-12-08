from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_protect
from django.contrib.auth import authenticate, login
from django.contrib import messages 

# Create your views here.



def home(request):
    return render(request, 'home.html')

def mapa(request):
    return render(request, 'mapa.html')

def cadastro(request):
    return render(request, 'cadastro.html')

def cacamba(request):
    return render(request, 'cacamba.html')

def doacao(request):
    return render(request, 'doacao.html')

def login_user(request):
    return render(request, 'login.html')

@csrf_protect
def submit_login(request):
    if request.POST:
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('/doacao/')
        else:
            messages.error(request, 'Usuario ou senha inválidos. Tente novamente')
    return redirect('/login/')


