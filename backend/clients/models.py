from django.db import models
from api.models import BaseModel

class Client(BaseModel):
    STATUS_CHOICES = [
        ('Ativo', 'Ativo'),
        ('Cancelado', 'Cancelado'),
        ('Atrasado', 'Atrasado'),
    ]

    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    number = models.CharField(max_length=20)
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        null=True,  
        blank=True  
    )

    def __str__(self):
        return self.name
