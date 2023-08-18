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
import { ExerciceComptableOperation, OperationSoldeAnterieur } from 'src/app/store/comptabilite/exercice-comptable-operation/model';
import { Operation, OperationLeutree, OperationList } from 'src/app/store/comptabilite/operation/model';
import * as featureActionOperation from '../../../store/comptabilite/operation/actions';
import * as operationListSelector from '../../../store/comptabilite/operation/selector';
import * as featureActionJournal from '../../../store/comptabilite/journaux/actions';
import * as journalListSelector from '../../../store/comptabilite/journaux/selector';
import { OperationService } from 'src/app/store/comptabilite/operation/service';
import { Compte } from 'src/app/store/comptabilite/compte/model';
import { CompteService } from 'src/app/store/comptabilite/compte/service';
import { ExerciceComptableOperationService } from 'src/app/store/comptabilite/exercice-comptable-operation/service';
import { TiersService } from 'src/app/store/comptabilite/tiers/service';
import { Tiers } from 'src/app/store/comptabilite/tiers/model';
import * as featureActioncompte from '../../../store/comptabilite/compte/actions';
import * as compteSelector from '../../../store/comptabilite/compte/selector';
import * as featureActiontiers from '../../../store/comptabilite/tiers/actions';
import * as tiersSelector from '../../../store/comptabilite/tiers/selector';
import { ExerciceComptable } from 'src/app/store/comptabilite/exercice-comptable/model';
import { ExerciceComptableService } from 'src/app/store/comptabilite/exercice-comptable/service';





@Component({
  selector: 'app-exercice-comptable-operation',
  templateUrl: './exercice-comptable-operation.component.html',
  styleUrls: ['./exercice-comptable-operation.component.scss']
})
export class ExerciceComptableOperationComponent implements OnInit, OnDestroy {
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
  operationLeutreeList:Array<OperationLeutree> = [];
  operationLeutreeList$: Observable<Array<OperationLeutree>>;
  operation: Operation = {};
  operation1: Operation = {};
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
  displaCompte = false;
  tierList$: Observable<Array<Tiers>>;
  tierList: Array<Tiers>;
  compteList$: Observable<Array<Compte>>;
  compteList: Array<Compte>;
  exercice: ExerciceComptable = {};
  operationSoldeAnterieur: OperationSoldeAnterieur = {};
  isClasse5 =  false;

  
  
  constructor( private store: Store<AppState>,
               private confirmationService: ConfirmationService,
               private operationService: OperationService,
               private compteService: CompteService,
               private exerciceOperationService: ExerciceComptableOperationService,
               private exerciceComptableService: ExerciceComptableService,
               private tierDService: TiersService,
               private formBuilder: FormBuilder,  private messageService: MessageService,  private breadcrumbService: BreadcrumbService) {
                this.breadcrumbService.setItems([{ label: 'Opération'}]);
   }

  
  

  
  ngOnInit(): void {
   
    this.exerciceComptableOperationList = [];

    this.exerciceComptableOperationList$ = this.store.pipe(select(exerciceComptableOperationListSelector.exerciceComptableOperationList));
    this.exerciceComptableOperationList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      
      if (value) {
        
        this.exerciceComptableOperationList = value.slice();
        
       
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

    this.tierList$ = this.store.pipe(select(tiersSelector.tiersList));
   // this.store.dispatch(featureActiontiers.loadTiers());
   this.store.dispatch(featureActiontiers.loadTiersByCompteCollectif({compte: null}));
    this.tierList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      
      if (value) {
        
        this.tierList = value.slice();
        console.log("this.tierListtttttttttttttt", this.tierList);
       
      }
    });

