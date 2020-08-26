import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AllserviceService } from '../api/allservice.service';

@Component({
    selector: 'product_details',
    templateUrl: './product_details.component.html',
    styleUrls: ['./product_details.component.css']
})

export class ProductDetailsComponent implements OnInit {

    // All Variables
    product: any
    count: number = 1
    rate: number
    temp: number
    id: number
    totalDiscount: number
    MRid:number

    constructor(
        private service:AllserviceService,
        private activateRoute:ActivatedRoute,
        private route:Router) {
      
        this.id = this.activateRoute.snapshot.params['id']
      
        if(this.id){
            this.service.getProduct(this.id).subscribe(response => {
                console.log(response)
                this.product = response
                this.rate = this.product.priceWithDiscount
                this.temp = this.rate
            },err => {
                console.log(err)
            })

        }

     }


    OnIncrement(){
        this.count = this.count + 1
        this.rate = this.temp * this.count
    }

    OnDecrement(){
        if(this.count == 1){
            alert('Can not decrement')
        }
        else{
            this.count = this.count -1
            this.rate = this.temp * this.count
        }
     }

     onAddToCart(){
        if(localStorage['login_status'] == '0'){
            alert('You need to login first')
            this.route.navigate(['/MRlogin/home'])
        }
        else{
            if(confirm('Do You want to add itmes')){
                this.MRid = localStorage['id']
                this.totalDiscount = (this.product.price * this.count) - this.rate
                const obj = {
                    Quantity:this.count,
                    totalAmount:this.rate,
                    totalDiscount:this.totalDiscount,
                    MRid:localStorage.getItem('userprofile'), // Here need to Auth
                    productID:this.id
                }
                console.log(obj)

                this.service.postCart(obj).subscribe(response =>{
                    console.log(response)
               
                    alert("Added Cart Successfully")
                    this.route.navigate(['MRlogin/cart'])
                },err => {
                    console.log(err)
            })

         }

        }
     }

     OnOrderNow()
     {

     }
     
     OnBack(){
        if(localStorage['onBack'] == 'allopathic'){
            this.route.navigate(['/MRlogin/allopathic'])
        }
        else if(localStorage['onBack'] == 'ayurvedic'){
            this.route.navigate(['/MRlogin/ayurvedic'])
        }
        else if(localStorage['onBack'] == 'homo'){
            this.route.navigate(['/MRlogin/homoeopathy'])
        }
        else if(localStorage['onBack'] == 'searchProduct'){
            this.route.navigate(['/MRlogin/search'])
        }
        else{
            this.route.navigate(['/MRlogin/home'])
        }
        
     }

    ngOnInit() { }
}

