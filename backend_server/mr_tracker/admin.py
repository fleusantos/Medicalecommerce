from django.contrib import admin

# from .models import UserProfile
from .models import UserProfile,Category,Product,OrderDetails,LocationOfDoctor,Doctors,PaymentDetails

class UserProfileAdmin(admin.ModelAdmin):
    list_display = [
        'user', 'username','joindate','firstname','lastname','role','active',
        'phoneno','email','password','created_user']
    list_per_page = 15

class CategoryAdmin(admin.ModelAdmin):
    list_display = ['title','description','created_user','active']
    list_per_page = 15

class ProductAdmin(admin.ModelAdmin):
    list_display = [
        'name','price','discount','priceWithDiscount','doseInMG','active',
        'mgfdate','expiredate','description','categoryid','image',
        'created_user']
    list_per_page = 15

class OrderDetailsAdmin(admin.ModelAdmin):
    list_display = [
        "Quantity","totalAmount","totalDiscount","MRid",'active','order_flag','order_id','pk',
        "productID","OrderDate","deliveryDate","created_user",]
    list_per_page = 15

class LocationOfDoctorAdmin(admin.ModelAdmin):
    list_display = [
        "fullname","phoneno","state","city", "mrid","pincode","active","order_id",
        "address","created_user"]
    list_per_page = 15

class PaymentDetailsAdmin(admin.ModelAdmin):
    list_display = [
        "order_id","created_user","pay_status"]
    list_per_page = 15

class DoctorsAdmin(admin.ModelAdmin):
    list_display = [
        "firstname","phoneNo","lastname","degree","created_user","active",]
    list_per_page = 15


admin.site.register(UserProfile, UserProfileAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(OrderDetails, OrderDetailsAdmin)
admin.site.register(LocationOfDoctor, LocationOfDoctorAdmin)
admin.site.register(Doctors, DoctorsAdmin)
admin.site.register(PaymentDetails,PaymentDetailsAdmin)