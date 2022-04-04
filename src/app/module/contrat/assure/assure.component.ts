import { Component, OnDestroy, OnInit } from '@angular/core';
import {takeUntil} from "rxjs/operators";
import { Adherent } from 'src/app/store/contrat/adherent/model';
import * as featureActionAdherent from '../../../store/contrat/adherent/actions';
import * as adherentSelector from '../../../store/contrat/adherent/selector';
import * as adherantSelector from '../../../store/contrat/adherent/selector';
import {Observable, Subject} from 'rxjs';
import {FormBuilder, FormControl, FormGroup, Validators,} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {AppState} from 'src/app/store/app.state';
import {BreadcrumbService} from '../../../app.breadcrumb.service';
import {garantList} from '../../../store/contrat/garant/selector';
import { GarantList } from '../../../store/contrat/garant/model';
import { Garant } from 'src/app/store/parametrage/garant/model';
import { loadGarant } from 'src/app/store/contrat/garant/actions';
import { Police } from 'src/app/store/contrat/police/model';
import {policeList, selectByteFile} from '../../../store/contrat/police/selector';
import {loadPolice} from 'src/app/store/contrat/police/actions';
import { element } from 'protractor';
@Component({
  selector: 'app-assure',
  templateUrl: './assure.component.html',
  styleUrls: ['./assure.component.scss']
})
export class AssureComponent implements OnInit, OnDestroy {
  adherent: Adherent = {};
  adherentList$: Observable<Array<Adherent>>;
  adherentList: Array<Adherent>;
  adherentListFilter: Array<Adherent>;
  destroy$ = new Subject<boolean>();
  cols: any [];
  garantList$: Observable<Array<Garant>>;
  garantList: Array<Garant>;
  policeList$: Observable<Array<Police>>;
  policeList: Array<Police>;
  police: Police;
  garant: Garant;

  constructor(private formBuilder: FormBuilder,
              private breadcrumbService: BreadcrumbService,
              private store: Store<AppState>) {
                this.breadcrumbService.setItems([{ label: 'Assuré' }]);
              }

  ngOnInit(): void {

    this.adherentList$ = this.store.pipe(select(adherentSelector.adherentList));
    this.store.dispatch(featureActionAdherent.loadAdherentAll());
    this.adherentList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.adherentList = value.slice();
        this.adherentListFilter = this.adherentList;
        console.log(this.adherentList);
      }
    });

    this.policeList$ = this.store.pipe(select(policeList));
    this.store.dispatch(loadPolice());
    this.policeList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.policeList = value.slice();
        console.log('+++++++++++this.policeList+++++++++++++');
        console.log(this.policeList);
      }
    });

    this.garantList$ = this.store.pipe(select(garantList));
    this.store.dispatch(loadGarant());
    this.garantList$.pipe(takeUntil(this.destroy$))
              .subscribe(value => {
                if (value) {
                  this.garantList = value.slice();
                }
    });

  }

  filtrer(){
    if (this.police){
      this.adherentListFilter = this.adherentList.filter(element1 => element1.groupe.police.id === this.police.id);
    }
    if (this.garant){
      this.adherentListFilter = this.adherentList.filter(element2 => element2.groupe.police.garant.id === this.garant.id);
    }
  }

  ngOnDestroy(): void{

  }

}
