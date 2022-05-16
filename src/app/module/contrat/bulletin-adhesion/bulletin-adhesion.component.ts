import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import {
  ControlContainer,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormArray
} from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { takeUntil } from 'rxjs/operators';
import { Taux } from '../../../store/parametrage/taux/model';
import { Sort } from '../../common/models/sort.enum';
import { ConfirmationService, MenuItem, MessageService, SelectItem } from 'primeng/api';
import { Adherent } from 'src/app/store/contrat/adherent/model';
import * as featureActionAdherent from '../../../store/contrat/adherent/actions';
import { BreadcrumbService } from 'src/app/app.breadcrumb.service';
import * as featureActionBulletinAdhesion from '../../../store/contrat/bulletin-adhesion/actions';
import * as selectorsBulletinAdhesion from '../../../store/contrat/bulletin-adhesion/selector';
import { BulletinAdhesion, BulletinAdhesionList, Enfant, Epouse, Questionnaire } from 'src/app/store/contrat/bulletin-adhesion/model';
import * as adherentSelector from '../../../store/contrat/adherent/selector';
import { AffectionPasse, Choix, Defaut, MaladieProche, SituationFamiliale } from 'src/app/store/contrat/enum/model';


@Component({
  selector: 'app-bulletin-adhesion',
  templateUrl: './bulletin-adhesion.component.html',
  styleUrls: ['./bulletin-adhesion.component.scss']
})
export class BulletinAdhesionComponent implements OnInit, OnDestroy {
  displayFormBulletin = false;
  destroy$ = new Subject<boolean>();
  typeSort = Object.keys(Sort).map(key => ({ label: Sort[key], value: key }));
  adherentSelected: Adherent;
  adherentSelected$: Observable<Adherent>;
  cols: any[];
  tab: number[] = [];
  taux: Taux;
  displayPrestation = false;
  public defaultDate: Date;
  checkControl = true;
  test: Array<SelectItem>;
  bulletinForm: FormGroup;
  questionnaireForm: FormGroup;
  bulletinAdhesionList$: Observable<Array<BulletinAdhesion>>;
  bulletinAdhesionList: Array<BulletinAdhesion>;
  bulletinAdhesion: BulletinAdhesion = {};
  selectedBulletin: BulletinAdhesion[];
  listeBulletin: BulletinAdhesionList = {};
  items: MenuItem[];
  enfants: Enfant[] = [];
  enfant: Enfant = {};
  clonedEnfant: { [s: string]: Enfant; } = {};
  displayReCTO = false;
  displayQuestionAssurer = false;
  displayQuestion = false;
  displayQuestionEpoux = false;
  displayQuestionEnfant = false;
  question: Questionnaire = {};
  epouse: Epouse = {};
  label: string;
  quuestionAssures: Questionnaire[] =[];
  questionEpoux: Questionnaire[] =[];
  situationMarie = SituationFamiliale.MARIE;
  situationFamiliales = [
    {label: 'Marié', value: SituationFamiliale.MARIE},
    {label: 'Célibataire', value: SituationFamiliale.CELIBATAIRE},
    {label: 'Veuf', value: SituationFamiliale.VEUF},
    {label: 'Divorcé', value: SituationFamiliale.DIVORCE},
    {label: 'Séparé', value: SituationFamiliale.SEPARE}
    ];
    defauts = [
      {label: 'NON', value: Defaut.NON},
      {label: 'DEFAUT CONSTITUTION', value: Defaut.DEFAUT_CONSTITUTION},
      {label: 'INFIRMITE', value: Defaut.INFIRMITE},
      {label: 'MALADIE CHRONIQUE', value: Defaut.MALADIE_CHRONIQUE}
    ] ;

