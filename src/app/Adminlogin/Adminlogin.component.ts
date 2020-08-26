import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MRloginService } from '../MRlogin/MRlogin.service';



@Component({
    selector: 'admin-login',
    templateUrl: './Adminlogin.component.html',
    styleUrls: ['./Adminlogin.component.css']
})

export class AdminloginComponent implements OnInit {
    email = ''
    password = ''

    constructor(private router: Router,private service:MRloginService) { }

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
                    // alert(response['role'])

                    if(response['role'] == 'admin') {
                        this.router.navigate(['/login/dashboard'])
                    }
                    else {
                        this.router.navigate(['MRlogin/home'])
                    }

                }
                else if(response['status']=='401')
                {

                    alert('invaild username or password')
                }

           })

        }

    }
    
    ngOnInit() { }
}