from django.shortcuts import JsonResponse
from .models import Finances, Category, Payment_method
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
# Create your views here.


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def finances(request):
    user = request.user  # Obtiene el usuario autenticado

    finances = Finances.objects.filter(user=user)
    categories = Category.objects.filter(user=user)
    payment_methods = Payment_method.objects.filter(user=user)

    return JsonResponse({
        'success': True,
        'finances': list(finances.values()),  # Convierte a lista de diccionarios
        'categories': list(categories.values()),
        'payment_methods': list(payment_methods.values())
    }, status=200)

def post_finances(request):
    data = request.POST

    # Obtiene la categoría o la crea si no existe
    category_name = data.get('category')
    category, created = Category.objects.get_or_create(user=request.user, name=category_name)

    # Obtiene el método de pago o lo crea si no existe
    payment_method_name = data.get('payment_method')
    payment_method, created = Payment_method.objects.get_or_create(user=request.user, name=payment_method_name)

    # Crea la instancia de Finances
    finances = Finances.objects.create(
        user=request.user,
        amount=data.get('amount'),
        category=category,
        payment_method=payment_method,
        type=data.get('type'),
        note=data.get('note'),
    )

    return JsonResponse({'success': True, 'finances_id': finances.id}, status=200)