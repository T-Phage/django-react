# Generated by Django 3.2.5 on 2021-07-10 13:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0002_alter_myuser_userimage'),
    ]

    operations = [
        migrations.AlterField(
            model_name='myuser',
            name='userimage',
            field=models.FileField(blank=True, null=True, upload_to='img/'),
        ),
        migrations.AlterField(
            model_name='tryimageupload',
            name='file',
            field=models.ImageField(upload_to='img/'),
        ),
    ]
