# Generated by Django 3.2.5 on 2021-07-10 04:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='TryImageUpload',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.TextField()),
                ('content', models.TextField()),
                ('file', models.ImageField(upload_to='img')),
            ],
        ),
        migrations.AddField(
            model_name='myuser',
            name='userimage',
            field=models.ImageField(blank=True, null=True, upload_to='img'),
        ),
        migrations.AlterField(
            model_name='department',
            name='dept_name',
            field=models.CharField(max_length=100, unique=True),
        ),
        migrations.AlterField(
            model_name='faculty',
            name='faculty_name',
            field=models.CharField(blank=True, default='', max_length=100, unique=True),
        ),
        migrations.AlterField(
            model_name='myuser',
            name='is_admin',
            field=models.BooleanField(default=True),
        ),
    ]