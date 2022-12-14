import { Component, OnInit, OnDestroy} from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import {Garant} from '../../../../store/contrat/garant/model';
import {garantList} from '../../../../store/contrat/garant/selector';
import {Pays} from '../../../../store/parametrage/pays/model';
import {Region} from '../../../../store/parametrage/region/model';
import * as typeGarant from '../../../../store/parametrage/garant/model';
import { GarantList } from '../../../../store/contrat/garant/model';
import {Departement} from '../../../../store/parametrage/departement/model';
import {DimensionPeriode} from '../../../../store/parametrage/dimension-periode/model';
import { Secteur } from 'src/app/store/parametrage/secteur/model';
import {Commune} from '../../../../store/parametrage/commune/model';
import { Arrondissement } from 'src/app/store/parametrage/arrondissement/model';
import {SecteurActivite} from '../../../../store/parametrage/secteur-activite/model';
import { Observable, of, Subject } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { AppState} from 'src/app/store/app.state';
import { loadGarant } from 'src/app/store/contrat/garant/actions';
import {Status} from '../../../../store/global-config/model';
import {status} from '../../../../store/global-config/selector';
import { EntityValidations } from '../../../common/models/validation';
import {BreadcrumbService} from '../../../../app.breadcrumb.service';
import { element } from 'protractor';
import { Banque } from 'src/app/store/parametrage/Banques/model';
import { TauxCommissionIntermediaire } from 'src/app/store/parametrage/taux-commission-intermediaire/model';
import { Compte } from 'src/app/store/comptabilite/compte/model';
import * as appelFondSelector from '../../../../store/comptabilite/appelFond/selector';
import * as appelFondAction from 'src/app/store/comptabilite/appelFond/actions';
import { DATA_DEFINITION, DATA_TYPE } from '../../../parametrage/parameters.data';
import { AppelFond, TypeCompte } from 'src/app/store/comptabilite/appelFond/model';
import { Report } from 'src/app/store/contrat/police/model';
import { TypeReport } from 'src/app/store/contrat/enum/model';
import { printPdfFile } from '../../../util/common-util';
import * as garantSelector from "../../../../store/contrat/garant/selector";
import { AppelFondService } from 'src/app/store/comptabilite/appelFond/service';
import { Recapitulatif } from 'src/app/store/reporting/production/recapitulatif/model';
import * as repartitionDepenseStatutAction from 'src/app/store/reporting/production/repartitionDepenseStatut/action';
import * as repartitionDepenseStatutSelector from '../../../../store/reporting/production/repartitionDepenseStatut/selector';
import { RecapitulatifService } from 'src/app/store/reporting/production/recapitulatif/service';
import { RepartitionDepenseStatut } from 'src/app/store/reporting/production/repartitionDepenseStatut/model';
import * as facturePrestataireAction from 'src/app/store/reporting/prestation/facturePrestataires/action';
import * as facturePrestataireSelector from '../../../../store/reporting/prestation/facturePrestataires/selector';
import { StatistiqueTrancheAgeService } from 'src/app/store/reporting/production/statistiqueParTrancheAge/service';
import { StatistiqueParTrancheAge } from 'src/app/store/reporting/production/statistiqueParTrancheAge/model';
import { FacturePrestataires } from 'src/app/store/reporting/prestation/facturePrestataires/model';
import { TypePrestataire } from 'src/app/store/parametrage/type-prestataire/model';
import { Prestataire } from 'src/app/store/parametrage/prestataire/model';
import * as prestataireSelector from '../../../../store/parametrage/prestataire/selector';
import * as prestatairefeatureAction from '../../../../store/parametrage/prestataire/actions';
import * as typePrestataireSlector from '../../../../store/parametrage/type-prestataire/selector';
import * as typePrestatairefeatureAction from '../../../../store/parametrage/type-prestataire/actions';


