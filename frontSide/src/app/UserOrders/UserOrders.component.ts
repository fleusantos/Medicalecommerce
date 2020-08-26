import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllserviceService } from '../api/allservice.service';


@Component({
    selector: 'add-user',
    templateUrl: './UserOrders.component.html',
    styleUrls : ['./UserOrders.component.css']
})

export class UserOrdersComponent implements OnInit {

    
    fullname = ''
    phoneno =''
    OrderDate: String = ''
    deliveryDate:String = ''
    state = ''
    city = ''
    pincode: String = ''
    address = ''
    order_id: any;
   
    

    constructor(private router: Router,private service: AllserviceService) { }

        
    onadd()
    {
        // const phoneno1:String = String(this.phoneno)
        const pincode1:String = String(this.pincode)
        if(this.fullname.length == 0){
            alert('fullname can not be empty')
        }
        else if(this.phoneno.length == 0){
            alert('phone no is empty or not a 10 digits')
        }
        else if(this.OrderDate.length == 0){
            alert('OrderDate is invaild')
        }
        else if(this.deliveryDate.length == 0){
            alert('DeliveryDate is invaild')
        }
        else if(this.state.length == 0){
            alert('state can not be empty')
        }
        else if(this.city.length == 0){
            alert('city can not be empty')
        }
        else if(pincode1.length == 0 || pincode1.length != 6){
            alert('invaid pincode')
        }
        else if(this.address.length == 0){
            alert('Adress can not be empty')
        }
        else{
        
           
            if(confirm('Are you sure ? Once Ordered can not be canceled' ))
            {   
                    const mrid = localStorage['id']

                    const addressOFdr = this.address +', ' + this.city +', ' + this.state +', ' + this.pincode
                    const drname = this.fullname
                    const drphoneno = this.phoneno

                    const obj = {
                        OrderDate:this.OrderDate,
                        deliveryDate:this.deliveryDate,
                        MRid:localStorage.getItem('userprofile'), //Auth need
                        amount:localStorage.getItem('totalAmount')
                        
                    }


                    this.service.UpdateOrders(obj).subscribe( response => {
                        this.order_id = response['result']['order_id']
                        console.log(response)
                        const body = {
                            fullname:drname,
                            phoneno:drphoneno,
                            state:this.state,
                            city:this.city,
                            pincode:this.pincode,
                            address:addressOFdr,
                            order_id : response['result']['order_id'],
                            mrid:localStorage.getItem('userprofile') //Auth Need
                        }
                        this.service.InsertLocation(body).subscribe(response =>{
                            console.log(response)
                            alert("Your Order Confirmed")
                            this.router.navigate(['/MRlogin/payment',{"order_id":this.order_id}])
                            // alert("Doctor Locations Added Successfully")
                            
                        },err => {
                            console.log(err)
                        })
                       
                           
                    },err => {
                        console.log(err)
                    })
            }
        }
       
    }

    ngOnInit() { }

}