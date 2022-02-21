import { Component, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import {
  FormBuilder,
} from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { takeUntil } from 'rxjs/operators';
import { ConfirmationService, MessageService } from 'primeng/api';
import {OrdreReglementTierPayant, SinistreTierPayant} from 'src/app/store/prestation/tierPayant/model';
import { TypeEtatOrdreReglement } from 'src/app/module/common/models/emum.etat.ordre-reglement';
import { printPdfFile } from 'src/app/module/util/common-util';
import { Report } from 'src/app/store/contrat/police/model';
import { TypeReport } from 'src/app/store/contrat/enum/model';
import * as tierPayantSelector from '../../../../store/prestation/tierPayant/selector';
import * as featureActionTierPayant from '../../../../store/prestation/tierPayant/action';
import * as featureActionPrefinancement from '../../../../store/prestation/prefinancement/action';
import {BreadcrumbService} from '../../../../app.breadcrumb.service';

@Component({
  selector: 'app-ordre-reglement-edition',
  templateUrl: './ordre-reglement-tier-payant-edition.component.html',
  styleUrls: ['./ordre-reglement-tier-payant-edition.component.scss']
})
export class OrdreReglementTierPayantEditionComponent implements OnInit {
  destroy$ = new Subject<boolean>();
  ordreReglementList: Array<OrdreReglementTierPayant>;
  ordreReglementList$: Observable<Array<OrdreReglementTierPayant>>;
  cols: any[];
  displaySinistre = false;
  sinistreTierPayant: Array<SinistreTierPayant>;
  report: Report = {};
  selectedOrdreReglement: OrdreReglementTierPayant [];

  constructor(private store: Store<AppState>,
              private confirmationService: ConfirmationService,
              private formBuilder: FormBuilder,  private messageService: MessageService, private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([{ label: 'TIERS PAYANT | ORDRE DE REGLEMENT EDITION' }]);
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
    this.store.dispatch(featureActionTierPayant.loadOrdreReglementTierPayant());
    this.ordreReglementList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      console.log(value);
      if (value) {
        this.ordreReglementList = value.slice();
      }
    });
  }

  validerOrdreReglement(ordre: OrdreReglementTierPayant){
    this.confirmationService.confirm({
      message: 'voulez-vous valider cet ordre de reglement',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(featureActionTierPayant.validerTierPayantOrdreReglement({ordre, etat: TypeEtatOrdreReglement.VALIDE}));
      },
    });
  }

  supprimerOrdreReglement() {
    if (!this.selectedOrdreReglement) {
      this.showToast('error', 'INFORMATION', 'aucun ordre de reglement selectionné');
    } else {
      this.confirmationService.confirm({
        message: 'voulez-vous supprimer l\'ordre de reglement',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.store.dispatch(featureActionTierPayant.deleteTierPayantOrdreDeReglement({ordreReglement: this.selectedOrdreReglement}));
        }
      });
    }
  }

  showToast(severity: string, summary: string, detail: string) {
    this.messageService.add({ severity, summary, detail });
  }

  imprimer(pref: OrdreReglementTierPayant) {
    this.report.typeReporting = TypeReport.ORDRE_REGLEMENT_TIER_PAYANT;
    this.report.ordreReglementDto = pref;
    this.store.dispatch(featureActionTierPayant.FetchReportTierPayant(this.report));
  }

  voirSinistre(ordre: OrdreReglementTierPayant) {
    console.log('****************ordre****************', ordre);
    this.displaySinistre = true;
    this.sinistreTierPayant = ordre.tierPayant;
    console.log('****************sinistreTierPayant****************', this.sinistreTierPayant);
  }

}
