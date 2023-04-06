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
import { Police, Report } from 'src/app/store/contrat/police/model';
import { TypeReport } from 'src/app/store/contrat/enum/model';
import { BreadcrumbService } from 'src/app/app.breadcrumb.service';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { Function } from 'src/app/module/common/config/role.user';
import { AppMainComponent } from 'src/app/app.main.component';
import { PortailService } from 'src/app/store/portail/recapitulatif/service';
import { SinistreTierPayant } from 'src/app/store/prestation/tierPayant/model';
import { Avenant, HistoriqueAvenant, HistoriqueAvenantAdherant, HistoriqueAvenantPrime, TypeDemandeur, TypeHistoriqueAvenant } from 'src/app/store/contrat/historiqueAvenant/model';
import * as featureActionHistoriqueAdherant from '../../../store/contrat/historiqueAvenant/actions';
import * as historiqueAvenantSelector from '../../../store/contrat/historiqueAvenant/selector';
import * as historiqueAvenantAction from '../../../store/contrat/historiqueAvenant/actions';
import * as groupeSlector from '../../../store/contrat/groupe/selector';
import { HistoriqueAvenantService } from 'src/app/store/contrat/historiqueAvenant/service';
import { Exercice } from 'src/app/store/contrat/exercice/model';
import * as exerciceSelector from '../../../store/contrat/exercice/selector';
import * as featureExerciceAction from '../../../store/contrat/exercice/actions';
import { ExerciceService } from 'src/app/store/contrat/exercice/service';
import { HistoriqueAvenantAdherentService } from 'src/app/store/contrat/historiqueAvenantAdherent/service';



@Component({
  selector: 'app-souscripteur-mouvement',
  templateUrl: './souscripteur-mouvement.component.html',
  styleUrls: ['./souscripteur-mouvement.component.scss']
})
export class SouscripteurMouvementComponent implements OnInit {
  destroy$ = new Subject<boolean>();
  ordreReglementList: Array<OrdreReglement>;
  ordreReglementList$: Observable<Array<OrdreReglement>>;
  cols: any[];
  displaySinistre = false;
  prefinancement: Array<Prefinancement>;
  prestations: Array<Prestation>;
  report: Report = {};
  ordreReglementListMedical: Array<OrdreReglement>;
  ordreReglementListMedical$: Observable<Array<OrdreReglement>>;
  ordreReglementListFinance: Array<OrdreReglement>;
  ordreReglementListFinance$: Observable<Array<OrdreReglement>>;
  ordreReglementListDirection: Array<OrdreReglement>;
  ordreReglementListDirection$: Observable<Array<OrdreReglement>>;
  name = '';
  role = '';
  rembourssements: Array<SinistreTierPayant>;
  rembourssementValid: Array<SinistreTierPayant>;
  rembourssementEnCours: Array<SinistreTierPayant>;
  rembourssementValidAndPaiementValid: Array<SinistreTierPayant>;
  police: Police;
  historiqueAvenant: HistoriqueAvenant;
  infosPolice = false;
  historiqueAvenants1$: Observable<any>;
  historiqueAvenants1: Array<HistoriqueAvenant>;
  historiqueAvenantPrime: HistoriqueAvenantPrime = {};
  exerciceList$: Observable<Array<Exercice>>;
  exerciceList: Array<Exercice>;
  exercices: Array<Exercice>;
  curentExercice: Exercice = {};
  primeExercice: number;
  exoNumber: number;
  historiqueAvenantAdherents: Array<HistoriqueAvenantAdherant>;
  displayDialogFormAdherent = false;

  constructor( private store: Store<AppState>,
               private confirmationService: ConfirmationService,
               private formBuilder: FormBuilder,  private messageService: MessageService,  private breadcrumbService: BreadcrumbService,
               private router: Router, private keycloak: KeycloakService, public app: AppMainComponent, private portailService: PortailService,
               private historiqueAvenantService: HistoriqueAvenantService, private exerciceService: ExerciceService,
               private historiqueAvenantAdherentService: HistoriqueAvenantAdherentService) {
     this.breadcrumbService.setItems([{ label: 'Mouvement de la police' }]);
     
}