    this.compteList$ = this.store.pipe(select(compteSelector.compteList));
    this.store.dispatch(featureActioncompte.loadCompteNoRacine());
    this.compteList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      
      if (value) {
        
        this.compteList = value.slice();
        
       
      }
    }); 
    this.operationList$ = this.store.pipe(select(operationListSelector.operationList));
    this.operationList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      
      if (value) {
        
        this.operationList = value.slice();
        
       
      }
    });

    this.operationLeutreeList$ = this.store.pipe(select(operationListSelector.operationLeutreeList));
    this.operationLeutreeList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      
      if (value) {
        
        this.operationLeutreeList = value.slice();
        
       
      }
    });
  
  }


  findTier() {
    if(this.operation.compte) {
      this.store.dispatch(featureActiontiers.loadTiersByCompteCollectif({compte: this.operation.compte.id}));
    }
  }
  viderDebit() {
    this.operation.montantDebit = null;
  }
  viderCredit() {
    this.operation.montantCredit = null;
  }

 
  findExerciceOperationAjour() {
    this.exerciceOperationService.$getExerciceComptableOperationMisaJous(this.exerciceComptableOperation.id).subscribe((rest)=>{
      if(rest) {
        this.exerciceComptableOperation = rest;
        
      }
      
    });
  }
 
  onAdd() { 
    this.displayAddOperationListe = true;
    this.findExerciceOperationAjour();
  }
  addOperation(exerciceComptableOperation: ExerciceComptableOperation) {
    this.exerciceComptableOperation = exerciceComptableOperation;
    this.exerciceComptableService.findExerciceComptableActif(exerciceComptableOperation?.exercice).subscribe((res)=>{
      if(res) {
        console.log("==================",res);
        this.exercice = res;
      }
      
    });
    
    this.store.dispatch(featureActionOperation.loadOperationByExerciceOperation({exerciceOperationId: exerciceComptableOperation.id}));
    this.store.dispatch(featureActionOperation.loadOperationByExerciceOperationLeutree({exerciceOperationId: exerciceComptableOperation.id}));
    console.log("=========1========= ",this.exerciceComptableOperationList[0].isPartie, "=========2========= ",exerciceComptableOperation.id);
    this.isClasse5 = false;
    if(this.exerciceComptableOperationList[0].isPartie) {
      this.isClasse5 = true;
      this.store.dispatch(featureActionOperation.loadOperationByExerciceOperationLeutree({exerciceOperationId: exerciceComptableOperation.id}));
      console.log("========operationLeutreeList==========",this.operationLeutreeList);
      this.operationService.$getSoldeAnterieurByMonth(exerciceComptableOperation.id, this.exerciceComptableOperationList[0].isPartie).subscribe((res)=>{
        if(res) {
          console.log("==================",res);
          this.operationSoldeAnterieur = res;
        }
  
      });
    }
    

    this.displayOperation = true;
    this.operation.dateSaisieJour = new Date();
  //  this.findExerciceOperationAjour();
  }

  operationByJournal() {
    this.store.dispatch(featureActionExerciceComptableOperation.loadExerciceComptableOperationByJournal({journalId: this.journal.id}));
   
    

  }
  editOperation(operation: Operation) {
    this.operation = operation;
    this.operation.dateSaisieJour = new Date(operation.dateSaisieJour);
  }

  addOperation1() {
    this.displayAddOperation = true;
    this.operation.dateSaisieJour = new Date();
    
  }
  addMessage(severite: string, resume: string, detaile: string): void {
    this.messageService.add({severity: severite, summary: resume, detail: detaile});
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
    this.operation1 =this.operation; 
    this.operation = {};
    this.creditAvant = 0;
    this.debitAvant = 0;
    this.index = null;
    this.operation.dateSaisieJour = new Date();
    this.operation.dateSaisie = this.operation1.dateSaisie;
    this.operation.reference = this.operation1?.reference;
    this.operation.numFacture = this.operation1?.numFacture;
    this.operation.libelle = this.operation1?.libelle;
    if(this.exerciceComptableOperation?.journaux?.compte) {
      if(this.operation1.compte.id !== this.exerciceComptableOperation.journaux.compte.id) {
        this.operation.compte = this.compteList.find(compte=>compte.id === this.exerciceComptableOperation.journaux.compte.id);
        if(this.operation1.montantCredit) {
          this.operation.montantDebit = this.operation1.montantCredit;
        }
       
        if(this.operation1.montantDebit) {
          this.operation.montantCredit = this.operation1.montantDebit;
        }
      }
    }
   

    console.log(this.debit);
    console.log(this.credit);
  }
  verifieDate() {
    console.log("=====bien=======");
    if(this.operation.dateSaisie) {
      
      if(!(new Date(this.operation.dateSaisie).getTime() >= new Date(this.exerciceComptableOperation.dateDebut).getTime() &&
      new Date(this.operation.dateSaisie).getTime() <= new Date(this.exerciceComptableOperation.dateFin).getTime())) {
        console.log("============");
        this.addMessage('error', 'Date de pièce invalide',
                'Veuillez choisir une date de la pièce valide du mois de '.concat(' ').concat(this.exerciceComptableOperation.mois));
        this.operation.dateSaisie = null;
      }
    }
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
    this.operation.dateSaisieJour = new Date(operation.dateSaisieJour);
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
    
    this.operation.dateSaisieJour = new Date();
  
  }

  onCreateOperationList() {
    //console.log(this.operationAddList);
    this.operationService.posOperationList(this.operationAddList).subscribe((rest)=>{
      this.store.dispatch(featureActionOperation.loadOperationByExerciceOperation({exerciceOperationId: this.exerciceComptableOperation.id}));
      
    });
    this.displayAddOperationListe = false;
    this.operationAddList = [];
    this.operation1={};
    this.operation={};
    this.credit = 0;
    this.debit = 0;
    this.operation1 = {};
    this.operation.dateSaisieJour = new Date();
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
    this.operation.dateSaisieJour = new Date();
  }
 
    ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}
