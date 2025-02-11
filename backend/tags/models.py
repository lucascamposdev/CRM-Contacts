from django.db import models
from api.models import BaseModel

class Tag(BaseModel):
    name = models.CharField(max_length=20, unique=True)
    color = models.CharField(max_length=20)

    def __str__(self):
        return self.name