from django.shortcuts import JsonResponse
from .models import Relationship
# Create your views here.

def relationship(request):
    user = request.user 
    relationships = Relationship.objects.filter(user=user)
    return JsonResponse({
        'success': True,
        'relationships': list(relationships.values())
        },status=200)

def post_relationship(request):
    data = request.POST
    relationship = Relationship.objects.create(
        user = request.user,
        estatus = data.get('estatus'),
        note = data.get('note'),
        dessert = data.get('dessert'),
    )
    return JsonResponse({'success': True,'relationship': relationship},status=200)