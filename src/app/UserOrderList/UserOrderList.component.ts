import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TextAttribute } from '@angular/compiler/src/render3/r3_ast';
import { AllserviceService } from '../api/allservice.service';


@Component({
    selector: 'doctor-list',
    templateUrl: './UserOrderList.component.html',
    styleUrls: ['./UserOrderList.component.css']
})

export class UserOrderListComponent  {

    products: any[]
    mrid:number
    date:Date
    noOrders:boolean = false

    constructor(
      private service : AllserviceService) {
      this.loadAllProducts()
    }
 

    ondelete(id: number) {
      console.log(id)
      if(confirm('Are you sure to delete an item')){
          this.service.deleteProduct(id).subscribe(response => {
              if (response['status'] == 'success') {
                window.location.reload()
                //this.loadAllProducts()
              } else {
                console.log(response['error'])
              }
            })
        }
      }

  loadAllProducts() {
    this.date = new Date()
    this.mrid = localStorage['userprofile']
    this.service.getAllUserProducts(this.mrid).subscribe(response => {
        console.log(response)
        this.products = response['results']
        if(this.products.length == 0) {
          this.noOrders = true
        } else {
          this.noOrders = false
        }
      })
  }

  isexpire(product) {
    const currentdate= new Date()
    return new Date(product.deliveryDate).valueOf() < new Date(currentdate).valueOf();
  }

}