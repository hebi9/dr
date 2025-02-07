from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.

User = get_user_model()

class Relationship(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    estatus = models.CharField(max_length=10,choices=[('Good', 'Bien'), ('Regular', 'Regular'), ('Bad', 'Malo')], default='Good', null=True, blank=True)
    note = models.TextField(null=True, blank=True)
    create = models.DateTimeField(auto_now_add=True)
    dessert = models.BooleanField(default=False)
    streak = models.PositiveIntegerField(default=0)  # Nueva racha

    
    def __str__(self):
        return self.create
    
    class Meta:
        verbose_name = 'Relación'
        ordering = ['-create']
        