    choix = [
      {label: 'NON', value: Choix.NON},
      {label: 'OUI', value: Choix.OUI}
    ] ;
    affectionPasses = [
      {label: 'NON', value: AffectionPasse.NON},
      {label: 'AFFECTION PULMONAIRE', value: AffectionPasse.AFFECTION_PULMONAIRE},
      {label: 'AFFECTION CARDIAQUE', value: AffectionPasse.AFFECTION_CARDIAQUE},
      {label: 'AFFECTION NERVEUSE', value: AffectionPasse.AFFECTION_NERVEUSE},
      {label: 'CANCER', value: AffectionPasse.CANCER},
      {label: 'MALADIE_FOI', value: AffectionPasse.MALADIE_FOI},
      {label: 'RENALE DIABETE', value: AffectionPasse.RENALE_DIABETE}
    ];
    maladieProches = [
      {label: 'NON', value: MaladieProche.NON},
      {label: 'TUBERCULOSE', value: MaladieProche.TUBERCULOSE},
      {label: 'ALIENAtion_MENTALE', value: MaladieProche.ALIENAtion_MENTALE}

    ];
    choi: Choix;
marie = false;
sexe : string = ""; 
index = 0;

  constructor( private store: Store<AppState>,
               private confirmationService: ConfirmationService,
               private formBuilder: FormBuilder,  private messageService: MessageService,  private breadcrumbService: BreadcrumbService) {
                this.breadcrumbService.setItems([{ label: 'Bulletin d\'adhésion'}]);
   }

   get bulletin() {
    return this.bulletinForm.controls.BulletinAdhesion as FormArray;
   }

   get questionnaire() {
    return this.questionnaireForm.controls.BulletinAdhesion as FormArray;
   }


   addItemBulletin(): void {
    const formBulletin: FormGroup = this.createItem();
    this.bulletin.push(formBulletin);
  }

  addItemQuestionnaire(): void {
    const formQuestionnaire: FormGroup = this.createItemQuestionnaire();
    this.questionnaire.push(formQuestionnaire);
  }
  nextPage() {
    this.displayReCTO = true;
  }

  precedentPage() {
    this.displayReCTO = false;
  }
   deleteItemBulletin(i: number) {
    /**verifier si lelements est dans tab */
    for (const f of this.tab){
      if (f === i) {
        this.tab.splice(i);
      }
    }
    if (!this.tab.length) {
      this.checkControl = true;
    }
    this.bulletin.removeAt(i);
   }

   deleteItemQuestionnaire(i: number) {
    /**verifier si lelements est dans tab */
    for (const f of this.tab){
      if (f === i) {
        this.tab.splice(i);
      }
    }
    if (!this.tab.length) {
      this.checkControl = true;
    }
    this.questionnaire.removeAt(i);
   }

   createItem(): FormGroup {
    return this.formBuilder.group({
    id:  new FormControl(),
    dateSaisie:  new FormControl(),
    matriculeAdherent:  new FormControl(),
    adherent:  new FormControl(), 
    nomAdherent:  new FormControl(),
    prenomAdherent:  new FormControl(),
    nomAssurePrin:  new FormControl(),
    prenomAssurePrin:  new FormControl(),
    numeroGroupe:  new FormControl(),
    numeroPolice:  new FormControl(),
    nomGroupeAdherent:  new FormControl(),
    nomPoliceAdherent:  new FormControl(),
    police:  new FormControl(),
    groupe:  new FormControl(),
    raisonSociale:  new FormControl(),
    dateEntreeService:  new FormControl(),
    adresse:  new FormControl(),
    tel:  new FormControl(),
    emploi: new FormControl(),
    lieuNaissance:  new FormControl(),
    situationFamiliale:  new FormControl(),
    enfants:  new FormControl(),
    epouse:  new FormControl(),
    
    });
  }

