import json
import io

from django.core.files.base import ContentFile
from django.test import Client
from django.urls import reverse
from freezegun import freeze_time
from propylon.tests.factories import UserFactory
from rest_framework import status
from rest_framework.test import APITestCase


from .factories import DocumentFactory

@freeze_time("2021-11-11")
class DocumentsTestCase(APITestCase):
    def setUp(self):
        self.user = UserFactory()
        self.user2 = UserFactory()
        self.client.force_login(self.user)
        self.url = reverse('documents:list')
        self.document_1 = DocumentFactory(user=self.user)
        self.document_2 = DocumentFactory(user=self.user)
        self.document_3 = DocumentFactory(user=self.user)

        self.data = [
            {"id": self.document_3.id, "download_url": self.document_3.download_url, "created": "2021-11-11T00:00:00Z"},
            {"id": self.document_2.id, "download_url": self.document_2.download_url, "created": "2021-11-11T00:00:00Z"},
            {"id": self.document_1.id, "download_url": self.document_1.download_url, "created": "2021-11-11T00:00:00Z"}
        ]

    def test_url(self):
        self.assertEqual(self.url, '/api/documents/')

    def test_list(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(json.dumps(response.data), json.dumps(self.data))

    def test_list_user2(self):
        self.client.force_login(self.user2)
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(json.dumps(response.data), json.dumps([]))

    def test_create(self):
        with open('documents/tests/test.pdf', 'rb') as fp:
            fio  = io.FileIO(fp.fileno())
            fio.name = 'test.pdf'
            response = self.client.post(self.url, {"download_url": "/review/test.pdf", "attachment_file": fio})

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_invalid(self):
        self.client.force_login(self.user)
        response = self.client.post(self.url, {"download_url": self.document_1.download_url})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        self.assertEqual(response.data["attachment_file"][0], "No file was submitted.")

    def test_invalid_duplicate(self):
        with open('documents/tests/test.pdf', 'rb') as fp:
            fio  = io.FileIO(fp.fileno())
            fio.name = 'test.pdf'
            response = self.client.post(self.url, {"download_url": self.document_1.download_url, "attachment_file": fio})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["download_url"][0], "Document with this url already exists.")

    def test_get(self):
        url = reverse('documents:details', kwargs={"pk": self.document_1.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_put(self):
        url = reverse('documents:details', kwargs={"pk": self.document_1.id})
        with open('documents/tests/test.pdf', 'rb') as fp:
            fio  = io.FileIO(fp.fileno())
            fio.name = 'test.pdf'
            response = self.client.put(url, {"download_url": "/review/test.pdf", "attachment_file": fio})

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_patch(self):
        url = reverse('documents:details', kwargs={"pk": self.document_1.id})
        with open('documents/tests/test.pdf', 'rb') as fp:
            fio  = io.FileIO(fp.fileno())
            fio.name = 'test.pdf'
            response = self.client.patch(url, {"attachment_file": fio})

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete(self):
        url = reverse('documents:details', kwargs={"pk": self.document_1.id})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def download_document(self):
        response = self.client.get(self.document_1.download_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def download_document_wrong_url(self):
        response = self.client.get("/wrong_url")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def download_document_wrong_user(self):
        self.client.force_login(self.user2)
        response = self.client.get(self.document_1.download_url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_vesions(self):
        download_url = "/review/test_versions.pdf"
        with open('documents/tests/test.pdf', 'rb') as fp:
            fio  = io.FileIO(fp.fileno())
            fio.name = 'test.pdf'
            response = self.client.post(self.url, {"download_url": download_url, "attachment_file": fio})

        document_id = response.data['id']

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        response = self.client.get(f'{download_url}?revision=0')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        url = reverse('documents:details', kwargs={"pk": document_id})
        with open('documents/tests/test.pdf', 'rb') as fp:
            fio  = io.FileIO(fp.fileno())
            fio.name = 'test.pdf'
            response = self.client.put(url, {"download_url": download_url, "attachment_file": fio})

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        with open('documents/tests/test.pdf', 'rb') as fp2:
            fio2  = io.FileIO(fp2.fileno())
            fio2.name = 'test.pdf'
            response = self.client.put(url, {"download_url": download_url, "attachment_file": fio2})

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response = self.client.get(f'{download_url}?revision=0')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response = self.client.get(f'{download_url}?revision=1')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response = self.client.get(f'{download_url}?revision=2')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
