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
import { loadSousActe } from '../../../../store/parametrage/sous-acte/actions';
import * as sousActeSelector from '../../../../store/parametrage/sous-acte/selector';
import { takeUntil } from 'rxjs/operators';
import { SousActe } from 'src/app/store/parametrage/sous-acte/model';
import { Taux } from '../../../../store/parametrage/taux/model';
import { loadTaux } from '../../../../store/parametrage/taux/actions';
import * as tauxSelector from '../../../../store/parametrage/taux/selector';
import { Sort } from '../../../common/models/sort.enum';
import { loadGarantie } from '../../../../store/parametrage/garantie/actions';
import * as garantieSelector from '../../../../store/parametrage/garantie/selector';

import { loadPrestataire} from '../../../../store/parametrage/prestataire/actions';
import * as prestataireSelector from '../../../../store/parametrage/prestataire/selector';

import * as prefinancementSelector from '../../../../store/prestation/prefinancement/selector';
import * as prefinancementActions from '../../../../store/prestation/prefinancement/action';

import { loadMedecin} from '../../../../store/parametrage/medecin/actions';
import * as medecinSelector from '../../../../store/parametrage/medecin/selector';
import {medecinList} from '../../../../store/parametrage/medecin/selector';

import { loadActe } from '../../../../store/parametrage/acte/actions';
import * as acteSelector from '../../../../store/parametrage/acte/selector';

import { loadPathologie } from 'src/app/store/parametrage/pathologie/actions';
import * as pathologieSelector from '../../../../store/parametrage/pathologie/selector';

import { loadProduitPharmaceutique } from 'src/app/store/parametrage/produit-pharmaceutique/actions';
import * as produitPharmaceutiqueSelector from 'src/app/store/parametrage/produit-pharmaceutique/selector';

import { Acte } from 'src/app/store/parametrage/acte/model';
import { Garantie } from 'src/app/store/parametrage/garantie/model';
import { element } from 'protractor';
import { Prestataire } from 'src/app/store/parametrage/prestataire/model';
import { Medecin } from 'src/app/store/parametrage/medecin/model';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { Adherent } from 'src/app/store/contrat/adherent/model';
import * as featureActionAdherent from '../../../../store/contrat/adherent/actions';
import * as featureActionPrefinancement from '../../../../store/prestation/prefinancement/action';
import * as adherentSelector from '../../../../store/contrat/adherent/selector';
import { BonPriseEnCharge, CheckPlafond, CheckPrefinancementResult, MontantPlafondGarantieResponse, Prefinancement, Prestation, ReponseCheckMontantRestantGarantie, TypePaiement } from 'src/app/store/prestation/prefinancement/model';
import { Status } from 'src/app/store/global-config/model';
import { status } from '../../../../store/global-config/selector';
import { TypeEtatSinistre } from '../../../common/models/enum.etat.sinistre';
import { printPdfFile } from 'src/app/module/util/common-util';
import { TypeReport } from 'src/app/store/contrat/enum/model';
import { Report } from 'src/app/store/contrat/police/model';
import { TauxCommissionIntermediaireEffects } from 'src/app/store/parametrage/taux-commission-intermediaire/effect';
import { Pathologie } from 'src/app/store/parametrage/pathologie/model';
import { ProduitPharmaceutique } from 'src/app/store/parametrage/produit-pharmaceutique/model';
import { Dialog } from 'primeng/dialog/dialog';
import { BreadcrumbService } from 'src/app/app.breadcrumb.service';
import * as featureActionBonPriseEnCharge from '../../../../store/medical/bon-prise-en-charge/actions';
import * as selectorsBonPriseEnCharge from '../../../../store/medical/bon-prise-en-charge/selector';
import { TypeBon } from 'src/app/module/medical/enumeration/bon.enum';
import { ConventionService } from 'src/app/store/medical/convention/service';
import { TierPayantService } from 'src/app/store/prestation/tierPayant/service';
import { PrefinancementService } from 'src/app/store/prestation/prefinancement/service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-prefinancement',
  templateUrl: './prefinancement-edition.component.html',
  styleUrls: ['./prefinancement-edition.component.scss']
})
export class PrefinancementEditionComponent implements OnInit, OnDestroy {
  displayFormPrefinancement = false;
  prestationList: Array<FraisReels>;
  sousActeList$: Observable<Array<SousActe>>;
  sousActeList: Array<SousActe>;
  sousActeListFilter: Array<SousActe>;
  destroy$ = new Subject<boolean>();
  tauxList$: Observable<Array<Taux>>;
  tauxList: Array<Taux>;
  typeSort = Object.keys(Sort).map(key => ({ label: Sort[key], value: key }));
  prestationForm: FormGroup;
  prestationPopForm: FormGroup;
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
  produitPharmaceutiqueListExclu: Array<ProduitPharmaceutique>;
  acteListFilter: Array<Acte>;
  garanties: Array<Garantie>;
  garantieList$: Observable<Array<Garantie>>;
  adherentSelected: Adherent;
  adherentSelectedfinal: Adherent;
  adherentSelected$: Observable<Adherent>;
  medecinListFilter: Array<SelectItem>;
  prefinancementList: Array<Prefinancement> = [];
  prefinancementModel: Prefinancement = {};
  statusObject$: Observable<Status>;
  prefinancementDtoList$: Observable<Array<Prefinancement>>;
  prefinancementDtoList: Array<Prefinancement>;
  selectedPrefinancement: Prefinancement[];
  cols: any[];
  tab: number[] = [];
  taux: Taux;
  displayPrestation = false;
  prestationListPrefinancement: Array<Prestation>;
  prestationListPrefinancementFilter: Array<Prestation>;
  report: Report = {};
  public defaultDate: Date;
  checkControl = true;
  checkPrefinancementResult: Array<CheckPrefinancementResult>;
  bonPriseEnCharge: BonPriseEnCharge = {};
  bonPriseEnChargeList$: Observable<Array<BonPriseEnCharge>>;
  bonPriseEnChargeList: Array<BonPriseEnCharge>;
  plafondSousActe: CheckPlafond;
  plafondSousActeFinal: CheckPlafond;
  numberPrestation = 0;
  montantConvention: number = 0;
  montantConsomme:number = 0;
  montantPlafond1:number = 0;
  displayPrestationpop = false;
  displayPrestationbon = false;
  prestationsList: Prestation[]= [];
  prestationsList1: Prestation[]= [];
  compteur: number = null;
  typePaiement2 = Object.keys(TypePaiement).map(key => ({ label: TypePaiement[key], value: key }));
  displayFP = false;
  typePaiementValide = false;
  montantReponse$: Observable<ReponseCheckMontantRestantGarantie>;
  montantReponse: ReponseCheckMontantRestantGarantie;
  showMessage = false;
  prestationBon: Prestation = {};
  displayProduitExclus = false;
  position: string;
  produitPharmaceutiqueSelected : Array<ProduitPharmaceutique>;
  montantExclu1: number;

  constructor( private store: Store<AppState>,
               private confirmationService: ConfirmationService,
               private conventionService: ConventionService,
               private tierPayantService: TierPayantService,
               private prefinancementService: PrefinancementService,
               private formBuilder: FormBuilder,  private messageService: MessageService,  private breadcrumbService: BreadcrumbService,
               private router: Router ) {
                this.breadcrumbService.setItems([{ label: 'Sinistre edition' }]);
   }

   get prestation() {
    return this.prestationForm.controls.prestation as FormArray;
   }

   addItemPrestation(): void {
  //  const formPrestation: FormGroup = this.createItem();
   // this.prestation.push(formPrestation);
   this.prestationPopForm = this.createItem();
    this.displayPrestationpop = true;
    
  }
  addBon(): void {
    this.displayPrestationbon = true;
 
}
   deleteItemPrestation(i: number) {
    for (const f of this.tab){
      if (f === i) {
        this.tab.splice(i);
      }
    }
    if (!this.tab.length) {
      this.checkControl = true;
    }
    this.prestation.removeAt(i);
   }

   findMontantConsomme(event){
    console.log("====================verifier", event.value?.id);
    console.log(event);
    this.tierPayantService.$findMontantConsomme(this.adherentSelected.id, event.value?.id).subscribe(rest=>{

        this.montantConsomme = rest;
        console.log("==========rest==========", rest);
        console.log(this.montantConsomme);
       
    });
}

findMontantPlafond(event){
  this.tierPayantService.$findMontantPlafond(this.adherentSelected.id, event.value?.id).subscribe(rest=>{

      this.montantPlafond1 = rest;
     
  });
}

