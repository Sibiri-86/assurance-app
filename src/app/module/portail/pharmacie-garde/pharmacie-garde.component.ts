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
import { loadSousActe } from 'src/app/store/parametrage/sous-acte/actions';
import * as sousActeSelector from 'src/app/store/parametrage/sous-acte/selector';
import { takeUntil } from 'rxjs/operators';
import { SousActe } from 'src/app/store/parametrage/sous-acte/model';
import { Taux } from 'src/app/store//parametrage/taux/model';
import { loadTaux } from 'src/app/store/parametrage/taux/actions';
import * as tauxSelector from 'src/app/store/parametrage/taux/selector';

import { loadGarantie } from 'src/app/store/parametrage/garantie/actions';
import * as garantieSelector from 'src/app/store/parametrage/garantie/selector';

import { loadPrestataire} from 'src/app/store/parametrage/prestataire/actions';
import * as prestataireSelector from 'src/app/store/parametrage/prestataire/selector';

import * as prefinancementSelector from 'src/app/store/prestation/prefinancement/selector';
import * as prefinancementActions from 'src/app/store/prestation/prefinancement/action';

import { loadMedecin} from 'src/app/store/parametrage/medecin/actions';
import * as medecinSelector from 'src/app/store/parametrage/medecin/selector';
import {medecinList} from 'src/app/store/parametrage/medecin/selector';

import { loadActe } from 'src/app/store/parametrage/acte/actions';
import * as acteSelector from 'src/app/store/parametrage/acte/selector';

import { Acte } from 'src/app/store/parametrage/acte/model';
import { Garantie } from 'src/app/store/parametrage/garantie/model';
import { element } from 'protractor';
import { Prestataire } from 'src/app/store/parametrage/prestataire/model';
import { Medecin } from 'src/app/store/parametrage/medecin/model';
import { ConfirmationService, MenuItem, MessageService, SelectItem } from 'primeng/api';
import { Adherent } from 'src/app/store/contrat/adherent/model';
import * as featureActionAdherent from 'src/app/store/contrat/adherent/actions';
import * as featureActionPrefinancement from 'src/app/store/prestation/prefinancement/action';
import * as adherentSelector from 'src/app/store/contrat/adherent/selector';
import { OrdreReglement, OrdreReglementList, Prefinancement, Prestation } from 'src/app/store/prestation/prefinancement/model';
import { Status } from 'src/app/store/global-config/model';
import { status } from 'src/app/store/global-config/selector';
import { TypeEtatOrdreReglement, Workflow } from 'src/app/module/common/models/emum.etat.ordre-reglement';
import { printPdfFile } from 'src/app/module/util/common-util';
import { Report } from 'src/app/store/contrat/police/model';
import { TypeReport } from 'src/app/store/contrat/enum/model';
import { BreadcrumbService } from 'src/app/app.breadcrumb.service';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { Function } from 'src/app/module/common/config/role.user';
import { AppMainComponent } from 'src/app/app.main.component';
import { PortailService } from 'src/app/store/portail/recapitulatif/service';
import { ProduitPharmaceutiqueService } from 'src/app/store/parametrage/produit-pharmaceutique/service';
import { ProduitPharmaceutique } from 'src/app/store/parametrage/produit-pharmaceutique/model';
import { ProduitPharmaceutiqueExclu } from 'src/app/store/parametrage/produit-pharmaceutique-exclu/model';
import { loadProduitPharmaceutiqueExclu } from 'src/app/store/parametrage/produit-pharmaceutique-exclu/actions';
import * as produitPharmaceutiqueExcluSelector from 'src/app/store/parametrage/produit-pharmaceutique-exclu/selector';
import { ProduitPharmaceutiqueExcluService } from 'src/app/store/parametrage/produit-pharmaceutique-exclu/service';
import { PharmacieGarde } from 'src/app/store/parametrage/pharmacie-garde/model';




@Component({
  selector: 'app-pharmacie-garde',
  templateUrl: './pharmacie-garde.component.html',
  styleUrls: ['./pharmacie-garde.component.scss']
})
export class PharmacieGardeComponent implements OnInit {
  destroy$ = new Subject<boolean>();
  ordreReglementList: Array<OrdreReglement>;
  ordreReglementList$: Observable<Array<OrdreReglement>>;
  cols: any[];
  displaySinistre = false;
  prefinancement: Array<Prefinancement>;
  prestations: Array<Prestation>;
  report: Report = {};
  name = '';
  role = '';
  pharmaciesGarde: Array<PharmacieGarde>;
  pharmaciesGardePeriode: PharmacieGarde;
  rembourssements: Array<ProduitPharmaceutique>;
  rembourssementValid: Array<Prefinancement>;
  rembourssementValidAndPaiementValid: Array<Prefinancement>;
  produitPharmaceutiqueExcluList$: Observable<Array<ProduitPharmaceutiqueExclu>>;
  produitPharmaceutiqueExcluList: Array<ProduitPharmaceutiqueExclu>;
  constructor( private store: Store<AppState>,
               private confirmationService: ConfirmationService,
               private formBuilder: FormBuilder,  private messageService: MessageService,  private breadcrumbService: BreadcrumbService,
               private router: Router, private keycloak: KeycloakService, public app: AppMainComponent, private portailService: PortailService,
               private produitPharmaceutiqueService: ProduitPharmaceutiqueService,
               private produitPharmaceutiqueExcluService: ProduitPharmaceutiqueExcluService,) {
     this.breadcrumbService.setItems([{ label: 'Liste des pharmacies de garde' }]);
     console.log('les roles du user est dans le workflow '+this.keycloak.getUserRoles());
      this.keycloak.loadUserProfile().then(profile => {
        this.name = profile.firstName + ' ' + profile.lastName;
        //this.profile = profile.username;
        if (profile['attributes'].role.length != 0){
        this.role = profile['attributes'].role[0]; //gives you array of all attributes of user, extract what you need
        }
      })
}

