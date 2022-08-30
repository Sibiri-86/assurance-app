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
import { AdherentService } from 'src/app/store/contrat/adherent/service';
import { HttpHeaders } from '@angular/common/http';

@Component({
    selector: 'app-avenant-incorporation',
    templateUrl: 'avenant-incorporation.component.html',
    styleUrls: ['avenant-incorporation.component.scss']
})
export class AvenantIncorporationComponent implements OnInit{

    @Input() avenantId: string;
    @Input() etat: string;
    @Output() adherentFamilleEvent = new EventEmitter();
    @Input() police: Police;
    //  newgroupe: Groupe;
    lastExerciceForm: FormGroup;
    adherentForm: FormGroup;
    myForm: FormGroup;
    adherentListGroupe: Array<Adherent> = [];
    adherentFamille: AdherentFamille;
    familles: Array<Adherent> = [];
    newForm: FormGroup;
    adherentFamilleForm: FormGroup;
    qualiteAssureList1: Array<QualiteAssure> = [];
    qualiteAssureList2: Array<QualiteAssure> = [];
    qualiteAssureList$: Observable<Array<QualiteAssure>>;
    destroy$ = new Subject<boolean>();
    genreList: Array<Genre> = [];
    genreList$: Observable<Array<Genre>>;
    professionList: Array<Profession>;
    professionList$: Observable<Array<Profession>>;
    historiqueAvenantAdherants: HistoriqueAvenantAdherant[] = [];
    adherentFamilleListe: AdherentFamille[] = [];
    @Input() isRenouv: boolean;
    obj: any = {group: {}, prime: {}};
    adherentSelected: Adherent = {};
    adherentPrincipaux1: Adherent[];
    @Input() adherentPrincipauxTMP: Array<Adherent> = [];
    groupes: Array<Groupe> = [];
    adherentPrincipaux: Array<Adherent> = [];
    adherentPrincipaux2: Array<Adherent> = [];
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
    curentGroupe: Groupe = {};
    customForm: FormGroup;
    groupePolicy: Array<Groupe> = [];
    groupeList$: Observable<Array<Groupe>>;
    groupeList: Array<Groupe>;
    isNewGroupe = false;
    exercice$: Observable<Exercice>;exerciceList$
    : Observable<Array<Exercice>>;
    exerciceList: Array<Exercice>;
    viewListeEdit = false;
    @Input() groupesInput: Array<Groupe>;
    selectedGroup: Groupe = {};
    curentExercice: Exercice = {};
    init(): void {
        this.historiqueAvenant1.file = new FormData();
        // this.historiqueAvenant1.fileToLoad = {};
        this.familles = [];
        this.adherentFamille =  {
            adherent: {},
            famille: []
        };

        this.adherentListGroupe = [];

        console.log(' *** etat === ' + this.etat);
        if (this.etat !== 'CREATE') {
            this.updateAvenant(this.avenantId);
        }

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
            if(this.etat === 'CREATE') {
                this.loadExerciceByPolice(this.police);
            }
    }

