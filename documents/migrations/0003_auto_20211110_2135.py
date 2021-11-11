# Generated by Django 3.2.9 on 2021-11-10 21:35

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('documents', '0002_document_created'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='document',
            options={'ordering': ['-id']},
        ),
        migrations.AlterUniqueTogether(
            name='document',
            unique_together={('user', 'url')},
        ),
    ]