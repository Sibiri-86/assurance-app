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

@Component({
    selector: 'app-avenant-incorporation',
    templateUrl: 'avenant-incorporation.component.html',
    styleUrls: ['avenant-incorporation.component.scss']
})
export class AvenantIncorporationComponent implements OnInit{

    // @Input groupe: Groupe;
    @Output() adherentFamilleEvent = new EventEmitter();
    // @Input() initialise: boolean;
   //  newgroupe: Groupe;
    adherentForm: FormGroup;
    adherentListGroupe: Array<Adherent>;
    adherentFamille: AdherentFamille;
    familles: Array<Adherent>;
    newForm: FormGroup;
    qualiteAssureList: Array<QualiteAssure>;
    qualiteAssureList$: Observable<Array<QualiteAssure>>;
    destroy$ = new Subject<boolean>();
    genreList: Array<Genre>;
    genreList$: Observable<Array<Genre>>;
    professionList: Array<Profession>;
    professionList$: Observable<Array<Profession>>;

    init(): void {
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
            dateEntree: new FormControl('', [Validators.required]),
            dateIncor: new FormControl(new Date(), [Validators.required]),
            familys: this.formBuilder.array([])
        });

        this.newForm = this.formBuilder.group({
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
            dateIncorporation: new FormControl(new Date(), [Validators.required]),
            dateEntree: new FormControl(new Date(), [Validators.required]),
            dateIncor: new FormControl(new Date(), [Validators.required]),
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
                    this.qualiteAssureList = value.slice();
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
    constructor(private formBuilder: FormBuilder, private store: Store<AppState>) {}

    ngOnInit(): void {
        this.init();
    }

    addAdherentFamilleToList(): void {
        const adherantFamille: AdherentFamille = {};
        adherantFamille.adherent = this.adherentForm.value as Adherent;
        adherantFamille.famille = this.adherentForm.controls.familys.value;
        console.log('+++++++++++++++++++++++++');
        console.log(adherantFamille);
        this.adherentFamilleEvent.emit(adherantFamille);
        this.init();
    }
    ajouter(): void {
        console.log('----------------------------------');
        console.log(this.familys);
        this.familys.push(this.createForm());
        // this.familles.push(this.getAdheranrt());
    }
    delete(ri: number): void {
        console.log(ri);
        this.familles.splice(ri, 1);
    }

    get familys() {
        return this.adherentForm.controls.familys as FormArray;
    }

    createForm(): FormGroup {
        return this.formBuilder.group({
            id: new FormControl(''),
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

}
