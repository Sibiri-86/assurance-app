import { Component, OnInit, OnDestroy } from "@angular/core";
import { takeUntil } from "rxjs/operators";
import { ConfirmationService, MessageService, SelectItem } from "primeng/api";
import { Police } from "../../../store/contrat/police/model";
import { Groupe } from "../../../store/contrat/groupe/model";
import * as featureAction from "../../../store/contrat/police/actions";
import { policeList } from "../../../store/contrat/police/selector";
import { groupeList } from "../../../store/contrat/groupe/selector";
import { AdherentList, Adherent } from "../../../store/contrat/adherent/model";
import { Pays } from "../../../store/parametrage/pays/model";
import { Taux } from "../../../store/parametrage/taux/model";
import { Genre, GenreList } from "../../../store/parametrage/genre/model";
import { Profession } from "../../../store/parametrage/profession/model";
import { QualiteAssure } from "../../../store/parametrage/qualite-assure/model";
import { Territorialite } from "../../../store/parametrage/territorialite/model";
import { Garantie } from "../../../store/parametrage/garantie/model";
import { SousActe } from "../../../store/parametrage/sous-acte/model";
import { Acte } from "../../../store/parametrage/acte/model";
import { Departement } from "../../../store/parametrage/departement/model";
import { DimensionPeriode } from "../../../store/parametrage/dimension-periode/model";
import { Commune } from "../../../store/parametrage/commune/model";
import { TypePrime } from "../../../store/parametrage/type-prime/model";
import { Region } from "../../../store/parametrage/region/model";
import { SecteurActivite } from "../../../store/parametrage/secteur-activite/model";
import { Observable, of, Subject } from "rxjs";
import {
  ControlContainer,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { select, Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.state";
import { loadPays } from "../../../store/parametrage/pays/actions";
import * as paysSelector from "../../../store/parametrage/pays/selector";

import { loadRegion } from "../../../store/parametrage/region/actions";
import * as regionSelector from "../../../store/parametrage/region/selector";

import { loadDepartement } from "../../../store/parametrage/departement/actions";
import * as departementSelector from "../../../store/parametrage/departement/selector";

import { loadCommune } from "../../../store/parametrage/commune/actions";
import * as communeSelector from "../../../store/parametrage/commune/selector";

import { loadTaux } from "../../../store/parametrage/taux/actions";
import * as tauxSelector from "../../../store/parametrage/taux/selector";

import { loadTerritorialite } from "../../../store/parametrage/territorialite/actions";
import * as territorialiteSelector from "../../../store/parametrage/territorialite/selector";

import { loadGarant } from "../../../store/contrat/garant/actions";
import * as garantSelector from "../../../store/contrat/garant/selector";

import * as featureActionGroupe from "../../../store/contrat/groupe/actions";
import * as groupeSelector from "../../../store/contrat/groupe/selector";

import * as featureActionAdherent from "../../../store/contrat/adherent/actions";
import * as adherentSelector from "../../../store/contrat/adherent/selector";

import { loadIntermediaire } from "../../../store/contrat/intermediaire/actions";
import * as intermediaireSelector from "../../../store/contrat/intermediaire/selector";

import { Garant, GarantList } from "../../../store/contrat/garant/model";
import {
  Intermediaire,
  IntermediaireList,
} from "../../../store/contrat/intermediaire/model";

import { loadSecteurActivite } from "../../../store/parametrage/secteur-activite/actions";
import * as secteurActiviteSelector from "../../../store/parametrage/secteur-activite/selector";

import { loadDimensionPeriode } from "../../../store/parametrage/dimension-periode/actions";
import * as dimensionPeriodeSelector from "../../../store/parametrage/dimension-periode/selector";

import { loadPolice } from "src/app/store/contrat/police/actions";
import { loadGroupe } from "src/app/store/contrat/groupe/actions";

import { loadGarantie } from "../../../store/parametrage/garantie/actions";
import * as garantieSelector from "../../../store/parametrage/garantie/selector";

import { loadActe } from "../../../store/parametrage/acte/actions";
import * as acteSelector from "../../../store/parametrage/acte/selector";

import { loadSousActe } from "../../../store/parametrage/sous-acte/actions";
import * as sousActeSelector from "../../../store/parametrage/sous-acte/selector";

import { loadGenre } from "../../../store/parametrage/genre/actions";
import * as genreSelector from "../../../store/parametrage/genre/selector";
import * as featureActionsPlafond from "../../../store/contrat/plafond/action";
import { loadProfession } from "../../../store/parametrage/profession/actions";
import * as professionSelector from "../../../store/parametrage/profession/selector";

import { loadQualiteAssure } from "../../../store/parametrage/qualite-assure/actions";
import * as qualiteAssureSelector from "../../../store/parametrage/qualite-assure/selector";

import { Status } from "../../../store/global-config/model";
import { status } from "../../../store/global-config/selector";
import { EntityValidations } from "../../common/models/validation";
import { BreadcrumbService } from "../../../app.breadcrumb.service";

import { loadTypePrime } from "../../../store/parametrage/type-prime/actions";
import * as typePrimeSelector from "../../../store/parametrage/type-prime/selector";
import {PlafondActe, PlafondFamilleActe, PlafondSousActe} from "../../../store/parametrage/plafond/model";
import {TabMenuModule} from 'primeng/tabmenu';
import {MenuItem} from 'primeng/api';
import { Plafond } from "src/app/store/contrat/plafond/model";
import ThirdPartyDraggable from "@fullcalendar/interaction/interactions-external/ThirdPartyDraggable";
import { element } from "protractor";
import { AdherentFamille } from "../../../store/contrat/adherent/model";
import { ContentObserver } from "@angular/cdk/observers";
import { printPdfFile, removeBlanks } from "../../util/common-util";
import { selectByteFile } from "../../../store/contrat/police/selector";
import { Arrondissement } from 'src/app/store/parametrage/arrondissement/model';
import { Secteur } from 'src/app/store/parametrage/secteur/model';
import { ArrondissementService } from 'src/app/store/parametrage/arrondissement/service';
import * as secteurAction from '../../../store/parametrage/secteur/actions';
import {loadSecteur} from '../../../store/parametrage/secteur/actions';
import * as secteurSelector from '../../../store/parametrage/secteur/selector';

import * as arrondissementAction from '../../../store/parametrage/arrondissement/actions';
import {loadArrondissement} from '../../../store/parametrage/arrondissement/actions';
import * as arrondissementSelector from '../../../store/parametrage/arrondissement/selector';
import { Report } from "../../../store/contrat/police/model";
import { TypeReport } from "src/app/store/contrat/enum/model";


@Component({
  selector: "app-police",
  templateUrl: "./police.component.html",
  styleUrls: ["./police.component.scss"],
})
export class PoliceComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();
  cols: any[];
  policeList$: Observable<Array<Police>>;
  policeList: Array<Police>;
  valCheck: string[] = [];
  groupeList$: Observable<Array<Groupe>>;
  groupeList: Array<Groupe>;
  groupeListFilter: Array<Groupe>;
  plafond: Plafond;
  paysList$: Observable<Array<Pays>>;
  police: Police;
  adherentFamille: Array<AdherentFamille>;
  adherentWithFamille: AdherentFamille;
  selectedPolices: Police[];
  displayDialogFormPolice: boolean = false;
  displayDialogFormAddAdherent: boolean = false;
  displayAdherentForm: boolean = false;
  displayGroupForm: boolean = true;
  displayDialogFormGroupe: boolean = false;
  policeForm: FormGroup;
  groupeForm: FormGroup;
  plafondForm: FormGroup;
  primeForm: FormGroup;
  adherentForm: FormGroup;
  statusObject$: Observable<Status>;
  entityValidations: Array<EntityValidations>;
  loading: boolean;
  dateEffet: Date;
  dateEcheance: Date;
  report: Report = {};

  tauxList$: Observable<Array<Taux>>;
  tauxList: Array<Taux>;

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
  adherentList$: Observable<Array<Adherent>>;
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
  displayDialogFormAddGroupe: boolean = false;
  displayDialogFormAdherent: boolean = false;
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
  parametrageActe: boolean = false;
  parametragePrime: boolean = false;
  infosPolice: boolean = false;
  infosGroupe: boolean = true;
  selectedTypePrime: TypePrime = {};
  groupe: Groupe ={};
  items: MenuItem[];
  activeItem: MenuItem;
  index: number = 0;
  displaySousActe: boolean =false;
  indexeActe: number;
  countfamilleActe: number = 0;
  typeDureeSelected: string;
  displayParametragePlafond: boolean = false;
  domaineSelected: QualiteAssure;
  isInternationalGroupe: boolean;
  typeDuree: any = [{label:'Jour', value:'Jour'},
  {label: 'Mois', value:'Mois'}, {label:'Année', value: 'Annee'}];
  secteurList: Array<Secteur>;
  secteurList$: Observable<Array<Secteur>>;
  arrondissementList$: Observable<Array<Arrondissement>>;
  arrondissementList: Array<Arrondissement>;
  displayActe = false;
  displayPrevisualiserParametrage : boolean = false;
 

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private breadcrumbService: BreadcrumbService
  ) {

    this.plafondForm = this.formBuilder.group({
      //domaine: new FormControl({}),
      plafondAnnuelleFamille: new FormControl(""),
      plafondAnnuellePersonne: new FormControl(""),
      plafondGlobalInternationnal: new FormControl("")
    });

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
    });

    this.policeForm = this.formBuilder.group({
      id: new FormControl(""),
      numero: new FormControl(''),
      garant: new FormControl("", [Validators.required]),
      intermediaire: new FormControl("", [Validators.required]),
      //numero: new FormControl('',[Validators.required]),
      taux: new FormControl(null, [Validators.required]),
      territorialite: new FormControl("", [Validators.required]),
      typeDuree: new FormControl("", [Validators.required]),
      duree: new FormControl("", [Validators.required]),
      dateEffet: new FormControl("", [Validators.required]),
      dateEcheance: new FormControl({value:'', disabled: true}, [Validators.required]),
      adressePostale: new FormControl("", [Validators.required]),
      //dateSaisie: new FormControl('',[Validators.required]),
      //dateValidation: new FormControl('',[Validators.required]),
      nom: new FormControl("", [Validators.required]),
      //code: new FormControl('',[Validators.required]),
      contact: new FormControl("", [Validators.required]),
      adresseEmail: new FormControl(null, [Validators.required, Validators.email]),
      personneRessource: new FormControl("", [Validators.required]),
      contactPersonneRessource: new FormControl("", [Validators.required]),
      emailPersonneRessource: new FormControl("", [Validators.required, Validators.email]),
      secteurActivite: new FormControl("", [Validators.required]),
      numeroIfu: new FormControl(""),
      rccm: new FormControl(""),
      secteur: new FormControl('', [Validators.required]),
      referencePolice: new FormControl('', [Validators.required]),
      fraisAccessoire: new FormControl('', [Validators.required]),
      fraisBadge: new FormControl("", [Validators.required])
    });

    this.groupeForm = this.formBuilder.group({
      id: new FormControl(""),
      libelle: new FormControl("", [Validators.required]),
      taux: new FormControl(null, [Validators.required]),
      territorialite: new FormControl("", [Validators.required]),
      duree: new FormControl("", [Validators.required]),
      dateEffet: new FormControl("", [Validators.required]),
      typeDuree: new FormControl("", [Validators.required]),
      dateEcheance: new FormControl({value:'', disabled: true}, [Validators.required])
    });

    this.primeForm = this.formBuilder.group({
      prime: new FormControl("",[Validators.required]),
      primeEmploye: new FormControl(""),
      primeConjoint: new FormControl(""),
      primeEnfant: new FormControl(""),
      primeFamille: new FormControl(""),
      primeAdulte: new FormControl(""),
      primePersonne: new FormControl(""),
      primeAnnuelle: new FormControl("")
    });

    this.breadcrumbService.setItems([{ label: "Police" }]);
  }


  ifExistTerritorialiteInternational(groupe:Groupe): boolean {
    return groupe.territorialite.some(element => element.code==='INT');
  }
  /**permet de parametrer le plafond pour un groupe */
  parametrerPlafond(groupe: Groupe) {
    console.log(groupe);
    console.log(this.ifExistTerritorialiteInternational(groupe));
    if(this.ifExistTerritorialiteInternational(groupe)){
      this.isInternationalGroupe = true;
    }
    this.groupe = {...groupe};
    this.displayParametragePlafond = true;
  }

  ngOnInit(): void {
    this.policeList = [];
    this.loading = true;

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
        field: "garant",
        validations: [
          { validName: "required", validMessage: "Ce champs est obligatoire" },
          {
            validName: "maxlength",
            validMessage: "Ce champs requiert au plus 5 caractères",
          },
        ],
      },
      {
        field: "intermediaire",
        validations: [
          { validName: "required", validMessage: "Ce champs est obligatoire" },
          {
            validName: "maxlength",
            validMessage: "Ce champs requiert au plus 5 caractères",
          },
        ],
      },
      {
        field: "taux",
        validations: [
          { validName: "required", validMessage: "Ce champs est obligatoire" },
          {
            validName: "maxlength",
            validMessage: "Ce champs requiert au plus 5 caractères",
          },
        ],
      },
      {
        field: "territorialite",
        validations: [
          { validName: "required", validMessage: "Ce champs est obligatoire" },
          {
            validName: "maxlength",
            validMessage: "Ce champs requiert au plus 5 caractères",
          },
        ],
      },
      {
        field: "duree",
        validations: [
          { validName: "required", validMessage: "Ce champs est obligatoire" },
          {
            validName: "maxlength",
            validMessage: "Ce champs requiert au plus 5 caractères",
          },
        ],
      },
      {
        field: "dateEffet",
        validations: [
          { validName: "required", validMessage: "Ce champs est obligatoire" },
          {
            validName: "maxlength",
            validMessage: "Ce champs requiert au plus 5 caractères",
          },
        ],
      },
      {
        field: "dateEcheance",
        validations: [
          { validName: "required", validMessage: "Ce champs est obligatoire" },
          {
            validName: "maxlength",
            validMessage: "Ce champs requiert au plus 5 caractères",
          },
        ],
      },
      {
        field: "nom",
        validations: [
          { validName: "required", validMessage: "Ce champs est obligatoire" },
          {
            validName: "maxlength",
            validMessage: "Ce champs requiert au plus 5 caractères",
          },
        ],
      },
      {
        field: "contact",
        validations: [
          { validName: "required", validMessage: "Ce champs est obligatoire" },
          {
            validName: "maxlength",
            validMessage: "Ce champs requiert au plus 5 caractères",
          },
        ],
      },
      {
        field: "adresseEmail",
        validations: [
          { validName: "required", validMessage: "Ce champs est obligatoire" },
          {
            validName: 'email',
            validMessage: 'Veuillez renseigner une adresse email valide'
          }
        ],
      },
      {
        field: "numeroCompteBancaire1",
        validations: [
          { validName: "required", validMessage: "Ce champs est obligatoire" },
          {
            validName: "maxlength",
            validMessage: "Ce champs requiert au plus 5 caractères",
          },
        ],
      },
      {
        field: "personneRessource",
        validations: [
          { validName: "required", validMessage: "Ce champs est obligatoire" },
          {
            validName: "maxlength",
            validMessage: "Ce champs requiert au plus 5 caractères",
          },
        ],
      },
      {
        field: 'emailPersonneRessource',
        validations: [
          {
            validName: 'email',
            validMessage: 'Veuillez renseigner une adresse email valide'
          }
        ]
      },
      {
        field: "numeroCompteBancaire2",
        validations: [
          { validName: "required", validMessage: "Ce champs est obligatoire" },
          {
            validName: "maxlength",
            validMessage: "Ce champs requiert au plus 5 caractères",
          },
        ],
      },
      {
        field: "numeroIfu",
        validations: [
          { validName: "required", validMessage: "Ce champs est obligatoire" },
          {
            validName: "maxlength",
            validMessage: "Ce champs requiert au plus 5 caractères",
          },
        ],
      },
      {
        field: "numeroPattente",
        validations: [
          { validName: "required", validMessage: "Ce champs est obligatoire" },
          {
            validName: "maxlength",
            validMessage: "Ce champs requiert au plus 5 caractères",
          },
        ],
      },
      {
        field: "secteurActivite",
        validations: [
          { validName: "required", validMessage: "Ce champs est obligatoire" },
          {
            validName: "maxlength",
            validMessage: "Ce champs requiert au plus 5 caractères",
          },
        ],
      },
      {
        field: "pays",
        validations: [
          { validName: "required", validMessage: "Ce champs est obligatoire" },
          {
            validName: "maxlength",
            validMessage: "Ce champs requiert au plus 5 caractères",
          },
        ],
      },
      {
        field: "region",
        validations: [
          { validName: "required", validMessage: "Ce champs est obligatoire" },
          {
            validName: "maxlength",
            validMessage: "Ce champs requiert au plus 5 caractères",
          },
        ],
      },
      {
        field: "departement",
        validations: [
          { validName: "required", validMessage: "Ce champs est obligatoire" },
          {
            validName: "maxlength",
            validMessage: "Ce champs requiert au plus 5 caractères",
          },
        ],
      },
      {
        field: "commune",
        validations: [
          { validName: "required", validMessage: "Ce champs est obligatoire" },
          {
            validName: "maxlength",
            validMessage: "Ce champs requiert au plus 5 caractères",
          },
        ],
      },
      {
        field: "periodiciteAppelFond",
        validations: [
          { validName: "required", validMessage: "Ce champs est obligatoire" },
          {
            validName: "maxlength",
            validMessage: "Ce champs requiert au plus 5 caractères",
          },
        ],
      },
      {
        field: "rccm",
        validations: [
          { validName: "required", validMessage: "Ce champs est obligatoire" },
          {
            validName: "maxlength",
            validMessage: "Ce champs requiert au plus 5 caractères",
          },
        ],
      },
    ];

    this.adherentFamilleList = [];
    this.adherentFamille = [];
    this.adherentWithFamille = {};

    /** dispatch action pour imprimer le pdf */
    this.store.pipe(select(selectByteFile)).pipe(takeUntil(this.destroy$))
    .subscribe(bytes => {
        if (bytes) {
                printPdfFile(bytes);
        }
    });
    
  this.arrondissementList$=this.store.pipe(select(arrondissementSelector.arrondissementList));
  this.store.dispatch(arrondissementAction.loadArrondissement());
  this.arrondissementList$.pipe(takeUntil(this.destroy$))
            .subscribe(value => {
              if (value) {
                this.loading = false;
                this.arrondissementList = value.slice();
              }
  });

  this.secteurList$=this.store.pipe(select(secteurSelector.secteurList));
  this.store.dispatch(secteurAction.loadSecteur());
  this.secteurList$.pipe(takeUntil(this.destroy$))
            .subscribe(value => {
              if (value) {
                this.loading = false;
                this.secteurList = value.slice();
              }
  });

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

    this.policeList$ = this.store.pipe(select(policeList));
    this.store.dispatch(loadPolice());
    this.policeList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.loading = false;
        this.policeList = value.slice();
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
  }


  imprimer(police: Police){
    this.report.typeReporting = TypeReport.POLICE;
    this.report.police = police;
    this.store.dispatch(featureAction.FetchReport(this.report));
  }

  changeCountry(event) {
    this.regionList$.pipe(takeUntil(this.destroy$))
    .subscribe(value => {
      if (value) {
        this.regionList = value.slice();
        this.regionList = this.regionList.filter(element=> element.idTypePays===event.value.id);
      }
  });
  }
  
  changeRegion(event) {
    this.departementList$.pipe(takeUntil(this.destroy$))
    .subscribe(value => {
      if (value) {
        this.departementList = value.slice();
        this.departementList = this.departementList.filter(element=> element.idRegion===event.value.id);
      }
  });
  }
  
  changeDepartement(event) {
    this.communeList$.pipe(takeUntil(this.destroy$))
    .subscribe(value => {
      if (value) {
        this.communeList = value.slice();
        this.communeList = this.communeList.filter(element=> element.idDepartement===event.value.id);
      }
  });
  }
  
  changeCommune(event) {
    this.arrondissementList$.pipe(takeUntil(this.destroy$))
    .subscribe(value => {
      if (value) {
        this.arrondissementList = value.slice();
        this.arrondissementList = this.arrondissementList.filter(element=> element.idCommune===event.value.id);
      }
  });
  }
  
  changeArrondissement(event) {
    this.secteurList$.pipe(takeUntil(this.destroy$))
    .subscribe(value => {
      if (value) {
        this.secteurList = value.slice();
        this.secteurList = this.secteurList.filter(element=> element.idArrondissement===event.value.id);
      }
  });
  }

  // fonction pour creer adherent.
  onCreateAddherent() {
    console.log(this.adherentForm.value);
    console.log(this.adherentFamilleList);
    this.adherentWithFamille.adherent =this.adherentForm.value;
    this.adherentWithFamille.adherent.groupe = this.groupe;
    this.adherentWithFamille.famille = this.adherentFamilleList;
    this.store.dispatch(featureActionAdherent.createAdherentwithFamille(this.adherentWithFamille));
    this.adherentFamilleList = [];
    this.adherentForm.reset();
  }



  changePrime(event) {
        this.selectedTypePrime=event.value;
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
  enregistrerAdherent() {
    this.adherentFamille.push({adherent:this.adherentForm.value, famille: this.adherentFamilleList});
    this.adherentForm.reset();
    this.adherentFamilleList = [];
    console.log(this.adherentFamille);
  }
  /** cette methode permet de creer un groupe avec des informations basiques */
  onCreateGroupe(){
    this.groupe = this.groupeForm.value;
    this.groupe.police = this.police;
    this.groupe.prime = this.primeForm.value;

    if(this.groupe.prime.primeAnnuelle){
      this.groupe.prime.primeAnnuelle = removeBlanks(this.groupe.prime.primeAnnuelle +'');
    }
    if(this.groupe.prime.primeAdulte){
      this.groupe.prime.primeAdulte = removeBlanks(this.groupe.prime.primeAdulte +'');
    }
    if(this.groupe.prime.primeConjoint){
      this.groupe.prime.primeConjoint = removeBlanks(this.groupe.prime.primeConjoint+'');
    }
    if(this.groupe.prime.primeEmploye){
      this.groupe.prime.primeEmploye = removeBlanks(this.groupe.prime.primeEmploye+'');
    }
    if(this.groupe.prime.primeEnfant){
      this.groupe.prime.primeEnfant = removeBlanks(this.groupe.prime.primeEnfant+'');
    }
    if( this.groupe.prime.primeFamille){
      this.groupe.prime.primeFamille = removeBlanks(this.groupe.prime.primeFamille+'');
    }
    this.groupe.adherentFamille = this.adherentFamille;
    console.log(this.groupe);
    this.store.dispatch(featureActionGroupe.createGroupe(this.groupe));
    this.adherentFamille = [];
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

  getNewDate(value: number): Date {
    this.dateEcheance = new Date(this.policeForm.get('dateEffet').value);
    this.dateEcheance = new Date(this.dateEcheance.setDate(this.dateEcheance.getDate()-1));
    if(this.typeDureeSelected === 'Jour') {
      return new Date(this.dateEcheance.setDate(this.dateEcheance.getDate() + Number(value)));
    } else if(this.typeDureeSelected === 'Mois') {
        return new Date(this.dateEcheance.setMonth(this.dateEcheance.getMonth() + Number(value)));
      } else if(this.typeDureeSelected === 'Annee') {
        return new Date(this.dateEcheance.setFullYear(this.dateEcheance.getFullYear() + Number(value)));
      }
    }

    getNewDateForGroupe(value: number): Date {
      this.dateEcheance = new Date(this.groupeForm.get('dateEffet').value);
      this.dateEcheance = new Date(this.dateEcheance.setDate(this.dateEcheance.getDate()-1));
      console.log(this.dateEcheance);
      if(this.typeDureeSelected === 'Jour') {
        return new Date(this.dateEcheance.setDate(this.dateEcheance.getDate() + Number(value)));
      } else if(this.typeDureeSelected === 'Mois') {
          return new Date(this.dateEcheance.setMonth(this.dateEcheance.getMonth() + Number(value)));
        } else if(this.typeDureeSelected === 'Annee') {
          return new Date(this.dateEcheance.setFullYear(this.dateEcheance.getFullYear() + Number(value)));
        }
      }

    changeTypeDuree(){
    this.typeDureeSelected = this.policeForm.get('typeDuree').value;
    if(this.policeForm.get('duree')) {
      this.onRefreshDateEcheance(this.policeForm.get('duree').value);
      }
    }

    changeTypeDureeGroupe(event){
      this.typeDureeSelected = this.groupeForm.get('typeDuree').value;
      console.log(this.typeDureeSelected);
      if(this.dateEcheance && this.groupeForm.get('duree')){
        this.onRefreshDateEcheanceForGroupe(this.groupeForm.get('duree').value);
        }
      }

  onRefreshDateEcheance(value: number) {
    this.policeForm
      .get("dateEcheance")
      .setValue(
        this.getNewDate(value)
      );
  }

  onRefreshDateEcheanceForGroupe(value: number) {
    this.typeDureeSelected = this.groupeForm.get('typeDuree').value;
    console.log(this.typeDureeSelected);
    this.groupeForm
      .get("dateEcheance")
      .setValue(
        this.getNewDateForGroupe(value)
      );
  }

  checkStatus() {
    this.statusObject$.pipe(takeUntil(this.destroy$)).subscribe((statusObj) => {
      if (statusObj) {
        //this.loading = false;
        this.showToast(statusObj.status, "INFORMATION", statusObj.message);
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

  voirAdherent(groupe: Groupe) {
    this.displayDialogFormAdherent = true;
    this.groupe = groupe;
    this.adherentList$ = this.store.pipe(select(adherentSelector.adherentList));
    this.store.dispatch(featureActionAdherent.loadAdherent({idGroupe:groupe.id}));
    this.adherentList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.adherentList = value.slice();
      }
    });
  }

  editPolice(police: Police) {
    this.police = { ...police };
    if(this.police.dateEffet) {
      this.police.dateEffet = new Date(this.police.dateEffet);
    }
    if(this.police.dateEcheance) {
      this.police.dateEcheance = new Date(this.police.dateEcheance);
    }
    this.policeForm.patchValue(this.police);
    this.displayDialogFormPolice = true;
  }

  deletePolice(police: Police) {
    this.confirmationService.confirm({
      message: "Etes vous sur de vouloir supprimer?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.store.dispatch(featureAction.deletePolice(police));
      },
    });
  }

  nextToAdherent() {
    this.displayAdherentForm = true;
    this.displayGroupForm = false;
  }

  onCreate() {
    this.police = this.policeForm.value;
    this.police.fraisAccessoire = removeBlanks(this.police.fraisAccessoire+'');
    this.police.fraisBadge = removeBlanks(this.police.fraisBadge+'');
    this.police.dateEcheance = this.policeForm.get('dateEcheance').value;
    console.log(this.police);
    this.confirmationService.confirm({
      message: "Etes vous sur de vouloir ajouter ce police?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        if (this.police.id) {
          this.store.dispatch(
            featureAction.updatePolice(this.police)
          );
        } else {
          console.log(this.policeForm.value);
          this.store.dispatch(
            featureAction.createPolice(this.police)
          );
        }
        this.policeForm.reset();
      },
    });
  }

  /**affichage des groupes de la police */
  voirGroupe(police: Police) {
    this.police = {...police};
    this.groupeList$ = this.store.pipe(select(groupeList));
    this.store.dispatch(loadGroupe({idPolice: this.police.id}));
    this.groupeList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.groupeList = value.slice();
      }
    });

    this.plafondFamilleActe = [
      {
        dimensionPeriode: {},
        taux: this.police.taux,
        dateEffet: new Date(this.police.dateEffet),
        garantie: {}
      }
    ];

    this.plafondActe = [
      {
        montantPlafond: 0,
        dimensionPeriode: {},
        nombre: 0,
        dateEffet: new Date(this.police.dateEffet),
        taux: this.police.taux,
        acte: {}
      }
    ];

    this.plafondSousActe = [
      {
        montantPlafond: 0,
        dimensionPeriode: {},
        nombre: 0,
        taux: this.police.taux,
        dateEffet: new Date(this.police.dateEffet),
        sousActe: {}
      }
    ];
    this.displayDialogFormGroupe = true;
  }


 

  addGroupe() {
    this.displayDialogFormAddGroupe = true;
    this.displayGroupForm = true;
    this.displayAdherentForm = false;
    this.groupeForm.reset();
    this.primeForm.reset();
  }

  /**mode edition de plafondFamilleActe */
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

  deleteRow(adherentFamille: Adherent, index: number){
    this.adherentFamilleList.splice(index);
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

  /**afficher les details de la police */
  onRowSelectPolice(police: Police) {
    this.police = {...police}
    this.infosPolice = true;
    this.policeForm.patchValue(this.police);
  }

  voirParametrage() {
  this.displayPrevisualiserParametrage = true;
  }
  /**permet de valider le plafond */
  validerPlafond() {
    this.plafond = this.plafondForm.value;
    this.plafond.plafondFamilleActe = this.plafondFamilleActeConstruct;
    this.plafond.groupe = this.groupe;
    console.log(this.plafond);
    this.store.dispatch(featureActionsPlafond.createPlafond(this.plafond));
  }
  // 
  addSousActe() {
  this.plafondActe[this.indexeActe].listeSousActe =this.plafondSousActe;
  console.log(this.plafondActe);
  }

  addFamilleActe(rowData, ri) {


    this.confirmationService.confirm({
      message: "Etes vous sur de valider?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {

    console.log(rowData);
    console.log(this.plafondFamilleActeConstruct);
    for( var i=0; i<this.plafondFamilleActeConstruct.length; i++){
      /** verifier si la garantie existe deja, juste le modifier */
      if(this.plafondFamilleActeConstruct[i].garantie.id===rowData.garantie.id) {
        console.log('oui');
        this.clonedPlafondFamilleActeTemp[rowData.garantie.id] = { ...rowData };
        this.plafondFamilleActeTemp = this.clonedPlafondFamilleActeTemp[rowData.garantie.id];
        this.plafondFamilleActeTemp.listeActe = this.plafondActe;
        console.log(i);
        /** enregistrer */
        this.plafondFamilleActeConstruct[i]=this.plafondFamilleActeTemp;
        delete this.clonedPlafondFamilleActeTemp[rowData.garantie.id];
        return;
        }
    }

    /** si la garantie n'est pas encore ajouté, ajouter */
    this.plafondFamilleActeConstruct.forEach( async (element,index)=>{
    if(element.garantie.id===rowData.garantie.id) {
    console.log('oui');
    this.clonedPlafondFamilleActeTemp[rowData.garantie.id] = { ...rowData };
    this.plafondFamilleActeTemp = this.clonedPlafondFamilleActeTemp[rowData.garantie.id];
    this.plafondFamilleActeTemp.listeActe = this.plafondActe;
    console.log(index);
    this.plafondFamilleActeConstruct[index]=this.plafondFamilleActeTemp;
    delete this.clonedPlafondFamilleActeTemp[rowData.garantie.id];
    return;
    }
    });

    
    this.clonedPlafondFamilleActeTemp[rowData.garantie.id] = { ...rowData };
    console.log(this.clonedPlafondFamilleActeTemp);
    this.plafondFamilleActeTemp = this.clonedPlafondFamilleActeTemp[rowData.garantie.id];
    this.plafondFamilleActeTemp.listeActe = this.plafondActe;
    this.plafondFamilleActeConstruct[this.countfamilleActe]=this.plafondFamilleActeTemp;
    delete this.clonedPlafondFamilleActeTemp[rowData.garantie.id];
    console.log(this.countfamilleActe);
    this.countfamilleActe++;
    console.log(this.plafondFamilleActeConstruct);
  },
  });
  }



  /**obtenir les sous actes pour un acte donné */
  getSousActe(rowData, ri){
    this.plafondSousActe = [];
    if(!rowData.listeSousActe){

    this.sousActeList.forEach((element)=>{
      console.log(rowData);
       if(element.idTypeActe === rowData.acte.id){
         this.plafondSousActe.push({sousActe:element, taux:this.police.taux, dateEffet: new Date(this.police.dateEffet), montantPlafond: rowData.montantPlafond});
       }
    })


    } else {
      this.plafondSousActe = rowData.listeSousActe;
    }
    this.displaySousActe =true;
    this.indexeActe = ri;
  }

  

