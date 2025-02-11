from django.urls import path
from . import views

urlpatterns = [
    path('', views.tag_list),
    path('<int:pk>/', views.tag_detail),
]