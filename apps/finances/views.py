from django.http import JsonResponse
from .models import Finances, Category, Payment_method
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User

import json
# Create your views here.



def finances(request):
    if request.method == 'GET':
        try:
            # Extraer el username de los parámetros de la URL o el cuerpo de la solicitud (según cómo lo envíes)
            username = request.GET.get('username')  # Usamos GET para obtener el username
            if not username:
                return JsonResponse({"error": "Username is required"}, status=400)

            user = User.objects.get(username=username)  # Asegúrate de que el usuario existe
            categories = Category.objects.filter(user=user)
            payment_methods = Payment_method.objects.filter(user=user)
            finances = Finances.objects.filter(user=user).select_related("category", "payment_method")
            data = [
                {
                    "id": finance.id,
                    "amount": float(finance.amount),  # Convertir Decimal a float
                    "create": finance.create.isoformat(),
                    "category": finance.category.name,  # Aquí obtenemos el nombre en lugar del ID
                    "payment_method": finance.payment_method.name,  # Aquí obtenemos el nombre en lugar del ID
                    "type": finance.type,
                }
                for finance in finances
            ]
            cat = [
                {
                    "name": cat.name,  
                }
                for cat in categories
            ]
            payment = [
                {
                    "name": payment.name,  
                }
                for payment in payment_methods
            ]
            return JsonResponse({
                'success': True,
                'finances': data,  # Convierte a lista de diccionarios
                'categories': cat,
                'payment_methods': payment
            }, status=200)
        except User.DoesNotExist:
            return JsonResponse({"error": "User does not exist"}, status=404)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

@api_view(['POST'])
def post_finances(request):
    print(request.body)
    data = json.loads(request.body)
    username = data.get('username')
    if not username:
        return JsonResponse({"error": "Username is required"}, status=400)

    user = User.objects.get(username=username)
    # Obtiene la categoría o la crea si no existe
    category_name = data.get('category')
    category, created = Category.objects.get_or_create(user=user, name=category_name)

    # Obtiene el método de pago o lo crea si no existe
    payment_method_name = data.get('payment_method')
    payment_method, created = Payment_method.objects.get_or_create(user=user, name=payment_method_name)

    # Crea la instancia de Finances
    finances = Finances.objects.create(
        user=user,
        amount=data.get('amount'),
        category=category,
        payment_method=payment_method,
        type=data.get('type'),
    )

    return JsonResponse({'success': True, 'finances_id': finances.id}, status=200)