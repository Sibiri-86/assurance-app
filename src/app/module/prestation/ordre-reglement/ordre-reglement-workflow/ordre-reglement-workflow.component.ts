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
import { loadSousActe } from '../../../../store/parametrage/sous-acte/actions';
import * as sousActeSelector from '../../../../store/parametrage/sous-acte/selector';
import { takeUntil } from 'rxjs/operators';
import { SousActe } from 'src/app/store/parametrage/sous-acte/model';
import { Taux } from '../../../../store/parametrage/taux/model';
import { loadTaux } from '../../../../store/parametrage/taux/actions';
import * as tauxSelector from '../../../../store/parametrage/taux/selector';
import { Sort } from '../../../common/models/sort.enum';

import { loadGarantie } from '../../../../store/parametrage/garantie/actions';
import * as garantieSelector from '../../../../store/parametrage/garantie/selector';

import { loadPrestataire} from '../../../../store/parametrage/prestataire/actions';
import * as prestataireSelector from '../../../../store/parametrage/prestataire/selector';

import * as prefinancementSelector from '../../../../store/prestation/prefinancement/selector';
import * as prefinancementActions from '../../../../store/prestation/prefinancement/action';

import { loadMedecin} from '../../../../store/parametrage/medecin/actions';
import * as medecinSelector from '../../../../store/parametrage/medecin/selector';
import {medecinList} from '../../../../store/parametrage/medecin/selector';

import { loadActe } from '../../../../store/parametrage/acte/actions';
import * as acteSelector from '../../../../store/parametrage/acte/selector';

import { Acte } from 'src/app/store/parametrage/acte/model';
import { Garantie } from 'src/app/store/parametrage/garantie/model';
import { element } from 'protractor';
import { Prestataire } from 'src/app/store/parametrage/prestataire/model';
import { Medecin } from 'src/app/store/parametrage/medecin/model';
import { ConfirmationService, MenuItem, MessageService, SelectItem } from 'primeng/api';
import { Adherent } from 'src/app/store/contrat/adherent/model';
import * as featureActionAdherent from '../../../../store/contrat/adherent/actions';
import * as featureActionPrefinancement from '../../../../store/prestation/prefinancement/action';
import * as adherentSelector from '../../../../store/contrat/adherent/selector';
import { OrdreReglement, OrdreReglementList, Prefinancement, Prestation } from 'src/app/store/prestation/prefinancement/model';
import { Status } from 'src/app/store/global-config/model';
import { status } from '../../../../store/global-config/selector';
import { TypeEtatSinistre } from '../../../common/models/enum.etat.sinistre';
import { TypeEtatOrdreReglement, Workflow } from 'src/app/module/common/models/emum.etat.ordre-reglement';
import { printPdfFile } from 'src/app/module/util/common-util';
import { Report } from 'src/app/store/contrat/police/model';
import { TypeReport } from 'src/app/store/contrat/enum/model';
import { BreadcrumbService } from 'src/app/app.breadcrumb.service';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { Function } from 'src/app/module/common/config/role.user';




@Component({
  selector: 'app-ordre-reglement-workflow',
  templateUrl: './ordre-reglement-workflow.component.html',
  styleUrls: ['./ordre-reglement-workflow.component.scss']
})
export class OrdreReglementWorkflowComponent implements OnInit {
  destroy$ = new Subject<boolean>();
  ordreReglementList: Array<OrdreReglement>;
  ordreReglementList$: Observable<Array<OrdreReglement>>;
  cols: any[];
  displaySinistre = false;
  prefinancement: Array<Prefinancement>;
  report: Report = {};
  ordreReglementListMedical: Array<OrdreReglement>;
  ordreReglementListMedical$: Observable<Array<OrdreReglement>>;
  ordreReglementListFinance: Array<OrdreReglement>;
  ordreReglementListFinance$: Observable<Array<OrdreReglement>>;
  ordreReglementListDirection: Array<OrdreReglement>;
  ordreReglementListDirection$: Observable<Array<OrdreReglement>>;
  role ="Function.sm_workflow_prefinancement_prestation";
  constructor( private store: Store<AppState>,
               private confirmationService: ConfirmationService,
               private formBuilder: FormBuilder,  private messageService: MessageService,  private breadcrumbService: BreadcrumbService,
               private router: Router, private keycloak: KeycloakService) {
     this.breadcrumbService.setItems([{ label: 'Validation des ordres de paiement' }]);
}

