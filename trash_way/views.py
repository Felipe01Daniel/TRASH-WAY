from django.shortcuts import render

# Create your views here.
def home(request):
    return render(request, 'home.html')

def mapa(request):
    return render(request, 'mapa.html')

def doacao(request):
    return render(request, 'doacao.html')