import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AppComponent } from './app.component';
import { AdminloginComponent } from './Adminlogin/Adminlogin.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Route } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Add_userComponent } from './add_user/add_user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserService } from './login/user.service';
import { DoctorComponent } from './doctor_list/doctor_list.component';
import { DrService } from './doctor_list/dr.service';
import { Add_drComponent } from './add_dr/add_dr.component';
import { ProductComponent } from './product_list/product_list.component';
import { Add_productComponent } from './add_product/add_product.component';
import { AddUserService } from './add_user/adduser.service';
import { AddDRService } from './add_dr/adddr.service';
import { AddProductService } from './add_product/add_product.service';
import { Edit_userComponent } from './edit_user/edit_user.component';
import { EditUserService } from './edit_user/edit_user.service';
import { Edit_productComponent } from './edit_product/edit_product.component';
import { EditProductService } from './edit_product/edit_product.service';
import { MRloginComponent } from './MRlogin/MRlogin.component';
import { MRloginService } from './MRlogin/MRlogin.service';
import { UserHomeComponent } from './user_home/user_home.component';
import { ProductDetailsComponent } from './product_details/product_details.component';
import { AllopathicComponent } from './allopathic/allopathic.component';
import { AllopathicService } from './allopathic/allopathic.component.service';
import { HomoeopathyComponent } from './homoeopathy/homoeopathy.component';
import { HomoeopathyService } from './homoeopathy/homoeopathy.component.service';
import { AyurvedicComponent } from './ayurvedic/ayurvedic.component';
import { AyurvedicService } from './ayurvedic/ayurvedic.component.service';
import { SearchProductService } from './SearchProduct/SearchProduct.component.service';
import { SearchProductComponent } from './SearchProduct/SearchProduct.component';
// import { CartComponent } from './ Cart/Cart.component';
// import { CartService } from './ Cart/Cart.component.service';
import { MRRegisterComponent } from './MRRegister/MRRegister.component';
import { MRRegisterService } from './MRRegister/MRRegister.service';
import { CartProductDetailsComponent } from './CartProductDetails/CartProductDetails.component';
import { UserOrdersComponent } from './UserOrders/UserOrders.component';
import { UserOrderListComponent } from './UserOrderList/UserOrderList.component';
import { AllOrderListService } from './AllOrderList/AllOrderList.service';
import { AllOrderListComponent } from './AllOrderList/AllOrderList.component';
import { MROrderListComponent } from './MRorders/MRorders.component';
import { MRordersListService } from './MRorders/MRorders.service';
import { CartComponent } from './Cart/Cart.component';
import { httpInterceptProviders } from './interceptors';
import { PaymentComponent } from './payment/payment.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { ModalModule } from 'ngx-bootstrap/modal';
import { AuthServiceService } from './authService/auth-service.service';
import { AuthGuardGuard } from './auth/auth-guard.guard';
import { JwtHelperService } from '@auth0/angular-jwt';
const routes: Route[] = [

   { path: '', redirectTo: '/MRlogin/home', pathMatch: 'full' },

  // the default component
 // { path: '', component: AdminloginComponent },

  {path: 'login' , component: AdminloginComponent},
  {path: 'login/dashboard', component: DashboardComponent,canActivate:[AuthGuardGuard]},

  { path: 'login/dashboard/user', component: LoginComponent },
  {path: 'login/dashboard/drs', component: DoctorComponent,canActivate:[AuthGuardGuard]},
  {path: 'login/dashboard/product',component: ProductComponent,},

  {path: 'login/dashboard/user/add_user',component: Add_userComponent,canActivate:[AuthGuardGuard]},
  {path: 'login/dashboard/drs/add_dr',component: Add_drComponent,canActivate:[AuthGuardGuard]},
  {path: 'login/dashboard/product/add_product',component: Add_productComponent,canActivate:[AuthGuardGuard]},

  {path: 'login/dashboard/user/edit_user/:id',component: Edit_userComponent,canActivate:[AuthGuardGuard] },
  {path: 'login/dashboard/product/edit_product/:id',component: Edit_productComponent ,canActivate:[AuthGuardGuard]},

  {path: 'MRlogin/home', component: UserHomeComponent, canActivate: [AppComponent]},
  {path: 'MRlogin/payment', component: PaymentComponent,canActivate:[AuthGuardGuard]},



  {path: 'MRlogin', component: MRloginComponent},
  {path: 'MRlogin/product_details/:id', component: ProductDetailsComponent,canActivate:[AuthGuardGuard]},

  {path: 'MRlogin/allopathic', component: AllopathicComponent},
  {path: 'MRlogin/homoeopathy', component: HomoeopathyComponent},
  {path: 'MRlogin/ayurvedic', component: AyurvedicComponent},
  {path: 'MRlogin/search', component: SearchProductComponent,canActivate:[AuthGuardGuard]},
  {path: 'MRlogin/cart', component: CartComponent,canActivate:[AuthGuardGuard]},
  {path: 'MRregister', component: MRRegisterComponent},
  {path: 'MRlogin/cartEdit/:id', component: CartProductDetailsComponent,canActivate:[AuthGuardGuard]},
  {path: 'MRlogin/cart/placeorder', component: UserOrdersComponent,canActivate:[AuthGuardGuard]},
  {path: 'MRlogin/orders', component: UserOrderListComponent,canActivate:[AuthGuardGuard]},
  {path: 'MRlogin/dashboard/orders', component: AllOrderListComponent,canActivate:[AuthGuardGuard]},
  {path: 'MRlogin/dashboard/MRorders/:id', component: MROrderListComponent,canActivate:[AuthGuardGuard]}


]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminloginComponent,
    Add_userComponent,
    DashboardComponent,
    DoctorComponent,
    Add_drComponent,
    ProductComponent,
    Add_productComponent,
    Add_drComponent,
    Edit_userComponent,
    Edit_productComponent,
    MRloginComponent,
    UserHomeComponent,
    ProductDetailsComponent,
    AllopathicComponent,
    HomoeopathyComponent,
    AyurvedicComponent,
    SearchProductComponent,
    CartComponent,
    MRRegisterComponent,
    CartProductDetailsComponent,
    UserOrdersComponent,
    UserOrderListComponent,
    AllOrderListComponent,
    MROrderListComponent,
    PaymentComponent
    
  ],  
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ModalModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [
    UserService,
    DrService,
    AddUserService,
    AddDRService,
    AddProductService,
    EditUserService,
    EditProductService,
    MRloginService,
    AppComponent,
    AllopathicService,
    HomoeopathyService,
    AyurvedicService,
    SearchProductService,
    MRRegisterService,
    AllOrderListService,
    MRordersListService,
    JwtHelperService,
    AuthServiceService,
    httpInterceptProviders
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
