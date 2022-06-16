import {AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as L from 'leaflet';
import { AppState } from 'src/app/store/app.state';
import { Prestataire } from 'src/app/store/parametrage/prestataire/model';
import { loadPrestataire} from '../../store/parametrage/prestataire/actions';
import * as prestataireSelector from '../../store/parametrage/prestataire/selector';

@Component({
    selector: 'app-prestataire-cartographie',
    templateUrl: './prestataire-cartographie.component.html',
    styleUrls: ['./prestataire-cartographie.component.scss']
})

export class PrestataireCartographieComponent implements AfterViewInit {
    private map;
    private mapCart: any;
    private marker: any;
    prestataireList$: Observable<Array<Prestataire>>;
    prestataireList: Array<Prestataire>;
    destroy$ = new Subject<boolean>();


    constructor(
                private store: Store<AppState>,
                private messageService: MessageService,
                private fb: FormBuilder) {

                    
        

    }

   

    
        /* this.prestataireList$ = this.store.pipe(select(prestataireSelector.prestataireList));
            this.store.dispatch(loadPrestataire());
            this.prestataireList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
              if (value) {
                this.prestataireList = value.slice();
                console.log('prestataire', this.prestataireList);
      }
    }); */

        // this.loadLocalites();


       /*  this.store.pipe(select(selectSfdList)).pipe(takeUntil(this.destroy$))
            .subscribe(sfdList => {
                if (sfdList) {
                    this.sfdList = sfdList.slice();
                    this.sfdList.forEach(sfd => {
                        const myIcon = L.icon({
                            iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
                            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                            iconSize: [25, 41],
                            iconAnchor: [12, 41],
                            popupAnchor: [1, -34],
                            shadowSize: [41, 41]
                        });
                        // this.marker = L?.marker([sfd.latitude, sfd.longitude], {icon: myIcon});
                        //       essai
                        this.marker = L?.marker([-1.293255, 11.905720], {icon: myIcon});
                        this.marker?.addTo(this.mapCart);
                        this.marker?.bindTooltip(sfd.nom + '<br>' +
                            '<i class="layout-menuitem-icon ng-tns-c25-9 pi pi-fw pi-map-marker"></i> ' + sfd.nomLocalite);

                        // this.markersClsuter.addTo(this.mapCart);
                        // this.markersClsuters.push(this.marker);
                    });
                } else {
                   // this.store.dispatch(FetchSfdList());
                }
            }); */

        // this.checkStatus();

    /* checkStatus() {
        this.store.pipe(select(selectRequestStatus)).pipe(takeUntil(this.destroy$))
            .subscribe(statusObj => {
                if (statusObj) {
                    this.showToast(statusObj.status, 'INFORMATION', statusObj.message);
                    if (statusObj.status === StatusEnum.success) {
                        this.display = false;
                        this.editForm.reset();
                    }
                }
            });
    } */


    /*  loadLocalites() {
        this.localiteService.findAll().subscribe(value => {
            this.localiteList = value;
        });
    } */

    ngAfterViewInit(): void {
        this.createMap();
    }
    createMap(){
        const bf = {
            lat: 12.337372161077168,
            lng: -1.5596362929761654,
        };

        const zoomLevel = 5;

        this.mapCart = L.map('frugalmap', {
            center: [bf.lat, bf.lng],
            zoom: zoomLevel
        });

        const mainLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 10,
            minZoom: 3,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">contributors</a>'
        });

        mainLayer.addTo(this.mapCart);
    }
    
   

        /* this.mapCart = L.map('frugalmap').setView([12.337372161077168, -1.5596362929761654], 7);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 10,
            minZoom: 3,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">contributors</a>'
        }).addTo(this.mapCart); */
}
