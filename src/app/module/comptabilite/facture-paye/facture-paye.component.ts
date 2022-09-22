import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { takeUntil } from 'rxjs/operators';
import * as tierPayantSelector from '../../../store/prestation/tierPayant/selector';
import { ConfirmationService, MessageService } from 'primeng/api';
import * as featureActionTierPayant from '../../../store/prestation/tierPayant/action';
import { OrdreReglement, Prefinancement, TypePaiement } from 'src/app/store/prestation/prefinancement/model';
import { printPdfFile } from 'src/app/module/util/common-util';
import { Report } from 'src/app/store/contrat/police/model';
import {OrdreReglementTierPayant, Prestation, SinistreTierPayant} from '../../../store/prestation/tierPayant/model';
import {TypeReport} from '../../../store/contrat/enum/model';
import {TypeEtatOrdreReglement} from '../../common/models/emum.etat.ordre-reglement';
import {BreadcrumbService} from '../../../app.breadcrumb.service';
import { Banque } from 'src/app/store/parametrage/Banques/model';
import * as banqueSelector from '../../../store/parametrage/Banques/selector';
import * as featureActionBanque from '../../../store/parametrage/Banques/actions';

@Component({
  selector: 'app-facture-paye',
  templateUrl: './facture-paye.component.html',
  styleUrls: ['./facture-paye.component.scss']
})
export class FacturePayeComponent implements OnInit {
  destroy$ = new Subject<boolean>();
  ordreReglementList: Array<OrdreReglementTierPayant>;
  ordreReglementList$: Observable<Array<OrdreReglementTierPayant>>;
  cols: any[];
  displaySinistre = false;
  sinistreTierPayant: Array<SinistreTierPayant>;
  prestations: Array<Prestation>;
  report: Report = {};
  displayPaiement = false;
  ordreReglementPaiement: OrdreReglementTierPayant = {};
  banqueList$: Observable<Array<Banque>>;
  banqueList: Array<Banque>;
  typePaiement = Object.keys(TypePaiement).map(key => ({ label: TypePaiement[key], value: key }));


  constructor(private store: Store<AppState>,
              private confirmationService: ConfirmationService,
              private messageService: MessageService, private breadcrumbService: BreadcrumbService) {
  this.breadcrumbService.setItems([{ label: 'Factures payés' }]);
}

  ngOnInit(): void {
    this.store.dispatch(featureActionTierPayant.setReportTierPayant(null));
    this.store.pipe(select(tierPayantSelector.selectByteFile)).pipe(takeUntil(this.destroy$))
        .subscribe(bytes => {
          if (bytes) {
            printPdfFile(bytes);
          }
        });

        this.banqueList$ = this.store.pipe(select(banqueSelector.banqueList));
        this.store.dispatch(featureActionBanque.loadBanque());
        this.banqueList$.pipe(takeUntil(this.destroy$)).subscribe((banque) => {
          
          if (banque) {
         
            this.banqueList = banque.slice();
            
           
          }
        });
    this.ordreReglementList$ = this.store.pipe(select(tierPayantSelector.ordreReglementTierPayantList));
    this.store.dispatch(featureActionTierPayant.loadTierPayantOrdreReglementFacturePaye());
    this.ordreReglementList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      console.log(value);
      if (value) {
        this.ordreReglementList = value.slice();
    }
    });
  }
  paiement(ordre: OrdreReglement) {
    this.displayPaiement = true;
    this.ordreReglementPaiement = ordre;
  }
  deValiderPayement(ordre: OrdreReglementTierPayant) {
    this.confirmationService.confirm({
      message: 'voulez-vous annuler cet ordre de reglement',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(featureActionTierPayant.devaliderPaiement({ordre}));
      },
    });
  }

  imprimer(pref: OrdreReglementTierPayant) {
    this.report.typeReporting = TypeReport.ORDRE_REGLEMENT_TIER_PAYANT;
    this.report.ordreReglementDto = pref;
    this.store.dispatch(featureActionTierPayant.FetchReportTierPayant(this.report));
  }

  paiementCheque() {
    this.store.dispatch(featureActionTierPayant.validerPaiement({ordre: this.ordreReglementPaiement}));
    this.ordreReglementPaiement = {};
    //this.store.dispatch(featureActionPrefinancement.loadOrdrePaiementInstance());
  }
  voirSinistre(ordre: OrdreReglementTierPayant) {
    console.log('****************ordre****************', ordre);
    this.displaySinistre = true;
    this.sinistreTierPayant = ordre.tierPayant;
    console.log('****************sinistreTierPayant****************', this.sinistreTierPayant);
  }

}
