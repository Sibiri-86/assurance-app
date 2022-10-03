import { Component, OnInit, OnDestroy} from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { ConfirmationService, MessageService } from 'primeng/api';
import {Garant} from '../../../store/contrat/garant/model';
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
import { Observable, Subject } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { AppState} from 'src/app/store/app.state';
import {Status} from '../../../store/global-config/model';
import {status} from '../../../store/global-config/selector';
import { EntityValidations } from '../../common/models/validation';
import {BreadcrumbService} from '../../../app.breadcrumb.service';
import { Banque } from 'src/app/store/parametrage/Banques/model';
import { TauxCommissionIntermediaire } from 'src/app/store/parametrage/taux-commission-intermediaire/model';
import { Compte } from 'src/app/store/comptabilite/compte/model';
import * as appelFondSelector from '../../../store/comptabilite/appelFond/selector';
import * as appelFondAction from 'src/app/store/comptabilite/appelFond/actions';
import { DATA_DEFINITION, DATA_TYPE } from '../../parametrage/parameters.data';
import { AppelFond, TypeCompte } from 'src/app/store/comptabilite/appelFond/model';
import { Report } from 'src/app/store/contrat/police/model';
import { TypeReport } from 'src/app/store/contrat/enum/model';
import { printPdfFile } from '../../util/common-util';
import { AppelFondService } from 'src/app/store/comptabilite/appelFond/service';
import { Tiers, TypeCompteTiers, TypeEtatTiers, TypeMouvementCompteTiers } from 'src/app/store/comptabilite/tiers/model';
import * as compteSelector from '../../../store/comptabilite/compte/selector';
import * as compteAction from 'src/app/store/comptabilite/compte/actions';
import * as tiersAction from 'src/app/store/comptabilite/tiers/actions';
import * as tiersSelector from '../../../store/comptabilite/tiers/selector';



@Component({
  selector: 'app-tiers',
  templateUrl: './tiers.component.html',
  styleUrls: ['./tiers.component.scss']
})
export class TiersComponent implements OnInit, OnDestroy {
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
  etatAppel = false;
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
  appelFondForm: FormGroup;
  compteCollectif = Object.keys(TypeCompte).map(key => ({ label: TypeCompte[key], value: key }));
  typeCompteTiers = Object.keys(TypeCompteTiers).map(key => ({ label: TypeCompteTiers[key], value: key }));
  appelFond: AppelFond;
  appelFondList$: Observable<Array<AppelFond>>;
  appelFondList: Array<AppelFond>;
  report: Report = {};
  dateDebut: Date;
  dateFin: Date;
  appelFondTotal: AppelFond;
  tiersForm: FormGroup;
  tiers: Tiers;
  tiersList$: Observable<Array<Tiers>>;
  tiersList: Array<Tiers>;
  tiersPrintForm: FormGroup;
  typeEtatTiers = Object.keys(TypeEtatTiers).map(key => ({ label: TypeEtatTiers[key], value: key }));
  typeMouvementCompteTiers = Object.keys(TypeMouvementCompteTiers).map(key => ({ label: TypeMouvementCompteTiers[key], value: key }));


