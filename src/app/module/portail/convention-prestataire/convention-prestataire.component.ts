import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import {
  ControlContainer,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormArray
} from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { loadSousActe } from '../../../store/parametrage/sous-acte/actions';
import * as sousActeSelector from '../../../store/parametrage/sous-acte/selector';
import { takeUntil } from 'rxjs/operators';
import { SousActe } from 'src/app/store/parametrage/sous-acte/model';
import { Taux } from '../../../store/parametrage/taux/model';
import { loadTaux } from '../../../store/parametrage/taux/actions';
import * as tauxSelector from '../../../store/parametrage/taux/selector';
import { Sort } from '../../common/models/sort.enum';
import { loadGarantie, loadGaranties, loadGarantiesMontant, loadGarantiesMontantDetail } from '../../../store/parametrage/garantie/actions';
import * as garantieSelector from '../../../store/parametrage/garantie/selector';
import { loadPrestataire} from '../../../store/parametrage/prestataire/actions';
import * as prestataireSelector from '../../../store/parametrage/prestataire/selector';
import * as prefinancementSelector from '../../../store/prestation/prefinancement/selector';
import * as prefinancementActions from '../../../store/prestation/prefinancement/action';
import { loadMedecin} from '../../../store/parametrage/medecin/actions';
import * as medecinSelector from '../../../store/parametrage/medecin/selector';
import {medecinList} from '../../../store/parametrage/medecin/selector';
import { loadActe } from '../../../store/parametrage/acte/actions';
import * as acteSelector from '../../../store/parametrage/acte/selector';
import { loadPathologie } from 'src/app/store/parametrage/pathologie/actions';
import * as pathologieSelector from '../../../store/parametrage/pathologie/selector';
import { loadProduitPharmaceutique } from 'src/app/store/parametrage/produit-pharmaceutique/actions';
import * as produitPharmaceutiqueSelector from 'src/app/store/parametrage/produit-pharmaceutique/selector';
import { Acte } from 'src/app/store/parametrage/acte/model';
import { Garantie } from 'src/app/store/parametrage/garantie/model';
import { element } from 'protractor';
import { Prestataire } from 'src/app/store/parametrage/prestataire/model';
import { Medecin } from 'src/app/store/parametrage/medecin/model';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { Adherent } from 'src/app/store/contrat/adherent/model';
import * as featureActionAdherent from '../../../store/contrat/adherent/actions';
import * as featureActionPrefinancement from '../../../store/prestation/prefinancement/action';
import * as adherentSelector from '../../../store/contrat/adherent/selector';
import { CheckPrefinancementResult, Prefinancement, Prestation } from 'src/app/store/prestation/prefinancement/model';
import { Status } from 'src/app/store/global-config/model';
import { status } from '../../../store/global-config/selector';
import { TypeEtatSinistre } from '../../common/models/enum.etat.sinistre';
import { printPdfFile } from 'src/app/module/util/common-util';
import { TypeReport } from 'src/app/store/contrat/enum/model';
import { Report } from 'src/app/store/medical/bon-prise-en-charge/model';
import { TauxCommissionIntermediaireEffects } from 'src/app/store/parametrage/taux-commission-intermediaire/effect';
import { Pathologie } from 'src/app/store/parametrage/pathologie/model';
import { ProduitPharmaceutique } from 'src/app/store/parametrage/produit-pharmaceutique/model';
import { Dialog } from 'primeng/dialog/dialog';
import { BreadcrumbService } from 'src/app/app.breadcrumb.service';
import { BonPriseEnCharge } from 'src/app/store/medical/bon-prise-en-charge/model';
import * as featureActionBonPriseEnCharge from '../../../store/medical/bon-prise-en-charge/actions';
import * as selectorsBonPriseEnCharge from '../../../store/medical/bon-prise-en-charge/selector';
import { BonPriseEnChargeState } from 'src/app/store/medical/bon-prise-en-charge/state';
import { Convention } from 'src/app/store/medical/convention/model';
import * as conventionSelector from 'src/app/store/medical/convention/selector';
import * as conventionAction from 'src/app/store/medical/convention/actions';
import { GarantieService } from 'src/app/store/parametrage/garantie/service';
import { KeycloakService } from 'keycloak-angular';


