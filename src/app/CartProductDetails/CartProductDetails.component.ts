import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AllserviceService } from '../api/allservice.service';

@Component({
    selector: 'Cartproduct_details',
    templateUrl: './CartProductDetails.component.html',
    styleUrls: ['./CartProductDetails.component.css']
})

export class CartProductDetailsComponent implements OnInit {

    // All variables
    product: any
    count: number = 1
    rate: number
    temp: number
    id: number
    totalDiscount: number
    MRid:number
    orderDetailsTableID:number

    constructor(private service:AllserviceService,
        private activateRoute:ActivatedRoute,
        private route:Router) {
      
        this.id = this.activateRoute.snapshot.params['id']
      
        if(this.id)
        {
            this.service.getProduct(this.id).subscribe(response => {
                console.log(response)
                this.product = response
                this.rate = this.product.priceWithDiscount
                this.temp = this.rate
            })

        }

        this.count = Number(localStorage['Quantity'])
     }

    //  Increment 
    OnIncrement(){
        this.count = this.count + 1
        this.rate = this.temp * this.count
    }
    
    OnDecrement(){
        if(this.count == 0){
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
            this.route.navigate(['/MRlogin'])
        }
        else{
            this.MRid = localStorage['id']
            this.orderDetailsTableID = localStorage['orderDetailsTableID']
            this.totalDiscount = (this.product.price * this.count) - this.rate

            if(this.count != 0){
                const body = {
                    Quantity:this.count,
                    totalAmount:this.rate,
                    totalDiscount:this.totalDiscount,
                    MRid:localStorage.getItem('userprofile'),//auth required
                    productID:this.id,
                    pk:this.orderDetailsTableID
                }
                this.service.postInCart(body)
               .subscribe(response =>{
                   console.log(response)
                    alert('item updated')
                    this.route.navigate(['MRlogin/cart'])
                })

            }
            else{
                this.service.DeleteFromCartProduct(this.orderDetailsTableID)
                .subscribe(response => {
                    if(response['status'] == 'success'){
                        alert('item updated')
                        this.route.navigate(['MRlogin/cart'])
                    }
                })
            }
        }
     }

     OnOrderNow()
     {

     }
     
    deleteFromCart(){
        this.service.DeleteFromCartProduct(this.orderDetailsTableID).subscribe(
            response => {
            console.log(response)
                
        })
    }

    ngOnInit() { }
}

