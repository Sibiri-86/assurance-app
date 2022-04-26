import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable, Subject } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { HistoriquePlafondActe, HistoriquePlafondFamilleActe } from 'src/app/store/contrat/historiqueAvenant/model';
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
import { DimensionPeriode } from 'src/app/store/parametrage/dimension-periode/model';
import { Plafond } from 'src/app/store/contrat/plafond/model';
import { FormGroup } from '@angular/forms';
import { QualiteAssure } from 'src/app/store/parametrage/qualite-assure/model';
import * as dimensionPeriodeSelector from '../../../../store/parametrage/dimension-periode/selector';
import {loadDimensionPeriode} from '../../../../store/parametrage/dimension-periode/actions';
import {loadGarantie} from '../../../../store/parametrage/garantie/actions';
import * as garantieSelector from '../../../../store/parametrage/garantie/selector';
import * as territorialiteSelector from '../../../../store/parametrage/territorialite/selector';
import {loadTerritorialite} from '../../../../store/parametrage/territorialite/actions';
import * as qualiteAssureSelector from '../../../../store/parametrage/qualite-assure/selector';
import {loadQualiteAssure} from '../../../../store/parametrage/qualite-assure/actions';

@Component({
  selector: 'app-plafond-famille-acte',
  templateUrl: './plafond-famille-acte.component.html',
  styleUrls: ['./plafond-famille-acte.component.scss']
})
export class PlafondFamilleActeComponent implements OnInit {

  @Input() historiquePlafondFamilleActePlafongConfig: Array<HistoriquePlafondFamilleActe>;
  @Input() etat: string;
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
  plafondFamilleActePlafongConfig: Array<HistoriquePlafondFamilleActe> = [];
  plafondFamilleActeTempPlafongConfig: HistoriquePlafondFamilleActe = {};
  plafondFamilleActeConstructPlafongConfig: Array<HistoriquePlafondFamilleActe> = [];
  plafondActePlafongConfig: Array<HistoriquePlafondActe> = [];
  plafondSousActePlafongConfig: Array<HistoriquePlafondActe> = [];
  clonedPlafondConfiguration: any = {};
  plafondActuelleConfiguration: any = {};
  dimensionPeriodeList$: Observable<Array<DimensionPeriode>>;
  dimensionPeriodeList: Array<DimensionPeriode>;
  plafond: Plafond;
  plafondForm: FormGroup;
  private historiqueAvenantAdherantFrom: FormGroup;
  private familleActe$: Observable<any>;
  qualiteAssureList: Array<QualiteAssure>;
  qualiteAssureList$: Observable<Array<QualiteAssure>>;

  constructor(
      private store: Store<AppState>,
      private messageService: MessageService,
      private confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {
    this.acteList$ = this.store.pipe(select(acteSelector.acteList));
    this.store.dispatch(loadActe());
    this.acteList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.acteList = value.slice();
        // console.log('**************** ' + value.length);
      }
    });
    this.sousActeList$ = this.store.pipe(select(sousActeSelector.sousacteList));
    this.store.dispatch(loadSousActe());
    this.sousActeList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        console.log(this.sousActeList);
        this.sousActeList = value.slice();
      }
    });

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

    this.dimensionPeriodeList$ = this.store.pipe(
      select(dimensionPeriodeSelector.dimensionPeriodeList)
  );
  this.store.dispatch(loadDimensionPeriode());
  this.dimensionPeriodeList$
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        if (value) {
          this.dimensionPeriodeList = value.slice();
        }
      });

  this.garantieList$ = this.store.pipe(select(garantieSelector.garantieList));
  this.store.dispatch(loadGarantie());
  this.garantieList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
    if (value) {
      this.garanties = value.slice();
    }
  });

  this.territorialiteList$ = this.store.pipe(select(territorialiteSelector.territorialiteList));
  this.store.dispatch(loadTerritorialite());
  this.territorialiteList$.pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        if (value) {
          this.territorialiteList = value.slice();
          console.log(this.territorialiteList);
        }
      });

  this.qualiteAssureList$ = this.store.pipe(
      select(qualiteAssureSelector.qualiteAssureList)
  );
  this.store.dispatch(loadQualiteAssure());
  this.qualiteAssureList$
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        if (value) {
          this.qualiteAssureList = value.slice();
          // this.qualiteAssureList2 = value.slice().filter(e => e.code !== 'ADHERENT');
        }
      });
  }

  onRowEditInitPlafondConfiguration(plafond: HistoriquePlafondFamilleActe) {
    this.clonedPlafondConfiguration[plafond.id] = {...plafond};
    // console.log(this.clonedPlafondConfiguration);
  }

  onRowEditSavePlafondConfiguration(plafond: HistoriquePlafondFamilleActe) {
    delete this.clonedPlafondConfiguration[plafond?.id];
  }

  onRowEditCancelPlafondConfiguration(plafond: HistoriquePlafondFamilleActe, index: number) {
    this.plafondActuelleConfiguration[index] = this.clonedPlafondConfiguration[plafond?.id];
    delete this.clonedPlafondConfiguration[plafond?.id];
  }

}
