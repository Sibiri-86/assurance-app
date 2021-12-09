import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Adherent, AdherentFamille} from '../../../../store/contrat/adherent/model';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import * as qualiteAssureSelector from '../../../../store/parametrage/qualite-assure/selector';
import {loadQualiteAssure} from '../../../../store/parametrage/qualite-assure/actions';
import {takeUntil} from 'rxjs/operators';
import {QualiteAssure} from '../../../../store/parametrage/qualite-assure/model';
import {Observable, Subject} from 'rxjs';
import {AppState} from '../../../../store/app.state';
import {Genre} from '../../../../store/parametrage/genre/model';
import * as genreSelector from '../../../../store/parametrage/genre/selector';
import {loadGenre} from '../../../../store/parametrage/genre/actions';
import * as professionSelector from '../../../../store/parametrage/profession/selector';
import {loadProfession} from '../../../../store/parametrage/profession/actions';
import {Profession} from '../../../../store/parametrage/profession/model';
import {Police} from '../../../../store/contrat/police/model';
import {
    HistoriqueAvenant,
    HistoriqueAvenantAdherant,
    TypeHistoriqueAvenant
} from '../../../../store/contrat/historiqueAvenant/model';
import {Groupe} from '../../../../store/contrat/groupe/model';
import * as groupeSlector from '../../../../store/contrat/groupe/selector';
import {loadGroupe} from '../../../../store/contrat/groupe/actions';
import {AdherentService} from '../../../../store/contrat/adherent/service';

@Component({
    selector: 'app-avenant-incorporation',
    templateUrl: 'avenant-incorporation.component.html',
    styleUrls: ['avenant-incorporation.component.scss']
})
export class AvenantIncorporationComponent implements OnInit{

    // @Input groupe: Groupe;
    @Output() adherentFamilleEvent = new EventEmitter();
    @Input() police: Police;
   //  newgroupe: Groupe;
    adherentForm: FormGroup;
    myForm: FormGroup;
    adherentListGroupe: Array<Adherent>;
    adherentFamille: AdherentFamille;
    familles: Array<Adherent>;
    newForm: FormGroup;
    adherentFamilleForm: FormGroup;
    qualiteAssureList1: Array<QualiteAssure>;
    qualiteAssureList2: Array<QualiteAssure>;
    qualiteAssureList$: Observable<Array<QualiteAssure>>;
    destroy$ = new Subject<boolean>();
    genreList: Array<Genre>;
    genreList$: Observable<Array<Genre>>;
    professionList: Array<Profession>;
    professionList$: Observable<Array<Profession>>;
    historiqueAvenantAdherants: HistoriqueAvenantAdherant[] = [];
    adherentFamilleListe: AdherentFamille[] = [];
    @Input() isRenouv: boolean;
    obj: any = {group: {}, prime: {}};
    adherentSelected: Adherent = {};
    adherentPrincipaux1: Adherent[];
    @Input() adherentPrincipauxTMP: Array<Adherent>;
    groupes: Array<Groupe>;
    adherentPrincipaux: Array<Adherent>;

