from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from . import views

urlpatterns = [
    path('create-user/', views.CreateUser.as_view(), ),
    path('api/users/', views.UserList.as_view()),
    path('api/create/user/', views.RegisterUser.as_view()),
    path('token/obtain/', jwt_views.TokenObtainPairView.as_view(), name='token_create'),  # override sjwt stock token
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),

    path('post/', views.SaveImageView.as_view()),
    path('save-user/', views.SaveUser.as_view()),
    path('departments/', views.DepartmentList.as_view({'get':'list'})),
    # path('active/user/', views.CurrentUser.as_view({'get':'list'})),
    path('active/user/', views.CurrentUser.as_view()),
    path('user/logout/', views.logout_view),
]