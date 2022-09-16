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
import { Operation } from 'src/app/store/comptabilite/operation/model';
import * as featureActionOperation from '../../../store/comptabilite/operation/actions';
import * as operationListSelector from '../../../store/comptabilite/operation/selector';
import * as featureActionJournal from '../../../store/comptabilite/journaux/actions';
import * as journalListSelector from '../../../store/comptabilite/journaux/selector';





@Component({
  selector: 'app-exercice-comptable-operation',
  templateUrl: './exercice-comptable-operation.component.html',
  styleUrls: ['./exercice-comptable-operation.component.scss']
})
export class ExerciceComptableOperationComponent implements OnInit, OnDestroy {
  displayOperation = false;
  displayAddOperation = false;
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

  
  
  constructor( private store: Store<AppState>,
               private confirmationService: ConfirmationService,
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
    this.operationList$ = this.store.pipe(select(operationListSelector.operationList));
    this.operationList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      
      if (value) {
        
        this.operationList = value.slice();
        
       
      }
    });
  
  }

  addOperation(exerciceComptableOperation: ExerciceComptableOperation) {
    this.exerciceComptableOperation = exerciceComptableOperation;
    this.store.dispatch(featureActionOperation.loadOperationByExerciceOperation({exerciceOperationId: exerciceComptableOperation.id}));

    this.displayOperation = true;
    this.operation.dateSaisie = new Date();
  }

  operationByJournal() {
    this.store.dispatch(featureActionExerciceComptableOperation.loadExerciceComptableOperationByJournal({journalId: this.journal.id}));

  }
  editOperation(operation: Operation) {
    this.operation = operation;
    this.operation.dateSaisie = new Date(operation.dateSaisie);
  }

  addOperation1() {
    this.displayAddOperation = true;
    this.operation.dateSaisie = new Date();
    
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

  deleteOperation(operation: Operation) {
    this.store.dispatch(featureActionOperation.deleteOperation(operation));

  }
 
    ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}