    init(): void {
        this.adherentForm = this.formBuilder.group({
            id: new FormControl(null),
            nom: new FormControl('', [Validators.required]),
            prenom: new FormControl('', [Validators.required]),
            dateNaissance: new FormControl('', [Validators.required]),
            lieuNaissance: new FormControl('', [Validators.required]),
            numeroTelephone: new FormControl('', [Validators.required]),
            adresse: new FormControl('', [Validators.required]),
            adresseEmail: new FormControl('', [Validators.required]),
            profession: new FormControl('', [Validators.required]),
            referenceBancaire: new FormControl(''),
            qualiteAssure: new FormControl('', [Validators.required]),
            genre: new FormControl('', [Validators.required]),
            dateIncorporation: new FormControl('', [Validators.required]),
            dateEntree: new FormControl('', [Validators.required]),
            dateIncor: new FormControl(new Date(), [Validators.required]),
            matriculeGarant: new FormControl('', ),
            matriculeSouscripteur: new FormControl('', ),
            familys: this.formBuilder.array([])
        });

        this.newForm = this.formBuilder.group({
            id: new FormControl(null),
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
            dateIncorporation: new FormControl(new Date(), [Validators.required]),
            dateEntree: new FormControl(new Date(), [Validators.required]),
            dateIncor: new FormControl(new Date(), [Validators.required]),
        });
        this.adherentFamilleForm = this.formBuilder.group({
            adherent: new FormControl(''),
            famille: new FormControl('', [Validators.required]),
        });
        this.myForm = this.formBuilder.group({
            numero: new FormControl(null, [Validators.required]),
            dateIncorparation: new FormControl(null, [Validators.required]),
        });
        this.familles = [];
        this.adherentFamille =  {
            adherent: {},
            famille: []
        };

        this.adherentListGroupe = [];

        this.qualiteAssureList$ = this.store.pipe(
            select(qualiteAssureSelector.qualiteAssureList)
        );
        this.store.dispatch(loadQualiteAssure());
        this.qualiteAssureList$
            .pipe(takeUntil(this.destroy$))
            .subscribe((value) => {
                if (value) {
                    this.qualiteAssureList1 = value.slice().filter(e => e.code === 'ADHERENT');
                    this.qualiteAssureList2 = value.slice().filter(e => e.code !== 'ADHERENT');
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
    }
    constructor(private formBuilder: FormBuilder, private store: Store<AppState>, private adherentService: AdherentService) {}

    ngOnInit(): void {
        this.init();
        console.log('---------------------------------');
        console.log(this.adherentPrincipauxTMP);
        this.adherentPrincipaux = this.adherentPrincipauxTMP;
    }

    addAdherentFamilleToList(): void {
        // this.createHistoriqueAvenant();
        const historiqueAvenant: HistoriqueAvenant = {};
        historiqueAvenant.aderants = this.adherentFamilleListe;
        historiqueAvenant.typeHistoriqueAvenant = TypeHistoriqueAvenant.INCORPORATION;
        historiqueAvenant.numeroGarant = this.myForm.get('numero').value;
        historiqueAvenant.dateAvenant = this.myForm.get('dateIncorparation').value;
        console.log('..........historiqueAvenant.............');
        console.log(historiqueAvenant);
        this.adherentFamilleEvent.emit(historiqueAvenant);
        // this.init();
    }
    ajouter(): void {
        console.log('----------------------------------');
        console.log(this.familys);
        this.familys.push(this.createForm());
        // this.familles.push(this.getAdheranrt());
    }
    delete(ri: number): void {
        console.log(ri);
        this.familys.removeAt(ri);
    }

    get familys() {
        return this.adherentForm.controls.familys as FormArray;
    }

    createForm(): FormGroup {
        return this.formBuilder.group({
            id: new FormControl(null),
            nom: new FormControl('', [Validators.required]),
            prenom: new FormControl('', [Validators.required]),
            dateNaissance: new FormControl('', [Validators.required]),
            matricule: new FormControl(''),
            lieuNaissance: new FormControl('', [Validators.required]),
            numeroTelephone: new FormControl('', [Validators.required]),
            adresse: new FormControl('', [Validators.required]),
            adresseEmail: new FormControl('', [Validators.required]),
            profession: {},
            referenceBancaire: new FormControl(''),
            qualiteAssure: new FormControl('', [Validators.required]),
            genre: new FormControl('', [Validators.required]),
            dateIncorporation: new FormControl('', [Validators.required]),
            dateEntree: new FormControl('', [Validators.required]),
            dateIncor: new FormControl(new Date(), [Validators.required]),
        });
    }

    createHistoriqueAvenant(): void {
        const adherantFamille: AdherentFamille = {};
        adherantFamille.adherent = this.adherentForm.value;
        adherantFamille.famille = this.familys.value;
        this.adherentFamilleListe.push(adherantFamille);
        this.adherentForm.reset();
        this.familys.reset();
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

    setAdherentPrincipal(adherent: Adherent): void {
        console.log('***************adherent*******************', adherent);
        this.adherentForm.patchValue({
            id: adherent?.id || null,
            nom: adherent?.nom,
            prenom: adherent?.prenom,
            dateNaissance: new Date(adherent?.dateNaissance),
            matriculeGarant: adherent?.matriculeGarant,
            lieuNaissance: adherent?.lieuNaissance,
            numeroTelephone: adherent?.numeroTelephone,
            adresse: adherent?.adresse,
            adresseEmail: adherent?.adresseEmail,
            profession: adherent?.profession,
            referenceBancaire: adherent?.referenceBancaire,
            qualiteAssure: adherent?.qualiteAssure,
            genre: adherent?.genre,
            dateEntree: new Date(adherent?.dateEntree)
        });
        console.log('***************this.adherentForm*******************', this.adherentForm);
    }

}
