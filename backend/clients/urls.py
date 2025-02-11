from django.urls import path
from . import views

urlpatterns = [
    path('', views.client_list),
    path('/<int:pk>', views.client_detail),
]
