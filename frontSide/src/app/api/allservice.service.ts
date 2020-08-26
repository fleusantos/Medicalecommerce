import { Injectable } from '@angular/core';
import { BaseUrl } from '../BaseUrl/BaseUrl';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AllserviceService {

  baseUrl:any;

  constructor(private url:BaseUrl,private http:HttpClient) { 
    this.baseUrl = this.url.url
  }

  // Cart Service
  postCart(data) {
    return this.http.post(this.baseUrl + "/cart/",  data)

  }

  getCart() {
    return this.http.get(this.baseUrl + "/cart/")
  }

  postInCart(data){
    return this.http.put(this.baseUrl + "/cart/" + data.pk + "/",data)
  }

  DeleteFromCart(id:number){
    return this.http.delete(this.baseUrl + "/cart/" + id)
  }

  // Products Service

  getAllProducts() {
    return this.http.get(this.baseUrl + "/products/")
  }

  getProduct(id: number){ //get by Id
    return this.http.get(this.baseUrl + "/products/" + id)
  }

  DeleteFromCartProduct(id:number){
    return this.http.delete(this.baseUrl + "/products/" + id)
  }

  // User Orders

  getAllUserProducts(mrid:any) { //user orders products
    return this.http.get(this.baseUrl + "/userorders/",{params:{"mrid":mrid}})
  }

  deleteProduct(id: number) { //delete products from user order
    //  this.url = this.url+ '/'+id
     return this.http.delete(this.baseUrl + "/userorders/" + "/" + id)
  }

  // Confirm Order and locations
  UpdateOrders(data){
    return this.http.put(this.baseUrl + "/confirmorder/" + data.MRid + "/", data)
  } 


  InsertLocation(data){
    return this.http.post(this.baseUrl + "/doctorlocation/", data)
  }

  // Payment Service
  getallCartDetails(order_id:any) {
    return this.http.get(this.baseUrl + "/paymentcart/", {params:{"order_id":order_id}})
  }

  paymentVerify(data) {
    return this.http.post(this.baseUrl + "/verifying/", data)
  }

  // Dashboard
  getCounts() {
    return this.http.get(this.baseUrl + "/dashboard/")
  }




}
