from django.urls import path
from .views import UserRegisterAPIView 
from .views import protected_view, MyTokenObtainPairView

urlpatterns = [
    path('register/', UserRegisterAPIView.as_view(), name='register'),
    path('protected/', protected_view, name='protected'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
]
