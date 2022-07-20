import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Adherent, AdherentFamille} from '../../../../store/contrat/adherent/model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import * as qualiteAssureSelector from '../../../../store/parametrage/qualite-assure/selector';
import {loadQualiteAssure} from '../../../../store/parametrage/qualite-assure/actions';
import {takeUntil} from 'rxjs/operators';
import * as genreSelector from '../../../../store/parametrage/genre/selector';
import {loadGenre} from '../../../../store/parametrage/genre/actions';
import * as professionSelector from '../../../../store/parametrage/profession/selector';
import {loadProfession} from '../../../../store/parametrage/profession/actions';
import {Profession} from '../../../../store/parametrage/profession/model';
import {Observable, Subject} from 'rxjs';
import {QualiteAssure} from '../../../../store/parametrage/qualite-assure/model';
import {Genre} from '../../../../store/parametrage/genre/model';
import {AppState} from '../../../../store/app.state';
import {HistoriqueAvenantAdherant} from '../../../../store/contrat/historiqueAvenant/model';
import {Groupe} from '../../../../store/contrat/groupe/model';
import {loadGroupe} from '../../../../store/contrat/groupe/actions';
import {groupeList} from '../../../../store/contrat/groupe/selector';
import {AdherentService} from '../../../../store/contrat/adherent/service';

@Component({
  selector: 'app-adherent-list-edit',
  templateUrl: './adherent-list-edit.component.html',
  styleUrls: ['./adherent-list-edit.component.scss']
})
export class AdherentListEditComponent implements OnInit {

  @Input() historiqueAvenantAdherants: Array<HistoriqueAvenantAdherant>;
  @Output() historiqueAvenantAdherantList = new EventEmitter();
  @Input() statut: string;
  adherentList: Array<Adherent>;
  adherentForm: FormGroup;
  professionList: Array<Profession>;
  professionList$: Observable<Array<Profession>>;
  qualiteAssureList1: Array<QualiteAssure>;
  qualiteAssureList2: Array<QualiteAssure>;
  qualiteAssureList$: Observable<Array<QualiteAssure>>;
  destroy$ = new Subject<boolean>();
  genreList: Array<Genre>;
  genreList$: Observable<Array<Genre>>;
  editWiew = false;
  historiqueAvenantAdherantTMPs: Array<HistoriqueAvenantAdherant> = [];
  etat = 'EDIT';
  stat = false;
  groupePolicy: Array<Groupe> = [];
  groupeList$: Observable<Array<Groupe>>;
  groupeList: Array<Groupe>;

  constructor(
      private formBuilder: FormBuilder,
      private store: Store<AppState>,
      private adherentService: AdherentService) {
    this.adherentForm = this.formBuilder.group({
      id: new FormControl(0),
      nom: new FormControl(null, [Validators.required]),
      prenom: new FormControl(null, [Validators.required]),
      dateNaissance: new FormControl(null, [Validators.required]),
      lieuNaissance: new FormControl(null, [Validators.required]),
      numeroTelephone: new FormControl(null, [Validators.required]),
      adresse: new FormControl(null),
      adresseEmail: new FormControl(null, [Validators.email]),
      profession: new FormControl(null, [Validators.required]),
      referenceBancaire: new FormControl(null),
      qualiteAssure: new FormControl(null, [Validators.required]),
      genre: new FormControl(null, [Validators.required]),
      dateIncorporation: new FormControl(null, [Validators.required]),
      dateEntree: new FormControl(null, [Validators.required]),
      // dateIncor: new FormControl(new Date(), [Validators.required]),
      matriculeGarant: new FormControl(null, ),
      matriculeSouscripteur: new FormControl(null, ),
      numero: new FormControl(null, ),
      familys: this.formBuilder.array([]),
      manageIncorporation: new FormControl(1),
      groupe: new FormControl('', [Validators.required]),
      adherentPrincipal: new FormControl('')
    });
  }

