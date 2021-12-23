import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Police} from '../../../../store/contrat/police/model';
import {Observable, Subject} from 'rxjs';
import {Groupe} from '../../../../store/contrat/groupe/model';
import {Adherent, AdherentFamille, AdherentList} from '../../../../store/contrat/adherent/model';
import {
  HistoriqueAvenant,
  HistoriqueAvenantAdherant,
  HistoriqueAvenantList, TypeDemandeur, TypeHistoriqueAvenant
} from '../../../../store/contrat/historiqueAvenant/model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../../store/app.state';
import {ConfirmationService, MessageService} from 'primeng/api';
import {HistoriqueAvenantService} from '../../../../store/contrat/historiqueAvenant/service';
import {AdherentService} from '../../../../store/contrat/adherent/service';
import * as groupeSlector from '../../../../store/contrat/groupe/selector';
import {loadGroupe} from '../../../../store/contrat/groupe/actions';
import {takeUntil} from 'rxjs/operators';
import * as adherantSelector from '../../../../store/contrat/adherent/selector';
import * as featureActionAdherent from '../../../../store/contrat/adherent/actions';

@Component({
  selector: 'app-avenant-suspension',
  templateUrl: './avenant-suspension.component.html',
  styleUrls: ['./avenant-suspension.component.scss']
})
export class AvenantSuspensionComponent implements OnInit {

  @Input() police: Police = {};
  groupeList$: Observable<Groupe[]>;
  groupeList: Array<Groupe>;
  destroy$ = new Subject<boolean>();
  groupe: Groupe;
  historiqueAvenants: HistoriqueAvenantList;
  adherentList$: Observable<Array<Adherent>>;
  adherantGroupeListe: Array<HistoriqueAvenantAdherant> = [];
  familleAdherants: Array<AdherentFamille>;
  @Output() eventEmitterSuspension = new EventEmitter();
  adherantSuspendds: Array<HistoriqueAvenantAdherant> = [];
  historiqueAveantAdherants: Array<HistoriqueAvenantAdherant> = [];
  nonRetirer = 'NON SUSPENDU';
  retirer = 'SUSPENDU';
  myForm: FormGroup;
  newForm: FormGroup;
  historiqueAvenant: HistoriqueAvenant = {};
  @Input() isRenouv: boolean;
  private selectedFile: File;
  isImport = 'NON';
  demandeursList: any = [{libelle: 'VIMSO', value: TypeDemandeur.VIMSO}, {
    libelle: 'SOUSCRIPTEUR',
    value: TypeDemandeur.SOUSCRIPTEUR
  }];

  constructor(
      private store: Store<AppState>,
      private messageService: MessageService,
      private confirmationService: ConfirmationService,
      private historiqueAvenantService: HistoriqueAvenantService,
      private adherentService: AdherentService,
      private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.init();
    this.groupe = {};
    console.log('..............police.avenant-retrait..............');
    console.log(this.police);
    this.groupeList$ = this.store.pipe(select(groupeSlector.groupeList));
    this.store.dispatch(loadGroupe({policeId: this?.police?.id}));
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

    this.historiqueAvenantService.getHistoriqueAvenantAdherantsByPoliceAndUnsuspend(this.police.id).subscribe(
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
    this.groupe = this.newForm.get('groupe').value;
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
        // this.adherantGroupeListe = value.slice();
        console.log('*********adherantGroupeListe**********');
        console.log(this.adherantGroupeListe);
        // this.makeAderantFamille();
      }
    });
    this.historiqueAvenant.groupe = this.groupe;
  }

  init() {
    this.myForm = this.formBuilder.group({
      numero: new FormControl(null, [Validators.required]),
      dateAvenant: new FormControl(null, [Validators.required]),
      observation: new FormControl(null),
      typeDemandeur: new FormControl(null, [Validators.required]),
      demandeur: new FormControl(null, [Validators.required]),
    });
    this.newForm = this.formBuilder.group({
      groupe: new FormControl(null, [Validators.required]),
    });
    this.familleAdherants = [];
    // this.adherantList = [];
  }

  onSelect(historiqueAvenantAdherant: HistoriqueAvenantAdherant): void {
    const value: boolean = !historiqueAvenantAdherant.selected;
    console.log(historiqueAvenantAdherant);
    historiqueAvenantAdherant.selected = value;
  }

  createAvenantSuspension(): void {
    this.historiqueAvenant.dateAvenant = this.myForm.get('dateAvenant').value;
    this.historiqueAvenant.numero = this.myForm.get('numero').value;
    this.historiqueAvenant.groupe = this.groupe;
    this.historiqueAvenant.typeHistoriqueAvenant = TypeHistoriqueAvenant.SUSPENSION;
    this.historiqueAvenant.observation = this.myForm.get('observation').value;
    this.historiqueAvenant.typeDemandeur = this.myForm.get('typeDemandeur').value;
    this.historiqueAvenant.historiqueAvenantAdherants = this.adherantSuspendds;
    this.eventEmitterSuspension.emit(this.historiqueAvenant);
    this.init();
  }

  exportModel(): void {
    this.historiqueAvenantService.exportExcelModel(TypeHistoriqueAvenant.SUSPENSION).subscribe(
        (res) => {
          const file = new Blob([res], {type: 'application/vnd.ms-excel'});
          const  fileUrl = URL.createObjectURL(file);
          window.open(fileUrl);
        }
    );
  }

  getFiles(event: File) {
    this.historiqueAvenant.fileToLoad = event;
    this.selectedFile = event;
    console.log('------------get files success---------------');
    console.log(this.historiqueAvenant.fileToLoad);
  }

  onDemandeurChange(): void {
    this.myForm.patchValue({
      typeDemandeur: this.myForm.get('demandeur').value.value
    });
    console.log(this.myForm.get('typeDemandeur').value);
  }
}