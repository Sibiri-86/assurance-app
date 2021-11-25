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
import {HistoriqueAvenantAdherant, HistoriqueAvenantList} from '../../../../store/contrat/historiqueAvenant/model';
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
  adherantGroupeListe: Array<HistoriqueAvenantAdherant> = [];
  familleAdherants: Array<AdherentFamille>;
  @Output() adherentFamilleEvent = new EventEmitter();
  adherantDeleteds: Array<HistoriqueAvenantAdherant> = [];
  historiqueAveantAdherants: Array<HistoriqueAvenantAdherant> = [];
  nonRetirer = 'non retiré';
  retirer = 'retiré';
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

    this.historiqueAvenantService.getHistoriqueAvenantAdherantsByPolice(this.police.id).subscribe(
        (res) => {
          this.historiqueAveantAdherants = res;
          console.log('..................historiqueAveantAdherants...................');
          console.log(this.historiqueAveantAdherants);
        }
    );
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
        console.log('*********adherantGroupeListe**********');
        console.log(this.adherantGroupeListe);
        // this.makeAderantFamille();
      }
    });
  }

  init() {
    this.familleAdherants = [];
    // this.adherantList = [];
  }

  onSelect(historiqueAvenantAdherant: HistoriqueAvenantAdherant): void {
    const value: boolean = !historiqueAvenantAdherant.selected;
    console.log(historiqueAvenantAdherant);
    historiqueAvenantAdherant.selected = value;
    // const id = adherent.adherent.id;
    // this.adherantDeleteds.push(historiqueAvenantAdherant);
    // this.historiqueAveantAdherants = this.historiqueAveantAdherants.filter(e => e.id === historiqueAvenantAdherant.id);
    this.historiqueAveantAdherants.forEach(haa => {
      if (haa && haa.adherent && haa.adherent.adherentPrincipal && haa.adherent.adherentPrincipal.id &&
          haa.adherent.adherentPrincipal.id === historiqueAvenantAdherant.adherent.id) {
        this.adherantDeleteds.push(haa);
        haa.selected = value;
        // this.historiqueAveantAdherants = this.historiqueAveantAdherants.filter(e => e.id === haa.id);
        // console.log('******1*******' + this.adherantDeleteds.length);
      }
      console.log('******1*******' + this.adherantDeleteds.length);
    });
    // if (adherent.adherent.adherentPrincipal !== null) {
      // this.adherantDeleteds = this.adherantGroupeListe.filter(e => e.adherent.id === adherent.adherent.adherentPrincipal.id);
      // this.adherantGroupeListe = this.adherantGroupeListe.filter(e =>  e.adherent.id === adherent.adherent.adherentPrincipal.id);
    // }
  }

  addAdherentFamilleToList(): void {
    console.log('*********familleAdherants**********');
    console.log(this.familleAdherants);
    this.makeAderantFamille();
    this.adherentFamilleEvent.emit(this.adherantDeleteds);
    this.init();
  }

  makeAderantFamille(): void {
    this.adherantGroupeListe.forEach(f => {
      const familleAdherant: AdherentFamille = {
        adherent: {},
        famille: []
      };
      if (f.adherentPrincipal === null) {
        console.log('*********adhrant principal**********');
        console.log(f);
        familleAdherant.adherent = f;
        this.adherantGroupeListe.forEach(e => {
          if (e.adherentPrincipal !== null && e.adherentPrincipal.id === f.id) {
            familleAdherant.famille.push(e);
          }
        });
        // familleAdherant.famille = this.adherantGroupeListe.filter(e => e.adherentPrincipal.id === f.id);
        this.familleAdherants.push(familleAdherant);
      }
      else {
        console.log('*********adhrant NON principal**********');
        console.log(f);
        familleAdherant.adherent = f;
        familleAdherant.famille = [];
        this.familleAdherants.push(familleAdherant);
      }
    });
  }

}
