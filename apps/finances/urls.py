from django.urls import path

from . import views

urlpatterns = [
    path('', views.finances, name='finances'),
    path('post/', views.post_finances, name='post_finances'),
]