  ngOnInit(): void {

    this.store.dispatch(featureActionPrefinancement.setReportPrestation(null));
    this.store.pipe(select(prefinancementSelector.selectByteFile)).pipe(takeUntil(this.destroy$))
    .subscribe(bytes => {
        if (bytes) {
                printPdfFile(bytes);
        }
    });

    /* this.ordreReglementListMedical$ = this.store.pipe(select(prefinancementSelector.ordreReglementListMedical));
    this.store.dispatch(featureActionPrefinancement.loadOrdreReglementValideMedical());
    this.ordreReglementListMedical$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      console.log("============>",value);
      if (value) {
        this.ordreReglementListMedical = value.slice();
    }
    }); */

    /* this.ordreReglementListFinance$ = this.store.pipe(select(prefinancementSelector.ordreReglementListFinance));
    this.store.dispatch(featureActionPrefinancement.loadOrdreReglementValideFinance());
    this.ordreReglementListFinance$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      console.log("============>",value);
      if (value) {
        this.ordreReglementListFinance = value.slice();
    }
    }); */
    this.loadOrdreReglement();
    this.loadOrdreReglementFinance();
    this.loadOrdreReglementMedical();
    this.loadOrdreReglementDirection();
    

  }

  loadOrdreReglementFinance() {
    this.ordreReglementListFinance$ = this.store.pipe(select(prefinancementSelector.ordreReglementListFinance));
    this.store.dispatch(featureActionPrefinancement.loadOrdreReglementValideFinance());
    this.ordreReglementListFinance$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      console.log("============>",value);
      if (value) {
        this.ordreReglementListFinance = value.slice();
    }
    });
  }
  loadOrdreReglementMedical() {
    this.ordreReglementListMedical$ = this.store.pipe(select(prefinancementSelector.ordreReglementListMedical));
    this.store.dispatch(featureActionPrefinancement.loadOrdreReglementValideMedical());
    this.ordreReglementListMedical$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      console.log("============>",value);
      if (value) {
        this.ordreReglementListMedical = value.slice();
    }
    });
  }
  loadOrdreReglement() {
    this.ordreReglementList$ = this.store.pipe(select(prefinancementSelector.ordreReglementList));
    this.store.dispatch(featureActionPrefinancement.loadOrdreReglementValide());
    this.ordreReglementList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      console.log(value);
      if (value) {
        this.ordreReglementList = value.slice().filter(p => p.niveauValidation == Workflow.PRESTATION);
    }
    });
  }
  loadOrdreReglementDirection() {
    this.ordreReglementListDirection$ = this.store.pipe(select(prefinancementSelector.ordreReglementListDirection));
    this.store.dispatch(featureActionPrefinancement.loadOrdreReglementValideDirection());
    this.ordreReglementListDirection$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      console.log(value);
      if (value) {
        this.ordreReglementListDirection = value.slice();
    }
    });
  }

  addMessage(severite: string, resume: string, detaile: string): void {
    this.messageService.add({severity: severite, summary: resume, detail: detaile});
  }

 /*  Valider pour atteindre le departement financier et comptable */

  validerOrdreReglementFinance(ordre: OrdreReglement){
    /* this.confirmationService.confirm({
      message: 'voulez-vous valider cet ordre de reglement',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(featureActionPrefinancement.validerOrdreReglementWorkflow({ordre, etat: TypeEtatOrdreReglement.VALIDE, w: Workflow.FINANCE}));
        this.loadOrdreReglementMedical();
      },
    }); */
        this.store.dispatch(featureActionPrefinancement.validerOrdreReglementWorkflow({ordre, etat: TypeEtatOrdreReglement.VALIDE, w: Workflow.FINANCE}));
        this.loadOrdreReglementMedical();
        this.addMessage('success', 'Opération reussie', 'Ordre de paiement envoyé à la finance');
  }

   /*  Devalider pour atteindre la prestation */

   deValiderOrdreReglement(ordre: OrdreReglement) {
    this.confirmationService.confirm({
      message: 'voulez-vous annuler cet ordre de reglement?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(featureActionPrefinancement.deValiderOrdreReglement({ordre, etat: TypeEtatOrdreReglement.DEVALIDE, w: Workflow.PRESTATION}));
      },
    });
  }

  /*  Valider pour atteindre la direction */

  validerOrdreReglementDirection(ordre: OrdreReglement){
    /* this.confirmationService.confirm({
      message: 'voulez-vous valider cet ordre de reglement',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(featureActionPrefinancement.validerOrdreReglementWorkflow({ordre, etat: TypeEtatOrdreReglement.VALIDE, w: Workflow.DIRECTION}));
        this.loadOrdreReglementFinance();
      },
    }); */
        this.store.dispatch(featureActionPrefinancement.validerOrdreReglementWorkflow({ordre, etat: TypeEtatOrdreReglement.VALIDE, w: Workflow.DIRECTION}));
        this.loadOrdreReglementFinance();
        this.addMessage('success', 'Opération reussie', 'Ordre de paiement envoyé à la direction');
  }

  /*  Valider pour atteindre la caisse */

  validerOrdreReglementCaisse(ordre: OrdreReglement){
    /* this.confirmationService.confirm({
      message: 'voulez-vous valider cet ordre de reglement',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(featureActionPrefinancement.validerOrdreReglementWorkflow({ordre, etat: TypeEtatOrdreReglement.VALIDE, w: Workflow.CAISSE}));
        this.loadOrdreReglementDirection();
      },
    }); */
        this.store.dispatch(featureActionPrefinancement.validerOrdreReglementWorkflow({ordre, etat: TypeEtatOrdreReglement.VALIDE, w: Workflow.CAISSE}));
        this.loadOrdreReglementDirection();
        this.addMessage('success', 'Opération reussie', 'Ordre de paiement envoyé à la caisse');
  }

  /*  Valider pour atteindre la Medical */

  validerOrdreReglementMedical(ordre: OrdreReglement){
    /* this.confirmationService.confirm({
      message: 'voulez-vous valider cet ordre de reglement',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(featureActionPrefinancement.validerOrdreReglementWorkflow({ordre, etat: TypeEtatOrdreReglement.VALIDE, w: Workflow.MEDICAL}));
        this.loadOrdreReglement();
      },
    }); */
        this.store.dispatch(featureActionPrefinancement.validerOrdreReglementWorkflow({ordre, etat: TypeEtatOrdreReglement.VALIDE, w: Workflow.MEDICAL}));
        this.loadOrdreReglement();
        this.addMessage('success', 'Opération reussie', 'Ordre de paiement envoyé au médical');
  }
  imprimer(pref: OrdreReglement) {
    this.report.typeReporting = TypeReport.ORDRE_REGLEMENT;
    this.report.ordreReglementDto = pref;
    this.store.dispatch(featureActionPrefinancement.FetchReportPrestation(this.report));
  }

  voirSinistre(ordre: OrdreReglement) {
    this.displaySinistre = true;
    this.prefinancement = ordre.prefinancement;
  }

  navigateSinistre2() {
    this.router.navigateByUrl('/prestation/prefinancement/ordre-reglement');
  }

  onTabChange(event): void {
    var index = event.index;
    console.log('****index****', index);
    switch (index) {
      case 0: {
        this.loadOrdreReglement();
        break;
      }
      case 1: {
        this.loadOrdreReglementMedical();
        break;
      }
      case 2: {
        this.loadOrdreReglementFinance();
        break;
      }
      case 3: {
        this.loadOrdreReglementDirection();
        break;
      }
      default: {
        console.log("We are in default case !!!")
        break;
      }
    }
    
  }

  keycloakRole(){
    this.keycloak.isUserInRole(Function.sm_workflow_prefinancement)
  }

}
