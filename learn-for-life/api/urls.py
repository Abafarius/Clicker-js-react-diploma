from django.urls import path
from .views import test_api
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('test/', test_api),
]
