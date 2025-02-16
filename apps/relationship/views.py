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
            relationship_id = request.GET.get('relationship')
            if relationship_id:
                relationships = [Relationship.objects.get(id=relationship_id)]
            else:
                relationships = Relationship.objects.filter(user=user)
            streak = Streak.objects.filter(user=user)
            data = [
                {
                    "id": relation.id,
                    'user': relation.user.username,
                    'estatus': relation.estatus,
                    'note': relation.note,
                    'dessert': relation.dessert,
                    'create': relation.create.strftime("%d-%m-%Y"),
                    'empathy': relation.empathy,
                    'comprehension': relation.comprehension,
                    'curiosity': relation.curiosity,
                    'learn_more': relation.learn_more,
                    'learn_from_you': relation.learn_from_you,
                    'miracle': relation.miracle
                }
                for relation in relationships
            ]
            print(data)
            return JsonResponse({
                'success': True,
                'relationships': data,
                'streak': list(streak.values())[0],
            }, status=200)

        except User.DoesNotExist:
            return JsonResponse({"error": "User does not exist"}, status=404)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)


@api_view(['POST'])
def post_relationship(request):
    data = json.loads(request.body)
    relationship = data.get('id')
    if relationship:
        relationship = Relationship.objects.get(id=relationship)
        relationship.estatus = data.get('estatus')
        relationship.note = data.get('note')
        relationship.dessert = data.get('dessert')
        relationship.empathy = data.get('empathy')
        relationship.comprehension = data.get('comprehension')
        relationship.curiosity = data.get('curiosity')
        relationship.learn_more = data.get('learn_more')
        relationship.learn_from_you = data.get('learn_from_you')
        relationship.miracle = data.get('miracle')
        relationship.save()
        return JsonResponse({'success': True},status=200)
    relationship = Relationship.objects.create(
        user = User.objects.get(username=data.get('username')),
        estatus = data.get('estatus'),
        note = data.get('note'),
        dessert = data.get('dessert'),
        create=data.get('create'),
        empathy = data.get('empathy'),
        comprehension = data.get('comprehension'),
        curiosity = data.get('curiosity'),
        learn_more = data.get('learn_more'),
        learn_from_you = data.get('learn_from_you'),
        miracle = data.get('miracle')
    )
    # relationships = Relationship.objects.filter(user=data.username)
    return JsonResponse({'success': True},status=200)