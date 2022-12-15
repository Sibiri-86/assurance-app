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
import * as loadListeActualisee from '../../../store/contrat/adherent/actions';
import { AdherentService } from 'src/app/store/contrat/adherent/service';



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
  adherantFamilles: Array<Adherent>;
  adherantEnfants: Array<Adherent>;
  adherantEpoux: Array<Adherent>;
  adherantFamilles$: Observable<Array<Adherent>>;
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
  BulletinDetail: BulletinAdhesion = {};
  items: MenuItem[];
  enfants: Adherent[] = [];
  enfant: Adherent = {};
  enfantDetail: Adherent = {};
  clonedEnfant: { [s: string]: Adherent; } = {};
  displayReCTO = false;
  displayQuestionAssurer = false;
  displayQuestion = false;
  displayQuestionEpoux = false;
  displayQuestionEnfant = false;
  displayDetailBulletin = false;
  displayDetailQuestion = false;
  displayQuestionDetailEnfant = false;
  question: Questionnaire = {};
  epouses: Adherent[] = [];
  epouse: Adherent = {};
  label: string;
  quuestionAssures: Questionnaire[] =[];
  questionEpoux: Questionnaire[] =[];
  questionsEpoux: Questionnaire[] =[];
  quuestionsAssures: Questionnaire[] =[];
  questionnaireDetail: Questionnaire = {};
  situationMarie = SituationFamiliale.MARIE;
  date: Date = new Date();
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
sexeE : string = ""; 
index = -1;
inde = -1;
isSaving = false;

  constructor( private store: Store<AppState>,
               private confirmationService: ConfirmationService,
               private adherentService: AdherentService,
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
    sexe: new FormControl(),
    dateIncorporation: new FormControl(),
    
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
    nomAdherent:  new FormControl(),
    prenomAdherent:  new FormControl(),
    nomAssurePrin:  new FormControl(),
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
    sexe: new FormControl(''),
    dateIncorporation: new FormControl(),
  
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
    this.enfants = [];
   this.enfant = {};
   this.question = {};
   this.epouse = {};
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
            this.marie = false;
            this.bulletinForm.get('nomAdherent').setValue(this.adherentSelected.nom.concat(" ").concat(this.adherentSelected.prenom));
           
            if (this.adherentSelected.adherentPrincipal != null) {
                this.bulletinForm.get('nomAssurePrin').setValue(this.adherentSelected.adherentPrincipal.nom.concat(" ").concat(this.adherentSelected.adherentPrincipal.prenom));
                
              } else {
                this.bulletinForm.get('nomAssurePrin').setValue(this.adherentSelected.nom.concat(" ").concat(this.adherentSelected.prenom));

                this.adherentService.findFamilleByAdherent(value.id, this.bulletinForm.get('dateIncorporation').value).subscribe((rest)=>{
                  console.log("==============rest========",rest);
                  this.adherantFamilles = rest;
                  this.adherantEnfants = this.adherantFamilles.filter(ad=>ad.qualiteAssure.code === "ENFANT");
                  this.bulletinForm.get('nombreEnfant').setValue(this.adherantEnfants?.length);
                  this.enfants = this.adherantEnfants;
                  this.adherantEpoux= this.adherantFamilles.filter(ad=>ad.qualiteAssure.code === "CONJOINT");
                    this.epouses = this.adherantEpoux;
                  if(this.epouses.length > 0) {
                    
                    console.log("======================");
                    console.log(this.epouses);

                    this.marie = true;
                    this.bulletinForm.get('situationFamiliale').setValue(this.situationFamiliales.find(situ=>situ.value == SituationFamiliale.MARIE));
                  }
                });
                
            }
            this.bulletinForm.get('numeroGroupe').setValue(this.adherentSelected.groupe.numeroGroupe);
            this.bulletinForm.get('numeroPolice').setValue(this.adherentSelected.groupe.police.numero);
            this.bulletinForm.get('nomGroupeAdherent').setValue(this.adherentSelected.groupe.libelle);
            this.bulletinForm.get('nomPoliceAdherent').setValue(this.adherentSelected.groupe.police.nom);
            this.bulletinForm.get('police').setValue(this.adherentSelected.groupe.police);
            this.bulletinForm.get('groupe').setValue(this.adherentSelected.groupe);
            this.bulletinForm.get('sexe').setValue(this.adherentSelected.genre.code);
            this.bulletinForm.get('adresse').setValue(this.adherentSelected.adresse);
            this.bulletinForm.get('adresse').setValue(this.adherentSelected.adresseEmail);
            this.bulletinForm.get('tel').setValue(this.adherentSelected.numeroTelephone);
            this.bulletinForm.get('emploi').setValue(this.adherentSelected?.profession?.description);
            this.bulletinForm.get('lieuNaissance').setValue(this.adherentSelected.lieuNaissance);
            this.bulletinForm.get('raisonSociale').setValue(this.adherentSelected.groupe?.police?.nom);
            this.sexe = this.adherentSelected.genre.code;

        }
    });

   

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
  updateEpoux(epoux: Adherent, index: number) {
    this.sexe = epoux?.genre?.code;
    this.displayQuestionEpoux = true;
    this.displayQuestionAssurer = false;
    this.displayQuestionEnfant = false
    this.displayQuestion = true;
    this.epouse = epoux;
    this.inde = index;
   
    this.questionnaireForm.patchValue(epoux.question);
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
      if(this.inde !== - 1) {
     
        this.epouses[this.inde] = this.epouse;
      } 
      // this.questionEpoux.push(this.question);
      console.log("========================");
      console.log(this.questionEpoux);
      this.displayQuestionEpoux = false;
    } 
     
    this.questionnaireForm.reset();
    this.displayQuestionEpoux = false;
    this.displayQuestionEnfant = false;
    this.displayQuestionAssurer = false;
    this.displayQuestion = false;
  }


  ajouterEnfant() {
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
    this.enfant.question = this.question;
    
    console.log(this.index);
    
    if(this.index !== - 1) {
     
      this.enfants[this.index] = this.enfant;
    } else{
      this.enfants.push(this.enfant);
    }
   
    
    this.enfant = {};
    this.questionnaireForm.reset();
    console.log("valeur",this.bulletinForm.value.nombreEnfant);
    console.log("valeur1",this.enfants.length);
    if(this.enfants.length == this.bulletinForm.value.nombreEnfant) {
      this.displayQuestionEnfant = false ;
    }
    
   
  }
  updateEnfant(enfant: Adherent, index: number) {
    this.displayQuestionEpoux = false;
    this.displayQuestionAssurer = false;
    this.displayQuestionEnfant = true;
    this.enfant = enfant;
    this.index = index;
    console.log(this.index);
    console.log(index);
    this.questionnaireForm.patchValue(enfant.question);
  }

  editQuestion(question: Questionnaire) {
    this.displayQuestionAssurer = true;
    this.displayQuestion = true;
    this.question = {...question};
    this.questionnaireForm.patchValue(this.question);
  }

  retireQuestion(question: Questionnaire) {
   
      console.log("===================");
    console.log(question);
    console.log("===================");
    this.quuestionAssures =[];
    console.log("===================");
    console.log(this.quuestionAssures);
    console.log("===================");
    
  }

  editQuestionEpoux(question: Questionnaire) {
    console.log(question);
    this.displayQuestionAssurer = false;
    this.displayQuestionEnfant = false;
   
    this.displayQuestionEpoux = true;
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
    this.bulletinForm.get('dateSaisie').setValue(new Date());
    this.epouses = [];
    this.enfants = [];
    this.marie = false;
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
      this.displayFormBulletin = true;
     // this.bulletinAdhesion.dateSaisie = bulletin.dateSaisie;
     console.log("===========", bulletin);
  
      this.bulletinAdhesion = {...bulletin};
      this.bulletinForm.patchValue(this.bulletinAdhesion);
      this.bulletinForm.get('dateSaisie').setValue(new Date(bulletin.dateSaisie));
      this.bulletinForm.get('dateEntreeService').setValue(bulletin.dateEntreeService);
     //  this.bulletinForm.get('situationFamiliale').setValue(bulletin.situationFamiliale);
      this.quuestionAssures = [];
      this.questionEpoux = [];
      this.quuestionAssures.push(bulletin.question);
     // this.questionEpoux.push(bulletin.epouse);
      this.epouses = bulletin.epouses;
     // this.epouse.dateNaissanceEpoux = new Date(bulletin.epouses.dateNaissanceEpoux);
 
      this.enfants = bulletin.enfants;
      
      if(bulletin.situationFamiliale == 'MARIE') {
        this.marie = true;
      }
     
      }

      closeDialog() {
        this.displayFormBulletin = false;
        this.bulletinForm.reset();
        this.epouse = {};

      }
     
      onCreate() {
        this.bulletinAdhesion = this.bulletinForm.value;
        this.bulletinAdhesion.enfants = this.enfants;
        this.bulletinAdhesion.epouses = this.epouses;
        this.bulletinAdhesion.situationFamiliale = this.bulletinForm.value?.situationFamiliale?.value;
        console.log(this.bulletinAdhesion);
        console.log(this.bulletinForm.value);
          this.confirmationService.confirm({
          message: 'Etes vous sur de vouloir ajouter ce bulletin?',
          header: 'Confirmation',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            if (this.bulletinAdhesion.id) {
              console.log(this.bulletinAdhesion);
              this.bulletinAdhesion.question = this.quuestionAssures[0];
              this.store.dispatch(featureActionBulletinAdhesion.updateBulletin(this.bulletinAdhesion));
              console.log(this.bulletinForm.value);
              // this.displayFormBulletin = false;
             
            }else{

            this.store.dispatch(featureActionBulletinAdhesion.createBulletin(this.bulletinAdhesion));
           
            }
            this.bulletinForm.reset();
            this.quuestionAssures = [];
            this.questionEpoux = [];
           this.enfants = [];
           this.epouse = {};
           this.epouses = [];
           this.enfants = [];
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

        voirBulletin(bulletin: BulletinAdhesion) {
          this.questionsEpoux = [];
          this.quuestionsAssures = [];
          
          console.log(bulletin);
          this.BulletinDetail = bulletin;
         // this.questionsEpoux.push(bulletin.epouse.question);
          this.quuestionsAssures.push(bulletin.question);

          // this.enfants = this.BulletinDetail.enfants;
          
          this.displayDetailBulletin = true;
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
          console.log(this.bulletinForm.get('dateIncorporation').value);
          this.adherentSelected = null;
          this.store.dispatch(featureActionAdherent.searchAdherentByDateSoinsAndMatricule({dateSoins:this.bulletinForm.get('dateIncorporation').value, matricule: event.target.value}));
        
      }

      addEnfant() {
        // this.enfant.id = this.enfants.length + 1;
       // this.enfants.push(this.enfant);
       this.displayQuestionEnfant = true;
      }

      editEnfant(enfant: Adherent) {
        console.log(this.enfants);
        console.log(enfant);
        this.clonedEnfant[enfant.id] = {...enfant};
        
      }
    
      onRowEditSaveEnfant(enfant: Adherent, index: number) {
         // enfant.question = ;
         if(enfant.id === null) {
           this.enfants = this.enfants.filter(enf=> enf !== this.enfants[index]);
         }
         console.log(this.enfants);
        this.enfants[index] = enfant;
      // delete this.clonedEnfant[enfant.id];
       this.messageService.add({severity:'success', summary: 'Success', detail:'enfant ajout'});
       
      }
    
      onRowEditCancelEnfant(enfant: Enfant, index: number) {
        
        this.enfants[index] = this.clonedEnfant[enfant.id];
        delete this.clonedEnfant[enfant.id];
      }
      voirQuestionEpoux(question: Questionnaire , sexe: string) {
        this.questionnaireDetail = question;
        this.sexe = sexe;
        this.displayDetailQuestion = true;
        
      }

      voirQuestion(question: Questionnaire, sexe: string) {
        this.questionnaireDetail = question;
        this.sexe = sexe;
        this.displayDetailQuestion = true;
      }

      VoirEnfant(enfant: Adherent) {
        this.enfantDetail = enfant;
        this.enfantDetail.dateNaissance = new Date(enfant.dateNaissance);
        this.displayQuestionDetailEnfant = true;
      }
      
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}
