from django.urls import path, include

urlpatterns = [
    path('clients/', include('clients.urls')),  
    path('tags/', include('tags.urls')),        
]
