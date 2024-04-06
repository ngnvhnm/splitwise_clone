from rest_framework import serializers
from . import models

class FinanceSerializers(serializers.ModelSerializer):
    class Meta:
        model = models.Finance
        fields = '__all__'