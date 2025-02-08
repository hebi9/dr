from django.urls import path

from . import views

urlpatterns = [
    path('', views.relationship, name='relationship'),
    path('post/', views.post_relationship, name='post_relationship'),
]
