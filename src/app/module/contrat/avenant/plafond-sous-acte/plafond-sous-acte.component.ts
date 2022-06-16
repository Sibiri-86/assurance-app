import { Component, Input, OnInit } from '@angular/core';
import { HistoriquePlafondSousActe } from 'src/app/store/contrat/historiqueAvenant/model';
import { select, Store } from '@ngrx/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable, Subject } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { HistoriquePlafondFamilleActe } from 'src/app/store/contrat/historiqueAvenant/model';
import { Acte } from 'src/app/store/parametrage/acte/model';
import { Garant } from 'src/app/store/parametrage/garant/model';
import { Garantie } from 'src/app/store/parametrage/garantie/model';
import { Pays } from 'src/app/store/parametrage/pays/model';
import { PlafondFamilleActe } from 'src/app/store/parametrage/plafond/model';
import { SousActe } from 'src/app/store/parametrage/sous-acte/model';
import { Taux } from 'src/app/store/parametrage/taux/model';
import { Territorialite } from 'src/app/store/parametrage/territorialite/model';
import {loadGenre} from '../../../../store/parametrage/genre/actions';
import * as sousActeSelector from '../../../../store/parametrage/sous-acte/selector';
import {loadActe} from '../../../../store/parametrage/acte/actions';
import { takeUntil } from 'rxjs/operators';
import {loadSousActe} from '../../../../store/parametrage/sous-acte/actions';
import * as tauxSelector from '../../../../store/parametrage/taux/selector';
import {loadTaux} from '../../../../store/parametrage/taux/actions';
import * as garantSelector from '../../../../store/contrat/garant/selector';
import {loadGarant} from '../../../../store/contrat/garant/actions';
import * as genreSelector from '../../../../store/parametrage/genre/selector';
import { Genre } from 'src/app/store/parametrage/genre/model';
import * as acteSelector from '../../../../store/parametrage/acte/selector';

@Component({
  selector: 'app-plafond-sous-acte',
  templateUrl: './plafond-sous-acte.component.html',
  styleUrls: ['./plafond-sous-acte.component.scss']
})
export class PlafondSousActeComponent implements OnInit {

  @Input() historiquePlafondSousActes: HistoriquePlafondSousActe[];
  @Input() etat: string;
  plafondFamilleActeTempPlafongConfig: PlafondFamilleActe = {};
  plafondFamilleActeConstructPlafongConfig: Array<PlafondFamilleActe> = [];
  tauxList$: Observable<Array<Taux>>;
  tauxList: Array<Taux>;
  sousActeList$: Observable<Array<SousActe>>;
  sousActeList: Array<SousActe>;
  garantList$: Observable<Array<Garant>>;
  garantList: Array<Garant>;
  acteList$: Observable<Array<Acte>>;
  acteList: Array<Acte>;
  paysList$: Observable<Array<Pays>>;
  paysList: Array<Pays>;
  garanties: Array<Garantie>;
  garantieList$: Observable<Array<Garantie>>;
  territorialiteList$: Observable<Array<Territorialite>>;
  territorialiteList: Array<Territorialite>;
  destroy$ = new Subject<boolean>();
  genreList: Array<Genre>;
  genreList$: Observable<Array<Genre>>;

  constructor(
    private store: Store<AppState>,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {
    console.log('*******etat*****SA**** ' + this.etat);
    this.acteList$ = this.store.pipe(select(acteSelector.acteList));
    this.store.dispatch(loadActe());
    this.acteList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.acteList = value.slice();
        // console.log('**************** ' + value.length);
      }
    });
    /* this.sousActeList$ = this.store.pipe(select(sousActeSelector.sousacteList));
    this.store.dispatch(loadSousActe());
    this.sousActeList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        console.log(this.sousActeList);
        this.sousActeList = value.slice();
      }
    }); */

    this.tauxList$ = this.store.pipe(select(tauxSelector.tauxList));
    this.store.dispatch(loadTaux());
    this.tauxList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.tauxList = value.slice();
      }
    });

    this.garantList$ = this.store.pipe(select(garantSelector.garantList));
    this.store.dispatch(loadGarant());
    this.garantList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.garantList = value.slice();
      }
    });

    this.genreList$ = this.store.pipe(select(genreSelector.genreList));
    this.store.dispatch(loadGenre());
    this.genreList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.genreList = value.slice();
      }
    });
  }

}