   createItem(): FormGroup {
    return this.formBuilder.group({
      id: new FormControl(),
      nombreActe: new FormControl('', [Validators.required]),
      coutUnitaire: new FormControl('', [Validators.required]),
      debours: new FormControl(),
      sousActe: new FormControl(Validators.required),
      baseRemboursement: new FormControl('', [Validators.required]),
      taux: new FormControl('', [Validators.required]),
      montantRembourse: new FormControl('', [Validators.required]),
      montantPlafond: new FormControl(),
      sort: new FormControl(),
      montantRestant: new FormControl(''),
      montantSupporte: new FormControl('', [Validators.required]),
      observation: new FormControl('', [Validators.required]),
      prestataire: new FormControl(null, [Validators.required]),
      centreExecutant: new FormControl(),
      produitPharmaceutique: new FormControl(),
      produitPharmaceutiqueExclu: new FormControl(),
      pathologie: new FormControl(null, [Validators.required]),
      dateSoins: new FormControl(null, Validators.required),
      acte: new FormControl(null, [Validators.required]),
      familleActe: new FormControl(null, [Validators.required]),
      medecin: new FormControl(null, [Validators.required]),
      historiqueAvenant: new FormControl(),
      inotPlafond: new FormControl(),
      matriculeAdherent: new FormControl(''),
      nomAdherent: new FormControl({value: '', disabled: true}),
      prenomAdherent: new FormControl({value: '', disabled: true}),
      numeroGroupe: new FormControl({value: '', disabled: true}),
      numeroPolice: new FormControl({value: '', disabled: true}),
      bonPriseEnCharge: new FormControl(),
      souscripteur: new FormControl(),
      nomGroupeAdherent: new FormControl(),
      montantExclu: new FormControl(),
      dateRetrait: new FormControl({value: '', disabled: true})
    });
  }

