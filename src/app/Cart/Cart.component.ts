import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AllserviceService } from '../api/allservice.service';

@Component({
    selector: 'product_details',
    templateUrl: './Cart.component.html',
    styleUrls: ['./Cart.component.css']
})


export class CartComponent implements OnInit {

    // All variables
    Cart:any
    TotalAmountOfProduct:number = 0;
    TotalSaved:number = 0;
    msg:String
    empty: boolean
    
    constructor(
        private service:AllserviceService,
        private route:Router) {
        this.loadProduct()
     }

     ngOnInit() { 

        if(localStorage['login_status'] != '1'){
            alert('you are not logged in')
            this.route.navigate(['/MRlogin/home'])
        }
    }
    
    //  continue Shop button
    continueShop() {
        this.route.navigate(['MRlogin/home'])
    }

    // Load cart products
    loadProduct()
    {
        this.service.getCart().subscribe(response =>{
           
            this.Cart = response["results"]
            console.log(this.Cart)
            
            //TO GET TOTAL MONEY AND SAVING
            
            if(this.Cart.length == 0){
                this.msg = 'your cart is empty'
                this.empty = true
            }
            else{
                this.msg = 'your items list'
                this.empty = false
            }
            for(let i = 0;i < this.Cart.length;i++)
            {
                this.TotalAmountOfProduct = this.TotalAmountOfProduct + this.Cart[i].totalAmount
                this.TotalSaved = this.TotalSaved + this.Cart[i].totalDiscount
                
            } 

        }, err => {
            console.log(err)
        })
    }
    
    // Edit Cart details
    onEdit(id:number,tableid:number,quantity:number) {
        console.log(id,tableid,quantity)
        localStorage['orderDetailsTableID'] = tableid
        localStorage['Quantity'] = quantity
        this.route.navigate(['/MRlogin/cartEdit/'+id])
    }

    // Place Order Button
    onOrderPlace(){
        this.TotalAmountOfProduct = this.TotalAmountOfProduct * 100
        localStorage['totalAmount'] = this.TotalAmountOfProduct
        this.route.navigate(['/MRlogin/cart/placeorder'])   
    }

   
    // Delete from cart
    deleteFromCart(id:number){
        this.service.DeleteFromCart(id).subscribe(
            response => {
                alert("removed")
                this.TotalAmountOfProduct = 0
                this.TotalSaved = 0
                this.loadProduct();

            },err => {
                console.log(err)
            }
        )
    }

    
}

