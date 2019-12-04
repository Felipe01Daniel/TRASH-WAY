from django.shortcuts import render

# Create your views here.
def mapa(request):
    return render(request, 'mapa.html')