from django.urls import path
from . import views

urlpatterns = [
    path('position/', views.get_random_position, name='get_random_position'),
]