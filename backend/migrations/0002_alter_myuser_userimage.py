# Generated by Django 3.2.5 on 2021-07-10 13:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='myuser',
            name='userimage',
            field=models.FileField(blank=True, null=True, upload_to='img'),
        ),
    ]