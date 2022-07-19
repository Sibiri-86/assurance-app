import {AfterViewInit, Component, OnDestroy, OnInit} from "@angular/core";
import {takeUntil} from "rxjs/operators";
import {ConfirmationService, MenuItem, MessageService} from "primeng/api";
import {Police, Rapport, Report} from "../../../store/contrat/police/model";
import {Groupe} from "../../../store/contrat/groupe/model";
import * as featureAction from "../../../store/contrat/police/actions";
import {policeList, selectByteFile} from "../../../store/contrat/police/selector";
import {groupeList} from "../../../store/contrat/groupe/selector";
import * as groupeSelector from '../../../store/contrat/groupe/selector';
import {Adherent, AdherentFamille} from "../../../store/contrat/adherent/model";
import {Pays} from "../../../store/parametrage/pays/model";
import {Taux} from "../../../store/parametrage/taux/model";
import {Genre} from "../../../store/parametrage/genre/model";
import {Profession} from "../../../store/parametrage/profession/model";
import {QualiteAssure} from "../../../store/parametrage/qualite-assure/model";
import {Territorialite} from "../../../store/parametrage/territorialite/model";
import {Garantie} from "../../../store/parametrage/garantie/model";
import {SousActe} from "../../../store/parametrage/sous-acte/model";
import {Acte} from "../../../store/parametrage/acte/model";
import {Departement} from "../../../store/parametrage/departement/model";
import {DimensionPeriode} from "../../../store/parametrage/dimension-periode/model";
import {Commune} from "../../../store/parametrage/commune/model";
import {TypePrime} from "../../../store/parametrage/type-prime/model";
import {Region} from "../../../store/parametrage/region/model";
import {SecteurActivite} from "../../../store/parametrage/secteur-activite/model";
import {Observable, Subject} from "rxjs";
import {Status as Etat} from '../../common/models/etat.enum';
import {FormBuilder, FormControl, FormGroup, Validators,} from "@angular/forms";
import {select, Store} from "@ngrx/store";
import {AppState} from "src/app/store/app.state";
import {loadPays} from "../../../store/parametrage/pays/actions";
import * as paysSelector from "../../../store/parametrage/pays/selector";

import {loadRegion} from "../../../store/parametrage/region/actions";
import * as regionSelector from "../../../store/parametrage/region/selector";

import {loadDepartement} from "../../../store/parametrage/departement/actions";
import * as departementSelector from "../../../store/parametrage/departement/selector";

import {loadCommune} from "../../../store/parametrage/commune/actions";
import * as communeSelector from "../../../store/parametrage/commune/selector";

import {loadTaux} from "../../../store/parametrage/taux/actions";
import * as tauxSelector from "../../../store/parametrage/taux/selector";

import {loadTerritorialite} from "../../../store/parametrage/territorialite/actions";
import * as territorialiteSelector from "../../../store/parametrage/territorialite/selector";

import {loadGarant} from "../../../store/contrat/garant/actions";
import * as garantSelector from "../../../store/contrat/garant/selector";

import * as featureActionGroupe from "../../../store/contrat/groupe/actions";

import * as featureActionAdherent from "../../../store/contrat/adherent/actions";
import * as adherentSelector from "../../../store/contrat/adherent/selector";
import * as adherantSelector from "../../../store/contrat/adherent/selector";

import {loadIntermediaire} from "../../../store/contrat/intermediaire/actions";
import * as intermediaireSelector from "../../../store/contrat/intermediaire/selector";

import {Garant} from "../../../store/contrat/garant/model";
import {Intermediaire,} from "../../../store/contrat/intermediaire/model";

import {loadSecteurActivite} from "../../../store/parametrage/secteur-activite/actions";
import * as secteurActiviteSelector from "../../../store/parametrage/secteur-activite/selector";

import {loadDimensionPeriode} from "../../../store/parametrage/dimension-periode/actions";
import * as dimensionPeriodeSelector from "../../../store/parametrage/dimension-periode/selector";

import {loadPolice} from "src/app/store/contrat/police/actions";
import {loadGroupe} from "src/app/store/contrat/groupe/actions";

import * as policeSelector from "src/app/store/contrat/police/selector";

import {loadGarantie} from "../../../store/parametrage/garantie/actions";
import * as garantieSelector from "../../../store/parametrage/garantie/selector";

import {loadActe} from "../../../store/parametrage/acte/actions";
import * as acteSelector from "../../../store/parametrage/acte/selector";

import {loadSousActe} from "../../../store/parametrage/sous-acte/actions";
import * as sousActeSelector from "../../../store/parametrage/sous-acte/selector";

import {loadGenre} from "../../../store/parametrage/genre/actions";
import * as genreSelector from "../../../store/parametrage/genre/selector";
import * as featureActionsPlafond from "../../../store/contrat/plafond/action";
import * as plafondSelector from "../../../store/contrat/plafond/selector";
import {loadProfession} from "../../../store/parametrage/profession/actions";
import * as professionSelector from "../../../store/parametrage/profession/selector";

import {loadQualiteAssure} from "../../../store/parametrage/qualite-assure/actions";
import * as qualiteAssureSelector from "../../../store/parametrage/qualite-assure/selector";
import {Status} from "../../../store/global-config/model";
import {status} from "../../../store/global-config/selector";
import {EntityValidations} from "../../common/models/validation";
import {BreadcrumbService} from "../../../app.breadcrumb.service";
import {loadTypePrime} from "../../../store/parametrage/type-prime/actions";
import * as typePrimeSelector from "../../../store/parametrage/type-prime/selector";
import {PlafondActe, PlafondFamilleActe, PlafondSousActe} from "../../../store/parametrage/plafond/model";
import {Plafond} from "src/app/store/contrat/plafond/model";
import {printPdfFile, removeBlanks} from "../../util/common-util";
import {Arrondissement} from 'src/app/store/parametrage/arrondissement/model';
import {Secteur} from 'src/app/store/parametrage/secteur/model';
import * as secteurAction from '../../../store/parametrage/secteur/actions';
import * as secteurSelector from '../../../store/parametrage/secteur/selector';

import * as arrondissementAction from '../../../store/parametrage/arrondissement/actions';
import * as arrondissementSelector from '../../../store/parametrage/arrondissement/selector';
import {TypeDuree, TypeReport} from "src/app/store/contrat/enum/model";
import {Prime} from '../../../store/contrat/prime/model';
import {AdherentService} from '../../../store/contrat/adherent/service';
import {TauxCommissionIntermediaire} from "src/app/store/parametrage/taux-commission-intermediaire/model";
import * as tauxCommissionIntermediaireSelector
  from '../../../store/parametrage/taux-commission-intermediaire/selector';
import * as tauxCommissionIntermediaireAction from '../../../store/parametrage/taux-commission-intermediaire/actions';
import {PoliceService} from '../../../store/contrat/police/service';
import {TypeBareme} from "../../common/models/bareme.enum";
import {Avenant, TypeHistoriqueAvenant} from '../../../store/contrat/historiqueAvenant/model';
import {HistoriqueAvenantService} from '../../../store/contrat/historiqueAvenant/service';
import * as groupeSlector from '../../../store/contrat/groupe/selector';
import { PlafondService } from "src/app/store/contrat/plafond/service";
import { constrainMarkerToRange } from "@fullcalendar/core/datelib/date-range";
import { act } from "@ngrx/effects";

