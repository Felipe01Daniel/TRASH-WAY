from django.shortcuts import render

# Create your views here.
def home(request):
    return render(request, 'home.html')

def mapa(request):
    return render(request, 'mapa.html')

def cadastro(request):
    return render(request, 'cadastro.html')

def cacamba(request):
    return render(request, 'cacamba.html')