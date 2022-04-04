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
import * as prefinancementSelector from '../../../../store/prestation/prefinancement/selector';
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
import * as featureActionPrefinancement from '../../../../store/prestation/prefinancement/action';
import * as featureActionTierPayant from '../../../../store/prestation/tierPayant/action';
import * as adherentSelector from '../../../../store/contrat/adherent/selector';
import { CheckPrefinancementResult, OrdreReglement, Prefinancement, Prestation } from 'src/app/store/prestation/prefinancement/model';
import { Status } from 'src/app/store/global-config/model';
import { status } from '../../../../store/global-config/selector';
import { TypeEtatSinistre } from '../../../common/models/enum.etat.sinistre';
import { printPdfFile } from 'src/app/module/util/common-util';
import { TypeReport } from 'src/app/store/contrat/enum/model';
import { Report } from 'src/app/store/contrat/police/model';
import { Dialog } from 'primeng/dialog/dialog';
import { BreadcrumbService } from 'src/app/app.breadcrumb.service';
import { formatDate } from '@angular/common';
import { OrdreReglementTierPayant } from 'src/app/store/prestation/tierPayant/model';

@Component({
  selector: 'app-tier-payant-ordre-reglement-search',
  templateUrl: './tier-payant-ordre-reglement-search.component.html',
  styleUrls: ['./tier-payant-ordre-reglement-search.component.scss']
})
export class TierPayantOrdreReglementSearchComponent implements OnInit {
  numero: string;
  date: Date;
  cols: any;
  destroy$ = new Subject<boolean>();
  ordreReglementList: Array<OrdreReglementTierPayant>;
  ordreReglementList$: Observable<Array<OrdreReglementTierPayant>>;
  ordreReglement: OrdreReglementTierPayant;
  showDetailOrdreReglement = false;
  report: Report = {};

  constructor( private store: Store<AppState>,
               private confirmationService: ConfirmationService,
               private formBuilder: FormBuilder,  private messageService: MessageService,  private breadcrumbService: BreadcrumbService) {
this.breadcrumbService.setItems([{ label: 'TIERS-PAYANT | ORDRE DE REGLEMENT CONSULTATION' }]);
}

consulter(ordre: OrdreReglementTierPayant) {
  this.ordreReglement = ordre;
  this.showDetailOrdreReglement = true;
  console.log('*************************yes********************'+ this.showDetailOrdreReglement);
}

rechercherOrdreReglement() {
  let dateS = null;
  if (this.date){
    dateS =  formatDate(this.date, 'dd/MM/yyyy', 'en-fr');
  }
  this.store.dispatch(featureActionTierPayant.searchTierPayantOrdreReglement({numero: this.numero,
    date: dateS}));
}

  ngOnInit(): void {
    this.store.dispatch(featureActionTierPayant.setReportTierPayant(null));
    this.store.pipe(select(tierPayantSelector.selectByteFile)).pipe(takeUntil(this.destroy$))
    .subscribe(bytes => {
        if (bytes) {
                printPdfFile(bytes);
        }
    });
    this.ordreReglementList$ = this.store.pipe(select(tierPayantSelector.ordreReglementTierPayantList));
    this.store.dispatch(featureActionTierPayant.searchTierPayantOrdreReglement({numero: null,
      date: null}));
    this.ordreReglementList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      console.log(value);
      if (value) {
        this.ordreReglementList = value.slice();
      }
    });
    this.numero = null;
    this.date = null;
  }

  desactiveDialog(event) {
    console.log('desactive dialog');
    this.showDetailOrdreReglement = false;
  }

  imprimer(pref: OrdreReglementTierPayant) {
    this.report.typeReporting = TypeReport.ORDRE_REGLEMENT_TIER_PAYANT;
    this.report.ordreReglementDto = pref;
    console.log('*************************pref********************'+ pref);
    this.store.dispatch(featureActionTierPayant.FetchReportTierPayant(this.report));
  }

}
