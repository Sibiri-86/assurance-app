import { Component, LOCALE_ID, OnDestroy, OnInit } from '@angular/core';
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
import { takeUntil } from 'rxjs/operators';

import { ConfirmationService, MenuItem, MessageService, SelectItem } from 'primeng/api';

import { BreadcrumbService } from 'src/app/app.breadcrumb.service';

import { Journaux } from 'src/app/store/comptabilite/journaux/model';
import { TypeJournauxService } from 'src/app/store/parametrage/typeJournaux/service';
import { TypeJournaux } from 'src/app/store/parametrage/typeJournaux/model';
import * as featureActionExerciceComptableOperation from 'src/app/store/comptabilite/exercice-comptable-operation/actions';
import * as exerciceComptableOperationListSelector from 'src/app/store/comptabilite/exercice-comptable-operation/selector';
import { ExerciceComptableOperation } from 'src/app/store/comptabilite/exercice-comptable-operation/model';
import { Operation, OperationList } from 'src/app/store/comptabilite/operation/model';
import * as featureActionOperation from 'src/app/store/comptabilite/operation/actions';
import * as operationListSelector from 'src/app/store/comptabilite/operation/selector';
import * as featureActionJournal from 'src/app/store/comptabilite/journaux/actions';
import * as journalListSelector from 'src/app/store/comptabilite/journaux/selector';
import { OperationService } from 'src/app/store/comptabilite/operation/service';
import { Compte } from 'src/app/store/comptabilite/compte/model';
import { CompteService } from 'src/app/store/comptabilite/compte/service';
import { ExerciceComptableOperationService } from 'src/app/store/comptabilite/exercice-comptable-operation/service';
import { Police, Report } from 'src/app/store/contrat/police/model';
import { TypeReport } from 'src/app/store/contrat/enum/model';
import { printExcelfFile, printPdfFile } from '../../util/common-util';
import * as featureActionExercice from 'src/app/store/comptabilite/exercice-comptable/actions';
import * as exerciceListSelector from 'src/app/store/comptabilite/exercice-comptable/selector';
import { ExerciceComptable } from 'src/app/store/comptabilite/exercice-comptable/model';
import * as featureActioncompte from 'src/app/store/comptabilite/compte/actions';
import * as compteSelector from 'src/app/store/comptabilite/compte/selector';
import { Bilan, Check, DepenseFamille } from 'src/app/store/reporting/depense-famille/model';
import { Garant } from 'src/app/store/parametrage/garant/model';
import { Adherent } from 'src/app/store/contrat/adherent/model';
import * as featureActionGarant from 'src/app/store/contrat/garant/actions';
import * as garantListSelector from 'src/app/store/contrat/garant/selector';
import * as featureActionPolice from 'src/app/store/contrat/police/actions';
import * as policeListSelector from 'src/app/store/contrat/police/selector';
import * as featureActionAdherent from 'src/app/store/contrat/adherent/actions';
import * as adherentListSelector from 'src/app/store/contrat/adherent/selector';
import * as featureActionDepense from 'src/app/store/reporting/depense-famille/action';
import * as depenseListSelector from 'src/app/store/reporting/depense-famille/selector';
import { DepenseFamilleService } from 'src/app/store/reporting/depense-famille/service';
import * as groupeSlector from 'src/app/store/contrat/groupe/selector';
import * as groupefeatureAction from 'src/app/store/contrat/groupe/actions';
import { Groupe } from 'src/app/store/contrat/groupe/model';
import { User } from 'src/app/store/contrat/exercice/model';
import { ExerciceService } from 'src/app/store/contrat/exercice/service';
import { KeycloakService } from 'keycloak-angular';
import { environment } from 'src/environments/environment';
import * as Keycloak from 'keycloak-js';
import { Sort } from '../../common/models/sort.enum';
import { EtatFinancier } from '../../common/models/etat-financier.enum';
//import KeycloakAdminClient from '@keycloak/keycloak-admin-client';




@Component({
  selector: 'app-bilan',
  templateUrl: './bilan.component.html',
  styleUrls: ['./bilan.component.scss']
})
export class BilanComponent implements OnInit, OnDestroy {
  displayOperation = false;
  displayAddOperation = false;
  displayAddOperationListe = false;
  destroy$ = new Subject<boolean>();
  cols: any[];
  tab: number[] = [];
  public defaultDate: Date;
  checkControl = true;
  test: Array<SelectItem>;

