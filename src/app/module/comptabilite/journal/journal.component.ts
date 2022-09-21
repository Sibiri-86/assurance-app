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
import * as featureActionJournal from '../../../store/comptabilite/journaux/actions';
import * as journauxSelector from '../../../store/comptabilite/journaux/selector';

import * as featureActionTypeJournal from '../../../store/parametrage/typeJournaux/actions';
import * as typeJournauxSelector from '../../../store/parametrage/typeJournaux/selector';
import { TypePaiement } from 'src/app/store/prestation/prefinancement/model';




@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss']
})
export class JournalComponent implements OnInit, OnDestroy {
  displayJournal = false;
  destroy$ = new Subject<boolean>();
  typeSort = Object.keys(Sort).map(key => ({ label: Sort[key], value: key }));
  cols: any[];
  tab: number[] = [];
  public defaultDate: Date;
  checkControl = true;
  test: Array<SelectItem>;
  journal: Journaux ;
  typeJournauxList: Array<TypeJournaux>;
  typeJournauxList$: Observable<Array<TypeJournaux>>;
  journauxList$: Observable<Array<Journaux>>;
  journauxList: Array<Journaux>;
  displayJournalDetail = false;
  journalDetail: Journaux= {} ;
  typePaiement = Object.keys(TypePaiement).map(key => ({ label: TypePaiement[key], value: key }));
  displayPaiement = false;
  journalPaiement: Journaux = {};

  
  
  constructor( private store: Store<AppState>,
               private confirmationService: ConfirmationService,
               private typeJournauxService: TypeJournauxService,
               private formBuilder: FormBuilder,  private messageService: MessageService,  private breadcrumbService: BreadcrumbService) {
                this.breadcrumbService.setItems([{ label: 'Journal'}]);
   }

  
  

  
  ngOnInit(): void {
   


    this.journauxList$ = this.store.pipe(select(journauxSelector.journauxList));
    this.store.dispatch(featureActionJournal.loadJournaux());
    this.journauxList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      
      if (value) {
        console.log("================================", value);
        console.log(this.journauxList);
        this.journauxList = value.slice();
        
       
      }
    });

    this.typeJournauxList$ = this.store.pipe(select(typeJournauxSelector.typeJournauxList));
    this.store.dispatch(featureActionTypeJournal.loadTypeJournaux());
    this.typeJournauxList$.pipe(takeUntil(this.destroy$)).subscribe((value1) => {
      
      if (value1) {
        
        this.typeJournauxList = value1.slice();
       
      }
    });
    this.journal = null;
  }

  relierJournal(journal: Journaux) {
    this.displayPaiement = true;
    this.journalPaiement = journal;
  }
  onCreatePaiement() {
    this.store.dispatch(featureActionJournal.createJournaux(this.journalPaiement));
    this.displayPaiement = false;
    this.journalPaiement = {};
  }

  addJournal() {
    this.displayJournal = true;
    this.journal = {};
    this.journal.dateSaisie = new Date();
  }
  
  onCreate() {
    this.confirmationService.confirm({
      message: 'Etes vous sur de vouloir ajouter ce journal?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (this.journal.id) {
          this.store.dispatch(featureActionJournal.updateJournaux(this.journal));
          this.displayJournal = false;
          this.journal = {};
        }else{
        this.store.dispatch(featureActionJournal.createJournaux(this.journal));
        this.journal = {};
        }
        
      }
    });
  
  }

  editJournal(journal: Journaux) {
    console.log(journal);
    this.journal = journal;
    this.journal.typeJournaux = this.typeJournauxList.find(type=>type.id === journal.typeJournaux.id);
    this.displayJournal = true;
  }

  voirJournal(journal: Journaux) {

    this.journalDetail = journal;
    this.displayJournalDetail = true;
  }

  deleteJournal(journal: Journaux) {
    this.confirmationService.confirm({
      message: 'Etes vous sur de vouloir supprimer ce journal?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(featureActionJournal.deleteJournaux(journal));
      }
    });
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}
