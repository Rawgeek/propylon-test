from rest_framework import serializers

from django.contrib.auth import authenticate, login

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(username=data['username'],
                            password=data['password'])
        if user is not None and user.is_active:
            if hasattr(user, 'clientcontact') and not user.clientcontact.is_active:
                raise serializers.ValidationError(
                    'Your account has been deactivated. Please contact your primary account holder.'
                )
            login(self.context['request'], user)
            return data
        else:
            raise serializers.ValidationError('Incorrect username or password')

    def create(self, data):
        return True
