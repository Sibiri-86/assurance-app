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
import {OrdreReglement, Prestation} from '../../../../store/prestation/prefinancement/model';
import { Router } from '@angular/router';
import { TierPayantService } from 'src/app/store/prestation/tierPayant/service';

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
  sinistreTierPayants: Array<SinistreTierPayant>;
  prestations: Array<Prestation>;
  report: Report = {};
  selectedOrdreReglement: OrdreReglementTierPayant [];
  ordreReglement: OrdreReglementTierPayant;
  showDetailOrdreReglement = false;

  constructor(private store: Store<AppState>,
              private confirmationService: ConfirmationService,private router: Router,
              private formBuilder: FormBuilder,  private messageService: MessageService, 
              private breadcrumbService: BreadcrumbService,private sinistreTiersPayantService: TierPayantService) {
    this.breadcrumbService.setItems([{ label: 'TIERS PAYANT | ORDRE DE PAIEMENT EDITION' }]);
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
      console.log('*********************ordreReglementList**********************',value);
      if (value) {
        this.ordreReglementList = value.slice();
      }
    });
  }

  validerOrdreReglement(ordre: OrdreReglementTierPayant){
    this.sinistreTiersPayantService.findSinistreTierPayantByOrdreReglementTierPayantId(ordre.id).subscribe((res=>{
      console.log('****************res****************', res);
      this.sinistreTierPayants = res;
      console.log('****************prestations****************', this.sinistreTierPayants);
      this.prestations = this.sinistreTierPayants[0].prestation;
      //this.prestations = this.prestations.prestation;
    })); 
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
    this.sinistreTiersPayantService.findSinistreTierPayantByOrdreReglementTierPayantId(ordre.id).subscribe((res=>{
      console.log('****************res****************', res);
      this.sinistreTierPayants = res;
      console.log('****************prestations****************', this.sinistreTierPayants);
      this.prestations = this.sinistreTierPayants[0].prestation;
      //this.prestations = this.prestations.prestation;
    })); 
    this.displaySinistre = true;
    //this.prestations = ordre.tierPayant[0].prestation;
    console.log('****************sinistreTierPayant****************', this.sinistreTierPayant);
  }

  desactiveDialog(event) {
    console.log('desactive dialog');
    this.showDetailOrdreReglement = false;
  }

  consulter(ordre: OrdreReglementTierPayant){
    this.ordreReglement = ordre;
    this.sinistreTiersPayantService.findSinistreTierPayantByOrdreReglementTierPayantId(ordre.id).subscribe((res=>{
      console.log('****************res****************', res);
      this.sinistreTierPayants = res;
      console.log('****************prestations****************', this.sinistreTierPayants);
      this.ordreReglement.tierPayant = this.sinistreTierPayants;
      this.prestations = this.sinistreTierPayants[0].prestation;
      //this.prestations = this.prestations.prestation;
    }));
  
    this.showDetailOrdreReglement = true;
    //console.log('*************************yes1********************' + this.showDetailOrdreReglement);
    //console.log('*************************prestation********************' + this.ordreReglement .tierPayant[0].prestation);

  }

  navigateSinistre() {
    this.router.navigateByUrl('/prestation/tierPayant/ordre-reglement/valide');
  }

  navigateSinistre2() {
    this.router.navigateByUrl('/prestation/tierPayant/valide');
  }

}
