import { Component, OnInit, OnDestroy} from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import {Garant} from '../../../store/contrat/garant/model';
import * as featureAction from '../../../store/comptabilite/compte/actions';
import {garantList} from '../../../store/contrat/garant/selector';
import {Pays} from '../../../store/parametrage/pays/model';
import {Region} from '../../../store/parametrage/region/model';
import * as typeGarant from '../../../store/parametrage/garant/model';
import { GarantList } from '../../../store/contrat/garant/model';

import {Departement} from '../../../store/parametrage/departement/model';
import {DimensionPeriode} from '../../../store/parametrage/dimension-periode/model';
import { Secteur } from 'src/app/store/parametrage/secteur/model';
import {Commune} from '../../../store/parametrage/commune/model';
import { Arrondissement } from 'src/app/store/parametrage/arrondissement/model';
import {SecteurActivite} from '../../../store/parametrage/secteur-activite/model';
import { Observable, of, Subject } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { AppState} from 'src/app/store/app.state';
import {loadPays} from '../../../store/parametrage/pays/actions';
import * as paysSelector from '../../../store/parametrage/pays/selector';
import {loadRegion} from '../../../store/parametrage/region/actions';
import * as regionSelector from '../../../store/parametrage/region/selector';
import * as typeGarantSelector from '../../../store/parametrage/garant/selector';
import {loadDepartement} from '../../../store/parametrage/departement/actions';
import * as departementSelector from '../../../store/parametrage/departement/selector';
import {loadCommune} from '../../../store/parametrage/commune/actions';
import * as communeSelector from '../../../store/parametrage/commune/selector';

import {loadSecteurActivite} from '../../../store/parametrage/secteur-activite/actions';
import * as secteurActiviteSelector from '../../../store/parametrage/secteur-activite/selector';
import * as secteurAction from '../../../store/parametrage/secteur/actions';
import {loadSecteur} from '../../../store/parametrage/secteur/actions';
import * as secteurSelector from '../../../store/parametrage/secteur/selector';

import * as arrondissementAction from '../../../store/parametrage/arrondissement/actions';
import {loadArrondissement} from '../../../store/parametrage/arrondissement/actions';
import * as arrondissementSelector from '../../../store/parametrage/arrondissement/selector';


import * as banqueAction from '../../../store/parametrage/Banques/actions';
import * as banqueSelector from '../../../store/parametrage/Banques/selector';

import * as tauxCommissionIntermediaireSelector from '../../../store/parametrage/taux-commission-intermediaire/selector';
import * as tauxCommissionAction from '../../../store/parametrage/taux-commission-intermediaire/actions';

