# Generated by Django 5.1.1 on 2025-02-10 18:55

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('relationship', '0004_relationship_comprehension_relationship_curiosity_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='relationship',
            name='create',
            field=models.DateField(default=django.utils.timezone.now),
        ),
    ]
