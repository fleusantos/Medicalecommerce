import { Component, TemplateRef } from '@angular/core';
import { CanActivate,Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MRloginService } from './MRlogin/MRlogin.service';
import { MRRegisterService } from './MRRegister/MRRegister.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // providers:[BsModalService]
})


export class AppComponent implements CanActivate {
  modalRef: BsModalRef;

  title = 'MRTracker';
  isLoggedIn = false
  username:String
  search: String

  status = localStorage['login_status']
  config = {
    animated: true,
    class: 'modal-dialog-centered'
  };
  email:any;
  password:any;

  register_username: string =''
  firstname: string =''
  lastname: string =''
  // joindate: string = '1990/01/01'
  phoneno: string =''
  register_email: string = ''
  register_password: string =''

  constructor(private router:Router,private modalService: BsModalService,
    private service:MRloginService, private registerservice:MRRegisterService)
  {
   
    this.loadStatus()
  }

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
                if(response["role"] == 'admin')
                {
                
                    localStorage['login_status'] = '1'
                    localStorage['username'] = response["username"]
                    localStorage['id'] = response["id"]
                    localStorage['flag'] = '0'
                    localStorage['token'] = response['token']
                    localStorage['userprofile'] = response['userprofile']
                    this.username = response["username"]
                    this.modalRef.hide()
                    this.isLoggedIn = true
                    this.service.isLoggedIn(this.isLoggedIn)
                    this.router.navigate(['/login/dashboard'])
                }
                else
                {
                  localStorage['login_status'] = '1'
                  localStorage['username'] = response["username"]
                  localStorage['id'] = response["id"]
                  localStorage['flag'] = '0'
                  localStorage['token'] = response['token']
                  localStorage['userprofile'] = response['userprofile']
                  this.username = response["username"]
                  this.modalRef.hide()
                  this.isLoggedIn = true
                  this.service.isLoggedIn(this.isLoggedIn)
                  this.router.navigate(['/MRlogin/home'])
                }

           })

        }

    }

    onadd()
    {
        if(this.register_username.length == 0){
            alert('username is required')
        }
        else if(this.firstname.length == 0){
            alert('firstname is required')
        }
        else if(this.lastname.length == 0){
            alert('lastname is required')
        }
        else if(this.phoneno.length == 0){
            alert('phone number is required')
        }
        else if(this.register_email.length == 0){
            alert('email is required')
        }
        else if(this.register_password.length ==0){
            alert('password is required')
        }
        else{

        

        this.registerservice.addUsers(this.register_username,
          this.firstname,this.lastname,this.phoneno,
          this.register_email,this.register_password).subscribe((response)=>{
                if(response['result']=='success')
                {
                    alert('you have successfully register')
                    this.modalRef.hide()
                    // this.router.navigate(['/MRlogin'])

                }
                else
                {
                    console.log(response['error'])
                    alert('error')
                }
            })

        }
    }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,{ class: 'modal-dialog-centered',
    ignoreBackdropClick: true, 
    keyboard: false
  });
  }

  openRegisterModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,{ class: 'modal-dialog-centered',
    ignoreBackdropClick: true, 
    keyboard: false
  });
  }

  canActivate()
  {  
      this.loadStatus()
      return true
  }
 
  
  loadStatus()
  {
      if(this.status == '1')
      {
        this.isLoggedIn = true
        this.username = localStorage['username']
      }
  }


  onLogout()
  {
    if(confirm('Are you sure to log out'))
    {
      this.isLoggedIn = false
      localStorage['login_status'] = '0'
      localStorage['username'] = null
      localStorage['id'] = null
      localStorage.removeItem('token')
      // localStorage.clear()
      this.isLoggedIn = false


      this.router.navigate(['/MRlogin/home'])
    }
  }

  onSearch()
  {
    localStorage['searchValue'] = this.search

    this.router.navigate(['/MRlogin/search'])
  }

}
