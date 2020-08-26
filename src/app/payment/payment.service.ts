import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
    baseUrl = 'http://15.207.175.199/api/paymentcart/'
    baseUrl1 = 'http://15.207.175.199/api/verifying/'

    constructor(private httpClient: HttpClient) { }

    getallCartDetails(order_id:any) {
      return this.httpClient.get(this.baseUrl,{params:{"order_id":order_id}})
    }

    paymentVerify(obj) {
      return this.httpClient.post(this.baseUrl1,obj)
    }
}
