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
import { Taux } from '../../../store/parametrage/taux/model';
import { Sort } from '../../common/models/sort.enum';
import { ConfirmationService, MenuItem, MessageService, SelectItem } from 'primeng/api';

import { BreadcrumbService } from 'src/app/app.breadcrumb.service';

import { Journaux } from 'src/app/store/comptabilite/journaux/model';
import { TypeJournauxService } from 'src/app/store/parametrage/typeJournaux/service';
import { TypeJournaux } from 'src/app/store/parametrage/typeJournaux/model';
import * as featureActionExerciceComptableOperation from '../../../store/comptabilite/exercice-comptable-operation/actions';
import * as exerciceComptableOperationListSelector from '../../../store/comptabilite/exercice-comptable-operation/selector';
import { ExerciceComptableOperation } from 'src/app/store/comptabilite/exercice-comptable-operation/model';
import { Operation, OperationList } from 'src/app/store/comptabilite/operation/model';
import * as featureActionOperation from '../../../store/comptabilite/operation/actions';
import * as operationListSelector from '../../../store/comptabilite/operation/selector';
import * as featureActionJournal from '../../../store/comptabilite/journaux/actions';
import * as journalListSelector from '../../../store/comptabilite/journaux/selector';
import { OperationService } from 'src/app/store/comptabilite/operation/service';
import { Compte } from 'src/app/store/comptabilite/compte/model';
import { CompteService } from 'src/app/store/comptabilite/compte/service';
import { ExerciceComptableOperationService } from 'src/app/store/comptabilite/exercice-comptable-operation/service';
import { Report } from 'src/app/store/contrat/police/model';
import { TypeReport } from 'src/app/store/contrat/enum/model';
import { printPdfFile } from '../../util/common-util';
import * as featureActionExercice from '../../../store/comptabilite/exercice-comptable/actions';
import * as exerciceListSelector from '../../../store/comptabilite/exercice-comptable/selector';
import { ExerciceComptable } from 'src/app/store/comptabilite/exercice-comptable/model';
import * as featureActioncompte from '../../../store/comptabilite/compte/actions';
import * as compteSelector from '../../../store/comptabilite/compte/selector';



@Component({
  selector: 'app-grand-livre-general',
  templateUrl: './grand-livre-general.component.html',
  styleUrls: ['./grand-livre-general.component.scss']
})
export class GrandLivreGeneralComponent implements OnInit, OnDestroy {
  displayOperation = false;
  displayAddOperation = false;
  displayAddOperationListe = false;
  destroy$ = new Subject<boolean>();
  typeSort = Object.keys(Sort).map(key => ({ label: Sort[key], value: key }));
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
  
  constructor( private store: Store<AppState>,
               private confirmationService: ConfirmationService,
               private operationService: OperationService,
               private compteService: CompteService,
               private exerciceOperationService: ExerciceComptableOperationService,
               private formBuilder: FormBuilder,  private messageService: MessageService,  private breadcrumbService: BreadcrumbService) {
                this.breadcrumbService.setItems([{ label: 'Grand livre'}]);
   }

  
  

  
  ngOnInit(): void {
   
    this.exerciceComptableOperationList = [];

    this.exerciceComptableOperationList$ = this.store.pipe(select(exerciceComptableOperationListSelector.exerciceComptableOperationList));
    this.exerciceComptableOperationList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      
      if (value) {
        
        this.exerciceComptableOperationList = value.slice();
        
       
      }
    });

    this.store.dispatch(featureActionOperation.setReportArrete(null));
    this.store.pipe(select(operationListSelector.selectByteFile)).pipe(takeUntil(this.destroy$))
    .subscribe(bytes => {
        if (bytes) {
                printPdfFile(bytes);
        }
    });

    this.compteList$ = this.store.pipe(select(compteSelector.compteList));
    this.store.dispatch(featureActioncompte.loadCompteNoRacine());
    this.compteList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      
      if (value) {
        
        this.compteList = value.slice();
        
       
      }
    }); 
    this.journal = null;

    this.journalList$ = this.store.pipe(select(journalListSelector.journauxList));
    this.store.dispatch(featureActionJournal.loadJournaux());
    this.journalList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      
      if (value) {
        
        this.journalList = value.slice();
        
       
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
  findOperationGrandLivre() {
   
    this.store.dispatch(featureActionOperation.findOperationGrandLivre(this.operation));
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
