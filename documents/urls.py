from django.conf.urls import url
from rest_framework.routers import SimpleRouter

from .views import (DocumentViewSet, DocumentsListViewSet)

app_name = 'document_api'

list_actions = {'get': 'list', 'post': 'create'}
detail_actions = {'get': 'retrieve', 'delete': 'destroy', 'put': 'update', 'patch': 'partial_update'}

urlpatterns = [
    url(r'^$', DocumentsListViewSet.as_view(list_actions), name='list'),
    url(r'^(?P<pk>\d+)$', DocumentViewSet.as_view(detail_actions), name='details'),
]

router = SimpleRouter()

urlpatterns += router.get_urls()
