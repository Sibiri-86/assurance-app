import {Component, EventEmitter, OnInit, Output, Input} from '@angular/core';
import {Adherent, AdherentFamille} from '../../../../store/contrat/adherent/model';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Groupe} from '../../../../store/contrat/groupe/model';
import {select, Store} from '@ngrx/store';
import * as typePrimeSelector from '../../../../store/parametrage/type-prime/selector';
import {Observable, Subject} from 'rxjs';
import {TypePrime} from '../../../../store/parametrage/type-prime/model';
import {AppState} from '../../../../store/app.state';
import {takeUntil} from 'rxjs/operators';
import {loadTypePrime} from '../../../../store/parametrage/type-prime/actions';
import * as tauxSelector from '../../../../store/parametrage/taux/selector';
import {loadTaux} from '../../../../store/parametrage/taux/actions';
import * as territorialiteSelector from '../../../../store/parametrage/territorialite/selector';
import {loadTerritorialite} from '../../../../store/parametrage/territorialite/actions';
import {Taux} from '../../../../store/parametrage/taux/model';
import {Territorialite} from '../../../../store/parametrage/territorialite/model';
import {EntityValidations} from '../../../common/models/validation';
import {PlafondActe, PlafondFamilleActe, PlafondSousActe} from '../../../../store/parametrage/plafond/model';
import {removeBlanks} from '../../../util/common-util';
import * as featureActionsPlafond from '../../../../store/contrat/plafond/action';
import {Police} from '../../../../store/contrat/police/model';
import {SecteurActivite} from '../../../../store/parametrage/secteur-activite/model';
import {DimensionPeriode} from '../../../../store/parametrage/dimension-periode/model';
import {Garantie} from '../../../../store/parametrage/garantie/model';
import * as featureActionGroupe from '../../../../store/contrat/groupe/actions';
import {SousActe} from '../../../../store/parametrage/sous-acte/model';
import * as sousActeSelector from '../../../../store/parametrage/sous-acte/selector';
import {loadSousActe} from '../../../../store/parametrage/sous-acte/actions';
import {ConfirmationService} from 'primeng/api';
import {Plafond} from '../../../../store/contrat/plafond/model';

@Component({
    selector: 'app-avenant-groupe',
    templateUrl: 'groupe.component.html',
    styleUrls: ['goupe.component.scss']
})
export class GroupeComponent implements OnInit{

    @Input() police: Police;
    @Output() groupeEvent = new EventEmitter();
   //  newgroupe: Groupe;
    plafondForm: FormGroup;
    adherentForm: FormGroup;
    groupeForm: FormGroup;
    primeForm: FormGroup;
    policeForm: FormGroup;
    adherentListGroupe: Array<Adherent>;
    adherentFamille: AdherentFamille;
    familles: Array<Adherent>;
    typePrimeList: Array<TypePrime>;
    typePrimeList$: Observable<Array<TypePrime>>;
    tauxList$: Observable<Array<Taux>>;
    tauxList: Array<Taux>;
    territorialiteList$: Observable<Array<Territorialite>>;
    territorialiteList: Array<Territorialite>;
    typeDureeSelected: string;
    selectedTypePrime: TypePrime = {};
    dateEffet: Date;
    dateEcheance: Date;
    typeDuree = [
        {label: 'Jour', value: 'Jour'},
        {label: 'Mois', value: 'Mois'},
        {label: 'Année', value: 'Annee'}
        ];
    entityValidations: Array<EntityValidations>;
    destroy$ = new Subject<boolean>();
    plafondFamilleActe: Array<PlafondFamilleActe>;
    plafondFamilleActeTemp: PlafondFamilleActe;
    plafondFamilleActeConstruct: Array<PlafondFamilleActe> = [];
    plafondActe: Array<PlafondActe>;
    plafondSousActe: Array<PlafondSousActe>;
    displaySousActe = false;
    private countfamilleActe = 0;
    private groupe: Groupe = {};
    private indexeActe = 0;
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
    garanties: Array<Garantie>;
    garantieList$: Observable<Array<Garantie>>;
    sousActeList$: Observable<Array<SousActe>>;
    sousActeList: Array<SousActe>;
    plafond: Plafond;

