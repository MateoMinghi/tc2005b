from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('market/', views.market, name='market'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('login_c/' , views.login_c, name='login_c'),
    path('login_f/' , views.login_f, name='login_f'),
    path('pool/', views.pool, name='pool'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
