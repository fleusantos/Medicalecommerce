import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class MRloginService {
    http: HttpClient
    url = 'http://15.207.175.199/api/login/'   //express port 4000


    constructor(private httpClient: HttpClient) {
        this.http = httpClient
     }
    
     login(email:String, password:String)
     {
        const body ={
            username:email,
            password:password
         }

        return this.http.post(this.url,body)
     }
    
     
    isLoggedIn(data) {
        return data
    }

}