from django.db import models
from api.models import BaseModel
from tags.models import Tag

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
    tags = models.ManyToManyField(Tag, related_name="clients") 

    def __str__(self):
        return self.name
