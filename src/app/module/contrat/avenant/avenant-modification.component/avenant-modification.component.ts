import {Component, Input, OnInit} from '@angular/core';
import {Police} from '../../../../store/contrat/police/model';
import {select, Store} from '@ngrx/store';

import {takeUntil} from 'rxjs/operators';
import {Observable, Subject, Subscription} from 'rxjs';
import * as groupeSlector from '../../../../store/contrat/groupe/selector';
import * as adherantSlector from '../../../../store/contrat/adherent/selector';
import {Groupe} from '../../../../store/contrat/groupe/model';
import {AppState} from '../../../../store/app.state';
import {ConfirmationService, MessageService} from 'primeng/api';
import {loadGroupe} from '../../../../store/contrat/groupe/actions';
import {Adherent} from '../../../../store/contrat/adherent/model';
import {loadAdherent} from '../../../../store/contrat/adherent/actions';
import {Genre} from '../../../../store/parametrage/genre/model';

@Component({
  selector: 'app-avenant-modification',
  templateUrl: './avenant-modification.component.html',
  styleUrls: ['./avenant-modification.component.scss']
})
export class AvenantModificationComponent implements OnInit {

  @Input() police: Police;
  groupeList$: Observable<Groupe[]>;
  groupeList: Array<Groupe>;
  adherantList$: Observable<Adherent[]>;
  @Input() adherantList: Array<Adherent>;
  destroy$ = new Subject<boolean>();
  groupe: Groupe;
  groupePolicy: any;
  genreList: Array<Genre>;
  genreList$: Observable<Array<Genre>>;
  constructor(
      private store: Store<AppState>,
      private messageService: MessageService,
      private confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {
    console.log('.............................');
    console.log(this.police);
    this.groupeList$ = this.store.pipe(select(groupeSlector.groupeList));
    this.store.dispatch(loadGroupe({policeId: this.police.id}));
    this.groupeList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.groupeList = value.slice();
        console.log(this.groupeList);
      }
    });
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