@Component({
  selector: 'app-convention-prestataire',
  templateUrl: './convention-prestataire.component.html',
  styleUrls: ['./convention-prestataire.component.scss']
})
export class ConventionPrestataireComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();
  sousActeList$: Observable<Array<SousActe>>;
  sousActeList: Array<SousActe>;
  sousActeListFilter: Array<SousActe>;
  acteList$: Observable<Array<Acte>>;
  acteList: Array<Acte>;
  prestataireList$: Observable<Array<Prestataire>>;
  prestataireList: Array<Prestataire>;
  prestatairePrescripteur: Array<Prestataire>;
  prestataireExecutant: Array<Prestataire>;
  medecinList$: Observable<Array<Medecin>>;
  medecinList: Array<Medecin>;
  pathologieList$: Observable<Array<Pathologie>>;
  pathologieList: Array<Pathologie>;
  produitPharmaceutiqueList$: Observable<Array<ProduitPharmaceutique>>;
  produitPharmaceutiqueList: Array<ProduitPharmaceutique>;
  acteListFilter: Array<Acte>;
  garanties: Array<Garantie>;
  garantieListDetail: Array<Garantie>;
  garantieList$: Observable<Array<Garantie>>;
  garantieList1$: Observable<Array<Garantie>>;
  conventionForm: FormGroup;
  cols: any[];
  conventionList$: Observable<Array<Convention>>;
  conventionList: Array<Convention>;
  conventionListFilter: Array<Convention>;
  displayFormConvention = false;
  convention: Convention = {};
  statusObject$: Observable<Status>;
  displayActe = false;
  displaySousActe = false;
  displayEdit = false;
  displayFormConventionUpdate = false;
  private clonedSousActe: { [s: string]: SousActe; } = {};
  sousActes: Array<SousActe>;
  sousActeListFinal: SousActe[] = [];
  sousA: SousActe = {};
  conventionDetail: Convention = {};
  displayFDetailConvention = false;
  dure: number = 0;


  constructor( private store: Store<AppState>,
               private confirmation: ConfirmationService,
               private formBuilder: FormBuilder,
               private messageService: MessageService,
               private keyCloakService: KeycloakService,
               private garantieService: GarantieService,
               private breadcrumbService: BreadcrumbService) {
     this.breadcrumbService.setItems([{ label: 'Convention' }]);
}

  ngOnInit(): void {
    this.conventionForm = this.formBuilder.group({
      id: new FormControl(),
      montant: new FormControl(''),
      sousActe: new FormControl(),
      acte: new FormControl(),
      garantie: new FormControl(),
      prestataire: new FormControl(),
      dateEffet: new FormControl(null, Validators.required),
      delai: new FormControl('', Validators.required),
    });

    this.conventionList$ = this.store.pipe(select(conventionSelector.conventionList));
    this.store.dispatch(conventionAction.loadConventionPrestataire({code: "OPTIPLUS"}));
    this.conventionList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.conventionList = value.slice();
        this.dure = this.conventionList[0].delai;
        this.conventionListFilter = this.conventionList;
      }
    });

    this.prestataireList$ = this.store.pipe(select(prestataireSelector.prestataireList));
    this.store.dispatch(loadPrestataire());
    this.prestataireList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.prestataireList = value.slice();
      }
    });

    this.sousActeList$ = this.store.pipe(select(sousActeSelector.sousacteList));
    this.store.dispatch(loadSousActe());
    this.sousActeList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        console.log("===sous======",this.sousActeList);
        this.sousActeList = value.slice();
        this.sousActeListFilter = this.sousActeList;
        //this.sousActeListFilter = this.sousActeList;
      }
    });

    this.garantieList$ = this.store.pipe(select(garantieSelector.garantieList));
    this.store.dispatch(loadGaranties());
    this.garantieList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.garanties = value.slice();
        console.log('=====garanties===============', this.garanties);
        
      }
    });

    this.acteList$ = this.store.pipe(select(acteSelector.acteList));
    this.store.dispatch(loadActe());
    this.acteList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.acteList = value.slice();
        this.acteListFilter = this.acteList;
        console.log('=======acteList=============', this.acteList);
      }
    });
    this.statusObject$ = this.store.pipe(select(status));
    this.checkStatus();
  }



  addConvention() {
    this.displayFormConvention = true;
    this.displayEdit = false;
    this.conventionForm.reset();
  }

  annulerSaisie() {
    this.closeDialog();
    this.displaySousActe = false;
    this.displayActe = false;
  }

  closeDialog(){
    this.conventionForm.reset();
    this.displayFormConvention = false;
    this.displaySousActe = false;
    this.displayActe = false;
    this.displayEdit = false;
  }

  onCreate(){
    this.convention = this.conventionForm.value;
    this.convention.sousActes = this.sousActeListFinal;
    if (this.convention.id){
      console.log('=========================',this.convention);
      this.store.dispatch(conventionAction.updateConvention(this.convention));
    }else{
    this.store.dispatch(conventionAction.createConvention(this.convention));
    }
    this.conventionForm.reset();
    this.displayActe = false;
    this.displaySousActe = false;
    this.convention = {};
    this.sousActeListFinal = [];
    this.displayFormConvention = false;
    this.displayFormConventionUpdate = false;
  }
  changeGarantie($event) {
    this.acteListFilter = this.acteList.filter(ele => ele.idTypeGarantie === $event.value.id);
    this.displayActe = true;
  }

  selectActe($event) {
    this.sousActeListFilter = this.sousActeList.filter(el => el.idTypeActe === $event.value.id);
    this.displaySousActe = true;
  }

  selectPrestataire($event) {
    console.log($event.value);
    this.conventionListFilter = this.conventionList.filter(element1 => element1.prestataire.id === $event.value.id);
  }
  detail(convention: Convention) {
    this.conventionDetail = convention;
    this.sousActeListFilter = convention.sousActes;
    console.log("=========convention==========", convention);
    this.displayFDetailConvention = true;
    this.garantieService.$findFamilleActeSousActeMontantDetail(this.sousActeListFilter).subscribe((value) => {
      if (value) {
        this.garantieListDetail = value.typeGarantieDtoList;
        console.log("=========value==========", value);
        
        
      }
    });

   
  }

  editer(convention: Convention) {
  this.displayEdit = true;
    this.sousActeListFilter = convention.sousActes;
   // this.sousActeListFinal = convention.sousActes;
    console.log("=========convention==========", convention);
  
  
    this.garantieList$ = this.store.pipe(select(garantieSelector.garantieList));
    this.store.dispatch(loadGarantiesMontant({sousActes:this.sousActeListFilter}));
    this.garantieList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.garanties = value.slice();
        console.log('=====garanties===============', this.garanties);
        
      }
    });
  // this.displayFormConventionUpdate = true;
  //this.conventionForm.patchValue(convention);
   const acte: Acte = this.acteList.filter(element1 => element1.id === convention.sousActe.idTypeActe)[0];
  const garantie: Garantie = this.garanties.filter(element1 => element1.id === acte.idTypeGarantie)[0];
  this.conventionForm.patchValue({delai: convention.delai, montant: convention.montant,
    prestataire: convention.prestataire, sousActe: convention.sousActe, id: convention.id,
  dateEffet: convention.dateEffet, acte, garantie}); 
 // this.displayFormConvention = true;
  this.displaySousActe = true;
  this.displayActe = true;
  this.displayFormConvention = true;
  }

  supprimer(convention: Convention){
    this.confirmation.confirm({
      message: "voulez-vous supprimer la convention?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.store.dispatch(conventionAction.deleteConvention(convention));
      },
    });

  }

  supprimerConvention(){
    this.confirmation.confirm({
      message: 'voulez-vous supprimer la convention?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        //this.store.dispatch(conventionAction.deleteConvention(convention));
      },
    });

  }

  showToast(severity: string, summary: string, detail: string) {
    this.messageService.add({ severity, summary, detail });
  }

  checkStatus() {
    this.statusObject$.pipe(takeUntil(this.destroy$)).subscribe((statusObj) => {
      if (statusObj) {
        // this.loading = false;
        this.showToast(statusObj.status, 'INFORMATION', statusObj.message);
        /*
          if (this.isAdding && statusObj.status === StatusEnum.success) {
            this.display = false;
            this.isAdding = false;
          }
          this.loading = false;
          */
      }
    });
  }

  onRowEditInitPrime(sousActe: SousActe) {
    this.clonedSousActe[sousActe.id] = {...sousActe};

   
  }

  onRowEditSavePrime(sousActe: SousActe) {
    console.log(sousActe);
    delete this.clonedSousActe[sousActe.id];
    
    this.sousA = this.sousActeListFinal.find(sous=>sous.id === sousActe.id);
    console.log(this.sousA);
    if(this.sousA?.id) {
      this.sousActeListFinal.forEach(sous=>{
        if(sous.id == sousActe.id) {
          sous = sousActe;
        }
      });
    } else {
      this.sousActeListFinal.push(sousActe);
    }
      
    
    
}

 onRowEditCancelSousActe(sousActe: SousActe, index: number) {
  sousActe.montantConvantion = null;
  sousActe.dateEffet = null;
  // this.clonedSousActe[sousActe.id].dateEffet = new Date();
  // this.clonedSousActe[sousActe.id].montantConvantion = null;
  // this.sousActes[index] = this.clonedSousActe[sousActe.id];
  delete this.clonedSousActe[sousActe.id];
  this.sousActeListFinal = this.sousActeListFinal.filter(sous=>sous.id !== sousActe.id);
} 


  ngOnDestroy(): void {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}
