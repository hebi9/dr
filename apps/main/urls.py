from django.urls import path,include,re_path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.views.generic import TemplateView

from .views import index,get_csrf_token

urlpatterns = [
    #path("", index, name="home"),  # Cualquier ruta servirá React
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # Login
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # Refrescar token
    path('api/csrf/', get_csrf_token, name='csrf_token'),
    path('api/finances/', include('apps.finances.urls')),
    path('api/relationship/', include('apps.relationship.urls')),
]
urlpatterns += [re_path(r'^.*',TemplateView.as_view(template_name='index.html'))]