import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { MRloginService } from './MRlogin.service';
import * as toastr from 'toastr';


@Component({
    selector: 'MR-login',
    templateUrl: './MRlogin.component.html',
    styleUrls: ['./MRlogin.component.css']
})

export class MRloginComponent {
    email = ''
    password = ''
    rememberme = false
   // isLoggedIn = false

   

    constructor(private router: Router,
        private service: MRloginService) { }

    onlogin()
    {
        if(this.email.length == 0)
        {
            alert('email field can not be empty')
        }
        else if(this.password.length == 0)
        {
            alert('password can not be empty')
        }
        else
        {

             this.service.login(this.email,this.password).subscribe((response)=>{
                
            
                console.log(response)
                if(response)
                {
                
                    localStorage['login_status'] = '1'
                    localStorage['username'] = response["username"]
                    localStorage['id'] = response["id"]
                    localStorage['flag'] = '0'
                    localStorage['token'] = response['token']
                    localStorage['userprofile'] = response['userprofile']

                    this.router.navigate(['/MRlogin/home'])
                }
                else if(response['status']=='401')
                {

                    alert('invaild username or password')
                }

           })

        }

    }
 
    
}