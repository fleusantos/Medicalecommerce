import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../authService/auth-service.service';
// import { AuthServiceService } from 'src/authService/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(public auth:AuthServiceService,public router:Router) {

  }

  //  canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  //   if(this.auth.isLoggedIn()){
  //     return true;
  //   }else{
  //     this.myRoute.navigate(["login"]);
  //     return false;
  //   }
  // }
  canActivate():boolean {
    if(!this.auth.isAuthenticated()) {
      this.router.navigate(['MRlogin/home'])
      alert("Please, login or register!!")
      return false
    }
    return true
  }
  
}
