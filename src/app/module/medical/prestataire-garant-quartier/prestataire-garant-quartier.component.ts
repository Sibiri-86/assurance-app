import { Component, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import {
  ControlContainer,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { elementAt, takeUntil } from 'rxjs/operators';
import { SousActe, SousActeList } from 'src/app/store/parametrage/sous-acte/model';
import { Acte } from 'src/app/store/parametrage/acte/model';
import { Garantie } from 'src/app/store/parametrage/garantie/model';
import { element } from 'protractor';
import { Prestataire } from 'src/app/store/parametrage/prestataire/model';
import { Medecin } from 'src/app/store/parametrage/medecin/model';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { BreadcrumbService } from 'src/app/app.breadcrumb.service';
import { loadEntente, loadEntenteExclu } from 'src/app/store/parametrage/sous-acte/actions';
import * as prestataireSelector from "../../../store/parametrage/prestataire/selector";
import * as garantSelector from "../../../store/contrat/garant/selector";
import * as quartierPrestataireSelector from "../../../store/parametrage/quartier-prestataire-garant/selector";

import * as quartierSelector from "../../../store/parametrage/quartier/selector";
import { SousActeService } from 'src/app/store/parametrage/sous-acte/service';
import * as featureActionsPrestataire from '../../../store/parametrage/prestataire/actions';
import { loadPrestataire } from '../../../store/parametrage/prestataire/actions';
import { QuartierPrestataireGarant } from 'src/app/store/parametrage/quartier-prestataire-garant/model';
import { Quartier } from 'src/app/store/parametrage/quartier/model';
import { loadQuartier } from 'src/app/store/parametrage/quartier/actions';
import { Garant } from 'src/app/store/contrat/garant/model';
import * as featureActionsQuartierPrestataire from '../../../store/parametrage/quartier-prestataire-garant/actions';
import { loadGarant } from 'src/app/store/contrat/garant/actions';





@Component({
  selector: 'app-prestataire-garant-quartier',
  templateUrl: './prestataire-garant-quartier.component.html',
  styleUrls: ['./prestataire-garant-quartier.component.scss']
})
export class QuartierPrestataireGarantComponent implements OnInit {
  displayFormPrefinancement = false;
  prestatataireList$: Observable<Array<Prestataire>>;
  prestatataireList: Array<Prestataire>;
  garantList$: Observable<Array<Garant>>;
  garantList: Array<Garant>;
  quartierList$: Observable<Array<Quartier>>;
  quartierList: Array<Quartier>;
  destroy$ = new Subject<boolean>();
  isDetail: boolean;
  quartierPrestataire: QuartierPrestataireGarant = {};
  selectPrestataire: Prestataire[]= [];
  quartierPrestatataireList$: Observable<Array<QuartierPrestataireGarant>>;
  quartierPrestatataireList: Array<QuartierPrestataireGarant>;
  quartier: Quartier = {};
  garant: Garant ={};




  constructor( private store: Store<AppState>,   private formBuilder: FormBuilder,
               private confirmationService: ConfirmationService,  private messageService: MessageService,
               private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([{ label: 'Liste des prestataires d\'un garant par quartier' }]);
  }

  
  ngOnInit(): void {
   
   this.prestatataireList$ = this.store.pipe(select(prestataireSelector.prestataireList));
    this.store.dispatch(loadPrestataire());
    this.prestatataireList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.prestatataireList = value.slice();
      }
    });
    

    this.garantList$ = this.store.pipe(select(garantSelector.garantList));
    this.store.dispatch(loadGarant());
    this.garantList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.garantList = value.slice();
      }
    });

    this.quartierList$ = this.store.pipe(select(quartierSelector.quartierDtoList));
    this.store.dispatch(loadQuartier());
    this.quartierList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.quartierList = value.slice();
      }
    });

    this.quartierPrestatataireList$ = this.store.pipe(select(quartierPrestataireSelector.quartierPrestataireGarantDtoList));
    this.quartierPrestatataireList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.quartierPrestatataireList = value.slice();
      }
    });

  }

  filtrer() {
    this.store.dispatch(featureActionsQuartierPrestataire.loadQuartierPrestataire({quartierId: this.quartier.id, garantId: this.garant.id}));
  }

  onRowUnselectSinistre(event){
    //console.log(event);
     this.selectPrestataire = this.selectPrestataire.filter(sous=>sous !== event.value)
   
  }


  onRowSelectSinistre(event) {
    //this.selectsousActe.push(event.value);
  }
  annulerPrestation(sousActe: SousActe) {
   // this.store.dispatch(featureActionsousActe.deleteEntente(sousActe));
  }
  creerEntente() {
    this.displayFormPrefinancement = true;
    
  }


  enregistre() {
    if(this.selectPrestataire) {
     this.quartierPrestataire.prestataires = this.selectPrestataire;
      this.store.dispatch(featureActionsQuartierPrestataire.createQuartierPrestataire(this.quartierPrestataire));
    
      this.displayFormPrefinancement = false;
    }
    
  }
  
}



