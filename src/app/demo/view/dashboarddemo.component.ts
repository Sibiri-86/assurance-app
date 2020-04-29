import { Component, OnInit } from '@angular/core';
import { CarService } from '../service/carservice';
import { Car } from '../domain/car';
import { MenuItem } from 'primeng/api';
import { BreadcrumbService } from '../../breadcrumb.service';

@Component({
    templateUrl: './dashboard.component.html'
})
export class DashboardDemoComponent implements OnInit {

    cars: Car[];

    cols: any[];

    chartData: any;

    chartOptions: any;

    selectedCar: Car;

    items: MenuItem[];

    constructor(private carService: CarService, private breadcrumbService: BreadcrumbService) {
        this.breadcrumbService.setItems([
            { label: 'Dashboard', routerLink: [''] }
        ]);
    }

    ngOnInit() {
        this.carService.getCarsMedium().then(cars => this.cars = cars);

        this.cols = [
            { field: 'vin', header: 'Vin' },
            { field: 'year', header: 'Year' },
            { field: 'brand', header: 'Brand' },
            { field: 'color', header: 'Color' }
        ];

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
    }
}
