from django.contrib import admin
from django.urls import path, include
from .views import FinanceViewSet
from rest_framework import routers

finance_router = routers.DefaultRouter()
finance_router.register('finance', FinanceViewSet, basename='Finance')

urlpatterns = [
]

urlpatterns += finance_router.urls
