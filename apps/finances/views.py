from django.http import JsonResponse
from django.utils.dateparse import parse_date
from django.db.models import Q
from .models import Finances, Category, Payment_method
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User

import json
from datetime import datetime

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
            category = request.GET.get('category')
            payment_method = request.GET.get('payment_method')
            start_date = request.GET.get('start_date')  # Formato: YYYY-MM-DD
            end_date = request.GET.get('end_date')
            if start_date:
                y,m,d = start_date.split("-")
                start_date = datetime.strptime(f'{d}-{m}-{y}', "%d-%m-%Y")

            if end_date:
                y,m,d = end_date.split("-")
                end_date = datetime.strptime(f'{d}-{m}-{y}', "%d-%m-%Y")

            finances = Finances.objects.filter(user=user).select_related("category", "payment_method")
            # Aplicar filtros si existen
            if category:
                finances = finances.filter(category__name=category)
            if payment_method:
                finances = finances.filter(payment_method__name=payment_method)
            if start_date and end_date:
                
                finances = finances.filter(Q(create__gte=start_date),Q(create__lte=end_date))

            elif start_date:
                finances = finances.filter(Q(create__gte=start_date))  # Mayor o igual a start_date
            elif end_date:
                finances = finances.filter(Q(create__lte=end_date))
            data = [
                {
                    "id": finance.id,
                    "amount": float(finance.amount),  # Convertir Decimal a float
                    "create": finance.create.strftime("%d-%m-%Y"),
                    "category": finance.category.name,  # Aquí obtenemos el nombre en lugar del ID
                    "payment_method": finance.payment_method.name,  # Aquí obtenemos el nombre en lugar del ID
                    "type": finance.type,
                    "note": finance.note,
                }
                for finance in finances
            ]

            cat = [{"name": cat.name} for cat in categories]
            payment = [{"name": payment.name} for payment in payment_methods]
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
        note=data.get('note'),
        create=data.get('create'),
    )

    return JsonResponse({'success': True, 'finances_id': finances.id}, status=200)