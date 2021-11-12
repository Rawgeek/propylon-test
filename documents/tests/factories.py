import factory

from django.contrib.auth.models import User
from documents.models import Document
from propylon.tests.factories import UserFactory

class DocumentFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Document

    user = factory.SubFactory(UserFactory)
    download_url = factory.Sequence(lambda n: '/review/document-%s.pdf' % n)
    attachment_file = factory.django.FileField(filename='invoice_file.pdf')
