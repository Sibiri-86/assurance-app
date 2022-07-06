import { Component, OnDestroy, OnInit } from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import { Adherent } from 'src/app/store/contrat/adherent/model';
import * as featureAction from '../../../store/contrat/exercice/actions';
import * as exerciceSelector from '../../../store/contrat/exercice/selector';
import {Observable, Subject} from 'rxjs';
import {FormBuilder, FormControl, FormGroup, Validators, } from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {AppState} from 'src/app/store/app.state';
import {BreadcrumbService} from '../../../app.breadcrumb.service';
import { Exercice } from 'src/app/store/contrat/exercice/model';
@Component({
  selector: 'app-exercice',
  templateUrl: './exercice.component.html',
  
})
export class ExerciceComponent implements OnInit, OnDestroy {
 
  destroy$ = new Subject<boolean>();
  cols: any [];
  exerciceList$: Observable<Array<Exercice>>;
  exerciceList: Array<Exercice>;
 

  constructor(private formBuilder: FormBuilder,
              private breadcrumbService: BreadcrumbService,
              private store: Store<AppState>) {
                this.breadcrumbService.setItems([{ label: 'Exercice' }]);
              }

  ngOnInit(): void {
    this.exerciceList$ = this.store.pipe(select(exerciceSelector.selectAllExerciceList));
    this.store.dispatch(featureAction.loadAllExercices());
    this.exerciceList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.exerciceList = value.slice();
      }
    });

  }

  changeStatus(exercice: Exercice) {
    console.log("====fin",exercice);
    this.store.dispatch(featureAction.cloture(exercice));
  }
  ngOnDestroy(): void{

  }


}
