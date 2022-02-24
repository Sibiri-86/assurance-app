import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import {
  ControlContainer,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormArray
} from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { takeUntil } from 'rxjs/operators';
import * as tierPayantSelector from '../../../../store/prestation/tierPayant/selector';
import * as prefinancementActions from '../../../../store/prestation/prefinancement/action';
import { loadMedecin} from '../../../../store/parametrage/medecin/actions';
import * as medecinSelector from '../../../../store/parametrage/medecin/selector';
import {medecinList} from '../../../../store/parametrage/medecin/selector';
import { loadActe } from '../../../../store/parametrage/acte/actions';
import * as acteSelector from '../../../../store/parametrage/acte/selector';
import { loadPathologie } from 'src/app/store/parametrage/pathologie/actions';
import * as pathologieSelector from '../../../../store/parametrage/pathologie/selector';
import { loadProduitPharmaceutique } from 'src/app/store/parametrage/produit-pharmaceutique/actions';
import * as produitPharmaceutiqueSelector from 'src/app/store/parametrage/produit-pharmaceutique/selector';
import { Acte } from 'src/app/store/parametrage/acte/model';
import { Garantie } from 'src/app/store/parametrage/garantie/model';
import { element } from 'protractor';
import { Prestataire } from 'src/app/store/parametrage/prestataire/model';
import { Medecin } from 'src/app/store/parametrage/medecin/model';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { Adherent } from 'src/app/store/contrat/adherent/model';
import * as featureActionAdherent from '../../../../store/contrat/adherent/actions';
import * as featureActionTierPayant from '../../../../store/prestation/tierPayant/action';
import * as adherentSelector from '../../../../store/contrat/adherent/selector';
import { CheckPrefinancementResult, Prefinancement, Prestation } from 'src/app/store/prestation/prefinancement/model';
import { Status } from 'src/app/store/global-config/model';
import { status } from '../../../../store/global-config/selector';
import { TypeEtatSinistre } from '../../../common/models/enum.etat.sinistre';
import { printPdfFile } from 'src/app/module/util/common-util';
import { TypeReport } from 'src/app/store/contrat/enum/model';
import { Report } from 'src/app/store/contrat/police/model';
import { Dialog } from 'primeng/dialog/dialog';
import { BreadcrumbService } from 'src/app/app.breadcrumb.service';
import { formatDate } from '@angular/common';
import {SinistreTierPayant} from '../../../../store/prestation/tierPayant/model';

@Component({
  selector: 'app-consultation-sinistre',
  templateUrl: './sinistre-Tiers-Payant-consultation.component.html',
  styleUrls: ['./sinistre-Tiers-Payant-consultation.component.scss']
})
export class SinistreTiersPayantConsultationComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();
  matricule: number;
  dateSoins: Date;
  cols: any;
  sinistreTierPayantDTOList$: Observable<Array<SinistreTierPayant>>;
  sinistreTierPayantDTOList: Array<SinistreTierPayant>;
  report: Report = {};
  prestationForm: FormGroup;
  displayFormPrefinancement = false;
  adherentSelected: Adherent;
  selectPrefinancement: SinistreTierPayant;

  constructor( private store: Store<AppState>,
               private confirmationService: ConfirmationService,
               private formBuilder: FormBuilder,  private messageService: MessageService,  private breadcrumbService: BreadcrumbService) {
     this.breadcrumbService.setItems([{ label: 'Sinistre-Tiers-Payant | Consultation' }]);
}

get prestation() {
  return this.prestationForm.controls.prestation as FormArray;
 }

