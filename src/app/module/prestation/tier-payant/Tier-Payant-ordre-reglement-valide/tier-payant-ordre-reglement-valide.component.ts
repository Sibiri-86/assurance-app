import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { takeUntil } from 'rxjs/operators';
import * as tierPayantSelector from '../../../../store/prestation/tierPayant/selector';
import { ConfirmationService, MessageService } from 'primeng/api';
import * as featureActionTierPayant from '../../../../store/prestation/tierPayant/action';
import { OrdreReglement, Prefinancement } from 'src/app/store/prestation/prefinancement/model';
import { printPdfFile } from 'src/app/module/util/common-util';
import { Report } from 'src/app/store/contrat/police/model';
import {OrdreReglementTierPayant, Prestation, SinistreTierPayant} from '../../../../store/prestation/tierPayant/model';
import {TypeReport} from '../../../../store/contrat/enum/model';
import {TypeEtatOrdreReglement} from '../../../common/models/emum.etat.ordre-reglement';
import {BreadcrumbService} from '../../../../app.breadcrumb.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-ordre-reglement-valide',
  templateUrl: './tier-payant-ordre-reglement-valide.component.html',
  styleUrls: ['./tier-payant-ordre-reglement-valide.component.scss']
})
export class TierPayantOrdreReglementValideComponent implements OnInit {
  destroy$ = new Subject<boolean>();
  ordreReglementList: Array<OrdreReglementTierPayant>;
  ordreReglementList$: Observable<Array<OrdreReglementTierPayant>>;
  cols: any[];
  displaySinistre = false;
  sinistreTierPayant: Array<SinistreTierPayant>;
  prestations: Array<Prestation>;
  report: Report = {};
  dateDebut: any;
  dateFin: any;

  constructor(private store: Store<AppState>,
              private confirmationService: ConfirmationService,
              private messageService: MessageService, private breadcrumbService: BreadcrumbService) {
  this.breadcrumbService.setItems([{ label: 'TIERS PAYANT | ORDRE DE PAIEMENT VALIDE' }]);
}

  ngOnInit(): void {
    this.dateDebut = new Date();
    this.dateFin = new Date();
    this.store.dispatch(featureActionTierPayant.setReportTierPayant(null));
    this.store.pipe(select(tierPayantSelector.selectByteFile)).pipe(takeUntil(this.destroy$))
        .subscribe(bytes => {
          if (bytes) {
            printPdfFile(bytes);
          }
        });

    /**this.ordreReglementList$ = this.store.pipe(select(tierPayantSelector.ordreReglementTierPayantList));
    this.store.dispatch(featureActionTierPayant.loadTierPayantOrdreReglementValide());
    this.ordreReglementList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      console.log(value);
      if (value) {
        this.ordreReglementList = value.slice();
    }
    });*/

    this.ordreReglementList$ = this.store.pipe(select(tierPayantSelector.ordreReglementTierPayantList));
    if(this.dateDebut.getTime()> this.dateFin.getTime()) {
      this.addMessage('error', 'Dates invalides',
      'La date de debut ne peut pas être supérieure à celle du de fin');
    } else {
      this.store.dispatch(featureActionTierPayant.loadTierPayantOrdreReglementValideByPeriode({dateD: formatDate(this.dateDebut, 'dd/MM/yyyy', 'en-fr'),
      dateF: formatDate(this.dateFin, 'dd/MM/yyyy', 'en-fr')}));
    }
    
    this.ordreReglementList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      console.log(value);
      if (value) {
        this.ordreReglementList = value.slice();
      }
    });
  }

  addMessage(severite: string, resume: string, detaile: string): void {
    this.messageService.add({severity: severite, summary: resume, detail: detaile});
  }

  deValiderOrdreReglement(ordre: OrdreReglementTierPayant) {
    this.confirmationService.confirm({
      message: 'voulez-vous annuler cet ordre de reglement',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(featureActionTierPayant.deValiderOrdreReglementByPeriode({ordre, etat: TypeEtatOrdreReglement.DEVALIDE, dateD: formatDate(this.dateDebut, 'dd/MM/yyyy', 'en-fr'),
        dateF: formatDate(this.dateFin, 'dd/MM/yyyy', 'en-fr')}));
      },
    });
  }

  rechercherPrefinancementByPeriode() {
    if(this.dateDebut.getTime()> this.dateFin.getTime()) {
      this.addMessage('error', 'Dates invalides',
      'La date de debut ne peut pas être supérieure à celle du de fin');
    } else {
      this.store.dispatch(featureActionTierPayant.loadTierPayantOrdreReglementValideByPeriode({dateD: formatDate(this.dateDebut, 'dd/MM/yyyy', 'en-fr'),
      dateF: formatDate(this.dateFin, 'dd/MM/yyyy', 'en-fr')}));
    }
    
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