  constructor(private formBuilder: FormBuilder,
              private store: Store<AppState>, private messageService: MessageService,
              private confirmationService: ConfirmationService, private breadcrumbService: BreadcrumbService,
              private appelFondService: AppelFondService) {

      this.tiersForm = this.formBuilder.group({
        id: new FormControl(''),
        compteTiers: new FormControl('', [Validators.required]),
        intitule: new FormControl('', [Validators.required]),
        abrege: new FormControl('', [Validators.required]),
        compteCollectif: new FormControl('', [Validators.required]),
        typeCompteTiers: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        interlocuteur: new FormControl(''),
        adresse: new FormControl(''),
        codePostal: new FormControl(''),
        /* pays: new FormControl(''),
        region: new FormControl(''),
        ville: new FormControl(''), */
        numTel: new FormControl('', [Validators.required]),
    });

    this.tiersPrintForm = this.formBuilder.group({
      id: new FormControl(''),
      dateDebut: new FormControl('', [Validators.required]),
      dateFin: new FormControl('', [Validators.required]),
      compteDebut: new FormControl('', [Validators.required]),
      compteFin: new FormControl('', [Validators.required]),
      typeEtatTiers: new FormControl('', [Validators.required]),
      typeMouvementCompteTiers: new FormControl('', [Validators.required]),
      typeCompteTiers: new FormControl('', [Validators.required]),


      /* compteTiers: new FormControl('', [Validators.required]),
      intitule: new FormControl('', [Validators.required]),
      abrege: new FormControl('', [Validators.required]),
      compteCollectif: new FormControl('', [Validators.required]),
      typeCompteTiers: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      interlocuteur: new FormControl(''),
      adresse: new FormControl(''),
      codePostal: new FormControl(''), */
      /* pays: new FormControl(''),
      region: new FormControl(''),
      ville: new FormControl(''), */
      //numTel: new FormControl('', [Validators.required]),
  });

      this.breadcrumbService.setItems([
        {label: ' Compte Tiers'}
    ]);
    }

ngOnInit(): void {
  this.compteList = [];
  // this.loading = true;
  this.entityValidations = [
    {
      field: 'compteTiers',
      validations: [
        {validName: 'required', validMessage: 'Ce champs est obligatoire'}
      ]
    },
    {
      field: 'intitule',
      validations: [
        {validName: 'required', validMessage: 'Ce champs est obligatoire'}
      ]
    },
    {
      field: 'abrege',
      validations: [
        {validName: 'required', validMessage: 'Ce champs est obligatoire'}
      ]
    },
    {
      field: 'compteCollectif',
      validations: [
        {validName: 'required', validMessage: 'Ce champs est obligatoire'}
      ]
    },
    {
      field: 'typeCompteTiers',
      validations: [
        {validName: 'required', validMessage: 'Ce champs est obligatoire'}
      ]
    },
    {
      field: 'Description',
      validations: [
        {validName: 'required', validMessage: 'Ce champs est obligatoire'}
      ]
    },
    {
      field: 'numTel',
      validations: [
        {validName: 'required', validMessage: 'Ce champs est obligatoire'}
      ]
    }
  ];

  this.appelFondList$ = this.store.pipe(select(appelFondSelector.appelFondList));
  this.store.dispatch(appelFondAction.loadAppelFond());
  this.appelFondList$.pipe(takeUntil(this.destroy$))
            .subscribe(value => {
              if (value) {
                //this.loading = false;
                this.appelFondList = value.slice();
                console.log('value', value.slice());
                console.log('appelFondList', this.appelFondList);
              }
  });

  this.tiersList$ = this.store.pipe(select(tiersSelector.tiersList));
  this.store.dispatch(tiersAction.loadTiers());
  this.tiersList$.pipe(takeUntil(this.destroy$))
          .subscribe(value => {
            if(value) {
              this.tiersList = value.slice();
              console.log('value', value.slice());
              console.log('tiersList', this.tiersList);
            }
          })

  this.compteList$ = this.store.pipe(select(compteSelector.compteList));
  this.store.dispatch(compteAction.loadCompte());
  this.compteList$.pipe(takeUntil(this.destroy$))
            .subscribe(value => {
              if (value) {
                //this.loading = false;
                this.compteList = value.slice().filter(c => c.isRacine === true);
                console.log('value', value.slice());
                console.log('compteList', this.compteList);
              }
  });

  this.store.dispatch(appelFondAction.setReportAppelFond(null));
  this.store.pipe(select(appelFondSelector.selectByteFile)).pipe(takeUntil(this.destroy$))
      .subscribe(bytes => {
          if (bytes) {
              printPdfFile(bytes);
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

voirDetailEtatAppel() {
  this.etatAppel = true;
}



editGarant(tiers: Tiers) {
// this.garantForm.get('id').setValue(garant.id);
this.tiers = {...tiers};
this.tiersForm.patchValue(this.tiers);
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
this.tiers = this.tiersForm.value;
console.log('nnnnnnnnnnnnnnnnnnnnnnnnnnnn', this.tiers);
this.confirmationService.confirm({
  message: 'Etes vous sur de vouloir ajouter ce compte tiers ?',
  header: 'Confirmation',
  icon: 'pi pi-exclamation-triangle',
  accept: () => {
    if (this.tiers.id) {
      console.log('1', this.tiers);
      this.store.dispatch(tiersAction.updateTiers(this.tiersForm.value));
      this.displayDialogFormGarant = false;
    }else{
      console.log('2', this.tiers);
    this.store.dispatch(tiersAction.createTiers(this.tiersForm.value));
    }
    this.tiersForm.reset();
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


imprimerAppelFond(appelFond: AppelFond) {
  console.log('appelFond', appelFond);
  this.report.typeReporting = TypeReport.APPEL_FOND;
  this.report.appelFond = appelFond;
  console.log('this.report', this.report);
  this.store.dispatch(appelFondAction.FetchReportAppelFond(this.report));
}

searchAppelFond() {
  this.appelFond = {};
  this.appelFond.garant = this.garant;
  this.appelFond.dateDebut = this.dateDebut;
  this.appelFond.dateFin = this.dateFin;
  if(this.appelFond.garant && this.appelFond.dateDebut && this.appelFond.dateFin) {
    this.appelFondService.findAppelFondTotalAmount(this.appelFond).subscribe((res) => {
      this.appelFondTotal = res;
      console.log("this.appelFondTotal", res);
    });
  }
}
annulerAppelFond() {
  /* this.tiersPrintForm.get('dateDebut').setValue = null;
  this.tiersPrintForm.get('dateFin').setValue = null;
  this.tiersPrintForm.get('compteDebut').setValue = null;
  this.tiersPrintForm.get('compteFin').setValue = null;
  this.tiersPrintForm.get('typeEtatTiers').setValue = null;
  this.tiersPrintForm.get('typeMouvementCompteTiers').setValue = null;
  this.tiersPrintForm.get('typeCompteTiers').setValue = null; */
  // this.etatAppel = false;
}
}


