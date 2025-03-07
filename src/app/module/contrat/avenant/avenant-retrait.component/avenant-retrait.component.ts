import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Police} from '../../../../store/contrat/police/model';
import {Exercice} from '../../../../store/contrat/exercice/model';
import {select, Store} from '@ngrx/store';

import {debounceTime, switchMap, takeUntil} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import * as groupeSlector from '../../../../store/contrat/groupe/selector';
import * as adherantSelector from '../../../../store/contrat/adherent/selector';
import {Groupe} from '../../../../store/contrat/groupe/model';
import {AppState} from '../../../../store/app.state';
import {ConfirmationService, MessageService} from 'primeng/api';
import {loadGroupe} from '../../../../store/contrat/groupe/actions';
import {Adherent, AdherentFamille, AdherentList, MyNewModel} from '../../../../store/contrat/adherent/model';
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
import { Page } from 'src/app/module/util/pageable';
import { log } from 'console';
import { formatDate } from '@angular/common';

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
  @Output() returnEvent = new EventEmitter();
  adherantDeleteds: Array<HistoriqueAvenantAdherant> = [];
  historiqueAveantAdherants: Array<HistoriqueAvenantAdherant> = [];
  historiqueAveantAdherantsTMP: Array<HistoriqueAvenantAdherant> = [];
  historiqueAveantAdherantsByExercice: Array<HistoriqueAvenantAdherant> = [];
  historiqueAveantAdherantsByExerciceTMP: Array<HistoriqueAvenantAdherant> = [];
  nonRetirer = 'non retiré';
  retirer = 'retiré';
  myForm: FormGroup;
  newForm: FormGroup;
  historiqueAvenant: HistoriqueAvenant = {};
  curentExercice: Exercice = {};
  @Input() isRenouv: boolean;
  private selectedFile: File;
  lastExerciceForm: FormGroup;
  isImport = 'NON';
  demandeursList: any = [
    {libelle: 'VIMSO', value: TypeDemandeur.VIMSO},
    {libelle: 'SOUSCRIPTEUR', value: TypeDemandeur.SOUSCRIPTEUR},
    {libelle: 'GARANT', value: TypeDemandeur.GARANT}
  ];
  exerciceList$: Observable<Array<Exercice>>;
  exerciceList: Array<Exercice>;
  exercice$: Observable<Exercice>;
  private exercice: Exercice;
  private exerciceForm: FormGroup;
  private curentGroupe: Groupe;
  customForm: FormGroup;
  isNewGroupe = false;
  @Input() message: string;
  @Input() avenantDate: Date;
  @Input() avenantId: string;
  @Input() etat: string;
  isAvenantRetrait = false;
  idGroupeSelected = false;

  totalElements = 0;
  totalPages = 0;
  page = 0;
  size = 10;
  adherentsListByPage:  any;
  adherentsListByPageRetrait: any;
  exoId: string;
  groupeId: string = undefined;
  numero: number;
  nom: string = undefined;
  prenom: string = undefined;
  isToSearchAllAssureList = false;
  isToSeeListOfAdherantToRetreived = false;
  dateRetrait:any;

  selectedAdherents: HistoriqueAvenantAdherant[] = [];
  adherantPrincipalWithFamily: MyNewModel[] = [];
  adherentsList: Adherent[] = [];

  isAdherantPrincipalWithFamily = false;
  expandedRows: { [key: string]: boolean } = {};

 private searchTerms = new Subject<string>(); // Observable pour gérer les termes de recherche.


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
  ) {  }

    ngOnInit(): void {
       // this.SearchWithDebounceTime();
    console.log('..............avenant-retrait...... ID........' + this.avenantId);
    this.init();

    this.groupe = {};

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
    // this.loadActivedExercice(this.police);
    if(this.etat==='CREATE' || this.isRenouv) {
      this.loadExerciceByPolice(this.police);
      this.loadLastExercice();
    }
    // this.findListeActualisee(this.police);
    if(this.etat !== 'CREATE' || this.isRenouv) {
      this.updateAvenant(this.avenantId);
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
        console.log('*********this.groupe**********', this.groupe);
        console.log('*********adherantGroupeListe**********');
        console.log(value);
        // this.makeAderantFamille();
      }
    });
    this.historiqueAveantAdherantsByExercice = this.historiqueAveantAdherantsByExerciceTMP.filter(ad => ad.adherent.groupe.id === this.groupe.id);
    console.log('adherantGroupeListe11111111111242***', this.historiqueAveantAdherantsByExercice);
    this.historiqueAvenant.groupe = this.groupe;
    this.idGroupeSelected = true;
  }

  init() {
    this.myForm = this.formBuilder.group({
      id: new FormControl(null),
      numero: new FormControl(null),
      dateAvenant: new FormControl('', [Validators.required]),
      observation: new FormControl('', [Validators.required]),
      demandeur: new FormControl('', [Validators.required]),
      // dateEffet: new FormControl(null, [Validators.required]),
      fraisBadges: 0,
      fraisAccessoires: 0,
      dateSaisie: new FormControl(new Date()),
    });
    this.newForm = this.formBuilder.group({
      groupe: new FormControl(null, [Validators.required]),
    });
    this.familleAdherants = [];
    // this.adherantList = [];
    this.exerciceForm = this.formBuilder.group({
      id: new FormControl(null),
      debut: new FormControl(''),
      fin: new FormControl('', [Validators.required]),
      actived: new FormControl('', [Validators.required]),
    });

    this.lastExerciceForm = this.formBuilder.group({
      id: new FormControl(null),
      debut: new FormControl('', [Validators.required]),
      fin: new FormControl('', [Validators.required]),
      actived: new FormControl('', [Validators.required]),
      typeDuree: new FormControl('', [Validators.required]),
      duree: new FormControl('', [Validators.required]),
  });    
    // this.etat = null;
    //this.isAvenantRetrait = false;
    this.returnEvent.emit('Sortie');
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

  onSelect(historiqueAvenantAdherant: HistoriqueAvenantAdherant): void {
    // const value: boolean = !historiqueAvenantAdherant.selected;
    console.log(historiqueAvenantAdherant);
    // historiqueAvenantAdherant.selected = value;
    const historiqueAdherent: HistoriqueAdherent = {historiqueAvenantAdherent: null, historiqueAvenantAdherentList: null};
    historiqueAdherent.historiqueAvenantAdherent = historiqueAvenantAdherant;
    historiqueAdherent.historiqueAvenantAdherentList = this.adherentsListByPageRetrait;
    console.log("*****historiqueAdherent.historiqueAvenantAdherentList****", historiqueAdherent.historiqueAvenantAdherentList);
    this.historiqueAvenantAdherantService.manageSelectionListe(historiqueAdherent).subscribe(
        (res) => {
          this.adherentsListByPageRetrait = res;
          console.log("*****adherentsListByPageRetrait****", this.adherentsListByPageRetrait);
          this.adherentsListByPageRetrait.forEach(haa => {
            haa.dateRetrait = this.myForm.get('dateAvenant').value;
          });
        }
    );
  }

  addAdherentFamilleToList(): void {
    this.getAllAdherentsAsList();
    console.log('*********familleAdherants**********');
    console.log(this.familleAdherants);
    // const historiqueAvenant: HistoriqueAvenant = {};
    if (!this.isRenouv) {
      this.historiqueAvenant.dateAvenant = this.myForm.get('dateAvenant').value;
      this.historiqueAvenant.numero = this.myForm.get('numero').value;
      this.historiqueAvenant.observation = this.myForm.get('observation').value;
      this.historiqueAvenant.dateEffet = this.myForm.get('dateAvenant').value;
      this.historiqueAvenant.dateSaisie = this.myForm.get('dateSaisie').value;
      this.historiqueAvenant.groupe = this.groupe;
      this.historiqueAvenant.typeHistoriqueAvenant = TypeHistoriqueAvenant.RETRAIT;
      this.historiqueAvenant.exercice = this.curentExercice;
      this.historiqueAvenant.police = this.police;
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
      // this.historiqueAvenant.historiqueAvenantAdherants = this.adherentsListByPageRetrait.filter(e => e.selected);
      this.historiqueAvenant.historiqueAvenantAdherants = this.adherentsListByPageRetrait.filter(e => e.selected);
    } else {
      // this.historiqueAvenant.historiqueAvenantAdherants = this.adherentsListByPageRetrait;
      this.historiqueAvenant.historiqueAvenantAdherants = this.adherentsListByPageRetrait;

    }
    console.log('******* liste des adhérents à supprimer **************');
    console.log(this.historiqueAvenant);
    this.adherentFamilleEvent.emit(this.historiqueAvenant);
    this.adherentsList = [];
    this.adherentsListByPageRetrait = [];
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
    if (this.myForm.get('dateAvenant').value !== null) {
      this.historiqueAvenantService.compareDate(this.myForm.get('dateAvenant').value, this.curentExercice.debut).subscribe(
          (res) => {
            if (res) {
              this.addMessage('error', 'Date d\'effet invalide',
                  'La date d\'effet de l\'avenant doit être compris dans la periode de l\'exercice');
              this.myForm.patchValue({dateAvenant: null});
            }
          }
      );
      if(new Date(this.myForm.get('dateAvenant').value)?.getTime() > new Date(this.curentExercice.fin)?.getTime() ) {
        this.addMessage('error', 'Date d\'effet invalide',
                  'La date d\'effet de l\'avenant doit être compris dans la periode de l\'exercice');
              this.myForm.patchValue({dateAvenant: null});
      }
    } else {
      this.historiqueAvenantService.compareDate(this.avenantDate, this.exercice.debut).subscribe(
          (res) => {
            if (res) {
              this.addMessage('error', 'Date d\'effet invalide',
                  'La date d\'effet de l\'avenant doit être compris dans la periode de l\'exercice');
              this.myForm.patchValue({dateAvenant: null});
            }
          }
      );
      if(new Date(this.myForm.get('dateAvenant').value)?.getTime() > new Date(this.exercice.fin)?.getTime() ) {
        this.addMessage('error', 'Date d\'effet invalide',
                  'La date d\'effet de l\'avenant doit être compris dans la periode de l\'exercice');
              this.myForm.patchValue({dateAvenant: null});
      }
    }
  }
  compareDateRetrait(haa: HistoriqueAvenantAdherant): void {
    console.log('**********   ' + haa);
    console.log('*****this.avenantDate*****   ');
    console.log(this.avenantDate);
    if (this.myForm.get('dateAvenant').value !== null) {
      this.historiqueAvenantService.compareDate(haa.dateRetrait, this.myForm.get('dateAvenant').value).subscribe(
          (res) => {
            if (res) {
              this.addMessage('error', 'Date de retrait invalide',
                  'La date de retrait de l\'adherent ne peut pas être antérieure à celle de l\'avenant');
              haa.dateRetrait = null;
            }
          }
      );
    } else {
      this.historiqueAvenantService.compareDate(haa.dateRetrait, this.avenantDate).subscribe(
          (res) => {
            if (res) {
              this.addMessage('error', 'Date de retrait invalide',
                  'La date de retrait de l\'adherent ne peut pas être antérieure à celle de l\'avenant');
              haa.dateRetrait = null;
            }
          }
      );
    }
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
    if (police) {
      console.log('police id === ' + police.id);
      this.historiqueAvenantAdherantService.getListActualisee(police.id).subscribe(
          (res) => {
            this.adherentsListByPageRetrait = res;
            this.historiqueAveantAdherantsByExerciceTMP = res;
          }
      );
    }
  }

   findListeActualiseeByExerciceId(currentExercice: Exercice) {
    console.log('curentExercice id 2=== ' + currentExercice.id);
    if (currentExercice) {
      console.log('curentExercice id 1=== ' + currentExercice.id);
      this.historiqueAvenantAdherantService.getListActualiseeByExerciceId(currentExercice.id).subscribe(
          (res) => {
            this.adherentsListByPageRetrait = res;
            this.historiqueAveantAdherantsByExerciceTMP = res;
          }
      );
    } else {
      // this.findListeActualisee(this.police);
    }
  } 

  updateAvenant(avenantId: string): void {
    if (avenantId && avenantId !== undefined) {
      this.historiqueAvenantService.getsHistoriqueAvenantById(avenantId).subscribe(
          (res: HistoriqueAvenant) => {
              this.historiqueAvenant = res;
              console.log('*********this.historiqueAvenant*********', this.historiqueAvenant);
              this.police = res.police;
              console.log('*********this.police*********', this.police);
              this.historiqueAveantAdherantsByExercice = res.historiqueAvenantAdherants;
              this.adherentsListByPage = res.historiqueAvenantAdherants;
              console.log('*********this.historiqueAveantAdherantsByExercice*********', this.historiqueAveantAdherantsByExercice);
              this.historiqueAveantAdherantsByExercice.forEach(haa => {
                if(haa.id) {
                  haa.dateRetrait = haa.dateRetrait;
                } else{
                  haa.dateRetrait = new Date();
                } 
              });
              this.myForm.setValue({
                  id: avenantId,
                  numero: res.numero,
                  dateSaisie: new Date(res.dateSaisie),
                  dateAvenant: res.dateAvenant,
                  observation: res.observation,
                  demandeur: res.typeDemandeur,
                  fraisBadges: 0,
                  fraisAccessoires: 0,
                  // dateEffet: new Date(res.dateAvenant),
              });
              if(this.etat === 'VIEW') {
                this.myForm.disable();
              }
              this.exercice = res.exercice;
              console.log('*********this.exercice*********', this.exercice);
              this.lastExerciceForm.patchValue({
                  id: res.exercice.id,
                  debut: res.exercice.debut,
                  fin: res.exercice.fin,
                  // actived: res.exercice.actived
              });
              this.loadExerciceByPolice(this.police);
              console.log('avenant de retrait ==== ', this.historiqueAvenant);
          }
      );
    }
    // this.viewListeEdit = true;
  }

  updateAvenant2(avenantId: string): void {
    if (avenantId && avenantId !== undefined) {
      this.historiqueAvenantService.getsHistoriqueAvenantById(avenantId).subscribe(
          (res: HistoriqueAvenant) => {
              this.historiqueAvenant = res;
              console.log('*********this.historiqueAvenant*********', this.historiqueAvenant);
              this.police = res.police;
              console.log('*********this.police*********', this.police);
              this.historiqueAveantAdherantsByExercice = res.historiqueAvenantAdherants;
              this.adherentsListByPage = res.historiqueAvenantAdherants;
              console.log('*********this.historiqueAveantAdherantsByExercice*********', this.historiqueAveantAdherantsByExercice);
              this.historiqueAveantAdherantsByExercice.forEach(haa => {
                if(haa.id) {
                  haa.dateRetrait = haa.dateRetrait;
                } else{
                  haa.dateRetrait = new Date();
                } 
              });
              this.myForm.setValue({
                  id: avenantId,
                  numero: res.numero,
                  dateSaisie: new Date(res.dateSaisie),
                  dateAvenant: res.dateAvenant,
                  observation: res.observation,
                  demandeur: res.typeDemandeur,
                  fraisBadges: 0,
                  fraisAccessoires: 0,
                  // dateEffet: new Date(res.dateAvenant),
              });
              if(this.etat === 'VIEW') {
                this.myForm.disable();
              }
              this.exercice = res.exercice;
              console.log('*********this.exercice*********', this.exercice);
              this.lastExerciceForm.patchValue({
                  id: res.exercice.id,
                  debut: res.exercice.debut,
                  fin: res.exercice.fin,
                  // actived: res.exercice.actived
              });
              this.loadExerciceByPolice(this.police);
              console.log('avenant de retrait ==== ', this.historiqueAvenant);
          }
      );
    }
    // this.viewListeEdit = true;
  }

  onPageChange(newPage: number): void {
    this.page = newPage;
    this.searchAllAdherentPrincipalByExerciceAndGroupeByPage();

/*     if(this.isToSearchAllAssureList){
      this.searchAllAdherentPrincipalByExerciceAndGroupeByPage();
    } else{

      this.onSearchAllAdherentByExerciceAndGroupeAndMultipleFilterByPage();    
    } */
    }

    onSearchAllAdherentByExerciceAndGroupeByPage(exoId: string, groupeId: string): void {
    this.exoId = exoId;
    this.groupeId = groupeId;

    if(exoId && groupeId){
      this.adherentService.searchAllAdherentByExerciceAndGroupeByPage(exoId, groupeId, this.page, this.size).subscribe({
        next: (data: Page<HistoriqueAvenantAdherant[]>) => {
          this.adherentsListByPage = data.content as any;
          this.totalElements = data.totalElements;
          this.isToSearchAllAssureList = true;
          this.totalPages = data.totalPages;
        },
        error: (err) => {
          console.error('Erreur lors du chargement des adhérents', err);
        },
      });
    }
}

  onGetExoId(exoId: string){
    if(exoId){

      this.exoId = exoId;
      // this.searchAllAdherentPrincipalByExerciceAndGroupeByPage();
      // this.onSearchAllAdherentByExerciceAndGroupeAndMultipleFilterByPage();
    }
  }
  onGetGroupeId(groupeId: string){
    if(groupeId){

      this.groupeId = groupeId;
      this.searchAllAdherentPrincipalByExerciceAndGroupeByPage();
      //  this.onSearchAllAdherentByExerciceAndGroupeAndMultipleFilterByPage();
    }
  }

  onGetNumero(numero?: number){
      this.numero = numero;
      this.onSearchAllAdherentByExerciceAndGroupeAndMultipleFilterByPage();
  }

  onGetNom(nom?: string){

      this.nom = nom;
      this.onSearchAllAdherentByExerciceAndGroupeAndMultipleFilterByPage();

  }

  onGetPrenom(prenom?: string){

      this.prenom = prenom;
     // this.searchTerms.next(prenom);
      this.onSearchAllAdherentByExerciceAndGroupeAndMultipleFilterByPage();
    
  }


  onSearchAllAdherentByExerciceAndGroupeAndMultipleFilterByPage(): void {

    this.adherentService.searchAllAdherentByExerciceAndGroupeAndMultipleFilterByPage(this.exoId, this.groupeId, this.numero, this.nom, this.prenom, this.page, this.size).subscribe({
      next: (data: Page<HistoriqueAvenantAdherant[]>) => {

        const response =  data.content as HistoriqueAvenantAdherant[];
        this.adherentsListByPage = response;
        this.adherentsListByPageRetrait = response;
        this.isToSearchAllAssureList = true;
        this.totalElements = data.totalElements;
        this.totalPages = data.totalPages;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des adhérents', err);
      },
    });
  }

  searchAllAdherentPrincipalByExerciceAndGroupeByPage(): void {

    this.adherentService.searchAllAdherentPrincipalByExerciceAndGroupeByPage(this.exoId, this.groupeId, this.page, this.size).subscribe({
      next: (data: Page<HistoriqueAvenantAdherant[]>) => {
            this.adherentsListByPage = data.content as any; 
            this.adherentsListByPageRetrait = data.content as any;

        this.isToSearchAllAssureList = true;
        this.totalElements = data.totalElements;
        this.totalPages = data.totalPages;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des adhérents', err);
      },
    });
  }

  onSubmit(): void {
    this.onSearchAllAdherentByExerciceAndGroupeAndMultipleFilterByPage();
    }


    SearchWithDebounceTime() {

        this.searchTerms
            .pipe(
                debounceTime(1000), // Attendre 1000ms après la dernière frappe.
                switchMap((prenom: string) =>
                    this.adherentService.searchAllAdherentByExerciceAndGroupeAndMultipleFilterByPage(this.exoId, this.groupeId, this.numero, this.nom, this.prenom, this.page, this.size)
                )
            )
            .subscribe({

                next: (data: Page<HistoriqueAvenantAdherant[]>) => {

                    this.adherentsListByPage = data.content as any;
                    this.isToSearchAllAssureList = true;
                    this.totalElements = data.totalElements;
                    this.totalPages = data.totalPages;
                },
                error: (err) => {
                    console.error('Erreur lors du chargement des adhérents', err);
                },
            });
    }


  onSelect3(historiqueAvenantAdherant: HistoriqueAvenantAdherant): void {
    // const value: boolean = !historiqueAvenantAdherant.selected;
    console.log(historiqueAvenantAdherant);
    // historiqueAvenantAdherant.selected = value;
    const historiqueAdherent: HistoriqueAdherent = {historiqueAvenantAdherent: null, historiqueAvenantAdherentList: null};
    historiqueAdherent.historiqueAvenantAdherent = historiqueAvenantAdherant;
    historiqueAdherent.historiqueAvenantAdherentList = this.adherentsListByPageRetrait;
    console.log("*****historiqueAdherent.historiqueAvenantAdherentList****", historiqueAdherent.historiqueAvenantAdherentList);
    this.historiqueAvenantAdherantService.manageSelectionListe(historiqueAdherent).subscribe(
        (res) => {
          this.adherentsListByPageRetrait = res;
          console.log("*****adherentsListByPageRetrait****", this.adherentsListByPageRetrait);
          this.adherentsListByPageRetrait.forEach(haa => {
            haa.dateRetrait = this.myForm.get('dateAvenant').value;
          });
        }
    );
  }

  /* 

  getAdherentPrincipalAndFamily(adherentPrincipalId: string) {
    if (!adherentPrincipalId) return;

    const existingIndex = this.adherantPrincipalWithFamily.findIndex(
        retrieve => retrieve.adherent.adherentPrincipal?.id === adherentPrincipalId
    );

    if (existingIndex !== -1) {
      this.adherantPrincipalWithFamily.splice(existingIndex, 1);

    } else {
        this.historiqueAvenantAdherantService.adherentPrincipalWithFamily(adherentPrincipalId).subscribe(
            res => {
                if (!res) return;
                const myNewModel = { 
                    adherent: {
                        adherentPrincipal: res.adherentPrincipal || null, 
                        adherentFamily: res.adherentFamily || [],
                    }
                };
                this.adherantPrincipalWithFamily.push(myNewModel);

                console.log('adherantPrincipalWithFamily', this.adherantPrincipalWithFamily);
            },
            error => {
                console.error('Erreur lors de la récupération de l\'adhérent principal et sa famille', error);
            }
        );
    }
}
 */

getAllAdherentsAsList(): Adherent[] {
  this.adherantPrincipalWithFamily.forEach(item => {
      if (item.adherent.adherentPrincipal) {
          this.adherentsList.push(item.adherent.adherentPrincipal);
      }

      if (item.adherent.adherentFamily && item.adherent.adherentFamily?.length > 0) {
          this.adherentsList = this.adherentsList.concat(item.adherent.adherentFamily);
      }
  });

  this.adherentsList = this.adherentsList.filter(
    (adherent, index, self) => index === self.findIndex((a) => a.id === adherent.id)
);

  this.adherentsListByPageRetrait = this.adherentsList.map(adherent => ({
    id: adherent.id,
    adherent: adherent,
    dateEntree: adherent.dateEntree,
    dateIncorporation: adherent.dateIncor,
    dateRetrait: this.dateRetrait,
    deleted: false,
    selected: true,
    isSuspendu: false
}));

  this.adherentsListByPageRetrait = this.adherentsListByPageRetrait.filter(
    (adherent, index, self) => index === self.findIndex((a) => a.id === adherent.id)
  );

  return this.adherentsList;
}

memberFilterFuction(memberId: string){
  this.adherentsList = this.adherentsList.filter(ahe => ahe.id != memberId);
  this.adherentsListByPageRetrait = this.adherentsListByPageRetrait.filter(ahe => ahe.id != memberId);
  this.getAllAdherentsAsList();
}

removeAdherentAndFamily(adherentPrincipalId: string): void {
  if (!adherentPrincipalId) return;

  this.adherantPrincipalWithFamily = this.adherantPrincipalWithFamily.filter(
      item => item.adherent.adherentPrincipal?.id !== adherentPrincipalId
  );

  this.adherentsList = this.adherentsList.filter(
      adherent => adherent.adherentPrincipal?.id !== adherentPrincipalId && adherent.id !== adherentPrincipalId
  );

  if (this.expandedRows) {
      delete this.expandedRows[adherentPrincipalId];
  }

}


onRetriveMemberOfAdherentPrincipal(memberId: string) {
  if (!memberId) return;

  this.adherantPrincipalWithFamily.forEach((item, index) => {
      const familyIndex = item.adherent.adherentFamily.findIndex(member => member.id === memberId);

      if (familyIndex !== -1) {
          item.adherent.adherentFamily.splice(familyIndex, 1);
          this.memberFilterFuction(memberId);
      }
  });

}


getAdherentPrincipalAndFamily(adherentPrincipalId: string) {
    if (!adherentPrincipalId) return;

    const existingIndex = this.adherantPrincipalWithFamily.findIndex(
        retrieve => retrieve.adherent.adherentPrincipal?.id === adherentPrincipalId
    );

    if (existingIndex !== -1) {
        this.adherantPrincipalWithFamily.splice(existingIndex, 1);
        this.removeAdherentAndFamily(adherentPrincipalId);
        delete this.expandedRows[adherentPrincipalId];
    } else {
        this.historiqueAvenantAdherantService.adherentPrincipalWithFamily(adherentPrincipalId).subscribe(
            res => {
                if (!res) return;

                const adherentPrincipal = res.adherentPrincipal;
                const adherentFamily = res.adherentFamily || [];

                const adherentData = {
                    adherent: {
                        adherentPrincipal,
                        adherentFamily
                    }
                };

                this.adherantPrincipalWithFamily.push(adherentData);
                this.expandedRows[adherentPrincipal.id] = true;
                const historiqueAdherent: HistoriqueAdherent = {historiqueAvenantAdherent: null, historiqueAvenantAdherentList: null};
                historiqueAdherent.historiqueAvenantAdherent = res.adherentPrincipal;
                historiqueAdherent.historiqueAvenantAdherentList =  res.adherentFamily || [];
                this.onManageSelectionListe(historiqueAdherent);
            },
            error => {
                console.error('Erreur lors de la récupération des données', error);
            }
        );
    }

    this.getAllAdherentsAsList();

}

getDateRetrait(dateRetrait: any){
  this.dateRetrait = dateRetrait;
  // this.dateRetrait = formatDate(dateRetrait, 'dd/MM/yyyy', 'en-fr');
}

    onSelect2(historiqueAveantAdherant: any): void {

      if(historiqueAveantAdherant.selected.length > 0 ){
      historiqueAveantAdherant.selected = null;
      historiqueAveantAdherant.selected = true;
      this.selectedAdherents.push(historiqueAveantAdherant);
     } 

     if(historiqueAveantAdherant.selected <= 0  || false ){
      historiqueAveantAdherant.selected = null;
      historiqueAveantAdherant.selected = false;
      this.selectedAdherents = this.selectedAdherents
                                            .filter(haa => haa.adherent.id != historiqueAveantAdherant.adherent.id)
                                            .map(haa => {
                                              haa.selected = true;
                                              return haa;
                                            });

     } 
     if(this.selectedAdherents.length > 0) {
     const historiqueAdherent: HistoriqueAdherent = {historiqueAvenantAdherent: null, historiqueAvenantAdherentList: null};

    historiqueAdherent.historiqueAvenantAdherent = historiqueAveantAdherant;
    historiqueAdherent.historiqueAvenantAdherentList = this.selectedAdherents;
    this.historiqueAvenant.historiqueAvenantAdherants = this.selectedAdherents;
    this.adherentsListByPageRetrait = this.selectedAdherents;

    this.onManageSelectionListe(historiqueAdherent);
     }

    }

    onManageSelectionListe(historiqueAdherent: any){
      this.historiqueAvenantAdherantService.manageSelectionListe(historiqueAdherent).subscribe(
        (res) => {
          this.isImport = 'NON';
          this.historiqueAveantAdherantsByExercice = res;
          this.adherentsListByPageRetrait = res;
          this.historiqueAveantAdherantsByExercice.forEach(haa => {
            haa.dateRetrait = this.myForm.get('dateAvenant').value;
          });
        }
    );
    }

    onSeeAdherantToRetrieved(){
     // this.isToSeeListOfAdherantToRetreived = true;
      this.isAdherantPrincipalWithFamily = true;
      this.getAllAdherentsAsList();

    }

    onLeaveSeeAdherantToRetrieved(){
      this.isToSeeListOfAdherantToRetreived = false;
      this.isAdherantPrincipalWithFamily = false;
    }

    onRetrieveAdherant(selectedAdherent: any){
      this.selectedAdherents = this.selectedAdherents
                                            .filter(haa => haa.adherent.id != selectedAdherent.adherent.id)
                                            .map(haa => {
                                              haa.selected = true;
                                              return haa;
                                            });
    this.onSelect2(selectedAdherent);
    }

}
