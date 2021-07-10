from django import forms
from django.contrib import admin
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.forms import ReadOnlyPasswordHashField
from .models import *

# Register your models here.
class UserCreationForm(forms.ModelForm):
    """A form for creating new users. Includes all the required
    fields, plus a repeated password."""
    GEN_CHOICES = [('male', 'Male'),
                   ('female', 'Female'),
                   ('other', 'Other')]
    password1 = forms.CharField(label='Password', widget=forms.PasswordInput())
    password2 = forms.CharField(label='Password confirmation', widget=forms.PasswordInput())
    gender = forms.ChoiceField(choices=GEN_CHOICES)
    department = forms.ModelChoiceField(queryset=Department.objects.all())
    # faculty = forms.ModelChoiceField(queryset=Faculty.objects.all())

    class Meta:
        model = MyUser
        fields = ('firstname', 'email', 'username', 'userimage', 'department', 'password1',
                  'password2', 'gender', 'surname', 'othername')

    def clean_password2(self):
        # Check that the two password entries match
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError("Passwords don't match")
        return password2

    def save(self, commit=True):
        # Save the provided password in hashed format
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()
        return user


class UserChangeForm(forms.ModelForm):
    """A form for updating users. Includes all the fields on
    the user, but replaces the password field with admin's
    password hash display field.
    """
    password = ReadOnlyPasswordHashField()
    class Meta:
        model = MyUser
        fields = ('firstname', 'surname', 'othername', 'userimage', 'username', 'gender', 'email', 'department', 'password', 'is_active', 'is_admin',)

    def clean_password(self):
        # Regardless of what the user provides, return the initial value.
        # This is done here, rather than on the field, because the
        # field does not have access to the initial value
        return self.initial["password"]

# # Register your models here.
class UserAdmin(BaseUserAdmin):
    # The forms to add and change user instances
    form = UserChangeForm
    add_form = UserCreationForm

    # The fields to be used in displaying the User model.
    # These override the definitions on the base UserAdmin
    # that reference specific fields on auth.User.
    list_display = ('id', 'firstname', 'surname', 'othername', 'username', 'gender', 'email', 'department', 'userimage', 'is_active', 'is_admin', 'date_joined')
    list_filter = ('is_admin',)
    fieldsets = (
        (None, {'fields': ('username', 'password', 'department')}),
        ('Personal info', {'fields': ('firstname', 'surname', 'othername', 'email')}),
        ('Permissions', {'fields': ('is_admin', 'is_active')}),
    )
    # add_fieldsets is not a standard ModelAdmin attribute. UserAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('firstname', 'surname', 'othername', 'username', 'gender', 'email', 'department', 'userimage',
                       'password1', 'password2'),
        }),
    )
    search_fields = ('firstname',)
    ordering = ('date_joined',)
    filter_horizontal = ()


# Now register the new UserAdmin...
admin.site.register(MyUser, UserAdmin)
# ... and, since we're not using Django's built-in permissions,
# unregister the Group model from admin.
admin.site.unregister(Group)

class MyUserAdmin(admin.ModelAdmin):
    list_display = ('id', 'firstname', 'surname', 'othername', 'username', 'gender', 'email', 'department', 'userimage',
                    'is_active', 'is_admin', 'date_joined')

class FacultyAdmin(admin.ModelAdmin):
    list_display = ('faculty_id', 'faculty_name')


class DepartmentAdmin(admin.ModelAdmin):
    list_display = ('dept_id', 'dept_name', 'faculty')

class TrySaveImageAdmin(admin.ModelAdmin):
    list_display = ('title', 'file', 'content')


admin.site.register(TryImageUpload, TrySaveImageAdmin)
admin.site.register(Faculty, FacultyAdmin)
admin.site.register(Department, DepartmentAdmin)