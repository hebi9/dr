from django.urls import path,re_path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import index

urlpatterns = [
    path("", index, name="home"),  # Cualquier ruta servirá React
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # Login
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # Refrescar token
]