  ngOnInit(): void {

    /* this.produitPharmaceutiqueExcluList$ = this.store.pipe(select(produitPharmaceutiqueExcluSelector.produitPharmaceutiqueExcluList));
    this.store.dispatch(loadProduitPharmaceutiqueExclu());
    this.produitPharmaceutiqueExcluList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      console.log("rrrrrrrrrrrrrrrrrrrrrrrr>",value);
      if (value) {
        this.produitPharmaceutiqueExcluList = value.slice();
      }
    });

    this.store.dispatch(featureActionPrefinancement.setReportPrestation(null));
    this.store.pipe(select(prefinancementSelector.selectByteFile)).pipe(takeUntil(this.destroy$))
    .subscribe(bytes => {
        if (bytes) {
                printPdfFile(bytes);
        }
    });

    this.m();

    this.loadRembourssements(); */
    this.loadPharmacieGarde();

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

  loadRembInitie() {
    
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
        this.addMessage('success', 'Opération reussie', 'Ordre de paiement envoyé à la finance');
  }

   /*  Devalider pour atteindre la prestation */

   deValiderOrdreReglement(ordre: OrdreReglement) {
    this.confirmationService.confirm({
      message: 'voulez-vous annuler cet ordre de reglement?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        //this.store.dispatch(featureActionPrefinancement.deValiderOrdreReglement({ordre, etat: TypeEtatOrdreReglement.VALIDE, w: Workflow.PRESTATION}));
        this.store.dispatch(featureActionPrefinancement.validerOrdreReglementWorkflow({ordre, etat: TypeEtatOrdreReglement.VALIDE, w: Workflow.PRESTATION}));
        this.addMessage('success', 'Opération reussie', 'Ordre de paiement rétrograder à la prestation pour correction');
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

  voirSinistre(ordre: Prefinancement) {
    this.displaySinistre = true;
    this.prestations = ordre.prestation;
    console.log('this.prestations********', this.prestations);
  }

  navigateSinistre2() {
    this.router.navigateByUrl('/prestation/prefinancement/ordre-reglement');
  }

  onTabChange(event): void {
    var index = event.index;
    console.log('****index****', index);
    switch (index) {
      case 0: {
        this.loadRembourssements();
        break;
      }
      case 1: {
        this.loadRembourssementValid();
        break;
      }
      case 2: {
        this.loadRembourssementValidAndPaiementValid();
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

  loadRembourssements(){
    /* this.produitPharmaceutiqueService.$getProduitPharmaceutiquesExclu().subscribe(
      (res) => {
          console.log('..............produitExclus..............   ', res);
          this.rembourssements = res;
      }
  ); */
     }

  loadRembourssementValid(){
    this.keycloak.loadUserProfile().then(profile => {
      this.name = profile.firstName + ' ' + profile.lastName;
      this.portailService.fetchDepenseAssureByMatriculeAndOrdreValid$(parseInt(profile.username)).subscribe(
        (res) => {
            console.log('..............rembourssementValid..............   ', res);
            this.rembourssementValid = res;
        }
    );
    })
    
  }

  loadRembourssementValidAndPaiementValid(){
    this.keycloak.loadUserProfile().then(profile => {
      this.name = profile.firstName + ' ' + profile.lastName;
      this.portailService.fetchDepenseAssureByMatriculeAndOrdreValidAndPaiementValid$(parseInt(profile.username)).subscribe(
        (res) => {
            console.log('..............rembourssementValid..............   ', res);
            this.rembourssementValidAndPaiementValid = res;
        }
    );
    })
    
  }
  loadPharmacieGarde() {
    this.produitPharmaceutiqueExcluService.$getTodayPharmacieGarde().subscribe(
      (res) => {
          console.log('..............pharmaciesGarde..............   ', res);
          this.pharmaciesGarde = res;
          this.pharmaciesGardePeriode = res[0];
      }
  );
  }
  

}