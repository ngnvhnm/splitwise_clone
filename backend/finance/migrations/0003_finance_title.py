# Generated by Django 5.0.4 on 2024-04-05 19:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('finance', '0002_rename_status_finance_already_paid_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='finance',
            name='title',
            field=models.CharField(default='Something', max_length=200),
        ),
    ]
