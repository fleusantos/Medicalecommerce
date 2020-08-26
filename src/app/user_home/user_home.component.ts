import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllserviceService } from '../api/allservice.service';

@Component({
    selector: 'userHome',
    templateUrl: './user_home.component.html',
    styleUrls: ['./user_home.component.css']
})

export class UserHomeComponent implements OnInit {


  // All Variables
  Allproducts: any
  username: any

  constructor(private router:Router,
    private service:AllserviceService) { 
    this.loadflag()
  }

  // Load products
  loadAllProducts() {
    this.service.getAllProducts().subscribe(response => {
        console.log(response)
        this.Allproducts = response['results']
       
      },err => {
        console.log(err)
      })
      localStorage['onBack'] = 'user'
  }


    loadflag(){
      if(localStorage['flag']=='0'){
        localStorage['flag']='1'
      }
    }

    ngOnInit() { 
      this.loadAllProducts()
    
    }


  OnSelectProduct(id: number) {
    this.router.navigate(['/MRlogin/product_details/' + id])
  }

}

