import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Police} from '../../../../store/contrat/police/model';
import {Exercice} from '../../../../store/contrat/exercice/model';
import {select, Store} from '@ngrx/store';

import {takeUntil} from 'rxjs/operators';
import {Observable, Subject, Subscription} from 'rxjs';
import * as groupeSlector from '../../../../store/contrat/groupe/selector';
import {Groupe} from '../../../../store/contrat/groupe/model';
import {AppState} from '../../../../store/app.state';
import {ConfirmationService, MessageService} from 'primeng/api';
import {loadGroupe} from '../../../../store/contrat/groupe/actions';
import {Adherent} from '../../../../store/contrat/adherent/model';
import {loadAdherent} from '../../../../store/contrat/adherent/actions';
import {
  Avenant,
  AvenantModification,
  HistoriqueAvenant,
  HistoriqueAvenantAdherant,
  HistoriquePlafond,
  HistoriquePlafondActe,
  HistoriquePlafondFamilleActe,
  HistoriquePlafondSousActe, TypeDemandeur
} from '../../../../store/contrat/historiqueAvenant/model';
import { groupeList } from '../../../../store/contrat/groupe/selector';
import {HistoriqueAvenantService} from '../../../../store/contrat/historiqueAvenant/service';
import * as genreSelector from '../../../../store/parametrage/genre/selector';
import {loadGenre} from '../../../../store/parametrage/genre/actions';
import {Genre} from '../../../../store/parametrage/genre/model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {EntityValidations} from '../../../common/models/validation';
import {TypePrime} from '../../../../store/parametrage/type-prime/model';
import * as typePrimeSelector from '../../../../store/parametrage/type-prime/selector';
import {loadTypePrime} from '../../../../store/parametrage/type-prime/actions';
import {PlafondActe, PlafondFamilleActe, PlafondSousActe} from '../../../../store/parametrage/plafond/model';
import {SousActe} from '../../../../store/parametrage/sous-acte/model';
import * as sousActeSelector from '../../../../store/parametrage/sous-acte/selector';
import {loadSousActe} from '../../../../store/parametrage/sous-acte/actions';
import * as garantSelector from '../../../../store/contrat/garant/selector';
import {loadGarant} from '../../../../store/contrat/garant/actions';
import {Garant} from '../../../../store/contrat/garant/model';
import {Acte} from '../../../../store/parametrage/acte/model';
import * as acteSelector from '../../../../store/parametrage/acte/selector';
import {loadActe} from '../../../../store/parametrage/acte/actions';
import * as paysSelector from '../../../../store/parametrage/pays/selector';
import {loadPays} from '../../../../store/parametrage/pays/actions';
import * as regionSelector from '../../../../store/parametrage/region/selector';
import {loadRegion} from '../../../../store/parametrage/region/actions';
import * as departementSelector from '../../../../store/parametrage/departement/selector';
import {loadDepartement} from '../../../../store/parametrage/departement/actions';
import * as communeSelector from '../../../../store/parametrage/commune/selector';
import {loadCommune} from '../../../../store/parametrage/commune/actions';
import * as secteurActiviteSelector from '../../../../store/parametrage/secteur-activite/selector';
import {loadSecteurActivite} from '../../../../store/parametrage/secteur-activite/actions';
import * as dimensionPeriodeSelector from '../../../../store/parametrage/dimension-periode/selector';
import {loadDimensionPeriode} from '../../../../store/parametrage/dimension-periode/actions';
import {Pays} from '../../../../store/parametrage/pays/model';
import {Region} from '../../../../store/parametrage/region/model';
import {Departement} from '../../../../store/parametrage/departement/model';
import {Commune} from '../../../../store/parametrage/commune/model';
import {SecteurActivite} from '../../../../store/parametrage/secteur-activite/model';
import {DimensionPeriode} from '../../../../store/parametrage/dimension-periode/model';
import * as featureActionsPlafond from '../../../../store/contrat/plafond/action';
import {Plafond} from '../../../../store/contrat/plafond/model';
import * as policeSelector from '../../../../store/contrat/police/selector';
import {AdherentService} from '../../../../store/contrat/adherent/service';
import {loadGarantie} from '../../../../store/parametrage/garantie/actions';
import * as garantieSelector from '../../../../store/parametrage/garantie/selector';
import {Garantie} from '../../../../store/parametrage/garantie/model';
import * as tauxSelector from '../../../../store/parametrage/taux/selector';
import {loadTaux} from '../../../../store/parametrage/taux/actions';
import {Taux} from '../../../../store/parametrage/taux/model';
import * as territorialiteSelector from '../../../../store/parametrage/territorialite/selector';
import {loadTerritorialite} from '../../../../store/parametrage/territorialite/actions';
import {Territorialite} from '../../../../store/parametrage/territorialite/model';
import * as historiqueAvenantSelector from '../../../../store/contrat/historiqueAvenant/selector';
import * as featureActionHistoriqueAdherant from '../../../../store/contrat/historiqueAvenant/actions';
import {HistoriqueAvenantAdherentService} from '../../../../store/contrat/historiqueAvenantAdherent/service';
import * as qualiteAssureSelector from '../../../../store/parametrage/qualite-assure/selector';
import {loadQualiteAssure} from '../../../../store/parametrage/qualite-assure/actions';
import {QualiteAssure} from '../../../../store/parametrage/qualite-assure/model';
import {PlafondService} from '../../../../store/contrat/plafond/service';
import {TypeBareme} from '../../../common/models/bareme.enum';
import {Status as Etat} from '../../../common/models/etat.enum';
import {PoliceService} from '../../../../store/contrat/police/service';
import {ExerciceService} from '../../../../store/contrat/exercice/service';
import {Prime} from '../../../../store/contrat/prime/model';

