import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Police} from '../../../../store/contrat/police/model';
import {select, Store} from '@ngrx/store';

import {takeUntil} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import * as groupeSlector from '../../../../store/contrat/groupe/selector';
import * as adherantSelector from '../../../../store/contrat/adherent/selector';
import {Groupe} from '../../../../store/contrat/groupe/model';
import {AppState} from '../../../../store/app.state';
import {ConfirmationService, MessageService} from 'primeng/api';
import {loadGroupe} from '../../../../store/contrat/groupe/actions';
import {Adherent, AdherentFamille, AdherentList} from '../../../../store/contrat/adherent/model';
import * as featureActionAdherent from '../../../../store/contrat/adherent/actions';

import {HistoriqueAvenantService} from '../../../../store/contrat/historiqueAvenant/service';
import {HistoriqueAvenantList} from '../../../../store/contrat/historiqueAvenant/model';
import {AdherentService} from '../../../../store/contrat/adherent/service';

@Component({
  selector: 'app-avenant-retrait',
  templateUrl: './avenant-retrait.component.html',
  styleUrls: ['./avenant-retrait.component.scss']
})
export class AvenantRetraitComponent implements OnInit {

  @Input() police: Police = {};
  groupeList$: Observable<Groupe[]>;
  groupeList: Array<Groupe>;
  adherants: Array<Adherent>;
  adherantList: AdherentList;
  destroy$ = new Subject<boolean>();
  groupe: Groupe;
  groupePolicy: any;
  historiqueAvenants: HistoriqueAvenantList;
  adherentList$: Observable<Array<Adherent>>;
  adherantGroupeListe: Array<Adherent> = [];
  familleAdherants: Array<AdherentFamille>;
  @Output() adherentFamilleEvent = new EventEmitter();
  constructor(
      private store: Store<AppState>,
      private messageService: MessageService,
      private confirmationService: ConfirmationService,
      private historiqueAvenantService: HistoriqueAvenantService,
      private adherentService: AdherentService
  ) { }

  ngOnInit(): void {
    this.init();
    console.log('..............police.avenant-retrait..............');
    console.log(this.police);
    this.groupeList$ = this.store.pipe(select(groupeSlector.groupeList));
    this.store.dispatch(loadGroupe({policeId: this.police.id}));
    this.groupeList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.groupeList = value.slice();
        if (this.groupeList.length === 1) {
          this.groupe = this.groupeList[0];
          this.loadAherantByGroupe();
        }
        console.log(this.groupeList);
      }
    });
    this.groupe = {};
  }


  loadHistoriqueAvenantByPolice(): void {
    this.historiqueAvenantService.getHistoriqueAvenants(this.police.id).subscribe(
        (res: HistoriqueAvenantList) => {
          this.historiqueAvenants = res;
        }
    );
  }

  loadAherantByGroupe(): void {
    console.log('*********groupe**********');
    console.log(this.groupe);
    /* this.adherentService.$getAdherents(this.groupe.id).subscribe(
        (res) => {
          this.adherantGroupeListe = res.adherentDtoList;
          console.log('*******************');
          console.log(res);
        }
    ); */
    this.adherentList$ = this.store.pipe(select(adherantSelector.adherentList));
    this.store.dispatch(featureActionAdherent.loadAdherent({idGroupe: this.groupe.id}));
    this.adherentList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.adherantGroupeListe = value.slice();
        this.makeAderantFamille();
      }
    });
  }

  private init() {
    this.familleAdherants = [];
    // this.adherantList = [];
  }

  retirer(adherent: Adherent): void {
    const id = adherent.id;
    this.adherantGroupeListe = this.adherantGroupeListe.filter(e => e.id !== id);
    if (adherent.adherentPrincipal !== null) {
      this.adherantGroupeListe = this.adherantGroupeListe.filter(e => e.id !== adherent.adherentPrincipal.id);
    }
  }

  addAdherentFamilleToList(): void {
    this.adherentFamilleEvent.emit(this.familleAdherants);
    this.init();
  }

  private makeAderantFamille() {
    this.adherantGroupeListe.forEach(f => {
      let familleAdherant: AdherentFamille = {};
      if (f.adherentPrincipal !== null) {
        familleAdherant = f as AdherentFamille;
        familleAdherant.famille = this.adherantGroupeListe.filter(e => e.id !== f.adherentPrincipal.id);
        this.familleAdherants.push(familleAdherant);
      }
    });
  }
}
