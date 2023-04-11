import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import {Product} from '../domain/product';
import {ProductService} from '../service/productservice';
import { BreadcrumbService } from '../../app.breadcrumb.service';
import { loadPolice,loadStatistique } from "src/app/store/contrat/police/actions";
import { Observable, of, Subject } from "rxjs";
import { statistique } from 'src/app/store/contrat/police/selector';
import { Statistique } from 'src/app/store/contrat/police/model';
import { select, Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.state";
import { takeUntil } from "rxjs/operators";
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: ['dashboard.component.scss']
})
export class DashboardDemoComponent implements OnInit {
    destroy$ = new Subject<boolean>();
    chartData: any;

    chartOptions: any;

    items: MenuItem[];

    products: Product[];

    state$: Observable<Statistique>;
    state: Statistique;

    name = '';
    role = '';
    descTitle = '';
    descType = '';
    viewMessage = false;
    position = '';

    constructor(private productService: ProductService, 
        private breadcrumbService: BreadcrumbService, 
        private store: Store<AppState>, 
        private router: Router,
        public keycloak: KeycloakService) {
        this.breadcrumbService.setItems([
            { label: 'Dashboard', routerLink: [''] }
        ]);

        console.log('les roles du user est'+this.keycloak.getUserRoles());
        this.keycloak.loadUserProfile().then(profile => {
        console.log("===========profile===========>", profile['attributes'].role);
        this.name = profile.firstName + ' ' + profile.lastName;
        if (profile['attributes'].role.length != 0){
        this.role = profile['attributes'].role[0]; //gives you array of all attributes of user, extract what you need
            this.viewMessage = true;
            this.position = 'top';
        }
        /* if(this.role === 'ASSURE' || this.role === 'PRESTATAIRE' || this.role === 'GARANT'){
            this.router.navigate(['/portail/registerChoose']);
        } */
      }) 
        
    }

    ngOnInit() {       
        this.state$=this.store.pipe(select(statistique));
        this.store.dispatch(loadStatistique());
        this.state$.pipe(takeUntil(this.destroy$))
                  .subscribe(value => {
                    if (value) {
                      this.state = value;
                    }
        });


/*
        this.productService.getProducts().then(data => this.products = data);

        this.chartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'Sales',
                data: [12, 19, 3, 5, 2, 3, 9],
                borderColor: [
                    '#fd4a85',
                ],
                borderWidth: 3,
                borderDash: [5, 5],
                fill: false,
                pointRadius: 3
            }, {
                label: 'Income',
                data: [1, 2, 5, 3, 12, 7, 15],
                borderColor: [
                    '#12aeee',
                ],
                borderWidth: 3,
                fill: false
            },
                {
                    label: 'Expenses',
                    data: [7, 12, 15, 5, 3, 13, 21],
                    borderColor: [
                        '#a054e5',
                    ],
                    borderWidth: 3,
                    fill: false,
                    pointRadius: [4, 6, 4, 12, 8, 0, 4]
                },
                {
                    label: 'New Users',
                    data: [3, 7, 2, 17, 15, 13, 19],
                    borderColor: [
                        '#f8c336',
                    ],
                    borderWidth: 3,
                    fill: false
                }]
        };

        this.chartOptions = {
            responsive: true,
            hover: {
                mode: 'index'
            }
        };

        this.items = [
            { label: 'Save', icon: 'pi pi-fw pi-check' },
            { label: 'Update', icon: 'pi pi-fw pi-refresh' },
            { label: 'Delete', icon: 'pi pi-fw pi-trash' }
        ];
        */
    }

    etDecrption(title, type) {
        this.descTitle = title;
        this.descType = type;
      }
      resetvalue() {
        this.descTitle = '';
        this.descType = '';
      }
      explorer() {
        this.viewMessage = false;
        //this.router.navigateByUrl('/');
      }
}
