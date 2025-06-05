from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Usr(models.Model):
    phone = models.CharField(max_length=13)
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    
class EventScheduler(models.Model):
    scheduleOn = models.DateTimeField()
    notes = models.TextField(max_length=100)
    repeatation = models.CharField(max_length=20)
    usr = models.ForeignKey(Usr,on_delete=models.DO_NOTHING)

