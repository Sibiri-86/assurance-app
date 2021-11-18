import {Component, EventEmitter, OnInit, Output} from '@angular/core';
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
import * as tauxSelector from "../../../../store/parametrage/taux/selector";
import {loadTaux} from "../../../../store/parametrage/taux/actions";
import * as territorialiteSelector from "../../../../store/parametrage/territorialite/selector";
import {loadTerritorialite} from "../../../../store/parametrage/territorialite/actions";
import {Taux} from "../../../../store/parametrage/taux/model";
import {Territorialite} from "../../../../store/parametrage/territorialite/model";
import {EntityValidations} from "../../../common/models/validation";

@Component({
    selector: 'app-avenant-groupe',
    templateUrl: 'groupe.component.html',
    styleUrls: ['goupe.component.scss']
})
export class GroupeComponent implements OnInit{

    // @Input groupe: Groupe;
    @Output() groupeEvent = new EventEmitter();
   //  newgroupe: Groupe;
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
        {label:'Jour', value:'Jour'},
        {label: 'Mois', value:'Mois'},
        {label:'Année', value: 'Annee'}
        ];
    entityValidations: Array<EntityValidations>;
    destroy$ = new Subject<boolean>();

    init(): void {
        // this.adherentFamille = null;
        this.adherentFamille =  {
            adherent: {},
            famille: []
        };
        this.adherentListGroupe = [];

        this.adherentForm = this.formBuilder.group({
            id: new FormControl(''),
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
            id: new FormControl(''),
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

    }
    constructor(private formBuilder: FormBuilder, private store: Store<AppState>) {
        this.entityValidations = [
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

    changePrime(event) {
        this.selectedTypePrime = event.value;
    }

}
