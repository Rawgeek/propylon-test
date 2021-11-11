from django.contrib import admin
from reversion.admin import VersionAdmin
from .models import Document

@admin.register(Document)
class DocumentAdmin(VersionAdmin):

    pass