  ngOnInit(): void {
    console.log('satus ==== ' + this.statut);
    this.historiqueAvenantAdherantTMPs = this.historiqueAvenantAdherants;
    this.qualiteAssureList$ = this.store.pipe(
        select(qualiteAssureSelector.qualiteAssureList)
    );
    this.store.dispatch(loadQualiteAssure());
    this.qualiteAssureList$
        .pipe(takeUntil(this.destroy$))
        .subscribe((value) => {
          if (value) {
            this.qualiteAssureList1 = value.slice(); // .filter(e => e.code === 'ADHERENT');
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
    this.adherentList = [];
    this.loadGoupeByPolice();
    this.loadAdherentPrincipalByPolice();
    // this.createAdherents();
  }
  /* createAdherents(): void {
    if (this.adherentFamilleList) {
      console.log('--------this.adherentFamilleList.length------');
      console.log(this.adherentFamilleList);
      this.adherentFamilleList.forEach(adherentFamille => {
        this.adherentList.push(adherentFamille.adherent);
        if (adherentFamille.famille) {
          adherentFamille.famille.forEach(ayantDroit => {
            ayantDroit.adherentPrincipal = adherentFamille.adherent;
            this.adherentList.push(ayantDroit);
          });
        }
      });
    }
    if (this.listeAdherent) {
      console.log('--------listeAdherent------');
      console.log(this.listeAdherent.length);
      this.adherentList = this.listeAdherent;
    }
  } */

  edit(historiqueAvenantAdherant: HistoriqueAvenantAdherant): void {
    console.log('***************historiqueAvenantAdherant*********1**********', historiqueAvenantAdherant);
    let group: Groupe = {};
    if (this.groupeList.filter(g => g.id === historiqueAvenantAdherant.adherent?.groupe?.id)) {
      group = this.groupeList.filter(g => g.id === historiqueAvenantAdherant.adherent?.groupe?.id)[0];
    }
    this.adherentForm.patchValue({
      id: historiqueAvenantAdherant.adherent?.id,
      nom: historiqueAvenantAdherant.adherent?.nom,
      prenom: historiqueAvenantAdherant.adherent?.prenom,
      dateNaissance: historiqueAvenantAdherant.adherent?.dateNaissance,
      matriculeGarant: historiqueAvenantAdherant.adherent?.matriculeGarant,
      lieuNaissance: historiqueAvenantAdherant.adherent?.lieuNaissance,
      numeroTelephone: historiqueAvenantAdherant.adherent?.numeroTelephone,
      adresse: historiqueAvenantAdherant.adherent?.adresse,
      adresseEmail: historiqueAvenantAdherant.adherent?.adresseEmail,
      profession: historiqueAvenantAdherant.adherent?.profession,
      referenceBancaire: historiqueAvenantAdherant.adherent?.referenceBancaire,
      qualiteAssure: historiqueAvenantAdherant.adherent?.qualiteAssure,
      genre: historiqueAvenantAdherant.adherent?.genre,
      dateEntree: historiqueAvenantAdherant.adherent?.dateEntree,
      dateIncorporation: historiqueAvenantAdherant.adherent?.dateIncorporation,
      numero: historiqueAvenantAdherant.adherent?.numero,
      groupe: group,
      adherentPrincipal: historiqueAvenantAdherant.adherent.adherentPrincipal,
    });
    this.editWiew = true;
  }

  view(historiqueAvenantAdherant: HistoriqueAvenantAdherant): void {
    console.log('***************historiqueAvenantAdherant*********2**********', historiqueAvenantAdherant);
    let group: Groupe = {};
    if (this.groupeList.filter(g => g.id === historiqueAvenantAdherant.adherent?.groupe?.id)) {
      group = this.groupeList.filter(g => g.id === historiqueAvenantAdherant.adherent?.groupe?.id)[0];
    }
    this.etat = 'VIEW';
    this.stat = true;
    this.adherentForm.patchValue({
      id: historiqueAvenantAdherant.adherent?.id,
      nom: historiqueAvenantAdherant.adherent?.nom,
      prenom: historiqueAvenantAdherant.adherent?.prenom,
      dateNaissance: historiqueAvenantAdherant.adherent?.dateNaissance,
      matriculeGarant: historiqueAvenantAdherant.adherent?.matriculeGarant,
      lieuNaissance: historiqueAvenantAdherant.adherent?.lieuNaissance,
      numeroTelephone: historiqueAvenantAdherant.adherent?.numeroTelephone,
      adresse: historiqueAvenantAdherant.adherent?.adresse,
      adresseEmail: historiqueAvenantAdherant.adherent?.adresseEmail,
      profession: historiqueAvenantAdherant.adherent?.profession,
      referenceBancaire: historiqueAvenantAdherant.adherent?.referenceBancaire,
      qualiteAssure: historiqueAvenantAdherant.adherent?.qualiteAssure,
      genre: historiqueAvenantAdherant.adherent?.genre,
      dateEntree: historiqueAvenantAdherant.adherent?.dateEntree,
      dateIncorporation: historiqueAvenantAdherant.adherent?.dateIncorporation,
      numero: historiqueAvenantAdherant.adherent?.numero,
      groupe: group,
      adherentPrincipal: historiqueAvenantAdherant.adherent.adherentPrincipal,
    });
    this.adherentForm.disable();
    this.editWiew = true;
  }

  addAdherentFamilleToList() {}

  enregistrer(): void {
    const adherent = this.adherentForm.value;
    console.log('****    adhérent form ID ===  ', this.adherentForm.get('id').value);
    this.historiqueAvenantAdherants.forEach(haa => {
      console.log('****    adhérent ID  ===  ', haa.id);
      if (haa.adherent.id === this.adherentForm.get('id').value) {
        console.log('****    adhérent form  ===  ', this.adherentForm.value);
        haa.adherent = {...this.adherentForm.value};
        // haa.adherent.qualiteAssure = this.adherentForm.get('qualiteAssure').value;
        // haa.adherent.genre = this.adherentForm.get('genre').value;
        // haa.adherent.profession = this.adherentForm.get('profession').value;
      }
    });
    console.log(this.historiqueAvenantAdherants);
    this.editWiew = false;
  }

  annuler(): void {
    // this.adherentForm.reset({});
    this.editWiew = false;
  }

  compareDateIncorp(){
  }

  annulerModif(): void {
    this.adherentForm.reset({});
    this.editWiew = false;
    this.historiqueAvenantAdherants = this.historiqueAvenantAdherantTMPs;
  }

  valider(): void {
    this.historiqueAvenantAdherantList.emit(this.historiqueAvenantAdherants);
    // this.annuler();
  }

  loadGoupeByPolice(): void {
    if (this.historiqueAvenantAdherants[0].avenant.police.id) {
      this.groupeList$ = this.store.pipe(select(groupeList));
      this.store.dispatch(loadGroupe({policeId: this.historiqueAvenantAdherants[0].avenant.police.id}));
      this.groupeList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
        if (value) {
          this.groupeList = value.slice();
          console.log(this.groupePolicy);
        }
      });
    }
  }

  loadAdherentPrincipalByPolice(): void {
    if (this.historiqueAvenantAdherants[0].avenant.police.id) {
      this.adherentService.getAdherentPrincipalByPolice(this.historiqueAvenantAdherants[0].avenant.police.id).subscribe(
          (res: Adherent[]) => {
            this.adherentList = res;
          }
      );
    }
  }
}
