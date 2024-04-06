from django.db import models

# Create your models here.
class Finance(models.Model):
    title = models.CharField(max_length=200, blank=False, default='Something')
    who_pays = models.CharField(max_length=50)
    paid_amount = models.DecimalField(decimal_places=2, max_digits=10000)
    no_of_people = models.IntegerField()
    who_owes = models.CharField(max_length=200)
    already_paid = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title