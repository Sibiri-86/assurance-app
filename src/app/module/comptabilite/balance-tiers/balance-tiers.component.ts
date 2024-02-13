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
import { printPdfFile } from 'src/app/module/util/common-util';
import { Report } from 'src/app/store/contrat/police/model';
import { TypeReport } from 'src/app/store/contrat/enum/model';
import { BreadcrumbService } from 'src/app/app.breadcrumb.service';
import * as featureActionPrefinancement from '../../../store/prestation/prefinancement/action';
import { Operation } from 'src/app/store/comptabilite/operation/model';
import * as exerciceComptableOperationListSelector from '../../../store/comptabilite/exercice-comptable-operation/selector';
import { Balance, TypeBalance, TypeEtatBalance } from 'src/app/store/comptabilite/appelFond/model';
import { Compte } from 'src/app/store/comptabilite/compte/model';
import * as compteSelector from '../../../store/comptabilite/compte/selector';
import * as compteAction from 'src/app/store/comptabilite/compte/actions';
import { Journaux } from 'src/app/store/comptabilite/journaux/model';
import * as featureActionJournal from '../../../store/comptabilite/journaux/actions';
import * as journauxSelector from '../../../store/comptabilite/journaux/selector';
import * as featureActionExerciceComptableOperation from '../../../store/comptabilite/exercice-comptable-operation/actions';
import { ExerciceComptable } from 'src/app/store/comptabilite/exercice-comptable/model';
import * as exerciceListSelector from '../../../store/comptabilite/exercice-comptable/selector';
import * as featureActionExercice from '../../../store/comptabilite/exercice-comptable/actions';
import * as tierSelector from '../../../store/comptabilite/tiers/selector';
import { Tiers } from 'src/app/store/comptabilite/tiers/model';
import * as featureActiontiers from '../../../store/comptabilite/tiers/actions';
import { formatDate } from '@angular/common';





@Component({
  selector: 'app-balance-tiers',
  templateUrl: './balance-tiers.component.html',
  styleUrls: ['./balance-tiers.component.scss']
})
export class BalanceTiersComponent implements OnInit {
  destroy$ = new Subject<boolean>();
  ordreReglementList: Array<OrdreReglement>;
  ordreReglementList$: Observable<Array<OrdreReglement>>;
  cols: any[];
  displaySinistre = false;
  prefinancement: Array<Prefinancement>;
  report: Report = {};

  operationList: Array<Operation>;
  operationList$: Observable<Array<Operation>>;
  ordre1: Operation = {};
  displayBalancePrint = false;
  balanceForm: FormGroup;
  // typeBalance = Object.keys(TypeBalance).map(key => ({ label: TypeBalance[key], value: key }));
  // typeEtatBalance = Object.keys(TypeEtatBalance).map(key => ({ label: TypeEtatBalance[key], value: key }));
  typeBalance: any = [{label: 'Complète', value: 'COMPLETE'},
    {label: 'Incomplète', value: 'INCOMPLETE'}];
  typeEtatBalance: any = [{label: '6 colonnes', value: 'SIX'},
    {label: '8 colonnes', value: 'HUIT'}];
    compteList$: Observable<Array<Compte>>;
    compteList: Array<Compte>;
    journauxList$: Observable<Array<Journaux>>;
    journauxList: Array<Journaux>;
    balance: Balance = {};
    exerciceList$: Observable<Array<ExerciceComptable>>;
    exerciceList: Array<ExerciceComptable>;
    tiersList$: Observable<Array<Tiers>>;
    tiersList: Array<Tiers>;
    exerciceActif: ExerciceComptable = {};



  constructor( private store: Store<AppState>,
               private confirmationService: ConfirmationService,
               private formBuilder: FormBuilder,  private messageService: MessageService,  private breadcrumbService: BreadcrumbService,) {
            
          this.balanceForm = this.formBuilder.group({
            id: new FormControl(''),
            typeBalance: new FormControl('', [Validators.required]),
            dateDebut: new FormControl('', [Validators.required]),
            dateFin: new FormControl('', [Validators.required]),
            tiersDebut: new FormControl('', [Validators.required]),
            tiersFin: new FormControl('', [Validators.required]),
            codeDebut: new FormControl(''),
            codeFin: new FormControl(''),
            typeEtatBalance: new FormControl('', [Validators.required])
          });

     this.breadcrumbService.setItems([{ label: 'Balance tiers' }]);
}

