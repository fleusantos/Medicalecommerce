from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from phonenumber_field.modelfields import PhoneNumberField
import re
import datetime

# Create your models here.


class Common(models.Model):
    created_date = models.DateTimeField('created_date', auto_now_add=True)
    update_date = models.DateTimeField('update_date', auto_now=True)
    active = models.BooleanField('active', default=True)

    class Meta:
        abstract = True

class Category(Common):
    objects = None
    title = models.CharField('title', max_length=255)
    description = models.CharField('description', max_length=255)
    created_user = models.ForeignKey(
        User, on_delete=models.PROTECT, related_name="category_created_user")

    class Meta:
        verbose_name_plural = "Category"
        indexes = [
            models.Index(fields=['title', 'active']),
            models.Index(fields=['description', 'title', 'active']),
        ]

    def __str__(self):
        return "{}".format(self.title)

class Product(Common):
    objects = None
    name = models.CharField('name', max_length=255)
    price = models.IntegerField('price', default=0)
    discount = models.IntegerField('discount', default=0)
    priceWithDiscount = models.IntegerField('priceWithDiscount', default=0)
    doseInMG = models.IntegerField('doseInMG', default=0)
    mgfdate = models.DateField('mgfdate')
    expiredate = models.DateField('expiredate')
    description = models.CharField('description', max_length=255)
    image = models.ImageField(upload_to='products/')
    categoryid = models.ForeignKey(Category,on_delete=models.PROTECT, related_name='categoryid')
    created_user = models.ForeignKey(
        User, on_delete=models.PROTECT, related_name="product_created_user")

    class Meta:
        verbose_name_plural = "Product"
        indexes = [
            models.Index(fields=['name', 'active']),
            models.Index(fields=['name', 'price', 'active']),
        ]

    def __str__(self):
        return "{}".format(self.name)

    
class UserProfile(Common):
    ROLES = ( 
        ("user", "user"), 
        ("admin", "admin"), 
        ("mr", "mr")
    )
    objects = None
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="user_of_userprofile")
    username = models.CharField('username', max_length=20)
    joindate = models.DateField('joindate', blank=True, null=True)
    firstname = models.CharField('firstname', max_length=255)
    lastname = models.CharField('lastname', max_length=255)
    phoneno = PhoneNumberField('phoneno', max_length=255)
    email = models.CharField('email', max_length=255)
    password = models.CharField('password', max_length=255)
    role = models.CharField( 
        max_length = 5, 
        choices = ROLES) 
    created_user = models.ForeignKey(
        User, on_delete=models.PROTECT, related_name="userpro_created_user")

    class Meta:
        verbose_name_plural = "UserProfile"
        indexes = [
            models.Index(fields=['user', 'active']),
            models.Index(fields=['user', 'phoneno', 'active']),
        ]

    def __str__(self):
        return "{}".format(self.user)

class PaymentDetails(Common):
    objects= None
    order_id = models.CharField('order_id',max_length=20,primary_key=True)
    created_user = models.ForeignKey(
        User, on_delete=models.PROTECT, related_name="payment_created_user")
    pay_status = models.BooleanField('pay_status',default=False)

    class Meta:
        verbose_name_plural = "PaymentDetails"
        indexes = [
            models.Index(fields=['order_id', 'active']),
            models.Index(fields=['order_id', 'pay_status','active']),
        ]

    def __str__(self):
        return "{}".format(self.pk)

class OrderDetails(Common):
    objects = None
    Quantity = models.IntegerField('Quantity')
    totalAmount = models.IntegerField('totalAmount')
    totalDiscount = models.IntegerField('totalDiscount')
    order_id = models.ForeignKey(PaymentDetails,on_delete=models.PROTECT, related_name='payment_order',null=True)
    MRid  = models.ForeignKey(UserProfile,on_delete=models.PROTECT, related_name='MRid')
    productID = models.ForeignKey(Product, on_delete=models.PROTECT, related_name='productID')
    OrderDate = models.DateField('OrderDate',null=True,blank=True)
    deliveryDate = models.DateField('deliveryDate',null=True,blank=True)
    order_flag = models.BooleanField('order_flag',default=False)
    created_user = models.ForeignKey(
        User, on_delete=models.PROTECT, related_name="order_created_user")

    class Meta:
        verbose_name_plural = "OrderDetails"
        indexes = [
            models.Index(fields=['MRid', 'active']),
            models.Index(fields=['MRid', 'productID', 'active']),
        ]

    def __str__(self):
        return "{}".format(self.productID)




class LocationOfDoctor(Common):
    objects = None
    order_id = models.ForeignKey(PaymentDetails, on_delete=models.PROTECT, related_name = 'location_order_id')
    fullname = models.CharField('fullname',max_length=255)
    phoneno = PhoneNumberField('phoneno')
    state = models.CharField('state', max_length=255)
    city = models.CharField('city', max_length=255)
    mrid  = models.ForeignKey(UserProfile,on_delete=models.PROTECT, related_name='mrid')
    pincode = models.CharField('pincode',max_length=6)
    address = models.CharField('address',max_length=255)
    created_user = models.ForeignKey(
        User, on_delete=models.PROTECT, related_name="location_created_user")

    class Meta:
        verbose_name_plural = "LocationOfDoctor"
        indexes = [
            models.Index(fields=['fullname', 'active']),
            models.Index(fields=['fullname', 'phoneno', 'active']),
        ]

    def __str__(self):
        return "{}".format(self.fullname)

class Doctors(Common):
    objects = None
    firstname = models.CharField('firstname',max_length=255)
    phoneNo = PhoneNumberField('phoneNo')
    lastname = models.CharField('state', max_length=255)
    degree = models.CharField('degree', max_length=255)
    created_user = models.ForeignKey(
        User, on_delete=models.PROTECT, related_name="doctor_created_user")

    class Meta:
        verbose_name_plural = "Doctors"
        indexes = [
            models.Index(fields=['firstname', 'active']),
            models.Index(fields=['firstname', 'phoneNo', 'active']),
        ]

    def __str__(self):
        return "{}".format(self.firstname)






