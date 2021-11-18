import {Component, Input, OnInit} from '@angular/core';
import {Police} from '../../../../store/contrat/police/model';
import {select, Store} from '@ngrx/store';

import {takeUntil} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import * as groupeSlector from '../../../../store/contrat/groupe/selector';
import * as adherantSlector from '../../../../store/contrat/adherent/selector';
import {Groupe} from '../../../../store/contrat/groupe/model';
import {AppState} from '../../../../store/app.state';
import {ConfirmationService, MessageService} from 'primeng/api';
import {loadGroupe} from '../../../../store/contrat/groupe/actions';
import {Adherent} from '../../../../store/contrat/adherent/model';
import {loadAdherent} from '../../../../store/contrat/adherent/actions';

@Component({
  selector: 'app-avenant-retrait',
  templateUrl: './avenant-retrait.component.html',
  styleUrls: ['./avenant-retrait.component.scss']
})
export class AvenantRetraitComponent implements OnInit {

  @Input() police: Police = {};
  groupeList$: Observable<Groupe[]>;
  groupeList: Array<Groupe>;
  adherantList$: Observable<Adherent[]>;
  adherantList: Array<Adherent>;
  destroy$ = new Subject<boolean>();
  groupe: Groupe;
  groupePolicy: any;
  constructor(
      private store: Store<AppState>,
      private messageService: MessageService,
      private confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {
    console.log('..............police.avenant-retrait..............');
    console.log(this.police);
    this.groupeList$ = this.store.pipe(select(groupeSlector.groupeList));
    this.store.dispatch(loadGroupe({policeId: this.police.id}));
    this.groupeList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.groupeList = value.slice();
        console.log(this.groupeList);
      }
    });
    this.groupe = {};
  }


  loadAherantByGroupe(): void {
    this.adherantList$ = this.store.pipe(select(adherantSlector.adherentList));
    this.store.dispatch(loadAdherent({idGroupe: this.groupe.id}));
    this.adherantList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.adherantList = value.slice();
      }
    });
  }

}
