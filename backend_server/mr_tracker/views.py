from django.shortcuts import render
import datetime
from django.contrib.auth.models import User
from rest_framework import viewsets,response
from .models import UserProfile,Product,OrderDetails,LocationOfDoctor,Doctors,Category,PaymentDetails
from .serializer import (
    ProfileSerializer,ProductSerializer,OrderDetailsSerializer,
    LocationOfDoctorSerializer,LoginSerializer,CategorySerializer)
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.db.models import Q
from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework import status
from django.http import Http404
from rest_framework_simplejwt.views import TokenObtainPairView
from datetime import datetime

import razorpay

# Razorpay client id and seecret Id
client = razorpay.Client(auth=("rzp_test_4vuUf0wnOr0c6c", "jJl0ngJid9CdPRftUN88ytnM"))


# ID generations by timestamp
def id(order):
    return order + datetime.now().strftime('%y%m%d%H%M%S')


# Login View
class LoginView(TokenObtainPairView):
    queryset = User.objects.all()
    serializer_class = LoginSerializer

# Register View new user
class RegisterUser(APIView):
    permission_classes = (AllowAny,)


    def post(self, request):
        data = request.data
        try:
            n_user = User.objects.create_user(
                username=data["username"],
                password=data["password"],
                first_name=data["firstname"],
                last_name=data["lastname"],
                email=data["email"],
                is_staff=True)
            UserProfile.objects.create(
                user=n_user,
                username=data["username"],
                firstname=data["firstname"],
                lastname=data["lastname"],
                phoneno=data["phoneno"],
                email=data["email"],
                password=data["password"],
                created_user=n_user
                )
            return response.Response({"result": "success"})
        except Exception as e:
            return response.Response({"error": str(e)})

# Category View
class CategoryViewset(viewsets.ModelViewSet):
    queryset = Category.objects.filter(active=True)
    serializer_class = CategorySerializer

    def perform_create(self,serializer):
        serializer.save(created_user=self.request.user)

# User Profile View
class UserProfileViewSet(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated,)
    queryset = UserProfile.objects.filter(active="True")
    serializer_class = ProfileSerializer

    def perform_create(self,serializer):
        serializer.save(created_user=self.request.user,user=self.request.user)

# Product View
class ProductsViewSet(viewsets.ModelViewSet):
    permission_classes = (AllowAny,)

    queryset = Product.objects.filter(active=True)
    serializer_class = ProductSerializer

    def perform_create(self,serializer):
        serializer.save(created_user=self.request.user)

# Cart View
class CartViewSet(viewsets.ModelViewSet):
    queryset = OrderDetails.objects.filter(active=True)
    serializer_class = OrderDetailsSerializer

    def perform_create(self,serializer):
        serializer.save(created_user=self.request.user)

   
    def get_queryset(self):
        user = self.request.user
        if user:
            self.queryset = OrderDetails.objects.filter(Q(created_user=user) & Q(active=True) & Q(order_flag=False))
            return self.queryset
        else:
            return self.queryset

# Admin All Orders
class AllOrders(viewsets.ModelViewSet):

    queryset = OrderDetails.objects.filter(Q(active=False) & Q(order_flag=True))
    serializer_class = OrderDetailsSerializer

# User Orders
class UserOrders(viewsets.ModelViewSet):

    queryset = OrderDetails.objects.filter(Q(active=False) & Q(order_flag=True))
    serializer_class = OrderDetailsSerializer

    def get_queryset(self):

        user = self.request.user
        req = self.request
        mrid =  req.query_params.get('mrid')

        print(user)
        if user and mrid:
            self.queryset = OrderDetails.objects.filter(Q(created_user=user) & Q(MRid=mrid) & Q(active=False) & Q(order_flag=True))
            return self.queryset
        else:
            return self.queryset

# Confirm Order Payment RazorPay orderID Create 
class ConfirmOrder(APIView):

    def put(self, request, MRid):
       
        amount = request.data.pop('amount')
        DATA = {
            "amount"           : amount,
            "currency"         : 'INR',
            "receipt"          : 'order_rcptid_11',
            "payment_capture"  :  1,
            # "notes"  : {'Shipping address': 'Bommanahalli, Bangalore'}
        }
        
        order =  client.order.create(data=DATA)
        payment = PaymentDetails.objects.create(order_id=order['id'],created_user=self.request.user)
        payment.save()
        request.data['order_id'] = payment

        data = request.data
        OrderDetails.objects.filter(Q(MRid=MRid) & Q(active=True)).update(**data)
        new_order = {"order_id":str(payment)}
        return response.Response({"result":new_order})

# Verifying Payment by Razorpayment
class VerifyingPayment(APIView):

    def post(self,request):
        params_dict = { 
            'razorpay_order_id': request.data["OrderID"],
            'razorpay_payment_id': request.data["PaymentID"],
            'razorpay_signature': request.data["Signature"]
        }
        client.utility.verify_payment_signature(params_dict)
        OrderDetails.objects.filter(Q(order_id=request.data["OrderID"]) & Q(active=True)).update(order_flag=True,active=False)
        return response.Response({"result":"success"})


class PaymentCart(viewsets.ModelViewSet):

    queryset = OrderDetails.objects.filter(active=True)
    serializer_class = OrderDetailsSerializer

    def get_queryset(self):
        req = self.request
        order_id = req.query_params.get('order_id')
        user = self.request.user
        if order_id:
            self.queryset =  OrderDetails.objects.filter(Q(created_user=user) & Q(active=True) & Q(order_flag=False) & Q(order_id=order_id))
            return self.queryset



#Locations of Doctors
class LocationOfDoctorViewSet(viewsets.ModelViewSet):
    queryset = LocationOfDoctor.objects.filter(active=True)
    serializer_class = LocationOfDoctorSerializer

    def perform_create(self,serializer):
        serializer.save(created_user=self.request.user)

# Doctors
class DashboardAPIView(APIView):
    def get(self,request):
        mrs = UserProfile.objects.filter(Q(active=True) & Q(role='user') | Q(role='mr')).count()
        products = Product.objects.filter(active=True).count()
        orders = OrderDetails.objects.filter(order_flag=True).count()
        doctors = Doctors.objects.filter(active=True).count()
        data = {
            "mrs":mrs,
            "products":products,
            "orders":orders,
            "doctors":doctors
        }
        
        return response.Response({"results":data})


