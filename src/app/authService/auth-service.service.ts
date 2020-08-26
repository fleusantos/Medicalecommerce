import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})

export class AuthServiceService {

  constructor( ) { }
  

  public isAuthenticated():boolean {
    const jwtHelper = new JwtHelperService();
    const token = localStorage.getItem('token')
    console.log(jwtHelper)
    console.log(jwtHelper.isTokenExpired(token))
    return !jwtHelper.isTokenExpired(token)
  }
}