import {loadDimensionPeriode} from '../../../store/parametrage/dimension-periode/actions';
import * as dimensionPeriodeSelector from '../../../store/parametrage/dimension-periode/selector';
import { loadGarant } from 'src/app/store/contrat/garant/actions';
import * as typeGarantAction from 'src/app/store/parametrage/garant/actions';
import {Status} from '../../../store/global-config/model';
import {status} from '../../../store/global-config/selector';
import { EntityValidations } from '../../common/models/validation';
import {BreadcrumbService} from '../../../app.breadcrumb.service';
import { element } from 'protractor';
import { Banque } from 'src/app/store/parametrage/Banques/model';
import { TauxCommissionIntermediaire } from 'src/app/store/parametrage/taux-commission-intermediaire/model';
import * as tauxCommissionIntermediaireAction from '../../../store/parametrage/taux-commission-intermediaire/actions';
import { Compte } from 'src/app/store/comptabilite/compte/model';
import * as compteSelector from '../../../store/comptabilite/compte/selector';
import * as compteAction from 'src/app/store/comptabilite/compte/actions';
import { DATA_DEFINITION, DATA_TYPE } from '../../parametrage/parameters.data';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.scss']
})
export class CompteComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();
  cols: any[];
  garantList$: Observable<Array<Garant>>;
  garantList: Array<Garant>;
  paysList$: Observable<Array<Pays>>;
  paysList: Array<Pays>;
  arrondissementList$: Observable<Array<Arrondissement>>;
  arrondissementList: Array<Arrondissement>;
  regionList$: Observable<Array<Region>>;
  regionList: Array<Region>;
  departementList$: Observable<Array<Departement>>;
  departementList: Array<Departement>;
  communeList$: Observable<Array<Commune>>;
  communeList: Array<Commune>;
  listeGarant: GarantList = {};
  secteurActiviteList$: Observable<Array<SecteurActivite>>;
  secteurActiviteList: Array<SecteurActivite>;
  dimensionPeriodeList$: Observable<Array<DimensionPeriode>>;
  dimensionPeriodeList: Array<DimensionPeriode>;
  garant: Garant;
  selectedGarants: Garant[];
  displayDialogFormGarant = false;
  garantForm: FormGroup;
  statusObject$: Observable<Status>;
  entityValidations: Array<EntityValidations>;
  typeGarantList$: Observable<Array<typeGarant.Garant>>;
  typeGarantList: Array<typeGarant.Garant>;
  loading: boolean;
  secteurList: Array<Secteur>;
  secteurList$: Observable<Array<Secteur>>;
  banqueList: Array<Banque>;
  banqueList$: Observable<Array<Banque>>;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isEditable = false;
  infosGarant = false;
  tauxCommissionIntermediaireList: Array<TauxCommissionIntermediaire>;
  tauxCommissionIntermediaireList$: Observable<Array<TauxCommissionIntermediaire>>;
  arrondissement: Arrondissement;
  commune: Commune;
  province: Departement;
  region: Region;
  pays: Pays;


  selectedDataDef: any;
  selectedDataDefList$: Observable<Array<any>>;
  selectedDataDefList: Array<any>;
  compteForm: FormGroup;
  compte: Compte;
  compteList$: Observable<Array<Compte>>;
  compteList: Array<Compte>;
  selectedDataType: any;
  dataTypes = DATA_TYPE;
  dataDefinitions = DATA_DEFINITION;
  editForm: FormGroup;


  constructor(private formBuilder: FormBuilder,
              private store: Store<AppState>, private messageService: MessageService,
              private confirmationService: ConfirmationService, private breadcrumbService: BreadcrumbService) {

      this.compteForm = this.formBuilder.group({
        id: new FormControl(''),
        compte: new FormControl('', [Validators.required]),
        poste: new FormControl('', [Validators.required]),
        libelle: new FormControl('', [Validators.required]),
        soldeDebiteur: new FormControl(''),
        soldeCrediteur: new FormControl(''),
        compteParent: new FormControl(''),
      });

      this.breadcrumbService.setItems([
        {label: 'Compte'}
    ]);
    }

ngOnInit(): void {
  this.compteList = [];
  // this.loading = true;
  this.entityValidations = [
    {
      field: 'compte',
      validations: [
        {validName: 'required', validMessage: 'Ce champs est obligatoire'}
      ]
    },
    {
      field: 'poste',
      validations: [
        {validName: 'required', validMessage: 'Ce champs est obligatoire'}
      ]
    },
    {
      field: 'libelle',
      validations: [
        {validName: 'required', validMessage: 'Ce champs est obligatoire'}
      ]
    }
  ];

  this.compteList$ = this.store.pipe(select(compteSelector.compteList));
  this.store.dispatch(compteAction.loadCompte());
  this.compteList$.pipe(takeUntil(this.destroy$))
            .subscribe(value => {
              if (value) {
                //this.loading = false;
                this.compteList = value.slice();
                console.log('value', value.slice());
                console.log('compteList', this.compteList);
              }
  });

  this.statusObject$ = this.store.pipe(select(status));
  this.checkStatus();

}



checkStatus() {
  this.statusObject$.pipe(takeUntil(this.destroy$))
      .subscribe(statusObj => {
        if (statusObj) {
          this.showToast(statusObj.status, 'INFORMATION', statusObj.message);
          }
      });
}

onRowSelect($event){
  console.log($event.data);
}

showToast(severity: string, summary: string, detail: string) {
  this.messageService.add({severity, summary, detail});
}