@Component({
  selector: 'app-facturePrestataires',
  templateUrl: './facturePrestataires.component.html',
  styleUrls: ['./facturePrestataires.component.scss']
})
export class FacturePrestatairesComponent implements OnInit, OnDestroy {
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
  typeCompte = Object.keys(TypeCompte).map(key => ({ label: TypeCompte[key], value: key }));
  appelFond: AppelFond;
  appelFondView: AppelFond;
  appelFondList$: Observable<Array<AppelFond>>;
  appelFondList: Array<AppelFond>;
  report: Report = {};
  dateDebut: Date;
  dateFin: Date;
  appelFondTotal: AppelFond;
  prestataireList:Array<Prestataire> = [];
  prestataireList$: Observable<Array<Prestataire>>;
  typePrestataireList:Array<TypePrestataire> = [];
  typePrestataireList$: Observable<Array<TypePrestataire>>;


  repartitionDepenseStatut: RepartitionDepenseStatut;
  recapitulatifs: Array<Recapitulatif>;

  statistiqueParTrancheAge: StatistiqueParTrancheAge;
  facturePrestataire: FacturePrestataires;

  display = false;
  verif = false;


  constructor(private formBuilder: FormBuilder,
              private store: Store<AppState>, 
              private messageService: MessageService,
              private confirmationService: ConfirmationService, 
              private breadcrumbService: BreadcrumbService,
              private appelFondService: AppelFondService, 
              private statistiqueParTrancheAgeService: StatistiqueTrancheAgeService) {

      this.appelFondForm = this.formBuilder.group({
        id: new FormControl(''),
        typePrestataire: new FormControl(),
        prestataire: new FormControl(),
        nombreFacture: new FormControl(),
        frequences: new FormControl(),
        garant: new FormControl(),
        police: new FormControl(),
        groupe: new FormControl(),
        dateDebut: new FormControl('', [Validators.required]),
        dateFin: new FormControl('', [Validators.required])
    });

      this.breadcrumbService.setItems([
        {label: 'Factures par types de prestataires '}
    ]);
    }

ngOnInit(): void {
  this.compteList = [];
  // this.loading = true;


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

  this.garantList$ = this.store.pipe(select(garantSelector.garantList));
    this.store.dispatch(loadGarant());
    this.garantList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.garantList = value.slice();
        console.log("garantListe", this.garantList);
      }
    });

    this.prestataireList$ = this.store.pipe(select(prestataireSelector.prestataireList));
    this.store.dispatch(prestatairefeatureAction.loadPrestataire());
    this.prestataireList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      
      if (value) {
        
        this.prestataireList = value.slice();
        
       
      }
    });

    this.typePrestataireList$ = this.store.pipe(select(typePrestataireSlector.typePrestataireList));
    this.store.dispatch(typePrestatairefeatureAction.loadTypePrestataire());
    this.typePrestataireList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      
      if (value) {
        
        this.typePrestataireList = value.slice();
        
       
      }
    });

  this.store.dispatch(facturePrestataireAction.setReportFacturePrestataires(null));
  this.store.pipe(select(facturePrestataireSelector.selectByteFile)).pipe(takeUntil(this.destroy$))
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

voirDetail(appelFond: AppelFond) {
  console.log('==================>', appelFond);
  this.infosGarant = true;
  this.appelFondView = appelFond;
}

voirDetailEtatAppel() {
  this.etatAppel = true;
}



