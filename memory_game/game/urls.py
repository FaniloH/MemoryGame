from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    # Nous allons utiliser la vue 'home' pour la page du jeu aussi
    path('game/', views.home, name='game'),
    path('save_score/', views.save_score, name='save_score'),
]

