# Generated by Django 4.0.3 on 2023-09-06 00:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointment',
            name='status',
            field=models.CharField(default='pending', max_length=20),
        ),
        migrations.AlterField(
            model_name='automobilevo',
            name='import_href',
            field=models.CharField(max_length=200, unique=True),
        ),
        migrations.AlterField(
            model_name='automobilevo',
            name='vin',
            field=models.CharField(max_length=17, unique=True),
        ),
        migrations.AlterField(
            model_name='technician',
            name='first_name',
            field=models.CharField(max_length=25),
        ),
        migrations.AlterField(
            model_name='technician',
            name='last_name',
            field=models.CharField(max_length=25),
        ),
    ]
