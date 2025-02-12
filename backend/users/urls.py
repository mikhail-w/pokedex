# urls.py
from django.urls import path
from .views import RegisterUser, LoginView, LogoutView, GetUserTeam, UpdateUserTeam

urlpatterns = [
    path("register/", RegisterUser.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("team/", GetUserTeam.as_view(), name="get_team"),
    path("update_team/", UpdateUserTeam.as_view(), name="update_team"),
]
