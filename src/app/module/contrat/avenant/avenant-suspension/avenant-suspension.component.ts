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
import * as exerciceSelector from '../../../../store/contrat/exercice/selector';
import * as featureExerciceAction from '../../../../store/contrat/exercice/actions';
import {Exercice} from '../../../../store/contrat/exercice/model';
import {HistoriqueAvenantAdherentService} from '../../../../store/contrat/historiqueAvenantAdherent/service';

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
  lastExerciceForm: FormGroup;
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
  @Input() avenantId: string;
  @Input() etat: string;
  exerciceList$: Observable<Array<Exercice>>;
  exerciceList: Array<Exercice>;
  historiqueAveantAdherantsByExercice: Array<HistoriqueAvenantAdherant> = [];
  historiqueAveantAdherantsByExerciceTMP: Array<HistoriqueAvenantAdherant> = [];
  curentExercice: Exercice = {};


  constructor(
      private store: Store<AppState>,
      private messageService: MessageService,
      private confirmationService: ConfirmationService,
      private historiqueAvenantService: HistoriqueAvenantService,
      private adherentService: AdherentService,
      private formBuilder: FormBuilder,
      private historiqueAvenantAdherantService: HistoriqueAvenantAdherentService
  ) {
    this.exerciceForm = this.formBuilder.group({
      debut: new FormControl(''),
      fin: new FormControl('', [Validators.required]),
      actived: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    console.log('..............avenant-retrait...... ID........' + this.avenantId);
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
    if(this.etat === 'CREATE') {
      this.findListeActualisee(this.police);
    }
    

    /* this.historiqueAvenantService.getHistoriqueAvenantAdherantsByPoliceAndUnsuspend(this.police.id).subscribe(
        (res) => {
          this.historiqueAveantAdherants = res;
          console.log('..................historiqueAveantAdherants...................');
          console.log(this.historiqueAveantAdherants);
        }
    ); */

    this.loadActivedExercice(this.police);
    if(this.etat !== 'CREATE') {
      this.updateAvenant(this.avenantId);
    }
    this.lastExerciceForm = this.formBuilder.group({
      id: new FormControl(null),
      debut: new FormControl('', [Validators.required]),
      fin: new FormControl('', [Validators.required]),
      actived: new FormControl('', [Validators.required]),
  }); 
  if(this.etat === 'CREATE') {
    this.loadExerciceByPolice(this.police);
    this.loadLastExercice();
  }
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
        console.log(this.adherantGroupeListe);
        // this.makeAderantFamille();
      }
    });
    this.historiqueAvenant.groupe = this.groupe;
  }

  init() {
    this.myForm = this.formBuilder.group({
      id: new FormControl(null),
      numeroGarant:new FormControl(null),
      dateAvenant: new FormControl(null, [Validators.required]),
      // dateEffet: new FormControl(null, [Validators.required]),
      observation: new FormControl(null, [Validators.required]),
      // typeDemandeur: new FormControl(null, [Validators.required]),
      demandeur: new FormControl(null, [Validators.required]),
      dateSaisie: new FormControl(new Date()),
      /* fraisBadges: new FormControl(0, [Validators.required]),
      fraisAccessoires: new FormControl(0, [Validators.required]), */
    });
    this.newForm = this.formBuilder.group({
      groupe: new FormControl(null, [Validators.required]),
    });
    this.familleAdherants = [];
    // this.adherantList = [];
  }

  onSelect(historiqueAvenantAdherant: HistoriqueAvenantAdherant, rowIndex: number): void {
    const value: boolean = historiqueAvenantAdherant.selected;
    console.log(historiqueAvenantAdherant.selected);
    historiqueAvenantAdherant.selected = value;
    if(historiqueAvenantAdherant.selected) {
      this.adherantSuspendds.push(historiqueAvenantAdherant);
      console.log(this.adherantSuspendds);
      /* this.myForm.patchValue({
        
    }); */
    } else {
      this.adherantSuspendds = this.adherantSuspendds.filter(ad=>ad.id !== historiqueAvenantAdherant.id);
    //  this.onRowUnselect(rowIndex);
    }
    
  }

  onRowUnselect(rowIndex: number){
    this.adherantSuspendds.splice(rowIndex);
    console.log(this.adherantSuspendds);

  }

  createAvenantSuspension(): void {
    this.historiqueAvenant.dateAvenant = this.myForm.get('dateAvenant').value;
    this.historiqueAvenant.numero = this.myForm.get('numeroGarant').value;
    this.historiqueAvenant.groupe = this.groupe;
    this.historiqueAvenant.typeHistoriqueAvenant = TypeHistoriqueAvenant.SUSPENSION;
    this.historiqueAvenant.observation = this.myForm.get('observation').value;
    this.historiqueAvenant.dateSaisie = this.myForm.get('dateSaisie').value;
    // this.historiqueAvenant.typeDemandeur = this.myForm.get('typeDemandeur').value;
    this.historiqueAvenant.exercice = this.curentExercice;
    console.log('****this.historiqueAvenant.exercice****', this.historiqueAvenant.exercice);
    this.historiqueAvenant.police = this.police;
    this.historiqueAvenant.dateEffet = this.myForm.get('dateAvenant').value;
    this.historiqueAvenant.historiqueAvenantAdherants = this.adherantSuspendds;
    console.log('****this.historiqueAvenant.historiqueAvenantAdherants****', this.adherantSuspendds);
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
    // console.log(this.myForm.get('typeDemandeur').value);
  }

  compareDate(): void {
    this.historiqueAvenantService.compareDate(this.myForm.get('dateAvenant').value, this.police.dateEffet).subscribe(
        (res) => {
          if (res) {
            this.addMessage('error', 'Date d\'effet invalide',
                'La date d\'effet de l\'avenant de peut pas être postérieure à celle de la police');
            this.myForm.patchValue({dateAvenant: null});
          }
        }
    );
  }

  addMessage(severite: string, resume: string, detaile: string): void {
    this.messageService.add({severity: severite, summary: resume, detail: detaile});
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
    this.historiqueAvenantAdherantService.getListActualisee(police.id).subscribe(
        (res) => {
          this.historiqueAveantAdherants = res;
        }
    );
  }

  updateAvenant(avenantId: string): void {
    console.log('Modification / Visualisation avenant suspension')
    this.historiqueAvenantService.getsHistoriqueAvenantById(avenantId).subscribe(
        (res: HistoriqueAvenant) => {
            this.historiqueAvenant = res;
            this.police = res.police;
            this.historiqueAveantAdherantsByExercice = res.historiqueAvenantAdherants;
            console.log('jkjhjkjhjkjhghjkjh', this.historiqueAveantAdherantsByExercice);
            this.historiqueAveantAdherantsByExercice.forEach(haa => {
              if(haa.id) {
                haa.dateRetrait = new Date(haa.dateRetrait);
               
              } else{
                haa.dateRetrait = null;
              } 
            });
            this.myForm.setValue({
                id: avenantId,
                numeroGarant: res.numeroGarant,
                dateAvenant: res.dateAvenant,
                observation: res.observation,
                demandeur: res.typeDemandeur,
                dateSaisie: new Date(res.dateSaisie)
                /* typeDemandeur: res.typeDemandeur,
                fraisBadges: 0,
                fraisAccessoires: 0,
                dateEffet: new Date(res.dateAvenant), */
            });
            if(this.etat === 'VIEW') {
              this.adherantSuspendds =  this.historiqueAveantAdherantsByExercice.filter(ad=>ad.selected === true);
              this.myForm.disable();
            }
            this.exercice = res.exercice;
            this.lastExerciceForm.patchValue({
                id: res.exercice.id,
                debut: res.exercice.debut,
                fin: res.exercice.fin,
                actived: res.exercice.actived
            });
            console.log('avenant de retrait ==== ', this.historiqueAvenant);
        }
    );
    // this.viewListeEdit = true;
}

