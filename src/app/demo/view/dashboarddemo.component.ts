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

@Component({
    templateUrl: './dashboard.component.html'
})
export class DashboardDemoComponent implements OnInit {
    destroy$ = new Subject<boolean>();
    chartData: any;

    chartOptions: any;

    items: MenuItem[];

    products: Product[];

    state$: Observable<Statistique>;
    state: Statistique;

    constructor(private productService: ProductService, private breadcrumbService: BreadcrumbService, private store: Store<AppState>) {
        this.breadcrumbService.setItems([
            { label: 'Dashboard', routerLink: [''] }
        ]);
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
    
}
