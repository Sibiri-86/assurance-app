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





import { loadPathologie } from 'src/app/store/parametrage/pathologie/actions';

import { loadProduitPharmaceutique } from 'src/app/store/parametrage/produit-pharmaceutique/actions';
import * as produitPharmaceutiqueSelector from 'src/app/store/parametrage/produit-pharmaceutique/selector';

import { Acte } from 'src/app/store/parametrage/acte/model';
import { Garantie } from 'src/app/store/parametrage/garantie/model';
import { element } from 'protractor';
import { Prestataire } from 'src/app/store/parametrage/prestataire/model';
import { Medecin } from 'src/app/store/parametrage/medecin/model';
import { ConfirmationService, MessageService, SelectItem, TreeNode } from 'primeng/api';
import { Adherent } from 'src/app/store/contrat/adherent/model';
import * as featureActionAdherent from '../../../store/contrat/adherent/actions';
import * as adherentSelector from '../../../store/contrat/adherent/selector';
import * as remboursementSelector from '../../../store/portail/remboursemnt-initie/selector';
import * as featureActionRemboursement from '../../../store/portail/remboursemnt-initie/action';
import { BonPriseEnCharge, CheckPlafond, CheckPrefinancementResult, MontantPlafondGarantieResponse, Prefinancement, Prestation, ReponseCheckMontantRestantGarantie, TypePaiement } from 'src/app/store/prestation/prefinancement/model';
import { Status } from 'src/app/store/global-config/model';
import { status } from '../../../store/global-config/selector';
import { printPdfFile } from 'src/app/module/util/common-util';
import { TypeReport } from 'src/app/store/contrat/enum/model';
import { Report } from 'src/app/store/contrat/police/model';
import { TauxCommissionIntermediaireEffects } from 'src/app/store/parametrage/taux-commission-intermediaire/effect';
import { Pathologie } from 'src/app/store/parametrage/pathologie/model';
import { ProduitPharmaceutique } from 'src/app/store/parametrage/produit-pharmaceutique/model';
import { Dialog } from 'primeng/dialog/dialog';
import { BreadcrumbService } from 'src/app/app.breadcrumb.service';
import { TypeBon } from 'src/app/module/medical/enumeration/bon.enum';
import { ConventionService } from 'src/app/store/medical/convention/service';
import { TierPayantService } from 'src/app/store/prestation/tierPayant/service';
import { PrefinancementService } from 'src/app/store/prestation/prefinancement/service';
import { Router } from '@angular/router';
import { Sort } from '../../common/models/sort.enum';
import { takeUntil } from 'rxjs/operators';
import { Remboursement } from 'src/app/store/portail/remboursemnt-initie/model';


@Component({
  selector: 'app-remboursement-entente',
  templateUrl: './remboursement-entente.component.html',
  styleUrls: ['./remboursement-entente.component.scss']
})
export class RemboursementEntenteComponent implements OnInit, OnDestroy {
  displayFormPrefinancement = false;
 
  destroy$ = new Subject<boolean>();
  
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
  remboursementList$: Observable<Array<Remboursement>>;
  remboursementList: Array<Remboursement>;
  remboursement: Remboursement = {};
  cols: any[];
  tab: number[] = [];
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
  documents: string[];
  files: File[] = [];
  filesModife: File[] = [];
  fileTree: TreeNode[]= [];
  fiTree: TreeNode = {};
  childrenList: TreeNode[]= [];
  children: TreeNode = {};
  selectedNodes2: TreeNode[] = [];
  remboursementListTest: Array<Remboursement> =[];
  selectRemboursement: Array<Remboursement> =[]

  constructor( private store: Store<AppState>,
               private confirmationService: ConfirmationService,
               private conventionService: ConventionService,
               private tierPayantService: TierPayantService,
               private prefinancementService: PrefinancementService,
               private formBuilder: FormBuilder,  private messageService: MessageService,  private breadcrumbService: BreadcrumbService,
               private router: Router) {
                this.breadcrumbService.setItems([{ label: 'Remboursements en entente de validation' }]);
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

valider(remboursement: Remboursement) {
  remboursement.valideMedical = true;
  this.store.dispatch(featureActionRemboursement.ValiderRemboursementMedical(remboursement));
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
    this.store.dispatch(featureActionRemboursement.setReportRemboursement(null));
    this.store.pipe(select(remboursementSelector.selectByteFile)).pipe(takeUntil(this.destroy$))
    .subscribe(bytes => {
        if (bytes) {
                printPdfFile(bytes);
        }
    });

    
    // chargement des bons de prise en charge

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

   
    this.remboursementList$ = this.store.pipe(select(remboursementSelector.remboursementList));
    this.store.dispatch(featureActionRemboursement.loadRemboursementMedical());
    this.remboursementList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      console.log(value);
      if (value) {
        this.remboursementList = value.slice();
        
      }
    });

