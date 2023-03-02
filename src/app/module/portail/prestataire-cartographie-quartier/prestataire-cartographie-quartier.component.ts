import {AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as L from 'leaflet';
import { AppState } from 'src/app/store/app.state';
import { Prestataire } from 'src/app/store/parametrage/prestataire/model';
import { loadPrestataire} from '../../../store/parametrage/prestataire/actions';
import * as prestataireSelector from '../../../store/parametrage/prestataire/selector';

import * as typePrestataireSelector from '../../../store/parametrage/type-prestataire/selector';
import { Departement } from 'src/app/store/parametrage/departement/model';
import * as quartierSelector from "../../../store/parametrage/quartier/selector";
import { loadDepartement } from 'src/app/store/parametrage/departement/actions';
import { PrestataireService } from 'src/app/store/parametrage/prestataire/service';
import { Quartier } from 'src/app/store/parametrage/quartier/model';
import { loadQuartier } from 'src/app/store/parametrage/quartier/actions';
import { TypePrestataire } from 'src/app/store/parametrage/type-prestataire/model';
import { loadTypePrestataire } from 'src/app/store/parametrage/type-prestataire/actions';

@Component({
    selector: 'app-prestataire-cartographie-quartier',
    templateUrl: './prestataire-cartographie-quartier.component.html',
    styleUrls: ['./prestataire-cartographie-quartier.component.scss']
})

export class PrestataireCartographieQuartierComponent implements OnInit, AfterViewInit {
    private map;
    private mapCart: any;
    private marker: any;
    prestataireList$: Observable<Array<Prestataire>>;
    prestataireList: Array<Prestataire>;
    typePrestataireList$: Observable<Array<TypePrestataire>>;
    typePrestataireList: Array<TypePrestataire>;
    destroy$ = new Subject<boolean>();
    selectedQuartier: Quartier = {};
    selectedTypePrestataire: TypePrestataire = {};
    markersClsuters: any[] = [];
    quartierList$: Observable<Array<Quartier>>;
    quartierList: Array<Quartier>;
    prestataire: Prestataire = {};
    /* prestataireList$: Observable<Array<Prestataire>>;
    prestataireList: Array<Prestataire>;
    destroy$ = new Subject<boolean>(); */


    constructor(
                private store: Store<AppState>,
                private messageService: MessageService,
                private prestataireService: PrestataireService,
                private fb: FormBuilder) {
    }

    ngOnInit() {
        
        this.loadPrestataire();
        this.quartierList$ = this.store.pipe(
            select(quartierSelector.quartierDtoList)
          );
          this.store.dispatch(loadQuartier());
          this.quartierList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
            if (value) {
              this.quartierList = value.slice();
            }
          });
          this.typePrestataireList$ = this.store.pipe(
            select(typePrestataireSelector.typePrestataireList)
          );
          this.store.dispatch(loadTypePrestataire());
          this.typePrestataireList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
            if (value) {
              this.typePrestataireList = value.slice();
            }
          });
    }

    onQuartierChange(selectedQuartier: Quartier) {
       
        this.prestataireService.getPrestataireByQuartierId(selectedQuartier.id).subscribe( (res) => {
            this.prestataireList = res;
            
            
        });
    }

    onQuartierChangeAndTpePrestataire(selectedQuartier: Quartier, selectedTypePrestataire: TypePrestataire) {
       
        this.prestataireService.getPrestataireByQuartierIdType(selectedQuartier.id, selectedTypePrestataire.id).subscribe( (res) => {
            this.prestataireList = res;
            
            
        });
    }

    loadPrestataire() {
        this.prestataireList$ = this.store.pipe(select(prestataireSelector.prestataireList));
        this.store.dispatch(loadPrestataire());
        this.prestataireList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
            if (value) {
                this.prestataireList = value.slice();
                console.log('**************>', this.prestataireList);
               
            }
        });
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
        this.initMap();
    }


    private initMap(): void {
        this.mapCart = L.map('frugalmap').setView([12.337372161077168, -1.5596362929761654], 7);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 20,
            minZoom: 3,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">SidiOpenStreetMap</a>'
        }).addTo(this.mapCart);
    }
    createMap(){
        /* const bf = {
            lat: 12.337372161077168,
            lng: -1.5596362929761654,
        };

        const zoomLevel = 7.4;

        this.mapCart = L.map('frugalmap', {
            center: [bf.lat, bf.lng],
            zoom: zoomLevel
        });

        const mainLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 20,
            minZoom: 5,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">contributors</a>'
        });


        mainLayer.addTo(this.mapCart); */

        /* const myIcon = L.icon({
            iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [15, 30],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [20, 35]
        });

        this.marker = L?.marker([11.1783203, -4.3372768 ], {icon: myIcon}).addTo(this.mapCart);
        this.marker?.bindTooltip( "Pharmacie hayatt"+ '<br>'+"téléphone: 20 97 00 00 ");
        this.marker = L?.marker([12.3828613, -1.4925553 ], {icon: myIcon}).addTo(this.mapCart);
        this.marker?.bindTooltip( "Clinique Frany"+ '<br>'+"téléphone:  25 36 99 32 ");
        this.marker = L?.marker([12.332294, -1.5633487 ], {icon: myIcon}).addTo(this.mapCart);
        this.marker?.bindTooltip( "Clinique Source de vie"+'<br>'+"téléphone:  78 56 98 46 "); */

        /* vimso
        12.375100
        -1.514594 */

       /*  Frany
       12.3828613,-1.4925553 */
    }
    
   

        /* this.mapCart = L.map('frugalmap').setView([12.337372161077168, -1.5596362929761654], 7);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 10,
            minZoom: 3,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">contributors</a>'
        }).addTo(this.mapCart); */
}