  ngOnInit(): void {
    console.log('les roles du user est dans le workflow '+this.keycloak.getUserRoles());
      this.keycloak.loadUserProfile().then(profile => {
        this.name = profile.firstName + ' ' + profile.lastName;
        if (profile.username) {
          this.exerciceService.$getExercicesPortail(profile.username).subscribe(
              (res) => {
                this.exercices = res;
                console.log("==this.exercices ========>", this.exercices);
                //console.log(this.historiqueAvenantPrime );
                // this.historiqueAveantAdherantsByExerciceTMP = res;
              }
          );
        }
        //this.profile = profile.username;
        if (profile['attributes'].role.length != 0){
        this.role = profile['attributes'].role[0]; //gives you array of all attributes of user, extract what you need
        }
      });


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

    this.loadRembourssements();
    

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

  loadRembInitie() {
    
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
        //this.store.dispatch(featureActionPrefinancement.deValiderOrdreReglement({ordre, etat: TypeEtatOrdreReglement.VALIDE, w: Workflow.PRESTATION}));
        this.store.dispatch(featureActionPrefinancement.validerOrdreReglementWorkflow({ordre, etat: TypeEtatOrdreReglement.VALIDE, w: Workflow.PRESTATION}));
        this.loadOrdreReglementMedical();
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
        this.loadRembourssementEnCours();
        break;
      }
      case 2: {
        this.loadRembourssementOrdreValid();
        break;
      }
      case 3: {
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
    this.keycloak.loadUserProfile().then(profile => {
      this.name = profile.firstName + ' ' + profile.lastName;
      /* "PHJAB" */
    this.portailService.fetchfactureInitieByMatricule$(profile.username).subscribe(
      (res) => {
          console.log('..............rembourssements..............   ', res);
          this.rembourssements = res;
      }
  );
    })
    
  }

  loadRembourssementEnCours(){
    this.keycloak.loadUserProfile().then(profile => {
      this.name = profile.firstName + ' ' + profile.lastName;
      this.portailService.fetchFactureEnCoursByMatriculeAndOrdreEnCours$(profile.username).subscribe(
        (res) => {
            console.log('..............rembourssementEnCours..............   ', res);
            this.rembourssementEnCours = res;
        }
    );
    })
    
  }

  loadRembourssementOrdreValid(){
    this.keycloak.loadUserProfile().then(profile => {
      this.name = profile.firstName + ' ' + profile.lastName;
      this.portailService.fetchFactureEnCoursByMatriculeAndOrdreValid$(profile.username).subscribe(
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
      this.portailService.fetchFactureEnCoursByMatriculeAndOrdreValidAndPaiementValid$(profile.username).subscribe(
        (res) => {
            console.log('..............rembourssementValidAndPaiementValid..............   ', res);
            this.rembourssementValidAndPaiementValid = res;
        }
    );
    })
    
  }
  

  getPrimeTotalByPoliceId() {
    if (this.police.id) {
      this.historiqueAvenantService.getPrimeTotalByPoliceId(this.police.id).subscribe(
          (res) => {
            this.historiqueAvenantPrime = res;
            console.log("=============================this.historiqueAvenantPrime =============");
            console.log(this.historiqueAvenantPrime );
            // this.historiqueAveantAdherantsByExerciceTMP = res;
          }
      );
    }
  }

  onExerciceChange(): void {
    console.log('curent exo === ');
    console.log(this.curentExercice);
    if (this.curentExercice ) {
      this.historiqueAvenantService.findHistoriqueAvenantByExercice(this.curentExercice.id).subscribe((res) => {
        this.historiqueAvenants1 = res.body;
          console.log('....historiqueAvenants1.....', this.historiqueAvenants1);
        this.historiqueAvenants1.forEach(p => {
          this.primeExercice = p.historiqueAvenantPrime?.primeTotalCalcul;
          this.exoNumber = p.exercice?.numero;
        })
      })
    } 
  }

  onRowSelectAvenant(avenant: HistoriqueAvenant) {
    this.historiqueAvenant = avenant;
    this.historiqueAvenant.dateAvenant = avenant.dateAvenant
  switch (avenant.typeHistoriqueAvenant) {
    case TypeHistoriqueAvenant.INCORPORATION: {
    }
    case TypeHistoriqueAvenant.RETRAIT: {
      this.viewAvenantRetrait(avenant);
      break;
    }
    case TypeHistoriqueAvenant.RENOUVELLEMENT: {
      this.viewAvenantRenouvellement(avenant, avenant.typeHistoriqueAvenant);
      break;
    }

    case TypeHistoriqueAvenant.PROROGATION: {
      
      break;
    }
    case TypeHistoriqueAvenant.AFAIRE_NOUVELLE: {
      this.viewAvenantAffaireNouvelle(avenant, avenant.typeHistoriqueAvenant);
      break;
    }
    case TypeHistoriqueAvenant.RESILIATION: {
      this.viewAvenantResiliation(avenant, avenant.typeHistoriqueAvenant);
      break;
    }
    case TypeHistoriqueAvenant.SUSPENSION: {
     this.viewAvenantSuspension(avenant, avenant.typeHistoriqueAvenant);
      break;
    }
    case TypeHistoriqueAvenant.MODIFICATION: {
      this.viewAvenantModification(avenant, avenant.typeHistoriqueAvenant);
      break;
    }
    default: {
      return null;
    }
  }
}


viewAvenantIncorp(avenant: HistoriqueAvenant, typeHistoriqueAvenant: TypeHistoriqueAvenant) {
  this.historiqueAvenant = {...avenant};
  console.log(typeof typeHistoriqueAvenant);
  this.historiqueAvenantAdherentService.getHistoriqueAvenantAdherentsByHistoriqueIdAndTypeHistorique(typeHistoriqueAvenant,
      this.historiqueAvenant.id).subscribe(
      (res: Array<HistoriqueAvenantAdherant>) => {
        this.historiqueAvenantAdherents = [];
        this.historiqueAvenantAdherents = res;
        console.log('=====================res=============', res);
      }
  );
  this.displayDialogFormAdherent = true;
}

viewAvenantRetrait(avenant: HistoriqueAvenant) {
  this.historiqueAvenant = {...avenant};
  this.historiqueAvenantAdherentService.getHistoriqueAvenantAdherentsByHistoriqueId(avenant.id).subscribe(
      (res: Array<HistoriqueAvenantAdherant>) => {
        console.log('=====================res=============', res);
        this.historiqueAvenantAdherents = [];
        this.historiqueAvenantAdherents = res;
        console.log('=====================historiqueAvenantAdherent1s=============', this.historiqueAvenantAdherents);
      }
  );
  this.displayDialogFormAdherent = true;
}

viewAvenantAffaireNouvelle(avenant: HistoriqueAvenant, typeHistoriqueAvenant: TypeHistoriqueAvenant) {
  this.historiqueAvenant = {...avenant};
  console.log(typeof typeHistoriqueAvenant);
  this.historiqueAvenantAdherentService.getHistoriqueAvenantAdherentsByHistoriqueIdAndTypeHistorique(typeHistoriqueAvenant,
      avenant.id).subscribe(
      (res: Array<HistoriqueAvenantAdherant>) => {
        this.historiqueAvenantAdherents = [];
        this.historiqueAvenantAdherents = res;
      console.log('=====================historiqueAvenantAdherent1s=============', res);
         /* this.historiqueAvenantAdherents3 = this.historiqueAvenantAdherent1s
            .filter(doc => doc.avenant.typeHistoriqueAvenant === typeHistoriqueAvenant);*/
        console.log('=====================typeHistoriqueAvenant=============', typeHistoriqueAvenant);
      }
  );
  this.displayDialogFormAdherent = true;
}

viewAvenantResiliation(avenant: HistoriqueAvenant, typeHistoriqueAvenant: TypeHistoriqueAvenant) {
  this.historiqueAvenant = {...avenant};
  console.log(typeof typeHistoriqueAvenant);
  this.historiqueAvenantAdherentService.findHistoriqueAvenantAdherentByHistoriqueAvenantIdAndActifIsFalse(avenant.id)
      .subscribe((res: Array<HistoriqueAvenantAdherant>) => {
        this.historiqueAvenantAdherents = [];
        this.historiqueAvenantAdherents = res;
        console.log('=====================res=============', res);
      }
  );
  this.displayDialogFormAdherent = true;
}

viewAvenantSuspension(avenant: HistoriqueAvenant, typeHistoriqueAvenant: TypeHistoriqueAvenant) {
  this.historiqueAvenant = {...avenant};
  console.log(typeof typeHistoriqueAvenant);
  this.historiqueAvenantAdherentService.findHistoriqueAvenantAdherentByHistoriqueAvenantIdAndActifIsFalse(avenant.id)
      .subscribe((res: Array<HistoriqueAvenantAdherant>) => {
        this.historiqueAvenantAdherents = [];
        this.historiqueAvenantAdherents = res;
        console.log('=====================res=============', res);
      }
  );
  this.displayDialogFormAdherent = true;
}

viewAvenantRenouvellement(avenant: HistoriqueAvenant, typeHistoriqueAvenant: TypeHistoriqueAvenant) {
  this.historiqueAvenant = {...avenant};
  console.log(typeof typeHistoriqueAvenant);
  console.log('++++++++++++++++++++avenant.id+++++++++++++++++++++++', avenant.id);
  console.log('++++++++++++++++++++avenant.police.id+++++++++++++++++++++++', avenant.police.id);
  this.historiqueAvenantAdherentService.findHistoriqueAvenantAdherentByHistoriqueAvenantIdAndActifIsFalse(avenant.id)
  .subscribe((res: Array<HistoriqueAvenantAdherant>) => {
    this.historiqueAvenantAdherents = [];
    this.historiqueAvenantAdherents = res;
    console.log('=====================res=============', res);
  }
  );
  this.displayDialogFormAdherent = true;
}

viewAvenantModification(avenant: HistoriqueAvenant, typeHistoriqueAvenant: TypeHistoriqueAvenant) {
  this.historiqueAvenant = {...avenant};
  console.log(typeof typeHistoriqueAvenant);
  this.historiqueAvenantAdherentService.findHistoriqueAvenantAdherentByHistoriqueAvenantIdAndActifIsFalse(avenant.id)
  .subscribe((res: Array<HistoriqueAvenantAdherant>) => {
    this.historiqueAvenantAdherents = [];
    this.historiqueAvenantAdherents = res;
    console.log('=====================res=============', res);
  }
  );
  this.displayDialogFormAdherent = true;
}

}
