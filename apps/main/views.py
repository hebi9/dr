from django.http import HttpResponse,JsonResponse
from django.shortcuts import render
import os
from core.settings import BASE_DIR
def index(request):
    # index_file_path = os.path.join(BASE_DIR, '../front/dist/index.html')  # Ajusta según tu estructura
    # with open(index_file_path, 'r') as file:
    #     return HttpResponse(file.read())
    return render(request, 'index.html')

from django.middleware.csrf import get_token

def get_csrf_token(request):
    return JsonResponse({'csrfToken': get_token(request)})