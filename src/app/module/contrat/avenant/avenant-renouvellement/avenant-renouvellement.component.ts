import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Adherent, AdherentFamille} from '../../../../store/contrat/adherent/model';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Police} from '../../../../store/contrat/police/model';

@Component({
    selector: 'app-avenant-renouvellement',
    templateUrl: 'avenant-renouvellement.component.html',
    styleUrls: ['avenant-renouvellement.component.scss']
})
export class AvenantRenouvellementComponent implements OnInit{

    // @Input groupe: Groupe;
    @Output() adherentFamilleEvent = new EventEmitter();
    // @Input() groupe: Groupe;
   //  newgroupe: Groupe;
    adherentForm: FormGroup;
    adherentListGroupe: Array<Adherent>;
    adherentFamille: AdherentFamille;
    familles: Array<Adherent>;
    newForm: FormGroup;
    genreList: any;
    professionList: any;
    qualiteAssureList: any;
	police: Police[] = [];

    init(): void {
        // console.log(this.groupe);
        // this.adherentFamille = null;
        // this.historiqueAvenant = {};
        this.familles = [];
        this.adherentFamille =  {
            adherent: {},
            famille: []
        };

        this.adherentListGroupe = [];
    }
    constructor(private formBuilder: FormBuilder) {
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
    }

    ngOnInit(): void {this.init(); }

    addAdherentFamilleToList(): void {
        const adherantFamille: AdherentFamille = {};
        adherantFamille.adherent = this.adherentForm as Adherent;
        adherantFamille.famille = this.adherentForm.controls.familys.value;
        console.log('+++++++++++++++++++++++++');
        console.log(adherantFamille);
        this.adherentFamilleEvent.emit(adherantFamille);
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
            profession: new FormControl('', [Validators.required]),
            referenceBancaire: new FormControl(''),
            qualiteAssure: new FormControl('', [Validators.required]),
            genre: new FormControl('', [Validators.required]),
            dateIncorporation: new FormControl('', [Validators.required]),
            dateEntree: new FormControl('', [Validators.required]),
            dateIncor: new FormControl(new Date(), [Validators.required]),
        });
    }

}