  ngOnInit(): void {
    this.prestationForm = this.formBuilder.group({
      // domaine: new FormControl({}),
      id: new FormControl(),
      referenceSinistreGarant: new FormControl(''),
      referenceBordereau: new FormControl(''),
      dateSaisie: new FormControl({value: '', disabled: true}),
      dateDeclaration: new FormControl(),
      dateSoins: new FormControl(),
      matriculeAdherent: new FormControl(''),
      nomAdherent: new FormControl({value: '', disabled: true}),
      prenomAdherent: new FormControl({value: '', disabled: true}),
      numeroGroupe: new FormControl({value: '', disabled: true}),
      numeroPolice: new FormControl({value: '', disabled: true}),
      montantSaisie: new FormControl(0),
      montantReclame: new FormControl(0),
      montantRestant: new FormControl(0),
      bonPriseEnCharge: new FormControl(),
      souscripteur: new FormControl(),
      nomGroupeAdherent: new FormControl(),
      prestation: this.formBuilder.array([]),
      dateRetrait: new FormControl({value: '', disabled: true}),
      typePaiement: new FormControl('', Validators.required),
      numeroOrange: new FormControl(),
      numeroMobicash: new FormControl(),
      numeroVirement: new FormControl(),
      nomBenefiniciaire: new FormControl(),
    });
    this.prestationForm.get('dateSaisie').setValue(new Date());
    this.store.dispatch(featureActionPrefinancement.setReportPrestation(null));
    this.store.pipe(select(prefinancementSelector.selectByteFile)).pipe(takeUntil(this.destroy$))
    .subscribe(bytes => {
        if (bytes) {
                printPdfFile(bytes);
        }
    });

    this.montantReponse$ = this.store.pipe(select(prefinancementSelector.selectedMontant));
    this.montantReponse$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      console.log('hhhhhhhhhhhhhhhhh>', this.montantReponse);
      if (value) {
        this.montantReponse = value;
        console.log('hhhhhhhhhhhhhhhhh>', this.montantReponse);
      }
    });

    // chargement des bons de prise en charge
    this.bonPriseEnChargeList$ = this.store.pipe(select(selectorsBonPriseEnCharge.bonPriseEnChargeList));
    this.store.dispatch(featureActionBonPriseEnCharge.loadBons());
    this.bonPriseEnChargeList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      console.log(value);
      if (value) {
        this.bonPriseEnChargeList = value;
      }
    });

    // this.adherentSelected$ = ;
    this.store.dispatch(featureActionAdherent.selectedAdherentForSearch(null));
    this.store.pipe(select(adherentSelector.selectedAdherent)).pipe(takeUntil(this.destroy$)).subscribe((value) => {
    console.log(value);
    if (value) {
        
        if(this.adherentSelectedfinal && this.prestationsList.length > 0) {
          console.log(this.prestationsList.length);
          console.log("====adherentSelected2021=======");
          console.log(this.adherentSelectedfinal.numero);
          console.log(value.numero);
          console.log("====adherentSelected2021=======");
          if(this.adherentSelectedfinal.numero !== value.numero) {
            this.addMessage('error', 'Assuré(e) non pris en compte', 'Veuillez continuer avec le même assuré');
          } else{
            this.adherentSelected = value;
            this.adherentSelectedfinal = this.adherentSelected;
        console.log(this.adherentSelected.dateIncorporation);
        console.log(this.prestationForm.value.dateDeclaration);
       
        console.log('***********this.adherentSelected***********', this.adherentSelected);
        console.log(this.adherentSelected);
        this.prestationPopForm.get('nomAdherent').setValue(this.adherentSelected.nom+" "+this.adherentSelected.prenom);
       //  this.prestationForm.get('prenomAdherent').setValue(this.adherentSelected.prenom);
        this.prestationPopForm.get('numeroGroupe').setValue(this.adherentSelected.groupe.numeroGroupe);
        this.prestationPopForm.get('numeroPolice').setValue(this.adherentSelected.groupe.police.numero);
        this.prestationPopForm.get('souscripteur').setValue(this.adherentSelected.groupe.police.nom);
        this.prestationPopForm.get('nomGroupeAdherent').setValue(this.adherentSelected.groupe.libelle);
        if (this.adherentSelected.adherentPrincipal !== null) {
          this.prestationPopForm.get('prenomAdherent').setValue(this.adherentSelected.adherentPrincipal.nom+" "+this.adherentSelected.adherentPrincipal.prenom);
      } else {
          this.prestationPopForm.get('prenomAdherent').setValue(this.adherentSelected.nom+" "+this.adherentSelected.prenom);
      }
      
        if(this.adherentSelected.signeAdherent ==='-') {
          if((value.dateSortie === null && value.dateSuspension  !== null) || (value.dateSortie !== null && value.dateSuspension  !== null && new Date(value.dateSuspension).getTime() < new Date(value.dateSortie).getTime()
          && new Date(value.dateSortie).getTime() > new Date(this.prestationPopForm.value.dateSoins).getTime()) ) {
              this.addMessage('error', 'Assuré(e) non pris en compte',
              'Cet(te) assuré(e) est  suspendu(e) !!!');
              if( new Date(this.adherentSelected?.dateSuspension).getTime() < new Date(this.prestationPopForm.value.dateSoins).getTime() ||  new Date(this.adherentSelected?.dateSuspension).getTime() == new Date(this.prestationPopForm.value.dateSoins).getTime()) {
                  this.prestationPopForm.patchValue({
                  //  dateRetrait: new Date(this.adherentSelected.dateSortie),
                    montantRembourse : 0,
                    observation: "Cet(te) assuré(e) a  été suspendu(e1)",
                    sort : Sort.REJETE
                    // sort: Sort.ACCORDE
                    });
                 
              }
              this.prestationPopForm.patchValue({
                dateRetrait: new Date(this.adherentSelected.dateSuspension),
                // sort: Sort.ACCORDE
                });
              
          } 
          if(value.dateSortie !== null || (value.dateSuspension !== null  && (new Date(value.dateSuspension)?.getTime() < new Date(value.dateSortie)?.getTime())
          && new Date(value.dateSortie).getTime() > new Date(this.prestationPopForm.value.dateSoins).getTime())) {
              this.addMessage('error', 'Assuré(e) non pris en compte',
              'Cet(te) assuré(e) est  retiré(e) !!!');
              if( new Date(this.adherentSelected?.dateSortie).getTime() < new Date(this.prestationPopForm.value.dateSoins).getTime() ||  new Date(this.adherentSelected?.dateSortie).getTime() == new Date(this.prestationPopForm.value.dateSoins).getTime()) {
                  this.prestationPopForm.patchValue({
                    montantRembourse : 0,
                    observation: "Cet(te) assuré(e) est  retiré(e)",
                    sort : Sort.REJETE
                    });
                 
              }

              if( this.adherentSelected.dateSuspension !== null && new Date(this.adherentSelected?.dateSuspension).getTime() < new Date(this.prestationPopForm.value.dateSoins).getTime()
              ||  new Date(this.adherentSelected?.dateSuspension).getTime() == new Date(this.prestationPopForm.value.dateSoins).getTime()) {
                this.prestationPopForm.patchValue({
                  montantRembourse : 0,
                  observation: "Cet(te) assuré(e) a  été suspendu(e)",
                  sort : Sort.REJETE
                  });
    
              }
              this.prestationPopForm.patchValue({
                dateRetrait: new Date(this.adherentSelected.dateSortie),
                });
              
          }
          
        }
          }
        } else {
          this.adherentSelected = value;
          this.adherentSelectedfinal = this.adherentSelected;
          console.log(this.adherentSelected.dateIncorporation);
          console.log(this.prestationForm.value.dateDeclaration);
         
          console.log('***********this.adherentSelected***********', this.adherentSelected);
          console.log(this.adherentSelected);
          this.prestationPopForm.get('nomAdherent').setValue(this.adherentSelected.nom+" "+this.adherentSelected.prenom);
         //  this.prestationForm.get('prenomAdherent').setValue(this.adherentSelected.prenom);
          this.prestationPopForm.get('numeroGroupe').setValue(this.adherentSelected.groupe.numeroGroupe);
          this.prestationPopForm.get('numeroPolice').setValue(this.adherentSelected.groupe.police.numero);
          this.prestationPopForm.get('souscripteur').setValue(this.adherentSelected.groupe.police.nom);
          this.prestationPopForm.get('nomGroupeAdherent').setValue(this.adherentSelected.groupe.libelle);
          if (this.adherentSelected.adherentPrincipal !== null) {
            this.prestationPopForm.get('prenomAdherent').setValue(this.adherentSelected.adherentPrincipal.nom+" "+this.adherentSelected.adherentPrincipal.prenom);
        } else {
            this.prestationPopForm.get('prenomAdherent').setValue(this.adherentSelected.nom+" "+this.adherentSelected.prenom);
        }
          if(this.adherentSelected.signeAdherent ==='-') {
            if((value.dateSortie === null && value.dateSuspension  !== null) || (value.dateSortie !== null && value.dateSuspension  !== null && new Date(value.dateSuspension).getTime() < new Date(value.dateSortie).getTime()
          && new Date(value.dateSortie).getTime() > new Date(this.prestationPopForm.value.dateSoins).getTime()) ||  new Date(this.adherentSelected?.dateSuspension).getTime() == new Date(this.prestationPopForm.value.dateSoins).getTime()) {
              this.addMessage('error', 'Assuré(e) non pris en compte',
              'Cet(te) assuré(e) est  suspendu(e) !!!');
              if( new Date(this.adherentSelected?.dateSuspension).getTime() < new Date(this.prestationPopForm.value.dateSoins).getTime() ||  new Date(this.adherentSelected?.dateSuspension).getTime() == new Date(this.prestationPopForm.value.dateSoins).getTime()) {
                  this.prestationPopForm.patchValue({
                  //  dateRetrait: new Date(this.adherentSelected.dateSortie),
                    montantRembourse : 0,
                    observation: "Cet(te) assuré(e) a  été suspendu(e)",
                    sort : Sort.REJETE
                    // sort: Sort.ACCORDE
                    });
                 
              }
              this.prestationPopForm.patchValue({
                dateRetrait: new Date(this.adherentSelected.dateSuspension),
                // sort: Sort.ACCORDE
                });
              
          } 
          if(value.dateSortie !== null || (value.dateSuspension !=null && (new Date(value.dateSuspension)?.getTime() < new Date(value.dateSortie)?.getTime() ))) {
              this.addMessage('error', 'Assuré(e) non pris en compte',
              'Cet(te) assuré(e) est  retiré(e) !!!');
              if( new Date(this.adherentSelected?.dateSortie).getTime() < new Date(this.prestationPopForm.value.dateSoins).getTime() ||  new Date(this.adherentSelected?.dateSortie).getTime() == new Date(this.prestationPopForm.value.dateSoins).getTime()) {
                  this.prestationPopForm.patchValue({
                    montantRembourse : 0,
                    observation: "Cet(te) assuré(e) a  été retiré(e)",
                    sort : Sort.REJETE
                    });
                 
              }

              if( this.adherentSelected.dateSuspension !== null && new Date(this.adherentSelected?.dateSuspension).getTime() < new Date(this.prestationPopForm.value.dateSoins).getTime() ||  new Date(this.adherentSelected?.dateSuspension).getTime() == new Date(this.prestationPopForm.value.dateSoins).getTime()) {
               
                this.prestationPopForm.patchValue({
                  montantRembourse : 0,
                  observation: "Cet(te) assuré(e) a  été suspendu(e)",
                  sort : Sort.REJETE
                  });
    
              }
              this.prestationPopForm.patchValue({
                dateRetrait: new Date(this.adherentSelected.dateSortie),
                });
              
          } 
          }
        }
       
       
        console.log(this.bonPriseEnChargeList);
        this.bonPriseEnChargeList = this.bonPriseEnChargeList.filter(e => e.adherent.id === this.adherentSelected.id &&
          e.typeBon === TypeBon.ENTENTEPREALABLE);
        //this.taux = this.adherentSelected.groupe.taux;
      }
      
    });

    this.produitPharmaceutiqueList$ = this.store.pipe(select(produitPharmaceutiqueSelector.produitPharmaceutiqueList));
    this.store.dispatch(loadProduitPharmaceutique());
    this.produitPharmaceutiqueList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      console.log(value);
      if (value) {
        this.produitPharmaceutiqueList = value.slice();
      }
    });

    this.pathologieList$ = this.store.pipe(select(pathologieSelector.pathologieList));
    this.store.dispatch(loadPathologie());
    this.pathologieList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      console.log(value);
      if (value) {
        this.pathologieList = value.slice();
      }
    });

    this.prefinancementDtoList$ = this.store.pipe(select(prefinancementSelector.prefinancementList));
    this.store.dispatch(featureActionPrefinancement.loadPrefinancement());
    this.prefinancementDtoList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      console.log(value);
      if (value) {
        this.prefinancementDtoList = value.slice();
      }
    });
    this.sousActeList$ = this.store.pipe(select(sousActeSelector.sousacteList));
    this.store.dispatch(loadSousActe());
    this.sousActeList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        console.log(this.sousActeList);
        this.sousActeList = value.slice();
        this.sousActeListFilter = this.sousActeList;
      }
    });

    this.tauxList$ = this.store.pipe(select(tauxSelector.tauxList));
    this.store.dispatch(loadTaux());
    this.tauxList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.tauxList = value.slice();
      }
    });

    this.garantieList$ = this.store.pipe(select(garantieSelector.garantieList));
    this.store.dispatch(loadGarantie());
    this.garantieList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.garanties = value.slice();
      }
    });

    this.prestataireList$ = this.store.pipe(select(prestataireSelector.prestataireList));
    this.store.dispatch(loadPrestataire());
    this.prestataireList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.prestataireList = value.slice();
       // this.prestataireList.filter(ele => console.log('***************' + ele.libelleTypePrestataire.toUpperCase()));
        this.prestatairePrescripteur = this.prestataireList.filter(ele => ele.libelleTypePrestataire &&
           ele.libelleTypePrestataire.toUpperCase() !== 'PHARMACIE');
        console.log(this.prestatairePrescripteur);
        this.prestataireExecutant = this.prestataireList;
      }
    });

    this.medecinList$ = this.store.pipe(select(medecinSelector.medecinList));
    this.store.dispatch(loadMedecin());
    this.medecinList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.medecinList = value.slice();
      }
    });

    this.acteList$ = this.store.pipe(select(acteSelector.acteList));
    this.store.dispatch(loadActe());
    this.acteList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.acteList = value.slice();
        this.acteListFilter = this.acteList;
      }
    });

    this.statusObject$ = this.store.pipe(select(status));
    this.checkStatus();
  }

  imprimer(pref: Prefinancement) {
    this.report.typeReporting = TypeReport.PREFINANCEMENT_FICHE_DETAIL_REMBOURSEMENT;
    this.report.prefinancementDto = pref;
    this.store.dispatch(featureActionPrefinancement.FetchReportPrestation(this.report));
  }

  validerPrestation(pref: Prefinancement) {
    this.confirmationService.confirm({
      message: 'voulez-vous valider le sinistre',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(featureActionPrefinancement.updateEtatValiderPrefinancement({prefinancement: pref,
          etat: TypeEtatSinistre.VALIDE}));
      },
    });
  }

  addMessage(severite: string, resume: string, detaile: string): void {
    this.messageService.add({severity: severite, summary: resume, detail: detaile});
  }

  checkDateCondition() {
    if (!this.checkIfDateIsCorrect(new Date(this.prestationForm.get('dateDeclaration').value))){
      this.showToast('error', 'INFORMATION', 'la date de declaration est superieure à la date du jour');
      this.prestationForm.reset({dateSaisie: new Date()});
    }
  }

  checkIfDateIsCorrect(d: Date){
    const toDay = new Date();
    console.log(d.getTime);
    if (toDay.getTime() < d.getTime()){
      return false;
    }
    return true;
  }
  selectDateSoins1() {
  
    this.plafondSousActe = {};
    this.plafondSousActe.dateSoins = this.prestationPopForm.get('dateSoins').value;
    const toDay = new Date();
    console.log('************************ date de soins' + this.plafondSousActe.dateSoins);
    if (this.plafondSousActe.dateSoins  && new Date(this.plafondSousActe.dateSoins).getTime() > toDay.getTime()) {
      this.showToast('error', 'INFORMATION', 'la date de soins est superieure à la date du jour');
      this.prestationPopForm.get('dateSoins').setValue(null);
      return;
    }
    
  }
  selectDateSoins(i) {
    console.log('************************ selection de la date de soins' + i);
    this.numberPrestation = i;
    const myForm = (this.prestationForm.get('prestation') as FormArray).at(i);
    this.plafondSousActe = {};
    this.plafondSousActe.dateSoins = myForm.get('dateSoins').value;
    if( new Date(this.adherentSelected.dateIncorporation).getTime() > new Date(this.plafondSousActe.dateSoins).getTime()) {
            

      this.addMessage('error', 'Date de soins invalide',
                  'La date de soins du sinistre ne peut pas être antérieure à celle de la date d\'incorporation du sinitre');
                  myForm.get('dateSoins').setValue(null);
                  
                  
           


  }
    console.log('************************ date de soins' + this.plafondSousActe.dateSoins);
    if (this.plafondSousActe.dateSoins && !this.checkIfDateIsCorrect(this.plafondSousActe.dateSoins)) {
      this.showToast('error', 'INFORMATION', 'la date de soins est superieure à la date du jour');
      myForm.reset();
      return;
    }
    this.plafondSousActe.adherent = this.adherentSelected;
    this.plafondSousActe.sousActe = this.prestationForm.get('prestation').value[i].sousActe;
    this.conventionService.$findMontantConvention( this.plafondSousActe?.sousActe?.id).subscribe((rest)=>{
      this.montantConvention = rest;

  });
    if (this.plafondSousActe.sousActe && this.plafondSousActe.dateSoins && this.plafondSousActe.adherent){
    this.store.dispatch(featureActionPrefinancement.checkPlafond(this.plafondSousActe));
    this.store.pipe(select(prefinancementSelector.montantSousActe)).pipe(takeUntil(this.destroy$)).subscribe((value) => {
      console.log(value);
      if (value) {
        console.log('la valeur de i est ********************' + this.numberPrestation);
        console.log('le montant de i est ********************' + value);
        this.prestation.at(this.numberPrestation).get('montantPlafond').setValue(value);
      } else {
      }
    });
    }
    console.log(this.plafondSousActe);
  }
  selectDateSoinsSousActe() {
    console.log( this.adherentSelected);
    this.plafondSousActe = {};
    this.plafondSousActe.adherent = this.adherentSelectedfinal;
    console.log("========================" ,this.prestationPopForm.get('sousActe').value);
    this.plafondSousActe.sousActe = this.prestationPopForm.get('sousActe').value;
    this.plafondSousActe.dateSoins = this.prestationPopForm.get('dateSoins').value;
    this.conventionService.$findMontantConvention( this.plafondSousActe?.sousActe?.id).subscribe((rest)=>{
      this.montantConvention = rest;

  });
    if (this.plafondSousActe.sousActe && this.plafondSousActe.dateSoins && this.plafondSousActe.adherent){
    this.store.dispatch(featureActionPrefinancement.checkPlafond(this.plafondSousActe));
    this.store.pipe(select(prefinancementSelector.montantSousActe)).pipe(takeUntil(this.destroy$)).subscribe((value) => {
      console.log(value);
      if (value) {
        console.log('la valeur de i est ********************' + this.numberPrestation);
        console.log('le montant de i est ********************' + value);
        this.prestationPopForm.get('montantPlafond').setValue(value);
        //this.prestation.at(this.numberPrestation).get('montantPlafond').setValue(value);
      } else {
      }
    });
    }
  }
  supprimerPrefinancement() {
    console.log(this.selectedPrefinancement);
    if (!this.selectedPrefinancement) {
      this.showToast('error', 'INFORMATION', 'aucun préfinancement selectionné');
    } else {
      this.confirmationService.confirm({
        message: 'voulez-vous supprimer le sinistre',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.store.dispatch(featureActionPrefinancement.deletePrefinancement({prefinancement: this.selectedPrefinancement}));
      }
     });
    }
  }

  selectActe(event){
    console.log(event);
    this.sousActeListFilter = this.sousActeList.filter(e => e.idTypeActe === event.value.id);
  }
  

  onRowSelectBon($event){
    console.log($event.value);
    for (const pr of $event.value.prestation) {
      const formPrestation: FormGroup = this.createItem();
      pr.id = null;
      formPrestation.patchValue(pr);
      formPrestation.get('dateSoins').setValue(new Date(pr.dateSoins));
      formPrestation.get('debours').setValue(pr.debours);
      formPrestation.get('taux').setValue(pr.taux);
      formPrestation.get('montantRembourse').setValue(pr.montantRembourse);
      formPrestation.get('baseRemboursement').setValue(pr.baseRemboursement);
      this.prestation.push(formPrestation);
      }
    this.displayFormPrefinancement = true;
  }
  saveBon() {
    
    if(this.prestationBon.bonPriseEnCharge) {
        for(let i =0 ; i< this.prestationBon.bonPriseEnCharge.prestation.length; i ++) {
          this.prestationBon.bonPriseEnCharge.prestation[i].id = null;
            this.prestationsList.push(this.prestationBon.bonPriseEnCharge.prestation[i]);
        }
        
    }
    this.prestationBon = {};
    this.displayPrestationbon = false;
  }
  editerPrestation(pref: Prefinancement) {
    console.log("=====================");
    console.log(pref);
    this.adherentSelected = pref.adherent;
    this.adherentSelectedfinal = pref.adherent;
    this.prestationsList = pref.prestation; 
    this.prestationForm.get('id').setValue(pref.id);
    this.prestationForm.get('referenceBordereau').setValue(pref.referenceBordereau);
    this.prestationForm.get('matriculeAdherent').setValue(pref.adherent.numero);
    this.prestationForm.get('nomAdherent').setValue(this.adherentSelected.nom+" "+this.adherentSelected.prenom);
    if (this.adherentSelected.adherentPrincipal != null) {
      this.prestationForm.get('prenomAdherent').setValue(this.adherentSelected.adherentPrincipal.nom+" "+this.adherentSelected.adherentPrincipal.prenom);
  } else {
      this.prestationForm.get('prenomAdherent').setValue(this.adherentSelected.nom+" "+this.adherentSelected.prenom);
  }
    this.prestationForm.get('numeroGroupe').setValue(pref.adherent.groupe.numeroGroupe);
    this.prestationForm.get('numeroPolice').setValue(pref.adherent.groupe.police.numero);
    this.prestationForm.get('souscripteur').setValue(pref.adherent.groupe.police.nom);
    this.prestationForm.get('nomGroupeAdherent').setValue(pref.adherent.groupe.libelle);
    this.prestationForm.get('dateDeclaration').setValue(pref.dateDeclaration);
    this.prestationForm.get('typePaiement').setValue(pref.typePaiement);
    //this.prestationForm.get('dateSoins').setValue(new Date(pref.dateSoins));
    this.prestationForm.get('dateSaisie').setValue(new Date(pref.dateSaisie));
    for (const pr of pref.prestation) {
    const formPrestation: FormGroup = this.createItem();
    formPrestation.patchValue(pr);
    formPrestation.get('dateSoins').setValue(pr.dateSoins);
    formPrestation.get('debours').setValue(pr.debours);
    formPrestation.get('taux').setValue(pr.taux);
    formPrestation.get('montantRembourse').setValue(pr.montantRembourse);
    formPrestation.get('baseRemboursement').setValue(pr.baseRemboursement);
    formPrestation.get('montantSupporte').setValue(pr.montantSupporte);
    formPrestation.get('montantPlafond').setValue(pr.montantPlafond);
    this.prestation.push(formPrestation);
    }
    this.displayFormPrefinancement = true;
  }

  voirPrestation(pref: Prefinancement){
    this.displayPrestation = true;
    this.prestationListPrefinancement = pref.prestation;
    this.prestationListPrefinancementFilter = this.prestationListPrefinancement;
  }

  supprimerPrestation(prestation: Prestation, i: number) {
    this.confirmationService.confirm({
      message: 'voulez-vous supprimer la prestation',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if(prestation.id) {
          this.store.dispatch(featureActionPrefinancement.deletePrestation(prestation));
          this.prestationsList =    this.prestationsList.filter(el  => el.id  !== prestation.id);

      } else {
        this.prestationsList1 = [];
        if(i>0) {
          for(let j= 0; j< i; j++) {
            this.prestationsList1.push(this.prestationsList[j]);
          }
          for(let j= i+1; j< this.prestationsList.length ; j++) {
            this.prestationsList1.push(this.prestationsList[j]);
          }
  
        }else {
          for(let j= 1; j< this.prestationsList.length; j++) {
            this.prestationsList1.push(this.prestationsList[j]);
          }
        }
        
          this.prestationsList = this.prestationsList1;
      }
      
      /*  this.store.dispatch(featureActionPrefinancement.deletePrestation(prestation));
        this.prestationListPrefinancementFilter = this.prestationListPrefinancement.filter(el  => el.id  !== prestation.id);*/
      },
    });
  }

  calculDebours(i: number) {
    const myForm = (this.prestationForm.get('prestation') as FormArray).at(i);
    console.log("===========");
    console.log(this.adherentSelected.genre.id, this.prestationForm.get('prestation').value[i].sousActe.idGenre);
    console.log("===========");
   if((this.prestationForm.get('prestation').value[i].sousActe.idGenre && this.adherentSelected.genre.id === this.prestationForm.get('prestation').value[i].sousActe.idGenre) ||
   (this.adherentSelected.genre.id !== this.prestationForm.get('prestation').value[i].sousActe.idGenre && this.adherentSelected.qualiteAssure.code =="ENFANT")) {
      myForm.patchValue({ montantRembourse : 0});
      myForm.patchValue({ montantRestant:  this.prestationForm.get('prestation').value[i].baseRemboursement - this.prestationForm.get('prestation').value[i].montantRembourse});
      if(this.adherentSelected.genre.id !== this.prestationForm.get('prestation').value[i].sousActe.idGenre && this.adherentSelected.qualiteAssure.code =="ENFANT") {
        myForm.patchValue({observation: "Nous ne prenons pas en compte "+ this.prestationForm.get('prestation').value[i].sousActe.libelle+ " "+"pour les enfants filles"}); 

      } else {
        myForm.patchValue({observation: "Nous ne prenons pas en compte "+ this.prestationForm.get('prestation').value[i].sousActe.libelle+ " "+"pour le genre"+ " " +this.adherentSelected.genre.libelle}); 

      }
      myForm.patchValue({sort: Sort.REJETE}); 

      myForm.patchValue({
        debours: this.prestationForm.get('prestation').value[i].nombreActe *
      this.prestationForm.get('prestation').value[i].coutUnitaire, baseRemboursement:
      this.prestationForm.get('prestation').value[i].nombreActe *
      this.prestationForm.get('prestation').value[i].coutUnitaire, montantSupporte: this.prestationForm.get('prestation').value[i].nombreActe *
      this.prestationForm.get('prestation').value[i].coutUnitaire});
      
   

    

  } else {

  
    if(this.prestationForm.get('prestation').value[i].coutUnitaire > this.montantConvention && this.montantConvention !== 0) {
      this.showToast('error', 'INFORMATION', 'coût unitaire et le montant de la convention sont differents');
      const c =this.montantConvention - this.prestationForm.get('prestation').value[i].coutUnitaire;
      myForm.patchValue({inotPlafond: true});
      myForm.patchValue({coutUnitaire: this.montantConvention})
      myForm.patchValue({observation: "la differnce entre le coût unitaire et le montant de la convention est " + c});
    }
    
    myForm.patchValue({taux: this.adherentSelected.groupe.taux, sort: Sort.ACCORDE});

    if (this.prestationForm.get('prestation').value[i].nombreActe &&
    this.prestationForm.get('prestation').value[i].coutUnitaire) {

      myForm.patchValue({montantRembourse:
        (this.prestationForm.get('prestation').value[i].coutUnitaire *
        this.prestationForm.get('prestation').value[i].taux.taux) / 100,
        debours: this.prestationForm.get('prestation').value[i].nombreActe *
      this.prestationForm.get('prestation').value[i].coutUnitaire, baseRemboursement:
      this.prestationForm.get('prestation').value[i].nombreActe *
      this.prestationForm.get('prestation').value[i].coutUnitaire});
    }

    this.prefinancementModel = this.prestationForm.value;
    this.prefinancementModel.dateSaisie = new Date();
    this.prefinancementModel.adherent = this.adherentSelected;
    this.prefinancementList.push(this.prefinancementModel);
    /* executer le controle de la prestation */
    this.store.dispatch(featureActionPrefinancement.checkPrefinancement({prefinancement: this.prefinancementList}));
    this.store.pipe(select(prefinancementSelector.selectCheckPrefinancementReponse)).pipe(takeUntil(this.destroy$)).subscribe((value) => {
      console.log(value);
      if (!value) {

      } else {
        this.checkPrefinancementResult = value.slice();
        console.log(this.checkPrefinancementResult);
        for (let j = 0; j < this.checkPrefinancementResult.length; j++){
          const myForm1 = (this.prestationForm.get('prestation') as FormArray).at(j);
          /** */
          const plafond = myForm1.get('montantPlafond').value;
          const totalPlafond = plafond * this.prestationForm.get('prestation').value[j].nombreActe;
          let montantRembourse = this.checkPrefinancementResult[j].montantRembourse;
          let montantSupporte = (this.prestationForm.get('prestation').value[j].nombreActe *
          this.prestationForm.get('prestation').value[j].coutUnitaire) - montantRembourse;
          if (this.checkPrefinancementResult[j].montantRembourse > totalPlafond) {
            montantRembourse = totalPlafond;
            montantSupporte = (this.prestationForm.get('prestation').value[j].nombreActe *
            this.prestationForm.get('prestation').value[j].coutUnitaire) - montantRembourse;
          }
          myForm1.patchValue({montantRembourse, montantSupporte,
            sort: this.checkPrefinancementResult[j].sort, montantRestant: this.checkPrefinancementResult[j].montantRestant,
            observation: this.checkPrefinancementResult[j].message, historiqueAvenant: this.checkPrefinancementResult[j].historiqueAvenant
          });
          if(!this.checkPrefinancementResult[j].montantRestant) {
            myForm1.patchValue({ montantRestant: this.prestationForm.get('prestation').value[j].baseRemboursement -  this.prestationForm.get('prestation').value[j].montantRembourse });
          }
        }
      /* Gestion des personnes rétirées au front */
      if (this.adherentSelected.signeAdherent ==='-') {
        if(this.prestationForm.get('dateSaisie').value >= this.prestationForm.get('dateRetrait').value ||
        this.prestationForm.get('dateRetrait').value <= myForm.get('dateSoins').value) {
          myForm.patchValue({
            sort: Sort.REJETE,
            observation: "Assuré(e) rétiré(e)",
            montantRembourse: 0,
            montantSupporte: this.prestationForm.get('prestation').value[i].nombreActe *
            this.prestationForm.get('prestation').value[i].coutUnitaire
          });
        }
      } else {
        console.log(this.prestationForm.get('prestation').value[i].montantPlafond, this.montantConsomme)
        if(this.montantConsomme >  this.prestationForm.get('prestation').value[i].montantPlafond) {

          myForm.patchValue({observation: "Votre plafond est atteint"});
          myForm.patchValue({
            sort: Sort.REJETE,
            observation: "Votre plafond est atteint",
            montantRembourse: 0,
            montantSupporte: this.prestationForm.get('prestation').value[i].nombreActe *
            this.prestationForm.get('prestation').value[i].coutUnitaire
          });
        }
      }

        }
    });
  }
    
    this.prefinancementList = [];
    this.prefinancementModel = {};
  
  }

  calculDebours1() {
    if (this.prestationPopForm.get('sort').value !== Sort.REJETE) {
      
    
    const myForm = this.prestationPopForm;
  
    
   if((this.prestationPopForm.get('sousActe').value.idGenre && this.adherentSelected.genre.id === this.prestationPopForm.get('sousActe').value.idGenre) ||
   (this.prestationPopForm.get('sousActe').value.idGenre && this.adherentSelected.genre.id !== this.prestationPopForm.get('sousActe').value.idGenre && this.adherentSelected.qualiteAssure.code =="ENFANT")) {
      myForm.patchValue({ montantRembourse : 0});
      myForm.patchValue({ montantRestant:  this.prestationPopForm.get('baseRemboursement').value - this.prestationPopForm.get('montantRembourse').value});
      if(this.adherentSelected.genre.id !== this.prestationPopForm.get('sousActe').value.idGenre && this.adherentSelected.qualiteAssure.code =="ENFANT") {
       // myForm.patchValue({taux: this.adherentSelected.groupe.taux});
        myForm.patchValue({observation: "Nous ne prenons pas en compte "+ this.prestationPopForm.get('sousActe').value.libelle+ " "+"pour les enfants filles"}); 

      } else {
        // myForm.patchValue({taux: this.adherentSelected.groupe.taux});
        myForm.patchValue({observation: "Nous ne prenons pas en compte "+ this.prestationPopForm.get('sousActe').value.libelle+ " "+"pour le genre"+ " " +this.adherentSelected.genre.libelle}); 

      }
      myForm.patchValue({sort: Sort.REJETE}); 

      myForm.patchValue({
        debours: this.prestationPopForm.get('nombreActe').value *
      this.prestationPopForm.get('coutUnitaire').value, baseRemboursement:
      this.prestationPopForm.get('nombreActe').value *
      this.prestationPopForm.get('coutUnitaire').value, montantSupporte: this.prestationPopForm.get('nombreActe').value *
      this.prestationPopForm.get('coutUnitaire').value});
   } else {

  
    if(this.prestationPopForm.get('coutUnitaire').value > this.montantConvention && this.montantConvention !== 0) {
      this.showToast('error', 'INFORMATION', 'coût unitaire et le montant de la convention sont differents');
      const c =this.montantConvention - this.prestationPopForm.get('coutUnitaire').value;
      myForm.patchValue({inotPlafond: true});
      myForm.patchValue({coutUnitaire: this.montantConvention})
      myForm.patchValue({observation: "la difference entre le coût unitaire et le montant de la convention est " + c});
    }
    
    myForm.patchValue({ sort: Sort.ACCORDE});
    myForm.patchValue({observation: "Remboursement favorable"});

    if (this.prestationPopForm.get('nombreActe').value &&
    this.prestationPopForm.get('coutUnitaire').value) {

      myForm.patchValue({montantRembourse:
        (this.prestationPopForm.get('coutUnitaire').value * this.prestationPopForm.get('nombreActe').value *
        this.prestationPopForm.get('taux').value.taux) / 100,
        debours: this.prestationPopForm.get('nombreActe').value *
      this.prestationPopForm.get('coutUnitaire').value, baseRemboursement:
      this.prestationPopForm.get('nombreActe').value *
      this.prestationPopForm.get('coutUnitaire').value});
    }

    if(this.prestationPopForm.get('montantPlafond').value && this.prestationPopForm.get('montantPlafond').value < this.prestationPopForm.get('coutUnitaire').value) {
      myForm.patchValue({montantRembourse:
        (this.prestationPopForm.get('montantPlafond').value * this.prestationPopForm.get('nombreActe').value) ,
        debours: this.prestationPopForm.get('nombreActe').value *
      this.prestationPopForm.get('coutUnitaire').value, baseRemboursement:
      this.prestationPopForm.get('nombreActe').value *
      this.prestationPopForm.get('coutUnitaire').value});
    }

    this.prefinancementModel = this.prestationForm.value;
    this.prefinancementModel.dateSaisie = new Date();
    this.prefinancementModel.adherent = this.adherentSelected;
    this.prefinancementList.push(this.prefinancementModel);

    if((this.montantConsomme + this.prestationPopForm.get('montantRembourse').value) > this.montantPlafond1  ) {

      console.log("============1==========",this.montantPlafond1,"====",this.prestationPopForm.get('montantRembourse').value , "=",this.montantConsomme);
      myForm.patchValue({
        sort: Sort.ACCORDE,
        observation: "Remboursement favorable avec un plafond atteint. Vous avez franchi de " + (this.montantPlafond1 -(this.montantConsomme +  (this.prestationPopForm.get('baseRemboursement').value))),
        montantRembourse: this.montantPlafond1 - this.montantConsomme,
        montantRestant:   this.prestationPopForm.get('baseRemboursement').value - this.prestationPopForm.get('montantRembourse').value
      })
     
  }/* else {
    myForm.patchValue({
      sort: Sort.REJETE,
      observation: "Remboursement favorable avec un plafond atteint. Vous avez franchi de ",
      montantRembourse: 0,
      montantRestant:   this.prestationPopForm.get('baseRemboursement').value
    })
  } */
    /* executer le controle de la prestation */
   /* this.store.dispatch(featureActionPrefinancement.checkPrefinancement({prefinancement: this.prefinancementList}));
    this.store.pipe(select(prefinancementSelector.selectCheckPrefinancementReponse)).pipe(takeUntil(this.destroy$)).subscribe((value) => {
      console.log(value);
      if (!value) {

      } else {
        this.checkPrefinancementResult = value.slice();
        console.log(this.checkPrefinancementResult);
        for (let j = 0; j < this.checkPrefinancementResult.length; j++){
          const myForm1 = (this.prestationForm.get('prestation') as FormArray).at(j);
         
          const plafond = myForm1.get('montantPlafond').value;
          const totalPlafond = plafond * this.prestationForm.get('prestation').value[j].nombreActe;
          let montantRembourse = this.checkPrefinancementResult[j].montantRembourse;
          let montantSupporte = (this.prestationForm.get('prestation').value[j].nombreActe *
          this.prestationForm.get('prestation').value[j].coutUnitaire) - montantRembourse;
          if (this.checkPrefinancementResult[j].montantRembourse > totalPlafond) {
            montantRembourse = totalPlafond;
            montantSupporte = (this.prestationForm.get('prestation').value[j].nombreActe *
            this.prestationForm.get('prestation').value[j].coutUnitaire) - montantRembourse;
          }
          myForm1.patchValue({montantRembourse, montantSupporte,
            sort: this.checkPrefinancementResult[j].sort, montantRestant: this.checkPrefinancementResult[j].montantRestant,
            observation: this.checkPrefinancementResult[j].message, historiqueAvenant: this.checkPrefinancementResult[j].historiqueAvenant
          });
          if(!this.checkPrefinancementResult[j].montantRestant) {
            myForm1.patchValue({ montantRestant: this.prestationForm.get('prestation').value[j].baseRemboursement -  this.prestationForm.get('prestation').value[j].montantRembourse });
          }
        }*/
      /* Gestion des personnes rétirées au front */
      if(this.adherentSelected.signeAdherent ==='-') {
        if((this.adherentSelected.dateSortie === null && this.adherentSelected.dateSuspension  !== null) || (new Date(this.adherentSelected.dateSuspension).getTime() < new Date(this.adherentSelected.dateSortie).getTime()
        && new Date(this.adherentSelected.dateSortie).getTime() > new Date(this.prestationPopForm.value.dateSoins).getTime())) {
    
            if(this.adherentSelected.dateSuspension !== null &&  new Date(this.adherentSelected?.dateSuspension).getTime() < new Date(this.prestationPopForm.value.dateSoins).getTime()) {
                 myForm.patchValue({
               
                  montantRembourse : 0,
                  observation: "Cet(te) assuré(e) a  été suspendu(e1)",
                  montantSupporte: this.prestationPopForm.get('nombreActe').value *
                  this.prestationPopForm.get('coutUnitaire').value,
                  sort : Sort.REJETE
                  // sort: Sort.ACCORDE
                  });
               
            }
            
            
        } 
        if(this.adherentSelected.dateSortie !== null && (new Date(this.adherentSelected.dateSuspension)?.getTime() < new Date(this.adherentSelected.dateSortie)?.getTime() )) {
            
            if( new Date(this.adherentSelected?.dateSortie).getTime() < new Date(this.prestationPopForm.value.dateSoins).getTime()) {
              myForm.patchValue({
                  montantRembourse : 0,
                  observation: "Cet(te) assuré(e) a  été retiré(e)",
                  montantSupporte: this.prestationPopForm.get('nombreActe').value *
                  this.prestationPopForm.get('coutUnitaire').value,
                  sort : Sort.REJETE
                  });
               
            }

            if( this.adherentSelected.dateSuspension !== null && new Date(this.adherentSelected?.dateSuspension).getTime() < new Date(this.prestationPopForm.value.dateSoins).getTime()) {
              myForm.patchValue({
                montantRembourse : 0,
                observation: "Cet(te) assuré(e) a  été suspendu(e)",
                montantSupporte: this.prestationPopForm.get('nombreActe').value *
                this.prestationPopForm.get('coutUnitaire').value,
                sort : Sort.REJETE
                });

            }
      
            
        } 
       } else {
        console.log(this.prestationPopForm.get('montantPlafond').value, this.montantConsomme)
        if(this.montantConsomme >  this.montantPlafond1) {
          this.showToast('error', 'INFORMATION', 'Votre plafond est atteint');
          myForm.patchValue({observation: "Votre plafond est atteint"});
          myForm.patchValue({
            sort: Sort.REJETE,
            observation: "Votre plafond est atteint",
            montantRembourse: 0,
            montantSupporte: this.prestationPopForm.get('nombreActe').value *
            this.prestationPopForm.get('coutUnitaire').value
          });
        }
      }
      if(myForm.get('sort').value === Sort.ACCORDE) {
        myForm.patchValue({
          montantSupporte: this.prestationPopForm.get('baseRemboursement').value -
          this.prestationPopForm.get('montantRembourse').value
        });
        if(this.prestationPopForm.get('montantPlafond').value !== null && this.prestationPopForm.get('montantPlafond').value !== 0 ) {
          if(this.prestationPopForm.get('montantPlafond').value < this.prestationPopForm.get('coutUnitaire').value) {
             // this.prestationAdd.montantRestant = this.prestationAdd.montantRembourse - this.montantPlafond;
             myForm.patchValue({
              montantRembourse: this.prestationPopForm.get('montantPlafond').value * this.prestationPopForm.get('nombreActe').value,
              montantSupporte: this.prestationPopForm.get('baseRemboursement').value -
              this.prestationPopForm.get('montantRembourse').value
            });
             
          }
          
      }

      }

    }
  } else {
    const myForm1 = this.prestationPopForm;
    myForm1.patchValue({
      montantRembourse: 0,
      debours: this.prestationPopForm.get('nombreActe').value *
    this.prestationPopForm.get('coutUnitaire').value, baseRemboursement:
    this.prestationPopForm.get('nombreActe').value *
    this.prestationPopForm.get('coutUnitaire').value, montantSupporte: this.prestationPopForm.get('nombreActe').value *
    this.prestationPopForm.get('coutUnitaire').value});
  }
  
  }

  calculExclu() {
    if(this.prestationPopForm.get('montantExclu').value) {
        if(this.prestationPopForm.get('sort').value === Sort.ACCORDE) {
          this.prestationPopForm.get('montantRembourse').setValue(((this.prestationPopForm.get('baseRemboursement').value - this.prestationPopForm.get('montantExclu').value) *  this.prestationPopForm.get('taux').value.taux) /100);
          this.prestationPopForm.get('montantSupporte').setValue( this.prestationPopForm.get('baseRemboursement').value  - this.prestationPopForm.get('montantRembourse').value) ;
           if( this.prestationPopForm.get('montantPlafond').value  && (this.montantConsomme + this.prestationPopForm.get('montantRembourse').value) > this.prestationPopForm.get('montantPlafond').value  ) {
            console.log("============2==========");
            this.prestationPopForm.get('observation').setValue( "Remboursement favorable avec un plafond atteint. Vous avez franchi de " + (this.montantPlafond1 -(this.montantConsomme +  (this.prestationPopForm.get('baseRemboursement').value)))) ;
           
            this.prestationPopForm.get('montantRembourse').setValue( this.prestationPopForm.get('montantPlafond').value - this.montantConsomme);
            this.prestationPopForm.get('montantSupporte').setValue(this.prestationPopForm.get('baseRemboursement').value - this.prestationPopForm.get('montantRembourse').value);
            
            
        }
        }
    }
}