editGarant(appelFond: AppelFond) {
  console.log('nnnnnnnnnnnnnnnnnnnnnnnnnnnn>>>>', appelFond);
// this.appelFond = {...appelFond};
this.appelFondForm.patchValue(appelFond);
this.appelFondForm.get('garant').setValue(appelFond?.garant?.nom);
console.log('========55555555555==========>', this.appelFondForm.get('garant').value);
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

/* onCreate() {
this.appelFond = this.appelFondForm.value;
console.log('nnnnnnnnnnnnnnnnnnnnnnnnnnnn', this.appelFond);
this.confirmationService.confirm({
  message: 'Etes vous sur de vouloir ajouter cet appel de fond ?',
  header: 'Confirmation',
  icon: 'pi pi-exclamation-triangle',
  accept: () => {
    if (this.appelFond.id) {
      console.log('1', this.appelFond);
      this.store.dispatch(appelFondAction.updateAppelFond(this.appelFondForm.value));
      this.displayDialogFormGarant = false;
    }else{
      console.log('2', this.appelFond);
    this.store.dispatch(appelFondAction.createAppelFond(this.appelFondForm.value));
    }
    this.appelFondForm.reset();
    this.displayDialogFormGarant = false;
  }
});


} */

deleteAppelFond(appel: AppelFond) {
  this.confirmationService.confirm({
    message: 'Etes vous sur de vouloir supprimer cet appel de fond ?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      if (appel.id) {
        console.log('2', appel);
        this.store.dispatch(appelFondAction.deleteAppelFond(appel));
        // this.displayDialogFormGarant = false;
      } 
    }
  });
}

annulerSaisie() {
  this.appelFondForm.reset();
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


imprimerAppelFond(appelFondPrint: AppelFond) {
  console.log('appelFondPrint=============>', appelFondPrint);
  this.report.typeReporting = TypeReport.APPEL_FOND;
  this.report.appelFond = appelFondPrint;
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
  this.garant = {};
  this.dateDebut = null;
  this.dateFin = null;
  this.appelFondTotal = {};
  this.etatAppel = false;
}

/* onCreate() {
  this.recapitulatif = {};
  console.log('===========================================>', this.appelFondForm.get('idGarant').value);
  this.recapitulatif.idGarant = this.appelFondForm.get('idGarant').value;

  this.recapitulatif.datePrime = this.appelFondForm.get('datePrime').value;
  console.log('===========================================>', this.recapitulatif);
  this.recaptulatifService.fetchRecap$(this.recapitulatif).subscribe((res) => {
    this.recapitulatifs = res;
    console.log("this.recapitulatifs", res);
  });
} */

imprimerFormulaire() {
  this.display = true;
}

changeDisplay() {
  if(this.appelFondForm.controls.prestataire.value.length !== 0) {
    this.verif= true;
  } else {
    this.verif = false;
  }
}

imprimerRecap() {
  console.log(' this.verif=============>',  this.verif);
  this.facturePrestataire = {};
  this.facturePrestataire.isPrestataire = this.verif;
  if(this.verif){
    console.log('entrer prestataires=============>');
    this.facturePrestataire.dateDebut = this.appelFondForm.get('dateDebut').value;
    this.facturePrestataire.dateFin = this.appelFondForm.get('dateFin').value;
    this.facturePrestataire.prestataires = this.appelFondForm.get('prestataire').value;
    this.report.typeReporting = TypeReport.FACTURE_PRESTATAIRE;
    this.report.facturePrestataires = this.facturePrestataire;
    console.log('this.facturePrestataire=============>', this.facturePrestataire);
    console.log('this.report', this.report);
    this.store.dispatch(facturePrestataireAction.FetchReportFacturePrestataires(this.report));
  } else {
    console.log('entrer type prestataires=============>');
    this.facturePrestataire.dateDebut = this.appelFondForm.get('dateDebut').value;
    this.facturePrestataire.dateFin = this.appelFondForm.get('dateFin').value;
    //this.facturePrestataire.prestataires = this.appelFondForm.get('prestataire').value;
    //this.repartitionDepenseStatut.tauxChargement = this.appelFondForm.get('tauxChargement').value;
    this.report.typeReporting = TypeReport.FACTURE_TYPE_PRESTATAIRE;
    this.report.facturePrestataires = this.facturePrestataire;
    console.log('this.facturePrestataire=============>', this.facturePrestataire);
    console.log('this.report', this.report);
    this.store.dispatch(facturePrestataireAction.FetchReportFacturePrestataires(this.report));
  }
  
  
}
}


