import { Component, OnInit } from '@angular/core';
import { Observable, of, Subject } from "rxjs";
import {
  ControlContainer,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { select, Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.state";
import { loadSousActe } from "../../../../store/parametrage/sous-acte/actions";
import * as sousActeSelector from "../../../../store/parametrage/sous-acte/selector";
import { takeUntil } from "rxjs/operators";
import { SousActe } from 'src/app/store/parametrage/sous-acte/model';
import { Taux } from "../../../../store/parametrage/taux/model";
import { loadTaux } from "../../../../store/parametrage/taux/actions";
import * as tauxSelector from "../../../../store/parametrage/taux/selector";
import { Sort } from '../../../common/models/sort.enum';

import { loadGarantie } from "../../../../store/parametrage/garantie/actions";
import * as garantieSelector from "../../../../store/parametrage/garantie/selector";

import { loadPrestataire} from "../../../../store/parametrage/prestataire/actions";
import * as prestataireSelector from "../../../../store/parametrage/prestataire/selector";

import * as prefinancementSelector from '../../../../store/prestation/prefinancement/selector';
import * as prefinancementActions from '../../../../store/prestation/prefinancement/action';

import { loadMedecin} from "../../../../store/parametrage/medecin/actions";
import * as medecinSelector from "../../../../store/parametrage/medecin/selector";
import {medecinList} from "../../../../store/parametrage/medecin/selector";

import { loadActe } from "../../../../store/parametrage/acte/actions";
import * as acteSelector from "../../../../store/parametrage/acte/selector";

import { Acte } from 'src/app/store/parametrage/acte/model';
import { Garantie } from 'src/app/store/parametrage/garantie/model';
import { element } from 'protractor';
import { Prestataire } from 'src/app/store/parametrage/prestataire/model';
import { Medecin } from 'src/app/store/parametrage/medecin/model';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { Adherent } from 'src/app/store/contrat/adherent/model';
import * as featureActionAdherent from "../../../../store/contrat/adherent/actions";
import * as featureActionPrefinancement from '../../../../store/prestation/prefinancement/action';
import * as adherentSelector from "../../../../store/contrat/adherent/selector";
import { OrdreReglementList, Prefinancement, Prestation } from 'src/app/store/prestation/prefinancement/model';
import { OrdreReglement } from 'src/app/store/prestation/tierPayant/model';
import { Status } from 'src/app/store/global-config/model';
import { status } from "../../../../store/global-config/selector";
import { TypeEtatSinistre } from '../../../common/models/enum.etat.sinistre';
import { TypeEtatOrdreReglement } from 'src/app/module/common/models/emum.etat.ordre-reglement';
import { printPdfFile } from 'src/app/module/util/common-util';
import { Report } from 'src/app/store/contrat/police/model';
import { TypeReport } from 'src/app/store/contrat/enum/model';
import * as tierPayantSelector from '../../../../store/prestation/tierPayant/selector';
import * as featureActionTierPayant from '../../../../store/prestation/tierPayant/action';

@Component({
  selector: 'app-ordre-reglement-edition',
  templateUrl: './ordre-reglement-tier-payant-edition.component.html',
  styleUrls: ['./ordre-reglement-tier-payant-edition.component.scss']
})
export class OrdreReglementTierPayantEditionComponent implements OnInit {
  destroy$ = new Subject<boolean>();
  ordreReglementList: Array<OrdreReglement>;
  ordreReglementList$: Observable<Array<OrdreReglement>>;
  cols: any[];
  displaySinistre = false;
  prefinancement: Array<Prefinancement>;
  report: Report = {};
  selectedOrdreReglement: OrdreReglement [];

  constructor(private store: Store<AppState>,
              private confirmationService: ConfirmationService,
              private formBuilder: FormBuilder,  private messageService: MessageService) { }

  ngOnInit(): void {
    
    this.store.dispatch(featureActionPrefinancement.setReportPrestation(null));
    this.store.pipe(select(prefinancementSelector.selectByteFile)).pipe(takeUntil(this.destroy$))
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

  validerOrdreReglement(ordre: OrdreReglement){
    this.confirmationService.confirm({
      message: 'voulez-vous annuler cet ordre de reglement',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(featureActionPrefinancement.validerOrdreReglement({ordre, etat: TypeEtatOrdreReglement.VALIDE}));
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
          this.store.dispatch(featureActionPrefinancement.deleteOrdreDeReglement({ordreReglement: this.selectedOrdreReglement}));
      }
     });
    }
  }

  showToast(severity: string, summary: string, detail: string) {
    this.messageService.add({ severity, summary, detail });
  }

  imprimer(pref: OrdreReglement) {
    this.report.typeReporting = TypeReport.ORDRE_REGLEMENT;
    this.report.ordreReglementDto = pref;
    this.store.dispatch(featureActionPrefinancement.FetchReportPrestation(this.report));
  }

  voirSinistre(ordre: OrdreReglement) {
    this.displaySinistre = true;
    // this.prefinancement = ordre.prefinancement;
  }

}