loadExerciceByPolice(police: Police): void {
  console.log('policeId === ' + police.id);
  this.exerciceList$ = this.store.pipe(select(exerciceSelector.selectExerciceList));
  this.store.dispatch(featureExerciceAction.loadExerciceList({policeId: police.id}));
  this.exerciceList$.pipe(takeUntil(this.destroy$)).subscribe(
      (value => {
        this.exerciceList = value;
        console.log('liste === ');
        console.log(this.exerciceList);
      })
  );
  // this.exerciceList = [];
}

loadLastExercice() {
  this.exercice$ = this.store.pipe(select(exerciceSelector.selectLastExercice));
          this.store.dispatch(featureExerciceAction.loadLastExercice({policeId: this.police.id}));
          this.exercice$.pipe(takeUntil(this.destroy$)).subscribe(
              (res) => {
                  this.exercice = res;
                  console.log('******this.exercice*******', this.exercice);
                  if (this.exercice) {
                      this.lastExerciceForm.patchValue({
                          debut: this.exercice.debut,
                          fin: this.exercice.fin
                          // actived: this.exercice.actived,
                      });
                  }
              }
          );
}

findListeActualiseeByExerciceId(currentExercice: Exercice) {
  console.log('curentExercice id 2=== ' + currentExercice.id);
  if (currentExercice) {
    console.log('curentExercice id 1=== ' + currentExercice.id);
    this.historiqueAvenantAdherantService.getListActualiseeByExerciceId(currentExercice.id).subscribe(
        (res) => {
          this.historiqueAveantAdherantsByExercice = res;
          this.historiqueAveantAdherantsByExerciceTMP = res;
        }
    );
  } else {
    this.findListeActualisee(this.police);
  }
}

annulerSuspension(haa: HistoriqueAvenantAdherant) {
  this.historiqueAvenantService.getSuspensionAnnuler(haa.avenant.id, haa.adherent.id).subscribe(
    (res) => {
      console.log("effectué");
    }
  )
}
}
