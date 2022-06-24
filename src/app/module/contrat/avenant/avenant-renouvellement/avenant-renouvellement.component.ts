import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Police} from '../../../../store/contrat/police/model';
import {Exercice} from '../../../../store/contrat/exercice/model';
import {select, Store} from '@ngrx/store';

import {takeUntil} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import * as groupeSlector from '../../../../store/contrat/groupe/selector';
import {groupeList} from '../../../../store/contrat/groupe/selector';
import {Groupe} from '../../../../store/contrat/groupe/model';
import {AppState} from '../../../../store/app.state';
import {ConfirmationService, MessageService} from 'primeng/api';
import {loadGroupe} from '../../../../store/contrat/groupe/actions';
import {Adherent, AdherentFamille} from '../../../../store/contrat/adherent/model';
import * as featureActionAdherent from '../../../../store/contrat/adherent/actions';
import * as loadListeActualisee from '../../../../store/contrat/adherent/actions';
import {
    Avenant,
    HistoriqueAvenant,
    HistoriqueAvenantAdherant,
    HistoriqueGroupe,
    TypeDemandeur,
    TypeHistoriqueAvenant,
    VerifyRenouvellementIsOverlapReponse
} from '../../../../store/contrat/historiqueAvenant/model';
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
import {HistoriqueAvenantAdherentService} from '../../../../store/contrat/historiqueAvenantAdherent/service';
import {PlafondService} from '../../../../store/contrat/plafond/service';
import {TypeBareme} from '../../../common/models/bareme.enum';
import {Status as Etat} from '../../../common/models/etat.enum';
import {QualiteAssure} from '../../../../store/parametrage/qualite-assure/model';
import * as qualiteAssureSelector from '../../../../store/parametrage/qualite-assure/selector';
import * as adherentSelector from '../../../../store/contrat/adherent/selector';
import {PoliceService} from '../../../../store/contrat/police/service';
import {ExerciceService} from '../../../../store/contrat/exercice/service';
import {removeBlanks} from '../../../util/common-util';
import {TypeDuree} from '../../../../store/contrat/enum/model';
import * as exerciceSelector from '../../../../store/contrat/exercice/selector';
import * as featureExerciceAction from '../../../../store/contrat/exercice/actions';
import * as featureActionHistoriqueAdherant from '../../../../store/contrat/historiqueAvenant/actions';
import * as historiqueAvenantSelector from '../../../../store/contrat/historiqueAvenant/selector';
import * as historiqueAvenantAction from '../../../../store/contrat/historiqueAvenant/actions';

