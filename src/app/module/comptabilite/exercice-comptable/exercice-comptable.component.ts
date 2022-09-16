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
import { takeUntil } from 'rxjs/operators';
import { Taux } from '../../../store/parametrage/taux/model';
import { Sort } from '../../common/models/sort.enum';
import { ConfirmationService, MenuItem, MessageService, SelectItem } from 'primeng/api';

import { BreadcrumbService } from 'src/app/app.breadcrumb.service';

import { Journaux } from 'src/app/store/comptabilite/journaux/model';
import { TypeJournauxService } from 'src/app/store/parametrage/typeJournaux/service';
import { TypeJournaux } from 'src/app/store/parametrage/typeJournaux/model';
import * as featureActionExercice from '../../../store/comptabilite/exercice-comptable/actions';
import * as exerciceListSelector from '../../../store/comptabilite/exercice-comptable/selector';

import * as featureActionTypeJournal from '../../../store/parametrage/typeJournaux/actions';
import * as typeJournauxSelector from '../../../store/parametrage/typeJournaux/selector';
import { ExerciceComptable } from 'src/app/store/comptabilite/exercice-comptable/model';




@Component({
  selector: 'app-exercice-comptable',
  templateUrl: './exercice-comptable.component.html',
  styleUrls: ['./exercice-comptable.component.scss']
})
export class ExerciceComptableComponent implements OnInit, OnDestroy {
  displayExercice = false;
  destroy$ = new Subject<boolean>();
  typeSort = Object.keys(Sort).map(key => ({ label: Sort[key], value: key }));
  cols: any[];
  tab: number[] = [];
  public defaultDate: Date;
  checkControl = true;
  test: Array<SelectItem>;
  exercice: ExerciceComptable;
  exerciceList$: Observable<Array<ExerciceComptable>>;
  exerciceList: Array<ExerciceComptable>;
 

  
  
  constructor( private store: Store<AppState>,
               private confirmationService: ConfirmationService,
               private formBuilder: FormBuilder,  private messageService: MessageService,  private breadcrumbService: BreadcrumbService) {
                this.breadcrumbService.setItems([{ label: 'Exercice comptable'}]);
   }

  
  

  
  ngOnInit(): void {
   


    this.exerciceList$ = this.store.pipe(select(exerciceListSelector.exerciceComptableList));
    this.store.dispatch(featureActionExercice.loadExerciceComptable());
    this.exerciceList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      
      if (value) {
        
        this.exerciceList = value.slice();
        
       
      }
    });

  
    this.exercice = null;
  }


  addExercice() {
    this.displayExercice = true;
    this.exercice = {};
  }
  
  onCreate() {
    this.confirmationService.confirm({
      message: 'Etes vous sur de vouloir ajouter cet exercice?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (this.exercice.id) {
          this.store.dispatch(featureActionExercice.updateExerciceComptable(this.exercice));
          this.displayExercice = false;
          this.exercice = {};
        }else{
        this.store.dispatch(featureActionExercice.createExerciceComptable(this.exercice));
        this.exercice = {};
        }
        
      }
    });
  
  }

  editExercice(exercice: ExerciceComptable) {

    this.exercice = exercice;
    this.displayExercice = true;
  }

 

  deleteExercice(exercice: ExerciceComptable) {
    this.confirmationService.confirm({
      message: 'Etes vous sur de vouloir supprimer cet exercice?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(featureActionExercice.deleteExerciceComptable(exercice));
      }
    });
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}