    this.statusObject$ = this.store.pipe(select(status));
    this.checkStatus();
  }


  modifier(remboursement: Remboursement) {
    this.remboursementListTest =[];
    this.fileTree =[];
    this.remboursementListTest.push(remboursement);
    for(let i= 0 ; i< this.remboursementListTest.length; i++) {
      this.fiTree.label = this.remboursementListTest[i].dateSaisie.toString();
      this.fiTree.icon = "pi pi-book"
      this.fiTree.key = i.toString();
      if(this.remboursementListTest[i].documents && this.remboursementListTest[i].documents.length>0) {
        for(let j= 0 ; j< this.remboursementListTest[i].documents.length; j++) {
          this.children.label = this.remboursementListTest[i].documents[j].nom;
          this.children.icon = "pi pi-file"
          this.fiTree.key = j.toString();
          this.children.data = this.remboursementListTest[i].documents[j].url;
          this.childrenList.push(this.children);
          this.children = {};
        }
        this.fiTree.children = this.childrenList;
        this.childrenList = [];
      }
      this.fileTree.push(this.fiTree);
      this.fiTree = {};
    }
    this.displayFormPrefinancement = true;
  }
  
  imprimer(pref: Prefinancement) {
    this.report.typeReporting = TypeReport.PREFINANCEMENT_FICHE_DETAIL_REMBOURSEMENT;
    this.report.prefinancementDto = pref;
   // this.store.dispatch(featureActionPrefinancement.FetchReportPrestation(this.report));
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
  

  onBasicUploadLot(event, form) {
    this.remboursement.files = [];
    console.log(event.files);
    if(event.files) {
     
      this.files = event.files;
      /* for(let i=0; i< event.files.length; i++) {
        this.files.push(event.files[i]);
      } */
      
      form.clear();
      
    }
    
    
   /* this.confirmationService.confirm({
      message: 'Etes vous sur d\'importer la photos des adherents par lot',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log(event.files);
        this.store.dispatch(featureActionAdherent.importPhotosAdherentLot({file:event.files, idGroupe: this.groupe.id}));
       form.clear();
      },
    }); */

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

  supprimerPrestation(file: File, i: number) {
    this.confirmationService.confirm({
      message: 'voulez-vous supprimer le fichier',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if(i>0) {
          for(let j= 0; j< i; j++) {
            this.filesModife.push(this.files[j]);
          }
          for(let j= i+1; j< this.files.length ; j++) {
            this.filesModife.push(this.files[j])
          }
  
        }else {
          for(let j= 1; j< this.files.length; j++) {
            this.filesModife.push(this.files[j]);
          }
        }
        this.files = this.filesModife;
        this.filesModife = [];
      },
    });
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
 //   this.store.dispatch(featureActionPrefinancement.createPrefinancement({prefinancement: this.prefinancementList}));
    this.prefinancementList = [];
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
 
  

  // permet d'enregistrer une prestation par famille
  addPrestation(){
    this.prefinancementModel.dateDeclaration = this.prestationForm.get('dateDeclaration').value;
    //this.prefinancementModel.dateSoins = this.prestationForm.get('dateSoins').value;
    this.prefinancementModel.referenceBordereau = this.prestationForm.get('referenceBordereau').value;
    this.prefinancementModel.adherent = this.adherentSelected;
    // this.prefinancementList.push(this.prefinancementModel);
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
    } else {
      if(this.prestationPopForm.value?.familleActe?.code == "FP") {
        this.displayFP = true;
      } 
    }
  }
  
  showDialogPlafondMaximized(dialog: Dialog) {
    dialog.maximized = true;
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
      this.prestationsList.push(prestat);
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
    console.log( this.prestationsList);
    
   
    
    
    
    
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

}