@Component({
  selector: 'app-avenant-modification',
  templateUrl: './avenant-modification.component.html',
  styleUrls: ['./avenant-modification.component.scss']
})
export class AvenantModificationComponent implements OnInit {
  @Input() historiqueAvenantAdherantList: Array<HistoriqueAvenantAdherant>;
  @Input() police: Police;
  groupe: Groupe;
  groupePolicy: any;
  adherantListTmp: Array<HistoriqueAvenantAdherant>;
  groupes: Array<Groupe>;
  groupeListes: Array<Groupe>;
  groupeList$: Observable<Array<Groupe>>;
  // @Input() avenantModification: AvenantModification;
  @Output() eventEmitterM = new EventEmitter();
  destroy$ = new Subject<boolean>();
  obj: any = {group: {}, prime: {}};
  historiqueAveantAdherants: HistoriqueAvenantAdherant[] = [];
  historiqueAveantAdherantsTMP: HistoriqueAvenantAdherant[] = [];
  historiqueAveantAdherantEdited: HistoriqueAvenantAdherant[] = [];
  private clonedProducts: any = [];
  private products2: any = [];
  genreList: Array<Genre>;
  genreList$: Observable<Array<Genre>>;
  groupeSelected: Groupe = {};
  groupeForm: FormGroup;
  primeForm: FormGroup;
  entityValidations: Array<EntityValidations>;
  policeForm: FormGroup;
  dateEffet: Date;
  dateEcheance: Date;
  typePrimeList: Array<TypePrime>;
  typePrimeList$: Observable<Array<TypePrime>>;
  selectedTypePrime: TypePrime = {};
  plafondFamilleActe: Array<PlafondFamilleActe>;
  plafondFamilleActeTemp: PlafondFamilleActe;
  plafondFamilleActeConstruct: Array<PlafondFamilleActe> = [];
  plafondActe: Array<PlafondActe>;
  plafondSousActe: Array<PlafondSousActe>;
  private indexeActe: any;
  clonedPlafondFamilleActe: { [s: string]: PlafondFamilleActe } = {};
  clonedAdherentFamille: { [s: string]: Adherent } = {};
  clonedPlafondActe: { [s: string]: PlafondActe } = {};
  clonedPlafondFamilleActeTemp: { [s: string]: PlafondFamilleActe } = {};
  clonedPlafondSousActe: { [s: string]: PlafondSousActe } = {};
  private countfamilleActe = 0;
  tauxList$: Observable<Array<Taux>>;
  tauxList: Array<Taux>;
  sousActeList$: Observable<Array<SousActe>>;
  sousActeList: Array<SousActe>;
  garantList$: Observable<Array<Garant>>;
  garantList: Array<Garant>;
  private displaySousActe = false;
  acteList$: Observable<Array<Acte>>;
  acteList: Array<Acte>;
  paysList$: Observable<Array<Pays>>;
  paysList: Array<Pays>;
  regionList$: Observable<Array<Region>>;
  regionList: Array<Region>;
  departementList$: Observable<Array<Departement>>;
  departementList: Array<Departement>;
  communeList$: Observable<Array<Commune>>;
  communeList: Array<Commune>;
  adherantPoliceList: Observable<Array<Adherent>>;
  secteurActiviteList$: Observable<Array<SecteurActivite>>;
  secteurActiviteList: Array<SecteurActivite>;
  dimensionPeriodeList$: Observable<Array<DimensionPeriode>>;
  dimensionPeriodeList: Array<DimensionPeriode>;
  plafond: Plafond;
  plafondForm: FormGroup;
  private historiqueAvenantAdherantFrom: FormGroup;
  private familleActe$: Observable<any>;
  garanties: Array<Garantie>;
  garantieList$: Observable<Array<Garantie>>;
  territorialiteList$: Observable<Array<Territorialite>>;
  territorialiteList: Array<Territorialite>;
  objet: Avenant = {};
  typeDuree: any = [{label: 'Jour', value: 'Jour'},
    {label: 'Mois', value: 'Mois'}, {label: 'Année', value: 'Annee'}];
  private myForm: FormGroup;
  typeDureeSelected: string;
  historiqueAvenant: HistoriqueAvenant = {};
  qualiteAssureList1: Array<QualiteAssure>;
  qualiteAssureList2: Array<QualiteAssure>;
  qualiteAssureList$: Observable<Array<QualiteAssure>>;
  @Output() returnEvent = new EventEmitter();
  groupePlafongConfig: Groupe = {};
  plafondFamilleActePlafongConfig: Array<PlafondFamilleActe> = [];
  plafondFamilleActeTempPlafongConfig: PlafondFamilleActe = {};
  plafondFamilleActeConstructPlafongConfig: Array<PlafondFamilleActe> = [];
  plafondActePlafongConfig: Array<PlafondActe> = [];
  plafondSousActePlafongConfig: Array<PlafondSousActe> = [];
  private clonedPlafondConfiguration: any = {};
  typeBareme =   Object.keys(TypeBareme).map(key => ({ label: TypeBareme[key], value: key }));
  typeEtat = Object.keys(Etat).map(key => ({ label: Etat[key], value: key }));
  private exercice: Exercice;
  private exerciceForm: FormGroup;
  private curentGroupe: Groupe;
  constructor(
      private store: Store<AppState>,
      private messageService: MessageService,
      private confirmationService: ConfirmationService,
      private historiqueAvenantService: HistoriqueAvenantService,
      private formBuilder: FormBuilder,
      private adherentService: AdherentService,
      private historiqueAvenantAdherentService: HistoriqueAvenantAdherentService,
      private plafondService: PlafondService,
      private policeService: PoliceService,
      private exerciceService: ExerciceService,
  ) {
    this.groupeForm = this.formBuilder.group({
      id: new FormControl(null),
      libelle: new FormControl('', [Validators.required]),
      taux: new FormControl(null, [Validators.required]),
      territorialite: new FormControl(null, [Validators.required]),
      duree: new FormControl('', [Validators.required]),
      dateEffet: new FormControl('', [Validators.required]),
      typeDuree: new FormControl('', [Validators.required]),
      dateEcheance: new FormControl({value: '', disabled: true}, [Validators.required]),
      commune: new FormControl('', [Validators.required]),
      numeroGroupe: new FormControl('', [Validators.required]),
      typePrime: new FormControl('', [Validators.required]),
      adresse: new FormControl('', [Validators.required]),
      prime: new FormControl('', [Validators.required]),
      police: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });

    this.primeForm = this.formBuilder.group({
      prime: new FormControl('', [Validators.required]),
      primeEmploye: new FormControl(''),
      primeConjoint: new FormControl(''),
      primeEnfant: new FormControl(''),
      primeFamille: new FormControl(''),
      primeAdulte: new FormControl(''),
      primePersonne: new FormControl(''),
      primeAnnuelle: new FormControl('')
    });
    this.policeForm = this.formBuilder.group({
      id: new FormControl(''),
      garant: new FormControl('', [Validators.required]),
      intermediaire: new FormControl('', [Validators.required]),
      // numero: new FormControl('',[Validators.required]),
      taux: new FormControl(null, [Validators.required]),
      territorialite: new FormControl(null, [Validators.required]),
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

    this.myForm = this.formBuilder.group({
      numero: new FormControl(null, ),
      dateAvenant: new FormControl(null, [Validators.required]),
      dateEffet: new FormControl(null, [Validators.required]),
      observation: new FormControl(null, [Validators.required]),
      demandeur: new FormControl(null, [Validators.required]),
    });

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
      {
        field: 'dateEffetA',
        validations: [
          { validName: 'required', validMessage: 'Ce champs est obligatoire' },
        ],
      },
      {
        field: 'dateAvenant',
        validations: [
          { validName: 'required', validMessage: 'Ce champs est obligatoire' },
        ],
      },
    ];

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

    this.plafondForm = this.formBuilder.group({
      domaine: new FormControl(''),
      plafondAnnuelleFamille: new FormControl(''),
      plafondAnnuellePersonne: new FormControl(''),
      plafondGlobalInternationnal: new FormControl('')
    });

    this.exerciceForm = this.formBuilder.group({
      debut: new FormControl(''),
      fin: new FormControl('', [Validators.required]),
      actived: new FormControl('', [Validators.required]),
    });
  }
  historiquePlafondFamilleActeList$: Observable<Array<HistoriquePlafondFamilleActe>>;
  historiquePlafondFamilleActeList: Array<HistoriquePlafondFamilleActe> = [];
  historiquePlafondActeList$: Observable<Array<HistoriquePlafondFamilleActe>>;
  historiquePlafondActeList: Array<HistoriquePlafondActe> = [];
  historiquePlafondSousActeList$: Observable<Array<HistoriquePlafondSousActe>>;
  historiquePlafondSousActeList: Array<Territorialite> = [];
  historiquePlafondList$: Observable<Array<HistoriquePlafond>>;
  historiquePlafondList: Array<HistoriquePlafondActe> = [];
  plafondActuelleConfiguration: any = {};
  qualiteAssureList: any;
  demandeursList: any = [
    {libelle: 'VIMSO', value: TypeDemandeur.VIMSO},
    {libelle: 'SOUSCRIPTEUR', value: TypeDemandeur.SOUSCRIPTEUR},
    {libelle: 'GARANT', value: TypeDemandeur.GARANT}
  ];
  isRenouv = false;

  ngOnInit(): void {
    this.objet = {
      historiqueAvenant: {},
      historiqueAvenantAdherants: [],
      historiqueAvenantAdherantDels: [],
      police: {},
      plafondGroupe: {},
      plafondGroupeActes: [],
      plafondGroupeSousActes: [],
      plafondFamilleActes: [],
      familles: [],
      groupe: {},
      adhrents: [],
    };
    this.historiqueAveantAdherants = [];
    this.adherantListTmp = [];
    console.log('.............................');
    this.groupeList$ = this.store.pipe(select(groupeSlector.groupeList));
    this.store.dispatch(loadGroupe({policeId: this.police.id}));
    this.groupeList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.groupeListes = value.slice();
        console.log(this.groupeListes);
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
    this.sousActeList$ = this.store.pipe(select(sousActeSelector.sousacteList));
    this.store.dispatch(loadSousActe());
    this.sousActeList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        console.log(this.sousActeList);
        this.sousActeList = value.slice();
      }
    });

    this.tauxList$ = this.store.pipe(select(tauxSelector.tauxList));
    this.store.dispatch(loadTaux());
    this.tauxList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.tauxList = value.slice();
      }
    });

    this.garantList$ = this.store.pipe(select(garantSelector.garantList));
    this.store.dispatch(loadGarant());
    this.garantList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.garantList = value.slice();
      }
    });

    this.genreList$ = this.store.pipe(select(genreSelector.genreList));
    this.store.dispatch(loadGenre());
    this.genreList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.genreList = value.slice();
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

    this.garantieList$ = this.store.pipe(select(garantieSelector.garantieList));
    this.store.dispatch(loadGarantie());
    this.garantieList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.garanties = value.slice();
      }
    });

    this.territorialiteList$ = this.store.pipe(select(territorialiteSelector.territorialiteList));
    this.store.dispatch(loadTerritorialite());
    this.territorialiteList$.pipe(takeUntil(this.destroy$))
        .subscribe((value) => {
          if (value) {
            this.territorialiteList = value.slice();
            console.log(this.territorialiteList);
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
            this.qualiteAssureList1 = value.slice();
            this.qualiteAssureList2 = value.slice().filter(e => e.code !== 'ADHERENT');
          }
        });

    this.loadHistoriqueAvenantAdherantByPolice();
    this.addFamilleActe(this.police);
    this.loadActivedExercice(this.police);
  }

  addSousActe() {
    this.plafondActe[this.indexeActe].listeSousActe = this.plafondSousActe;
    console.log(this.plafondActe);
  }

  loadAherantByGroupe(): void {
    console.log(this.groupeSelected);
    this.obj.group = this.groupeSelected;
    this.historiqueAveantAdherants = this.historiqueAveantAdherantsTMP.filter(a => a.adherent.groupe.id === this.groupeSelected.id);
    this.setGroupeAndPrime(this.groupeSelected);
    this.loadHistoriquePlafondGroupe();
    this.loadHistoriquePlafondGroupeFamilleActe();
    this.loadHistoriquePlafondGroupeActe();
    this.loadHistoriquePlafondGroupeSousActe();
  }

  addAvenantModification(): void{
    // this.eventEmitterM.emit(this.avenantModification);
  }

  getGroupeSelected(): void {
    this.setGroupeAndPrime(this.groupeSelected);
  }

  loadGroupe(police: Police): void {
    this.groupeList$ = this.store.pipe(select(groupeList));
    this.store.dispatch(loadGroupe({policeId: this.police.id}));
    this.groupeList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.groupeListes = value.slice();
      }
    });
  }

  onRowEditInit(product: HistoriqueAvenantAdherant) {
    this.clonedProducts[product.id] = {...product};
  }

  onRowEditSave(product: HistoriqueAvenantAdherant) {
      delete this.clonedProducts[product.id];
      this.historiqueAveantAdherantEdited.push(product);
      console.log(this.historiqueAveantAdherantEdited);
      // this.messageService.add({severity: 'success', summary: 'Success', detail: 'Adherant is updated'});
  }

  onRowEditCancel(product: HistoriqueAvenantAdherant, index: number) {
    this.products2[index] = this.clonedProducts[product.id];
    delete this.clonedProducts[product.id];
  }

  setGroupeAndPrime(group: Groupe): void {
    console.log('***********group************');
    console.log(group);
    this.groupeForm.setValue({
      id: group?.id || null,
      libelle: group?.libelle,
      taux: group?.taux,
      territorialite: group.territorialite || [],
      duree: group?.duree,
      dateEffet: new Date(group.dateEffet),
      typeDuree: {},
      dateEcheance: new Date(group.dateEcheance),
      commune: group.commune,
      numeroGroupe: group.numeroGroupe,
      typePrime: group.typePrime,
      adresse: group.adresse,
      prime: group.prime,
      police: group.police,
      description: group.description
    });

    this.primeForm.patchValue({
      prime: group.typePrime,
      primeEmploye: group.prime?.primeEmploye,
      primeConjoint: group.prime?.primeConjoint,
      primeEnfant: group.prime?.primeEnfant,
      primeFamille: group.prime?.primeFamille,
      primeAdulte: group.prime?.primeAdulte,
      primePersonne: group.prime?.primeAdulte,
      primeAnnuelle: group.prime?.primeAnnuelle
    });
    this.selectedTypePrime = group.typePrime;
    // this.changePrime(group.prime);
  }

  onRefreshDateEcheanceForGroupe() {
    if (this.groupeForm.get('duree').value !== null && this.groupeForm.get('typeDuree').value !== null
        && this.groupeForm.get('duree').value !== null) {
      this.historiqueAvenantService.getDateFin(this.groupeForm.get('dateEffet').value,
          this.groupeForm.get('typeDuree').value, this.groupeForm.get('duree').value)
        .subscribe((res) => {
          this.groupeForm.patchValue({dateEcheance: res.body});
          console.log('date fin = ' + this.groupeForm.get('dateEcheance').value);
        });
    }
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

  changeGarantie(garantie, indexLigne: number) {

    this.plafondActe = [];
    if (this.plafondFamilleActeConstruct.length !== 0) {
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

  addFamilleActe(rowData) {

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

  validerPlafond(){
    this.plafond = this.plafondForm.value;
    this.plafond.plafondFamilleActe = this.plafondFamilleActeConstruct;
    this.plafond.groupe = this.groupe;
    console.log(this.plafond);
    this.store.dispatch(featureActionsPlafond.createPlafond(this.plafond));
  }

  loadHistoriqueAvenantAdherantByPolice(): void {
      this.historiqueAvenantAdherentService.findHistoriqueAvenantAdherantActuallList(this.police.id).subscribe(
          (res) => {
            this.historiqueAveantAdherants = res;
            this.historiqueAveantAdherantsTMP = res;
          }
      );
  }

  addHistoriqueAvenantAdherant(adherantsListe: Adherent[]): void {
    adherantsListe.forEach(adherant => {
      const historiqueAvenantAdherant: HistoriqueAvenantAdherant = {};
      historiqueAvenantAdherant.id = null;
      historiqueAvenantAdherant.avenant = null;
      historiqueAvenantAdherant.dateEntree = new Date();
      historiqueAvenantAdherant.dateIncorporation = null;
      historiqueAvenantAdherant.dateRetrait = null;
      historiqueAvenantAdherant.dateModification = new Date();
      historiqueAvenantAdherant.dateRenouvellement = null;
      historiqueAvenantAdherant.historiqueAvenant = null;
      historiqueAvenantAdherant.adherent = adherant;
      historiqueAvenantAdherant.deleted = false;
      this.historiqueAveantAdherants.push(historiqueAvenantAdherant);
      this.adherantListTmp.push(historiqueAvenantAdherant);
    });
  }

  setPlafondFamilleActe(): void {
    // this.plafondFamilleActe.push(this.groupeSelected.)
  }

  annuler(): void {
    this.historiqueAveantAdherants = [];
    this.plafondFamilleActe = [];
    this.acteList = [];
    this.sousActeList = [];
    this.returnEvent.emit('Sortie');
  }

  createAvenantModif(): void {
    /* if (this.plafondActe) {
      this.plafondActe.forEach(pa => {
        pa.montantPlafond = parseInt(pa.montantPlafond.toString().replace(' ', ''), 10);
      });
    } */
    if (this.plafondActe) {
      this.plafondFamilleActe = this.plafondFamilleActePlafongConfig;
      this.plafondFamilleActe.forEach(pfa => {
        if (pfa.montantPlafond) {
          pfa.montantPlafond = parseInt(pfa.montantPlafond.toString().replace(' ', ''), 10);
        }
        if (pfa.nombre) {
          pfa.nombre = parseInt(pfa.nombre.toString().replace(' ', ''), 10);
        }
        if (pfa.listeActe) {
          pfa.listeActe.forEach(pa => {
            if (pa.nombre) {
              pa.nombre = parseInt(pa.nombre.toString().replace(' ', ''), 10);
            }
            if (pa.montantPlafond) {
              pa.montantPlafond = parseInt(pa.montantPlafond.toString().replace(' ', ''), 10);
            }
            if (pa.listeSousActe) {
              pa.listeSousActe.forEach(psa => {
                if (psa.nombre) {
                  psa.nombre = parseInt(psa.nombre.toString().replace(' ', ''), 10);
                }
                if (psa.montantPlafond) {
                  psa.montantPlafond = parseInt(psa.montantPlafond.toString().replace(' ', ''), 10);
                }
              });
            }
          });
        }
      });
    }
    /* if (this.plafondActe) {
      this.plafondSousActe.forEach(pa => {
        pa.montantPlafond = parseInt(pa.montantPlafond.toString().replace(' ', ''), 10);
      });
    } */
    this.objet.groupe = this.groupeForm.value || this.groupeSelected;
    this.objet.groupe.police = this.police;
    this.objet.plafondGroupeActes = this.plafondActePlafongConfig;
    this.objet.plafondFamilleActes = this.plafondFamilleActePlafongConfig;
    this.objet.plafondGroupeSousActes = this.plafondSousActePlafongConfig;
    this.objet.police = this.police;
    this.objet.historiqueAvenantAdherants = this.historiqueAveantAdherantEdited;
    if (this.plafondForm.value) {
    this.objet.plafondGroupe = this.plafondForm.value;
    }
    this.objet.historiqueAvenant.numeroGarant = this.myForm.get('numero').value;
    this.objet.historiqueAvenant.dateAvenant = this.myForm.get('dateAvenant').value;
    this.objet.historiqueAvenant.dateEffet = this.myForm.get('dateEffet').value;
    this.objet.historiqueAvenant.observation = this.myForm.get('observation').value;
    this.objet.historiqueAvenant.exercice = this.exercice;
    // this.objet.groupe = this.groupeForm.value;
    this.objet.groupe.prime = this.primeForm.get(['prime']).value;
    // this.objet.groupe.typePrime = this.primeForm.get(['typeprime']).value;
    switch (this.myForm.get('demandeur').value.value) {
      case TypeDemandeur.GARANT:
        this.objet.historiqueAvenant.typeDemandeur = TypeDemandeur.GARANT;
        break;
      case TypeDemandeur.SOUSCRIPTEUR:
        this.objet.historiqueAvenant.typeDemandeur = TypeDemandeur.SOUSCRIPTEUR;
        break;
      case TypeDemandeur.VIMSO:
        this.objet.historiqueAvenant.typeDemandeur = TypeDemandeur.VIMSO;
        break;
      default: break;
    }
    console.log(this.objet);
    this.eventEmitterM.emit(this.objet);
  }

  loadHistoriquePlafondGroupe(): void {
    const avanantId = '';
    this.historiquePlafondList$ = this.store.pipe(select(historiqueAvenantSelector.historiquePlafondGroupe));
    this.store.dispatch(featureActionHistoriqueAdherant.loadHistoriquePlafondGroupe(
        {avanantId: this.historiqueAvenant.id, grpId: this.groupeSelected.id}));
    this.historiquePlafondList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.historiquePlafondList = value.slice();
      }
    });
  }

  loadHistoriquePlafondGroupeFamilleActe(): void {
    const avanantId = '';
    this.historiquePlafondFamilleActeList$ = this.store.pipe(select(historiqueAvenantSelector.historiquePlafondGroupeFamilleActe));
    this.store.dispatch(featureActionHistoriqueAdherant.loadHistoriquePlafondFamilleActe(
        {avanantId: this.historiqueAvenant.id, grpId: this.groupeSelected.id}));
    this.historiquePlafondFamilleActeList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.historiquePlafondFamilleActeList = value.slice();
      }
    });
  }

  loadHistoriquePlafondGroupeActe(): void {
    const avanantId = '';
    this.historiquePlafondActeList$ = this.store.pipe(select(historiqueAvenantSelector.historiquePlafondGroupeActe));
    this.store.dispatch(featureActionHistoriqueAdherant.loadHistoriquePlafondGroupe(
        {avanantId: this.historiqueAvenant.id, grpId: this.groupeSelected.id}));
    this.historiquePlafondActeList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.historiquePlafondActeList = value.slice();
      }
    });
  }

  loadHistoriquePlafondGroupeSousActe(): void {
    const avanantId = '';
    this.historiquePlafondSousActeList$ = this.store.pipe(select(historiqueAvenantSelector.historiquePlafondGroupeSousActe));
    this.store.dispatch(featureActionHistoriqueAdherant.loadHistoriquePlafondGroupe(
        {avanantId: this.historiqueAvenant.id, grpId: this.groupeSelected.id}));
    this.historiquePlafondSousActeList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.historiquePlafondSousActeList = value.slice();
      }
    });
  }

  changePrime(event) {
    this.selectedTypePrime = event.value;
    this.typeDureeSelected = this.policeForm.get('typeDuree').value;
    if (this.policeForm.get('duree')) {
      this.onRefreshDateEcheance(this.policeForm.get('duree').value);
    }
  }

  onRefreshDateEcheance(value: number) {
    /* this.groupeForm.patchValue({
      dateEcheance: this.getNewDate(value)
    }); */
  }

  getNewDate(value: number): Date {
    this.dateEcheance = new Date(this.policeForm.get('dateEffet').value);
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
    this.typeDureeSelected = this.groupeForm.get('typeDuree').value;
    console.log('value === ' + this.typeDureeSelected);
    if (this.groupeForm.get('duree')) {
      this.onRefreshDateEcheance(this.groupeForm.get('duree').value);
    }
    this.onRefreshDateEcheanceForGroupe();
  }

  fermerConfigurationPlafond(): void {}

  appliquerConfiguration(): void {}


  onRowEditInitPlafondConfiguration(plafond: PlafondFamilleActe) {
    this.clonedPlafondConfiguration[plafond.garantie?.id] = {...plafond};
    console.log(this.clonedPlafondConfiguration);
  }

  onRowEditSavePlafondConfiguration(plafond: PlafondFamilleActe) {
    delete this.clonedPlafondConfiguration[plafond.garantie?.id];
  }

  onRowEditCancelPlafondConfiguration(plafond: PlafondFamilleActe, index: number) {
    this.plafondActuelleConfiguration[index] = this.clonedPlafondConfiguration[plafond.garantie?.id];
    delete this.clonedPlafondConfiguration[plafond.garantie?.id];
  }

  loadPlafondConfigBygroupe() {
    this.plafondService.getPlafondGroupeFamilleActeByGroupe(this.groupePlafongConfig?.id).subscribe(
            (res) => {
              this.plafondFamilleActePlafongConfig = res.body;
              console.log(res);
            }
    );
    this.plafondService.getPlafondGroupeActeByGroupe(this.groupePlafongConfig?.id).subscribe(
        (res) => {
          this.plafondActePlafongConfig = res.body;
          this.plafondFamilleActePlafongConfig.forEach(pfapc => {
            // pfapc.listeActe = this.plafondActePlafongConfig.filter(e => e.)
          });
        }
    );
    this.plafondService.getPlafondGroupeSousActeByGroupe(this.groupePlafongConfig?.id).subscribe(
        (res) => {
          this.plafondSousActePlafongConfig = res.body;
          this.plafondFamilleActePlafongConfig.forEach(pfapc => {
            this.plafondActePlafongConfig.forEach(papc => {
              papc.listeSousActe = this.plafondSousActePlafongConfig.filter(e => e.sousActe.idTypeActe === papc.acte.id);
            });
            pfapc.listeActe = this.plafondActePlafongConfig.filter(e => e.acte.idTypeGarantie === pfapc.garantie.id);
          });
        }
    );
  }
  onTabChange(event): void {}

  compareDate(): void {
    this.historiqueAvenantService.compareDate(this.myForm.get('dateEffet').value, this.police.dateEffet).subscribe(
        (res) => {
          if (res) {
            this.addMessage('error', 'Date d\'effet invalide',
                'La date d\'effet de l\'avenant ne peut pas être postérieure à celle de la police');
            this.myForm.patchValue({dateEffet: null});
          }
        }
    );
  }

  addMessage(severite: string, resume: string, detaile: string): void {
    this.messageService.add({severity: severite, summary: resume, detail: detaile});
  }

  viderRecap() {}

  private loadActivedExercice(police: Police): void {
    if (police) {
      this.exerciceService.getActiveExerciceByPolice(police.id).subscribe(
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

  compareDateModif(): void {
    this.historiqueAvenantService.compareDate(this.myForm.get('dateIncorparation').value, this.police.dateEffet).subscribe(
        (res) => {
          if (res) {
            this.addMessage('error', 'Date d\'effet invalide',
                'La date d\'effet de l\'avenant de peut pas être postérieure à celle de la police');
            this.myForm.patchValue({dateIncorparation: null});
          }
        }
    );
  }

  onRowEditInitPlafondConfigurationActe(plafondActe: PlafondActe) {
    this.clonedPlafondActe[plafondActe.acte?.id] = { ...plafondActe };
  }

  onRowEditSavePlafondConfigurationActe(plafondActe: PlafondActe) {
    delete this.clonedPlafondActe[plafondActe.acte?.id];
  }

  onRowEditCancelPlafondConfigurationActe(plafondActe: PlafondActe, index: number) {
    this.plafondActe[index] = this.clonedPlafondActe[plafondActe.acte?.id];
    delete this.clonedPlafondActe[plafondActe.acte?.id];
  }

  onRowEditInitPlafondConfigurationSousActe(plafondSousActe: PlafondSousActe) {
    this.clonedPlafondSousActe[plafondSousActe.sousActe?.id] = {
      ...plafondSousActe,
    };
  }

  onRowEditSavePlafondConfigurationSousActe(plafondSousActe: PlafondSousActe) {
    delete this.clonedPlafondSousActe[plafondSousActe.sousActe?.id];
  }

  onRowEditCancelPlafondConfigurationSousActe(plafondSousActe: PlafondSousActe, index: number) {
    this.plafondSousActe[index] =
        this.clonedPlafondSousActe[plafondSousActe.sousActe?.id];
    delete this.clonedPlafondSousActe[plafondSousActe.sousActe?.id];
  }

  /* loadPlafondConfigBygroupe() {
    this.plafondService.getPlafondGroupeFamilleActeByGroupe(this.groupePlafongConfig.id).subscribe(
        (res) => {
          this.plafondFamilleActePlafongConfig = res.body;
          console.log(res);
        }
    );
    this.plafondService.getPlafondGroupeActeByGroupe(this.groupePlafongConfig.id).subscribe(
        (res) => {
          this.plafondActePlafongConfig = res.body;
        }
    );
    this.plafondService.getPlafondGroupeSousActeByGroupe(this.groupePlafongConfig.id).subscribe(
        (res) => {
          this.plafondSousActePlafongConfig = res.body;
          this.plafondFamilleActePlafongConfig.forEach(pfapc => {
            this.plafondActePlafongConfig.forEach(papc => {
              papc.listeSousActe = this.plafondSousActePlafongConfig.filter(e => e.sousActe.idTypeActe === papc.acte.id);
            });
            pfapc.listeActe = this.plafondActePlafongConfig.filter(a => a.acte.libelleTypeGarantie === pfapc.garantie.libelle);
          });
        }
    );
  } */

  addFA(): void {
    const plafondFamilleActe: PlafondFamilleActe = {};
    this.plafondFamilleActePlafongConfig.push(plafondFamilleActe);
  }

  onPlafondFamilleActeChange(plafond: PlafondFamilleActe) {
    plafond.listeActe = [];
    this.acteList.filter(a => a.idTypeGarantie === plafond.garantie.id).forEach(acte => {
      const pa: PlafondActe = {};
      pa.acte = acte;
      this.onPlafondActeChange(pa);
      plafond.listeActe.push(pa);
    });
  }

  onPlafondActeChange(plafondActe: PlafondActe) {
    console.log('*****plafondActe*******');
    console.log(plafondActe);
    plafondActe.listeSousActe = [];
    plafondActe.sousActeListe = this.sousActeList.filter(sa => sa.idTypeActe === plafondActe.acte.id);
    plafondActe.sousActeListe.forEach(sousActe => {
      const psa: PlafondSousActe = {};
      psa.sousActe = sousActe;
      plafondActe.listeSousActe.push(psa);
    });
  }

  getPlafondGroupeByGroupe(): void {
    this.plafondService.getPlafondGroupeByGroupe(this.groupePlafongConfig.id).subscribe(
        (res) => {
          if (res) {
            this.plafondForm.patchValue({
              domaine: res.body.domaine,
              plafondAnnuelleFamille: res.body.plafondAnnuelleFamille,
              plafondAnnuellePersonne: res.body.plafondAnnuellePersonne,
              plafondGlobalInternationnal: res.body.plafondGlobalInternationnal
            });
          }
        }
    );
  }
}
