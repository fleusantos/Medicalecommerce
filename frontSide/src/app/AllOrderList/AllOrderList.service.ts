
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class AllOrderListService {

    http: HttpClient
    url = 'http://15.207.175.199/api/allorders'   //express port 4000
    url1 = 'http://15.207.175.199/api/cart'

    constructor(httpClient: HttpClient) {
        this.http = httpClient
     }

     getAllProducts() {
        return this.http.get(this.url)
      }
    
     deleteProduct(id: number) {
        
        this.url1 = this.url1+ '/'+id
        return this.http.delete(this.url1)
       
      }
    
}
