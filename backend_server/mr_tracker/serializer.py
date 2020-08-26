from rest_framework import serializers
from .models import UserProfile,Product,OrderDetails,Category,LocationOfDoctor,Doctors
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class LoginSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data["token"] = data.pop("access")
        data["id"] = self.user.id
        data["username"] = self.user.username
        userprofile = UserProfile.objects.get(user=self.user)
        data["userprofile"] = userprofile.pk
        data["role"] = userprofile.role
        return data

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = (
            'pk','user','joindate','phoneno','email','password',
            'username','firstname','lastname',)

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = (
            'pk','name','discount','price','priceWithDiscount',
            'doseInMG','mgfdate','expiredate','description','categoryid','image')

class OrderDetailsSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(source="productID.image",read_only=True)
    product_id = serializers.IntegerField(source="productID.pk", read_only=True)
    name = serializers.CharField(source="productID.name",read_only=True)
    category = serializers.CharField(source="productID.categoryid.title",read_only=True)

    class Meta:
        model = OrderDetails
        fields = (
            'pk','order_id','Quantity','totalAmount','totalDiscount','MRid','product_id','productID','image','name','category',
            'order_flag','OrderDate','deliveryDate')

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = (
            'pk','title','description'
        )

class LocationOfDoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = LocationOfDoctor
        fields = (
            'pk','fullname','phoneno','state','city','mrid','pincode','address','order_id'
        )

class DoctorsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctors
        fields = (
            'pk','firstname','phoneNo','lastname','degree'
        )