@Component({
    selector: 'app-avenant-renouvellement',
    templateUrl: './avenant-renouvellement.component.html',
    styleUrls: ['./avenant-renouvellement.component.scss']
})
export class AvenantRenouvellementComponent implements OnInit {
    adherantList: Array<Adherent>;
    @Input() police: Police;
    groupe: Groupe;
    groupePolicy: any;
    adherantListTmp: Array<HistoriqueAvenantAdherant>;
    groupes: Array<Groupe>;
    groupeListes: Array<Groupe>;
    groupeList$: Observable<Array<Groupe>>;
    @Input() etat: string;
    @Input() avenantId: string;
    @Output() eventEmitterM = new EventEmitter();
    destroy$ = new Subject<boolean>();
    obj: any = {group: {}, prime: {}};
    historiqueAveantAdherants: HistoriqueAvenantAdherant[];
    historiqueAveantAdherantsTMP: HistoriqueAvenantAdherant[];
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
    adherantPoliceListActualisee: Array<Adherent>;
    adherantPoliceListActualisee$: Observable<Array<Adherent>>;
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
    objet: Avenant = {
        historiqueAvenantAdherantDels: [],
        historiqueAvenantAdherants: [],
        plafondGroupeActes: [],
        plafondFamilleActes: [],
        plafondGroupeSousActes: []
    };
    historiqueAvenant: HistoriqueAvenant = {historiqueAvenantAdherants: []};
    typeDuree = [{label: 'Jour', value: TypeDuree.JOUR}, {label: 'Mois', value: TypeDuree.MOIS}, {label: 'Année', value: TypeDuree.ANNEE}];
    adherentFamilleListe: AdherentFamille[] = [];
    myForm: FormGroup;
    typeDureeSelected = '';
    plafondFamilleActePlafongConfig: Array<PlafondFamilleActe> = [];
    plafondActePlafongConfig: Array<PlafondActe> = [];
    plafondSousActePlafongConfig: Array<PlafondSousActe> = [];
    groupePlafongConfig: Groupe = {};
    typeBareme =   Object.keys(TypeBareme).map(key => ({ label: TypeBareme[key], value: key }));
    typeEtat = Object.keys(Etat).map(key => ({ label: Etat[key], value: key }));
    qualiteAssureList: Array<QualiteAssure>;
    qualiteAssureList1: Array<QualiteAssure>;
    qualiteAssureList2: Array<QualiteAssure>;
    qualiteAssureList$: Observable<Array<QualiteAssure>>;
    demandeursList: any = [
        {libelle: 'VIMSO', value: TypeDemandeur.VIMSO},
        {libelle: 'SOUSCRIPTEUR', value: TypeDemandeur.SOUSCRIPTEUR},
        {libelle: 'GARANT', value: TypeDemandeur.GARANT}
    ];
    curentPolice: Police;
    exerciceForm: FormGroup;
    lastExerciceForm: FormGroup;
    private exercice: Exercice;
    adherentList$: Observable<Array<Adherent>>;
    adherentList: Array<Adherent>;
    displayDialogFormAdherent = false;
    historiqueGroupes: HistoriqueGroupe[] = [];
    numero: number;
    historiqueAveantAdherantList: HistoriqueAvenantAdherant[];
    exerciceList$: Observable<Array<Exercice>>;
    exerciceList: Array<Exercice>;
    curentExercice: Exercice = {};
    historiqueAvenants1: Array<HistoriqueAvenant>;
    historiqueAvenants1$: Observable<any>;
    historiqueAvenantList$: Observable<Array<HistoriqueAvenant>>;
    historiqueAvenantList: Array<HistoriqueAvenant>;
    exercice$: Observable<Exercice>;
    overlapVariable: boolean;
    isActif: boolean;

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
            territorialite: new FormControl('', [Validators.required]),
            duree: new FormControl('', [Validators.required]),
            dateEffet: new FormControl('', [Validators.required]),
            typeDuree: new FormControl('', [Validators.required]),
            // dateEcheance: new FormControl({value: '', disabled: true}, [Validators.required]),
            commune: new FormControl('', [Validators.required]),
            dateEcheance: new FormControl('', [Validators.required]),
            numeroGroupe: new FormControl('', [Validators.required]),
            typePrime: new FormControl('', [Validators.required]),
            adresse: new FormControl('', [Validators.required]),
            prime: new FormControl('', [Validators.required]),
            police: new FormControl('', [Validators.required]),
            // commune: new FormControl('', [Validators.required]),
            description: new FormControl('', [Validators.required]),
        });

        this.exerciceForm = this.formBuilder.group({
            id: new FormControl(null),
            debut: new FormControl('', [Validators.required]),
            fin: new FormControl('', [Validators.required]),
            actived: new FormControl(''),
            typeDuree: new FormControl('', [Validators.required]),
            duree: new FormControl('', [Validators.required]),
        });

        this.lastExerciceForm = this.formBuilder.group({
            id: new FormControl(null),
            debut: new FormControl('', [Validators.required]),
            fin: new FormControl('', [Validators.required]),
            actived: new FormControl('', [Validators.required]),
            typeDuree: new FormControl('', [Validators.required]),
            duree: new FormControl('', [Validators.required]),
        });

        this.primeForm = this.formBuilder.group({
            id: new FormControl(null),
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
            id: new FormControl(null),
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

        this.myForm = this.formBuilder.group({
            id: new FormControl(null),
            numeroGarant: new FormControl(null),
            dateAvenant: new FormControl(null, [Validators.required]),
            dateEffet: new FormControl(null, ),
            dateEcheance: new FormControl(null, ),
            observation: new FormControl(null, [Validators.required]),
            demandeur: new FormControl(null, [Validators.required]),
            fraisBadges: new FormControl(null, [Validators.required]),
            fraisAccessoires: new FormControl(null, [Validators.required]),
            dateSaisie: new FormControl(new Date()),
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
            plafondAnnuellePersonne: new FormControl('')
        });
    }

    ngOnInit(): void {
        // this.loadActivedExercice(this.police);
        // this.loadLastExercice(this.police);
        this.isActif = false;
        console.log('etat======>', this.etat);
        this.curentPolice = this.police;
        this.historiqueAveantAdherants = [];
        this.adherantListTmp = [];
        console.log('.............1................');
        console.log(this.police);
        this.groupeList$ = this.store.pipe(select(groupeSlector.groupeList));
        this.store.dispatch(loadGroupe({policeId: this.police.id}));
        this.groupeList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
            if (value) {
                this.groupeListes = value.slice();
                // console.log(this.groupeListes);
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
                // console.log(this.sousActeList);
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

        this.qualiteAssureList$ = this.store.pipe(select(qualiteAssureSelector.qualiteAssureList));
        this.qualiteAssureList$.pipe(takeUntil(this.destroy$))
            .subscribe((value) => {
                if (value) {
                    this.qualiteAssureList = value.slice();
                    this.qualiteAssureList1 = value.slice().filter(qa => qa.code === 'ADHERENT');
                    this.qualiteAssureList2 = value.slice().filter(e => e.code !== 'ADHERENT');
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

        this.historiqueAvenantService.getHistoriqueAvenantAdherantsByPolice(this.police.id).subscribe(
            (res) => {
                this.historiqueAveantAdherantsTMP = res;
            }
        );

        this.adherantPoliceListActualisee$ = this.store.pipe(select(adherentSelector.listeActualisee));
        this.store.dispatch(loadListeActualisee.loadListeActualisee({policeId: this.curentPolice.id}));
        this.adherantPoliceListActualisee$.pipe(takeUntil(this.destroy$))
            .subscribe((value1) => {
                if (value1) {
                    this.adherantPoliceListActualisee = value1.slice();
                    console.log('liste actualisée == ' + this.adherantPoliceListActualisee.length);
                }
            });

           //  this.loadExerciceByPolice(this.police);

        // this.loadListeActualisee();
        this.loadAdherantByPolice();
        this.addFamilleActe(this.police);
        if(this.etat !== 'CREATE') {
            this.updateAvenant(this.avenantId);
          }
        this.historiqueAvenantAdherentService.getHistoriqueAvenantAdherentByPoliceAndUnsuspend(this.police.id).subscribe(
            (res) => {
                console.log('..............RES..............   ', res);
                this.historiqueAveantAdherantList = res;
            }
        );

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

    addSousActe() {
        this.plafondActe[this.indexeActe].listeSousActe = this.plafondSousActe;
        console.log(this.plafondActe);
    }

    loadAherantByGroupe(): void {
        console.log(this.groupeSelected);
        this.obj.group = this.groupeSelected;
        this.historiqueAveantAdherants = this.adherantListTmp.filter(a => a.adherent.groupe.id === this.groupeSelected.id);
        this.setGroupeAndPrime(this.groupeSelected);
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
        // this.messageService.add({severity: 'success', summary: 'Success', detail: 'Adherant is updated'});
    }

    onRowEditCancel(product: HistoriqueAvenantAdherant, index: number) {
        this.products2[index] = this.clonedProducts[product.id];
        delete this.clonedProducts[product.id];
    }

    setGroupeAndPrime(group: Groupe): void {
        console.log('++++  group.prime ++++');
        console.log(group);
        this.groupeForm.setValue({
            id: group?.id || null,
            libelle: group?.libelle,
            taux: group?.taux,
            territorialite: group.territorialite || [],
            duree: group.duree,
            dateEffet: new Date(this.exercice.debut),
            // typeDuree: this.typeDuree.find(e => e.value === group.typeDuree),
            typeDuree: group?.typeDuree,
            dateEcheance: new Date(this.exercice.fin),
            numeroGroupe: group.numeroGroupe,
            typePrime: group?.typePrime,
            adresse: group?.adresse,
            prime: group?.prime,
            police: group?.police,
            commune: group?.commune,
            description: group?.description
        });
        /* this.groupeForm.patchValue({
            id: group?.id || null,
            libelle: group?.libelle,
            taux: group?.taux,
            territorialite: group.territorialite || [],
            duree: group.duree,
            dateEffet: new Date(group.dateEffet),
            typeDuree: {},
            dateEcheance: new Date(group.dateEcheance),
            numeroGroupe: group.numeroGroupe,
            typePrime: group?.prime.typePrime,
            adresse: group?.adresse,
            prime: group?.prime,
            police: group?.police,
            commune: group?.commune,
            description: group?.description
        }); */

        this.primeForm.patchValue({
            prime: group.typePrime,
            primeEmploye: group.prime?.primeEmploye,
            primeConjoint: group.prime?.primeConjoint,
            primeEnfant: group.prime?.primeEnfant,
            primeFamille: group.prime?.primeFamille,
            primeAdulte: group.prime?.primeAdulte,
            primePersonne: group.prime.primeEmploye,
            primeAnnuelle: group.prime?.primeAnnuelle,
        });
        this.selectedTypePrime = group.typePrime;
        console.log('++++---------  this.groupeForm.value ------++++');
        console.log(this.groupeForm.value);
        // this.selectedTypePrime = group.prime.typePrime;
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

    loadAdherantByPolice(): void {
        this.historiqueAvenantAdherentService.getHistoriqueAvenantAdherents(this.police.id).subscribe(
            (res) => {
                // this.adherantListTMP = res;
                this.adherantListTmp = res;
                this.historiqueAveantAdherants = res;
                console.log('log = ' + res.length);
                // this.addHistoriqueAvenantAdherant(this.adherantList);
            }
        );
    }

    setPlafondFamilleActe(): void {
        // this.plafondFamilleActe.push(this.groupeSelected.)
    }

    annuler(): void {
        this.historiqueAveantAdherants = [];
        this.plafondFamilleActe = [];
        this.acteList = [];
        this.sousActeList = [];
    }

    createAvenantModif(): void {
        this.plafondActe.forEach(pa => {
            pa.montantPlafond = removeBlanks(pa.montantPlafond + '');
            // parseInt(pa.montantPlafond.toString().replace(' ', ''), 10);
        });
        this.plafondFamilleActe.forEach(pa => {
            pa.montantPlafond = removeBlanks(pa.montantPlafond + '');
            // parseInt(pa.montantPlafond.toString().replace(' ', ''), 10);
        });
        this.plafondSousActe.forEach(pa => {
            pa.montantPlafond = removeBlanks(pa.montantPlafond + '');
            // parseInt(pa.montantPlafond.toString().replace(' ', ''), 10);
        });
        this.plafondFamilleActePlafongConfig.forEach(pfa => {
            if (pfa.montantPlafond) {
                pfa.montantPlafond = removeBlanks(pfa.montantPlafond + '');
                // parseInt(pfa.montantPlafond.toString().replace(' ', ''), 10);
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
                        pa.montantPlafond = removeBlanks(pa.montantPlafond + '');
                        // parseInt(pa.montantPlafond.toString().replace(' ', ''), 10);
                    }
                    if (pa.listeSousActe) {
                        pa.listeSousActe.forEach(psa => {
                            if (psa.nombre) {
                                psa.nombre = parseInt(psa.nombre.toString().replace(' ', ''), 10);
                            }
                            if (psa.montantPlafond) {
                                psa.montantPlafond = removeBlanks(psa.montantPlafond + '');
                                // parseInt(psa.montantPlafond.toString().replace(' ', ''), 10);
                            }
                        });
                    }
                });
            }
        });
        // this.objet.plafondGroupeActes = this.plafondActePlafongConfig;
        // this.objet.plafondFamilleActes = this.plafondFamilleActePlafongConfig;
        // this.objet.plafondGroupeSousActes = this.plafondSousActePlafongConfig;
        this.objet.police = this.police;
        // this.objet.historiqueAvenantAdherantDels = this.historiqueAvenant.historiqueAvenantAdherants;
        /* this.historiqueAvenant.historiqueAvenantAdherants.forEach(haa => {
            if (this.adherantListTmp.find(e => e.adherent.id === haa.adherent.id) !== null) {
                this.objet.historiqueAvenantAdherants.push(this.adherantListTmp.find(e => e.adherent.id === haa.adherent.id));
            }
        }); */
        // this.objet.historiqueAvenantAdherants = this.adherantListTmp;
        this.adherentFamilleListe.forEach(famille => {
            famille.adherent.groupe = this.groupeSelected;
            famille.famille.forEach(f => {
                f.groupe = this.groupeSelected;
            });
        });
        this.objet.familles = this.adherentFamilleListe;
        this.historiqueAvenant.dateEffet = this.myForm.get('dateEffet').value;
        //this.historiqueAvenant.id = this.numero; this.adherantPoliceListActualisee
        this.historiqueAvenant.dateAvenant = this.myForm.get('dateAvenant').value;
        this.historiqueAvenant.dateEcheance = this.myForm.get('dateEcheance').value;
        this.historiqueAvenant.exercice = this.exerciceForm.value;
        this.objet.exercice = this.exerciceForm.value;
        this.historiqueAvenant.typeHistoriqueAvenant = TypeHistoriqueAvenant.RENOUVELLEMENT;
        this.historiqueAvenant.observation = this.myForm.get('observation').value;
        this.historiqueAvenant.fraisBadges = this.myForm.get('fraisBadges').value;
        this.historiqueAvenant.fraisAccessoires = this.myForm.get('fraisAccessoires').value;
        this.historiqueAvenant.isTerminer = true;
        this.objet.historiqueAvenantAdherants = this.historiqueAveantAdherantList;
        this.objet.historiqueAvenantAdherants.forEach(haa => haa.id === null);
        this.objet.historiqueAvenantAdherantDels.forEach(haa => haa.id === null);
        this.objet.historiqueAvenant = this.historiqueAvenant;
        this.historiqueAvenant.dateSaisie = this.myForm.get('dateSaisie').value;
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
        this.objet.plafondFamilleActes = this.plafondFamilleActePlafongConfig;
        this.objet.groupes = this.groupeListes;
        /* this.objet.groupe = this.groupeForm.value;
        this.objet.groupe.prime = this.primeForm.value;
        this.objet.groupe.typePrime = this.primeForm.get('prime').value;
        this.objet.groupe.police = this.police;
        if (this.objet.groupe.prime.primeAdulte) {
            this.objet.groupe.prime.primeAdulte = removeBlanks(this.objet.groupe.prime.primeAdulte + '');
        }
        if (this.objet.groupe.prime.primeAnnuelle) {
            this.objet.groupe.prime.primeAnnuelle = removeBlanks(this.objet.groupe.prime.primeAnnuelle + '');
        }
        if (this.objet.groupe.prime.primeConjoint) {
            this.objet.groupe.prime.primeConjoint = removeBlanks(this.objet.groupe.prime.primeConjoint + '');
        }
        if (this.objet.groupe.prime.primeEmploye) {
            this.objet.groupe.prime.primeEmploye = removeBlanks(this.objet.groupe.prime.primeEmploye + '');
        }
        if (this.objet.groupe.prime.primeEnfant) {
            this.objet.groupe.prime.primeEnfant = removeBlanks(this.objet.groupe.prime.primeEnfant + '');
        }
        if (this.objet.groupe.prime.primeFamille) {
            this.objet.groupe.prime.primeFamille = removeBlanks(this.objet.groupe.prime.primeFamille + '');
        } */
        console.log('*********************aveanant*********************************');
        console.log(this.objet);
        console.log('*********************avenant.groupe.prime*********************************');
    
        this.eventEmitterM.emit(this.objet);
    }

    createAvenantInfo(): void {
        
        this.objet.police = this.police;
        this.historiqueAvenant.dateEffet = this.myForm.get('dateEffet').value;
        this.historiqueAvenant.dateAvenant = this.myForm.get('dateAvenant').value;
        this.historiqueAvenant.dateEcheance = this.myForm.get('dateEcheance').value;
        this.historiqueAvenant.exercice = this.exerciceForm.value;
        this.objet.exercice = this.exerciceForm.value;
        this.historiqueAvenant.typeHistoriqueAvenant = TypeHistoriqueAvenant.RENOUVELLEMENT;
        this.historiqueAvenant.observation = this.myForm.get('observation').value;
        this.historiqueAvenant.fraisBadges = this.myForm.get('fraisBadges').value;
        this.historiqueAvenant.fraisAccessoires = this.myForm.get('fraisAccessoires').value;
        this.historiqueAvenant.isTerminer = false;
        this.objet.historiqueAvenant = this.historiqueAvenant;
        this.historiqueAvenant.dateSaisie = this.myForm.get('dateSaisie').value;
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
        console.log('*********************aveanant*********************************');
        console.log(this.objet);
        console.log('*********************avenant.groupe.prime*********************************');
    
        this.eventEmitterM.emit(this.objet);
    }

    addAvenantAdherant(event: HistoriqueAvenant): void {
        if (event) {
            event.aderants.forEach(f => {
                this.adherentFamilleListe.push(f);
            });
            console.log('+++++++++++++');
            console.log(event);
        }
    }

    deleteAdherant(historiqueAvenant: HistoriqueAvenant) {
        console.log('********retour***********');
        console.log(historiqueAvenant);
        this.objet.historiqueAvenantAdherants = historiqueAvenant.historiqueAvenantAdherants.filter(
            haa => !haa.selected);
        this.objet.historiqueAvenantAdherantDels = historiqueAvenant.historiqueAvenantAdherants.filter(
            haa => haa.selected);
            console.log('********haa.selected***********', this.objet.historiqueAvenantAdherantDels);
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
    onRefreshDateEcheance(value: number) {
        this.policeForm
            .get('dateEcheance')
            .setValue(
                this.getNewDate(value)
            );
    }

    changePrime(event) {
        console.log("=====event=====>", event);
        this.selectedTypePrime = event.value;
        this.primeForm.get('prime').setValue(this.selectedTypePrime);
        this.primeForm.get('prime').setValue(this.selectedTypePrime.libelle);
        this.groupeForm.get('prime').setValue(this.selectedTypePrime.libelle);
        console.log("=====this.selectedTypePrime.libelle=====>", this.selectedTypePrime.libelle);
        console.log("=====this.groupeForm.get('prime').=====>", this.groupeForm.get('prime').value);
        this.primeForm.reset({});
    }

    compareDate(): void {
        this.historiqueAvenantService.compareDate(this.myForm.get('dateEffet').value, this.police.dateEffet).subscribe(
            (res) => {
                if (res) {
                    this.addMessage('error', 'Date d\'effet invalide',
                        'La date d\'effet de l\'avenant de peut pas être postérieure à celle de la police');
                    this.myForm.patchValue({dateEffet: null});
                }
            }
        );
    }

    addMessage(severite: string, resume: string, detaile: string): void {
        this.messageService.add({severity: severite, summary: resume, detail: detaile});
    }
    loadPlafondConfigBygroupe() {
        if (this.groupePlafongConfig) {
            this.plafondService.getPlafondGroupeFamilleActeByGroupe(this.groupePlafongConfig.id).subscribe(
                (res) => {
                    this.plafondFamilleActePlafongConfig = res.body;
                    console.log(res);
                }
            );
            /* this.plafondService.getPlafondGroupeActeByGroupe(this.groupePlafongConfig.id).subscribe(
                (res) => {
                    this.plafondActePlafongConfig = res.body;

                }
            );
            this.plafondService.getPlafondGroupeSousActeByGroupe(this.groupePlafongConfig.id).subscribe(
                (res) => {
                    this.plafondSousActePlafongConfig = res.body;
                    this.plafondFamilleActePlafongConfig.forEach(pfapc => {
                        pfapc.groupe = this.groupePlafongConfig;
                        this.plafondActePlafongConfig.forEach(papc => {
                            papc.listeSousActe = this.plafondSousActePlafongConfig.filter(e => e.plafondGroupeActe.id === papc.id);
                        });
                        pfapc.listeActe = this.plafondActePlafongConfig.filter(a => a.plafondGroupeFamilleActe.id === pfapc.id);
                    });
                }
            ); */
        }
    }
    changeTypeDuree(){
        console.log(this.exerciceForm.get('typeDuree').value);
        if (this.exerciceForm.get('debut').value && this.exerciceForm.get('typeDuree').value && this.exerciceForm.get('duree').value) {
            this.historiqueAvenantService.getDateFin(this.exerciceForm.get('debut').value, 
            this.exerciceForm.get('typeDuree').value.value, this.exerciceForm.get('duree').value ).subscribe(
              (res) => {
                this.exerciceForm.patchValue({
                  fin: new Date(res.body)
                });
              }
            );
        }
    }

    private loadActivedExercice(police: Police): void {
        if (police) {
            this.exerciceService.getActiveExerciceByPolice(police.id).subscribe(
                (res) => {
                    this.exercice = res;
                    if (this.exercice) {
                        this.historiqueAvenantService.getDebutAvenantRenouvellement(this.police.id).subscribe(
                            (response) => {
                                if (response.body) {
                                    console.log('date de début' + response);
                                    this.exercice = response.body;
                                    // this.exercice.debut = new Date(response.body);
                                    /* this.exerciceForm.patchValue({
                                        id: null,
                                        debut: new Date(this.exercice.debut),
                                        fin: new Date(this.exercice.fin),
                                        actived: this.exercice.actived,
                                        police: this.exercice.police
                                    }); */
                                    this.myForm.patchValue({
                                        dateAvenant: new Date(response.body.debut)
                                    });
                                }
                            }
                        );
                    }
                }
            );
        }
    }
    loadListeActualisee(): void {
        this.adherentService.getListeActualisee(this.police.id).subscribe(
            (res) => {
                this.adherantPoliceListActualisee = res;
            }
        );
    }

    // ADD FAMILLE ACTE
    addFA(): void {
        const plafondFamilleActe: PlafondFamilleActe = {};
        this.plafondFamilleActePlafongConfig.push(plafondFamilleActe);
    }
    onRowEditInitPlafondConfiguration(plafondFamilleActe: PlafondFamilleActe) {
        this.clonedPlafondFamilleActe[plafondFamilleActe.garantie?.id] = {
            ...plafondFamilleActe,
        };
    }

    onRowEditSavePlafondConfiguration(plafondFamilleActe: PlafondFamilleActe) {
        delete this.clonedPlafondFamilleActe[plafondFamilleActe.garantie.id];
    }

    onRowEditCancelPlafondConfiguration(plafondFamilleActe: PlafondFamilleActe, index: number) {
        this.plafondFamilleActe[index] =
            this.clonedPlafondFamilleActe[plafondFamilleActe.garantie.id];
        delete this.clonedPlafondFamilleActe[plafondFamilleActe.garantie.id];
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

      /* loadLastExercice(police: Police): void {
        if (police) {
            this.exercice$ = this.store.pipe(select(exerciceSelector.selectLastExercice));
            this.store.dispatch(featureExerciceAction.loadLastExercice({policeId: police.id}));
            this.exercice$.pipe(takeUntil(this.destroy$)).subscribe(
                (res) => {
                    this.exercice = res;
                    console.log('******this.exercice*******', this.exercice);
                    if (this.exercice) {
                        this.exerciceForm.patchValue({
                            debut: this.exercice.debut,
                            fin: this.exercice.fin,
                            // actived: this.exercice.actived,
                        });
                    }
                }
            );
        }
    } */
    
      onExerciceChange(): void {
        console.log('curent exo === ');
        console.log(this.curentExercice);
        //this.exercice = {...exercice}
        if (this.curentExercice && this.curentExercice.id !== '') {
          this.historiqueAvenants1$ = this.store.pipe(select(historiqueAvenantSelector.historiqueAvenantList));
          this.store.dispatch(featureActionHistoriqueAdherant.loadHistoriqueAvenantByExercice({exerciceId: this.curentExercice.id}));
          this.historiqueAvenants1$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
            if (value) {
              // this.loading = false;
              this.historiqueAvenants1 = value.slice();
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
            console.log(this.historiqueAvenantList.length);
          }
        });
         }
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

    appliquerPlafond() {
        this.objet.plafondFamilleActes = this.plafondFamilleActePlafongConfig;
    }

    findListeActualisee(police: Police): void {
        this.historiqueAvenantAdherentService.getListActualisee(police.id).subscribe(
            (res) => {
                console.log('----------------------------');
                console.log(res);
            }
        );
    }

    voirAdherent(groupe: Groupe): void {
        this.displayDialogFormAdherent = true;
        // this.groupe = groupe;
        this.adherentList$ = this.store.pipe(select(adherentSelector.adherentList));
        this.store.dispatch(featureActionAdherent.loadAdherent({idGroupe: groupe.id}));
        this.adherentList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
            if (value) {
                this.adherentList = value.slice();
            }
        });
    }

    annulerGroupe(): void {
        this.groupeForm.reset({});
        this.primeForm.reset({});
    }

    validerGroupe(): void {
        /* this.groupeListes.forEach(grp =>  {
            if (grp.id === this.groupeForm.get('id').value) {
                grp = this.groupeForm.value;
                switch (this.primeForm.get('prime').value) {
                    case 'PE':
                        this.primeForm.patchValue({
                            primeFamille: null,
                            primeEnfant: null,
                            primeConjoint: null,
                            primeAdulte: null
                        });
                        break;
                    case 'PAE':
                        this.primeForm.patchValue({
                            primeFamille: null,
                            primeConjoint: null,
                            primeEmploye: null
                        });
                        break;
                    case 'PECE':
                        this.primeForm.patchValue({
                            primeFamille: null,
                            primeAdulte: null
                        });
                        break;
                    default:
                        this.primeForm.patchValue({
                            primeFamille: null,
                            primeEnfant: null,
                            primeConjoint: null,
                            primeAdulte: null,
                            primeEmploye: null
                        });
                        break;
                }
                grp.typePrime = this.primeForm.get('prime').value;
                grp.prime = this.primeForm.value;
                console.log('actual prime is ====  ');
                console.log(this.primeForm.value);
                console.log('groupe array is ====  ');
                console.log(this.groupeForm);
            }
        });
        this.groupeForm.reset({}); */

        this.groupe = this.groupeForm.value;
    this.groupe.prime = this.primeForm.value;
    if (this.groupe?.prime?.primeAdulte){
      this.groupe.prime.primeAdulte = removeBlanks(this.groupe.prime.primeAdulte + '');
    }
    if (this.groupe?.prime?.primeConjoint){
      this.groupe.prime.primeConjoint = removeBlanks(this.groupe.prime.primeConjoint + '');
    }
    if (this.groupe?.prime?.primeEmploye){
      this.groupe.prime.primeEmploye = removeBlanks(this.groupe.prime.primeEmploye + '');
    }
    if (this.groupe?.prime?.primeEnfant){
      this.groupe.prime.primeEnfant = removeBlanks(this.groupe.prime.primeEnfant + '');
    }
    if ( this.groupe?.prime?.primeFamille){
      this.groupe.prime.primeFamille = removeBlanks(this.groupe.prime.primeFamille + '');
    }
    if ( this.groupe?.prime?.primePersonne){
      this.groupe.prime.primePersonne = removeBlanks(this.groupe.prime.primePersonne + '');
    }
    console.log('groupe array is ====  ', this.groupe);
    console.log('prime array is ====  ', this.groupe.prime);
    this.groupe.typePrime = this.selectedTypePrime;
    console.log('typePrime array is ====  ', this.groupe.typePrime);
    /* this.groupeListeFinale = this.groupeListeFinale.filter(g=> g.id !== this.groupe.id);
    this.groupeListeFinale.push(this.groupe);
    console.log('groupeListeFinal array is ====  ', this.groupeListeFinale); */
    // this.groupeForm.reset({});
    this.primeForm.reset({});


    }

    updateAvenant(avenantId: string): void {
        console.log(' avenantId ===== ' + avenantId);
        if (avenantId && avenantId !== undefined) {
            this.historiqueAvenantService.getsHistoriqueAvenantModifReview(avenantId).subscribe(
                (res: Avenant) => {
                  console.log('res ============ ');
                  console.log(res);
                  this.objet.groupes = res.groupes;
                  this.police = res.police;
                    this.historiqueGroupes = res.historiqueGroupes;
                    this.historiqueAveantAdherants = res.historiqueAvenantAdherants;
                    this.numero = res.historiqueAvenant.numeroGarant;
                    this.myForm.patchValue({
                        id: res.historiqueAvenant.id,
                        numeroGarant: res.historiqueAvenant.numeroGarant,
                        dateEffet: new Date(res.historiqueAvenant.dateAvenant),
                        dateAvenant: new Date(res.historiqueAvenant.dateAvenant),
                        observation: res.historiqueAvenant.observation,
                        demandeur: res.historiqueAvenant.typeDemandeur,
                        fraisBadges: res.historiqueAvenant.fraisBadges,
                        fraisAccessoires: res.historiqueAvenant.fraisAccessoires,
                        dateSaisie: new Date(res.historiqueAvenant.dateSaisie)
                      
                    });
                    this.objet.historiqueAvenant = res.historiqueAvenant;
                    this.exercice = res.historiqueAvenant.exercice;
                    this.exerciceForm.setValue({
                        id: res.historiqueAvenant.exercice.id,
                        debut: res.historiqueAvenant.exercice.debut,
                        fin: res.historiqueAvenant.exercice.fin,
                        actived: res.historiqueAvenant.exercice.actived,
                        // typeDuree: res.historiqueAvenant.exercice.typeDuree,
                        // duree: res.historiqueAvenant.exercice.duree,
                    });
                    this.exerciceForm.disable();
                    if (this.etat === 'VIEW') {
                      this.myForm.disable();
                      this.groupeForm.disable();
                      this.primeForm.disable();
                      this.groupeForm.disable();
                    }
                }
            );
            console.clear();
            console.log('OBJET ======== ', this.objet);
        }
    }

    getDateEcheance(): void {
        console.log('+++++++++++durée+++++++++++' + this.exerciceForm.get('duree').value);
        if (this.exerciceForm.get('debut').value !== null && this.exerciceForm.get('typeDuree').value !== null
            && this.exerciceForm.get('duree').value !== null && this.exerciceForm.get('duree').value !== '') {
          this.historiqueAvenantService.getDateFin(this.policeForm.get('debut').value,
              this.exerciceForm.get('typeDuree').value, this.exerciceForm.get('duree').value)
              .subscribe((res) => {
                this.exerciceForm.patchValue({dateEcheance: new Date(res.body)});
                console.log('date fin = ' + this.exerciceForm.get('fin').value);
              });
        }
      }

      changeTypeDureeGroupe(){
        // this.typeDureeSelected = this.groupeForm.get('typeDuree').value;
        console.log(this.typeDureeSelected);
        if (this.exerciceForm.get('typeDuree').value) {
          this.historiqueAvenantService.getDateFin(this.exerciceForm.get('debut').value, 
          this.exerciceForm.get('typeDuree').value, this.exerciceForm.get('duree').value ).subscribe(
            (res) => {
              this.exerciceForm.patchValue({
                fin: new Date(res.body)
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
      console.log(this.exerciceForm.get('duree').value);
      this.verifyIsOverlap();
      if (this.exerciceForm.get('duree').value) {
        this.historiqueAvenantService.getDateFin(this.exerciceForm.get('debut').value, 
        this.exerciceForm.get('typeDuree').value.value, this.exerciceForm.get('duree').value ).subscribe(
          (res) => {
            this.exerciceForm.patchValue({
              fin: new Date(res.body)
            });
          }
        );
      }
    }

    changeFamilleActeDate(plafondFamilleActe: PlafondFamilleActe): void {
        console.log('famille acte date effe change ==== ' + plafondFamilleActe.dateEffet);
        plafondFamilleActe.listeActe.forEach(plafondActe => {
            plafondActe.dateEffet = plafondFamilleActe.dateEffet;
            plafondActe.listeSousActe.forEach(sousActe => {
                sousActe.dateEffet = plafondFamilleActe.dateEffet;
            });
        });
    }

    changeFamilleActeTaux(plafondFamilleActe: PlafondFamilleActe): void {
        console.log('famille acte date effe change ==== ' + plafondFamilleActe.taux.taux);
        plafondFamilleActe.listeActe.forEach(plafondActe => {
            plafondActe.taux = plafondFamilleActe.taux;
            plafondActe.listeSousActe.forEach(sousActe => {
                sousActe.taux = plafondFamilleActe.taux;
            });
        });
    }

    verifyIsOverlap(){
         /* this.historiqueAvenants1$ = this.store.pipe(select(historiqueAvenantSelector.isOverlap));
          this.store.dispatch(featureActionHistoriqueAdherant.verifierRenouvellementNonChevauche({debut: this.exerciceForm.get('debut').value, 
          typeDuree: this.exerciceForm.get('typeDuree').value.value, duree: this.exerciceForm.get('duree').value, policeId: this.police.id}));
          this.historiqueAvenants1$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
            console.log('................StatusEnum............................', value);
            if (value) {
              // this.loading = false;
              this.overlapVariable = value;
              console.log('................overlapVariable............................');
              console.log(this.overlapVariable);
            }
          });
 */
          this.historiqueAvenantService.getVerifyIsOverlap(this.exerciceForm.get('debut').value, 
            this.exerciceForm.get('typeDuree').value.value, this.exerciceForm.get('duree').value, this.police.id ).subscribe(
          (res) => {
              const dataDuJour = new Date();
            this.overlapVariable = res.body;
            if(!this.overlapVariable) {
                    this.addMessage('error', 'Erreur sur la date de l\'exercice',
                        'Veuillez choisir une bonne date d\'effet de l\'exercice !!!');
                            this.exerciceForm.patchValue({debut: null});
                            this.exerciceForm.patchValue({typeDuree: null});
                            this.exerciceForm.patchValue({duree: null});
                            this.exerciceForm.patchValue({fin: null});
            }
          }
        );
    }

    onTabChange(event): void {
        var index = event.index;
        console.log('****index****', index);
      }
}
