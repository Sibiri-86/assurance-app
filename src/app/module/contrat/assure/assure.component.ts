import { Component, OnDestroy, OnInit } from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import { Adherent } from 'src/app/store/contrat/adherent/model';
import * as featureActionAdherent from '../../../store/contrat/adherent/actions';
import * as adherentSelector from '../../../store/contrat/adherent/selector';
import * as adherantSelector from '../../../store/contrat/adherent/selector';
import {Observable, Subject} from 'rxjs';
import {FormBuilder, FormControl, FormGroup, Validators, } from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {AppState} from 'src/app/store/app.state';
import {BreadcrumbService} from '../../../app.breadcrumb.service';
import {garantList} from '../../../store/contrat/garant/selector';
import { GarantList } from '../../../store/contrat/garant/model';
import { Garant } from 'src/app/store/parametrage/garant/model';
import { loadGarant } from 'src/app/store/contrat/garant/actions';
import { Police } from 'src/app/store/contrat/police/model';
import {policeList, selectByteFile} from '../../../store/contrat/police/selector';
import {loadPolice, loadPoliceAll} from 'src/app/store/contrat/police/actions';
import { element } from 'protractor';
import { AdherentService } from 'src/app/store/contrat/adherent/service';
import { Exercice } from 'src/app/store/contrat/exercice/model';
import { MessageService } from 'primeng/api';
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
  police: Police = {};
  garant: Garant;
  infosAdherent: boolean = false;
  displayPhotos: Boolean = false;
  pictureUrl='';
  exerciceList : Exercice[];
  exercice : Exercice = {};

  constructor(private formBuilder: FormBuilder,
              private breadcrumbService: BreadcrumbService,
              private store: Store<AppState>,
              private adherentService: AdherentService,
              private messageService: MessageService,) {
                this.breadcrumbService.setItems([{ label: 'Assuré' }]);
              }

  ngOnInit(): void {
    this.adherentList$ = this.store.pipe(select(adherentSelector.adherentList));
    //this.store.dispatch(featureActionAdherent.loadAdherentAll({idGarantie: '', idPolice: ''}));
    this.adherentList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.adherentList = value.slice();
        this.adherentListFilter = this.adherentList;
        console.log(this.adherentList);
      }
    });

    this.policeList$ = this.store.pipe(select(policeList));
    this.store.dispatch(loadPoliceAll());
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
  filtrerExerciceByPolice(police: Police){
    this.exerciceList = [];
    this.exercice = {};
  if(police != null) {
    this.adherentService.$getExerciceByPoliceId(police.id)
    .subscribe((res) => {
      this.exerciceList = res;
      console.log('res ====== ', this.exerciceList);
    });
  }
  }

  filtrer(){
    let idGarantie = '';
    let idPolice = '';
    let exoId = '';
    if (this.garant){
      idGarantie = this.garant.id;
    }
    if (this.police){
      idPolice = this.police.id;
    }
    if(this.exercice) {
      exoId = this.exercice.id;
    }
    if(this.police?.id != null && this.exercice?.id != null) {
      this.store.dispatch(featureActionAdherent.loadAdherentAll({idGarantie,
        idPolice, exoId}));
    } else {
      this.addMessage('error', 'selection non valide',
                'Veuillez selectionner la police et au moins un exercice afin de continuer !!!');
    }
    
  }

  ngOnDestroy(): void{

  }

  voirAssure(adherent: Adherent){
    this.adherent = {...adherent};
    this.infosAdherent = true;
  }
  showToast(severity: string, summary: string, detail: string) {
    this.messageService.add({ severity, summary, detail });
  }

  addMessage(severite: string, resume: string, detaile: string): void {
    this.messageService.add({severity: severite, summary: resume, detail: detaile});
  }

  voirPhotos(ad:Adherent) {
    //this.pictureUrl ='http://178.170.40.93/images/logo-vimso.jpg';
    console.log(ad.urlPhoto);
    this.pictureUrl = ad.urlPhoto?.replace("http", "https")?.replace(":92", "");
    this.displayPhotos = true;
  }

}