createItem(): FormGroup {
  return this.formBuilder.group({
    id: new FormControl(),
    nombreActe: new FormControl('', [Validators.required]),
    coutUnitaire: new FormControl('', [Validators.required]),
    debours: new FormControl(),
    sousActe: new FormControl([Validators.required]),
    baseRemboursement: new FormControl(),
    taux: new FormControl(),
    montantRembourse: new FormControl(),
    sort: new FormControl(),
    montantRestant: new FormControl(),
    observation: new FormControl(),
    prestataire: new FormControl(),
    centreExecutant: new FormControl(),
    produitPharmaceutique: new FormControl(),
    pathologie: new FormControl(),
    dateSoins: new FormControl('', [Validators.required]),
    acte: new FormControl(),
    medecin: new FormControl()
  });
  }

  ngOnInit(): void {

    this.prestationForm = this.formBuilder.group({
      // domaine: new FormControl({}),
      id: new FormControl(),
      referenceSinistreGarant: new FormControl(),
      referenceBordereau: new FormControl(),
      dateSaisie: new FormControl(),
      dateDeclaration: new FormControl(),
      matriculeAdherent: new FormControl(),
      nomAdherent: new FormControl(),
      prenomAdherent: new FormControl(),
      numeroGroupe: new FormControl(),
      numeroPolice: new FormControl(),
      prestation: this.formBuilder.array([])
    });

    this.prestationForm.get('dateSaisie').setValue(new Date());
    this.store.dispatch(featureActionTierPayant.setReportTierPayant(null));
    this.store.pipe(select(tierPayantSelector.selectByteFile)).pipe(takeUntil(this.destroy$))
        .subscribe(bytes => {
          if (bytes) {
            printPdfFile(bytes);
          }
        });

    this.sinistreTierPayantDTOList$ = this.store.pipe(select(tierPayantSelector.tierPayantList));
    this.store.dispatch(featureActionTierPayant.searchTiersPayant({matricule: null, dateDeclaration: null}));
    this.sinistreTierPayantDTOList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      console.log(value);
      if (value) {
        this.sinistreTierPayantDTOList = value.slice();
      }
    });

    /*this.prefinancementDtoList$ = this.store.pipe(select(prefinancementSelector.prefinancementList));
    this.store.dispatch(featureActionPrefinancement.searchPrefinancement({matricule: null, dateDeclaration: null}));
    this.prefinancementDtoList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      console.log(value);
      if (value) {
        this.prefinancementDtoList = value.slice();
      }
    });*/

  }

  showDialogPlafondMaximized(dialog: Dialog) {
    dialog.maximized = true;
  }

  closeDialog() {
    this.prestationForm.reset();
    this.prestation.clear();
    console.log(this.prestation);
   }

  editerPrestation(pref: SinistreTierPayant) {
    this.selectPrefinancement = pref;
    console.log('*************************pref**************************', pref);
    this.adherentSelected = pref.adherent;
    this.prestationForm.get('referenceBordereau').setValue(pref.referenceBordereau);
    this.prestationForm.get('matriculeAdherent').setValue(pref.adherent.numero);
    this.prestationForm.get('nomAdherent').setValue(pref.adherent.nom);
    this.prestationForm.get('prenomAdherent').setValue(pref.adherent.prenom);
    this.prestationForm.get('numeroGroupe').setValue(pref.adherent.groupe.numeroGroupe);
    this.prestationForm.get('numeroPolice').setValue(pref.adherent.groupe.police.numero);
    this.prestationForm.get('dateDeclaration').setValue(new Date(pref.dateDeclaration));
    // this.prestationForm.get('dateSoins').setValue(new Date(pref.dateSoins));
    this.prestationForm.get('dateSaisie').setValue(new Date(pref.dateSaisie));
    for (const pr of pref.prestation) {
    const formPrestation: FormGroup = this.createItem();
    formPrestation.patchValue(pr);
    formPrestation.get('dateSoins').setValue(new Date(pr.dateSoins));
    formPrestation.get('debours').setValue(pr.debours);
    formPrestation.get('taux').setValue(pr.taux);
    formPrestation.get('montantRembourse').setValue(pr.montantRembourse);
    formPrestation.get('baseRemboursement').setValue(pr.baseRemboursement);
    this.prestation.push(formPrestation);
    }
    this.displayFormPrefinancement = true;
    this.prestationForm.disable();
  }

  imprimer(pref: SinistreTierPayant) {
    this.report.typeReporting = TypeReport.TIERPAYANT_FICHE_DETAIL_REMBOURSEMENT;
    this.report.sinistreTierPayantDTO = pref;
    this.store.dispatch(featureActionTierPayant.FetchReportTierPayant(this.report));
  }

  rechercherSinistre() {
    console.log('**********************************matricule******************' + this.matricule);
    console.log('**********************************dateSoins******************' + this.dateSoins);
    let dateS = null;
    if (this.dateSoins){
      dateS =  formatDate(this.dateSoins, 'dd/MM/yyyy', 'en-fr');
    }
    this.store.dispatch(featureActionTierPayant.searchTiersPayant({matricule: this.matricule,
      dateDeclaration: dateS}));
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}