    init(): void {
        // this.adherentFamille = null;
        this.adherentFamille =  {
            adherent: {},
            famille: []
        };
        this.adherentListGroupe = [];

        this.adherentForm = this.formBuilder.group({
            id: new FormControl(null),
            nom: new FormControl('', [Validators.required]),
            prenom: new FormControl('', [Validators.required]),
            dateNaissance: new FormControl('', [Validators.required]),
            matricule:new FormControl(''),
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

        this.groupeForm = this.formBuilder.group({
            id: new FormControl(null),
            libelle: new FormControl('', [Validators.required]),
            taux: new FormControl(null, [Validators.required]),
            territorialite: new FormControl('', [Validators.required]),
            duree: new FormControl('', [Validators.required]),
            dateEffet: new FormControl('', [Validators.required]),
            typeDuree: new FormControl('', [Validators.required]),
            dateEcheance: new FormControl({value:'', disabled: true}, [Validators.required])
        });

        this.primeForm = this.formBuilder.group({
            prime: new FormControl('',[Validators.required]),
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
            numero: new FormControl(''),
            garant: new FormControl('', [Validators.required]),
            intermediaire: new FormControl('', [Validators.required]),
            taux: new FormControl(null, [Validators.required]),
            territorialite: new FormControl('', [Validators.required]),
            typeDuree: new FormControl('', [Validators.required]),
            duree: new FormControl('', [Validators.required]),
            dateEffet: new FormControl('', [Validators.required]),
            dateEcheance: new FormControl({value: '', disabled: true}, [Validators.required]),
            adressePostale: new FormControl('', [Validators.required]),
            nom: new FormControl('', [Validators.required]),
            contact: new FormControl('', [Validators.required]),
            adresseEmail: new FormControl(null, [Validators.required, Validators.email]),
            personneRessource: new FormControl('', [Validators.required]),
            contactPersonneRessource: new FormControl('', [Validators.required]),
            emailPersonneRessource: new FormControl('', [Validators.required, Validators.email]),
            secteurActivite: new FormControl('', [Validators.required]),
            numeroIfu: new FormControl(''),
            rccm: new FormControl(''),
            secteur: new FormControl('', [Validators.required]),
            referencePolice: new FormControl('', [Validators.required]),
            fraisAccessoire: new FormControl('', [Validators.required]),
            fraisBadge: new FormControl('', [Validators.required])
        });

        this.plafondForm = this.formBuilder.group({
            plafondAnnuelleFamille: new FormControl(""),
            plafondAnnuellePersonne: new FormControl(""),
            plafondGlobalInternationnal: new FormControl("")
        });

    }
    constructor(
        private formBuilder: FormBuilder,
        private store: Store<AppState>,
        private confirmationService: ConfirmationService,
    ) {
        this.entityValidations = [
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
        ];
    }

    ngOnInit(): void {
        this.init();
        this.typePrimeList$ = this.store.pipe(
            select(typePrimeSelector.typePrimeList)
        );
        this.store.dispatch(loadTypePrime());
        this.typePrimeList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
            if (value) {
                this.typePrimeList = value.slice();
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
        this.sousActeList$ = this.store.pipe(select(sousActeSelector.sousacteList));
        this.store.dispatch(loadSousActe());
        this.sousActeList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
            if (value) {
                console.log(this.sousActeList);
                this.sousActeList = value.slice();
            }
        });
    }

    addAdherentFamilleToList(): void {
        this.groupeEvent.emit(this.groupeForm as Groupe);
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

    changeTypeDureeGroupe(event){
        this.typeDureeSelected = this.groupeForm.get('typeDuree').value;
        console.log(this.typeDureeSelected);
        if (this.dateEcheance && this.groupeForm.get('duree')) {
            this.onRefreshDateEcheanceForGroupe(this.groupeForm.get('duree').value);
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
        this.typeDureeSelected = this.groupeForm.get('typeDuree').value;
        console.log(this.typeDureeSelected);
        this.groupeForm
            .get('dateEcheance')
            .setValue(
                this.getNewDateForGroupe(value)
            );
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

    changePrime(event) {
        this.selectedTypePrime = event.value;
    }

    validerPlafond() {
        this.plafond = this.plafondForm.value;
        for ( let i = 0; i < this.plafondFamilleActeConstruct.length; i++) {
            this.plafondFamilleActeConstruct[i].montantPlafond = removeBlanks(this.plafondFamilleActeConstruct[i].montantPlafond + '');
            for ( let j = 0; j< this.plafondFamilleActeConstruct[i].listeActe.length; j++){
                this.plafondFamilleActeConstruct[i].listeActe[j].montantPlafond =
                    removeBlanks(this.plafondFamilleActeConstruct[i].listeActe[j].montantPlafond + '');
                for (let k = 0; k < this.plafondFamilleActeConstruct[i].listeActe[j].listeSousActe.length; k++){
                    this.plafondFamilleActeConstruct[i].listeActe[j].listeSousActe[k].montantPlafond =
                        removeBlanks(this.plafondFamilleActeConstruct[i].listeActe[j].listeSousActe[k].montantPlafond+'');
                }
            }
        }
        this.plafond.plafondFamilleActe = this.plafondFamilleActeConstruct;
        this.plafond.groupe = this.groupe;
        console.log(this.plafond);
        this.store.dispatch(featureActionsPlafond.createPlafond(this.plafond));
        this.plafondFamilleActe = [{garantie:{}}];
        this.plafondActe = [];
        this.plafondFamilleActeConstruct = [];
        this.countfamilleActe = 0;
    }
    addSousActe() {
        this.plafondActe[this.indexeActe].listeSousActe = this.plafondSousActe;
        console.log(this.plafondActe);
    }

    addFamilleActe(rowData, ri) {


        this.confirmationService.confirm({
            message: 'Etes vous sur de valider?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {

                console.log(rowData);
                console.log(this.plafondFamilleActeConstruct);
                for( let i = 0; i < this.plafondFamilleActeConstruct.length; i++){
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
                    if ( element.garantie.id === rowData.garantie.id) {
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
                this.plafondFamilleActeConstruct[this.countfamilleActe] = this.plafondFamilleActeTemp;
                delete this.clonedPlafondFamilleActeTemp[rowData.garantie.id];
                console.log(this.countfamilleActe);
                this.countfamilleActe++;
                console.log(this.plafondFamilleActeConstruct);
            },
        });
    }

    /** obtenir les sous actes pour un acte donné */
    getSousActe(rowData, ri){
        this.plafondSousActe = [];
        if (!rowData.listeSousActe){

            this.sousActeList.forEach((element) => {
                console.log(rowData);
                if (element.idTypeActe === rowData.acte.id) {
                    this.plafondSousActe.push({
                            sousActe: element,
                            taux: this.police.taux,
                            dateEffet: new Date(this.police.dateEffet),
                            montantPlafond: rowData.montantPlafond
                        });
                }
            });


        } else {
            this.plafondSousActe = rowData.listeSousActe;
        }
        this.displaySousActe = true;
        this.indexeActe = ri;
    }

    /** cette methode permet de creer un groupe avec des informations basiques */
    onCreateGroupe(){
        this.groupe = this.groupeForm.value;
        this.groupe.police = this.police;
        this.groupe.prime = this.primeForm.value;

        if (this.groupe.prime.primeAnnuelle){
            this.groupe.prime.primeAnnuelle = removeBlanks(this.groupe.prime.primeAnnuelle + '');
        }
        if (this.groupe.prime.primeAdulte){
            this.groupe.prime.primeAdulte = removeBlanks(this.groupe.prime.primeAdulte +  '');
        }
        if(this.groupe.prime.primeConjoint){
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
        // this.groupe.adherentFamille = this.adherentFamille;
        console.log(this.groupe);
        this.store.dispatch(featureActionGroupe.createGroupe(this.groupe));
        // this.adherentFamille = [];
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

}
