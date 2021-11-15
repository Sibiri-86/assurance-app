import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Adherent, AdherentFamille} from '../../../../store/contrat/adherent/model';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-avenant-incorporation',
    templateUrl: 'avenant-incorporation.component.html',
    styleUrls: ['avenant-incorporation.component.scss']
})
export class AvenantIncorporationComponent implements OnInit{

    // @Input groupe: Groupe;
    @Output() adherentFamilleEvent = new EventEmitter();
   //  newgroupe: Groupe;
    adherentForm: FormGroup;
    adherentFamilleForm: FormGroup;
    adherentListGroupe: Array<Adherent>;
    adherentFamille: AdherentFamille;
    familles: Array<Adherent>;

    init(): void {
        // this.adherentFamille = null;
        // this.adherentFamille = null;
        this.adherentListGroupe = [];

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
            profession: new FormControl("", [Validators.required]),
            referenceBancaire: new FormControl(""),
            qualiteAssure: new FormControl("", [Validators.required]),
            genre: new FormControl("", [Validators.required]),
            dateIncorporation: new FormControl("", [Validators.required]),
            dateEntree: new FormControl("", [Validators.required])
        });
    }
    constructor(private formBuilder: FormBuilder) {}

    ngOnInit(): void {this.init(); }

    addAdherentFamilleToList(): void {
        const adherant = this.adherentForm as Adherent;
        this.adherentFamille.adherent = this.adherentForm as Adherent;
        this.adherentFamille.famille = this.familles;
        this.adherentFamilleEvent.emit(this.adherentFamille);
    }

}
