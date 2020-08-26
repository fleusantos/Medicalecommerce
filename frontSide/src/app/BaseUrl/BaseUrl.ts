import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class BaseUrl {
    // url = "http://15.207.175.199/api";
    url = 'http://localhost:8000/api'

    ALL_API = {
        cart:'cart',

    }
}

