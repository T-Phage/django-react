from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import *
from django.core.files.storage import FileSystemStorage

class DepartmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Department
        fields = '__all__'

class UserListSerializer(serializers.ModelSerializer):

    class Meta:
        model = MyUser
        fields = ('firstname', 'surname', 'othername', 'username', 'password', 'email', 'department', 'userimage', 'gender') 
        extra_kwargs = {'password':{'write_only':True}}

class MyUserRegisterSerializer(serializers.ModelSerializer):
    GENDER_CHOICE = [('male','male'),('femaile','female'), ('other','other')]
    
    email = serializers.EmailField(required=True)
    username = serializers.CharField(required=True)
    firstname = serializers.CharField()
    surname = serializers.CharField()
    othername = serializers.CharField()
    # department = serializers.ChoiceField(choices=Department.objects.all())
    password = serializers.CharField(min_length=3, write_only=True)
    gender = serializers.ChoiceField(choices=GENDER_CHOICE)

    class Meta:
        model = MyUser
        fields = ('firstname', 'surname', 'othername', 'username', 'password', 'email', 'department', 'userimage', 'gender')

    def create(self, validated_data):
        serializer = MyUserRegisterSerializer(data=validated_data)
        if serializer.is_valid():
            password = validated_data.pop('password', None)
            instance = self.Meta.model(**validated_data)  # as long as the fields are the same, we can just use this
            if password is not None:
                instance.set_password(password)
            instance.save()    
            # serializer.set_password(validated_data['password'])
            # password = validated_data['password']
            # serializer.save()
            return instance
        # user = User.objects.create(
        #     username=validated_data['username'],
        #     email=validated_data['email'],
        #     first_name=validated_data['first_name'],
        #     last_name=validated_data['last_name']
        # )

        # user.set_password(validated_data['password'])
        # user.save()

        # return user
        # password = validated_data.pop('password', None)
        # instance = self.Meta.model(**validated_data)  # as long as the fields are the same, we can just use this
        # if password is not None:
        #     instance.set_password(password)
        # instance.save()
        
        # return instance

class CreateUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = MyUser
        fields = ('username', 'email', 'password')

    def create(self, validated_data):
        user = MyUser.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            # userimage=validated_data['userimage']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class PostSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = TryImageUpload
        fields = ('title', 'content', 'file')


class SaveUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = MyUser
        fields = ('firstname', 'surname', 'othername', 'username', 'password', 'email', 'department', 'userimage', 'gender')

    def create(self, validated_data):
        pic = validated_data.FILES['image']
        fs = FileSystemStorage()
        image = fs.save(pic.name, pic)

        dept= Department.objects.get(dept_id=validated_data['department'])
        user = MyUser.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            userimage=f"img/{image}",
            firstname=validated_data['firstname'],
            surname=validated_data['surname'],
            othername=validated_data['othername'],
            department=dept,#int(validated_data['department']),
            gender=validated_data['gender']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class CurrentUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = MyUser
        fields = '__all__'
        extra_kwargs = {'password': {'write_only':True}}