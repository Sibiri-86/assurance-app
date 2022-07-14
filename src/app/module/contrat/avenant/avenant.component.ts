import {Component, OnDestroy, OnInit} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {Police, Rapport, Report} from '../../../store/contrat/police/model';
import {Exercice} from '../../../store/contrat/exercice/model';
import {Groupe} from '../../../store/contrat/groupe/model';
import * as featureAction from '../../../store/contrat/police/actions';
import {policeList, rapport, selectByteFile} from '../../../store/contrat/police/selector';
import {ConfirmationService, MenuItem, MessageService} from 'primeng/api';
import {groupeList} from '../../../store/contrat/groupe/selector';
import {Adherent, AdherentFamille} from '../../../store/contrat/adherent/model';
import {Pays} from '../../../store/parametrage/pays/model';
import {Taux} from '../../../store/parametrage/taux/model';
import {Genre} from '../../../store/parametrage/genre/model';
import {Profession} from '../../../store/parametrage/profession/model';
import {QualiteAssure} from '../../../store/parametrage/qualite-assure/model';
import {Territorialite} from '../../../store/parametrage/territorialite/model';
import {Garantie} from '../../../store/parametrage/garantie/model';
import {SousActe} from '../../../store/parametrage/sous-acte/model';
import {Acte} from '../../../store/parametrage/acte/model';
import {Departement} from '../../../store/parametrage/departement/model';
import {DimensionPeriode} from '../../../store/parametrage/dimension-periode/model';
import {Commune} from '../../../store/parametrage/commune/model';
import {TypePrime} from '../../../store/parametrage/type-prime/model';
import {Region} from '../../../store/parametrage/region/model';
import {SecteurActivite} from '../../../store/parametrage/secteur-activite/model';
import {Observable, Subject, Subscription} from 'rxjs';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {props, select, Store} from '@ngrx/store';
import {AppState} from 'src/app/store/app.state';
import {loadPays} from '../../../store/parametrage/pays/actions';
import * as paysSelector from '../../../store/parametrage/pays/selector';

import {loadRegion} from '../../../store/parametrage/region/actions';
import * as regionSelector from '../../../store/parametrage/region/selector';

import * as departementSelector from '../../../store/parametrage/departement/selector';
import {loadDepartement} from '../../../store/parametrage/departement/actions';

import * as communeSelector from '../../../store/parametrage/commune/selector';
import {loadCommune} from '../../../store/parametrage/commune/actions';

import {loadTaux} from '../../../store/parametrage/taux/actions';
import * as tauxSelector from '../../../store/parametrage/taux/selector';
import {loadTypeAvenant} from '../../../store/parametrage/type-avenant/actions';
import * as avenantSelector from '../../../store/parametrage/type-avenant/selector';
import {loadTerritorialite} from '../../../store/parametrage/territorialite/actions';
import * as territorialiteSelector from '../../../store/parametrage/territorialite/selector';

import {loadGarant} from '../../../store/contrat/garant/actions';
import * as garantSelector from '../../../store/contrat/garant/selector';
import * as featureActionGroupe from '../../../store/contrat/groupe/actions';
import {loadIntermediaire} from '../../../store/contrat/intermediaire/actions';
import * as intermediaireSelector from '../../../store/contrat/intermediaire/selector';

import * as professionSelector from '../../../store/parametrage/profession/selector';

import {Garant} from '../../../store/contrat/garant/model';
import {Intermediaire,} from '../../../store/contrat/intermediaire/model';
import {TypeAvenant} from 'src/app/store/parametrage/type-avenant/model';
import {loadSecteurActivite} from '../../../store/parametrage/secteur-activite/actions';
import * as secteurActiviteSelector from '../../../store/parametrage/secteur-activite/selector';
import {loadDimensionPeriode} from '../../../store/parametrage/dimension-periode/actions';
import * as dimensionPeriodeSelector from '../../../store/parametrage/dimension-periode/selector';

import {loadPoliceByAffaireNouvelle} from 'src/app/store/contrat/police/actions';
import {loadGroupe} from 'src/app/store/contrat/groupe/actions';

import {loadGarantie} from '../../../store/parametrage/garantie/actions';
import * as garantieSelector from '../../../store/parametrage/garantie/selector';

import {loadActe} from '../../../store/parametrage/acte/actions';
import * as acteSelector from '../../../store/parametrage/acte/selector';
import {loadSousActe} from '../../../store/parametrage/sous-acte/actions';
import * as sousActeSelector from '../../../store/parametrage/sous-acte/selector';

import {loadGenre} from '../../../store/parametrage/genre/actions';
import * as genreSelector from '../../../store/parametrage/genre/selector';
import * as featureActionsPlafond from '../../../store/contrat/plafond/action';

import {loadQualiteAssure} from '../../../store/parametrage/qualite-assure/actions';
import * as qualiteAssureSelector from '../../../store/parametrage/qualite-assure/selector';

import {Status} from '../../../store/global-config/model';
import {status} from '../../../store/global-config/selector';
import {EntityValidations} from '../../common/models/validation';
import {BreadcrumbService} from '../../../app.breadcrumb.service';

import {loadTypePrime} from '../../../store/parametrage/type-prime/actions';
import * as typePrimeSelector from '../../../store/parametrage/type-prime/selector';
import {PlafondActe, PlafondFamilleActe, PlafondSousActe} from '../../../store/parametrage/plafond/model';
import {Plafond} from 'src/app/store/contrat/plafond/model';
import {PoliceService} from '../../../store/contrat/police/service';
import * as adherentSelector from '../../../store/contrat/adherent/selector';
import * as featureActionAdherent from '../../../store/contrat/adherent/actions';

import * as featureActionHistoriqueAdherant from '../../../store/contrat/historiqueAvenant/actions';
import * as historiqueAvenantSelector from '../../../store/contrat/historiqueAvenant/selector';
import * as historiqueAvenantAction from '../../../store/contrat/historiqueAvenant/actions';
import * as groupeSlector from '../../../store/contrat/groupe/selector';

import {
  Avenant,
  AvenantModification,
  HistoriqueAvenant,
  HistoriqueAvenantAdherant,
  HistoriqueAvenantList,
  HistoriqueAvenantPrime,
  HistoriquePlafond,
  HistoriquePlafondActe,
  HistoriquePlafondFamilleActe,
  HistoriquePlafondSousActe,
  TypeDemandeur,
  TypeHistoriqueAvenant,
} from '../../../store/contrat/historiqueAvenant/model';
import {loadProfession} from '../../../store/parametrage/profession/actions';
import {HistoriqueAvenantService} from '../../../store/contrat/historiqueAvenant/service';
import {HistoriqueAvenantAdherentService} from '../../../store/contrat/historiqueAvenantAdherent/service';
import {TypeReport} from '../../../store/contrat/enum/model';
import {printPdfFile, removeBlanks} from '../../util/common-util';
import {AdherentService} from '../../../store/contrat/adherent/service';
import * as exerciceSelector from '../../../store/contrat/exercice/selector';
import * as featureExerciceAction from '../../../store/contrat/exercice/actions';
import { PlafondService } from 'src/app/store/contrat/plafond/service';
import { GroupeService } from 'src/app/store/contrat/groupe/service';
// import * from 


