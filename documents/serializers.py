from django.contrib.auth.models import User
from rest_framework import serializers
from reversion.models import Revision, Version
from .models import Document

class DocumentVersionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Document
        fields = (
            'download_url',
            'attachment_file',
        )


class RevisionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Revision
        fields = ('date_created', 'user', 'comment')


class VersionSerializer(serializers.ModelSerializer):
    revision = RevisionSerializer(read_only=True)
    document = DocumentVersionSerializer(source='field_dict', read_only=True)
    number = serializers.SerializerMethodField()
    download_url = serializers.SerializerMethodField()

    class Meta:
        model = Version
        fields = ('revision', 'document', 'number', 'download_url')
        read_only_fields = ('revision', 'document', 'number', 'download_url')


    def get_number(self, obj):
        return obj.revision_number

    def get_download_url(self, obj):
        return obj.download_url


class DocumentSerializer(serializers.ModelSerializer):
    versions = VersionSerializer(many=True, read_only=True)

    class Meta:
        model = Document
        fields = (
            'id',
            'download_url',
            'versions',
            'created'
        )

        read_only_fields = (
            'id',
            'versions',
            'created'
        )


class SimpleDocumentSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(),
                                                      source='user', required=False,
                                                      write_only=True)
    class Meta:
        model = Document
        fields = (
            'id',
            'download_url',
            'created',
            'user_id'
        )

        read_only_fields = (
            'id',
            'download_url',
            'created'
        )
