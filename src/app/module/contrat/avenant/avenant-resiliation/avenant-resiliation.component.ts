import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Police} from '../../../../store/contrat/police/model';
import {Observable, Subject} from 'rxjs';
import {Groupe} from '../../../../store/contrat/groupe/model';
import {
  HistoriqueAvenant,
  TypeDemandeur, TypeHistoriqueAvenant
} from '../../../../store/contrat/historiqueAvenant/model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../../store/app.state';
import {ConfirmationService, MessageService} from 'primeng/api';
import {HistoriqueAvenantService} from '../../../../store/contrat/historiqueAvenant/service';
import {AdherentService} from '../../../../store/contrat/adherent/service';
import * as exerciceSelector from '../../../../store/contrat/exercice/selector';
import * as featureExerciceAction from '../../../../store/contrat/exercice/actions';
import {takeUntil} from 'rxjs/operators';
import {Exercice} from '../../../../store/contrat/exercice/model';

@Component({
  selector: 'app-avenant-resiliation',
  templateUrl: './avenant-resiliation.component.html',
  styleUrls: ['./avenant-resiliation.component.scss']
})
export class AvenantResiliationComponent implements OnInit {

  @Input() police: Police;
  @Output() eventEmitterResiliation = new EventEmitter();
  destroy$ = new Subject<boolean>();
  groupe: Groupe;
  myForm: FormGroup;
  historiqueAvenant: HistoriqueAvenant = {};
  @Input() isRenouv: boolean;
  demandeursList: any = [
    {libelle: 'VIMSO', value: TypeDemandeur.VIMSO},
    {libelle: 'SOUSCRIPTEUR', value: TypeDemandeur.SOUSCRIPTEUR},
    {libelle: 'GARANT', value: TypeDemandeur.GARANT}
  ];
  exercice$: Observable<Exercice>;
  private exercice: Exercice;
  private exerciceForm: FormGroup;

  constructor(
      private store: Store<AppState>,
      private messageService: MessageService,
      private confirmationService: ConfirmationService,
      private historiqueAvenantService: HistoriqueAvenantService,
      private adherentService: AdherentService,
      private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.init();
    this.loadActivedExercice(this.police);
  }
  init() {
    this.myForm = this.formBuilder.group({
      numero: new FormControl(null, [Validators.required]),
      dateAvenant: new FormControl(null, [Validators.required]),
      observation: new FormControl(null),
      typeDemandeur: new FormControl(null, [Validators.required]),
      demandeur: new FormControl(null, [Validators.required]),
    });
    this.exerciceForm = this.formBuilder.group({
      debut: new FormControl(''),
      fin: new FormControl('', [Validators.required]),
      actived: new FormControl('', [Validators.required]),
    });
  }

  createAvenantSuspension(): void {
    this.historiqueAvenant.dateAvenant = this.myForm.get('dateAvenant').value;
    this.historiqueAvenant.numero = this.myForm.get('numero').value;
    this.historiqueAvenant.groupe = this.groupe;
    this.historiqueAvenant.typeHistoriqueAvenant = TypeHistoriqueAvenant.RESILIATION;
    this.historiqueAvenant.observation = this.myForm.get('observation').value;
    this.historiqueAvenant.typeDemandeur = this.myForm.get('typeDemandeur').value;
    this.eventEmitterResiliation.emit(this.historiqueAvenant);
    this.init();
  }

  onDemandeurChange(): void {
    this.myForm.patchValue({
      typeDemandeur: this.myForm.get('demandeur').value.value
    });
    console.log(this.myForm.get('typeDemandeur').value);
  }

  compareDate(): void {
    this.historiqueAvenantService.compareDate(this.myForm.get('dateAvenant').value, this.police.dateEffet).subscribe(
        (res) => {
          if (res) {
            this.addMessage('error', 'Date d\'effet invalide',
                'La date d\'effet de l\'avenant de peut pas être postérieure à celle de la police');
            this.myForm.patchValue({dateAvenant: null});
          }
        }
    );
  }

  addMessage(severite: string, resume: string, detaile: string): void {
    this.messageService.add({severity: severite, summary: resume, detail: detaile});
  }

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
}
