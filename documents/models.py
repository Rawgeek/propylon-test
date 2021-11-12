import os
import uuid

from django.contrib.auth.models import User
from django.db import models
from reversion.models import Version
from django.db.models.expressions import Window, F, Value
from django.db.models.functions import Concat
from django.db.models.functions.window import RowNumber


def user_directory_path(instance, filename):
    folder = f'user_{instance.user.id}'
    ext = os.path.splitext(filename)[-1]
    new_filename = str(uuid.uuid1())
    return f'{folder}/{new_filename}{ext}'

class Document(models.Model):
    """
    Stores files of any type and name
    Stores files at any URL
    Does not allow interaction by non-authenticated users
    Does not allow a user to access files submitted by another user
    Allows users to store multiple revisions of the same file at the same URL
    Allows users to fetch any revision of any file
    """

    user = models.ForeignKey(User, on_delete=models.PROTECT)
    download_url = models.CharField(max_length=1024, db_index=True)
    attachment_file = models.FileField(upload_to=user_directory_path)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'download_url')
        ordering = ['-id']

    def __str__(self):
        return '{} : {}'.format(
            self.user_id, self.download_url
        )

    @property
    def versions(self):
        return Version.objects\
            .get_for_object(self)\
            .order_by('-id')\
            .annotate(revision_number = Window(expression=RowNumber()) - 1)\
            .annotate(download_url = Concat(
                Value(f'{self.download_url}?revision='), F('revision_number'),
                output_field=models.CharField()
            ))

    def get_version(self, version_number):
        return Version.objects\
            .get_for_object(self)\
            .order_by('id')[version_number]