  createItemQuestionnaire(): FormGroup {
    return this.formBuilder.group({
    id:  new FormControl(),
    poids:  new FormControl(),
    taille:  new FormControl(),
    isSante:  new FormControl(), 
    defaut:  new FormControl(),
    infection:  new FormControl(),
    traitementSuivre:  new FormControl(),
    detailAccident:  new FormControl(),
    maladieAnterieur:  new FormControl(),
    avoirHosp:  new FormControl(),
    natureSoins:  new FormControl(),
    maladieProche:  new FormControl(),
    serviceMilitair:  new FormControl(),
    exempte:  new FormControl(),
    blesse:  new FormControl(),
    pension:  new FormControl(),
    tauxPension:  new FormControl(),
    maladieFemme:  new FormControl(),
    normalCouche: new FormControl(),
    casParticulier:  new FormControl(),
    traitement:  new FormControl(),
    subiAccident:  new FormControl(),
    
    });
  }

  
  ngOnInit(): void {
   
    this.bulletinForm = this.formBuilder.group({
      // domaine: new FormControl({}),
    id:  new FormControl(),
    dateSaisie:  new FormControl(''),
    matriculeAdherent:  new FormControl('', Validators.required),
    adherent:  new FormControl(''), 
    nomAdherent:  new FormControl(''),
    prenomAdherent:  new FormControl(''),
    nomAssurePrin:  new FormControl(''),
    prenomAssurePrin:  new FormControl(''),
    numeroGroupe:  new FormControl(''),
    numeroPolice:  new FormControl(''),
    nomGroupeAdherent:  new FormControl(''),
    nomPoliceAdherent:  new FormControl(''),
    police:  new FormControl(''),
    groupe:  new FormControl(''),
    raisonSociale:  new FormControl(''),
    dateEntreeService:  new FormControl(''),
    adresse:  new FormControl(''),
    tel:  new FormControl(''),
    emploi: new FormControl(''),
    lieuNaissance:  new FormControl(''),
    situationFamiliale:  new FormControl(''),
    nombreEnfant:  new FormControl(''),
    enfants:  new FormControl(''),
    epouse:  new FormControl(''),
   
  
    });

    this.questionnaireForm = this.formBuilder.group({
      id:  new FormControl(''),
      poids:  new FormControl(''),
      taille:  new FormControl(''),
      isSante:  new FormControl(''), 
      defaut:  new FormControl(''),
      infection:  new FormControl(''),
      traitementSuivre:  new FormControl(''),
      detailAccident:  new FormControl(''),
      maladieAnterieur:  new FormControl(''),
      avoirHosp:  new FormControl(''),
      natureSoins:  new FormControl(''),
      maladieProche:  new FormControl(''),
      serviceMilitair:  new FormControl(''),
      exempte:  new FormControl(''),
      blesse:  new FormControl(''),
      pension:  new FormControl(''),
      tauxPension:  new FormControl(''),
      maladieFemme:  new FormControl(''),
      normalCouche: new FormControl(''),
      casParticulier:  new FormControl(''),
      traitement:  new FormControl(''),
      subiAccident:  new FormControl(''),
    });  
    this.bulletinForm.get('dateSaisie').setValue(new Date());
    this.bulletinAdhesionList$ = this.store.pipe(select(selectorsBulletinAdhesion.bulletinAdhesionList));

    this.store.dispatch(featureActionBulletinAdhesion.loadBulletin());
    this.bulletinAdhesionList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      
      if (value) {
        
        this.bulletinAdhesionList = value.slice();
        console.log("==========List==================");
              console.log(this.bulletinAdhesionList);
              console.log("============================");
       
      }
    });

    this.adherentSelected$ = this.store.pipe(select(adherentSelector.selectedAdherent));
    this.store.dispatch(featureActionAdherent.searchAdherent({numero: 0}));
    this.adherentSelected$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
        console.log(value);
        if (value) {
            console.log(value);
            this.adherentSelected = value;
            this.bulletinForm.get('nomAdherent').setValue(this.adherentSelected.nom);
            this.bulletinForm.get('prenomAdherent').setValue(this.adherentSelected.prenom);
            if (this.adherentSelected.adherentPrincipal != null) {
                this.bulletinForm.get('nomAssurePrin').setValue(this.adherentSelected.adherentPrincipal.nom);
                this.bulletinForm.get('prenomAssurePrin').setValue(this.adherentSelected.adherentPrincipal.prenom);
               // this.bulletinForm.get('adherent').setValue(this.adherentSelected);
              } else {
                this.bulletinForm.get('nomAssurePrin').setValue(this.adherentSelected.nom);
                this.bulletinForm.get('prenomAssurePrin').setValue(this.adherentSelected.prenom);
            }
            this.bulletinForm.get('numeroGroupe').setValue(this.adherentSelected.groupe.numeroGroupe);
            this.bulletinForm.get('numeroPolice').setValue(this.adherentSelected.groupe.police.numero);
            this.bulletinForm.get('nomGroupeAdherent').setValue(this.adherentSelected.groupe.libelle);
            this.bulletinForm.get('nomPoliceAdherent').setValue(this.adherentSelected.groupe.police.nom);
            this.bulletinForm.get('police').setValue(this.adherentSelected.groupe.police);
            this.bulletinForm.get('groupe').setValue(this.adherentSelected.groupe);
            this.sexe = this.adherentSelected.genre.code;
        }
    });

   this.enfants = [];
   this.enfant = {};
   this.question = {};
   this.epouse = {};

  }

  addQuestionAssure() {
    this.displayQuestionAssurer = true;
    this.displayQuestion = true;
    this.sexe = this.adherentSelected.genre.code;
    this.label = "Asuuré";
    
  }

  addQuestionEpouse() {
    if(this.sexe =='M') {
      this.sexe = 'F';
    }
    
    if(this.sexe =='F') {
      this.sexe = 'M';
    }
    this.displayQuestionEpoux = true;
    this.displayQuestionAssurer = false;
    this.displayQuestionEnfant = false
    this.displayQuestion = true;
    this.label = "Epouse";
  }

  addQuestionEnfant(index: number) {
    this.displayQuestionEnfant = true;
    this.displayQuestionAssurer = false;
    this.displayQuestionEpoux = false;
    this.displayQuestionEnfant = false
    this.displayQuestion = true;
    this.label = "Enfant";
    this.index  = index;
  }

  viewSituation() {
    
    if(this.bulletinForm.value.situationFamiliale.value == 'MARIE') {
      this.marie = true;
    }
    else{
      this.marie = false;
    }
  }

  viewnombreEnfant() {
    this.bulletinForm.value.nombreEnfant
  }
  enregistrer() {
    this.question = this.questionnaireForm.value;
    this.question.isSante= this.questionnaireForm.value?.isSante?.value;
    this.question.defaut= this.questionnaireForm.value?.defaut?.value;
    this.question.infection= this.questionnaireForm.value?.infection?.value;
    this.question.traitementSuivre = this.questionnaireForm.value?.traitementSuivre?.value;
    this.question.subiAccident= this.questionnaireForm.value?.subiAccident?.value;
    this.question.avoirHosp= this.questionnaireForm.value?.avoirHosp?.value;
    this.question.maladieProche= this.questionnaireForm.value?.maladieProche?.value;
    this.question.normalCouche= this.questionnaireForm.value?.normalCouche?.value;
    this.question.blesse= this.questionnaireForm.value?.blesse?.value;
  console.log(this.question);
   
    if(this.displayQuestionAssurer) {
      this.quuestionAssures = [];
      this.bulletinForm.value.question  = this.question;
      console.log(this.bulletinAdhesion.question);
      this.quuestionAssures.push(this.question);
      this.displayQuestionAssurer = false;
     
    }
    if(this.displayQuestionEpoux) {
      this.questionEpoux = [];
      this.epouse.question  = this.question;
      this.questionEpoux.push(this.question);
      this.displayQuestionEpoux = false;
    } 
     if(this.displayQuestionEnfant) {
      this.enfants[this.index].question  = this.question;
      console.log(this.enfants[this.index].question);
    }
    this.questionnaireForm.reset();
  }

  editQuestion(question: Questionnaire) {
    this.displayQuestionAssurer = true;
    this.displayQuestion = true;
    this.question = {...question};
    this.questionnaireForm.patchValue(this.question);
  }

  editQuestionEpoux(question: Questionnaire) {
    console.log(question);
    this.displayQuestionAssurer = false;
    this.displayQuestionEnfant = true;
    this.displayQuestionEpoux = false;
    this.displayQuestion = true;
    this.question = {...question};
    this.questionnaireForm.patchValue(this.question);
  }

  editQuestionEnfant(question: Questionnaire, index: number) {
    console.log(question);
    this.displayQuestionAssurer = false;
    this.displayQuestionEnfant = true;
    this.displayQuestionEpoux = false;
    this.displayQuestion = true;
    this.question = {...question};
    this.questionnaireForm.patchValue(this.question);
    this.index = index;
  }


  annulerQuestion() {
    this.questionnaireForm.reset();
    this.displayQuestion = false;
  }

  addBulletin() {
    this.bulletinAdhesion = {};
    this.displayFormBulletin = true;
    }

    

     deleteSelectedBulletin () {
      this.listeBulletin.bulletinAdhesionList = this.selectedBulletin;
      console.log(this.selectedBulletin);
      this.confirmationService.confirm({
        message: 'Etes vous sur de vouloir supprimer ces bulletins?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.store.dispatch(featureActionBulletinAdhesion.deleteBulletins(this.listeBulletin));
        }
      });
    }


    editBulletin(bulletin: BulletinAdhesion) {
      
     // this.bulletinAdhesion.dateSaisie = bulletin.dateSaisie;
      this.bulletinAdhesion = {...bulletin};
      this.bulletinForm.patchValue(this.bulletinAdhesion);
      this.quuestionAssures = [];
      this.questionEpoux = [];
      this.quuestionAssures.push(bulletin.question);
      this.questionEpoux.push(bulletin.epouse.question);
      this.epouse = bulletin.epouse;
      this.epouse.dateNaissanceEpoux = bulletin?.epouse?.dateNaissanceEpoux;
      console.log("===========", this.bulletinForm.value);
      if(bulletin.situationFamiliale == 'MARIE') {
        this.marie = true;
      }
      this.displayFormBulletin = true;
      }

      closeDialog() {
        this.displayFormBulletin = false;
        this.bulletinForm.reset();
      }
     
      onCreate() {
        this.bulletinAdhesion = this.bulletinForm.value;
        this.bulletinAdhesion.enfants = this.enfants;
        this.bulletinAdhesion.epouse = this.epouse;
        this.bulletinAdhesion.situationFamiliale= this.bulletinForm.value.situationFamiliale.value;
        console.log(this.bulletinAdhesion);
          this.confirmationService.confirm({
          message: 'Etes vous sur de vouloir ajouter ce bulletin?',
          header: 'Confirmation',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            if (this.bulletinAdhesion.id) {
              console.log(this.bulletinForm.value);
              this.store.dispatch(featureActionBulletinAdhesion.updateBulletin(this.bulletinAdhesion));
              console.log(this.bulletinForm.value);
              // this.displayFormBulletin = false;
            }else{

            this.store.dispatch(featureActionBulletinAdhesion.createBulletin(this.bulletinAdhesion));
            console.log(this.bulletinAdhesion);
            }
            this.bulletinForm.reset();
          } 
        }); 
        }

        deleteBulletin(bulletin: BulletinAdhesion) {
          this.confirmationService.confirm({
            message: 'Etes vous sur de vouloir supprimer?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.store.dispatch(featureActionBulletinAdhesion.deleteBulletin(bulletin));
            }
        });
        }


        rechercherAdherent(event) {
          console.log(event.target.value);
          this.bulletinForm.get('nomAdherent').setValue('');
          this.bulletinForm.get('prenomAdherent').setValue('');
          this.bulletinForm.get('nomAssurePrin').setValue('');
          this.bulletinForm.get('prenomAssurePrin').setValue('');
          this.bulletinForm.get('numeroGroupe').setValue('');
          this.bulletinForm.get('numeroPolice').setValue('');
          this.bulletinForm.get('nomGroupeAdherent').setValue('');
          this.bulletinForm.get('nomPoliceAdherent').setValue('');
          this.adherentSelected = null;
          this.store.dispatch(featureActionAdherent.searchAdherent({numero: event.target.value}));
        
      }

      addEnfant() {
        this.enfants.push(this.enfant);
      }

      editEnfant(enfant: Enfant) {
        this.clonedEnfant[enfant.id] = {...enfant};
        
      }
    
      onRowEditSaveEnfant(enfant: Enfant,  index: number) {
        console.log(index)
       delete this.clonedEnfant[index];
       this.messageService.add({severity:'success', summary: 'Success', detail:'enfant ajout'});
       
      }
    
      onRowEditCancelEnfant(enfant: Enfant, index: number) {
        this.enfants[index] = this.clonedEnfant[enfant.id];
        delete this.clonedEnfant[enfant.id];
      }
      
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}