changeGarantie(garantie, indexLigne: number) {
  this.plafondActe = [];
  this.plafondSousActe = [];
  this.displayActe = true;
  if(this.plafondFamilleActeConstruct.length!=0) {
      // revoir cette fonction
      this.plafondFamilleActeConstruct.forEach((element,index)=>{
        element.listeActe.forEach(e=>{
          if(e.acte.idTypeGarantie === garantie.value.id){
            this.plafondActe.push(e);
          }
          })
      });
      console.log(this.plafondFamilleActeConstruct);
  } 

  if(this.plafondActe.length===0){
   //this.plafondActe = this.acteList.filter(element=>element.idTypeGarantie === garantie.value.id);
   
    for(var j=0; j<this.acteList.length; j++){

    if(this.acteList[j].idTypeGarantie === garantie.value.id) {
      this.plafondSousActe = [];
      // recuperer les sous actes de l'acte
      for(var i=0; i<this.sousActeList.length; i++){
        if(this.sousActeList[i].idTypeActe === this.acteList[j].id) {
          this.plafondSousActe.push({id: this.sousActeList[i].id, sousActe:this.sousActeList[i], taux:this.police.taux, dateEffet: new Date(this.police.dateEffet), montantPlafond: 0})
        }
      }

      this.plafondActe.push({id: this.acteList[j].id, acte:this.acteList[j], taux: this.police.taux, dateEffet: new Date(this.police.dateEffet), listeSousActe: this.plafondSousActe});
    }
    
  }

  console.log(this.plafondActe);
  }
}

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }


  validerPolice(police:Police){
    this.confirmationService.confirm({
      message: "Etes vous sur de vouloir valider la police?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.store.dispatch(featureAction.validerPolice(police));
      },
    });
  }

  annulerSaisie(){
    this.policeForm.reset();
    this.primeForm.reset();
    this.groupeForm.reset();
    this.displayDialogFormAddGroupe =false;
    this.displayDialogFormPolice = false;
    this.displayParametragePlafond = false;
    console.log('saisie');
  }
}
