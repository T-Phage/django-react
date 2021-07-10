from django.db import models
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser
)

# Create your models here.
class Faculty(models.Model):
    faculty_id = models.AutoField(primary_key=True)
    faculty_name = models.CharField(
        max_length=100,
        unique=True,
        blank=True,
        default=''
    )

    def __str__(self):
        return self.faculty_name

    class Meta:
        verbose_name_plural = 'Faculties'


class Department(models.Model):
    dept_id = models.AutoField(primary_key=True)
    dept_name = models.CharField(
        max_length=100,
        unique=True, 
    )
    faculty = models.ForeignKey(Faculty, null=True, verbose_name="faculty", on_delete=models.SET_NULL)

    def __str__(self):
        return self.dept_name

class MyUserManager(BaseUserManager):
    def create_user(self, email, username, password=None):
        """
        Creates and saves a User with the given email, date of
        birth and password.
        """
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
            username=username,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password=None):
        """
        Creates and saves a superuser with the given email, date of
        birth and password.
        """
        user = self.create_user(
            email,
            password=password,
            username=username,
        )

        user.is_admin = True
        user.save(using=self._db)
        return user

class MyUser(AbstractBaseUser):
    userimage = models.ImageField(
        upload_to='img',
        null=True,
        blank=True)
    username = models.CharField(
        verbose_name='username',
        max_length=255,
        unique=True,
    )
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )
    firstname = models.CharField(
        verbose_name='firstname',
        max_length=255,
        null=True,
    )
    surname = models.CharField(
        verbose_name='lastname',
        max_length=255,
        null=True,
    )
    othername = models.CharField(
        verbose_name='othername',
        max_length=255,
        null=True,
        blank=True,
    )
    gender = models.CharField(
        verbose_name='gender',
        max_length=255,
        null=True, default='null',
    )
    department = models.ForeignKey(
        Department,
        verbose_name='department',
        null=True,
        on_delete=models.SET_NULL,
    )
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)

    objects = MyUserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    def __str__(self):
        return self.username

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin

    def get_full_name(self):
        # The user is identified by their email address
        othername = ''
        if self.othername != 'null': 
            othername = self.othername   
        return self.firstname + " " + self.surname + " " + othername 

    class Meta:
        verbose_name_plural = 'Users'


class TryImageUpload(models.Model):
    title = models.TextField()
    content = models.TextField()
    file = models.ImageField(upload_to='img')