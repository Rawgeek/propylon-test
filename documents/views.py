import os

from django.db import IntegrityError
from django.http import FileResponse, HttpResponseNotFound
from django.views.generic.detail import DetailView
from rest_framework import status, viewsets, serializers
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from reversion.models import Version

from .models import Document
from .serializers import DocumentSerializer, SimpleDocumentSerializer

from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator

@method_decorator(login_required(login_url='/#/login'), name='dispatch')
class DocumentsDownloadView(DetailView):
    model = Document

    def get(self, request, *args, **kwargs):
        revision_number = request.GET.get('revision', None)

        try:
            document = self.model.objects.get(download_url=request.path, user=request.user)
        except Document.DoesNotExist:
            return HttpResponseNotFound('<h1>Page not found</h1>')

        if revision_number is not None:
            revision_number = int(revision_number)
            revisions_count_found = Version.objects.get_for_object(document).count()
            if revisions_count_found - 1 == revision_number:
                response = FileResponse(document.attachment_file)
            elif revision_number > revisions_count_found - 1:
                return HttpResponseNotFound('<h1>Page not found</h1>')
            else:
                version = document.get_version(revision_number)
                response = FileResponse(version.field_dict['attachment_file'])
        else:
            response = FileResponse(document.attachment_file)

        response['Content-Disposition'] = 'attachment; filename="%s"' % os.path.basename(request.path)
        return response

class DocumentViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = DocumentSerializer

    def get_queryset(self):
        return Document.objects.filter(user=self.request.user)

class DocumentsListViewSet(DocumentViewSet):
    serializers_map = {
        'default': SimpleDocumentSerializer,
        'POST': DocumentSerializer,
    }

    def get_serializer_class(self):
        return self.serializers_map.get(self.request.method, self.serializers_map['default'])

    def perform_create(self, serializer):
        try:
            serializer.save(user=self.request.user)
        except IntegrityError as e:
            if 'unique' in str(e).lower():
                raise serializers.ValidationError({"download_url": ['Document with this url already exists.']}, status.HTTP_400_BAD_REQUEST)
            raise str(e)
