# Generated by Django 5.1.6 on 2025-02-09 07:19

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('finances', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='finances',
            name='update',
        ),
        migrations.AlterField(
            model_name='finances',
            name='create',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
