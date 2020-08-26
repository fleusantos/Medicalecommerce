from django.contrib import admin
from django.urls import path,include
from .views import (
    UserProfileViewSet,ProductsViewSet,CartViewSet,LocationOfDoctorViewSet,AllOrders,VerifyingPayment,
    ConfirmOrder,LoginView,RegisterUser,DashboardAPIView,CategoryViewset,PaymentCart,UserOrders)

from rest_framework import routers
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'userprofile', UserProfileViewSet)
router.register(r'products', ProductsViewSet)
router.register(r'cart', CartViewSet)
router.register(r'category', CategoryViewset)
router.register(r'doctorlocation', LocationOfDoctorViewSet)
router.register(r'allorders',AllOrders)
router.register(r'paymentcart',PaymentCart)
router.register(r'userorders',UserOrders)





urlpatterns = [
    path('', include(router.urls)),
    path('login/', LoginView.as_view()),
    path('register/',RegisterUser.as_view()),
    path('dashboard/',DashboardAPIView.as_view()),
    path('verifying/',VerifyingPayment.as_view()), #razorpay verifying signature
    path('confirmorder/<int:MRid>/', ConfirmOrder.as_view()),

]