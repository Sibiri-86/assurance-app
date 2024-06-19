import { Component, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import {
  ControlContainer,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { takeUntil } from 'rxjs/operators';

import * as prefinancementSelector from '../../../store/prestation/prefinancement/selector';



import { Acte } from 'src/app/store/parametrage/acte/model';
import { Garantie } from 'src/app/store/parametrage/garantie/model';
import { element } from 'protractor';
import { Prestataire } from 'src/app/store/parametrage/prestataire/model';
import { Medecin } from 'src/app/store/parametrage/medecin/model';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { Adherent } from 'src/app/store/contrat/adherent/model';

import { OrdreReglement, OrdreReglementList, Prefinancement, Prestation } from 'src/app/store/prestation/prefinancement/model';

import { TypeEtatOrdreReglement } from 'src/app/module/common/models/emum.etat.ordre-reglement';
import { printExcelfFile, printPdfFile } from 'src/app/module/util/common-util';
import { Report } from 'src/app/store/contrat/police/model';
import { TypeReport } from 'src/app/store/contrat/enum/model';
import { BreadcrumbService } from 'src/app/app.breadcrumb.service';
import * as featureActionPrefinancement from '../../../store/prestation/prefinancement/action';
import { formatDate } from '@angular/common';
import { DepenseFamilleService } from 'src/app/store/reporting/depense-famille/service';


@Component({
  selector: 'app-ordre-paiement-instance',
  templateUrl: './ordre-paiement-instance.component.html',
  styleUrls: ['./ordre-paiement-instance.component.scss']
})
export class OrdrePaimentInstanceComponent implements OnInit {
  destroy$ = new Subject<boolean>();
  ordreReglementList: Array<OrdreReglement>;
  ordreReglementList$: Observable<Array<OrdreReglement>>;
  cols: any[];
  displaySinistre = false;
  prefinancement: Array<Prefinancement>;
  report: Report = {};
  clonedPlafondConfiguration: { [s: string]: OrdreReglement } = {};
  dateDebut: any;
  dateFin: any;

  constructor( private store: Store<AppState>,
               private confirmationService: ConfirmationService,
               private formBuilder: FormBuilder,  private messageService: MessageService,
                 private breadcrumbService: BreadcrumbService,
                 private depenseFamilleService: DepenseFamilleService) {
     this.breadcrumbService.setItems([{ label: 'Ordre de paiement en espèce instance' }]);
}

  ngOnInit(): void {
    this.dateDebut = new Date();
    this.dateFin = new Date();
    this.store.dispatch(featureActionPrefinancement.setReportPrestation(null));
    this.store.pipe(select(prefinancementSelector.selectByteFile)).pipe(takeUntil(this.destroy$))
    .subscribe(bytes => {
        if (bytes) {
                printExcelfFile(bytes);
        }
    });

   /*  this.bonPriseEnChargeList$ = this.store.pipe(select(selectorsBonPriseEnCharge.bonPriseEnChargeList));
      if(this.dateDebut.getTime()> this.dateFin.getTime()) {
        this.addMessage('error', 'Dates  invalide',
        'La date de debut ne peut pas être supérieure à celle du de fin');
      } else {
        this.store.dispatch(featureActionBonPriseEnCharge.loadBonPriseEnChargePeriode({dateD: formatDate(this.dateDebut, 'dd/MM/yyyy', 'en-fr'),
        dateF: formatDate(this.dateFin, 'dd/MM/yyyy', 'en-fr')})); 
      }

      this.bonPriseEnChargeList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
        console.log(value);
        if (value) {
          this.bonPriseEnChargeList = value.slice();
          console.log("this.bonPriseEnChargeList=================> ", this.bonPriseEnChargeList);
        }
      }); */ 

    this.ordreReglementList$ = this.store.pipe(select(prefinancementSelector.ordreReglementList));
    if(this.dateDebut.getTime()> this.dateFin.getTime()) {
      this.addMessage('error', 'Dates  invalide',
      'La date de debut ne peut pas être supérieure à celle du de fin');
    } else {
      this.store.dispatch(featureActionPrefinancement.loadOrdrePaiementInstanceByperiode({dateD: formatDate(this.dateDebut, 'dd/MM/yyyy', 'en-fr'),
    dateF: formatDate(this.dateFin, 'dd/MM/yyyy', 'en-fr')})); 
    }
    
    this.ordreReglementList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      console.log(value);
      if (value) {
        this.ordreReglementList = value.slice();
        this.ordreReglementList.forEach(ordr=> {

          ordr.datePaiement = new Date();
        });
    }
    });
  }

  

  imprimer(pref: OrdreReglement) {
    this.report.typeReporting = TypeReport.ORDRE_REGLEMENT;
    this.report.ordreReglementDto = pref;
    this.store.dispatch(featureActionPrefinancement.FetchReportPrestation(this.report));
  }

  paiemrntEspece(ordre: OrdreReglement) {
    this.store.dispatch(featureActionPrefinancement.validerPaiementEspece({ordre: ordre, dateD: formatDate(this.dateDebut, 'dd/MM/yyyy', 'en-fr'),
    dateF: formatDate(this.dateFin, 'dd/MM/yyyy', 'en-fr')}));
    this.addMessage('success', 'Reussite',
      'Ordre de règlement validé avec succès');
  }

  voirSinistre(ordre: OrdreReglement) {
    this.displaySinistre = true;
    this.prefinancement = ordre.prefinancement;
  }


  onRowEditInitOrdreConfiguration(ordre: OrdreReglement) {
    this.clonedPlafondConfiguration[ordre.id] = {...ordre};
  }

  onRowEditSaveOrdreConfiguration(ordre: OrdreReglement) {
    delete this.clonedPlafondConfiguration[ordre.id];
  }

  onRowEditCancelOrdreConfiguration(ordre: OrdreReglement, index: number) {
    this.ordreReglementList[index] = this.clonedPlafondConfiguration[ordre.id];
    delete this.clonedPlafondConfiguration[ordre.id];
  }
  
  addMessage(severite: string, resume: string, detaile: string): void {
    this.messageService.add({severity: severite, summary: resume, detail: detaile});
  }

  rechercherPrefinancementByPeriode() {
    if(this.dateDebut.getTime()> this.dateFin.getTime()) {
      this.addMessage('error', 'Dates  invalide',
      'La date de debut ne peut pas être supérieure à celle du de fin');
    } else {
      this.store.dispatch(featureActionPrefinancement.loadOrdrePaiementInstanceByperiode({dateD: formatDate(this.dateDebut, 'dd/MM/yyyy', 'en-fr'),
      dateF: formatDate(this.dateFin, 'dd/MM/yyyy', 'en-fr')}));
    }
    
  }

  imprimerFormulaireExcel(ordre: OrdreReglement){
    if(this.dateDebut.getTime()> this.dateFin.getTime()) {
      this.addMessage('error', 'Dates  invalide',
      'La date de debut ne peut pas être supérieure à celle du de fin');
    } else {
      this.depenseFamilleService.$getReportConsommationWaveExcel(formatDate(this.dateDebut, 'dd/MM/yyyy', 'en-fr'), formatDate(this.dateFin, 'dd/MM/yyyy', 'en-fr')).subscribe((rest)=>{
          if(rest) {
            printExcelfFile(rest);
          }
          
        });
  }
}
}