    loadLastExerciceOfPolice() {
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
    constructor(
        private formBuilder: FormBuilder,
        private store: Store<AppState>,
        private historiqueAvenantService: HistoriqueAvenantService,
        private messageService: MessageService,
        private policeService: PoliceService,
        private exerciceService: ExerciceService,
        private adherentService: AdherentService
    ) {
        this.customForm = this.formBuilder.group({
            groupe: new FormControl(null)
        });
        this.adherentForm = this.formBuilder.group({
            id: new FormControl(0),
            nom: new FormControl(null, [Validators.required]),
            prenom: new FormControl(null, [Validators.required]),
            dateNaissance: new FormControl(null, [Validators.required]),
            lieuNaissance: new FormControl(null, [Validators.required]),
            numeroTelephone: new FormControl(null, [Validators.required]),
            adresse: new FormControl(null),
            adresseEmail: new FormControl(null),
            profession: new FormControl(null),
            referenceBancaire: new FormControl(null),
            qualiteAssure: new FormControl(null, [Validators.required]),
            genre: new FormControl(null, [Validators.required]),
            dateIncorporation: new FormControl(null, [Validators.required]),
            dateEntree: new FormControl(null),
            // dateIncor: new FormControl(new Date(), [Validators.required]),
            matriculeGarant: new FormControl(null, ),
            matriculeSouscripteur: new FormControl(null, ),
            numero: new FormControl(null, ),
            familys: this.formBuilder.array([]),
            manageIncorporation: new FormControl(1),
           
        });

        this.newForm = this.formBuilder.group({
            id: new FormControl(),
            nom: new FormControl(null, [Validators.required]),
            prenom: new FormControl(null, [Validators.required]),
            dateNaissance: new FormControl(null, [Validators.required]),
            matricule: new FormControl(null),
            lieuNaissance: new FormControl(null, [Validators.required]),
            numeroTelephone: new FormControl(null),
            adresse: new FormControl(null),
            adresseEmail: new FormControl(null),
            profession: new FormControl(null, [Validators.required]),
            referenceBancaire: new FormControl(null),
            qualiteAssure: new FormControl(null, [Validators.required]),
            genre: new FormControl(null, [Validators.required]),
            dateIncorporation: new FormControl(new Date(), [Validators.required]),
            dateEntree: new FormControl(new Date()),
        });
        this.adherentFamilleForm = this.formBuilder.group({
            adherent: new FormControl(null),
            famille: new FormControl(null),
        });
        this.exerciceForm = this.formBuilder.group({
            id: new FormControl(null),
            debut: new FormControl(null),
            fin: new FormControl(null, [Validators.required]),
            actived: new FormControl(null, [Validators.required]),
        });
        this.myForm = this.formBuilder.group({
            id: new FormControl(null),
            numero: new FormControl(null),
            dateIncorparation: new FormControl(null, [Validators.required]),
            dateAvenant: new FormControl(null, [Validators.required]),
            observation: new FormControl(null, [Validators.required]),
            demandeur: new FormControl(null, [Validators.required]),
            fraisBadges: new FormControl(null, [Validators.required]),
            fraisAccessoires: new FormControl(null, [Validators.required]),
            dateSaisie: new FormControl(new Date()),
            // curentExercice: new FormControl(null, [Validators.required])
        });

        this.lastExerciceForm = this.formBuilder.group({
            id: new FormControl(null),
            debut: new FormControl('', [Validators.required]),
            fin: new FormControl('', [Validators.required]),
            actived: new FormControl('', [Validators.required]),
            // typeDuree: new FormControl('', [Validators.required]),
            // duree: new FormControl('', [Validators.required]),
        });
    }

    ngOnInit(): void {
        this.init();
        console.log('---------------------------------');
        console.log(this.adherentPrincipauxTMP);
        console.log(this.police);
        this.adherentPrincipaux = this.adherentPrincipauxTMP;
        this.loadActivedExercice(this.police);
        console.log('-------------groupesInput--------------------' + this.groupesInput);
        if (this.groupesInput) {
            console.log('-------------groupesInput--------------------' + this.groupesInput.length);
            this.groupePolicy = this.groupesInput;
        } else {
            console.log('---------------avenantId------------------' + this.avenantId);
            this.loadGoupeByPolice();
        }

        if(this.etat === 'CREATE') {
            this.loadLastExerciceOfPolice();
        }

        /* this.adherentService.loadAdherentsByPolice(this.police.id).subscribe(
            (res) => {
              res.forEach(a => {
                a.fullName = a.numero +' - '+ a.nom + ' ' + a.prenom;
              });
              this.adherentPrincipaux = res.filter(e => e.adherentPrincipal === null);
              console.log(':::::::::::::this.adherentListGroupe2222222222:::::::::::::');
              console.log(this.adherentPrincipaux);
            }
        ); */
        
    }

    createItem(): FormGroup {
        return this.formBuilder.group({
          id: new FormControl(),
          nom: new FormControl('', [Validators.required]),
          prenom: new FormControl('', [Validators.required]),
          telephone: new FormControl(),
          dateNaissance: new FormControl(Validators.required),
          dateEntree: new FormControl('', [Validators.required]),
          dateIncorporation: new FormControl(''),
          genre: new FormControl('', [Validators.required]),
          qualiteAssure: new FormControl('', [Validators.required]),
        });
      }

    addAdherentFamilleToList(): void {
       
      //   this.createHistoriqueAvenant();
        // const historiqueAvenant1: HistoriqueAvenant = {};
        this.adherentFamilleListe.forEach(af => {
            // af.adherent.groupe = this.curentGroupe;
            af.famille.forEach(f => {
                f.adherentPrincipal = null;
            });
        });
        this.historiqueAvenant1.aderants = this.adherentFamilleListe;
        this.historiqueAvenant1.typeHistoriqueAvenant = TypeHistoriqueAvenant.INCORPORATION;
        this.historiqueAvenant1.numeroGarant = this.myForm.get('numero').value || 0;
        this.historiqueAvenant1.dateEffet = this.myForm.get('dateIncorparation').value;
        this.historiqueAvenant1.dateAvenant = this.myForm.get('dateAvenant').value;
        this.historiqueAvenant1.observation = this.myForm.get('observation').value;
        this.historiqueAvenant1.dateSaisie = this.myForm.get('dateSaisie').value;
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
        this.historiqueAvenant1.exercice = this.curentExercice;
        console.log('-----------------this.curentExercice-----------------', this.curentExercice);
        this.historiqueAvenant1.fraisBadges = this.myForm.get('fraisBadges').value;
        this.historiqueAvenant1.fraisAccessoires = this.myForm.get('fraisAccessoires').value;
        this.historiqueAvenant1.groupe = this.curentGroupe;
        this.historiqueAvenant1.police = this.police;
        console.log('..........   historiqueAvenant  f  .............');
        console.log(this.historiqueAvenant1);
        this.adherentFamilleEvent.emit(this.historiqueAvenant1);
        this.init();
    }

    controleAge() {
        if(this.adherentForm.value.dateNaissance) {
            if (new Date(this.adherentForm.value.dateNaissance).getTime() > new Date(this.lastExerciceForm.value.fin).getTime()) {
                this.adherentForm.get('dateNaissance').setValue('');
                this.addMessage('error', 'Date de naissance invalide',
                'La date de naissance ne peut pas être postérieure à celle de la police');
            }
          }
    }

    controleEntre() {
        if(this.adherentForm.value.dateEntree) {
            if (new Date(this.adherentForm.value.dateEntree).getTime() > new Date(this.lastExerciceForm.value.fin).getTime()) {
                this.adherentForm.get('dateEntree').setValue('');
                this.addMessage('error', 'Date d\' entrée invalide',
                'La date d\'entrée ne peut pas être postérieure à celle de la police');
            }
          }
    }


    ajouter(): void {
        const formAdherent: FormGroup = this.createForm();
        formAdherent.patchValue({
            dateIncorporation: this.adherentForm.get('dateIncorporation').value,
        });
        this.familys.push(formAdherent);
        
        this.familles.forEach(family => {
            family.adherentPrincipal = null;
            family.groupe = this.customForm.controls.groupe.value;
        });
        this.familys.value.forEach(family => {
            family.adherentPrincipal = null;
            family.groupe = this.customForm.controls.groupe.value;
        });
    }
    
    delete(ri: number): void {
        console.log(ri);
        this.familys.removeAt(ri);
    }

    controleAgeRi(ri: number) {
        let myForm = (this.adherentForm.get('familys') as FormArray).at(ri);
        if(this.adherentForm.get('familys').value[ri].dateNaissance) {
            if (new Date(this.adherentForm.get('familys').value[ri].dateNaissance).getTime() > new Date(this.lastExerciceForm.value.fin).getTime()) {
                myForm.patchValue({dateNaissance: null});
                this.addMessage('error', 'Date de naissance invalide',
                'La date de naissance ne peut pas être postérieure à celle de la police');
            }
          }
    }

    controleEntreRi(ri: number) {
        let myForm = (this.adherentForm.get('familys') as FormArray).at(ri);
        if(this.adherentForm.get('familys').value[ri].dateEntree) {
            if (new Date(this.adherentForm.get('familys').value[ri].dateEntree).getTime() > new Date(this.lastExerciceForm.value.fin).getTime()) {
                myForm.patchValue({dateEntree: null});
                this.addMessage('error', 'Date d\' entrée invalide',
                'La date d\'entrée ne peut pas être postérieure à celle de la police');
            }
          }
    }

    controleIncorporRi(ri: number) {
        let myForm = (this.adherentForm.get('familys') as FormArray).at(ri);
        if(this.adherentForm.get('familys').value[ri].dateIncorporation) {
            if (new Date(this.adherentForm.get('familys').value[ri].dateIncorporation).getTime() > new Date(this.lastExerciceForm.value.fin).getTime()) {
                myForm.patchValue({dateIncorporation: null});
                this.addMessage('error', 'Date d\' incorporation invalide',
                'La date d\'incoporation ne peut pas être postérieure à celle de la police');
            }
          }
    }

    get familys() {
        return this.adherentForm.controls.familys as FormArray;
    }

    createForm(): FormGroup {
        return this.formBuilder.group({
            id: new FormControl(null),
            nom: new FormControl(null, [Validators.required]),
            prenom: new FormControl(null, [Validators.required]),
            dateNaissance: new FormControl(null, [Validators.required]),
            matricule: new FormControl(null),
            lieuNaissance: new FormControl(null, [Validators.required]),
            numeroTelephone: new FormControl(null),
            adresse: new FormControl(null),
            adresseEmail: new FormControl(null),
            profession: {},
            referenceBancaire: new FormControl(null),
            qualiteAssure: new FormControl(null, [Validators.required]),
            genre: new FormControl(null, [Validators.required]),
            dateIncorporation: new FormControl(null, [Validators.required]),
            dateEntree: new FormControl(null),
        });
    }

   

    createHistoriqueAvenant(): void {
        console.log("============================", this.adherentForm.value);
        const adherantFamille: AdherentFamille = {};
        adherantFamille.adherent = this.adherentForm.value;
        adherantFamille.adherent.groupe = this.customForm.controls.groupe.value;
        adherantFamille.famille = this.familys.value;
        adherantFamille.famille.forEach(f => {
            f.adherentPrincipal = null;
            f.groupe = this.customForm.controls.groupe.value;
        });
        this.adherentFamilleListe.push(adherantFamille);
        this.adherentForm.reset();
        this.familys.reset();
        this.familys.clear();
        this.adherentSelected = {};
        console.log('*****-this.adherentFamilleListe---', this.adherentFamilleListe);
        console.log(adherantFamille);
        console.log('***************-------------------------');
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
            id: adherent?.id,
            nom: adherent?.nom,
            prenom: adherent?.prenom,
            dateNaissance: adherent?.dateNaissance,
            matriculeGarant: adherent?.matriculeGarant,
            lieuNaissance: adherent?.lieuNaissance,
            numeroTelephone: adherent?.numeroTelephone,
            adresse: adherent?.adresse,
            adresseEmail: adherent?.adresseEmail,
            profession: adherent?.profession,
            referenceBancaire: adherent?.referenceBancaire,
            qualiteAssure: adherent?.qualiteAssure,
            genre: adherent?.genre,
            dateEntree: adherent?.dateEntree,
            dateIncorporation: adherent?.dateIncorporation,
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
                console.log('***************B******************* ', this.adherentFamilleListe);
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
        if (this.exerciceForm.get('debut').value) {
            this.historiqueAvenantService.compareDate(this.myForm.get('dateIncorparation').value, this.exerciceForm.get('debut').value).subscribe(
                (res) => {
                    if (res) {
                        this.addMessage('error', 'Date d\'effet invalide',
                            'La date d\'effet de l\'avenant de peut pas être postérieure à celle de la police');
                        this.myForm.patchValue({dateIncorparation: null});
                    } 
                    if(new Date(this.myForm.get('dateIncorparation').value)?.getTime() > new Date(this.exerciceForm.get('fin').value)?.getTime() ) {
                        this.addMessage('error', 'Date d\'effet invalide',
                                  'La date d\'effet de l\'avenant de peut pas être antérieure à celle de la police');
                              this.myForm.patchValue({dateIncorparation: null});
                      }
                }
            );
        }
    }

    compareDateavenant(): void {
     
        if (this.lastExerciceForm.get('debut').value) {
            console.log(this.lastExerciceForm.get('debut').value);
            if(new Date(this.myForm.get('dateAvenant').value)?.getTime() < new Date(this.lastExerciceForm.get('debut')?.value).getTime() ) {
                this.addMessage('error', 'Date d\'effet invalide',
                            'La date d\'effet de l\'avenant de peut pas être postérieure à celle de la police');
                      this.myForm.patchValue({dateAvenant: null});
              }
            if(new Date(this.myForm.get('dateAvenant').value)?.getTime() > new Date(this.lastExerciceForm.get('fin').value)?.getTime() ) {
                this.addMessage('error', 'Date d\'effet invalide',
                          'La date d\'effet de l\'avenant de peut pas être antérieure à celle de la police');
                      this.myForm.patchValue({dateAvenant: null});
              }
        }
    }

    addMessage(severite: string, resume: string, detaile: string): void {
        this.messageService.add({severity: severite, summary: resume, detail: detaile});
    }

    compareDateIncorp(): void {
        this.historiqueAvenantService.compareDate(this.adherentForm.get('dateIncorporation').value, this.myForm.get('dateIncorparation').value).subscribe(
            (res) => {
                if (res) {
                    this.addMessage('error', 'Date d\'incorporation invalide',
                        'La date d\'incorporation de l\'adherent de peut pas être antérieure à celle de l\'avenant');
                    this.adherentForm.patchValue({dateIncorporation: null});
                }
            }
        );
    }
    compareDateEntreeMembre(): void {
        this.historiqueAvenantService.compareDate(this.adherentForm.get('dateIncorporation').value, this.myForm.get('dateIncorporation').value).subscribe(
            (res) => {
                if (res) {
                    this.addMessage('error', 'Date d\'incorporation invalide',
                        'La date d\'incorporation de l\'adherent de peut pas être antérieure à celle de l\'avenant');
                    this.adherentForm.patchValue({dateIncorporation: null});
                }
            }
        );
    }

    onDemandeurChange(): void { }

    loadActivedExercice(police: Police): void {
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
        console.log('-------------this.curentGroupe--------------------' + this.curentGroupe.id);
        this.adherentPrincipaux = this.adherentPrincipauxTMP.filter(ad => ad.groupe.id === this.curentGroupe?.id);
        if (this.curentGroupe.id != null) {
            /* console.log('-------------groupesInput--------------------' + this.groupesInput.length);
            this.groupePolicy = this.groupesInput; */
            this.adherentService.getAdherentPrincipauxByGroupe(this.curentGroupe.id).subscribe(
                (res: Adherent[]) => {
                    this.adherentPrincipaux = res;
                    console.log('-------------this.adherentPrincipaux--------------------', this.adherentPrincipaux);
                }
            );
        }
    }
    loadGoupeByPolice(): void {
        if (this.police) {
            this.groupeList$ = this.store.pipe(select(groupeList));
            this.store.dispatch(loadGroupe({policeId: this.police.id}));
            this.groupeList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
                if (value) {
                    this.groupePolicy = value.slice();
                    console.log('.........GRP..........', this.groupePolicy);
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

    updateAvenant(avenantId: string): void {
        if (avenantId && avenantId !== undefined) {
            this.historiqueAvenantService.getsHistoriqueAvenantById(avenantId).subscribe(
                (res: HistoriqueAvenant) => {
                    this.historiqueAvenant1 = res;
                    console.log('this avenant arrived', this.historiqueAvenant1);
                    this.historiqueAvenantAdherants = res.historiqueAvenantAdherants;
                    this.myForm.setValue({
                        id: res.id,
                        numero: res.numero,
                        dateIncorparation: res.dateAvenant,
                        dateAvenant: res.dateAvenant,
                        observation: res.observation,
                        demandeur: res.typeDemandeur,
                        fraisBadges: res.fraisBadges,
                        fraisAccessoires: res.fraisAccessoires,
                        dateSaisie: new Date(res.dateSaisie)
                    });
                    this.exercice = res.exercice;
                    console.log('this update exercice', this.exercice);
                    this.lastExerciceForm.setValue({
                        id: res.exercice.id,
                        debut: res.exercice.debut,
                        fin: res.exercice.fin,
                        actived: res.exercice.actived
                    });
                    /* this.customForm.setValue({
                        groupe: res.groupe.libelle
                    }); */
                    // this.viewListeEdit = true;
                }
            );
            this.viewListeEdit = true;
        }
    }

    listeModifier(event: any): void {
        // this.historiqueAvenant1.typeHistoriqueAvenant = TypeHistoriqueAvenant.INCORPORATION;
        this.historiqueAvenant1.numeroGarant = this.myForm.get('numero').value || 0;
        this.historiqueAvenant1.dateAvenant = this.myForm.get('dateIncorparation').value;
        this.historiqueAvenant1.dateEffet = this.myForm.get('dateAvenant').value;
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
        // this.historiqueAvenant1.exercice = this.exercice;
        this.historiqueAvenant1.fraisBadges = this.myForm.get('fraisBadges').value;
        this.historiqueAvenant1.fraisAccessoires = this.myForm.get('fraisAccessoires').value;
        // this.historiqueAvenant1.groupe = this.curentGroupe;
        this.historiqueAvenant1.historiqueAvenantAdherants = event;
        console.log('..... Liste modifier .....', this.historiqueAvenant1);
        this.adherentFamilleEvent.emit(this.historiqueAvenant1);
        this.init();
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

      findAdherentListByExerciceId(curentExercice: Exercice) {
        console.log('currentExercice === ', curentExercice);
        /* this.adherentService.findAdherantActuallListByExerciceId(currentExercice.id).subscribe(
          (res) => {
            console.log('---------- Actual Liste by Exrcice Id ----------');
            console.log(res);
            this.adherentsListeActuelleByExercice = res;
            this.adherentsListeActuelleByExerciceRetirer = res.filter(e => e.signeAdherent === "-");
            this.displayALA = true;
          }
      ); */
      }

      onExerciceChange(): void {
        console.log('curent exo === ');
        console.log(this.curentExercice.id);
        console.log("this.adherentPrincipaux", this.adherentPrincipaux);
        console.log("this.adherentPrincipaux2", this.adherentPrincipaux2);
        this.adherentPrincipaux2 = this.adherentPrincipaux.filter(ad => ad.exercice.id === this.curentExercice.id);
        console.log('adherentPrincipaux2 === ', this.adherentPrincipaux2);
     }
     

     /* onBasicUpload(event, form) {
    
  
        this.adherentForm.value.demo.append('fileArray', event.files[0], event.files[0].name);
        console.log("============================", this.adherentForm.value.demo?.name);
        form.clear();
       

      } */

}
