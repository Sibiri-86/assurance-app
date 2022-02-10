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
import {Exercice} from '../../../../store/contrat/exercice/model';
import {Police} from '../../../../store/contrat/police/model';
import {
    HistoriqueAvenant,
    HistoriqueAvenantAdherant,
    TypeDemandeur,
    TypeHistoriqueAvenant
} from '../../../../store/contrat/historiqueAvenant/model';
import {Groupe} from '../../../../store/contrat/groupe/model';
import {HistoriqueAvenantService} from '../../../../store/contrat/historiqueAvenant/service';
import {MessageService} from 'primeng/api';
import {PoliceService} from '../../../../store/contrat/police/service';
import {loadGroupe} from '../../../../store/contrat/groupe/actions';
import {groupeList} from '../../../../store/contrat/groupe/selector';
import {ExerciceService} from '../../../../store/contrat/exercice/service';
import * as exerciceSelector from '../../../../store/contrat/exercice/selector';
import * as featureExerciceAction from '../../../../store/contrat/exercice/actions';

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
    viewListe = false;
    selectedFile: File;
    historiqueAvenant1: HistoriqueAvenant = {};
    isImport = 'NON';
    demandeursList: any = [
        {libelle: 'VIMSO', value: TypeDemandeur.VIMSO},
        {libelle: 'SOUSCRIPTEUR', value: TypeDemandeur.SOUSCRIPTEUR},
        {libelle: 'GARANT', value: TypeDemandeur.GARANT}
        ];
    private exercice: Exercice;
    private exerciceForm: FormGroup;
    private curentGroupe: Groupe;
    customForm: FormGroup;
    groupePolicy: Array<Groupe> = [];
    groupeList$: Observable<Array<Groupe>>;
    groupeList: Array<Groupe>;
    isNewGroupe = false;
    exercice$: Observable<Exercice>;
    exerciceList$: Observable<Array<Exercice>>;
    exerciceList: Array<Exercice>;
    init(): void {
        this.historiqueAvenant1.file = new FormData();
        // this.historiqueAvenant1.fileToLoad = {};
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
            numero: new FormControl('', ),
            familys: this.formBuilder.array([]),
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
        this.exerciceForm = this.formBuilder.group({
            debut: new FormControl(''),
            fin: new FormControl('', [Validators.required]),
            actived: new FormControl('', [Validators.required]),
        });
        this.myForm = this.formBuilder.group({
            numero: new FormControl(null, [Validators.required]),
            dateIncorparation: new FormControl(null, [Validators.required]),
            observation: new FormControl(null, [Validators.required]),
            demandeur: new FormControl(null, [Validators.required]),
            fraisBadges: new FormControl(null, [Validators.required]),
            fraisAccessoires: new FormControl(null, [Validators.required]),
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
        this.loadGoupeByPolice();
    }
    constructor(
        private formBuilder: FormBuilder,
        private store: Store<AppState>,
        private historiqueAvenantService: HistoriqueAvenantService,
        private messageService: MessageService,
        private policeService: PoliceService,
        private exerciceService: ExerciceService
    ) {
        this.customForm = this.formBuilder.group({
            groupe: new FormControl('')
        });
    }

    ngOnInit(): void {
        this.init();
        console.log('---------------------------------');
        console.log(this.adherentPrincipauxTMP);
        this.adherentPrincipaux = this.adherentPrincipauxTMP;
        this.loadActivedExercice(this.police);
    }

    addAdherentFamilleToList(): void {
        // this.createHistoriqueAvenant();
        // const historiqueAvenant1: HistoriqueAvenant = {};
        this.adherentFamilleListe.forEach(af => {
            af.famille.forEach(f => {
                f.adherentPrincipal = null;
            });
        });
        this.historiqueAvenant1.aderants = this.adherentFamilleListe;
        this.historiqueAvenant1.typeHistoriqueAvenant = TypeHistoriqueAvenant.INCORPORATION;
        this.historiqueAvenant1.numeroGarant = this.myForm.get('numero').value;
        this.historiqueAvenant1.dateAvenant = this.myForm.get('dateIncorparation').value;
        this.historiqueAvenant1.observation = this.myForm.get('observation').value;
        switch (this.myForm.get('demandeur').value.value) {
            case TypeDemandeur.GARANT:
                this.historiqueAvenant1.typeDemandeur = TypeDemandeur.GARANT;
                break;
            case TypeDemandeur.SOUSCRIPTEUR:
                this.historiqueAvenant1.typeDemandeur = TypeDemandeur.SOUSCRIPTEUR;
                break;
            case TypeDemandeur.VIMSO:
                this.historiqueAvenant1.typeDemandeur = TypeDemandeur.VIMSO;
                break;
            default: break;
        }
        this.historiqueAvenant1.exercice = this.exercice;
        this.historiqueAvenant1.fraisBadges = this.myForm.get('fraisBadges').value;
        this.historiqueAvenant1.fraisAccessoires = this.myForm.get('fraisAccessoires').value;
        this.historiqueAvenant1.groupe = this.curentGroupe;
        this.historiqueAvenant1.police = this.police;
        console.log('..........   historiqueAvenant  f  .............');
        console.log(this.historiqueAvenant1);
        this.adherentFamilleEvent.emit(this.historiqueAvenant1);
        this.init();
    }
    ajouter(): void {
        console.log('----------------------------------');
        console.log(this.familys);
        const formAdherent: FormGroup = this.createForm();
        formAdherent.patchValue({dateIncor: this.adherentForm.get('dateIncorporation').value});
        // formAdherent.controls.f
        this.familys.push(formAdherent);
        this.familles.forEach(family => {
            family.adherentPrincipal = null;
        });
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
        adherantFamille.famille.forEach(f => {
            f.adherentPrincipal = null;
        });
        this.adherentFamilleListe.push(adherantFamille);
        this.adherentForm.reset();
        this.familys.reset();
        this.adherentSelected = {};
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
            dateEntree: new Date(adherent?.dateEntree),
            numero: adherent.numero
        });
        console.log('+++++ adherent.numero +++ ');
        console.log(this.adherentForm.get('numero').value);
    }

    getFiles(event: File) {
        this.historiqueAvenant1.fileToLoad = event;
        this.selectedFile = event;
        this.policeService.loadAdherentsByExcelFile(event).subscribe(
            (res) => {
                this.adherentFamilleListe = res.slice();
                console.log('***************A******************* ', this.adherentFamilleListe.length);
                this.viewListe = !this.viewListe;
            }
        );
    }

    voirLaliste(): void {
        this.viewListe = !this.viewListe;
    }

    hideListe(): void {
        this.viewListe = false;
        this.adherentFamilleListe = [];
    }

    exportModel(): void {
        this.historiqueAvenantService.getModel(TypeHistoriqueAvenant.INCORPORATION).subscribe(
            (res) => {
                const file = new Blob([res], {type: 'application/vnd.ms-excel'});
                const  fileUrl = URL.createObjectURL(file);
                window.open(fileUrl);
            }
        );
    }

    compareDate(): void {
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

    addMessage(severite: string, resume: string, detaile: string): void {
        this.messageService.add({severity: severite, summary: resume, detail: detaile});
    }

    compareDateIncorp(): void {
        this.historiqueAvenantService.compareDate(this.adherentForm.get('dateIncor').value, this.police.dateEffet).subscribe(
            (res) => {
                if (res) {
                    this.addMessage('error', 'Date d\'effet invalide',
                        'La date d\'effet de l\'avenant ne peut pas être postérieure à celle de la police');
                    this.adherentForm.patchValue({dateIncor: null});
                }
            }
        );
    }
    compareDateMembre(): void {
        this.historiqueAvenantService.compareDate(this.adherentForm.get('dateIncor').value, this.police.dateEffet).subscribe(
            (res) => {
                if (res) {
                    this.addMessage('error', 'Date d\'effet invalide',
                        'La date d\'effet de l\'avenant de peut pas être postérieure à celle de la police');
                    this.adherentForm.patchValue({dateIncor: null});
                }
            }
        );
    }

    onDemandeurChange(): void { }

    private loadActivedExercice(police: Police): void {
        if (police) {
            this.exercice$ = this.store.pipe(select(exerciceSelector.selectActiveExercice));
            this.store.dispatch(featureExerciceAction.loadExerciceActif({policeId: police.id}));
            this.exercice$.pipe(takeUntil(this.destroy$)).subscribe(
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
    onGroupeChange() {
        this.curentGroupe = this.customForm.controls.groupe.value;
        this.adherentPrincipaux = this.adherentPrincipauxTMP.filter(ad => ad.groupe.id === this.curentGroupe.id);
    }
    loadGoupeByPolice(): void {
        if (this.police) {
            this.groupeList$ = this.store.pipe(select(groupeList));
            this.store.dispatch(loadGroupe({policeId: this.police.id}));
            this.groupeList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
                if (value) {
                    this.groupePolicy = value.slice();
                    console.log(this.groupePolicy);
                }
            });
        }
    }
    addGroupeNew(groupe: FormGroup): Groupe {
        console.log(groupe);
        this.curentGroupe = groupe as Groupe;
        return this.curentGroupe;
    }
    addGroupe() {
    }
}
