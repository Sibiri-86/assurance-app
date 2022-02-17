import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Police} from '../../../../store/contrat/police/model';
import {Exercice} from '../../../../store/contrat/exercice/model';
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
import {groupeList} from '../../../../store/contrat/groupe/selector';
import {HistoriqueAvenantService} from '../../../../store/contrat/historiqueAvenant/service';
import {
  HistoriqueAvenant,
  HistoriqueAvenantAdherant,
  HistoriqueAvenantList, TypeDemandeur, TypeHistoriqueAvenant
} from '../../../../store/contrat/historiqueAvenant/model';
import {AdherentService} from '../../../../store/contrat/adherent/service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PoliceService} from '../../../../store/contrat/police/service';
import {ExerciceService} from '../../../../store/contrat/exercice/service';
import * as exerciceSelector from '../../../../store/contrat/exercice/selector';
import * as featureExerciceAction from '../../../../store/contrat/exercice/actions';
import {HistoriqueAvenantAdherentService} from '../../../../store/contrat/historiqueAvenantAdherent/service';
import {HistoriqueAdherent} from '../../../../store/contrat/historiqueAvenantAdherent/model';

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
  historiqueAveantAdherantsTMP: Array<HistoriqueAvenantAdherant> = [];
  nonRetirer = 'non retiré';
  retirer = 'retiré';
  myForm: FormGroup;
  newForm: FormGroup;
  historiqueAvenant: HistoriqueAvenant = {};
  @Input() isRenouv: boolean;
  private selectedFile: File;
  isImport = 'NON';
  demandeursList: any = [
    {libelle: 'VIMSO', value: TypeDemandeur.VIMSO},
    {libelle: 'SOUSCRIPTEUR', value: TypeDemandeur.SOUSCRIPTEUR},
    {libelle: 'GARANT', value: TypeDemandeur.GARANT}
  ];
  exercice$: Observable<Exercice>;
  private exercice: Exercice;
  private exerciceForm: FormGroup;
  private curentGroupe: Groupe;
  customForm: FormGroup;
  isNewGroupe = false;
  @Input() message: string;
  constructor(
      private store: Store<AppState>,
      private messageService: MessageService,
      private confirmationService: ConfirmationService,
      private historiqueAvenantService: HistoriqueAvenantService,
      private adherentService: AdherentService,
      private formBuilder: FormBuilder,
      private policeService: PoliceService,
      private exerciceService: ExerciceService,
      private historiqueAvenantAdherantService: HistoriqueAvenantAdherentService
  ) {}

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

    /* this.historiqueAvenantService.getHistoriqueAvenantAdherantsByPolice(this.police.id).subscribe(
        (res) => {
          this.historiqueAveantAdherants = res;
          this.historiqueAveantAdherantsTMP = res;
          console.log('..................historiqueAveantAdherants...................');
          console.log(this.historiqueAveantAdherants);
        }
    ); */
    this.loadActivedExercice(this.police);
    this.findListeActualisee(this.police);
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
    this.store.dispatch(featureActionAdherent.loadAdherent({idGroupe: this.groupe?.id}));
    this.adherentList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        // this.adherantGroupeListe = value.slice();
        console.log('*********adherantGroupeListe**********');
        console.log(value);
        // this.makeAderantFamille();
      }
    });
    this.historiqueAveantAdherants = this.historiqueAveantAdherantsTMP.filter(ad => ad.adherent.groupe.id === this.groupe.id);
    this.historiqueAvenant.groupe = this.groupe;
  }

  init() {
    this.myForm = this.formBuilder.group({
      numero: new FormControl(null),
      dateAvenant: new FormControl(null, [Validators.required]),
      observation: new FormControl(null, [Validators.required]),
      demandeur: new FormControl(null, [Validators.required]),
    });
    this.newForm = this.formBuilder.group({
      groupe: new FormControl(null, [Validators.required]),
    });
    this.familleAdherants = [];
    // this.adherantList = [];
    this.exerciceForm = this.formBuilder.group({
      debut: new FormControl(''),
      fin: new FormControl('', [Validators.required]),
      actived: new FormControl('', [Validators.required]),
    });
  }

  onSelect(historiqueAvenantAdherant: HistoriqueAvenantAdherant): void {
    // const value: boolean = !historiqueAvenantAdherant.selected;
    console.log(historiqueAvenantAdherant);
    // historiqueAvenantAdherant.selected = value;
    const historiqueAdherent: HistoriqueAdherent = {historiqueAvenantAdherent: null, historiqueAvenantAdherentList: null};
    historiqueAdherent.historiqueAvenantAdherent = historiqueAvenantAdherant;
    historiqueAdherent.historiqueAvenantAdherentList = this.historiqueAveantAdherants;
    this.historiqueAvenantAdherantService.manageSelectionListe(historiqueAdherent).subscribe(
        (res) => {
          this.historiqueAveantAdherants = res;
          // this.historiqueAveantAdherantsTMP = res;
        }
    );
  }

  addAdherentFamilleToList(): void {
    console.log('*********familleAdherants**********');
    console.log(this.familleAdherants);
    // const historiqueAvenant: HistoriqueAvenant = {};
    if (!this.isRenouv) {
      this.historiqueAvenant.dateAvenant = this.myForm.get('dateAvenant').value;
      this.historiqueAvenant.numero = this.myForm.get('numero').value;
      this.historiqueAvenant.groupe = this.groupe;
      this.historiqueAvenant.typeHistoriqueAvenant = TypeHistoriqueAvenant.RETRAIT;
      this.historiqueAvenant.exercice = this.exercice;
      switch (this.myForm.get('demandeur').value.value) {
        case TypeDemandeur.GARANT:
          this.historiqueAvenant.typeDemandeur = TypeDemandeur.GARANT;
          break;
        case TypeDemandeur.SOUSCRIPTEUR:
          this.historiqueAvenant.typeDemandeur = TypeDemandeur.SOUSCRIPTEUR;
          break;
        case TypeDemandeur.VIMSO:
          this.historiqueAvenant.typeDemandeur = TypeDemandeur.VIMSO;
          break;
        default:
          break;
      }
      this.historiqueAvenant.historiqueAvenantAdherants = this.historiqueAveantAdherants.filter(e => e.selected);
    } else {
      this.historiqueAvenant.historiqueAvenantAdherants = this.historiqueAveantAdherants;
    }
    console.log('******* liste des adhérents à supprimer **************');
    console.log(this.historiqueAvenant);
    this.adherentFamilleEvent.emit(this.historiqueAvenant);
    this.init();
  }

  exportModel(): void {
    this.historiqueAvenantService.getModel(TypeHistoriqueAvenant.RETRAIT).subscribe(
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

  compareDate(): void {
    this.historiqueAvenantService.compareDate(this.myForm.get('dateAvenant').value, this.police.dateEffet).subscribe(
        (res) => {
          if (res) {
            this.addMessage('error', 'Date d\'effet invalide',
                'La date d\'effet de l\'avenant ne peut pas être postérieure à celle de la police');
            this.myForm.patchValue({dateAvenant: null});
          }
        }
    );
  }
  compareDateRetrait(haa: HistoriqueAvenantAdherant): void {
    this.historiqueAvenantService.compareDate(haa.dateRetrait, this.myForm.get('dateAvenant').value).subscribe(
        (res) => {
          if (res) {
            this.addMessage('error', 'Date de retrait invalide',
                'La date de retrait de l\'adherent ne peut pas être postérieure à celle de l\'avenant');
            haa.dateRetrait = null;
          }
        }
    );
  }

  addMessage(severite: string, resume: string, detaile: string): void {
    this.messageService.add({severity: severite, summary: resume, detail: detaile});
  }

  onGroupeChange() {
    this.curentGroupe = this.customForm.controls.groupe.value;
    // this.adherentPrincipaux = this.adherentPrincipauxTMP.filter(ad => ad.groupe.id === this.curentGroupe.id);
  }
  loadGoupeByPolice(): void {
    this.groupeList$ = this.store.pipe(select(groupeList));
    this.store.dispatch(loadGroupe({policeId: this.police.id}));
    this.groupeList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.groupePolicy = value.slice();
        console.log(this.groupePolicy);
      }
    });
  }
  addGroupeNew(groupe: FormGroup): Groupe {
    console.log(groupe);
    this.curentGroupe = groupe as Groupe;
    return this.curentGroupe;
  }

  private loadActivedExercice(police: Police): void {
    if (police) {
      this.exercice$ = this.store.pipe(select(exerciceSelector.selectActiveExercice));
      this.store.dispatch(featureExerciceAction.loadExerciceActif({policeId: police.id}));
      this.exercice$.pipe(takeUntil(this.destroy$)).subscribe(
          (res) => {
            this.exercice = res;
            if (this.exercice) {
              this.exerciceForm.patchValue({
                debut: this.exercice.debut,
                fin: this.exercice.fin,
                actived: this.exercice.actived,
              });
            }
          }
      );
    }
  }

  findListeActualisee(police: Police): void {
    console.log('police id === ' + police.id);
    this.historiqueAvenantAdherantService.getListActualisee(police.id).subscribe(
        (res) => {
          this.historiqueAveantAdherants = res;
          this.historiqueAveantAdherantsTMP = res;
        }
    );
  }

}
