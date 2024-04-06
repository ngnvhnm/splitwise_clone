from django.shortcuts import render
from .serializers import FinanceSerializers
from .models import Finance
from rest_framework import viewsets

# Create your views here.
class FinanceViewSet(viewsets.ModelViewSet):
    queryset = Finance.objects.all()
    serializer_class = FinanceSerializers