import os

from django.views.generic.detail import DetailView
from django.http import FileResponse, HttpResponseNotFound
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from reversion.models import Version

from .models import Document
from .serializers import DocumentSerializer, SimpleDocumentSerializer

from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator

@method_decorator(login_required(login_url='/#/login'), name='dispatch')
class DocumentsDownloadView(DetailView):
    model = Document

    def get(self, request, *args, **kwargs):
        revision_number = int(request.GET.get('revision', 0))

        try:
            document = self.model.objects.get(download_url=request.path, user=request.user)
        except Document.DoesNotExist:
            return HttpResponseNotFound('<h1>Page not found</h1>')
        print(revision_number)
        if revision_number > 0:
            revisions_count_found = Version.objects.get_for_object(document).count()
            if revision_number + 1 > revisions_count_found:
                return HttpResponseNotFound('<h1>Page not found</h1>')
            else:
                version = Version.objects.get_for_object(document).order_by('-id')[revision_number]
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
        serializer.save(user=self.request.user)