  ngOnInit(): void {
    /* this.store.dispatch(featureActionPrefinancement.setReportPrestation(null));
    this.store.pipe(select(prefinancementSelector.selectByteFile)).pipe(takeUntil(this.destroy$))
    .subscribe(bytes => {
        if (bytes) {
                printPdfFile(bytes);
        }
    }); */

    this.tiersList$ = this.store.pipe(select(tierSelector.tiersList));
    this.store.dispatch(featureActiontiers.loadTiers());
    this.tiersList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      
      if (value) {
        
        this.tiersList = value.slice();

      }
    }); 
    this.store.dispatch(featureActionJournal.setReportBalanceHuit(null));
    this.store.pipe(select(journauxSelector.selectByteFile)).pipe(takeUntil(this.destroy$))
      .subscribe(bytes => {
          if (bytes) {
              printPdfFile(bytes);
          }
      });

    this.ordreReglementList$ = this.store.pipe(select(prefinancementSelector.ordreReglementList));
    this.store.dispatch(featureActionPrefinancement.loadOrdrePaiementInstance());
    this.ordreReglementList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      console.log(value);
      if (value) {
        this.ordreReglementList = value.slice();
    }
    });

    this.exerciceList$= this.store.pipe(select(exerciceListSelector.exerciceComptableList));
    this.store.dispatch(featureActionExercice.loadExerciceComptable());
    this.exerciceList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      
      if (value) {
        
        this.exerciceList = value.slice();
        this.exerciceActif = this.exerciceList.find(exercice=>exercice.actived === true);
        
       
      }
    });

    this.operationList$ = this.store.pipe(select(exerciceComptableOperationListSelector.operationList));
    this.store.dispatch(featureActionExerciceComptableOperation.loadOperations());
    this.operationList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      console.log(value);
      if(value) {
        this.operationList = value.slice();
      }
    });

    this.compteList$ = this.store.pipe(select(compteSelector.compteList));
    this.store.dispatch(compteAction.loadCompte());
    this.compteList$.pipe(takeUntil(this.destroy$))
              .subscribe(value => {
                if (value) {
                  //this.loading = false;
                  this.compteList = value.slice();
                  this.compteList = this.compteList.filter(cl => cl.isRacine === false);
                  console.log('value', value.slice());
                  console.log('compteList', this.compteList);
                }
    });

    this.journauxList$ = this.store.pipe(select(journauxSelector.journauxList));
    this.store.dispatch(featureActionJournal.loadJournaux());
    this.journauxList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      
      if (value) {
        console.log("================================", value);
        console.log(this.journauxList);
        this.journauxList = value.slice();
        
       
      }
    });
  }

  addMessage(severite: string, resume: string, detaile: string): void {
    this.messageService.add({severity: severite, summary: resume, detail: detaile});
  }
  
  verifieDate2() {
    if(this.balanceForm.value.dateFin) {
      
      if(this.exerciceActif.annee != new Date(this.balanceForm.value.dateFin).getFullYear()) {
        console.log("============");
        this.addMessage('error', 'Date  invalide',
                'Veuillez choisir une date valide de l\'année  '.concat(this.exerciceActif.annee.toString()));
                this.balanceForm.get('dateFin').setValue('');
      }
    }
  }

  verifieDate1() {
    if(this.balanceForm.value.dateDebut) {
      
      if(this.exerciceActif.annee != new Date(this.balanceForm.value.dateDebut).getFullYear()) {
        console.log("============");
        this.addMessage('error', 'Date  invalide',
                'Veuillez choisir une date valide de l\'année  '.concat(this.exerciceActif.annee.toString()));
             
             this.balanceForm.get('dateDebut').setValue('');
      }
    }
  }

  imprimer(pref: OrdreReglement) {
    this.report.typeReporting = TypeReport.ORDRE_REGLEMENT;
    this.report.ordreReglementDto = pref;
    this.store.dispatch(featureActionPrefinancement.FetchReportPrestation(this.report));
  }

  paiemrntEspece(ordre: OrdreReglement) {
    this.store.dispatch(featureActionPrefinancement.validerPaiementEspece({ordre: ordre,dateD: formatDate(new Date(), 'dd/MM/yyyy', 'en-fr'),
    dateF: formatDate(new Date(), 'dd/MM/yyyy', 'en-fr')}));
    //this.store.dispatch(featureActionPrefinancement.loadOrdrePaiementInstance());
  }

  voirSinistre(ordre: Operation) {
    this.displaySinistre = true;
    this.ordre1 = ordre;
  }

  PrintGarant() {
    this.displayBalancePrint = true;
  }

  ImprimerBalance8colonnes() {
    this.balance = {};
    this.balance.typeBalance = this.balanceForm.get('typeBalance').value;
    this.balance.dateDebut = this.balanceForm.get('dateDebut').value;
    this.balance.dateFin = this.balanceForm.get('dateFin').value;
    this.balance.tiersDebut = this.balanceForm.get('tiersDebut').value;
    this.balance.tiersFin = this.balanceForm.get('tiersFin').value;
    this.balance.typeEtatBalance = this.balanceForm.get('typeEtatBalance').value;
    console.log("this.balance", this.balance.typeEtatBalance);
    console.log("****************************", TypeEtatBalance.HUIT);
    if(this.balance.typeEtatBalance === TypeEtatBalance.HUIT) {
      this.report.typeReporting = TypeReport.BALANCE_TIERS_HUIT_COLONNES;
    } else {
      this.report.typeReporting = TypeReport.BALANCE_TIERS_SIX_COLONNES;
    }
    console.log("this.balance222222", this.balance);
    
    this.report.balance = this.balance;

    console.log("this.report.typeReporting ", this.report.typeReporting);
    this.store.dispatch(featureActionJournal.FetchReportBalanceHuit(this.report));
  }

}
