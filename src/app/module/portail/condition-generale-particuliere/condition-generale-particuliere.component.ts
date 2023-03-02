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
import { ConfirmationService, MenuItem, MessageService, SelectItem, TreeNode } from 'primeng/api';
import { BreadcrumbService } from 'src/app/app.breadcrumb.service';
import { loadEntente, loadEntenteExclu } from 'src/app/store/parametrage/sous-acte/actions';
import * as prestataireSelector from "../../../store/parametrage/prestataire/selector";
import * as garantSelector from "../../../store/contrat/garant/selector";
import * as adherentSelector from "../../../store/contrat/adherent/selector";
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

import * as featureActionsAdherent from '../../../store/contrat/adherent/actions';
import { loadGarant } from 'src/app/store/contrat/garant/actions';
import { ConditionGenerale } from 'src/app/store/contrat/adherent/model';
import { AdherentService } from 'src/app/store/contrat/adherent/service';
import { loadConditionGenerale } from '../../../store/contrat/adherent/actions';
import { KeycloakService } from 'keycloak-angular';
import { PlafondService } from 'src/app/store/contrat/plafond/service';
import { Avenant } from 'src/app/store/contrat/historiqueAvenant/model';





@Component({
  selector: 'app-condition-generale-particuliere',
  templateUrl: './condition-generale-particuliere.component.html',
  styleUrls: ['./condition-generale-particuliere.component.scss']
})
export class ConditionGeneraleParticuliereComponent implements OnInit {
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
  conditionGenerale: ConditionGenerale = {};
  conditionGenerales: Array<ConditionGenerale>;
  conditionGeneraleList$: Observable<Array<ConditionGenerale>>;
  conditionGeneralesList: Array<ConditionGenerale>;
  items: MenuItem[] = [];
  activeItem: MenuItem;
  activeItem2: MenuItem ;
  avenantModif1: Avenant = {};


  constructor( private store: Store<AppState>,   private formBuilder: FormBuilder,
               private confirmationService: ConfirmationService,  private messageService: MessageService,
               private adherentService: AdherentService,
               private keycloakService: KeycloakService,
               private plafondService: PlafondService,
               private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([{ label: 'Condition générale et particulière' }]);
  }

  
  ngOnInit(): void {
    console.log("this.keycloakService.getUsername()");
    this.plafondService.findBaremeByUserConnect(this.keycloakService.getUsername()).subscribe(
      (res) => {
        this.avenantModif1.plafondFamilleActes = res.body;
      }
    );
    console.log(this.keycloakService.loadUserProfile());
    this.conditionGeneraleList$ = this.store.pipe(select(adherentSelector.conditionGeneraleList));
    this.store.dispatch(loadConditionGenerale());
    this.conditionGeneraleList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.conditionGeneralesList = value.slice();
      }
    });
    


  }

  

  update() {
    this.displayFormPrefinancement = true;
  }
  delete() {

  }
toggle(condition: ConditionGenerale) {
  console.log("=======================");
  this.conditionGenerale = condition;

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
    this.conditionGenerale = {};
    this.displayFormPrefinancement = true;
    
  }


  enregistre() {
   
      this.store.dispatch(featureActionsAdherent.createConditionGenerale(this.conditionGenerale));
      
      this.conditionGenerale = {};
      this.displayFormPrefinancement = false;
   
  
 }
 

 


}