@Component({
  selector: "app-police",
  templateUrl: "./police.component.html",
  styleUrls: ["./police.component.scss"],
})
export class PoliceComponent implements OnInit, OnDestroy, AfterViewInit {
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
  isgroupEditing = false;
  obj: any = {group: {}, prime: {}};
  territorialiteList$: Observable<Array<Territorialite>>;
  territorialiteList: Array<Territorialite>;
  sousActeList$: Observable<Array<SousActe>>;
  sousActeList: Array<SousActe>;
  acteList$: Observable<Array<Acte>>;
  acteList: Array<Acte>;
  adherentList: Array<Adherent>;
  adherentList1: Array<Adherent>;
  adherentList2: Array<Adherent>;
  adherent: Adherent = {};
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
  clonedPlafondConfiguration: { [s: string]: PlafondFamilleActe } = {};
  plafondFamilleActe: Array<PlafondFamilleActe>;
  plafondFamilleActeTemp: PlafondFamilleActe;
  plafondFamilleActeConstruct: Array<PlafondFamilleActe> = [];
  plafondFamilleActeConstrutRecap: Array<PlafondFamilleActe> = [];
  plafondActuelleConfiguration: Array<PlafondFamilleActe> = [];
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
  qualitePrincipalList: Array<QualiteAssure>;
  membreList: Array<QualiteAssure>;
  qualiteAssureList$: Observable<Array<QualiteAssure>>;
  parametrageActe: boolean = false;
  parametragePrime: boolean = false;
  infosPolice: boolean = false;
  infosGroupe: boolean = true;
  selectedTypePrime: TypePrime = {};
  groupe: Groupe = {};
  rapport: Rapport = {};
  rapport$: Observable<Rapport>;
  rapportGroupe: Rapport = {};
  rapportGroupe$: Observable<Rapport>;
  plafondGroupe: Plafond = {};
  plafondGroupe$: Observable<Plafond>;
  items: MenuItem[];
  activeItem: MenuItem;
  index: number = 0;
  displaySousActe: boolean = false;
  indexeActe: number;
  countfamilleActe: number = 0;
  typeDureeSelected: string;
  displayParametragePlafond: boolean = false;
  domaineSelected: QualiteAssure;
  isInternationalGroupe: boolean;
  typeDuree: any = [{label: 'Jour', value: TypeDuree.JOUR},
  {label: 'Mois', value: TypeDuree.MOIS}, {label: 'Année', value: TypeDuree.ANNEE}];
  secteurList: Array<Secteur>;
  secteurList$: Observable<Array<Secteur>>;
  arrondissementList$: Observable<Array<Arrondissement>>;
  arrondissementList: Array<Arrondissement>;
  displayActe = false;
  displayPrevisualiserParametrage : boolean = false;
  displayConfigurationPlafond: boolean = false;
  displayDialogFormUpdateAdherent: boolean = false;
  infosAdherent: boolean = false;
  isPlafondEditing = false;
  newGroupe: Groupe = {};
  newPrime: Prime = {};
  valideMontantPlafond = true;
  valideDateEffet = true;
  assurerListe: Adherent[] = [];
  adherantSelected: Adherent = {};
  adherentPrincipaux: Adherent[];
  adherentPrincipaux1: Adherent[];
  adherentPrincipauxTMP: Array<Adherent>;
  adherentSelected: Adherent = {};
  genre: Genre[];
  tauxCommissionIntermediaireList: Array<TauxCommissionIntermediaire>;
  tauxCommissionIntermediaireList$: Observable<Array<TauxCommissionIntermediaire>>;
  isImport = 'NON';
  FamilyListToImport: Array<AdherentFamille>;
  typeBareme =   Object.keys(TypeBareme).map(key => ({ label: TypeBareme[key], value: key }));
  typeEtat = Object.keys(Etat).map(key => ({ label: Etat[key], value: key }));
  private afficheDetail = false;
  bareme: TypeBareme;
  taux: Taux;
  tauxGlobal: Taux;
  baremeList$: Observable<Array<PlafondFamilleActe>>;
  baremeList: Array<PlafondFamilleActe>;
  reponse = 0;
  importer : Boolean = false;
  adherentChecked : Adherent;
  displayPhotos: Boolean = false;
  pictureUrl='';
  indexActeExpand:number;
  displayRecap = false;
  isEnreg: boolean;
  groupeListPolice$: Observable<Array<Groupe>>;
  groupeListPolice: Array<Groupe>;
  plafondFamilleActeControle: PlafondFamilleActe = {};
  groupeControle: Groupe = {};
  isPresting =false;
  groupeListes: Array<Groupe>;
  avenantModif1: Avenant = {};
  displayBareme: boolean = false;
  stat: Rapport;



  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private breadcrumbService: BreadcrumbService,
    private adherentService: AdherentService,
    private policeService: PoliceService,
    private historiqueAvenantService: HistoriqueAvenantService,
    private plafondService: PlafondService,
  ) {

    this.plafondForm = this.formBuilder.group({
      // domaine: new FormControl({}),
      id: new FormControl(''),
      plafondAnnuelleFamille: new FormControl(''),
      plafondAnnuellePersonne: new FormControl(''),
      plafondGlobalInternationnal: new FormControl(''),
      plafondGlobalEvacuationSanitaire: new FormControl('')
    });

    this.adherentForm = this.formBuilder.group({
      id: new FormControl(null),
      nom: new FormControl('', [Validators.required]),
      prenom: new FormControl('', [Validators.required]),
      matriculeSouscripteur: new FormControl('', ),
      dateNaissance: new FormControl('', [Validators.required]),
      matriculeGarant: new FormControl('', ),
      // matriculeSouscripteur:new FormControl("", [Validators.required]),
      numero: new FormControl(null, ),
      lieuNaissance: new FormControl('', [Validators.required]),
      numeroTelephone: new FormControl('', [Validators.required]),
      adresse: new FormControl(''),
      adresseEmail: new FormControl(''),
      profession: new FormControl(''),
      referenceBancaire: new FormControl(''),
      qualiteAssure: new FormControl('', [Validators.required]),
      genre: new FormControl('', [Validators.required]),
      dateEntree: new FormControl('', [Validators.required]),
      manageIncorporation: 0
    });

    this.policeForm = this.formBuilder.group({
      id: new FormControl(''),
      numero: new FormControl(''),
      garant: new FormControl(null, [Validators.required]),
      intermediaire: new FormControl(null, [Validators.required]),
      //numero: new FormControl('',[Validators.required]),
      taux: new FormControl(null, [Validators.required]),
      territorialite: new FormControl('', [Validators.required]),
      typeDuree: new FormControl('', [Validators.required]),
      duree: new FormControl('', [Validators.required]),
      dateEffet: new FormControl('', [Validators.required]),
      dateEcheance: new FormControl({value: '', disabled: true}, [Validators.required]),
      adressePostale: new FormControl('', [Validators.required]),
      tauxCommissionIntermediaire: new FormControl(null),
      // dateSaisie: new FormControl('',[Validators.required]),
      // dateValidation: new FormControl('',[Validators.required]),
      nom: new FormControl('', [Validators.required]),
      // code: new FormControl('',[Validators.required]),
      contact: new FormControl('', [Validators.required]),
      adresseEmail: new FormControl(null, [Validators.required]),
      personneRessource: new FormControl('', [Validators.required]),
      contactPersonneRessource: new FormControl('', [Validators.required]),
      emailPersonneRessource: new FormControl('', [Validators.required]),
      secteurActivite: new FormControl('', [Validators.required]),
      numeroIfu: new FormControl(''),
      rccm: new FormControl(''),
      secteur: new FormControl('', [Validators.required]),
      commune: new FormControl('', [Validators.required]),
      pays: new FormControl(''),
      region: new FormControl(''),
      departement: new FormControl(''),
      arrondissement: new FormControl(''),
      referencePolice: new FormControl(''),
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
      typeDuree: new FormControl('', [Validators.required]),
      adresse:  new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      commune: new FormControl('', [Validators.required]),
      dateEcheance: new FormControl(''),
    });

    this.primeForm = this.formBuilder.group({
      prime: new FormControl(null, [Validators.required]),
      primeEmploye: new FormControl(""),
      primeConjoint: new FormControl(""),
      primeEnfant: new FormControl(""),
      primeFamille: new FormControl(""),
      primeAdulte: new FormControl(""),
      primePersonne: new FormControl(""),
      primeAnnuelle: new FormControl(null)
    });

    this.breadcrumbService.setItems([{ label: "Police" }]);
  }


  ifExistTerritorialiteInternational(groupe: Groupe): boolean {
    return groupe.territorialite.some(element => element.code === 'INT');
  }


  voirConfiguration() {
  /**recuperer le plafond du groupe */
  this.displayConfigurationPlafond = true;
  }

  voirBareme() {
    /**recuperer le plafond du groupe */
    this.loadPlafondByGroupe(this.groupe);
    this.displayBareme = true;
    }

  fermerConfigurationPlafond() {
    this.displayConfigurationPlafond = false;
  }

  /**permet de parametrer le plafond pour un groupe */
  parametrerPlafond(groupe: Groupe) {
    this.groupe = {...groupe};
    console.log('id du groupe est' + groupe.id);
    //this.plafondGroupe$ = this.store.pipe(select(plafondSelector.plafondGroupe));
   // this.store.dispatch(featureActionsPlafond.loadPlafondGroupe(this.groupe));
   // this.plafondGroupe$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
    //if (value) {
      //this.plafondGroupe = value;
     // console.log(value);
     // this.plafondActuelleConfiguration = value.plafondFamilleActe.slice();
      //this.plafondActuelleConfiguration[0].montantPlafond = 20000;
    //}
    //});
    console.log("=====groupe.dateEffet; bien===========",this.groupe.dateEffet);
    this.plafondActuelleConfiguration = this.plafondActuelleConfiguration?.filter(famille=> famille?.etat === "ACTIF");
    
    for (let i = 0; i < this.plafondActuelleConfiguration.length; i++) {
      this.plafondActuelleConfiguration[i].dateEffet = new Date(groupe.dateEffet);
      this.plafondActuelleConfiguration[i].listeActe = this.plafondActuelleConfiguration[i]?.listeActe?.filter(acte=>acte.etat ==="ACTIF");
      for (let j = 0; j < this.plafondActuelleConfiguration[i].listeActe.length; j++){
        this.plafondActuelleConfiguration[i].listeActe[j].dateEffet = new Date(groupe.dateEffet);
        this.plafondActuelleConfiguration[i].listeActe[j].listeSousActe = this.plafondActuelleConfiguration[i]?.listeActe[j]?.listeSousActe.filter(sousActe=>sousActe.etat ==="ACTIF");
        for (let k = 0; k < this.plafondActuelleConfiguration[i].listeActe[j].listeSousActe.length; k++) {
          this.plafondActuelleConfiguration[i].listeActe[j].listeSousActe[k].dateEffet =  new Date(groupe.dateEffet);
        }
      }
    }
    console.log("=====groupe.dateEffet; plafondActuelleConfiguration===========",this.plafondActuelleConfiguration);
    console.log(groupe);
    this.groupe = groupe;
    console.log(this.ifExistTerritorialiteInternational(groupe));
    if (this.ifExistTerritorialiteInternational(groupe)){
    this.isInternationalGroupe = true;
    }
    this.displayParametragePlafond = true;
    this.loadPlafondByGroupe(groupe);
    //console.log(this.plafondGroupe);
  }


  controleDateActe(rowData: PlafondFamilleActe) {
  
   // this.plafondFamilleActeControle = this.plafondActuelleConfiguration.find(plafon => plafon.id ===  rowData.id);

   
   if (new Date(rowData.dateEffet).getTime()  >  new Date(this.groupe.dateEffet).getTime()) {
      
    this.messageService.add({severity:'success', summary: 'Error', detail:'la date effet ne doit pas être supérieur à celle du groupe'});
    rowData.dateEffet =  new Date(this.groupe.dateEffet);
  }


  }

  controleDateActe1(rowData: PlafondActe) {
    
      if (new Date(rowData.dateEffet).getTime() > new Date(this.groupe.dateEffet).getTime()) {
       
        this.messageService.add({severity:'success', summary: 'Error', detail:'la date effet ne doit pas être supérieur à celle du groupe'});
        rowData.dateEffet =  new Date(this.groupe.dateEffet);
      }
    
  
}

  controleDateActe2(rowData: PlafondSousActe) {
    if (new Date(rowData.dateEffet).getTime() >  new Date(this.groupe.dateEffet).getTime()) {
       
      this.messageService.add({severity:'success', summary: 'Error', detail:'la date effet ne doit pas être supérieur à celle du groupe'});
      rowData.dateEffet =  new Date(this.groupe.dateEffet);
    }
  }

  voirDetailAdherent(adherent: Adherent){
    this.adherent = {...adherent};
    this.infosAdherent = true;
  }

  ngAfterViewInit() {
    //this.fraisAccessoireInput = this.inputFraisAccessoireView.nativeElement as HTMLElement;
    //this.fraisBadgeInput = this.inputFraisBadgeView.nativeElement as HTMLElement;

  }

  ngOnInit(): void {


    this.tauxCommissionIntermediaireList$ = this.store.pipe(select(tauxCommissionIntermediaireSelector.tauxcommissionintermediaireList));
    this.store.dispatch(tauxCommissionIntermediaireAction.loadTauxCommissionIntermediaire());
    this.tauxCommissionIntermediaireList$.pipe(takeUntil(this.destroy$))
              .subscribe(value => {
                if (value) {
                  this.tauxCommissionIntermediaireList = value.slice();
                }
    });

    this.plafondGroupe$ = this.store.pipe(select(plafondSelector.plafondGroupe));
    this.store.dispatch(featureActionsPlafond.loadPlafondGroupe(null));
    this.plafondGroupe$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
    if (value) {
     // if(value.id) {
      //this.plafondGroupe = value;
      console.log(value);
      this.plafondForm.patchValue(value);
      /** renvoyer la configuration actuelle dans l'objet */
      this.plafondActuelleConfiguration = value.plafondFamilleActe.slice();
      console.log("=====groupevalue===========",this.groupe.dateEffet);
      if(this.groupe.id) {
      //  console.log("=====groupe.dateEffet;===========",this.groupe.dateEffet);
        this.plafondActuelleConfiguration.forEach(plafon=>{
          plafon.dateEffet = this.groupe.dateEffet;
        });
      }
      
      //}
      //this.plafondActuelleConfiguration[0].montantPlafond = 20000;
    }
    });
    this.adherentPrincipauxTMP = [];
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
      /* {
        field: "numeroIfu",
        validations: [
          { validName: "required", validMessage: "Ce champs est obligatoire" },
          {
            validName: "maxlength",
            validMessage: "Ce champs requiert au plus 5 caractères",
          },
        ],
      }, */
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
    this.baremeList$ = this.store.pipe(select(plafondSelector.plafondConfig));
    this.baremeList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.plafondActuelleConfiguration = value.slice();
        if(this.importer) {
          this.plafondActuelleConfiguration =  this.plafondActuelleConfiguration.filter(plafond=>plafond.etat === Etat.ACTIF);
        for (var i = 0; i < this.plafondActuelleConfiguration.length; i++){
          this.plafondActuelleConfiguration[i].dateEffet = new Date(this.groupe.dateEffet);
          this.plafondActuelleConfiguration[i].taux = this.groupe.taux;
          this.plafondActuelleConfiguration[i].listeActe = this.plafondActuelleConfiguration[i].listeActe?.filter(acte=>acte.etat === Etat.ACTIF);
          for (var j = 0; j < this.plafondActuelleConfiguration[i].listeActe.length; j++){
            this.plafondActuelleConfiguration[i].listeActe[j].dateEffet = new Date(this.groupe.dateEffet);
            this.plafondActuelleConfiguration[i].listeActe[j].taux = this.groupe.taux;
            this.plafondActuelleConfiguration[i].listeActe[j].listeSousActe = this.plafondActuelleConfiguration[i].listeActe[j]?.listeSousActe.filter(sous=>sous.etat === Etat.ACTIF);
            for (var k = 0; k < this.plafondActuelleConfiguration[i].listeActe[j].listeSousActe.length; k++){
              this.plafondActuelleConfiguration[i].listeActe[j].listeSousActe[k].dateEffet = new Date(this.groupe.dateEffet);
              this.plafondActuelleConfiguration[i].listeActe[j].listeSousActe[k].taux = this.groupe.taux;
            }
          }
        }
        this.importer = false;
        }
        console.log(this.plafondActuelleConfiguration);
      }
    });

    /** dispatch action pour imprimer le pdf */
    this.store.dispatch(featureAction.setReport(null));
    this.store.pipe(select(selectByteFile)).pipe(takeUntil(this.destroy$))
    .subscribe(bytes => {
        if (bytes) {
                printPdfFile(bytes);
        }
    });
    this.arrondissementList$ = this.store.pipe(select(arrondissementSelector.arrondissementList));
    this.store.dispatch(arrondissementAction.loadArrondissement());
    this.arrondissementList$.pipe(takeUntil(this.destroy$))
            .subscribe(value => {
              if (value) {
                this.loading = false;
                this.arrondissementList = value.slice();
                console.log("===============arrondissementList=============");
                console.log(this.arrondissementList);
                console.log("===============arrondissementList=============");
              }
  });

    this.secteurList$ = this.store.pipe(select(secteurSelector.secteurList));
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
          this.qualitePrincipalList = this.qualiteAssureList.filter(elem => elem.code === 'ADHERENT');
          this.membreList =  this.qualiteAssureList.filter(elem => elem.code !== 'ADHERENT');
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

    // this.loadActualList();

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

    this.loadAllPolice();

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
        console.log("===============commune=============");
        console.log(this.communeList);
        console.log("===============commune=============");
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
    this.statusObject$ = this.store.pipe(select(status));
    this.checkStatus();
    this.FamilyListToImport = [];
    this.isEnreg = false;
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
        this.regionList = this.regionList.filter(element => element.idTypePays === event.value.id);
      }
  });
  }

  changeRegion(event) {
    this.departementList$.pipe(takeUntil(this.destroy$))
    .subscribe(value => {
      if (value) {
        this.departementList = value.slice();
        this.departementList = this.departementList.filter(element => element.idRegion === event.value.id);
      }
  });
  }

  changeDepartement(event) {
    this.communeList$.pipe(takeUntil(this.destroy$))
    .subscribe(value => {
      if (value) {
        this.communeList = value.slice();
        this.communeList = this.communeList.filter(element => element.idDepartement === event.value.id);
      }
  });
  }

  changeCommune(event) {
    this.arrondissementList$.pipe(takeUntil(this.destroy$))
    .subscribe(value => {
      if (value) {
        this.arrondissementList = value.slice();
        this.arrondissementList = this.arrondissementList.filter(element => element.idCommune === event.value.id);
      }
  });
  }

  changeArrondissement(event) {
    this.secteurList$.pipe(takeUntil(this.destroy$))
    .subscribe(value => {
      if (value) {
        this.secteurList = value.slice();
        this.secteurList = this.secteurList.filter(element => element.idArrondissement === event.value.id);
      }
  });
  }

  onClickReponse(event){
    console.log(this.reponse);
  }

  appliquerTauxGlobal() {
   if(this.tauxGlobal) {
      for (var i = 0; i < this.plafondActuelleConfiguration.length; i++){
        this.plafondActuelleConfiguration[i].taux = this.tauxGlobal;
        for (var j = 0; j < this.plafondActuelleConfiguration[i].listeActe.length; j++){
          this.plafondActuelleConfiguration[i].listeActe[j].taux =  this.tauxGlobal;
          for (var k = 0; k < this.plafondActuelleConfiguration[i].listeActe[j].listeSousActe.length; k++){
            this.plafondActuelleConfiguration[i].listeActe[j].listeSousActe[k].taux =  this.tauxGlobal;
          }
        }
      
      }
   }
      
    
  }

  appliquerTauxFamilleGlobal(plafond: PlafondFamilleActe) {
    if(plafond.taux) {
      if(plafond.listeActe) {
        plafond.listeActe.forEach(act=>{
          act.taux =plafond.taux;
          if(act.listeSousActe) {
            act.listeSousActe.forEach(sous=>{

              sous.taux = act.taux;
            });
          }
        })
      }
    }
  }

  appliquerDomaineFamilleGlobal(plafond: PlafondFamilleActe) {
    if(plafond.domaine) {
      if(plafond.listeActe) {
        plafond.listeActe.forEach(act=>{
          act.domaine =plafond.domaine;
          if(act.listeSousActe) {
            act.listeSousActe.forEach(sous=>{
              sous.domaine = act.domaine;
            });
          }
        })
      }
    }
  }

  appliquerDomaineActeGlobal(acte: PlafondActe) {
    if(acte.domaine) {
      
          if(acte.listeSousActe) {
            acte.listeSousActe.forEach(sous=>{
              sous.domaine = acte.domaine;
            });
          }
      }
  }
  

  

  // fonction pour creer adherent.
  onCreateAddherent() {
    console.log('àààààààààààààààààààààthis.adherentForm.valueàààààààààààààààààààààààà', this.adherentForm.value);
    console.log('ooooooooooooooooo  this.adherentFamilleList oooooooooooooooooooo', this.adherentFamilleList);
    this.adherentWithFamille.adherent = this.adherentForm.value || this.adherentSelected;
    this.adherentWithFamille.adherent.groupe = this.groupe;
    this.adherentWithFamille.famille = this.adherentFamilleList;
    this.store.dispatch(featureActionAdherent.createAdherentwithFamille(this.adherentWithFamille));
    /*if(!this.adherentForm.value.id){
    this.store.dispatch(featureActionAdherent.createAdherentwithFamille(this.adherentWithFamille));
    console.log('ooooooooooooooooo this.adherentWithFamille oooooooooooooooooooo', this.adherentWithFamille);
    }else {
      this.store.dispatch(featureActionAdherent.updateAdherent(this.adherentForm.value || this.adherentSelected));
    }*/
    this.adherentFamilleList = [];
    this.adherentForm.reset();
  }


  supprimerAdherent(adherent: Adherent){
  this.store.dispatch(featureActionAdherent.deleteAdherent(adherent));
  }

  modifierAdherent(adherent: Adherent){
    this.adherent = {...adherent};
    this.adherent.dateNaissance = new Date(this.adherent.dateNaissance);
    this.adherent.dateEntree = new Date(this.adherent.dateEntree);
    this.displayDialogFormUpdateAdherent = true;
    this.adherentForm.patchValue(this.adherent);
  }



  changePrime(event) {
   
        this.selectedTypePrime = event.value;
      /*  this.primeForm = this.formBuilder.group({
          prime: new FormControl(null, [Validators.required]),
          primeEmploye: new FormControl(""),
          primeConjoint: new FormControl(""),
          primeEnfant: new FormControl(""),
          primeFamille: new FormControl(""),
          primeAdulte: new FormControl(""),
          primePersonne: new FormControl(""),
          primeAnnuelle: new FormControl(null)
        });
        console.log(this.selectedTypePrime.code);
        this.primeForm.get('prime').setValue(event.value);
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
    this.adherentFamille.push({adherent: this.adherentForm.value, famille: this.adherentFamilleList});
    this.adherentForm.reset();
    this.adherentFamilleList = [];
    this.isEnreg = true;
    console.log(this.adherentFamille);
  }
  /** cette methode permet de creer un groupe avec des informations basiques */
  onCreateGroupe(){
    this.groupe = this.groupeForm.value;
    console.log('******************************this.groupe********************************', this.groupe);
    this.groupe.police = this.police;
    this.groupe.prime = this.primeForm.value;
    this.groupe.typePrime = this.selectedTypePrime;

    /* if(this.groupe.prime.primeAnnuelle){
      this.groupe.prime.primeAnnuelle = removeBlanks(this.groupe.prime.primeAnnuelle +'');
    } */
    if (this.groupe.prime.primeAdulte){
      this.groupe.prime.primeAdulte = removeBlanks(this.groupe.prime.primeAdulte + '');
    }
    if (this.groupe.prime.primeConjoint){
      this.groupe.prime.primeConjoint = removeBlanks(this.groupe.prime.primeConjoint + '');
    }
    if (this.groupe.prime.primeEmploye){
      this.groupe.prime.primeEmploye = removeBlanks(this.groupe.prime.primeEmploye + '');
    }
    if (this.groupe.prime.primeEnfant){
      this.groupe.prime.primeEnfant = removeBlanks(this.groupe.prime.primeEnfant + '');
    }
    if ( this.groupe.prime.primeFamille){
      this.groupe.prime.primeFamille = removeBlanks(this.groupe.prime.primeFamille + '');
    }
    this.groupe.adherentFamille = this.adherentFamille;
    console.log(this.groupe);
    this.groupeListPolice$ = this.store.pipe(select(groupeList));
    this.store.dispatch(featureActionGroupe.createGroupe(this.groupe));
    this.store.dispatch(featureActionGroupe.loadGroupe({policeId: this.police.id}));
    this.groupeListPolice$.pipe(takeUntil(this.destroy$)).subscribe(
        (res) => {
          if (res) {
            this.groupeListPolice = res;
            this.police.listGroupe = res;
            this.getStatistique(this.police);
          }
        }
    );
    this.adherentFamille = [];
    this.FamilyListToImport = [];
    this.groupe = {};
    this.afficheDetail = false;
    this.displayDialogFormAddGroupe = false;
    // this.getGroupeByPolice2();
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
    this.dateEcheance = new Date(this.dateEcheance.setDate(this.dateEcheance.getDate() - 1));
    if (this.typeDureeSelected === 'Jour') {
      return new Date(this.dateEcheance.setDate(this.dateEcheance.getDate() + Number(value)));
    } else if (this.typeDureeSelected === 'Mois') {
        return new Date(this.dateEcheance.setMonth(this.dateEcheance.getMonth() + Number(value)));
      } else if (this.typeDureeSelected === 'Annee') {
        return new Date(this.dateEcheance.setFullYear(this.dateEcheance.getFullYear() + Number(value)));
      }
    }

    getNewDateForGroupe(value: number): Date {
      this.dateEcheance = new Date(this.groupeForm.get('dateEffet').value);
      this.dateEcheance = new Date(this.dateEcheance.setDate(this.dateEcheance.getDate() - 1));
      console.log(this.dateEcheance);
      if (this.typeDureeSelected === 'Jour') {
        return new Date(this.dateEcheance.setDate(this.dateEcheance.getDate() + Number(value)));
      } else if (this.typeDureeSelected === 'Mois') {
          return new Date(this.dateEcheance.setMonth(this.dateEcheance.getMonth() + Number(value)));
        } else if (this.typeDureeSelected === 'Annee') {
          return new Date(this.dateEcheance.setFullYear(this.dateEcheance.getFullYear() + Number(value)));
        }
      }

    /* changeTypeDuree() {
    this.typeDureeSelected = this.policeForm.get('typeDuree').value;
    if (this.policeForm.get('duree')) {
      this.onRefreshDateEcheance(this.policeForm.get('duree').value);
      }
    } */

  changeTypeDuree(){
    this.typeDureeSelected = this.policeForm.get('typeDuree').value;
    console.log('value === ' + this.typeDureeSelected);
    if (this.policeForm.get('duree').value) {
      this.historiqueAvenantService.getDateFin(this.policeForm.get('dateEffet').value, 
      this.policeForm.get('typeDuree').value, this.policeForm.get('duree').value ).subscribe(
        (res) => {
          this.policeForm.patchValue({
            dateEcheance: res.body
          });
        }
      );
    }
    // this.onRefreshDateEcheanceForGroupe();
  }

  onRefreshDateEcheance() {
    if (this.policeForm.get('typeDuree')) {
      if(this.policeForm.get('duree').value <= 0) {
        this.policeForm.get('duree').setValue(null);
        this.policeForm.get('dateEcheance').setValue(null);
      } else {
        this.historiqueAvenantService.getDateFin(this.policeForm.get('dateEffet').value, 
        this.policeForm.get('typeDuree').value, this.policeForm.get('duree').value ).subscribe(
          (res) => {
            this.policeForm.patchValue({
              dateEcheance: res.body
            });
          }
        );
      }
    
    }
     // this.getNewDate(value)
  }


    validerRecap() {

      this.confirmationService.confirm({
        message: "Etes vous sûre de vouloir valider?",
        header: "Confirmation",
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          for ( let prop of this.plafondFamilleActeConstruct){
            this.plafondActuelleConfiguration.push(prop);
            this.displayPrevisualiserParametrage = false;
          }
        },
      });
    }

    viderRecap() {
      this.confirmationService.confirm({
        message: "Etes vous sur de vouloir vider?",
        header: "Confirmation",
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          this.plafondFamilleActeConstruct = [];
          this.displayPrevisualiserParametrage = false;
        },
      });
    }

    modificationPeriodeFamille(famille: PlafondFamilleActe) {
      
      if(famille.dimensionPeriode) {
        
        famille?.listeActe?.forEach(act=>{
              act.dimensionPeriode =famille.dimensionPeriode;
              act?.listeSousActe?.forEach(sous=>{
                sous.dimensionPeriode =famille.dimensionPeriode;
              })
            });
            
         

      }
              
     
    }

    modificationPeriode(act: PlafondActe) {
      
      if(act.dimensionPeriode) {
        if(this.plafondActuelleConfiguration
          .find(plafond=>plafond.garantie.id === act?.acte?.idTypeGarantie).dimensionPeriode.id !== act.dimensionPeriode.id) {
            this.showToast("error", "INFORMATION", "la periode de la famille est différente de celle de l'acte");
              act.dimensionPeriode = {};
              act?.listeSousActe?.forEach(sous=>{
                sous.dimensionPeriode = {};
              });
              
            
            
          } else{
            act?.listeSousActe?.forEach(sous=>{
              sous.dimensionPeriode =act.dimensionPeriode;
            });
            
          }

      }
              
     
    }

    modificationPeriodeSous(sous: PlafondSousActe) {
      if(sous.dimensionPeriode) {
        if(this.plafondActuelleConfiguration
          .find(plafond=>plafond.listeActe.find(acte=>acte.acte.id === sous?.sousActe?.idTypeActe && acte.dimensionPeriode.id !== sous.dimensionPeriode.id))) {
            this.showToast("error", "INFORMATION", "la periode de la famille est différente de celle de l'acte");
            sous.dimensionPeriode = {};
          } 

      }
              
     
    }

    


    modificationEtatSous(act: PlafondActe) {
      console.log(act);
 
      if(act) {
       if(act.etat == Etat.ACTIF) {
        this.plafondActuelleConfiguration.find(plafond=>plafond.garantie.id === act?.acte?.idTypeGarantie).etat =  Etat.ACTIF;
       }
        act?.listeSousActe?.forEach(sous=>{

          sous.etat = act.etat;
        });
      }
    }

    modificationEtatActe(plafond: PlafondFamilleActe) {
      if(plafond){

        plafond?.listeActe?.forEach(acte=>{

          acte.etat = plafond.etat;
          acte?.listeSousActe?.forEach(sous=>{

            sous.etat = plafond.etat;
          });

        })
      }
    }

    importerBareme() {
      this.importer = true;
      console.log(this.importer);
     /*  this.plafondService.$getBaremesConfigSansTaux(this.bareme).subscribe((rest)=>{
        console.log(rest)
      }) */

      
      this.store.dispatch(featureActionsPlafond.loadPlafondConfigSansTaux({typeBareme: this.bareme}));
    }

    changeTypeDureeGroupe(){
      this.typeDureeSelected = this.groupeForm.get('typeDuree').value;
      console.log(this.typeDureeSelected);
      if (this.groupeForm.get('duree').value) {
        this.historiqueAvenantService.getDateFin(this.groupeForm.get('dateEffet').value, 
        this.groupeForm.get('typeDuree').value, this.groupeForm.get('duree').value ).subscribe(
          (res) => {
            this.groupeForm.patchValue({
              dateEcheance: new Date(res.body)
            });
          }
        );
      }
      /* onRefreshDateEcheance(value: number) {
        this.policeForm
          .get("dateEcheance")
          .setValue(
            this.getNewDate(value)
          );
      } */
  }

  onRefreshDateEcheanceForGroupe() {
    // this.typeDureeSelected = this.groupeForm.get('typeDuree').value;
    console.log(this.typeDureeSelected);
    if (this.groupeForm.get('duree').value) {
      this.historiqueAvenantService.getDateFin(this.groupeForm.get('dateEffet').value, 
      this.groupeForm.get('typeDuree').value, this.groupeForm.get('duree').value ).subscribe(
        (res) => {
          this.groupeForm.patchValue({
            dateEcheance: res.body
          });
        }
      );
    }
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
    this.adherentSelected = null;
    this.displayDialogFormAddAdherent = true;
  }

  voirAdherent(groupe: Groupe) {
    this.displayDialogFormAdherent = true;
    this.groupe = groupe;
    this.adherentList$ = this.store.pipe(select(adherentSelector.adherentList));
    this.store.dispatch(featureActionAdherent.loadAdherent({idGroupe: groupe.id}));
    this.adherentList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.adherentList = value.slice();
      }
    });

    this.rapportGroupe$ = this.store.pipe(select(groupeSelector.rapport));
    this.store.dispatch(featureActionGroupe.loadRapport(groupe));
    this.rapportGroupe$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.rapportGroupe = value;
        console.log(this.rapportGroupe);
      }
    });
  }

  editPolice(police: Police) {
    
    console.log(police?.secteur?.idArrondissement);
    this.police = { ...police };
    console.log(this.arrondissementList);
    console.log(police?.secteur?.idArrondissement);
    this.policeForm.get('arrondissement').setValue(this.arrondissementList.find(arrondi=> arrondi.id === police?.secteur?.idArrondissement));
    console.log("bon"+this.policeForm.value.arrondissement);
    const id = this.arrondissementList.find(arrondi=> arrondi.id === police?.secteur?.idArrondissement)?.idCommune;
    const departement = this.communeList.find(commun=> commun.id === id)?.idDepartement;
    console.log(departement);
   
    this.policeForm.get('commune').setValue(this.communeList.find(commun=> commun.id === id));
    this.policeForm.get('departement').setValue(this.departementList.find(depart=> depart.id === departement));
    this.policeForm.get('region').setValue(this.regionList.find(regio=> regio.id === this.departementList.find(depart=> depart.id === departement)?.idRegion));
    this.policeForm.get('pays').setValue(this.paysList.
      find(pay=> pay.id === this.policeForm.get('region').value?.idTypePays));


    

    if (this.police.dateEffet) {
      this.police.dateEffet = this.police.dateEffet;
    }
    if (this.police.dateEcheance) {
      this.police.dateEcheance = this.police.dateEcheance;
    }
    this.policeForm.patchValue(this.police);
    if (this.police.fraisBadge) {
      this.policeForm.get('fraisBadge').setValue(Number(this.police.fraisBadge).toLocaleString('fr-FR'));
    }
    if (this.police.fraisAccessoire) {
      this.policeForm.get('fraisAccessoire').setValue(Number(this.police.fraisAccessoire).toLocaleString('fr-FR'));
    }
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

  voirRecap(){
    this.displayRecap = true;
  }
  nextToAdherent() {
    this.displayAdherentForm = true;
    this.displayGroupForm = false;
  }

  onCreate() {
    this.police = this.policeForm.value;
    this.police.fraisAccessoire = removeBlanks(this.police.fraisAccessoire + '');
    this.police.fraisBadge = removeBlanks(this.police.fraisBadge + '');
    this.police.dateEcheance = this.policeForm.get('dateEcheance').value;
    console.log(this.police);
    this.confirmationService.confirm({
      message: 'Etes vous sur de vouloir ajouter ce police ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (this.police.id) {
          this.store.dispatch(
            featureAction.createPolice(this.police)
          );
          this.displayDialogFormPolice = false;
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
    this.rapport$ = this.store.pipe(select(policeSelector.rapport));
    this.store.dispatch(featureAction.loadRapport(this.police));
    this.rapport$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.rapport = value;
        console.log(this.rapport);
      }
    });

    this.groupeList$ = this.store.pipe(select(groupeList));
    this.store.dispatch(loadGroupe({policeId: this.police.id}));
    this.groupeList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.groupeList = value.slice();
      }
    });

    this.plafondFamilleActe = [
      {
        dimensionPeriode: {},
        taux: this.police.taux,
        dateEffet: this.police.dateEffet,
        garantie: {}
      }
    ];

    this.plafondActe = [
      {
        montantPlafond: 0,
        dimensionPeriode: {},
        nombre: 0,
        dateEffet: this.police.dateEffet,
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
        dateEffet: this.police.dateEffet,
        sousActe: {}
      }
    ];
    this.displayDialogFormGroupe = true;
    this.getStatistique(police);
  }




  addGroupe() {
    this.displayDialogFormAddGroupe = true;
    this.displayGroupForm = true;
    this.displayAdherentForm = false;
    this.isgroupEditing = false;
    this.groupeForm.reset();
    this.primeForm.reset();
    this.selectedTypePrime = {} ;
  }

  /**mode edition de plafondFamilleActe */
  onRowEditInit(plafondFamilleActe: PlafondFamilleActe) {
    console.log(plafondFamilleActe);
    this.clonedPlafondFamilleActe["0"] = {
      ...plafondFamilleActe
    };

  }

  expandActe(ri){
    console.log(ri);
    this.indexActeExpand = ri;
  }

  onCheckDateEffetSousActe(event, form){
    if(event) {
      if (new Date(event).getTime() < new Date(this.groupe.dateEffet).getTime()) {
        form.value = new Date(this.groupe.dateEffet);
        this.showToast("error", "INFORMATION", "la date effet ne doit pas etre inferieur à celle du groupe");
        return;
      }
    }
    console.log(event);
  }

  onRowEditSave(plafondFamilleActe: PlafondFamilleActe, ri) {
    if(plafondFamilleActe.dateEffet) {
      if (new Date(plafondFamilleActe.dateEffet).getTime() < new Date(this.groupe.dateEffet).getTime()) {
        this.plafondFamilleActe[ri].dateEffet = new Date(this.groupe.dateEffet);
        this.showToast("error", "INFORMATION", "la date effet ne doit pas etre inferieur à celle du groupe");
        return;
      }
    }
    delete this.clonedPlafondFamilleActe["0"];
  }

  onRowEditCancel(plafondFamilleActe: PlafondFamilleActe, index: number) {
    this.plafondFamilleActe[index] =this.clonedPlafondFamilleActe["0"];
    delete this.clonedPlafondFamilleActe["0"];

  }

  onRowEditInitAdherentFamille(adherentFamille: Adherent, index: number) {
    this.clonedAdherentFamille[index] = { ...adherentFamille };
  }

  onRowEditSaveAdherentFamille(adherentFamille: Adherent, index: number) {
    this.controleDateNaissanceEnfant(adherentFamille);
    delete this.clonedPlafondFamilleActe[index];
  }

  controleDateNaissanceEnfant(adherentFamille: Adherent) {
    if(adherentFamille.qualiteAssure?.code === 'ENFANT') {
      if(this.adherentForm.value.dateNaissance > adherentFamille.dateNaissance){
        this.showToast("error", "INFORMATION", "la date de naissance de l'enfant ne doit pas etre supérieur à celle du père/mère");
        adherentFamille.dateNaissance = null;
      }
    }
  }

  onRowEditCancelAdherentFamille(adherentFamille: Adherent, index: number) {
    this.adherentFamilleList[index] = this.clonedAdherentFamille[index];
    delete this.clonedAdherentFamille[index];
  }

  deleteRow(adherentFamille: Adherent, index: number) {
    this.adherentFamilleList.splice(index);
  }

  onRowEditInitPlafondActe(plafondActe: PlafondActe) {
    this.clonedPlafondActe[plafondActe.acte.id] = { ...plafondActe };
  }

  /** save plafondActe */
  onRowEditSavePlafondActe(plafondActe: PlafondActe, ri) {
    if(plafondActe.dateEffet) {
      if (new Date(plafondActe.dateEffet).getTime() < new Date(this.groupe.dateEffet).getTime()) {
        this.plafondActe[ri].dateEffet = new Date(this.groupe.dateEffet);
        this.showToast("error", "INFORMATION", "la date effet ne doit pas etre inferieur à celle du groupe");
        return;
      }
    }
    delete this.clonedPlafondActe[plafondActe.acte.id];
  }

  onRowEditCancelPlafondActe(plafondActe: PlafondActe, index: number) {
    this.plafondActe[index] = this.clonedPlafondActe[plafondActe.acte.id];
    delete this.clonedPlafondActe[plafondActe.acte.id];
  }


  onRowEditInitPlafondConfiguration(plafond: PlafondFamilleActe) {
   
    this.clonedPlafondConfiguration[plafond.garantie.id] = {...plafond};
    console.log(this.clonedPlafondConfiguration);
  }

  onRowEditSavePlafondConfiguration(plafond: PlafondFamilleActe) {
    if (new Date(plafond.dateEffet).getTime() > new Date(this.groupe.dateEffet).getTime()) {
      // this.plafondActe[this.indexActeExpand].listeSousActe[ri].dateEffet = new Date(this.groupe.dateEffet);
       this.showToast("error", "INFORMATION", "la date effet ne doit pas etre supérieur à celle du groupe");
       plafond.dateEffet =   this.groupe.dateEffet;
       delete this.clonedPlafondConfiguration[plafond.garantie.id];
     }
    
   
  }

  onRowEditCancelPlafondConfiguration(plafond: PlafondFamilleActe, index: number) {
    this.plafondActuelleConfiguration[index] = this.clonedPlafondConfiguration[plafond.garantie.id];
    delete this.clonedPlafondConfiguration[plafond.garantie.id];
  }

  onRowEditInitPlafondConfigurationActe(plafond: PlafondActe) {
    this.clonedPlafondConfiguration[plafond.acte.id] = {...plafond};
    console.log(this.clonedPlafondConfiguration);
  }

  onRowEditSavePlafondConfigurationActe(plafond: PlafondActe) {
    if (new Date(plafond.dateEffet).getTime() >  new Date(this.groupe.dateEffet).getTime()) {
      // this.plafondActe[this.indexActeExpand].listeSousActe[ri].dateEffet = new Date(this.groupe.dateEffet);
       this.showToast("error", "INFORMATION", "la date effet ne doit pas etre superieur à celle du groupe");
       plafond.dateEffet =   this.groupe.dateEffet;
       delete this.clonedPlafondConfiguration[plafond.acte.id];
     }
    
  }

  onRowEditCancelPlafondConfigurationActe(plafond: PlafondActe, index: number, indexGarantie: any) {
    console.log(indexGarantie);
    //this.plafondActuelleConfiguration[indexGarantie].listeActe[index] = this.clonedPlafondConfiguration[plafond.acte.id];
    //delete this.clonedPlafondConfiguration[plafond.acte.id];
  }

  onRowEditInitPlafondConfigurationSousActe(plafond: PlafondSousActe) {
    this.clonedPlafondSousActe[plafond.sousActe.id] = {...plafond};
    console.log(this.clonedPlafondSousActe);
  }

  onRowEditSavePlafondConfigurationSousActe(plafond: PlafondSousActe) {

    if (new Date(plafond.dateEffet).getTime() > new Date(this.groupe.dateEffet).getTime()) {
     // this.plafondActe[this.indexActeExpand].listeSousActe[ri].dateEffet = new Date(this.groupe.dateEffet);
      this.showToast("error", "INFORMATION", "la date effet ne doit pas etre supérieur à celle du groupe");
      plafond.dateEffet =   this.groupe.dateEffet;
    }
    delete this.clonedPlafondSousActe[plafond.sousActe.id];
  }

  onRowEditCancelPlafondConfigurationSousActe(plafond: PlafondSousActe, index: number, indexGarantie: number) {
    //console.log(indexGarantie);
    //this.plafondActuelleConfiguration[indexGarantie].listeActe[index] = this.clonedPlafondConfiguration[plafond.acte.id];
    //delete this.clonedPlafondConfiguration[plafond.acte.id];
  }

  onRowEditInitPlafondSousActe(plafondSousActe: PlafondSousActe) {
    this.clonedPlafondSousActe[plafondSousActe.sousActe.id] = {
      ...plafondSousActe,
    };
  }

  onRowEditSavePlafondSousActe(plafondSousActe: PlafondSousActe, ri) {
    console.log('yes');
    console.log(this.indexActeExpand);
    console.log(ri);

    if(plafondSousActe.dateEffet) {
      if (new Date(plafondSousActe.dateEffet).getTime() < new Date(this.groupe.dateEffet).getTime()) {
        this.plafondActe[this.indexActeExpand].listeSousActe[ri].dateEffet = new Date(this.groupe.dateEffet);
        this.showToast("error", "INFORMATION", "la date effet ne doit pas etre inferieur à celle du groupe");
        return;
      }
    }
    delete this.clonedPlafondSousActe[plafondSousActe.sousActe.id];
  }

  onRowEditCancelPlafondSousActe(
    plafondSousActe: PlafondSousActe,
    index: number
  ) {
    this.plafondActe[this.indexActeExpand].listeSousActe[index]=
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
    
    this.police = {...police};
    console.log("===========" +police); 
    this.infosPolice = true;
    this.policeForm.get('arrondissement').setValue(this.arrondissementList.find(arrondi=> arrondi.id === police?.secteur?.idArrondissement));
    console.log(this.arrondissementList); 
const id = this.arrondissementList.find(arrondi=> arrondi.id === police?.secteur?.idArrondissement)?.idCommune;
    const departement = this.communeList.find(commun=> commun.id === id)?.idDepartement;
    console.log(departement);
    console.log();
    this.policeForm.get('commune').setValue(this.communeList.find(commun=> commun.id === id));
    this.policeForm.get('departement').setValue(this.departementList.find(depart=> depart.id === departement));
    this.policeForm.get('region').setValue(this.regionList.find(regio=> regio.id === this.departementList.find(depart=> depart.id === departement)?.idRegion));
    this.policeForm.get('pays').setValue(this.paysList.
      find(pay=> pay.id === this.policeForm.get('region').value?.idTypePays));
    this.policeForm.patchValue(this.police);
  }

  voirParametrage() {
  this.displayPrevisualiserParametrage = true;
  }

  saisiePrimePersonne() {
    console.log('le montant saisie de la prime par personne est' + this.plafondForm.get('plafondAnnuellePersonne').value);
    if (this.plafondForm.get('plafondAnnuellePersonne').value && this.plafondForm.get('plafondAnnuelleFamille').value){
      const plafondPersonne = removeBlanks(this.plafondForm.get('plafondAnnuellePersonne').value + '');
      const plafondFamille =  removeBlanks(this.plafondForm.get('plafondAnnuelleFamille').value + '');

      if (plafondPersonne > plafondFamille){
        this.valideMontantPlafond = false;
        this.showToast("error", "INFORMATION", "le montant plafond par personne ne doit pas etre superieur au plafond par famille");
    } else {
        this.valideMontantPlafond = true;
    }
  }
}

  saisiePrimeFamille() {
    console.log('le montant saisie de la prime par personne est' + this.plafondForm.get('plafondAnnuellePersonne').value);
    if (this.plafondForm.get('plafondAnnuellePersonne').value && this.plafondForm.get('plafondAnnuelleFamille').value){
      const plafondPersonne = removeBlanks(this.plafondForm.get('plafondAnnuellePersonne').value + '');
      const plafondFamille =  removeBlanks(this.plafondForm.get('plafondAnnuelleFamille').value + '');

      if (plafondPersonne > plafondFamille) {
        this.valideMontantPlafond = false;
        this.showToast("error", "INFORMATION", "le montant plafond par personne ne doit pas etre superieur au plafond par famille");
    } else {
        this.valideMontantPlafond = true;
    }
  }
  }

  /** verifier la date Effet du groupe avec celle de la police */
  checkDateEffet(): void {
    this.historiqueAvenantService.compareDate(this.groupeForm.get('dateEffet').value, this.police.dateEffet).subscribe(
        (res) => {
          if (res) {
            this.addMessage('error', 'Date d\'effet invalide',
                'La date d\'effet du groupe ne peut pas être postérieure à celle de la police');
            this.groupeForm.patchValue({dateEffet: null});
          }
        }
    );
  }

  addMessage(severite: string, resume: string, detaile: string): void {
    this.messageService.add({severity: severite, summary: resume, detail: detaile});
  }

  appliquerConfiguration() {
    this.confirmationService.confirm({
      message: 'Etes vous sur de vouloir appliquer le barème?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
       /* this.plafondActuelleConfiguration.forEach(plafond=>{
          plafond.dateEffet = this.groupe.dateEffet;
          plafond.listeActe.forEach(act=>{
            act.dateEffet = this.groupe.dateEffet;
            act.listeSousActe.forEach(souAct=>{
              souAct.dateEffet = this.groupe.dateEffet;
            })
          });
        });*/
        this.plafondFamilleActeConstruct = this.plafondActuelleConfiguration;
        this.bareme = null
        this.displayConfigurationPlafond = false;
        this.plafondActuelleConfiguration = [];
      }
    });
    
  }

  /**permet de valider le plafond */
  validerPlafond() {
    this.plafond = this.plafondForm.value;
    this.plafond.plafondAnnuelleFamille = removeBlanks(this.plafond.plafondAnnuelleFamille + '');
    this.plafond.plafondAnnuellePersonne = removeBlanks(this.plafond.plafondAnnuellePersonne + '');
    this.plafond.plafondGlobalInternationnal = removeBlanks(this.plafond.plafondGlobalInternationnal + '');
    this.plafond.plafondGlobalEvacuationSanitaire = removeBlanks(this.plafond.plafondGlobalEvacuationSanitaire + '');

    for (var i = 0; i < this.plafondFamilleActeConstruct.length; i++){
      this.plafondFamilleActeConstruct[i].montantPlafond = removeBlanks(this.plafondFamilleActeConstruct[i].montantPlafond + '');
      for (var j = 0; j < this.plafondFamilleActeConstruct[i].listeActe.length; j++){
        this.plafondFamilleActeConstruct[i].listeActe[j].montantPlafond = removeBlanks(this.plafondFamilleActeConstruct[i].listeActe[j].montantPlafond + '');
        for (var k = 0; k < this.plafondFamilleActeConstruct[i].listeActe[j].listeSousActe.length; k++){
          this.plafondFamilleActeConstruct[i].listeActe[j].listeSousActe[k].montantPlafond =  removeBlanks(this.plafondFamilleActeConstruct[i].listeActe[j].listeSousActe[k].montantPlafond + '');
          this.plafondFamilleActeConstruct[i].listeActe[j].listeSousActe[k].montantPlafondParActe =  removeBlanks(this.plafondFamilleActeConstruct[i].listeActe[j].listeSousActe[k].montantPlafondParActe + '');
        }
      }
    }
    this.plafond.plafondFamilleActe = this.plafondFamilleActeConstruct;
    this.plafond.groupe = this.groupe;
    console.log(this.plafond);


    this.store.dispatch(featureActionsPlafond.createPlafond(this.plafond));
    this.plafondFamilleActe = [{garantie: {}}];
    this.plafondActe = [];
    this.plafondFamilleActeConstruct = [];
    this.plafondForm.reset();
    this.countfamilleActe = 0;
    
   
   
      this.displayParametragePlafond = false;
    
  }

  addSousActe() {
  this.plafondActe[this.indexeActe].listeSousActe = this.plafondSousActe;
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
    for ( var i = 0; i < this.plafondFamilleActeConstruct.length; i++){
      /** verifier si la garantie existe deja, juste le modifier */
      if (this.plafondFamilleActeConstruct[i].garantie.id === rowData.garantie.id) {
        console.log('oui');
        this.clonedPlafondFamilleActeTemp[rowData.garantie.id] = { ...rowData };
        this.plafondFamilleActeTemp = this.clonedPlafondFamilleActeTemp[rowData.garantie.id];
        this.plafondFamilleActeTemp.listeActe = this.plafondActe;
        console.log(i);
        /** enregistrer */
        this.plafondFamilleActeConstruct[i] = this.plafondFamilleActeTemp;
        delete this.clonedPlafondFamilleActeTemp[rowData.garantie.id];
        return;
        }
    }

    /** si la garantie n'est pas encore ajouté, ajouter */
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
  },
  });
  }


  /**obtenir les sous actes pour un acte donné */
  getSousActe(rowData, ri){
    this.plafondSousActe = [];
    if (!rowData.listeSousActe){

    this.sousActeList.forEach((elements) => {
      console.log(rowData);
      if (elements.idTypeActe === rowData.acte.id){
         this.plafondSousActe.push({sousActe: elements,
          taux: this.police.taux, dateEffet: new Date(this.police.dateEffet), montantPlafond: rowData.montantPlafond});
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
  this.plafondSousActe = [];
  this.displayActe = true;
  /*
  if(this.plafondFamilleActeConstruct.length!=0) {

      this.plafondFamilleActeConstruct.forEach((element,index)=>{
        element.listeActe.forEach(e=>{
          if(e.acte.idTypeGarantie === garantie.value.id){
            this.plafondActe.push(e);
          }
          })
      });
      console.log(this.plafondFamilleActeConstruct);
  }
  */

  if (this.plafondActe.length === 0){
   //this.plafondActe = this.acteList.filter(element=>element.idTypeGarantie === garantie.value.id);

    //this.acteList.forEach((element)=>{

      //if (element.idTypeGarantie === garantie.value.id) {
        //this.plafondActe.push({acte:element, taux: this.police.taux, dateEffet: new Date(this.police.dateEffet)});
      //}});
    for (var j = 0; j < this.acteList.length; j++){

    if (this.acteList[j].idTypeGarantie === garantie.value.id) {
      this.plafondSousActe = [];
      // recuperer les sous actes de l'acte
      for (var i = 0; i < this.sousActeList.length; i++){
        if (this.sousActeList[i].idTypeActe === this.acteList[j].id) {
          this.plafondSousActe.push({id: this.sousActeList[i].id, sousActe: this.sousActeList[i], taux: this.police.taux, dateEffet: new Date(this.groupe.dateEffet), montantPlafond: 0, montantPlafondParActe: 0});
        }
      }
      this.plafondActe.push({id: this.acteList[j].id, acte: this.acteList[j], taux: this.police.taux, dateEffet: new Date(this.groupe.dateEffet), listeSousActe: this.plafondSousActe});
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

  validerPolice(police: Police){
    this.confirmationService.confirm({
      message: 'Etes vous sur de vouloir valider la police?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(featureAction.validerPolice(police));
      },
    });
  }

  cloturePolice(police: Police) {
    this.confirmationService.confirm({
      message: 'Etes vous sur de vouloir clôturer la police?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(featureAction.cloturePolice(police));
      },
    });
  }

  voirPhotos(ad:Adherent) {
    //this.pictureUrl ='http://178.170.40.93/images/logo-vimso.jpg';
    console.log(ad.urlPhoto);
    this.pictureUrl =ad.urlPhoto;
    this.displayPhotos = true;
  }

  onBasicUpload(event, form) {
    if(!this.adherentChecked){
      this.showToast("error", "INFORMATION", "Veuillez selectionner la photo de l'adherent");
   } else {
    this.confirmationService.confirm({
      message: 'Etes vous sur d\'importer la photos de l\'adherent',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        console.log(event.files[0]);
        this.store.dispatch(featureActionAdherent.importPhotosAdherent({file:event.files[0], idAdherent:this.adherentChecked.id, idGroupe: this.groupe.id}));
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

  onRowSelect(event) {
    this.adherentChecked = event.data;
  }

  onSelectDateEffetPlafond(event){
    console.log('yes');
    console.log(event);
    /*
    if (new Date(this.groupeForm.get('dateEffet').value).getTime() < new Date(this.police.dateEffet).getTime()){
      this.valideDateEffet = false;
      this.showToast("error", "INFORMATION", "la date effet du groupe doit etre superieure à celle de la police");
    } else {
      this.valideDateEffet = true;
    }
    */

  }

  quitterParametragePlafond(){
    this.confirmationService.confirm({
      message: 'Etes vous sur de vouloir quitter?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.groupeForm.reset();
        this.displayParametragePlafond = false;
        console.log('saisie');
      },
    });
  }

  quiterGroupe(){

    this.confirmationService.confirm({
      message: 'Etes vous sur de vouloir quitter?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.groupeForm.reset();
        this.displayDialogFormAddGroupe = false;

      },
    });

  }

  annulerSaisie(){
    this.confirmationService.confirm({
      message: 'Etes vous sur de vouloir quitter?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.displayDialogFormAddAdherent = false;
        this.adherentForm.reset();
        this.policeForm.reset();
        this.primeForm.reset();
        this.groupeForm.reset();
        this.displayDialogFormAddGroupe = false;
        this.displayDialogFormPolice = false;
        this.displayParametragePlafond = false;
        this.isEnreg = false;
        console.log('saisie');
      },
    });


  }

  editGroupe(groupe: Groupe) {
    console.log(groupe);
    this.isgroupEditing = true;
    this.setGroupeAndPrime(groupe, groupe.prime);
    this.newGroupe = groupe;
    this.newPrime = this.primeForm.value;
    this.obj = {
      group: groupe,
      prime: groupe.prime
    };
    console.log('........obj 1..........');
    console.log(this.obj);
    this.displayGroupForm = true;
  }

  createPlafond(): void {
    const plafond: Plafond = {};
    this.displayGroupForm = false;
    console.log('..................' + plafond);
  }

  groupeAdd(group) {
    console.log('.........group.........');
    console.log(group);
  }

  getObjt(): any {
    return {
      groupe: this.newGroupe,
      prime: this.newPrime
    };
  }

  setGroupeAndPrime(grp: Groupe, prm: Prime): void {
    this.groupeForm.patchValue({
      id: grp?.id,
      libelle: grp?.libelle,
      taux: grp?.taux,
      territorialite: grp.territorialite,
      duree: grp.duree,
      dateEffet: grp.dateEffet,
      typeDuree: {},
      dateEcheance: grp.dateEcheance,
      adresse: grp.adresse,
      commune: grp.commune,
      description: grp.description
    });

    this.primeForm.patchValue({
      prime: grp.typePrime,
      primeEmploye: prm?.primeEmploye,
      primeConjoint: prm?.primeConjoint,
      primeEnfant: prm?.primeEnfant,
      primeFamille: prm?.primeFamille,
      primeAdulte: prm?.primeAdulte,
      // primePersonne: prm?.primePersonne,
      primeAnnuelle: null
    });
    this.selectedTypePrime = grp.typePrime;
    this.displayDialogFormAddGroupe = true;
    console.log(this.groupeForm);
    console.log(this.primeForm);
  }

  saveNewGroupe(): void {
    console.log('prime === ');
    console.log(this.groupeForm.value);
    const groupe1: Groupe = this.groupeForm.value;
    groupe1.prime = this.primeForm.value;
    groupe1.groupeId = this.newGroupe.id;
    groupe1.typePrime = this.primeForm.get('prime').value;
    groupe1.police = this.newGroupe.police;
    if (groupe1.prime.primeAdulte) {
      groupe1.prime.primeAdulte = removeBlanks(groupe1.prime.primeAdulte + '');
    }
    if (groupe1.prime.primeAnnuelle) {
      groupe1.prime.primeAnnuelle = removeBlanks(groupe1.prime.primeAnnuelle + '');
    }
    if (groupe1.prime.primeConjoint) {
      groupe1.prime.primeConjoint = removeBlanks(groupe1.prime.primeConjoint + '');
    }
    if (groupe1.prime.primeEmploye) {
      groupe1.prime.primeEmploye = removeBlanks(groupe1.prime.primeEmploye + '');
    }
    if (groupe1.prime.primeEnfant) {
      groupe1.prime.primeEnfant = removeBlanks(groupe1.prime.primeEnfant + '');
    }
    if (groupe1.prime.primeFamille) {
      groupe1.prime.primeFamille = removeBlanks(groupe1.prime.primeFamille + '');
    }
    console.log(this.newGroupe);
    this.store.dispatch(featureActionGroupe.updateGroupe(groupe1));
    this.displayDialogFormAddGroupe = false;
    this.primeForm.reset();
    this.groupeForm.reset();
  }

  loadActualList(): void {
    this.adherentList$ = this.store.pipe(select(adherantSelector.adherentList));
    this.store.dispatch(featureActionAdherent.loadAdherent({idGroupe: this.groupe.id}));
    this.adherentList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.assurerListe = value.slice();
      }
    });
  }

  setAdherentPrincipal(adherent: Adherent): void {
    console.log('***************adherent*******************', adherent);
    this.adherentForm.patchValue({
      id: adherent?.id || null,
      nom: adherent?.nom,
      prenom: adherent?.prenom,
      dateNaissance: new Date(adherent?.dateNaissance),
      matriculeGarant: adherent?.matriculeGarant,
      matriculeSouscripteur: adherent?.matriculeSouscripteur,
      lieuNaissance: adherent?.lieuNaissance,
      numeroTelephone: adherent?.numeroTelephone,
      adresse: adherent?.adresse,
      adresseEmail: adherent?.adresseEmail,
      profession: adherent?.profession,
      referenceBancaire: adherent?.referenceBancaire,
      qualiteAssure: adherent?.qualiteAssure,
      genre: adherent?.genre,
      dateEntree: new Date(adherent?.dateEntree),
      numero: adherent.numero
    });
    console.log('***************this.adherentForm*******************', this.adherentForm);
  }

  loadAdherentPrincipalByGroupe(groupe: Groupe) {
    this.adherentService.getAdherentPrincipauxByGroupe(this.groupe.id).subscribe(
        (res) => {
          this.adherentPrincipaux = res;
          console.log('*****************************************', this.adherentPrincipaux);
        }
    );
  }

  loadAdherentPrincipalInfo() {
    console.log(this.adherentSelected);
    this.obj.group = this.adherentSelected;
    this.adherentPrincipaux1 = this.adherentPrincipauxTMP.filter(a => a.id === this.adherentSelected.id);
    console.log('*************this.adherentSelected*************', this.adherentSelected);
    /*this.genre = this.genreList.filter(value => value.id === this.adherentSelected.genre.id);
    console.log('*************this.genre*************', this.genre);*/
    this.setAdherentPrincipal(this.adherentSelected);
  }

  getAdherentFiles(event: any): void {
    console.log(event);
    this.FamilyListToImport = [];
    this.adherentFamille = [];
    this.afficheDetail = false;
    this.policeService.loadAdherentsByExcelFile(event).subscribe(
        (res) => {
          console.log('liste des adhérents === ');
          console.log(res);
          /* res.forEach(adherentFamille => {
            console.log(adherentFamille.adherent.profession);
            console.log(adherentFamille.famille);
            if (!adherentFamille.adherent && adherentFamille.adherent.profession === '') {
              adherentFamille.adherent.profession = {};
            }
            if (adherentFamille.famille) {
              adherentFamille.famille.forEach(adFam => {
                if (adFam.profession === '') {
                  adFam.profession = {};
                }
              });
            }
          }); */
          this.FamilyListToImport = res;
          this.adherentFamille = res;
          this.afficheDetail = true;
        }
    );
  }

  // methode pour exportr un model pour l'import des adhérents
  exportModel(): void {
    // this.historiqueAvenantService.exportExcelModel(TypeHistoriqueAvenant.AFAIRE_NOUVELLE).subscribe(
    this.historiqueAvenantService.getModel(TypeHistoriqueAvenant.AFAIRE_NOUVELLE).subscribe(
        (res) => {
          const file = new Blob([res], {type: 'application/vnd.ms-excel'});
          const  fileUrl = URL.createObjectURL(file);
          window.open(fileUrl);

          // const blob = new Blob([res], { type: 'application/vnd.ms-excel' });
          // const url = window.URL.createObjectURL(blob);
          // window.open(url);
        }
    );
  }

  deleteGroupe(groupe): void {
    this.store.dispatch(featureActionGroupe.deleteGroupe(groupe));
  }

  loadAllPolice(): void {
    this.policeList$ = this.store.pipe(select(policeList));
    this.store.dispatch(loadPolice());
    this.policeList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.loading = false;
        this.policeList = value.slice();
        console.log('+++++++++++this.policeList+++++++++++++');
        console.log(this.policeList);
      }
    });
  }

  // calcule des dates d'échéance pour la police
  getDateEcheance(): void {
    console.log('+++++++++++durée+++++++++++' + this.policeForm.get('duree').value);
    if (this.policeForm.get('dateEffet').value !== null && this.policeForm.get('typeDuree').value !== null
        && this.policeForm.get('duree').value !== null && this.policeForm.get('duree').value !== '') {
      this.historiqueAvenantService.getDateFin(this.policeForm.get('dateEffet').value,
          this.policeForm.get('typeDuree').value, this.policeForm.get('duree').value)
          .subscribe((res) => {
            this.policeForm.patchValue({dateEcheance: new Date(res.body)});
            console.log('date fin = ' + this.policeForm.get('dateEcheance').value);
          });
    }
  }

  // calcule des dates d'échéance pour la police
  getDateEcheanceGroupe(): void {
    console.log('+++++++++++durée+++++++++++' + this.groupeForm.get('duree').value);
    if (this.groupeForm.get('dateEffet').value !== null && this.groupeForm.get('typeDuree').value !== null
        && this.groupeForm.get('duree').value !== null && this.groupeForm.get('duree').value !== '') {
      this.historiqueAvenantService.getDateFin(this.groupeForm.get('dateEffet').value,
          this.groupeForm.get('typeDuree').value, this.groupeForm.get('duree').value)
          .subscribe((res) => {
            this.groupeForm.patchValue({dateEcheance: new Date(res.body)});
            console.log('date fin = ' + this.groupeForm.get('dateEcheance').value);
          });
    }
  }

  // compare la date de naissance de l'enfant à celui du père
  compareEnfantDateNaiss(rowData) {
    this.historiqueAvenantService.compareDate(rowData.dateNaissance, this.adherentForm.get('dateNaissance').value).subscribe(
        (res) => {
          if (res) {
            this.addMessage('error', 'Date de naissance invalide',
                'La date de naissance de l\'enfant ne peut pas être antérieure à celle de l\'adhérent');
            rowData.dateNaissance = null;
          }
        }
    );
  }

  // compare la date de naissance de l'enfant à celui du père
  compareEnfantDateNaissAddAherentToGroupe(rowData) {
    console.log('start .......');
    if (rowData.qualiteAssure.code === 'ENFANT') {
      this.historiqueAvenantService.compareDate(rowData.dateNaissance, this.adherentForm.get('dateNaissance').value).subscribe(
          (res) => {
            if (res) {
              this.addMessage('error', 'Date de naissance invalide',
                  'La date de naissance de l\'enfant ne peut pas être antérieure à celle de l\'adhérent');
              rowData.dateNaissance = null;
            }
          }
      );
    }
  }
  // compare la date d'entrée de l'enfant à celle du père ou de la mère
  compareEnfantDateEntreAddAherentToGroupe(rowData) {
    console.log('start ....1...');
    if (rowData.qualiteAssure.code === 'ENFANT') {
      this.historiqueAvenantService.compareDate(rowData.dateEntree, this.adherentForm.get('dateEntree').value).subscribe(
          (res) => {
            if (res) {
              this.addMessage('error', 'Date d\'entrée invalide',
                  'La date d\'entrée de l\'enfant ne peut pas être antérieure à celle de l\'adhérent');
              rowData.dateEntree = null;
            }
          }
      );
    }
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


  loadPlafondByGroupe(groupe: Groupe): void {
    this.plafondService.getPlafondGroupeFamilleActeByGroupe(groupe.id).subscribe(
            (res) => {
              this.avenantModif1.plafondFamilleActes = res.body;
              if(this.avenantModif1.plafondFamilleActes) {
                this.avenantModif1.plafondFamilleActes.forEach(pla=>{
                  pla.dateEffet = groupe.dateEffet;
                  if(pla.listeActe) {
                    pla.listeActe.forEach(act=>{

                      act.dateEffet = groupe.dateEffet;
                      if(act.listeSousActe) {
                        act.listeSousActe.forEach(sou=>{
                          sou.dateEffet = groupe.dateEffet;
                        });
                      }
                    });
                  }
                });
              }
              console.log('******plafondFamilleActes*******', this.avenantModif1.plafondFamilleActes)
            }
    );
    /* this.plafondService.getPlafondGroupeActeByGroupe(groupe.id).subscribe(
      (rest) => {
        this.avenantModif.plafondGroupeActes = rest.body;
      
  
      }
  ); */
  
}

getStatistique(police: Police): void {
  console.log('get statistique police ....start...');
  this.policeService.rapportPolice(police).subscribe(
    (res) => {
      this.stat = res;
      // this.viewStat = true;
      console.log('get statistique police ....end...', res);
    }
  );
}
}
