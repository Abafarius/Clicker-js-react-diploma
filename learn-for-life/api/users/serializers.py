from rest_framework import serializers
from django.contrib.auth.models import User

class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    email = serializers.EmailField(required=True)

class Meta:
    model = User
    fields = ['username', 'email', 'password']
    extra_kwargs = {
        'email': {'validators': [
            serializers.UniqueValidator(queryset=User.objects.all(), message="Почта уже используется")
        ]}
    }


    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            email=validated_data.get('email', '')
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
    
    
    def validate_password(self, value):
        if len(value) < 6:
            raise serializers.ValidationError("Пароль должен содержать минимум 6 символов.")
        return value

