import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DrService } from '../doctor_list/dr.service';
import { AllserviceService } from '../api/allservice.service';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

    counts:any = {}

    constructor(private router: Router,private service:AllserviceService) { 
        
    }
    
    onlogout()
    {
        this.router.navigate(['/login'])
    }

    mrsRoute() {
        this.router.navigate(['/login/dashboard/user'])
    }

    doctorsRoute() {
        this.router.navigate(['/login/dashboard/drs'])
    }

    productsRoute() {
        this.router.navigate(['/login/dashboard/product'])
    }

    ordersRoute() {
        this.router.navigate(['/MRlogin/dashboard/orders'])
    }

    ngOnInit() { 
        this.service.getCounts().subscribe(
            response => {
                console.log(response)
                this.counts= response["results"]
            },err => {
                console.log(err)
            }
        )
    }
}