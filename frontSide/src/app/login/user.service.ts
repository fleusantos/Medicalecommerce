
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class UserService {
    http: HttpClient
    url = 'http://15.207.175.199/api/userprofile/'   //express port 4000

    constructor(httpClient: HttpClient) {
        this.http = httpClient
     }

     getAllProducts() {
        return this.http.get(this.url)
      }

     getUsers()
     {
         return this.http.get(this.url)
     }
     deleteProduct(id: number) {
        return this.http.delete(this.url + '/' + id)
      }
}