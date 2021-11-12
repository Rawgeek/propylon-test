import factory
from django.contrib.auth.models import User

class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User

    username = factory.Sequence(lambda n: 'user%s@example.com' % n)
    email = factory.Sequence(lambda n: 'user%s@example.com' % n)
    password = factory.PostGenerationMethodCall('set_password', 'default')
    is_staff = False
