from django.http import JsonResponse
from .models import Relationship, Streak
from django.contrib.auth.models import User
from rest_framework.decorators import api_view

import json


# Create your views here.


def relationship(request):
    if request.method == 'GET':
        try:
            # Extraer el username de los parámetros de la URL o el cuerpo de la solicitud (según cómo lo envíes)
            username = request.GET.get('username')  # Usamos GET para obtener el username

            if not username:
                return JsonResponse({"error": "Username is required"}, status=400)

            # Filtrar las relaciones del usuario especificado
            user = User.objects.get(username=username)  # Asegúrate de que el usuario existe
            relationships = Relationship.objects.filter(user=user)
            streak = Streak.objects.filter(user=user)
            print(list(streak.values())[0])
            return JsonResponse({
                'success': True,
                'relationships': list(relationships.values(),),
                'streak': list(streak.values())[0],
            }, status=200)

        except User.DoesNotExist:
            return JsonResponse({"error": "User does not exist"}, status=404)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)


@api_view(['POST'])
def post_relationship(request):
    data = json.loads(request.body)
    print(data.get('username'))
    relationship = Relationship.objects.create(
        user = User.objects.get(username=data.get('username')),
        estatus = data.get('estatus'),
        note = data.get('note'),
        dessert = data.get('dessert'),
    )
    # relationships = Relationship.objects.filter(user=data.username)
    return JsonResponse({'success': True},status=200)