  exerciceComptableOperationList$: Observable<Array<ExerciceComptableOperation>>;
  exerciceComptableOperationList: Array<ExerciceComptableOperation>;
  operationList:Array<Operation> = [];
  operationList$: Observable<Array<Operation>>;
  operation: Operation = {};
  exerciceComptableOperation: ExerciceComptableOperation = {};
  journalList:Array<Journaux> = [];
  journalList$: Observable<Array<Journaux>>;
  journal: Journaux ;
  operationAddList:Array<Operation> = [];
  debit: number = 0;
  debitAvant: number = 0;
  credit: number = 0;
  creditAvant: number = 0;
  index: number = null;
  compteSelected: Compte = {};
  CompteAuxiliaireSelecte: Compte = {};
  verificationDebitCredit: string = "1";
  operationSelected: Operation = {};
  report: Report = {};
  exerciceList$: Observable<Array<ExerciceComptable>>;
  exerciceList: Array<ExerciceComptable>;
  exerciceActif: ExerciceComptable = {};
  compteList$: Observable<Array<Compte>>;
  compteList: Array<Compte>;
  check: Check = {};
  garantList:Array<Garant> = [];
  garantList$: Observable<Array<Garant>>;
  policeList:Array<Police> = [];
  policeList$: Observable<Array<Garant>>;
  adherentList:Array<Adherent> = [];
  adherentList$: Observable<Array<Adherent>>;
  depenseFamilleList:Array<DepenseFamille> = [];
  depenseFamilleList$: Observable<Array<DepenseFamille>>;
  display = false;
  displayExcel = false;
  groupeListes: Array<Groupe>;
  groupeList$: Observable<Array<Groupe>>;
  user: User = {};
  displayuser = false;
  dysplayGarant = false;
  bilanForm: FormGroup;
  exerciceComptable: ExerciceComptable = {};
  bilan : Bilan = {};
  typeEtatFinanciers = Object.keys(EtatFinancier).map(key => ({label: EtatFinancier[key], value: key}));

  
  constructor( private store: Store<AppState>,
               private confirmationService: ConfirmationService,
               private operationService: OperationService,
               private compteService: CompteService,
               private exerciceService: ExerciceService,
               private keycloakService: KeycloakService,
               private depenseService: DepenseFamilleService,
               private exerciceOperationService: ExerciceComptableOperationService,
               private formBuilder: FormBuilder,  private messageService: MessageService,  private breadcrumbService: BreadcrumbService) {
                this.breadcrumbService.setItems([{ label: 'Etats financiers'}]);
   }

  
  

  
  ngOnInit(): void {
    this.bilanForm = this.formBuilder.group({
      id: new FormControl(''),
      exerciceComptable: new FormControl('',[Validators.required]),
      typeEtat: new FormControl('',[Validators.required])
    });
    
    this.exerciceComptableOperationList = [];

    this.garantList$ = this.store.pipe(select(garantListSelector.garantList));
    this.store.dispatch(featureActionGarant.loadGarant());
    this.garantList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      
      if (value) {
        this.keycloakService.loadUserProfile().then(profile => {
         
          if(profile['attributes']) {
                this.garantList = value.slice().filter(garant=>garant.code === profile.username.toLocaleUpperCase());
                if(this.garantList) {
                  this.check.garant = this.garantList[0];
                  //this.loadPoliceByGarant();
                }
                
          } else {
            this.garantList = value.slice();
          }
          
         });
        
        
       
      }
    });

    this.groupeList$ = this.store.pipe(select(groupeSlector.groupeList));
        
        this.groupeList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
            if (value) {
                this.groupeListes = value.slice();
                console.log(this.groupeListes);
            }
        });
    this.depenseFamilleList$ = this.store.pipe(select(depenseListSelector.depenseFamilleList));
    this.depenseFamilleList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      
      if (value) {
        this.depenseFamilleList = value.slice();
        console.log("========================bien===",this.depenseFamilleList);

        
       
      }
    });

    this.store.dispatch(featureActionDepense.setReportDepenseFamille(null));
    this.store.pipe(select(depenseListSelector.selectByteFile)).pipe(takeUntil(this.destroy$))
    .subscribe(bytes => {
        if (bytes) {

          console.log("========================bytes===",bytes);
          printExcelfFile(bytes);
          /* if(this.displayExcel) {
            printExcelfFile(bytes);
            this.displayExcel = false;
          } else {
            printPdfFile(bytes);
          } */
                
        }
    });

    

    this.policeList$ = this.store.pipe(select(policeListSelector.policeList));
    this.policeList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      
      if (value) {
        
        this.policeList = value.slice();
        
       
      }
    }); 

    this.adherentList$ = this.store.pipe(select(adherentListSelector.adherentList));
    this.adherentList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      
      if (value) {
        
        this.adherentList = value.slice();
        this.adherentList.forEach(ad=>{
          ad.nom = ad.nom.concat("/").concat(ad.prenom);
        })
        
       
      }
    });
    this.exerciceList$= this.store.pipe(select(exerciceListSelector.exerciceComptableList));
    this.store.dispatch(featureActionExercice.loadExerciceComptable());
    this.exerciceList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      
      if (value) {
        
        this.exerciceList = value.slice();
        this.exerciceActif = this.exerciceList.find(exercice=>exercice.actived === true);
        
       
      }
    });
    this.operationList$ = this.store.pipe(select(operationListSelector.operationArreterList));
    this.operationList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      
      if (value) {
        
        this.operationList = value.slice();
        this.operationSelected  = this.operationList[this.operationList.length -1]
        
       
      }
    });
  
  }

  /* loadPoliceByGarant() {
       this.store.dispatch(featureActionPolice.getPoliceByGarant({garantId: this.check.garant.id}));

  } */
  loadAdherentByGroupe(){
  this.store.dispatch(featureActionAdherent.loadAdherentDistinctGroupe({idGarantie: this.check.garant.id, idPolice: this.check.police.id, idGroupe: this.check.groupe.id}));

}
  viderDebit() {
    this.operation.montantDebit = null;
  }
  viderCredit() {
    this.operation.montantCredit = null;
  }

  findCompte1() {
    this.compteService.findCompteByNumero(this.operation.numCompte).subscribe((rest)=>{
      if(rest) {
      
        this.operation.compte =rest;
        console.log(this.operation.compte);
      }
     
    });
  }
  findExerciceOperationAjour() {
    this.exerciceOperationService.$getExerciceComptableOperationMisaJous(this.exerciceComptableOperation.id).subscribe((rest)=>{
      if(rest) {
        this.exerciceComptableOperation = rest;
      }
      
    });
  }
  findCompteAuxiliaire() {
    this.compteService.findCompteByNumero(this.operation.numCompteAuxi).subscribe((res)=>{
      if(res) {
      
        this.operation.compteSelected =res;
      }
     
    });
  }
  onAdd() { 
    this.displayAddOperationListe = true;
    this.findExerciceOperationAjour();
  }
  addOperation(exerciceComptableOperation: ExerciceComptableOperation) {
    this.exerciceComptableOperation = exerciceComptableOperation;
    this.store.dispatch(featureActionOperation.loadOperationByExerciceOperation({exerciceOperationId: exerciceComptableOperation.id}));

    this.displayOperation = true;
    this.operation.dateSaisie = new Date();
  //  this.findExerciceOperationAjour();
  }

  imprimer() {
    
    this.report.typeReporting = TypeReport.GRAND_LIVRE_GENERAL;
    this.report.operation = this.operation;
    this.store.dispatch(featureActionOperation.FetchReport(this.report));
  }
  operationByJournal() {
    this.store.dispatch(featureActionExerciceComptableOperation.loadExerciceComptableOperationByJournal({journalId: this.journal.id}));

  }
  editOperation(operation: Operation) {
    this.operation = operation;
    this.operation.dateSaisie = new Date(operation.dateSaisie);
  }

  addMessage(severite: string, resume: string, detaile: string): void {
    this.messageService.add({severity: severite, summary: resume, detail: detaile});
  }

  verifieDate1() {
    console.log("=====bien======="+new Date(this.operation.dateSaisie).getFullYear());
    if(this.operation.dateSaisie) {
      
      if(this.exerciceActif.annee != new Date(this.operation.dateSaisie).getFullYear()) {
        console.log("============");
        this.addMessage('error', 'Date  invalide',
                'Veuillez choisir une date valide de l\'année  '.concat(this.exerciceActif.annee.toString()));
        this.operation.dateSaisie = null;
      }
    }
  }

  verifieDate2() {
    if(this.operation.dateFin) {
      
      if(this.exerciceActif.annee != new Date(this.operation.dateFin).getFullYear()) {
        console.log("============");
        this.addMessage('error', 'Date  invalide',
                'Veuillez choisir une date valide de l\'année  '.concat(this.exerciceActif.annee.toString()));
        this.operation.dateFin = null;
      }
    }
  }

  addOperation1() {
    this.displayAddOperation = true;
    this.operation.dateSaisie = new Date();
    
  }

  addOperationList() {
    this.operation.exerciceComptableOperation = this.exerciceComptableOperation;
    if(this.index !== null) {
      if(this.operationAddList[this.index].montantCredit) {
        console.log(this.credit);
        this.credit = this.credit - this.creditAvant;
        console.log(this.credit);
        if(this.operation.montantCredit) {
          this.credit = this.credit + this.operation.montantCredit;
        }
      }

      if(this.operationAddList[this.index].montantDebit) {
        console.log(this.debit);
       this.debit = this.debit - this.debitAvant;
        console.log(this.debit);
        if(this.operation.montantDebit) {
          this.debit = this.debit + this.operation.montantDebit;
        }
      }
      this.operationAddList[this.index] = this.operation;
    }
    
    
    if(this.index === null){
      if(this.operation.montantDebit) {
        this.debit = this.debit + this.operation.montantDebit;
      }
      if(this.operation.montantCredit) {
        this.credit = this.credit + this.operation.montantCredit;
      }
      this.operationAddList.push(this.operation);
    }
    
    this.operation = {};
    this.creditAvant = 0;
    this.debitAvant = 0;
    this.index = null;
    this.operation.dateSaisie = new Date();
    console.log(this.debit);
    console.log(this.credit);
  }

  editOperationList(operation: Operation, index: number) {
    this.index = index;
    if(operation.montantDebit) {
      this.debitAvant = operation.montantDebit;
    }
    
    if(operation.montantCredit) {
      this.creditAvant = operation.montantCredit;
    }
    
    this.operation = operation;
    this.operation.dateSaisie = new Date(operation.dateSaisie);
  }

  deleteOperationList(operation: Operation, index: number) {
    if(operation.montantDebit) {
      this.debit =this.debit - operation.montantDebit;
    }
    
    if(operation.montantCredit) {
      this.credit =this.credit - operation.montantCredit;
    }
    this.operationAddList = this.operationAddList.filter(oper=>oper !== operation);
  }
  onCreateOperation() {
    console.log(this.operation);
    this.operation.exerciceComptableOperation = this.exerciceComptableOperation;
    if (this.operation.id) {
      this.store.dispatch(featureActionOperation.updateOperation(this.operation));
    
      this.operation = {};
    }else{
    this.store.dispatch(featureActionOperation.createOperation(this.operation));
    this.operation = {};
    }
    
    this.operation.dateSaisie = new Date();
  
  }
  closeDialog() {
    this.display = false;
    this.check = {};
   }
   imprimerFormulaire() {
    this.display = true;
  }

  imprimerFormulaireExcel() {
    this.display = true;
    this.displayExcel = true;
  }
  loadGroupeByPolice(){
    this.store.dispatch(groupefeatureAction.loadGroupe({policeId: this.check.police.id}));
  }

  findOperationGrandLivre() {
    console.log("======================", this.bilanForm.get('typeEtat').value);
    console.log("======================", this.bilanForm.get('exerciceComptable').value.annee);
    if(this.bilanForm.get('typeEtat').value === EtatFinancier.BILAN) {
      this.store.dispatch(featureActionDepense.FetchReportBilan(this.bilanForm.get('exerciceComptable').value));

    }

    if(this.bilanForm.get('typeEtat').value === EtatFinancier.COMPTERESULTAT) {

      this.report.typeReporting = TypeReport.COMPTE_RESULTAT;
      this.report.annee = this.bilanForm.get('exerciceComptable').value;
      this.store.dispatch(featureActionDepense.FetchReportDepenseFamille(this.report));

    }


    

    this.displayExcel= false;
    //this.store.dispatch(featureActionDepense.updateDepenseFamille(this.check));

  }
  getExercice() { 
    if(this.bilanForm.get('exerciceComptable').value) {
      this.bilan = {};
      this.bilan.exerciceComptable = this.bilanForm.get('exerciceComptable').value;
      console.log("jkdsncjfkbvfjkfjnf", this.bilanForm.get('exerciceComptable').value);
      console.log("jkdsncjfkbvfjkfjnf", this.bilan.exerciceComptable);
    }
  }

  

  onCreateOperationList() {
    //console.log(this.operationAddList);
    this.operationService.posOperationList(this.operationAddList).subscribe((rest)=>{
      this.store.dispatch(featureActionOperation.loadOperationByExerciceOperation({exerciceOperationId: this.exerciceComptableOperation.id}));
      
    });
    this.displayAddOperationListe = false;
    this.operationAddList = [];
    this.credit = 0;
    this.debit = 0;
  }

  onFermer() {
    this.displayAddOperationListe = false;
    this.operationAddList = [];


  }

  deleteOperation(operation: Operation) {
    this.store.dispatch(featureActionOperation.deleteOperation(operation));

  }

  annuleaddOperation() {
    this.operation = {};
    this.operation.dateSaisie = new Date();
  }
 
    ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}