addGarant() {
  this.compte = {};
  this.displayDialogFormGarant = true;
  // this.garantForm.get('pays').setValue(this.paysList?.find(pay=>pay.code ==="BUR"));
}

voirDetail(garant: Garant) {
  this.infosGarant = true;
  this.garant = garant;
}

editGarant(compte: Compte) {
// this.garantForm.get('id').setValue(garant.id);
this.compte = {...compte};
this.compteForm.patchValue(this.compte);
this.displayDialogFormGarant = true;
}

/* deleteGarant(garant: Garant) {
  this.confirmationService.confirm({
    message: 'Etes vous sur de vouloir supprimer?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
        this.store.dispatch(featureAction.deleteGarant(garant));
    }
});
} */

onCreate() {
this.compte = this.compteForm.value;
console.log('nnnnnnnnnnnnnnnnnnnnnnnnnnnn',this.compte);
this.confirmationService.confirm({
  message: 'Etes vous sur de vouloir ajouter ce compte?',
  header: 'Confirmation',
  icon: 'pi pi-exclamation-triangle',
  accept: () => {
    if (this.compte.id) {
      console.log('1',this.compte);
      this.store.dispatch(featureAction.updateCompte(this.compteForm.value));
      this.displayDialogFormGarant = false;
    }else{
      console.log('2',this.compte);
    this.store.dispatch(featureAction.createCompte(this.compteForm.value));
    }
    this.compteForm.reset();
    this.displayDialogFormGarant = false;
  }
});
// this.garantForm.get('pays').setValue(this.paysList?.find(pay=>pay.code ==="BUR"));

}

annulerSaisie() {
  this.compteForm.reset();
  this.displayDialogFormGarant = false;
}

/* deleteSelectedGrant() {
  this.listeGarant.garantDtoList = this.selectedGarants;
  this.confirmationService.confirm({
    message: 'Etes vous sur de vouloir supprimer ces garants?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.store.dispatch(featureAction.deleteGarants(this.listeGarant));
    }
  });
} */

ngOnDestroy() {
  this.destroy$.next(true);
  // Now let's also unsubscribe from the subject itself:
  this.destroy$.unsubscribe();
}


upload(event){
  //this.file = event.files[0];
  this.onTypeChange(event);
 //this.store.dispatch(this.selectedDataDef.store.importAction({file: event.files[0]}));
 //this.service.pushFileToStorage(event.files [0]);
}

onTypeChange(event) {
  if (this.editForm) {
    this.editForm = null;
  }
  if (event.value) {
    console.log(event.value);
    this.selectedDataType = this.dataTypes.find(dataType => dataType.value === event.value);
    if (this.selectedDataType) {
      this.selectedDataDef = this.dataDefinitions.find(df => df.entity === event.value);
      if (this.selectedDataDef) {
        this.selectedDataDefList$ = this.store.pipe(select(this.selectedDataDef.store.select));
        this.selectedDataDefList$.pipe(takeUntil(this.destroy$))
          .subscribe(value => {
            if (value) {
              this.annulerSaisie();
              this.selectedDataDefList = value.slice();
            }
          });
        this.store.dispatch(this.selectedDataDef.store.fetchAction);
        this.editForm = this.formBuilder.group({});
        this.cols = this.selectedDataDef.cols;
        this.entityValidations = this.selectedDataDef.entityValidations;
        this.cols.forEach(col => {
          const control = new FormControl('', col.validators);
          this.editForm.addControl(col.field, control);
        });
        //this.setDropdownObservableObj();
      }
    }
  } else {
    // this.onInputDroped();
  }

}

/* getAdherentFiles(event: any): void {
    console.log(event);
    this.FamilyListToImport = [];
    this.adherentFamille = [];
    this.afficheDetail = false;
    this.policeService.loadAdherentsByExcelFile(event).subscribe(
        (res) => {
          console.log('liste des adhérents === ');
          console.log(res);
          this.FamilyListToImport = res;
          this.adherentFamille = res;
          this.afficheDetail = true;
        }
    );
  } */
}


