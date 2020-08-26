import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllserviceService } from '../api/allservice.service';

@Component({
    selector: 'doctor-list',
    templateUrl: './product_list.component.html',
    styleUrls: ['./product_list.component.css']
})

export class ProductComponent  implements OnInit{

    products: any[]

    ngOnInit() {
      this.loadAllProducts()
    }


    constructor(private router: Router,private service : AllserviceService) {

    }

    onAddProduct()
    {
        this.router.navigate(['/login/dashboard/product/add_product'])
    }

    dashboard()
    {
        this.router.navigate(['/login/dashboard'])
    }


  loadAllProducts() {
    this.service.getAllProducts().subscribe(response => {
        this.products = response['results']
      }, err => {
        console.log(err)
      })
  }

   ondelete(productId: number) {
        this.service.DeleteFromCartProduct(productId).subscribe(response => {
            if (response['status'] == 'success') {
              this.loadAllProducts()
            } else {
              console.log(response['error'])
            }
          })
      }

      
   onSelect(id: number) {
    console.log(id)

    this.router.navigate(['/login/dashboard/product/edit_product/' + id])
   }
}