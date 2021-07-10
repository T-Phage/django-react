
from rest_framework import permissions, status, generics, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAdminUser
from django.core.files.storage import FileSystemStorage
from .models import *
from .serializers import *
from django.contrib.sites.models import Site
from django.contrib.sites.shortcuts import get_current_site
from django.core.mail import send_mail

# Create your views here.
class DepartmentList(viewsets.ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    permission_classes = (permissions.AllowAny,)

    # def list(self, request):
    #     queryset = self.get_queryset()
    #     serializer = self.get_serializer(queryset, many=True)
    #     return Response(serializer.data)


class CurrentUser(APIView):
    # queryset = MyUser.objects.all()
    serializer_class = CurrentUserSerializer
    # permission_class = (isAuthenticated)
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        queryset = MyUser.objects.filter(username=request.user)
        serializer = CurrentUserSerializer(request.user)
        # return Response(serializer.data)
        # print("site")
        # print(Site.objects.get_current().domain)
        context = {
            'name': f"{request.user.firstname} {request.user.surname} {request.user.othername}",
            'department': f"{request.user}",
            'faculty': f"{request.user}",
            'admin': f"{request.user.is_admin}",
            'email': f"{request.user.email}",
            'username': f"{request.user}",
            'userimage': f"https://testingmyapis.herokuapp.com{request.user.userimage.url}",
            'gender': f"{request.user.gender}"
            }
        # print(context)
        # print(serializer.data)
        return Response(context, status=status.HTTP_201_CREATED)

@api_view(('POST',))
def logout_view(request):
    # logout(request)
    # request.user.auth_token.delete()
    refresh_token = request.data['refresh']
    token = RefreshToken(refresh_token)
    print(token)
    token.blacklist()
    return Response({'message':'logged out'}, status=status.HTTP_200_OK)

class UserList(generics.ListCreateAPIView):
    queryset = MyUser.objects.all()
    serializer_class = UserListSerializer
    # permission_classes = [IsAdminUser]
    permission_classes = (permissions.AllowAny,)

    def list(self, request):
        # Note the use of `get_queryset()` instead of `self.queryset`
        queryset = self.get_queryset()
        print(request.user)
        serializer = UserListSerializer(queryset, many=True)
        return Response(serializer.data)

class CreateUser(generics.GenericAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = CreateUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message', 'sucessfully added'}, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RegisterUser(APIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = MyUserRegisterSerializer

    def post(self, request, format='json'):
        serializer = MyUserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            queryset = MyUser.objects.all()
            if user:
                json = MyUserRegisterSerializer(queryset, many=True)
                return Response({'message', 'sucessfully added'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# This is the working one
class SaveUser(generics.GenericAPIView):
    permission_classes = (permissions.AllowAny, )
    serializer_class = SaveUserSerializer

    def post(self, request, *args, **kwargs):
        pic = request.FILES['image']
        fs = FileSystemStorage()
        image = fs.save(pic.name, pic)

        dept= Department.objects.get(dept_id=request.POST.get('department'))
        user = MyUser(
            username=request.POST.get('username'),
            email=request.POST.get('email'),
            userimage=f"img/{image}",
            firstname=request.POST.get('firstname'),
            surname=request.POST.get('surname'),
            othername=request.POST.get('othername'),
            department=dept, #int(request.POST.get('department')),
            gender=request.POST.get('gender')
        )
        user.set_password(request.POST.get('password'))
        saved = user.save()

        # current_site = get_current_site(request)
        # send_mail(
        #     'Thanks for subscribing to %s alerts' % current_site.name,
        #     'Thanks for your subscription. We appreciate it.\n\n-The %s team.' % (
        #         current_site.name,
        #     ),
        #     'editor@%s' % current_site.domain,
        #     [user.email],
        # )
        
        if saved:
            print('error', )
            return Response({'message':'an error occured try again'}, status=status.HTTP_400_BAD_REQUEST)
        else: 
            return Response({'message':'saved successfully'}, status=status.HTTP_201_CREATED)
            

from rest_framework.parsers import MultiPartParser, FormParser

class SaveImageView(generics.GenericAPIView):
    permission_classes = (permissions.AllowAny,)
    parser_classes = (MultiPartParser, FormParser)
    # serializer_class = PostSerializer

    # def post(self, request, format='json'):
    #     serializer = PostSerializer(request.FILES, data=request.data)
    #     # serializer = self.get_serializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response({'message', 'sucessfully added'}, status=status.HTTP_201_CREATED)
    #     else:
    #         print(serializer.errors)
    #         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, *args, **kwargs):
        posts = TryImageUpload.objects.all()
        serializer = PostSerializer(posts, many=True)
        print(request.data)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = PostSerializer(request.FILES, data=request.data)
        print(request.data)
        title = request.POST.get('title')
        content = request.POST.get('content')
        pic = request.FILES['image']
        fs = FileSystemStorage()
        image = fs.save(pic.name, pic)
        tryimg = TryImageUpload(title=title, content=content, file=f"img/{image}")
        tryimg.save()

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Send email
# from django.contrib.sites.shortcuts import get_current_site
# from django.core.mail import send_mail

# def register_for_newsletter(request):
#     # Check form values, etc., and subscribe the user.
#     # ...

#     current_site = get_current_site(request)
#     send_mail(
#         'Thanks for subscribing to %s alerts' % current_site.name,
#         'Thanks for your subscription. We appreciate it.\n\n-The %s team.' % (
#             current_site.name,
#         ),
#         'editor@%s' % current_site.domain,
#         [user.email],
#     )