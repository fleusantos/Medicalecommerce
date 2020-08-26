import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WindowRef } from '../window/window-ref.service';
import { AllserviceService } from '../api/allservice.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  // All Variables
  order_id:String
  TotalAmountOfProduct:number = 0;
  Cart:any;
  TotalSaved:number = 0;
  payment_done: any = {};
  rzp1:any;


  constructor(private route:ActivatedRoute,private router:Router,
    private service:AllserviceService,private zone:NgZone,
    public winRef: WindowRef) { 
    
  }

 
  // Get All Cart Details
  getAllCart() {
    this.service.getallCartDetails(this.order_id).subscribe(
      response => {
        console.log(response)
        this.Cart = response["results"]
        console.log(this.Cart)
        for(let i = 0;i < this.Cart.length;i++){
            this.TotalAmountOfProduct = this.TotalAmountOfProduct + this.Cart[i].totalAmount
            this.TotalSaved = this.TotalSaved + this.Cart[i].totalDiscount
          }
      },err => {
        console.log(err)
      }
    )

  }

  ngOnInit() {
    this.order_id = this.route.snapshot.paramMap.get('order_id')
    this.getAllCart()

  }

  // Razorpaymet Integerations
  initPay(){
    // this.TotalAmountOfProduct = this.TotalAmountOfProduct * 100
    const options = {
      "key": 'rzp_test_4vuUf0wnOr0c6c', // Enter the Key ID generated from the Dashboard
      "amount": this.TotalAmountOfProduct, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise or INR 500.
      "order_id":this.order_id,
      "currency": "INR",
      "name": "Medical Representative",
      "description": "Online delivery Medicine",
      "image": "../assets/images/download.png",
      "handler": response => {
          // this.loading = true;
          this.payment_done = response;
          
          const obj = {
            "OrderID":this.payment_done["razorpay_order_id"],
            "PaymentID":this.payment_done["razorpay_payment_id"],
            "Signature":this.payment_done["razorpay_signature"]
          }


          alert(obj['OrderID'])
          alert(obj['PaymentID'])
          alert(obj['Signature'])
          if (obj['Signature'] != null) {
            this.zone.run(() => {
              // this.loading = true;
              if (obj) {
                this.service.paymentVerify(obj).subscribe(
                  response=>{
                   
                    alert("Payment Success for your Order " + this.order_id)
                    this.router.navigate(['MRlogin/cart'])
  
                  },
                  err=>{
                    // this.loading = false;
                    console.log(err)
                  }   
                ) 
              }
            });
          }
         
         
      },
      "prefill": {
        "name":"",
        "email":"",
        "contact":"",
      },
      "notes": {
        "address": ""
      },
      "theme": {
        "color": "#F37254"
      }
    };
    this.rzp1 = new this.winRef.nativeWindow.Razorpay(options);
    this.rzp1.open();
 }

}
