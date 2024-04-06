# Generated by Django 5.0.4 on 2024-04-05 16:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('finance', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='finance',
            old_name='status',
            new_name='already_paid',
        ),
        migrations.RemoveField(
            model_name='finance',
            name='payback_amount',
        ),
        migrations.AlterField(
            model_name='finance',
            name='no_of_people',
            field=models.IntegerField(),
        ),
    ]