/*
  la partie avenant utilise des composants réutilisables.
  chaque type d'avenant est un composant réutilisable avec des entrée et des sorties.
  exemple: <app-avenant-incorporation> <app-avenant-incorporation> pour avenant d'incorporation
*/
@Component({
  selector: 'app-avenant',
  templateUrl: './avenant.component.html',
  styleUrls: ['./avenant.component.scss'],
})
export class AvenantComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();
  cols: any[];
  colsAL: any[];
  policeList$: Observable<Array<Police>>;
  policeList1$: Subscription;
  policeList: Police[];
  valCheck: string[] = [];
  groupeList$: Observable<Array<Groupe>>;
  groupeList: Array<Groupe>;
  avenantList$: Observable<Array<TypeAvenant>>;
  avenantList: Array<TypeAvenant>;
  groupeListFilter: Array<Groupe>;
  plafond: Plafond;
  paysList$: Observable<Array<Pays>>;
  police: Police;
  historiqueAvenant: HistoriqueAvenant;
  exercice: Exercice;
  selectedPolices: Police[];
  displayDialogFormPolice = false;
  displayDialogFormAddAdherent = false;
  displayDialogFormGroupe = false;
  policeForm: FormGroup;
  groupeForm: FormGroup;
  plafondForm: FormGroup;
  customForm: FormGroup;
  primeForm: FormGroup;
  adherentForm: FormGroup;
  adherentFamilleForm: FormGroup;
  statusObject$: Observable<Status>;
  entityValidations: Array<EntityValidations>;
  loading: boolean;
  dateEffet: Date;
  dateEcheance: Date;
  dissplayavenant = false;
  adherentListGroupe: Array<Adherent>;
  isNewGroupe = false;
  stat: Rapport;
  tauxList$: Observable<Array<Taux>>;
  tauxList: Array<Taux>;
  viewStat = false;
  garantList$: Observable<Array<Garant>>;
  garantList: Array<Garant>;

  intermediaireList$: Observable<Array<Intermediaire>>;
  intermediaireList: Array<Intermediaire>;

  territorialiteList$: Observable<Array<Territorialite>>;
  territorialiteList: Array<Territorialite>;
  sousActeList$: Observable<Array<SousActe>>;
  sousActeList: Array<SousActe>;
  acteList$: Observable<Array<Acte>>;
  acteList: Array<Acte>;
  adherentList: Array<Adherent>;
  adherentFamilleList: Array<Adherent>;
  paysList: Array<Pays>;
  regionList$: Observable<Array<Region>>;
  regionList: Array<Region>;
  departementList$: Observable<Array<Departement>>;
  departementList: Array<Departement>;
  communeList$: Observable<Array<Commune>>;
  communeList: Array<Commune>;
  secteurActiviteList$: Observable<Array<SecteurActivite>>;
  secteurActiviteList: Array<SecteurActivite>;
  dimensionPeriodeList$: Observable<Array<DimensionPeriode>>;
  dimensionPeriodeList: Array<DimensionPeriode>;
  displayDialogFormAddGroupe = false;
  displayDialogFormAdherent = false;
  displayDialogFormAdherentIncorp = false;
  displayDialogFormAdherentResiliation = false;
  displayDialogFormAdherentRetrait = false;
  displayDialogFormAdherentAffaireNouvelle = false;
  displayDialogFormAdherentModification = false;
  displayDialogFormAdherentrenouvellement = false;
  displayDialogFormAdherentSuspension = false;
  clonedPlafondFamilleActe: { [s: string]: PlafondFamilleActe } = {};
  clonedAdherentFamille: { [s: string]: Adherent } = {};
  clonedPlafondActe: { [s: string]: PlafondActe } = {};
  clonedPlafondFamilleActeTemp: { [s: string]: PlafondFamilleActe } = {};
  clonedPlafondSousActe: { [s: string]: PlafondSousActe } = {};
  plafondFamilleActe: Array<PlafondFamilleActe>;
  plafondFamilleActeTemp: PlafondFamilleActe;
  plafondFamilleActeConstruct: Array<PlafondFamilleActe> = [];
  plafondActe: Array<PlafondActe>;
  plafondSousActe: Array<PlafondSousActe>;
  typePrimeList: Array<TypePrime>;
  typePrimeList$: Observable<Array<TypePrime>>;
  garanties: Array<Garantie>;
  garantieList$: Observable<Array<Garantie>>;
  genreList: Array<Genre>;
  genreList$: Observable<Array<Genre>>;
  professionList: Array<Profession>;
  professionList$: Observable<Array<Profession>>;
  qualiteAssureList: Array<QualiteAssure>;
  qualiteAssureList$: Observable<Array<QualiteAssure>>;
  parametrageActe = false;
  parametragePrime = false;
  infosGroupe = true;
  selectedTypePrime: TypePrime = {};
  groupe: Groupe = {};
  items: MenuItem[];
  activeItem: MenuItem;
  index = 0;
  displaySousActe = false;
  indexeActe: number;
  countfamilleActe = 0;
  typeDureeSelected: string;
  displayParametragePlafond = false;
  domaineSelected: QualiteAssure;
  typeAvenantSelected: string;
  typeDuree: any = [{label: 'Jour', value: 'Jour'},
    {label: 'Mois', value: 'Mois'}, {label: 'Année', value: 'Annee'}];
  typeActions: MenuItem[] = [];
  typeAvenants: MenuItem[] = [];
  selectedGroup: Groupe;
  groupePolicy: Array<Groupe>;
  groupeView: Array<Groupe>;
  policeItem: Police;
  adherentList$: Observable<Array<Adherent>>;
  adherant: AdherentFamille;
  adherantGroupeListe: Array<AdherentFamille> = [];
  historiqueAvenants: Array<HistoriqueAvenant>;
  adherentsListeActuelle: Array<Adherent> = [];
  adherentsListeActuelleByExercice:  Array<Adherent> = [];
  adherentsListeActuelleByExerciceRetirer: Array<Adherent> = [];
  adherentsListeActuelleRetirer: Array<Adherent> = [];
  displayALA = false;
  displayPrimeTotalePolice = false;
  curentGroupe: Groupe;
  historiqueAhenantAdherants: Array<HistoriqueAvenantAdherant>;
  isAvenantIncorporation = false;
  isAvenantRetrait = false;
  isAvenantModification = false;
  isAvenantRenouvellement = false;
  isAvenantResiliation = false;
  isAvenantSuspension = false;
  isAvenantFacturation = false;
  historiqueAvenantListWithoutActiveList$: Observable<Array<HistoriqueAvenant>>;
  historiqueAvenantListWithoutActiveList: Array<HistoriqueAvenant>;
  historiqueAvenantList$: Observable<Array<HistoriqueAvenant>>;
  historiqueAvenantList: Array<HistoriqueAvenant>;
  historiqueAvenants1: Array<HistoriqueAvenant>;
  historiqueAvenants1$: Observable<any>;
  historiqueAvenantAdherents: Array<HistoriqueAvenantAdherant>;
  historiqueAvenantAdherent1s: Array<HistoriqueAvenantAdherant>;
  historiqueAvenantAdherents1: Array<HistoriqueAvenantAdherant>;
  historiqueAvenantAdherents2: Array<HistoriqueAvenantAdherant>;
  historiqueAvenantAdherents3: Array<HistoriqueAvenantAdherant>;
  historiqueAvenantAdherents4: Array<HistoriqueAvenantAdherant>;
  historiqueAvenantAdherents5: Array<HistoriqueAvenantAdherant>;
  historiqueAvenantAdherents6: Array<HistoriqueAvenantAdherant>;
  report: Report = {};
  avenantModification: AvenantModification = {};
  historiquePlafondFamilleActeList$: Observable<Array<HistoriquePlafondFamilleActe>>;
  historiquePlafondFamilleActeList: Array<HistoriquePlafondFamilleActe> = [];
  historiquePlafondActeList$: Observable<Array<HistoriquePlafondActe>>;
  historiquePlafondActeList: Array<HistoriquePlafondActe> = [];
  historiquePlafondSousActeList$: Observable<Array<HistoriquePlafondSousActe>>;
  historiquePlafondSousActeList: Array<Territorialite> = [];
  historiquePlafondList$: Observable<Array<HistoriquePlafond>>;
  historiquePlafondList: Array<HistoriquePlafondActe> = [];
  avenantModif: Avenant = {};
  historiqueAvenantPrimes: HistoriqueAvenantPrime[] = [];
  historiqueAvenantPrime: HistoriqueAvenantPrime = {};
  displayDialogPrime = false;
  avenantModif1: Avenant = {};
  private primetotal = 0;
  infosPolice = false;
  private clonedPPrime: { [s: string]: HistoriqueAvenantPrime; } = {};
  private historiqueAvenantPrimesTMP: HistoriqueAvenantPrime[] = [];
  exerciceList$: Observable<Array<Exercice>>;
  exerciceList: Array<Exercice>;
  curentExercice: Exercice = {};
  etat = 'CREATE';
  entete = '';
  historiqueAvenat: HistoriqueAvenant = {};
  statList$: Observable<any>;
  statList: Subscription;
  viewPolice: Police;
  displayViewContrat = false;
  groupePlafongConfig: Groupe = {};
  adherentHisChecked : HistoriqueAvenantAdherant;
  displayImpGroupe = false;
  listGroupe: Array<Groupe> = [];
  groupeListes: Array<Groupe>;
  groupeSelect: Groupe = {};
  avenantItem: HistoriqueAvenant; 
  historiqueRev: HistoriqueAvenant;
  historiqueGroupeRev: Groupe[] = [];
  exerciceRev: Exercice = {};
  // historiquePlafondActeList$: Observable<HistoriquePlafondActe[]>
  constructor(
      private formBuilder: FormBuilder,
      private store: Store<AppState>,
      private messageService: MessageService,
      private confirmationService: ConfirmationService,
      private breadcrumbService: BreadcrumbService,
      private policeService: PoliceService,
      private historiqueAvenantService: HistoriqueAvenantService,
      private historiqueAvenantAdherentService: HistoriqueAvenantAdherentService,
      private adherentService: AdherentService,
      private plafondService: PlafondService,
      private groupeService: GroupeService
  ) {

    this.plafondForm = this.formBuilder.group({
      domaine: new FormControl(''),
      plafondAnnuelleFamille: new FormControl(''),
      plafondAnnuellePersonne: new FormControl('')
    });

    this.adherentForm = this.formBuilder.group({
      id: new FormControl(''),
      nom: new FormControl('', [Validators.required]),
      prenom: new FormControl('', [Validators.required]),
      dateNaissance: new FormControl('', [Validators.required]),
      matricule: new FormControl(''),
      lieuNaissance: new FormControl('', [Validators.required]),
      numeroTelephone: new FormControl('', [Validators.required]),
      adresse: new FormControl('', [Validators.required]),
      adresseEmail: new FormControl('', [Validators.required]),
      profession: new FormControl('', [Validators.required]),
      referenceBancaire: new FormControl(''),
      qualiteAssure: new FormControl('', [Validators.required]),
      genre: new FormControl('', [Validators.required]),
      dateIncorporation: new FormControl('', [Validators.required]),
      dateEntree: new FormControl('', [Validators.required])
    });

    this.policeForm = this.formBuilder.group({
      id: new FormControl(''),
      garant: new FormControl('', [Validators.required]),
      intermediaire: new FormControl('', [Validators.required]),
      // numero: new FormControl('',[Validators.required]),
      taux: new FormControl(null, [Validators.required]),
      territorialite: new FormControl('', [Validators.required]),
      typeDuree: new FormControl('', [Validators.required]),
      duree: new FormControl('', [Validators.required]),
      dateEffet: new FormControl('', [Validators.required]),
      dateEcheance: new FormControl({value: '', disabled: true}, [Validators.required]),
      adressePostale: new FormControl('', [Validators.required]),
      // dateSaisie: new FormControl('',[Validators.required]),
      // dateValidation: new FormControl('',[Validators.required]),
      nom: new FormControl('', [Validators.required]),
      // code: new FormControl('',[Validators.required]),
      contact: new FormControl('', [Validators.required]),
      adresseEmail: new FormControl(null, [Validators.required]),
      personneRessource: new FormControl('', [Validators.required]),
      secteurActivite: new FormControl('', [Validators.required]),
      numeroIfu: new FormControl(''),
      periodiciteAppelFond: new FormControl(''),
      rccm: new FormControl(''),
      pays: new FormControl(''),
      region: new FormControl(''),
      departement: new FormControl(''),
      commune: new FormControl(''),
      referencePolice: new FormControl('', [Validators.required]),
      fraisAccessoire: new FormControl('', [Validators.required]),
      fraisBadge: new FormControl('', [Validators.required])
    });

    this.groupeForm = this.formBuilder.group({
      id: new FormControl(''),
      libelle: new FormControl('', [Validators.required]),
      taux: new FormControl(null, [Validators.required]),
      territorialite: new FormControl('', [Validators.required]),
      duree: new FormControl('', [Validators.required]),
      dateEffet: new FormControl('', [Validators.required]),
      dateEcheance: new FormControl('', [Validators.required])
    });

    this.primeForm = this.formBuilder.group({
      prime: new FormControl('', [Validators.required]),
      primeEmploye: new FormControl(''),
      primeConjoint: new FormControl(''),
      primeEnfant: new FormControl(''),
      primeFamille: new FormControl(''),
      primeAdulte: new FormControl('')
    });

    this.breadcrumbService.setItems([{ label: 'Avenant' }]);
    this.customForm = this.formBuilder.group({
      groupe: new FormControl('')
    });

    this.breadcrumbService.setItems([{ label: "Avenant" }]);

    this.colsAL = [
      {field: 'groupe.police.nom', header: 'SOUSCRIPTEUR', type: 'string'},
      {field: 'groupe.police.numero', header: 'NUM_POLICE', type: 'string'},
      {field: 'numero', header: 'NUM_ASSURE', type: 'string'},
      {field: 'groupe.police.nom', header: 'BENEFICIAIRE', type: 'string'},
      {field: 'groupe.taux.taux', header: 'TAUX', type: 'string'},
      {field: 'fullName', header: 'ASSURE', type: 'string'},
      {field: 'groupe.dateEffet', header: 'EFFET', type: 'date'},
      {field: 'groupe.dateEcheance', header: 'ECHEANCE', type: 'date'},
      {field: 'plafondGroupeSousActe.taux.taux', header: 'CONS GENERALISTE', type: 'number'},
      {field: 'plafondGroupeSousActe.taux.taux', header: 'CONS SPECIALISTE', type: 'number'},
      {field: 'plafondGroupeSousActe.taux.taux', header: 'RADIO STANDARD', type: 'number'},
      {field: 'plafondGroupeSousActe.taux.taux', header: 'RADIO SPECIALISTE', type: 'number'},
      {field: 'plafondGroupeSousActe.taux.taux', header: 'ANALYSE STANDARD', type: 'number'},
      {field: 'plafondGroupeSousActe.taux.taux', header: 'ANALYSE SPECIALES', type: 'number'},
      {field: 'plafondGroupeSousActe.taux.taux', header: 'FRAIS SCANNER', type: 'number'},
      {field: 'fullName', header: 'Photo', type: 'string'},
    ];
  }


  parametrerPlafond(groupe: Groupe) {
    this.groupe = {...groupe};
    this.displayParametragePlafond = true;
  }

  ngOnInit(): void {
    this.historiqueAvenantAdherents = [];
    this.historiqueAvenantAdherents1 = [];
    // this.historiqueAvenantAdherents2 = [];
    // this.historiqueAvenantAdherents3 = [];
    this.historiqueAvenantAdherents4 = [];
    this.historiqueAvenantAdherents5 = [];
    this.historiqueAvenantAdherents6 = [];
    this.policeList = [];
    this.loading = true;
    this.historiqueAvenant = {};
    this.exercice = {};

    this.items = [
      {label: 'Home', icon: 'pi pi-fw pi-home'},
      {label: 'Calendar', icon: 'pi pi-fw pi-calendar'},
      {label: 'Edit', icon: 'pi pi-fw pi-pencil'},
      {label: 'Documentation', icon: 'pi pi-fw pi-file'},
      {label: 'Settings', icon: 'pi pi-fw pi-cog'}
    ];
    this.activeItem = this.items[0];

    this.entityValidations = [
      {
        field: 'garant',
        validations: [
          { validName: 'required', validMessage: 'Ce champs est obligatoire' },
          {
            validName: 'maxlength',
            validMessage: 'Ce champs requiert au plus 5 caractères',
          },
        ],
      },
      {
        field: 'intermediaire',
        validations: [
          { validName: 'required', validMessage: 'Ce champs est obligatoire' },
          {
            validName: 'maxlength',
            validMessage: 'Ce champs requiert au plus 5 caractères',
          },
        ],
      },
      {
        field: 'taux',
        validations: [
          { validName: 'required', validMessage: 'Ce champs est obligatoire' },
          {
            validName: 'maxlength',
            validMessage: 'Ce champs requiert au plus 5 caractères',
          },
        ],
      },
      {
        field: 'territorialite',
        validations: [
          { validName: 'required', validMessage: 'Ce champs est obligatoire' },
          {
            validName: 'maxlength',
            validMessage: 'Ce champs requiert au plus 5 caractères',
          },
        ],
      },
      {
        field: 'duree',
        validations: [
          { validName: 'required', validMessage: 'Ce champs est obligatoire' },
          {
            validName: 'maxlength',
            validMessage: 'Ce champs requiert au plus 5 caractères',
          },
        ],
      },
      {
        field: 'dateEffet',
        validations: [
          { validName: 'required', validMessage: 'Ce champs est obligatoire' },
          {
            validName: 'maxlength',
            validMessage: 'Ce champs requiert au plus 5 caractères',
          },
        ],
      },
      {
        field: 'dateEcheance',
        validations: [
          { validName: 'required', validMessage: 'Ce champs est obligatoire' },
          {
            validName: 'maxlength',
            validMessage: 'Ce champs requiert au plus 5 caractères',
          },
        ],
      },
      {
        field: 'nom',
        validations: [
          { validName: 'required', validMessage: 'Ce champs est obligatoire' },
          {
            validName: 'maxlength',
            validMessage: 'Ce champs requiert au plus 5 caractères',
          },
        ],
      },
      {
        field: 'contact',
        validations: [
          { validName: 'required', validMessage: 'Ce champs est obligatoire' },
          {
            validName: 'maxlength',
            validMessage: 'Ce champs requiert au plus 5 caractères',
          },
        ],
      },
      {
        field: 'adresseEmail',
        validations: [
          { validName: 'required', validMessage: 'Ce champs est obligatoire' },
          {
            validName: 'maxlength',
            validMessage: 'Ce champs requiert au plus 5 caractères',
          },
        ],
      },
      {
        field: 'numeroCompteBancaire1',
        validations: [
          { validName: 'required', validMessage: 'Ce champs est obligatoire' },
          {
            validName: 'maxlength',
            validMessage: 'Ce champs requiert au plus 5 caractères',
          },
        ],
      },
      {
        field: 'personneRessource',
        validations: [
          { validName: 'required', validMessage: 'Ce champs est obligatoire' },
          {
            validName: 'maxlength',
            validMessage: 'Ce champs requiert au plus 5 caractères',
          },
        ],
      },
      {
        field: 'numeroCompteBancaire2',
        validations: [
          { validName: 'required', validMessage: 'Ce champs est obligatoire' },
          {
            validName: 'maxlength',
            validMessage: 'Ce champs requiert au plus 5 caractères',
          },
        ],
      },
      {
        field: 'numeroIfu',
        validations: [
          { validName: 'required', validMessage: 'Ce champs est obligatoire' },
          {
            validName: 'maxlength',
            validMessage: 'Ce champs requiert au plus 5 caractères',
          },
        ],
      },
      {
        field: 'numeroPattente',
        validations: [
          { validName: 'required', validMessage: 'Ce champs est obligatoire' },
          {
            validName: 'maxlength',
            validMessage: 'Ce champs requiert au plus 5 caractères',
          },
        ],
      },
      {
        field: 'secteurActivite',
        validations: [
          { validName: 'required', validMessage: 'Ce champs est obligatoire' },
          {
            validName: 'maxlength',
            validMessage: 'Ce champs requiert au plus 5 caractères',
          },
        ],
      },
      {
        field: 'pays',
        validations: [
          { validName: 'required', validMessage: 'Ce champs est obligatoire' },
          {
            validName: 'maxlength',
            validMessage: 'Ce champs requiert au plus 5 caractères',
          },
        ],
      },
      {
        field: 'region',
        validations: [
          { validName: 'required', validMessage: 'Ce champs est obligatoire' },
          {
            validName: 'maxlength',
            validMessage: 'Ce champs requiert au plus 5 caractères',
          },
        ],
      },
      {
        field: 'departement',
        validations: [
          { validName: 'required', validMessage: 'Ce champs est obligatoire' },
          {
            validName: 'maxlength',
            validMessage: 'Ce champs requiert au plus 5 caractères',
          },
        ],
      },
      {
        field: 'commune',
        validations: [
          { validName: 'required', validMessage: 'Ce champs est obligatoire' },
          {
            validName: 'maxlength',
            validMessage: 'Ce champs requiert au plus 5 caractères',
          },
        ],
      },
      {
        field: 'periodiciteAppelFond',
        validations: [
          { validName: 'required', validMessage: 'Ce champs est obligatoire' },
          {
            validName: 'maxlength',
            validMessage: 'Ce champs requiert au plus 5 caractères',
          },
        ],
      },
      {
        field: 'rccm',
        validations: [
          { validName: 'required', validMessage: 'Ce champs est obligatoire' },
          {
            validName: 'maxlength',
            validMessage: 'Ce champs requiert au plus 5 caractères',
          },
        ],
      },
    ];

    this.adherentFamilleList = [];

    this.plafondFamilleActe = [
      {
        montantPlafond: 0,
        dimensionPeriode: {},
        taux: {},
        nombre: 0,
        garantie: {}
      }
    ];

    this.plafondActe = [
      {
        montantPlafond: 0,
        dimensionPeriode: {},
        nombre: 0,
        taux: {},
        acte: {}
      }
    ];

    this.plafondSousActe = [
      {
        montantPlafond: 0,
        dimensionPeriode: {},
        nombre: 0,
        taux: {},
        sousActe: {}
      }
    ];

    this.typeActions = [
      {label: 'Incorporation', icon: 'pi pi-user-plus', command: ($event) => {
          this.initDisplayAvenant();
          this.addAvenant();
          console.log($event);
          this.isAvenantIncorporation = true;
          this.entete = 'Avenant d\'Incorporation';
          this.etat = 'CREATE';
      }},
      {label: 'Retrait', icon: 'pi pi-user-minus', command: () => {
          this.initDisplayAvenant();
          this.addAvenantRetrait();
          this.isAvenantRetrait = true;
          this.entete = 'Avenant de Retrait';
          this.etat = 'CREATE';
      }},
      {label: 'Modification', icon: 'pi pi-pencil', command: () => {
          this.initDisplayAvenant();
          this.isAvenantModification = true;
          this.entete = 'Avenant de Modification';
          this.addAvenantModification();
          this.etat = 'CREATE';
      }},
      {label: 'Renouvellement', icon: 'pi pi-undo', command: () => {
          this.initDisplayAvenant();
          this.isAvenantRenouvellement = true;
          this.entete = 'Avenant de Renouvellement';
          this.addAvenantRenouvellement();
          this.etat = 'CREATE';
      }},
      /* {label: 'Facturation', icon: 'pi pi-euro', command: () => {
          this.initDisplayAvenant();
          this.isAvenantFacturation = true;
          this.entete = 'Avenant de Suspension';
          this.addAvenantFacturation();
      }}, */
      {label: 'Suspension', icon: 'pi pi-pause', command: () => {
          this.initDisplayAvenant();
          this.isAvenantSuspension = true;
          this.entete = 'Avenant de Suspension';
          this.addAvenantRenouvellement();
          this.etat = 'CREATE';
      }},
      {label: 'Résiliation', icon: 'pi pi-sign-out', command: () => {
          this.initDisplayAvenant();
          this.isAvenantResiliation = true;
          this.entete = 'Avenant de Résiliation';
          this.addAvenantModification();
          this.etat = 'CREATE';
      }},
    ];

    this.garantieList$ = this.store.pipe(select(garantieSelector.garantieList));
    this.store.dispatch(loadGarantie());
    this.garantieList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.garanties = value.slice();
      }
    });

    this.acteList$ = this.store.pipe(select(acteSelector.acteList));
    this.store.dispatch(loadActe());
    this.acteList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.acteList = value.slice();
        // console.log('**************** ' + value.length);
      }
    });

    this.avenantList$ = this.store.pipe(select(avenantSelector.typeAvenantList));
    this.store.dispatch(loadTypeAvenant());
    this.avenantList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.avenantList = value.slice();
        // this.cerateTypeAction();
      }
    });

    this.genreList$ = this.store.pipe(select(genreSelector.genreList));
    this.store.dispatch(loadGenre());
    this.genreList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.genreList = value.slice();
      }
    });

    this.professionList$ = this.store.pipe(
        select(professionSelector.professionList)
    );
    this.store.dispatch(loadProfession());
    this.professionList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.professionList = value.slice();
      }
    });

    this.qualiteAssureList$ = this.store.pipe(
        select(qualiteAssureSelector.qualiteAssureList)
    );
    this.store.dispatch(loadQualiteAssure());
    this.qualiteAssureList$
        .pipe(takeUntil(this.destroy$))
        .subscribe((value) => {
          if (value) {
            this.qualiteAssureList = value.slice();
          }
        });

    this.sousActeList$ = this.store.pipe(select(sousActeSelector.sousacteList));
    this.store.dispatch(loadSousActe());
    this.sousActeList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        console.log(this.sousActeList);
        this.sousActeList = value.slice();
      }
    });

    this.garantList$ = this.store.pipe(select(garantSelector.garantList));
    this.store.dispatch(loadGarant());
    this.garantList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.garantList = value.slice();
      }
    });

    this.intermediaireList$ = this.store.pipe(
        select(intermediaireSelector.intermediaireList)
    );
    this.store.dispatch(loadIntermediaire());
    this.intermediaireList$
        .pipe(takeUntil(this.destroy$))
        .subscribe((value) => {
          if (value) {
            this.intermediaireList = value.slice();
          }
        });

    this.tauxList$ = this.store.pipe(select(tauxSelector.tauxList));
    this.store.dispatch(loadTaux());
    this.tauxList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.tauxList = value.slice();
      }
    });

    this.territorialiteList$ = this.store.pipe(
        select(territorialiteSelector.territorialiteList)
    );
    this.store.dispatch(loadTerritorialite());
    this.territorialiteList$
        .pipe(takeUntil(this.destroy$))
        .subscribe((value) => {
          if (value) {
            this.territorialiteList = value.slice();
            console.log(this.territorialiteList);
          }
        });

    this.loadPoliceListe();


    this.historiqueAvenantList$ = this.store.pipe(select(historiqueAvenantSelector.historiqueAvenantList));
    // this.store.dispatch(loadHistoriqueAvenant({policeId: this.police.id}));
    this.historiqueAvenantList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.loading = false;
        this.historiqueAvenantList = value.slice();
        console.log('................historiqueAvenantList............................');
        console.log(this.historiqueAvenantList);
      }
    });

    this.paysList$ = this.store.pipe(select(paysSelector.paysList));
    this.store.dispatch(loadPays());
    this.paysList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.paysList = value.slice();
      }
    });

    this.regionList$ = this.store.pipe(select(regionSelector.regionList));
    this.store.dispatch(loadRegion());
    this.regionList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.regionList = value.slice();
      }
    });

    this.departementList$ = this.store.pipe(
        select(departementSelector.departementList)
    );
    this.store.dispatch(loadDepartement());
    this.departementList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.departementList = value.slice();
      }
    });

    this.typePrimeList$ = this.store.pipe(
        select(typePrimeSelector.typePrimeList)
    );
    this.store.dispatch(loadTypePrime());
    this.typePrimeList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.typePrimeList = value.slice();
      }
    });

    this.communeList$ = this.store.pipe(select(communeSelector.communeList));
    this.store.dispatch(loadCommune());
    this.communeList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.communeList = value.slice();
      }
    });

    this.secteurActiviteList$ = this.store.pipe(
        select(secteurActiviteSelector.secteurActiviteList)
    );
    this.store.dispatch(loadSecteurActivite());
    this.secteurActiviteList$
        .pipe(takeUntil(this.destroy$))
        .subscribe((value) => {
          if (value) {
            this.secteurActiviteList = value.slice();
          }
        });

        

    this.dimensionPeriodeList$ = this.store.pipe(
        select(dimensionPeriodeSelector.dimensionPeriodeList)
    );
    this.store.dispatch(loadDimensionPeriode());
    this.dimensionPeriodeList$
        .pipe(takeUntil(this.destroy$))
        .subscribe((value) => {
          if (value) {
            this.dimensionPeriodeList = value.slice();
          }
        });

    this.statusObject$ = this.store.pipe(select(status));
    this.checkStatus();
    this.init();
    // this.loadHistoriqueAvenant();

    /** dispatch action pour imprimer le pdf */
    this.store.dispatch(featureAction.setReport(null));
    this.store.pipe(select(selectByteFile)).pipe(takeUntil(this.destroy$))
        .subscribe(bytes => {
          if (bytes) {
            printPdfFile(bytes);
          }
        });

  }

  init(): void {
    this.isAvenantIncorporation = false;
    this.isAvenantRetrait = false;
    this.isAvenantModification = false;
    this.isAvenantRenouvellement = false;
    this.isAvenantFacturation = false;
    this.isAvenantSuspension = false;
    this.isAvenantResiliation = false;
    this.groupePolicy = [];
    this.selectedGroup = {};
    this.adherentListGroupe = [];
    this.adherantGroupeListe = [];
    this.curentGroupe = {};
    this.customForm = this.formBuilder.group({
      groupe: new FormControl('')
    });
    this.historiqueAhenantAdherants = [];
    this.historiqueAvenant = {
      aderants: [],
      groupe: {},
      police: {}
    };
  }


  changeAvenant(event) {
    console.log(event.value);
    if (event.value.libelle === 'retrait'){
      this.typeAvenantSelected = 'retrait';
    } else if (event.value.libelle === 'modification'){
      this.typeAvenantSelected = 'modification';
    } else if (event.value.libelle === 'incorporation'){
      this.typeAvenantSelected = 'incorporation';
    }
  }

  // fonction pour creer adherent.
  onCreateAddherent() {
    console.log(this.adherentForm.value);
    console.log(this.adherentFamilleList);
  }

  changePrime(event) {
    /*
    console.log(event.value);
    if (event.value.libelle === "famille") {
      this.primeForm = this.formBuilder.group({
        typePrime: new FormControl(""),
        primeFamille: new FormControl("", [Validators.required]),
      });
    } else if (event.value.libelle === "adulte et enfant") {
      this.primeForm = this.formBuilder.group({
        typePrime: new FormControl(""),
        primeAdulte: new FormControl("", [Validators.required]),
        primeEnfant: new FormControl("", [Validators.required]),
      });
    } else if (event.value.libelle === "employe,conjoint,enfant") {
      this.primeForm = this.formBuilder.group({
        typePrime: new FormControl(""),
        primeEmploye: new FormControl("", [Validators.required]),
        primeConjoint: new FormControl("", [Validators.required]),
        primeEnfant: new FormControl("", [Validators.required]),
      });
    } else {
    }
    */
  }

  /** cette methode permet de creer un groupe avec des informations basiques */
  onCreateGroupe(){
    this.groupe = this.groupeForm.value;
    this.groupe.police = this.police;
    // this.groupe.adherent = this.adherentForm.value;
    this.groupe.prime = this.primeForm.value;
    // this.groupe.familleAdherent = this.adherentFamilleList;
    console.log(this.groupe);
    this.store.dispatch(featureActionGroupe.createGroupe(this.groupe));
  }

  validerForm() {
    /*
    console.log(this.groupeForm.value);
    console.log(this.primeForm.value);
    console.log(this.plafondFamilleActe);
    console.log(this.plafondSousActe);
    console.log(this.plafondActe);
    this.groupe = this.groupeForm.value;
    this.groupe.typePrime = this.selectedTypePrime;
    this.groupe.plafondActe = this.plafondActe;
    this.groupe.plafondFamilleActe = this.plafondFamilleActe;
    this.groupe.plafondSousActe = this.plafondSousActe;
    this.groupe.police= this.police;
    console.log(this.groupe);
    */
    this.store.dispatch(featureActionGroupe.createGroupe(this.groupe));
  }

  goToNext() {
    this.index = (this.index === 2) ? 0 : this.index + 1;
    console.log(this.index);
  }

  getNewDate(value: number): Date {
    this.typeDureeSelected = this.policeForm.get('typeDuree').value;
    this.dateEcheance = new Date(this.dateEffet);
    this.dateEcheance = new Date(this.dateEcheance.setDate(this.dateEcheance.getDate() - 1));
    if (this.typeDureeSelected === 'Jour') {
      return new Date(this.dateEcheance.setDate(this.dateEcheance.getDate() + Number(value)));
    } else if (this.typeDureeSelected === 'Mois') {
      return new Date(this.dateEcheance.setMonth(this.dateEcheance.getMonth() + Number(value)));
    } else if (this.typeDureeSelected === 'Annee') {
      return new Date(this.dateEcheance.setFullYear(this.dateEcheance.getFullYear() + Number(value)));
    }
  }

  changeTypeDuree(){
    if (this.dateEcheance && this.policeForm.get('duree')){
      this.onRefreshDateEcheance(this.policeForm.get('duree').value);
    }
  }

  onRefreshDateEcheance(value: number) {
    this.policeForm
        .get('dateEcheance')
        .setValue(
            this.getNewDate(value)
        );
  }

  onRefreshDateEcheanceForGroupe(value: number) {
    this.dateEcheance = new Date(this.dateEffet);
    this.groupeForm
        .get('dateEcheance')
        .setValue(
            new Date(
                this.dateEcheance.setMonth(
                    this.dateEcheance.getMonth() + Number(value)
                )
            )
        );
  }

  checkStatus() {
    this.statusObject$.pipe(takeUntil(this.destroy$)).subscribe((statusObj) => {
      if (statusObj) {
        // this.loading = false;
        this.showToast(statusObj.status, 'INFORMATION', statusObj.message);
        /*
          if (this.isAdding && statusObj.status === StatusEnum.success) {
            this.display = false;
            this.isAdding = false;
          }
          this.loading = false;
          */
      }
    });
  }

  showToast(severity: string, summary: string, detail: string) {
    this.messageService.add({ severity, summary, detail });
  }

  addPolice() {
    this.police = {};
    this.displayDialogFormPolice = true;
  }

  addAdherent() {
    this.displayDialogFormAddAdherent = true;
  }


  editPolice(police: Police) {

    this.policeForm.get('id').setValue(police.id);
    this.police = { ...police };
    console.log(this.police);
    this.policeForm.patchValue(this.police);
    this.policeForm.get('dateEffet').setValue(new Date(this.police.dateEffet));
    this.policeForm.get('dateEcheance').setValue(new Date(this.police.dateEcheance));
    this.displayDialogFormPolice = true;
  }

  deletePolice(police: Police) {
    this.confirmationService.confirm({
      message: 'Etes vous sur de vouloir supprimer?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(featureAction.deletePolice(police));
      },
    });
  }

  onCreate() {
    this.police = this.policeForm.value;
    this.police.dateEcheance = this.policeForm.get('dateEcheance').value;
    console.log(this.police);
    this.confirmationService.confirm({
      message: 'Etes vous sur de vouloir ajouter ce police?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (this.police.id) {
          this.store.dispatch(
              featureAction.updatePolice(this.policeForm.value)
          );
        } else {
          console.log(this.policeForm.value);
          this.store.dispatch(
              featureAction.createPolice(this.policeForm.value)
          );
        }
        this.policeForm.reset();
      },
    });
  }

  addGroupe() {
    this.displayDialogFormAddGroupe = true;
    this.parametrageActe = false;
    this.parametragePrime = false;
    this.infosGroupe = true;
  }

  onRowEditInit(plafondFamilleActe: PlafondFamilleActe) {
    this.clonedPlafondFamilleActe[plafondFamilleActe.garantie.id] = {
      ...plafondFamilleActe,
    };
  }

  onRowEditSave(plafondFamilleActe: PlafondFamilleActe) {
    delete this.clonedPlafondFamilleActe[plafondFamilleActe.garantie.id];
  }

  onRowEditCancel(plafondFamilleActe: PlafondFamilleActe, index: number) {
    this.plafondFamilleActe[index] =
        this.clonedPlafondFamilleActe[plafondFamilleActe.garantie.id];
    delete this.clonedPlafondFamilleActe[plafondFamilleActe.garantie.id];
  }

  onRowEditInitAdherentFamille(adherentFamille: Adherent, index: number) {
    this.clonedAdherentFamille[index] = { ...adherentFamille };
  }

  onRowEditSaveAdherentFamille(adherentFamille: Adherent, index: number) {
    delete this.clonedPlafondFamilleActe[index];
  }

  onRowEditCancelAdherentFamille(adherentFamille: Adherent, index: number) {
    this.adherentFamilleList[index] = this.clonedAdherentFamille[index];
    delete this.clonedAdherentFamille[index];
  }

  onRowEditInitPlafondActe(plafondActe: PlafondActe) {
    this.clonedPlafondActe[plafondActe.acte.id] = { ...plafondActe };
  }

  onRowEditSavePlafondActe(plafondActe: PlafondActe) {
    delete this.clonedPlafondActe[plafondActe.acte.id];
  }

  onRowEditCancelPlafondActe(plafondActe: PlafondActe, index: number) {
    this.plafondActe[index] = this.clonedPlafondActe[plafondActe.acte.id];
    delete this.clonedPlafondActe[plafondActe.acte.id];
  }

  onRowEditInitPlafondSousActe(plafondSousActe: PlafondSousActe) {
    this.clonedPlafondSousActe[plafondSousActe.sousActe.id] = {
      ...plafondSousActe,
    };
  }

  onRowEditSavePlafondSousActe(plafondSousActe: PlafondSousActe) {
    delete this.clonedPlafondSousActe[plafondSousActe.sousActe.id];
  }

  onRowEditCancelPlafondSousActe(
      plafondSousActe: PlafondSousActe,
      index: number
  ) {
    this.plafondSousActe[index] =
        this.clonedPlafondSousActe[plafondSousActe.sousActe.id];
    delete this.clonedPlafondSousActe[plafondSousActe.sousActe.id];
  }

  newRowFamilleAdherent() {
    return {};
  }

  newRow() {
    return { montantPlafond: 0, dimensionPeriode: {}, nombre: 0, garantie: {} };
  }

  newRowPlafondActe() {
    return { montantPlafond: 0, dimensionPeriode: {}, nombre: 0, acte: {} };
  }

  newRowPlafondSousActe() {
    return { montantPlafond: 0, dimensionPeriode: {}, nombre: 0, sousActe: {} };
  }


  validerPlafond(){
    this.plafond = this.plafondForm.value;
    this.plafond.plafondFamilleActe = this.plafondFamilleActeConstruct;
    this.plafond.groupe = this.groupe;
    console.log(this.plafond);
    this.store.dispatch(featureActionsPlafond.createPlafond(this.plafond));
  }

  //
  typeHistoriqueAvenantAN = TypeHistoriqueAvenant.AFAIRE_NOUVELLE;
  addSousActe() {
    this.plafondActe[this.indexeActe].listeSousActe = this.plafondSousActe;
    console.log(this.plafondActe);
  }

  addFamilleActe(rowData, ri){

    console.log(rowData);
    console.log(this.plafondFamilleActeConstruct);

    for ( let i = 0; i < this.plafondFamilleActeConstruct.length; i++){
      if (this.plafondFamilleActeConstruct[i].garantie.id === rowData.garantie.id) {
        console.log('oui');
        this.clonedPlafondFamilleActeTemp[rowData.garantie.id] = { ...rowData };
        this.plafondFamilleActeTemp = this.clonedPlafondFamilleActeTemp[rowData.garantie.id];
        this.plafondFamilleActeTemp.listeActe = this.plafondActe;
        console.log(i);
        this.plafondFamilleActeConstruct[i] = this.plafondFamilleActeTemp;
        delete this.clonedPlafondFamilleActeTemp[rowData.garantie.id];
        return;
      }
    }

    this.plafondFamilleActeConstruct.forEach( async (element, index) => {
      if (element.garantie.id === rowData.garantie.id) {
        console.log('oui');
        this.clonedPlafondFamilleActeTemp[rowData.garantie.id] = { ...rowData };
        this.plafondFamilleActeTemp = this.clonedPlafondFamilleActeTemp[rowData.garantie.id];
        this.plafondFamilleActeTemp.listeActe = this.plafondActe;
        console.log(index);
        this.plafondFamilleActeConstruct[index] = this.plafondFamilleActeTemp;
        delete this.clonedPlafondFamilleActeTemp[rowData.garantie.id];
        return;
      }
    });


    this.clonedPlafondFamilleActeTemp[rowData.garantie.id] = { ...rowData };
    console.log(this.clonedPlafondFamilleActeTemp);
    this.plafondFamilleActeTemp = this.clonedPlafondFamilleActeTemp[rowData.garantie.id];
    this.plafondFamilleActeTemp.listeActe = this.plafondActe;
    this.plafondFamilleActeConstruct[this.countfamilleActe] = this.plafondFamilleActeTemp;
    delete this.clonedPlafondFamilleActeTemp[rowData.garantie.id];
    console.log(this.countfamilleActe);
    this.countfamilleActe++;

    console.log(this.plafondFamilleActeConstruct);

  }

  getSousActe(rowData, ri){
    this.plafondSousActe = [];
    if (!rowData.listeSousActe){
      this.sousActeList.forEach((element) => {
        console.log(rowData);
        if (element.idTypeActe === rowData.acte.id){
          this.plafondSousActe.push({sousActe: element, montantPlafond: rowData.montantPlafond});
        }
      });
    } else {
      this.plafondSousActe = rowData.listeSousActe;
    }
    this.displaySousActe = true;
    this.indexeActe = ri;
  }

  changeGarantie(garantie, indexLigne: number) {

    this.plafondActe = [];
    if (this.plafondFamilleActeConstruct.length != 0) {
      // revoir cette fonction
      this.plafondFamilleActeConstruct.forEach((element, index) => {
        element.listeActe.forEach(e => {
          if (e.acte.idTypeGarantie === garantie.value.id){
            this.plafondActe.push(e);
          }
        });
      });
      console.log(this.plafondFamilleActeConstruct);
    }
    if (this.plafondActe.length === 0){
      // this.plafondActe = this.acteList.filter(element=>element.idTypeGarantie === garantie.value.id);
      this.acteList.forEach((element) => {
        if (element.idTypeGarantie === garantie.value.id) {
          this.plafondActe.push({acte: element});
        }});
    }
    console.log(this.plafondActe);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

  invaliderPolice(police: Police): void {
    police.valide = false;
    this.store.dispatch(featureAction.updatePolice(police));
    // this.policeList$ = this.store.pipe(select(policeList));
  }

  cerateTypeAction(): void {
    this.avenantList.forEach(typeA => {
      const item: MenuItem = {};
      item.label = typeA.libelle;
      item.id = typeA.id;
      this.typeActions.push(item);
    });
    console.log(this.typeActions);
  }

  addAvenant(): void {
    this.dissplayavenant = true;

  }

  addAvenantRetrait(): void {
    this.dissplayavenant = true;
  }
  addAvenantModification(): void {

    this.dissplayavenant = true;
    this.addNewGroupe();
    this.loadGoupeByPolice();
    console.log('*******************-------------------------');
    console.log(this.adherentListGroupe);
    this.avenantModification.adherants = this.adherentListGroupe;
    this.avenantModification.groupes = this.groupePolicy;
  }

  addAvenantRenouvellement(): void {
    this.dissplayavenant = true;
  }
  addAvenantFacturation(): void {
    this.dissplayavenant = true;
  }

  add(): void {
    this.adherentForm = this.formBuilder.group({
      id: new FormControl(""),
      nom: new FormControl("", [Validators.required]),
      prenom: new FormControl("", [Validators.required]),
      dateNaissance: new FormControl("", [Validators.required]),
      matricule:new FormControl(""),
      lieuNaissance: new FormControl("", [Validators.required]),
      numeroTelephone: new FormControl("", [Validators.required]),
      adresse: new FormControl("", [Validators.required]),
      adresseEmail: new FormControl("", [Validators.required]),
      profession: new FormControl(""),
      referenceBancaire: new FormControl(""),
      qualiteAssure: new FormControl("", [Validators.required]),
      genre: new FormControl("", [Validators.required]),
      dateEntree: new FormControl("", [Validators.required])
    }) ;
  }

  delAvenenant(): void {
    this.dissplayavenant = false;
    this.init();
    this.historiqueAvenant = {};
    
  }

  loadGoupeByPolice(): void {
    // this.curentGroupe = this.customForm.get('groupe').value;
    console.log('::::::::::::::::::::::::::');
    console.log(this.policeItem);
    this.groupeList$ = this.store.pipe(select(groupeList));
    this.store.dispatch(loadGroupe({policeId: this.policeItem.id}));
    this.groupeList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.groupePolicy = value.slice();
        console.log(this.groupePolicy);
      }
    });

    this.adherentService.loadAdherentsByPolice(this.policeItem.id).subscribe(
        (res) => {
          res.forEach(a => {
            a.fullName = a.numero +' - '+ a.nom + ' ' + a.prenom;
          });
          this.adherentListGroupe = res.filter(e => e.adherentPrincipal === null);
          console.log(':::::::::::::this.adherentListGroupe:::::::::::::');
          console.log(this.adherentListGroupe);
        }
    );
  }

  loadActualList(police: Police): void {
    this.adherentService.findAdherantActuallList(police.id).subscribe(
        (res) => {
          console.log('---------- Actual Liste ----------');
          console.log(res);
          this.adherentsListeActuelle = res;
          this.adherentsListeActuelleRetirer = res.filter(e => e.signeAdherent === "-");
          this.displayALA = true;
        }
    );
  }

  /* methode pour calculer la prime totale par police */
 getPolicePrimeTotale(police: Police): void {
    this.getPrimeTotalByPoliceId();
    this.displayPrimeTotalePolice = true;
  }

  

  findAdherentListByExerciceId(currentExercice: Exercice) {
    console.log('---------- currentExercice ----------', currentExercice);
    this.adherentService.findAdherantActuallListByExerciceId(currentExercice.id).subscribe(
      (res) => {
        console.log('---------- Actual Liste by Exrcice Id ----------');
        console.log(res);
        this.adherentsListeActuelleByExercice = res;
        this.adherentsListeActuelleByExerciceRetirer = res.filter(e => e.signeAdherent === "-");
        this.displayALA = true;
      }
  );
  }

  addNewGroupe(): void {
    this.isNewGroupe = !this.isNewGroupe;
    // this.displayDialogFormAdherent = true;
    this.adherentList$ = this.store.pipe(select(adherentSelector.adherentList));
    this.store.dispatch(featureActionAdherent.loadAdherent({idGroupe: this.groupe.id}));
    this.adherentList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.adherentListGroupe = value.slice();
      }
    });
  }

  addToGroup(): void {
    this.adherant = this.adherentForm.value;
    this.adherentListGroupe.forEach( elem => {
      // elem.ad
    });
    this.adherant = null;
    this.add();
  }

  addAdherentFamille(historiqueAvenant: HistoriqueAvenant): void {
    console.log('**************HistoriqueAvenan-----t***------*************');
    console.log(historiqueAvenant);
    if (historiqueAvenant.id == null) {
      this.historiqueAvenant = historiqueAvenant;
      this.historiqueAvenant.id = null;
      this.historiqueAvenant.file.append('file', this.historiqueAvenant.fileToLoad);
      console.log('**************HistoriqueAvenan-----t****************');
      console.log(this.historiqueAvenant);
      if (this.historiqueAvenant.fileToLoad !== null && this.historiqueAvenant.fileToLoad !== undefined
          && this.historiqueAvenant.fileToLoad.size > 0) {
        this.store.dispatch(featureActionHistoriqueAdherant.createHistoriqueAvenantFile({
          historiqueAvenant: this.historiqueAvenant,
          file: this.historiqueAvenant.fileToLoad
        }));
      } else {
        this.store.dispatch(featureActionHistoriqueAdherant.createHistoriqueAvenant(this.historiqueAvenant));
      }
    } else {
      this.store.dispatch(featureActionHistoriqueAdherant.createHistoriqueAvenant(historiqueAvenant));
    }
    this.initDisplayAvenant();
    this.dissplayavenant = false;
  }

  addGroupeNew(groupe: FormGroup): Groupe {
    console.log(groupe);
    this.curentGroupe = groupe as Groupe;
    return this.curentGroupe;
  }

  onGroupeChange() {
    this.curentGroupe = this.customForm.controls.groupe.value;
  }

  loadHistoriqueAvenant(e): void {
    console.log(e);
    this.historiqueAvenantList$ = this.store.pipe(select(historiqueAvenantSelector.historiqueAvenantList));
    this.store.dispatch(featureActionHistoriqueAdherant.loadHistoriqueAvenant({policeId: e.value.id}));
    this.historiqueAvenantList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.historiqueAvenantList = value.slice();
        console.log('................historiqueAvenantList............................');
        console.log(this.historiqueAvenantList);
      }
    });
  }

  deleteAdherant(historiqueAvenantRetrais: HistoriqueAvenant) {
    console.log('++++++++++++   historiqueAvenantRetrais      ++++++++++++');
    console.log(historiqueAvenantRetrais);
    this.historiqueAvenant = {};
    this.historiqueAvenant = historiqueAvenantRetrais;
    this.historiqueAvenant.numeroGarant = historiqueAvenantRetrais.numero;
    this.historiqueAvenant.police = this.policeItem;
    if (this.historiqueAvenant.fileToLoad !== null && this.historiqueAvenant.fileToLoad !== undefined
        && this.historiqueAvenant.fileToLoad.size > 0) {
      this.store.dispatch(featureActionHistoriqueAdherant.createHistoriqueAvenantFile({
        historiqueAvenant: this.historiqueAvenant,
        file: this.historiqueAvenant.fileToLoad
      }));
    } else {
      this.store.dispatch(featureActionHistoriqueAdherant.createHistoriqueAvenant(this.historiqueAvenant));
    }
    this.dissplayavenant = false;
    this.dissplayavenant = false;
  }

  initDisplayAvenant(): void {
    this.isAvenantIncorporation = false;
    this.isAvenantRetrait = false;
    this.isAvenantModification = false;
    this.isAvenantRenouvellement = false;
    this.isAvenantSuspension = false;
    this.isAvenantResiliation = false;
  }

  deValiderPolice(police: Police){
    this.confirmationService.confirm({
      message: 'Etes vous sûr(e) de vouloir dévalider la police?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(featureAction.deValiderPolice(police));
      },
    });
  }

  voirGroupe(police: Police) {
    this.police = {...police};
    this.groupeList$ = this.store.pipe(select(groupeList));
    this.store.dispatch(loadGroupe({policeId: police.id}));
    this.groupeList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.groupeList = value.slice();
      }
    });
    this.displayDialogFormGroupe = true;
  }

  /** afficher les details de la police */
  onRowSelectPolice(police: Police) {
    this.police = {...police};
    this.loadExerciceByPolice(police);
    this.infosPolice = true;
    this.policeForm.patchValue(this.police);
    this.historiqueAvenants1$ = this.store.pipe(select(historiqueAvenantSelector.historiqueAvenantList));
    this.store.dispatch(featureActionHistoriqueAdherant.loadHistoriqueAvenant({policeId: police.id}));
    this.historiqueAvenants1$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        // this.loading = false;
        this.historiqueAvenants1 = value.slice();
        this.historiqueAvenants1.forEach(element => {
          console.log('.........1........', element.validePrime);
          element.isPossible = this.calculePossible(element);
          console.log('.........2........', element.isPossible);
        });
        console.log('................historiqueAvenantListWithoutActiveList............................');
        console.log(this.historiqueAvenants1);
      }
    });
    /* this.historiqueAvenantService.getHistoriqueAvenants(this.police.id).subscribe(
        (res: HistoriqueAvenantList) => {
          this.historiqueAvenants1 = res;
          console.log('==================================', this.historiqueAvenants1);
        }
    ); */
  }

  /** afficher les details de l'avenant' */
  onRowSelectAvenant(avenant: HistoriqueAvenant) {
    console.log('===================avenant.avenant====================', avenant);
    this.etat = 'VIEW';
    this.historiqueAvenant = avenant;
    // console.log('=======================================', typeHistoriqueAvenant);
    switch (avenant.typeHistoriqueAvenant) {
      case TypeHistoriqueAvenant.INCORPORATION: {
        this.initDisplayAvenant();
        this.isAvenantIncorporation = true;
        this.addAvenant();
        this.entete = 'Avenant d\'incorporation'.toUpperCase();
        this.etat = 'VIEW';
        // this.loadExerciceByPolice(avenant.police);
        console.log('===================avenant.police====================', avenant.police);
        break;
        // this.viewAvenantIncorp(avenant, avenant.typeHistoriqueAvenant);
        // break;
      }
      case TypeHistoriqueAvenant.RETRAIT: {
        // this.viewAvenantRetrait(avenant);
        this.initDisplayAvenant();
        this.isAvenantRetrait = true;
        this.addAvenant();
        this.entete = 'Avenant de retrait'.toUpperCase();
        this.etat = 'VIEW';
        // this.viewAvenantRetrait(avenant, avenant.typeHistoriqueAvenant);
        break;
      }
      case TypeHistoriqueAvenant.RENOUVELLEMENT: {
        this.policeItem = avenant.police;
        this.initDisplayAvenant();
        this.isAvenantRenouvellement = true;
        this.addAvenant();
        this.entete = 'Avenant de renouvellement'.toUpperCase();
        this.etat = 'VIEW';
        // this.viewAvenantRenouvellement(avenant, avenant.typeHistoriqueAvenant);
        break;
      }
      case TypeHistoriqueAvenant.AFAIRE_NOUVELLE: {
        this.viewAvenantAffaireNouvelle(avenant, avenant.typeHistoriqueAvenant);
        this.etat = 'VIEW';
        break;
      }
      case TypeHistoriqueAvenant.RESILIATION: {
        this.initDisplayAvenant();
        this.isAvenantResiliation = true;
        this.addAvenant();
        this.entete = 'Avenant de résiliation'.toUpperCase();
        this.etat = 'VIEW';
        // this.viewAvenantResiliation(avenant, avenant.typeHistoriqueAvenant);
        break;
      }
      case TypeHistoriqueAvenant.SUSPENSION: {
        this.initDisplayAvenant();
        this.isAvenantSuspension = true;
        this.addAvenant();
        this.entete = 'Avenant de suspension'.toUpperCase();
        this.etat = 'VIEW';
        // this.viewAvenantSuspension(avenant, avenant.typeHistoriqueAvenant);
        break;
      }
      case TypeHistoriqueAvenant.MODIFICATION: {
        this.policeItem = avenant.police;
        this.initDisplayAvenant();
        this.isAvenantModification = true;
        this.addAvenant();
        this.entete = 'Avenant de modification'.toUpperCase();
        this.etat = 'VIEW';
        this.avenantItem = avenant;
        // this.viewAvenantModification(avenant, avenant.typeHistoriqueAvenant);
        break;
      }
      default: {
        return null;
      }
    }
  }

  viewAvenantIncorp(avenant: HistoriqueAvenant, typeHistoriqueAvenant: TypeHistoriqueAvenant) {
    this.historiqueAvenant = {...avenant};
    console.log(typeof typeHistoriqueAvenant);
    this.historiqueAvenantAdherentService.getHistoriqueAvenantAdherentsByHistoriqueIdAndTypeHistorique(typeHistoriqueAvenant,
        this.historiqueAvenant.id).subscribe(
        (res: Array<HistoriqueAvenantAdherant>) => {
          this.historiqueAvenantAdherents = res;
          console.log('=====================res=============', res);
        }
    );
    this.displayDialogFormAdherentIncorp = true;
  }

  viewAvenantRetrait(avenant: HistoriqueAvenant) {
    this.historiqueAvenant = {...avenant};
    this.historiqueAvenantAdherentService.getHistoriqueAvenantAdherentsByHistoriqueId(avenant.id).subscribe(
        (res: Array<HistoriqueAvenantAdherant>) => {
          console.log('=====================res=============', res);
          this.historiqueAvenantAdherent1s = res;
          /* console.log('=====================res=============', res);
          this.historiqueAvenantAdherents2 = this.historiqueAvenantAdherent1s
              .filter(doc => doc.avenant.typeHistoriqueAvenant === typeHistoriqueAvenant);*/
          console.log('=====================historiqueAvenantAdherent1s=============', this.historiqueAvenantAdherent1s);
        }
    );
    this.displayDialogFormAdherentRetrait = true;
  }

  viewAvenantAffaireNouvelle(avenant: HistoriqueAvenant, typeHistoriqueAvenant: TypeHistoriqueAvenant) {
    this.historiqueAvenant = {...avenant};
    console.log(typeof typeHistoriqueAvenant);
    this.historiqueAvenantAdherentService.getHistoriqueAvenantAdherentsByHistoriqueIdAndTypeHistorique(typeHistoriqueAvenant,
        avenant.id).subscribe(
        (res: Array<HistoriqueAvenantAdherant>) => {
          this.historiqueAvenantAdherent1s = res;
        console.log('=====================historiqueAvenantAdherent1s=============', res);
           /* this.historiqueAvenantAdherents3 = this.historiqueAvenantAdherent1s
              .filter(doc => doc.avenant.typeHistoriqueAvenant === typeHistoriqueAvenant);*/
          console.log('=====================typeHistoriqueAvenant=============', typeHistoriqueAvenant);
        }
    );
    this.displayDialogFormAdherentAffaireNouvelle = true;
  }

  viewAvenantResiliation(avenant: HistoriqueAvenant, typeHistoriqueAvenant: TypeHistoriqueAvenant) {
    this.historiqueAvenant = {...avenant};
    console.log(typeof typeHistoriqueAvenant);
    this.historiqueAvenantAdherentService.findHistoriqueAvenantAdherentByHistoriqueAvenantIdAndActifIsFalse(avenant.id)
        .subscribe((res: Array<HistoriqueAvenantAdherant>) => {
          this.historiqueAvenantAdherents5 = res;
          console.log('=====================res=============', res);
        }
    );
    this.displayDialogFormAdherentResiliation = true;
  }

  viewAvenantSuspension(avenant: HistoriqueAvenant, typeHistoriqueAvenant: TypeHistoriqueAvenant) {
    this.historiqueAvenant = {...avenant};
    console.log(typeof typeHistoriqueAvenant);
    this.historiqueAvenantAdherentService.findHistoriqueAvenantAdherentByHistoriqueAvenantIdAndActifIsFalse(avenant.id)
        .subscribe((res: Array<HistoriqueAvenantAdherant>) => {
          this.historiqueAvenantAdherents6 = res;
          console.log('=====================res=============', res);
        }
    );
    this.displayDialogFormAdherentSuspension = true;
  }

  viewAvenantRenouvellement(avenant: HistoriqueAvenant, typeHistoriqueAvenant: TypeHistoriqueAvenant) {
    this.historiqueAvenant = {...avenant};
    console.log(typeof typeHistoriqueAvenant);
    console.log('++++++++++++++++++++avenant.id+++++++++++++++++++++++', avenant.id);
    console.log('++++++++++++++++++++avenant.police.id+++++++++++++++++++++++', avenant.police.id);
    this.historiqueAvenantAdherentService.getAvenantModificationInfo(typeHistoriqueAvenant,
        avenant.id, avenant.police.id).subscribe(
        (res: Avenant) => {
          console.log('=====================res=============', res);
          this.avenantModif = res;
        }
    );
    this.displayDialogFormAdherentrenouvellement = true;
  }

  viewAvenantModification(avenant: HistoriqueAvenant, typeHistoriqueAvenant: TypeHistoriqueAvenant) {
    this.historiqueAvenant = {...avenant};
    console.log(typeof typeHistoriqueAvenant);
    this.historiqueAvenantAdherentService.getAvenantModificationInfo(typeHistoriqueAvenant,
        avenant.id, avenant.police.id).subscribe(
        (res: Avenant) => {
          this.avenantModif1 = res;
          /* console.log('=====================res=============', res);
          this.historiqueAvenantAdherents3 = this.historiqueAvenantAdherent1s
              .filter(doc => doc.avenant.typeHistoriqueAvenant === typeHistoriqueAvenant);*/
          console.log('=====================typeHistoriqueAvenant=============', typeHistoriqueAvenant);
        }
    );
    this.displayDialogFormAdherentModification = true;
  }


  printAvenantIncorporation(historiqueAvenant: HistoriqueAvenant) {
    this.typeAvenants = [
      {label: 'Avenant d\'incorporation', icon: 'pi pi-print', command: ($event) => {
          this.report.typeReporting = TypeReport.AVENANT_INCORPORATION;
          this.report.historiqueAvenant = historiqueAvenant;
          console.log('==================this.report.historiqueAvenant=================={}', this.report.historiqueAvenant);
          this.store.dispatch(featureAction.FetchReport(this.report));
        }},
      {label: 'Liste d\'incorporation', icon: 'pi pi-print', command: () => {
          this.report.typeReporting = TypeReport.LISTE_INCORPORATION;
          this.report.historiqueAvenant = historiqueAvenant;
          console.log('==================this.report.historiqueAvenant=================={}', this.report.historiqueAvenant);
          this.store.dispatch(featureAction.FetchReport(this.report));
        }},
      {label: 'Liste actualisée de la police', icon: 'pi pi-print', command: () => {
          this.report.typeReporting = TypeReport.LISTE_ACTUALISE_POLICE;
          this.report.historiqueAvenant = historiqueAvenant;
          console.log('==================this.report.historiqueAvenant=================={}', this.report.historiqueAvenant);
          this.store.dispatch(featureAction.FetchReport(this.report));
        }},
      {label: 'Facture d\'incorporation', icon: 'pi pi-print', command: () => {
          this.report.typeReporting = TypeReport.FACTURE_INCORP;
          this.report.historiqueAvenant = historiqueAvenant;
          console.log('==================this.report.historiqueAvenant=================={}', this.report.historiqueAvenant);
          this.store.dispatch(featureAction.FetchReport(this.report));
        }}
    ];
  }

  printAvenantModification(historiqueAvenant: HistoriqueAvenant) {
    this.typeAvenants = [
      {label: 'Avenant de modification', icon: 'pi pi-print', command: ($event) => {

        }},
      {label: 'Liste modifiée', icon: 'pi pi-print', command: () => {

        }},
      {label: 'Liste actualisée de la police', icon: 'pi pi-print', command: () => {
          this.report.typeReporting = TypeReport.LISTE_ACTUALISE_POLICE;
          this.report.historiqueAvenant = historiqueAvenant;
          console.log('==================this.report.historiqueAvenant=================={}', this.report.historiqueAvenant);
          this.store.dispatch(featureAction.FetchReport(this.report));
        }},
      {label: 'Facture de modification', icon: 'pi pi-print', command: () => {

        }}
    ];
  }

  printAvenantRetrait(historiqueAvenant: HistoriqueAvenant) {
    this.typeAvenants = [
      {label: 'Avenant de retrait', icon: 'pi pi-print', command: ($event) => {
          this.report.typeReporting = TypeReport.AVENANT_RETRAIT;
          this.report.historiqueAvenant = historiqueAvenant;
          console.log('==================this.report.historiqueAvenant=================={}', this.report.historiqueAvenant);
          this.store.dispatch(featureAction.FetchReport(this.report));
        }},
      {label: 'Liste de retrait', icon: 'pi pi-print', command: () => {
          /* this.report.typeReporting = TypeReport.LISTE_RETRAIT;
          this.report.historiqueAvenant = historiqueAvenant;
          console.log('==================this.report.historiqueAvenant=================={}', this.report.historiqueAvenant);
          this.store.dispatch(featureAction.FetchReport(this.report)); */
          this.report.typeReporting = TypeReport.LISTE_RETRAIT;
          this.report.historiqueAvenant = historiqueAvenant;
          console.log('==================this.report.historiqueAvenant=================={}', this.report.historiqueAvenant);
          this.store.dispatch(featureAction.FetchReport(this.report));
        }},
      {label: 'Liste actualisée de la police', icon: 'pi pi-print', command: () => {
          this.report.typeReporting = TypeReport.LISTE_ACTUALISE_POLICE;
          this.report.historiqueAvenant = historiqueAvenant;
          console.log('==================this.report.historiqueAvenant=================={}', this.report.historiqueAvenant);
          this.store.dispatch(featureAction.FetchReport(this.report));
        }},
      {label: 'Facture de retrait', icon: 'pi pi-print', command: () => {
          this.report.typeReporting = TypeReport.FACTURE_INCORP;
          this.report.historiqueAvenant = historiqueAvenant;
          console.log('==================this.report.historiqueAvenant=================={}', this.report.historiqueAvenant);
          this.store.dispatch(featureAction.FetchReport(this.report));
        }}
    ];
  }

  printAvenantAffaireNouvelle(historiqueAvenant: HistoriqueAvenant) {
    this.typeAvenants = [
      {label: 'Avenant d\'affaire Nouvelle', icon: 'pi pi-print', command: ($event) => {
          this.report.typeReporting = TypeReport.AFAIRE_NOUVELLE;
          this.report.historiqueAvenant = historiqueAvenant;
          console.log('==================this.report.historiqueAvenant=================={}', this.report.historiqueAvenant);
          this.store.dispatch(featureAction.FetchReport(this.report));
        }},
      {label: 'Liste d\'affaire Nouvelle', icon: 'pi pi-print', command: () => {
          this.report.typeReporting = TypeReport.LISTE_AFAIRE_NOUVELLE;
          this.report.historiqueAvenant = historiqueAvenant;
          console.log('==================this.report.historiqueAvenant=================={}', this.report.historiqueAvenant);
          this.store.dispatch(featureAction.FetchReport(this.report));
        }},
      {label: 'Liste actualisée de la police', icon: 'pi pi-print', command: () => {
          this.report.typeReporting = TypeReport.LISTE_AFAIRE_NOUVELLE;
          this.report.historiqueAvenant = historiqueAvenant;
          console.log('==================this.report.historiqueAvenant=================={}', this.report.historiqueAvenant);
          this.store.dispatch(featureAction.FetchReport(this.report));
        }},
      {label: 'Facture d\'affaire Nouvelle', icon: 'pi pi-print', command: () => {
          this.report.typeReporting = TypeReport.FACTURE_INCORP;
          this.report.historiqueAvenant = historiqueAvenant;
          console.log('==================this.report.historiqueAvenant=================={}', this.report.historiqueAvenant);
          this.store.dispatch(featureAction.FetchReport(this.report));
        }}
    ];
  }

  printAvenantRenouvellement(historiqueAvenant: HistoriqueAvenant) {
    this.typeAvenants = [
      {label: 'Avenant de renouvellement', icon: 'pi pi-print', command: ($event) => {
          this.report.typeReporting = TypeReport.AVENANT_RENOUVELLEMENT;
          this.report.historiqueAvenant = historiqueAvenant;
          console.log('==================this.report.historiqueAvenant=================={}', this.report.historiqueAvenant);
          this.store.dispatch(featureAction.FetchReport(this.report));
        }},
      {label: 'Facture de renouvellement', icon: 'pi pi-print', command: () => {
          this.report.typeReporting = TypeReport.FACTURE_INCORP;
          this.report.historiqueAvenant = historiqueAvenant;
          console.log('==================this.report.historiqueAvenant=================={}', this.report.historiqueAvenant);
          this.store.dispatch(featureAction.FetchReport(this.report));
        }}
    ];
  }

  printAvenantResiliation(historiqueAvenant: HistoriqueAvenant) {
    this.typeAvenants = [
      {label: 'Avenant de résiliation', icon: 'pi pi-print', command: ($event) => {
          this.report.typeReporting = TypeReport.AVENANT_RESILIATION;
          this.report.historiqueAvenant = historiqueAvenant;
          console.log('==================this.report.historiqueAvenant=================={}', this.report.historiqueAvenant);
          this.store.dispatch(featureAction.FetchReport(this.report));
        }},
      {label: 'Liste de résiliation', icon: 'pi pi-print', command: () => {
          this.report.typeReporting = TypeReport.LISTE_AVENANT_RESILIATION;
          this.report.historiqueAvenant = historiqueAvenant;
          console.log('==================this.report.historiqueAvenant=================={}', this.report.historiqueAvenant);
          this.store.dispatch(featureAction.FetchReport(this.report));
        }},
      {label: 'Liste actualisée', icon: 'pi pi-print', command: () => {
          this.report.typeReporting = TypeReport.LISTE_ACTUALISE_POLICE;
          this.report.historiqueAvenant = historiqueAvenant;
          console.log('==================this.report.historiqueAvenant=================={}', this.report.historiqueAvenant);
          this.store.dispatch(featureAction.FetchReport(this.report));
        }},
      {label: 'Facture de résiliation', icon: 'pi pi-print', command: () => {
          this.report.typeReporting = TypeReport.FACTURE_INCORP;
          this.report.historiqueAvenant = historiqueAvenant;
          console.log('==================this.report.historiqueAvenant=================={}', this.report.historiqueAvenant);
          this.store.dispatch(featureAction.FetchReport(this.report));
        }}
    ];
  }

  printAvenantSuspension(historiqueAvenant: HistoriqueAvenant) {
    this.typeAvenants = [
      {label: 'Avenant de suspension', icon: 'pi pi-print', command: ($event) => {
          this.report.typeReporting = TypeReport.AVENANT_SUSPENSION;
          this.report.historiqueAvenant = historiqueAvenant;
          console.log('==================this.report.historiqueAvenant=================={}', this.report.historiqueAvenant);
          this.store.dispatch(featureAction.FetchReport(this.report));
        }},
      {label: 'Liste de suspension', icon: 'pi pi-print', command: () => {
          this.report.typeReporting = TypeReport.LISTE_AVENANT_SUSPENSION;
          this.report.historiqueAvenant = historiqueAvenant;
          console.log('==================this.report.historiqueAvenant=================={}', this.report.historiqueAvenant);
          this.store.dispatch(featureAction.FetchReport(this.report));
        }},
      {label: 'Liste actualisée', icon: 'pi pi-print', command: () => {
          this.report.typeReporting = TypeReport.LISTE_ACTUALISE_POLICE;
          this.report.historiqueAvenant = historiqueAvenant;
          console.log('==================this.report.historiqueAvenant=================={}', this.report.historiqueAvenant);
          this.store.dispatch(featureAction.FetchReport(this.report));
        }},
      {label: 'Facture de suspension', icon: 'pi pi-print', command: () => {
          this.report.typeReporting = TypeReport.FACTURE_INCORP;
          this.report.historiqueAvenant = historiqueAvenant;
          console.log('==================this.report.historiqueAvenant=================={}', this.report.historiqueAvenant);
          this.store.dispatch(featureAction.FetchReport(this.report));
        }}
    ];
  }


  onTypeHistoriqueAvenantChoose(typeHistoriqueAvenant: TypeHistoriqueAvenant, historiqueAvenant: HistoriqueAvenant) {
    switch (typeHistoriqueAvenant) {
      case TypeHistoriqueAvenant.INCORPORATION: {
        this.printAvenantIncorporation(historiqueAvenant);
        break;
      }
      case TypeHistoriqueAvenant.MODIFICATION: {
        this.printAvenantModification(historiqueAvenant);
        break;
      }
      case TypeHistoriqueAvenant.RETRAIT: {
        this.printAvenantRetrait(historiqueAvenant);
        break;
      }
      case TypeHistoriqueAvenant.RENOUVELLEMENT: {
        this.printAvenantRenouvellement(historiqueAvenant);
        break;
      }
      case TypeHistoriqueAvenant.AFAIRE_NOUVELLE: {
        this.printAvenantAffaireNouvelle(historiqueAvenant);
        break;
      }
      case TypeHistoriqueAvenant.RESILIATION: {
        this.printAvenantResiliation(historiqueAvenant);
        break;
      }
      case TypeHistoriqueAvenant.SUSPENSION: {
        this.printAvenantSuspension(historiqueAvenant);
        break;
      }
      default: {
        return null;
      }
    }
   /* if (typeHistoriqueAvenant === TypeHistoriqueAvenant.INCORPORATION) {
      this.printAvenantIncorporation(police);
    } else if (typeHistoriqueAvenant === TypeHistoriqueAvenant.MODIFICATION) {
      this.printAvenantModification();
    } else if (typeHistoriqueAvenant === TypeHistoriqueAvenant.RETRAIT) {
      this.printAvenantRetrait();
    } else if (typeHistoriqueAvenant === TypeHistoriqueAvenant.RENOUVELLEMENT) {
      this.printAvenantRenouvellement();
    }*/
  }

  getAvenantModification(avenant: any) {
    // const avenant: Avenant = event;
    // avenant.
    // const historiqueAvenant: HistoriqueAvenant = {};
    // historiqueAvenant.typeHistoriqueAvenant = TypeHistoriqueAvenant.MODIFICATION;
    // avenant.historiqueAvenant = historiqueAvenant;
    avenant.historiqueAvenant.typeHistoriqueAvenant = TypeHistoriqueAvenant.MODIFICATION;
    console.log("envoyé 2", avenant);
    this.historiqueAvenantService.postAvenant(avenant).subscribe(
        (res) => {
          console.log('***************RETOUR********************');
          if (res) {
            this.addMessage('success', 'Opération reussie', 'Avenant créé avec succès');
            this.initDisplayAvenant();
            this.dissplayavenant = false;
          } else {
            this.addMessage('error', 'Echec de l\'Opération', 'Verrifiez vos informations');
          }
        }
   );
    console.log('********************Avenant modification************************');
    console.log(avenant);
    avenant = {};
  }

  getAvenantRenouvellement(event: Avenant): void {
    const avenant: Avenant = event;
    let historiqueAvenant: HistoriqueAvenant = {};
    let exercice: Exercice = {};
    exercice = event.exercice;
    avenant.exercice = exercice;
    historiqueAvenant = event.historiqueAvenant;
    avenant.historiqueAvenant = historiqueAvenant;
    avenant.creation = event.creation;
    console.log('********************Avenant renouvellement************************');
    console.log(event);
    if(avenant.historiqueAvenant.isTerminer) {
      this.addMessage('success', 'Opération reussie', 'Création de l\'avenant terminée avec succès');
      this.dissplayavenant = false;
      this.initDisplayAvenant();
    }else{
      console.log('********************Avenant renouvellement************************');
    console.log(event);
     this.historiqueAvenantService.postAvenant(event).subscribe(
        (res) => {
          console.log('***************RETOUR RENOUV********************');
          if (res) {
            event.familles = [];
            console.log('***************res********************', res);
            this.addMessage('success', 'Opération reussie', 'Avenant créé avec succès');
            if(avenant.historiqueAvenant.isTerminer) {
              this.dissplayavenant = false;
              this.initDisplayAvenant();
            }

            this.historiqueRev = res.historiqueAvenant;
            this.historiqueGroupeRev = res.groupes;
            console.log('***************this.historiqueRev********************', this.historiqueRev);
            console.log('***************this.historiqueGroupeRevPolice********************', this.historiqueGroupeRev);
            this.exerciceRev = res.historiqueAvenant.exercice;
            console.log('***************this.exerciceRev********************', this.exerciceRev);
          } else {
            this.addMessage('error', 'Echec de l\'Opération', 'Verrifiez vos informations');
          }
        }
    );
    } 
  }

  loadHistoriquePlafondGroupe(): void {
    const avanantId = '';
    this.historiquePlafondList$ = this.store.pipe(select(historiqueAvenantSelector.historiquePlafondGroupe));
    this.store.dispatch(featureActionHistoriqueAdherant.loadHistoriquePlafondGroupe({avanantId: avanantId, grpId: avanantId}));
    this.historiquePlafondList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.historiquePlafondList = value.slice();
      }
    });
  }

  loadHistoriquePlafondGroupeFamilleActe(): void {
    const avanantId = '';
    this.historiquePlafondFamilleActeList$ = this.store.pipe(select(historiqueAvenantSelector.historiquePlafondGroupeFamilleActe));
    this.store.dispatch(featureActionHistoriqueAdherant.loadHistoriquePlafondFamilleActe({avanantId: avanantId, grpId: avanantId}));
    this.historiquePlafondFamilleActeList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.historiquePlafondFamilleActeList = value.slice();
      }
    });
  }

  loadHistoriquePlafondGroupeActe(): void {
    const avanantId = '';
    this.historiquePlafondActeList$ = this.store.pipe(select(historiqueAvenantSelector.historiquePlafondGroupeActe));
    this.store.dispatch(featureActionHistoriqueAdherant.loadHistoriquePlafondGroupe({avanantId: avanantId, grpId: avanantId}));
    this.historiquePlafondActeList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.historiquePlafondActeList = value.slice();
      }
    });
  }

  loadHistoriquePlafondGroupeSousActe(): void {
    const avanantId = '';
    this.historiquePlafondSousActeList$ = this.store.pipe(select(historiqueAvenantSelector.historiquePlafondGroupeSousActe));
    this.store.dispatch(featureActionHistoriqueAdherant.loadHistoriquePlafondGroupe({avanantId: avanantId, grpId: avanantId}));
    this.historiquePlafondSousActeList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.historiquePlafondSousActeList = value.slice();
      }
    });
  }

  onAdherentPrintRetrait(historiqueAvenant) {
    this.report.typeReporting = TypeReport.LISTE_RETRAIT;
    this.report.historiqueAvenant = historiqueAvenant;
    console.log('==================this.report.historiqueAvenant=================={}', this.report.historiqueAvenant);
    this.store.dispatch(featureAction.FetchReport(this.report));
  }
  onAdherentPrintIncorporation(historiqueAvenant) {
    this.report.typeReporting = TypeReport.LISTE_INCORPORATION;
    this.report.historiqueAvenant = historiqueAvenant;
    console.log('==================this.report.historiqueAvenant=================={}', this.report.historiqueAvenant);
    this.store.dispatch(featureAction.FetchReport(this.report));
  }
  onAdherentPrintAffaireNouvelle(historiqueAvenant, groupeSelect) {
    console.log('==================groupeSelect=================={}', groupeSelect);
    if(groupeSelect != null ){
      this.report.typeReporting = TypeReport.LISTE_AFAIRE_NOUVELLE1;
      this.historiqueAvenant.groupeId = groupeSelect.id;
      console.log('==================groupeSelect=================={}', groupeSelect.id);
      this.report.historiqueAvenant = historiqueAvenant;
      // this.report.historiqueAvenant.groupeId = historiqueAvenant.groupeId;
      console.log('==================this.report.historiqueAvenant avec groupe=================={}', this.report.historiqueAvenant);
      this.store.dispatch(featureAction.FetchReport(this.report));
    } else {
      this.report.typeReporting = TypeReport.LISTE_AFAIRE_NOUVELLE1;
      this.report.historiqueAvenant = historiqueAvenant;
      console.log('==================this.report.historiqueAvenant sans groupe=================={}', this.report.historiqueAvenant);
      this.store.dispatch(featureAction.FetchReport(this.report));
    }
    
  }
  onAdherentPrintResiliation(historiqueAvenant) {
    this.report.typeReporting = TypeReport.LISTE_AVENANT_RESILIATION;
    this.report.historiqueAvenant = historiqueAvenant;
    console.log('==================this.report.historiqueAvenant=================={}', this.report.historiqueAvenant);
    this.store.dispatch(featureAction.FetchReport(this.report));
  }
  onAdherentPrintSuspension(historiqueAvenant) {
    this.report.typeReporting = TypeReport.LISTE_AVENANT_SUSPENSION;
    this.report.historiqueAvenant = historiqueAvenant;
    console.log('==================this.report.historiqueAvenant=================={}', this.report.historiqueAvenant);
    this.store.dispatch(featureAction.FetchReport(this.report));
  }

  voirPrime(rowdata: HistoriqueAvenant): void {
    this.historiqueAvenantAdherentService.findHistoriqueAvenantPrime(rowdata.id).subscribe(
        (res) => {
          this.historiqueAvenantPrimes = res || [];
          this.displayDialogPrime = true;
          res.forEach(prime => {
            this.primetotal += prime.primeTotal;
          });
          // console.log(res);
        }
    );
  }

  getSortie(event: any): void {
    console.log(event);
    this.initDisplayAvenant();
  }


  onAdherentPrint4(historiqueAvenant) {
    this.report.typeReporting = TypeReport.LISTE_AVENANT_RENOUVELLEMENT;
    this.report.historiqueAvenant = historiqueAvenant;
    console.log('==================this.report.historiqueAvenant=================={}', this.report.historiqueAvenant);
    this.store.dispatch(featureAction.FetchReport(this.report));
  }

  getAvenantResiliation(event: HistoriqueAvenant): void {
    this.historiqueAvenant = event;
    this.historiqueAvenant.police = this.policeItem;
    this.store.dispatch(featureActionHistoriqueAdherant.createHistoriqueAvenant(this.historiqueAvenant));
    this.dissplayavenant = false;
  }

  getAvenantSuspension(event: HistoriqueAvenant): void {
    this.historiqueAvenant = event;
    this.historiqueAvenant.police = this.policeItem;
    this.store.dispatch(featureActionHistoriqueAdherant.createHistoriqueAvenant(this.historiqueAvenant));
    this.dissplayavenant = false;
  }
  changeStatus(historiqueAvenant: HistoriqueAvenant, state: boolean): void {
    this.historiqueAvenantService.changeStatus(historiqueAvenant.id, state).subscribe(
        (res) => {
          this.historiqueAvenant = res;
          this.onRowSelectPolice(res.police);
          this.loadPoliceListe();
          historiqueAvenant = {};
          console.log('historiqueAvenantChangeStatus', historiqueAvenant);
        }
    );
    historiqueAvenant = {};
  }


  printListeActualisee(historiqueAvenant: HistoriqueAvenant) {
    this.report.typeReporting = TypeReport.LISTE_ACTUALISE_POLICE;
    this.report.historiqueAvenant = historiqueAvenant;
    console.log('==================this.report.historiqueAvenant=================={}', this.report.historiqueAvenant);
    this.store.dispatch(featureAction.FetchReport(this.report));
  }

  calculerPrime(rowdata: HistoriqueAvenant): void {
    this.primetotal = 0;
    this.historiqueAvenantService.calculerPrime(rowdata.id).subscribe(
        (res) => {
          this.historiqueAvenantPrimes = res;
          console.log('****************************res************************************', res);
          res.forEach(prime => {
            this.primetotal += prime.primeTTC;
          });
          this.displayDialogPrime = true;
        }
    );
  }

  validerPrime(historiqueAvenant: HistoriqueAvenant): void {
    this.historiqueAvenantPrimes.forEach(hap => {
      if (hap.fraisAccessoir) {
        hap.fraisAccessoir = removeBlanks(hap.fraisAccessoir + '');
      }
      if (hap.fraisBadge) {
        hap.fraisBadge = removeBlanks(hap.fraisBadge + '');
      }
      if (hap.primeNet) {
        hap.primeNet = removeBlanks(hap.primeNet + '');
      }
      if (hap.primeTotal) {
        hap.primeTotal = removeBlanks(hap.primeTotal + '');
      }
      if (hap.primeTTC) {
        hap.primeTTC = removeBlanks(hap.primeTTC + '');
      }
      hap.status = true;
      hap.historiqueAvenant = {};
    });
    historiqueAvenant.historiqueAvenantPrimes = this.historiqueAvenantPrimes;
     this.historiqueAvenantService.misAJoursHistoriqueAvenant(historiqueAvenant).subscribe(
        (res) => {
          historiqueAvenant = res;
          this.displayDialogPrime = false;
          this.onExerciceChange2();
        }
    ); 
    /* this.historiqueAvenantService.validerPrime(this.historiqueAvenantPrimes).subscribe(
        (res) => {
          this.historiqueAvenantPrimes = res;
          this.displayDialogPrime = false;
          this.onExerciceChange();
        }
    ); */
  }
  annulerPrime(): void {
      this.historiqueAvenantPrimes = [];
      this.displayDialogPrime = false;
      this.primetotal = 0;
  }

  annulerPrimeTotalePolice(): void {
    this.historiqueAvenantPrime = {};
    this.displayPrimeTotalePolice = false;
    // this.primetotal = 0;
}
  
  addMessage(severite: string, resume: string, detaile: string): void {
    this.messageService.add({severity: severite, summary: resume, detail: detaile});
  }

  setPolice(police: Police) {
    this.policeItem = police;
    console.log('................police............................', police);
    this.historiqueAvenantListWithoutActiveList$ = this.store.pipe(select(historiqueAvenantSelector.historiqueAvenantListWithoutActive({policeId: this.policeItem.id})));
    this.store.dispatch(historiqueAvenantSelector.historiqueAvenantListWithoutActive({policeId: this.policeItem.id}));
    this.historiqueAvenantListWithoutActiveList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        // this.loading = false;
        this.historiqueAvenantListWithoutActiveList = value.slice();
        console.log('................historiqueAvenantListWithoutActiveList............................');
        console.log(this.historiqueAvenantList.length);
      }
    });
  }

  onRowEditInitPrime(historiqueAvenantPrime: HistoriqueAvenantPrime) {
    this.clonedPPrime[historiqueAvenantPrime.id] = {...historiqueAvenantPrime};
  }

  onRowEditSavePrime(historiqueAvenantPrime: HistoriqueAvenantPrime) {
      delete this.clonedPPrime[historiqueAvenantPrime.id];
      // this.messageService.add({severity: 'success', summary: 'Success', detail: 'Product is updated'});
  }

  onRowEditCancelPrime(historiqueAvenantPrime: HistoriqueAvenantPrime, index: number) {
    this.historiqueAvenantPrimes[index] = this.clonedPPrime[historiqueAvenantPrime.id];
    delete this.clonedPPrime[historiqueAvenantPrime.id];
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

  onExerciceChange(): void {
    console.log('curent exo === ');
    console.log(this.curentExercice);
    // this.exercice = {...exercice}
    if (this.curentExercice && this.curentExercice.id !== '') {
      this.historiqueAvenants1$ = this.store.pipe(select(historiqueAvenantSelector.historiqueAvenantList));
      this.store.dispatch(featureActionHistoriqueAdherant.loadHistoriqueAvenantByExercice({exerciceId: this.curentExercice.id}));
      this.historiqueAvenants1$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
        if (value) {
          // this.loading = false;
          this.historiqueAvenants1 = value.slice();
          console.log('................historiqueAvenants1............................');
          console.log(this.historiqueAvenants1);
          console.log('................historiqueAvenantListWithoutActiveList............................');
          console.log(this.historiqueAvenantList.length);
        }
      });
    } else {
    this.historiqueAvenants1$ = this.store.pipe(select(historiqueAvenantSelector.historiqueAvenantList));
    this.store.dispatch(featureActionHistoriqueAdherant.loadHistoriqueAvenant({policeId: this.police.id}));
    this.historiqueAvenants1$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        // this.loading = false;
        this.historiqueAvenants1 = value.slice();
        console.log('................historiqueAvenantListWithoutActiveList............................');
        console.log('................historiqueAvenants1............................');
        console.log(this.historiqueAvenants1);
        console.log(this.historiqueAvenantList.length);
      }
    });
       }
  }

  onExerciceChange2() {
    this.historiqueAvenants1$ = this.store.pipe(select(historiqueAvenantSelector.historiqueAvenantList));
    this.store.dispatch(featureActionHistoriqueAdherant.loadHistoriqueAvenant({policeId: this.police.id}));
    this.historiqueAvenants1$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        // this.loading = false;
        this.historiqueAvenants1 = value.slice();
        console.log('................historiqueAvenantListWithoutActiveList............................');
        console.log(this.historiqueAvenantList.length);
      }
    });
  }

  private loadPoliceListe() {
    this.policeList$ = this.store.pipe(select(policeList));
    this.store.dispatch(loadPoliceByAffaireNouvelle());
    this.policeList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.loading = false;
        this.policeList = value.slice();
        console.log('................this.policeList............................');
        console.log(this.policeList);
      }
    });
  }

  onChangePrimeNet(): void {
    this.historiqueAvenantPrimes.forEach(hap => {
      if (hap.primeNet) {
        hap.primeNet = removeBlanks(hap.primeNet + '');
      }
      if (hap.primeTotal) {
        hap.primeTotal = removeBlanks(hap.primeTotal + '');
      }
      if (!hap.groupe) {
        hap.primeNet = this.historiqueAvenantPrimes.filter(g => g.groupe !== null)
            .map(elem => elem.primeNet).reduce((a, b) => a + b);
        hap.primeTotal = this.historiqueAvenantPrimes.filter(g => g.groupe !== null)
            .map(elem => elem.primeTotal).reduce((a, b) => a + b);
      }
    });
  }

  disableAvenant(historiqueAvenant: HistoriqueAvenant): boolean {
    // const value = false;
    switch (historiqueAvenant.typeHistoriqueAvenant) {
      case TypeHistoriqueAvenant.RETRAIT:
        if (historiqueAvenant.historiqueAvenantPrimes.length > 0) {
          return true;
        }
        return false;
      case TypeHistoriqueAvenant.INCORPORATION:
        if (historiqueAvenant.historiqueAvenantPrimes.length > 0) {
          return true;
        }
        return false;
      case TypeHistoriqueAvenant.AFAIRE_NOUVELLE:
        if (historiqueAvenant.historiqueAvenantPrimes.length > 0) {
          return true;
        }
        return false;
      case TypeHistoriqueAvenant.MODIFICATION:
        return true;
      case TypeHistoriqueAvenant.RENOUVELLEMENT:
        if (historiqueAvenant.historiqueAvenantPrimes.length > 0) {
          return true;
        }
        return false;
      case TypeHistoriqueAvenant.RESILIATION:
        if (historiqueAvenant.historiqueAvenantPrimes.length > 0 || historiqueAvenant.typeDemandeur !== TypeDemandeur.VIMSO) {
          return true;
        }
        return false;
      case TypeHistoriqueAvenant.SUSPENSION:
        return true;
      default: return false;
    }
  }

  onUpdateAvenant(rowdata: HistoriqueAvenant): void {
    console.log('modification en cours ..........');
    this.policeItem = rowdata.police;
    this.historiqueAvenant = rowdata;
    switch (rowdata.typeHistoriqueAvenant) {
      case TypeHistoriqueAvenant.INCORPORATION:
        this.initDisplayAvenant();
        this.isAvenantIncorporation = true;
        this.addAvenant();
        this.entete = 'Avenant d\'incorporation';
        break;
      case TypeHistoriqueAvenant.RETRAIT:
        this.initDisplayAvenant();
        this.isAvenantRetrait = true;
        this.addAvenant();
        this.entete = 'Avenant de retrait';
        break;
      case TypeHistoriqueAvenant.SUSPENSION:
        this.initDisplayAvenant();
        this.isAvenantSuspension = true;
        this.addAvenant();
        this.policeItem = rowdata.police;
        this.entete = 'Avenant de suspension'.toUpperCase();
        break;
      case TypeHistoriqueAvenant.RESILIATION:
        this.initDisplayAvenant();
        this.isAvenantResiliation = true;
        this.addAvenant();
        this.entete = 'Avenant de résiliation'.toUpperCase();
        break;
      case TypeHistoriqueAvenant.MODIFICATION:
        this.initDisplayAvenant();
        this.isAvenantModification = true;
        this.addAvenant();
        this.entete = 'Avenant de modification'.toUpperCase();
        this.policeItem = rowdata.police;
        break;
      case TypeHistoriqueAvenant.RENOUVELLEMENT:
        this.initDisplayAvenant();
        this.isAvenantRenouvellement = true;
        this.addAvenant();
        this.entete = 'Avenant de renouvellement'.toUpperCase();
        this.policeItem = rowdata.police;
        break;
      default: break;/*  */
    }
    this.etat = 'UPDATE';
    // this.initDisplayAvenant();
    // this.isAvenantIncorporation = true;
    // this.addAvenant();
    // this.entete = 'Avenant d\'incorporation';
  }

  calculePossible(avenant: HistoriqueAvenant): boolean {
    console.log('rowData ====  ', avenant);
    let isPossible: boolean = true;
    switch (avenant?.typeHistoriqueAvenant) {
      case TypeHistoriqueAvenant.AFAIRE_NOUVELLE :
        console.log('rowData 1  ');
        isPossible = avenant.validePrime;
        break;
      case TypeHistoriqueAvenant.INCORPORATION :
        console.log('rowData 2  ');
        isPossible = !avenant.valide;
        break;
      case TypeHistoriqueAvenant.RETRAIT :
        console.log('rowData 3  ');
        isPossible = !avenant.valide;
        break;
      case TypeHistoriqueAvenant.MODIFICATION :
        console.log('rowData 4  ');
        isPossible = false;
        break;
      case TypeHistoriqueAvenant.RENOUVELLEMENT :
        console.log('rowData 5  ');
        isPossible = !avenant.valide;
        break;
      case TypeHistoriqueAvenant.RESILIATION :
        console.log('rowData 6  ');
        if (avenant.typeDemandeur === TypeDemandeur.SOUSCRIPTEUR) {
          isPossible = !avenant.valide;
        } else {
          isPossible = false;
        }
        break;
     default:
      isPossible = false;
       break;
    }
    return isPossible ;
  }

  supprimerAvenant(rowdata: HistoriqueAvenant): void {
    this.store.dispatch(historiqueAvenantAction.deleteHistoriqueAvenant(rowdata));
    // this.historiqueAvenantList$ = this.store.pipe(select(historiqueAvenantSelector.historiqueAvenantList));
  }

  getStatistique(police: Police): void {
    console.log('get statistique police ....start...');
    this.policeService.rapportPolice(police).subscribe(
      (res) => {
        this.stat = res;
        this.viewStat = true;
        console.log('get statistique police ....end...', res);
      }
    );
  }

  hideStat(): void {
    this.viewStat = false;
  }

  voirContrat(police: Police): void {

    this.viewPolice = police;
    this.displayViewContrat = true;
  }

  loadGoupeByPolice1(police: Police): void {
    this.groupeList$ = this.store.pipe(select(groupeList));
    this.store.dispatch(loadGroupe({policeId: police.id}));
    this.groupeList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.groupeView = value.slice();
      }
    });
  }

  loadPlafondByGroupe(groupe: Groupe): void {
      this.plafondService.getPlafondGroupeFamilleActeByGroupe(groupe.id).subscribe(
              (res) => {
                this.avenantModif1.plafondFamilleActes = res.body;
                console.log('******plafondFamilleActes*******', this.avenantModif1.plafondFamilleActes)
              }
      );
      this.plafondService.getPlafondGroupeActeByGroupe(groupe.id).subscribe(
        (rest) => {
          this.avenantModif.plafondGroupeActes = rest.body;
        
    
        }
    );
    
  }


  loadActualListByContrat(police: Police): void {
    this.adherentService.findAdherantActuallList(police.id).subscribe(
        (res) => {
          this.avenantModif1.adhrents = res;
          console.log("=============================res=============");
          console.log(res);
          console.log("=============================res=============");
        
        }
    );
  }

  getPrimeTotalByPoliceId() {
    if (this.police.id) {
      this.historiqueAvenantService.getPrimeTotalByPoliceId(this.police.id).subscribe(
          (res) => {
            this.historiqueAvenantPrime = res;
            console.log("=============================this.historiqueAvenantPrime =============");
            console.log(this.historiqueAvenantPrime );
            // this.historiqueAveantAdherantsByExerciceTMP = res;
          }
      );
    }
  }

  fermerListe(){
    this.displayALA = false;
    this.curentExercice = {};
    this.adherentsListeActuelleByExercice = [];
    this.adherentsListeActuelleByExerciceRetirer = [];
  }

  onRowSelect(event) {
    this.adherentHisChecked = event.data;
   
  }

  onBasicUpload(event, form) {
    console.log("=============================res=============");
    console.log(this.adherentHisChecked);
    console.log("=============================res=============");
    if(!this.adherentHisChecked){
      this.showToast("error", "INFORMATION", "Veuillez selectionner la photo de l'adherent");
   } else {
    this.confirmationService.confirm({
      message: 'Etes vous sur d\'importer la photos de l\'adherent',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log(event.files[0]);
        this.store.dispatch(featureActionAdherent.importPhotosAdherent({file:event.files[0], idAdherent:this.adherentHisChecked.adherent?.id, idGroupe: this.groupe.id}));
        form.clear();
      },
    });
   }
  }

  onBasicUploadLot(event, form) {
    console.log(event.files);
    this.confirmationService.confirm({
      message: 'Etes vous sur d\'importer la photos des adherents par lot',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log(event.files);
        this.store.dispatch(featureActionAdherent.importPhotosAdherentLot({file:event.files, idGroupe: this.groupe.id}));
        form.clear();
      },
    });

  }

  impAssureGroupe(){
    this.displayImpGroupe = true;
    this.getGroupeByPolice2();
  }

  getGroupeByPolice(historique :HistoriqueAvenant) {
    this.groupeService.getGroupewithSameId(historique.police.id).subscribe(
      (res) => {
        this.listGroupe = res;
        console.log("=============================this.listGroupe =============");
        console.log(this.listGroupe );
        // this.historiqueAveantAdherantsByExerciceTMP = res;
      }
  );
  }

  getGroupeByPolice2 (){
    this.groupeList$ = this.store.pipe(select(groupeSlector.groupeList));
        this.store.dispatch(loadGroupe({policeId: this.police.id}));
        this.groupeList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
            if (value) {
                this.groupeListes = value.slice();
                console.log("=============================this.groupeListes =============", this.groupeListes);
                // console.log(this.groupeListes);
            }
        });
  }
}
