from django.urls import path,re_path
from .views import index

urlpatterns = [
    path("", index, name="home"),  # Cualquier ruta servirá React
    #path("<path:resource>/", index, name="catchall"),
]