findTaux() {
  this.prefinancementService.findTauxSousActe(this.adherentSelected.groupe.id, this.prestationPopForm.get('sousActe').value.id, this.adherentSelected.id).subscribe((rest)=>{
    console.log("============tauuuuxxxxx==========", rest);
    this.prestationPopForm.get('taux').setValue(rest);
  });
  
}
    
  setNombreActe(data: FraisReels, ri) {
    this.prestationList[ri].nombreActe = data.cle;
  }
rechercheAdherentDateSoin(event) {
  this.prestationPopForm.get('sort').setValue("");
  this.prestationPopForm.get('observation').setValue("");
  if(this.prestationPopForm.get('dateSoins').value  && this.prestationPopForm.get('matriculeAdherent').value) {
    this.store.dispatch(featureActionAdherent.searchAdherentByDateSoinsAndMatricule({dateSoins:this.prestationPopForm.get('dateSoins').value, matricule: this.prestationPopForm.get('matriculeAdherent').value}));

  }
}
rechercherAdherentBon(event) {
  if (event.target.value !== '') {
  console.log(event.target.value);
   this.adherentSelected = null;
   this.prestationPopForm.get('nomAdherent').setValue("");
   
    this.prestationPopForm.get('numeroGroupe').setValue("");
    this.prestationPopForm.get('numeroPolice').setValue("");
    this.prestationPopForm.get('souscripteur').setValue("");
    this.prestationPopForm.get('nomGroupeAdherent').setValue("");
    
      this.prestationPopForm.get('prenomAdherent').setValue("");
 
      this.prestationPopForm.get('prenomAdherent').setValue("");
      this.prestationPopForm.get('sort').setValue("");
      this.prestationPopForm.get('observation').setValue("");
  
  this.store.dispatch(featureActionAdherent.searchAdherentByDateSoinsAndMatricule({dateSoins:this.prestationBon.dateSoins, matricule: event.target.value}));
  }
}
verifieDateSoinsBon(event){
  if( new Date(this.prestationBon.dateSoins).getTime() > new Date().getTime()) {
    this.addMessage('error', 'Date de soins invalide',
                'La date de soins ne peut pas être supérieure à celle du jour');
                //this.prestationForm.get('dateSoins').setValue("");
                this.prestationBon.dateSoins = null;
                //this.adherentSelected = null;
}
}
verifieDateSoins(event){
  if( new Date(this.prestationPopForm.get('dateSoins').value).getTime() > new Date().getTime()) {
    this.addMessage('error', 'Date de soins invalide',
                'La date de soins ne peut pas être supérieure à celle du jour');
                //this.prestationForm.get('dateSoins').setValue("");
                this.prestationPopForm.patchValue({dateSoins: null});
                //this.adherentSelected = null;
}
}

  rechercherAdherent(event) {
    if (event.target.value !== '') {
    console.log(event.target.value);
     this.adherentSelected = null;
     this.prestationPopForm.get('nomAdherent').setValue("");
     
      this.prestationPopForm.get('numeroGroupe').setValue("");
      this.prestationPopForm.get('numeroPolice').setValue("");
      this.prestationPopForm.get('souscripteur').setValue("");
      this.prestationPopForm.get('nomGroupeAdherent').setValue("");
      
        this.prestationPopForm.get('prenomAdherent').setValue("");
   
        this.prestationPopForm.get('prenomAdherent').setValue("");
        this.prestationPopForm.get('sort').setValue("");
        this.prestationPopForm.get('observation').setValue("");
    
    this.store.dispatch(featureActionAdherent.searchAdherentByDateSoinsAndMatricule({dateSoins:this.prestationPopForm.get('dateSoins').value, matricule: event.target.value}));
    }
  }

  // valider prefinancement
  validerPrefinancement() {
    console.log(this.prefinancementList);
    this.store.dispatch(featureActionPrefinancement.createPrefinancement({prefinancement: this.prefinancementList}));
    this.prefinancementList = [];
    this.prestationList = [];
    this.prestationForm.reset();
  }

  closeDialog() {
    
      this.confirmationService.confirm({
        message: 'voulez-vous valider ou fermer le préfinancement',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.prefinancementList = [];
          this.prestationForm.reset();
          this.prestation.clear();
          console.log(this.prestation);
      },
      reject:()=>{
        this.displayFormPrefinancement = true;
      }
     });
  
     
    
   
  }

  /** enregistrement cas de prefinancement */
  onCreate() {
    /** fonction pour enregistrer la prestation */ 
   console.log('creation prefinancement');
   this.prefinancementList = [];
   this.prefinancementModel = this.prestationForm.value;
   console.log("===========this.prefinancementModel1==================", this.prestationForm.value);

   this.prefinancementModel.dateSaisie = new Date();
   // this.prefinancementModel.dateSoins = 
   this.prefinancementModel.adherent = this.adherentSelected;
   this.prefinancementModel.prestation = this.prestationsList;
   if(this.prestationForm.get('id').value != null) {
    this.prefinancementModel.id = this.prestationForm.get('id').value;
   }
   console.log("===========this.prefinancementModel2==================", this.prefinancementModel);
   this.prefinancementList.push(this.prefinancementModel);
   console.log(this.prefinancementList);
   this.store.dispatch(featureActionPrefinancement.createPrefinancement({prefinancement: this.prefinancementList}));
  // this.prefinancementModel.prestation = this.prestationForm.get('itemsPrestation').value;
  console.log("===========bon==================");
  console.log(this.prefinancementModel);
   console.log("==============bon===============");
   this.prefinancementList = [];
   this.prestationsList = [];
   this.prestationForm.reset();
   //this.prestationForm.get('dateSaisie').setValue(new Date());
   this.displayFormPrefinancement = false;
   }

  // permet d'enregistrer une prestation par famille
  addPrestation(){
    this.prefinancementModel.prestation = this.prestationList;
    this.prefinancementModel.dateDeclaration = this.prestationForm.get('dateDeclaration').value;
    //this.prefinancementModel.dateSoins = this.prestationForm.get('dateSoins').value;
    this.prefinancementModel.referenceBordereau = this.prestationForm.get('referenceBordereau').value;
    this.prefinancementModel.adherent = this.adherentSelected;
    // this.prefinancementList.push(this.prefinancementModel);
    this.prestationList = [];
    this.prestationForm.reset();
  }

  compareDateSoinDateIncorporaion() {
    if( new Date(this.adherentSelected.dateIncorporation).getTime() > new Date(this.prestationForm.value.dateDeclaration).getTime()) {
            

      this.addMessage('error', 'Date de soins invalide',
                  'La date de déclaration du sinistre ne peut pas être antérieure à celle de la date d\'incorporation du sinitre');
                  this.prestationForm.get('dateDeclaration').setValue(null);
                  this.adherentSelected = null;
                  
           


  }
  }
  
  changeGarantie(garantie) {
    console.log(garantie);
    if(garantie.value?.code == "FP") {
     this.displayFP = true;
    } else {
      this.displayFP = false;
    }
    this.acteListFilter = this.acteList.filter(element => element.idTypeGarantie === garantie.value.id);
    this.findMontantTotalConsommeFamille();
  }
  changeDisplay() {
    if(this.prestationPopForm.value?.produitPharmaceutique) {
      this.displayFP = false;
      console.log("111111111111111111111111111111111", this.prestationPopForm.value?.produitPharmaceutique);
        this.produitPharmaceutiqueSelected = this.prestationPopForm.value?.produitPharmaceutique;
        this.produitPharmaceutiqueListExclu = this.prestationPopForm.value?.produitPharmaceutique;
    } else {
      if(this.prestationPopForm.value?.familleActe?.code == "FP") {
        this.displayFP = true;
      } 
    }
  }

  /* changeDisplayProduitExclu() {
    if(this.prestationPopForm.value?.produitPharmaceutique) {
      this.displayFP = false;
      console.log("3333333333333333333333333333333", this.prestationPopForm.value?.produitPharmaceutique);
        this.produitPharmaceutiqueListExclu = this.prestationPopForm.value?.produitPharmaceutique;
    } else {
      if(this.prestationPopForm.value?.familleActe?.code == "FP") {
        this.displayFP = true;
        console.log("4444444444444444444444444444", this.prestationPopForm.value?.produitPharmaceutique);
        this.produitPharmaceutiqueListExclu = this.prestationPopForm.value?.produitPharmaceutique;
      } 
    }
  } */
  
  showDialogPlafondMaximized(dialog: Dialog) {
    dialog.maximized = true;
  }
  
  newRowPrestation() {
    return {taux: this.taux};
  }

  addPrefinancement(){
    this.displayFormPrefinancement = true;
    this.prestationForm.get('dateSaisie').setValue(new Date());
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

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

  myStyle(): object {
    return {"background-color":"red"};
  } 


  addPrestation1() {
    const prestat = this.prestationPopForm.value as Prestation;
    prestat.adherent = this.adherentSelected;
    if(this.compteur !==null) {
      this.prestationsList[this.compteur] = prestat;
      this.compteur = null;
      console.log("PREST1", prestat);
    } else {
      //for(let i = 0; i < 10; i++) {
        this.prestationsList.push(prestat);
        if(this.prestationsList.length >5) {
          this.updateView();
        //}
      }
      //this.prestationsList.push(prestat);
      console.log("PREST2", prestat);
    }
   
   this.prestationPopForm.reset();
   this.displayFP =false;
   this.prestationPopForm.get('matriculeAdherent').setValue(this.adherentSelectedfinal.numero);
   this.prestationPopForm.get('nomAdherent').setValue(this.adherentSelected.nom+" "+this.adherentSelected.prenom);
    this.prestationPopForm.get('numeroGroupe').setValue(this.adherentSelected.groupe.numeroGroupe);
    this.prestationPopForm.get('numeroPolice').setValue(this.adherentSelected.groupe.police.numero);
    this.prestationPopForm.get('souscripteur').setValue(this.adherentSelected.groupe.police.nom);
    this.prestationPopForm.get('nomGroupeAdherent').setValue(this.adherentSelected.groupe.libelle);
    if (this.adherentSelected.adherentPrincipal !== null) {
      this.prestationPopForm.get('prenomAdherent').setValue(this.adherentSelected.adherentPrincipal.nom+" "+this.adherentSelected.adherentPrincipal.prenom);
  } else {
      this.prestationPopForm.get('prenomAdherent').setValue(this.adherentSelected.nom+" "+this.adherentSelected.prenom);
  }
    console.log( "999999999999999", this.prestationsList);
    
   
    
    
    
    
}
updateView() {
  this.prestationsList = [...this.prestationsList];
}
editerPrestation1(prestation: Prestation, rowIndex: number) {
  console.log("5555555555555555555555555",prestation);
  console.log("6666666666666666666666666",rowIndex);
  this.prestationPopForm = this.createItem();
  this.compteur = rowIndex;
  this.adherentSelected = prestation?.adherent;
  this.prestationPopForm.patchValue(prestation);
  this.prestationPopForm.get('nomAdherent').setValue(prestation.adherent.nom+" "+prestation.adherent.prenom);
  this.prestationPopForm.get('matriculeAdherent').setValue(prestation.adherent.numero);
  this.prestationPopForm.get('numeroGroupe').setValue(prestation.adherent.groupe.numeroGroupe);
  this.prestationPopForm.get('numeroPolice').setValue(prestation.adherent.groupe.police.numero);
  this.prestationPopForm.get('souscripteur').setValue(prestation.adherent.groupe.police.nom);
  this.prestationPopForm.get('nomGroupeAdherent').setValue(prestation.adherent.groupe.libelle);
  if (prestation.adherent.adherentPrincipal != null) {
    this.prestationPopForm.get('prenomAdherent').setValue(prestation.adherent.adherentPrincipal.nom+" "+prestation.adherent.adherentPrincipal.prenom);
} else {
    this.prestationPopForm.get('prenomAdherent').setValue(prestation.adherent.nom+" "+prestation.adherent.prenom);
  }
  this.tierPayantService.$findMontantConsomme(this.adherentSelected.id, prestation.sousActe?.id).subscribe(rest=>{

    this.montantConsomme = rest - prestation.montantRembourse ;
   
   
});
this.tierPayantService.$findMontantPlafond(this.adherentSelected.id, prestation?.acte?.id).subscribe(rest=>{

  this.montantPlafond1 = rest;
 
});
  this.findTaux();
  this.selectDateSoinsSousActe();
  this.displayPrestationpop = true;
}


fermerPrestation(){
  this.displayPrestationpop = false;
  this.prestationPopForm.reset()
}

changeType(typePaiement) {
this.typePaiementValide = false;
console.log(typePaiement);
console.log(this.typePaiementValide);
console.log(this.prestationForm.get('numeroOrange').value);
if(typePaiement == 'ORANGE_MONEY' && this.prestationForm.get('numeroOrange').value == null || typePaiement == 'ORANGE_MONEY' && this.prestationForm.get('nomBenefiniciaire').value == null) {
  this.typePaiementValide = true;
} else if ( typePaiement == 'MOOV_MONEY' && this.prestationForm.get('numeroMobicash').value == null || typePaiement == 'MOOV_MONEY' && this.prestationForm.get('nomBenefiniciaire').value == null ) {
  this.typePaiementValide = true;
} else if(typePaiement == 'VIREMENT' && this.prestationForm.get('numeroVirement').value == null) {
  this.typePaiementValide = true;
} else {
  this.typePaiementValide = false;
}
console.log(this.typePaiementValide);
}

navigateSinistre() {
  this.router.navigateByUrl('/prestation/prefinancement/valide');
}

findMontantTotalConsommeFamille() {
  if(this.adherentSelected.id  && this.adherentSelected.exercice.id && this.prestationPopForm.get('familleActe').value.id && this.adherentSelected.groupe.id) {
    this.prefinancementService.checkMontantRestantPlafond(this.adherentSelected.id, this.adherentSelected.exercice.id,  this.prestationPopForm.get('familleActe').value.id, this.adherentSelected.groupe.id).subscribe((res=>{
      this.montantReponse = res.checkMontantRestantPlafondGarantie;
      console.log("===================bien======",this.montantReponse);
      if(this.montantReponse.message != null) {
        this.showMessage = true;
      }
    }));        
    
  }
}

addProduitExclu(position: string){
  this.displayProduitExclus = true;
  this.position = position;
}

addProduitExcluToSaveList() {
  if(this.produitPharmaceutiqueListExclu){
    this.prestationPopForm.get('produitPharmaceutique').setValue(this.produitPharmaceutiqueListExclu);
    this.montantExclu1 = 0;
    for(let i = 0; i < this.produitPharmaceutiqueListExclu.length; i++) {
      this.montantExclu1 = this.montantExclu1 + this.produitPharmaceutiqueListExclu[i].prix;
    }
    this.prestationPopForm.get('montantExclu').setValue(this.montantExclu1);
    console.log("montant des produits exclus", this.prestationPopForm.get('montantExclu').value);
    console.log("montant des produits exclus1111111111", this.montantExclu1);
    console.log("apres la mise a jour des produits exclus", this.prestationPopForm.get('produitPharmaceutique').value);
  }
  this.displayProduitExclus = false;
}

}



export interface FraisReels {
  nombreActe?: number;
  coutUnitaire?: number;
  debours?: number;
  sousActe?: SousActe;
  cle?: number;
  baseRemboursement?: number;
  taux?: Taux;
  montantRembourse?: number;
  sort?: Sort;
  observation?: string;
  dateSoins?: Date;
  produitPharmaceutique: Array<ProduitPharmaceutique>;
}
