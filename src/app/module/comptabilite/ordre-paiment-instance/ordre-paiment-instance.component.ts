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

import { OrdreReglement, OrdreReglementList, Prefinancement, Prestation, TypePaiement } from 'src/app/store/prestation/prefinancement/model';

import { TypeEtatOrdreReglement } from 'src/app/module/common/models/emum.etat.ordre-reglement';
import { printExcelfFile, printPdfFile } from 'src/app/module/util/common-util';
import { Report } from 'src/app/store/contrat/police/model';
import { TypeReport } from 'src/app/store/contrat/enum/model';
import { BreadcrumbService } from 'src/app/app.breadcrumb.service';
import * as featureActionPrefinancement from '../../../store/prestation/prefinancement/action';
import { formatDate } from '@angular/common';
import { DepenseFamilleService } from 'src/app/store/reporting/depense-famille/service';
import * as featureActionDepense from '../../../store/reporting/depense-famille/action';
import { Check } from 'src/app/store/reporting/depense-famille/model';
import * as depenseListSelector from '../../../store/reporting/depense-famille/selector';
import { Compte } from 'src/app/store/comptabilite/compte/model';
import { CompteService } from 'src/app/store/comptabilite/compte/service';
import { TiersService } from 'src/app/store/comptabilite/tiers/service';
import { Tiers } from 'src/app/store/comptabilite/tiers/model';
import { TierPayantService } from 'src/app/store/prestation/tierPayant/service';
import { PrefinancementService } from 'src/app/store/prestation/prefinancement/service';
import { CustumBeneficiare } from 'src/app/store/prestation/tierPayant/model';


@Component({
  selector: 'app-ordre-paiement-instance',
  templateUrl: './ordre-paiement-instance.component.html',
  styleUrls: ['./ordre-paiement-instance.component.scss']
})
export class OrdrePaimentInstanceComponent implements OnInit {
  destroy$ = new Subject<boolean>();
  ordreReglementList: Array<OrdreReglement>;
  ordreReglementListByCheque: Array<OrdreReglement>;
  ordreReglementList$: Observable<Array<OrdreReglement>>;
  cols: any[];
  displaySinistre = false;
  prefinancement: Array<Prefinancement>;
  report: Report = {};
  clonedPlafondConfiguration: { [s: string]: OrdreReglement } = {};
  dateDebut: any;
  dateFin: any;
  check: Check = {};
  isToDisplayChequePaiment: boolean = false;
  assureBeneficaireNom: string = '';
  assureBeneficairePrenom: string = '';
  displayTypeFichier = false;
  ordrePrefinencement: OrdreReglement = {};

  compteSelected: Compte;
  comptes: Compte[] = [];
  comptesTiers: Tiers[] = [];
  numeroCheque: string = '';
  existe: boolean | null = null;
  sticker: string = '';
  stickerConfirmation: string = '';
  isStickerConfimartion: boolean = null;

  comptesTiersPrefinenceContact: string;
  compteTiersPrefinencement: Tiers;


  isToEporteExcel: boolean = false;
  isWithoutTakedChequeExport = false;
  isAllExport = false;
  isTackedChequeExport = false;
  isDevalideChequeExport = false;
  isOrdreReglementListNotTakedCheque : boolean = false;
  isToDisplayOrdreReglementListByCheque: boolean = false;
  isOrdreReglementListTakedCheque: boolean = false;
  isOrdreReglementListDevalider : boolean = false;
  isOrdreReglementList = false;
  isOrdreReglementListByCheque = false;
  isByCheque = false;
  isEditing = false;
  isToDisplayMotifDevalidation = false;
  rowIndex: number;
  ordreReglementListTakedCheque: OrdreReglement[] = [];
  ordreReglementListNotTakedCheque: OrdreReglement[] = [];
  ordreReglementListDevalider: OrdreReglement[] = [];
  ordreReglementToDevalide: OrdreReglement = {};
  oldNumeroCheque: string = '';
  messageToDisplay: string = '';

  ordreReglementListBeneficiaire: CustumBeneficiare[] = [];
  beneficiaireSelected : string = '';
  numeroAdherent : number;
  choose: string = '';

  constructor( 
          private store: Store<AppState>,
          private confirmationService: ConfirmationService,
          private formBuilder: FormBuilder,  private messageService: MessageService,
          private breadcrumbService: BreadcrumbService,
          private depenseFamilleService: DepenseFamilleService,
          private compteService: CompteService,
          private compteTiersService: TiersService,
          private tierPayantService: TierPayantService,
          private prefinencementService: PrefinancementService,
          
                ) {
     this.breadcrumbService.setItems([{ label: 'Ordre de paiement en espèce instance' }]);
}

  ngOnInit(): void {
    this.isByCheque = false;
    this.onGetComptes();
    this.onGetComptesTiersByCompteCollectifAndGarand();
    this.getRefreshfunctions();
    this.dateDebut = new Date();
    this.dateFin = new Date();
    this.store.dispatch(featureActionPrefinancement.setReportPrestation(null));
    this.store.pipe(select(prefinancementSelector.selectByteFile)).pipe(takeUntil(this.destroy$))
    .subscribe(bytes => {
        if (bytes) {
                printExcelfFile(bytes);
        }
    });

    this.store.dispatch(featureActionDepense.setReportDepenseFamille(null));
    this.store.pipe(select(depenseListSelector.selectByteFile)).pipe(takeUntil(this.destroy$))
    .subscribe(bytes => {
      //console.log("========================displayExcel===", this.displayExcel);
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
      this.isOrdreReglementList = false;
      this.isOrdreReglementListByCheque = false;
      this.isOrdreReglementListTakedCheque = false;
      this.isOrdreReglementListNotTakedCheque = false;
      this.isOrdreReglementListDevalider = false;
      this.isByCheque = false;
    }

    this.searByOdreReglementPayeByPeriodeAndByTakeCheque();
    this.searByOdreReglementPayeByPeriodeAndByNotTakeCheque();
    this.searByOdreReglementPayeByPeriodeAndDevalider();
    
  }

  onSechercherPrefinancementByPeriod(){
      this.rechercherPrefinancementByPeriode();
    }

  imprimerFormulaireExcel(ordre?: OrdreReglement){
    this.displayTypeFichier = true;
    /**if(this.dateDebut.getTime()> this.dateFin.getTime()) {
      this.addMessage('error', 'Dates  invalide',
      'La date de debut ne peut pas être supérieure à celle du de fin');
    } else {
      console.log("dateD ===>", formatDate(this.dateDebut, 'dd/MM/yyyy', 'en-fr'));
      console.log("dateF ===>", formatDate(this.dateFin, 'dd/MM/yyyy', 'en-fr'));
      this.check.dateD = formatDate(this.dateDebut, 'dd/MM/yyyy', 'en-fr');
      this.check.dateF = formatDate(this.dateFin, 'dd/MM/yyyy', 'en-fr');
      this.check.typePaiement = TypePaiement.WAVE;
      this.report.check = this.check;
      this.store.dispatch(featureActionDepense.FetchReportConsommationWaveExcel(this.report));
  }*/
}
  importerExcelWave(){
      if(this.dateDebut.getTime()> this.dateFin.getTime()) {
        this.addMessage('error', 'Dates  invalide',
        'La date de debut ne peut pas être supérieure à celle du de fin');
      } else {
        console.log("dateD ===>", formatDate(this.dateDebut, 'dd/MM/yyyy', 'en-fr'));
        console.log("dateF ===>", formatDate(this.dateFin, 'dd/MM/yyyy', 'en-fr'));
        this.check.dateD = formatDate(this.dateDebut, 'dd/MM/yyyy', 'en-fr');
        this.check.dateF = formatDate(this.dateFin, 'dd/MM/yyyy', 'en-fr');
        this.check.typePaiement = TypePaiement.WAVE;
        this.report.check = this.check;
        this.store.dispatch(featureActionDepense.FetchReportConsommationWaveExcel(this.report));
        this.displayTypeFichier = false;
      }
  }

  importerExcelOrangeMoney(){
    if(this.dateDebut.getTime()> this.dateFin.getTime()) {
      this.addMessage('error', 'Dates  invalide',
      'La date de debut ne peut pas être supérieure à celle du de fin');
    } else {
      console.log("dateD ===>", formatDate(this.dateDebut, 'dd/MM/yyyy', 'en-fr'));
      console.log("dateF ===>", formatDate(this.dateFin, 'dd/MM/yyyy', 'en-fr'));
      this.check.dateD = formatDate(this.dateDebut, 'dd/MM/yyyy', 'en-fr');
      this.check.dateF = formatDate(this.dateFin, 'dd/MM/yyyy', 'en-fr');
      this.check.typePaiement = TypePaiement.ORANGE_MONEY;
      this.report.check = this.check;
      this.store.dispatch(featureActionDepense.FetchReportConsommationWaveExcel(this.report));
      this.displayTypeFichier = false;
    }
}



    onGetComptesTiersBySelectedCompteCollectifId(compteSelected: Compte){
      this.compteSelected = compteSelected;
    }

    onGetComptes(){
      this.compteService.$getComptesBanquaires().subscribe(
        res => {
          this.comptes = res;
        }
      );
    }


    onGetComptesTiersByCompteCollectifAndGarand(){

        this.compteTiersService.$getTiersWithCompteCollectif().subscribe(
          res => {
            this.comptesTiers = res;
          }
        );
      
    }

    verifierOldNumeroCheque(numeroCheque: string){
      if (numeroCheque){
         const isMath = this.oldNumeroCheque.trim() === numeroCheque.trim();

         if(isMath === false){
          this.verifierNumeroCheque(numeroCheque);
         }
      }
    }

    verifierNumeroCheque(numeroCheque: string) {
      if (numeroCheque.trim()) {
        this.tierPayantService.verifierExistenceNumeroChequePrefinencement(numeroCheque).subscribe(
          (result) => {
            this.existe = result;
          },
          (error) => {
            console.error('Erreur lors de la vérification', error);
            this.existe = null;
          }
        );
      }
    }

     onCancelPaiementOrdreReglement(): void{
        this.getCancelInfo();
      }
    
      onInitChequePaiment(ordrePrefinencement: OrdreReglement){
  
        if(ordrePrefinencement){
      
          this.ordrePrefinencement = ordrePrefinencement;
          this.oldNumeroCheque = ordrePrefinencement.numeroCheque;

          this.assureBeneficaireNom = ordrePrefinencement.assurePrinc?.nom.trim();
          
          const rawPrenom = ordrePrefinencement.assurePrinc?.prenom.trim().toLowerCase() || '';
          this.assureBeneficairePrenom = rawPrenom
          .split(/[-\s]/)
          .map(part => part.charAt(0).toUpperCase() + part.slice(1))
          .join(rawPrenom.includes('-') ? '-' : ' ');

          this.onFindCompteTiersByPrestataire();
      
          this.isToDisplayChequePaiment = true;
        }

      }

      onCancelPaiement(){
        this.isToDisplayChequePaiment = false;
        this.ordrePrefinencement = null;
        this.compteTiersPrefinencement = null;
        this.comptesTiersPrefinenceContact = null;
        this.sticker = '';
        this.stickerConfirmation = '';
        this.isStickerConfimartion = null;
      }

      onFindCompteTiersByPrestataire(){

        this.compteTiersService.findCompteTiersByPrefinence().subscribe(
          res => {
            this.compteTiersPrefinencement = res;
            this.comptesTiersPrefinenceContact = res.compteTiers + ' - ' + res.intitule;
          }
        );
      
    }

      onSaveOrdreReglementPaiement(ordrePrefinencement: OrdreReglement){
    
        if(ordrePrefinencement){
          ordrePrefinencement.compteTiersPrefinencement = this.compteTiersPrefinencement;
          this.confirmationService.confirm({
            message: 'voulez-vous payer par chèque à ' + ' ' +  this.assureBeneficaireNom.toUpperCase() + this.assureBeneficairePrenom + ' ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              this.confirmPaiement(ordrePrefinencement);
            },
          });
        }
    
      }

      
        confirmPaiement(ordrePrefinencement: OrdreReglement){
          if(ordrePrefinencement && ordrePrefinencement.compteTiersPrefinencement != null) {
      
            ordrePrefinencement.isTakeCheque = false;
                this.tierPayantService.payerOrdreReglementPrefinencement(ordrePrefinencement).subscribe(
                  response => {
                    if(response){
                      const isPaye = response;
                      if(isPaye === true){
      
                        this.isToDisplayChequePaiment = false;
                        this.ordrePrefinencement = {};
                        this.compteSelected = {};
                        this.compteTiersPrefinencement = null;
                        this.comptesTiersPrefinenceContact = null;
                        this.sticker = '';
                        this.stickerConfirmation = '';
                        this.isStickerConfimartion = null;
      
                        this.getSucessInfo();
                        this.onGetComptes();
                      }
                      if(isPaye === false){
      
                        this.getFailledInfo();
                      }
                    }
                  }, error => {
                    this.getErrorInfo(error.error.message);
                  }
                );
          }
            
        }
    
    
      getSucessInfo(): void {
        this.messageService.add({severity: 'success', summary: 'PAIEMENT PREFINENCEMENT', detail: 'Opération réussie!'});
      }
      getCancelInfo(): void {
        this.messageService.add({severity: 'info', summary: 'PAIEMENT PREFINENCEMENT', detail: 'Opération annulé!'});
      }
      getFailledInfo(): void {
        this.messageService.add({severity: 'error', summary: 'PAIEMENT PREFINENCEMENT', detail: 'Opération échouée!'});
      }
      
      getErrorInfo(message: string): void {
        this.messageService.add({severity: 'error', summary: 'PAIEMENT PREFINENCEMENT', detail: message});
      }


      OnSearByOdreReglementPrefincementPayeByPeriode() {

        if(!this.dateDebut || !this.dateFin){
            this.dateDebut = new Date();
            this.dateFin = new Date();
        }
  
          if(this.dateDebut.getTime()> this.dateFin.getTime()) {
            this.addMessage('error', 'Dates  invalide',
            'La date de debut ne peut pas être supérieure à celle du de fin');
          } else {
    
            const dateD = formatDate(this.dateDebut, 'dd/MM/yyyy', 'en-fr');
            const dateF = formatDate(this.dateFin, 'dd/MM/yyyy', 'en-fr');
              this.prefinencementService.getOrdreReglementPrefinencementPaye(dateD, dateF)
              .subscribe((response: any) => {
                this.ordreReglementListByCheque = response;
                 this.isOrdreReglementListByCheque = true;
                 this.isOrdreReglementListTakedCheque = false;
                 this.isByCheque = true;
              }, error => {
                console.error('Erreur lors de la récupération des données', error);
              });
            }

            this.searByOdreReglementPayeByPeriodeAndByTakeCheque();
            this.searByOdreReglementPayeByPeriodeAndByNotTakeCheque();
            this.searByOdreReglementPayeByPeriodeAndDevalider();
            
        }

      searByOdreReglementPrefincementPayeByPeriode() {

        if(!this.dateDebut || !this.dateFin){
            this.dateDebut = new Date();
            this.dateFin = new Date();
        }
  
          if(this.dateDebut.getTime()> this.dateFin.getTime()) {
            this.addMessage('error', 'Dates  invalide',
            'La date de debut ne peut pas être supérieure à celle du de fin');
          } else {
    
            const dateD = formatDate(this.dateDebut, 'dd/MM/yyyy', 'en-fr');
            const dateF = formatDate(this.dateFin, 'dd/MM/yyyy', 'en-fr');
              this.prefinencementService.getOrdreReglementPrefinencementPaye(dateD, dateF)
              .subscribe((response: any) => {
                this.ordreReglementListByCheque = response;

              }, error => {
                console.error('Erreur lors de la récupération des données', error);
              });
            }
            
        }
        

        
  onInitTakingCheque(ri: number){
    this.rowIndex = ri;
    this.isEditing = true;
  }

  onCancelTakingCheque(){

    this.isEditing = false;
    this.isToDisplayMotifDevalidation = false;

    this.getCancelInfo();
    this.getRefreshfunctions();
  }

  getRefreshfunctions(){
    this.searByOdreReglementPrefincementPayeByPeriode();
    this.searByOdreReglementPayeByPeriodeAndByTakeCheque();
    this.searByOdreReglementPayeByPeriodeAndByNotTakeCheque();
    this.searByOdreReglementPayeByPeriodeAndDevalider();
  }

  onSaveOrdreReglementTakeCheque(ordreReglement: OrdreReglement){
  
          if(ordreReglement){
            this.confirmationService.confirm({
              message: "voulez-vous indiquer que ce prestataire a touché son chèque ?",
              header: 'Confirmation',
              icon: 'pi pi-exclamation-triangle',
              accept: () => {
                this.confirmTakedCheque(ordreReglement);
              },
            });
          }
      
        }
  
        confirmTakedCheque(ordreReglement: OrdreReglement){
          if(ordreReglement) {
                ordreReglement.isTakeCheque = true;
                this.tierPayantService.payerOrdreReglementPrefinencement(ordreReglement).subscribe(
                  response => {
                    if(response){
                      const isPaye = response;
                      if(isPaye === true){
                        this.isEditing = false;
                        this.rowIndex = null;
                        this.getSucessInfo();
                        // this.getRefreshfunctions();
                      }
                    }
                  }, error => {
                    this.getErrorInfo(error.error.message);
                  }
                );
          }
      
        }

        searByOdreReglementPayeByPeriodeAndByNotTakeCheque() {

          if(!this.dateDebut || !this.dateFin){
              this.dateDebut = new Date();
              this.dateFin = new Date();
          }
    
            if(this.dateDebut.getTime()> this.dateFin.getTime()) {
              this.addMessage('error', 'Dates  invalide',
              'La date de debut ne peut pas être supérieure à celle du de fin');
            } else {
      
              const dateD = formatDate(this.dateDebut, 'dd/MM/yyyy', 'en-fr');
              const dateF = formatDate(this.dateFin, 'dd/MM/yyyy', 'en-fr');
                this.prefinencementService.getOrdreReglementPayeAndNotTackedCheque(dateD, dateF)
                .subscribe((response: any) => {

                  this.ordreReglementListNotTakedCheque = response;

                }, error => {
                  console.error('Erreur lors de la récupération des données', error);
                });
              }
              
          }

        onSearByOdreReglementPayeByPeriodeAndByNotTakeCheque() {

          if(!this.dateDebut || !this.dateFin){
              this.dateDebut = new Date();
              this.dateFin = new Date();
          }
    
            if(this.dateDebut.getTime()> this.dateFin.getTime()) {
              this.addMessage('error', 'Dates  invalide',
              'La date de debut ne peut pas être supérieure à celle du de fin');
            } else {
      
              const dateD = formatDate(this.dateDebut, 'dd/MM/yyyy', 'en-fr');
              const dateF = formatDate(this.dateFin, 'dd/MM/yyyy', 'en-fr');
                this.prefinencementService.getOrdreReglementPayeAndNotTackedCheque(dateD, dateF)
                .subscribe((response: any) => {

                  this.ordreReglementListNotTakedCheque = response;

                  this.isOrdreReglementListNotTakedCheque = true;
                  this.isOrdreReglementListByCheque = false;
                  this.isOrdreReglementListTakedCheque = false;
                  this.isOrdreReglementListDevalider = false;

                }, error => {
                  console.error('Erreur lors de la récupération des données', error);
                });
              }

              this.searByOdreReglementPrefincementPayeByPeriode();
              this.searByOdreReglementPayeByPeriodeAndByTakeCheque();
              this.searByOdreReglementPayeByPeriodeAndDevalider();
              
          }


          searByOdreReglementPayeByPeriodeAndByTakeCheque() {

          if(!this.dateDebut || !this.dateFin){
              this.dateDebut = new Date();
              this.dateFin = new Date();
          }
    
            if(this.dateDebut.getTime()> this.dateFin.getTime()) {
              this.addMessage('error', 'Dates  invalide',
              'La date de debut ne peut pas être supérieure à celle du de fin');
            } else {
      
              const dateD = formatDate(this.dateDebut, 'dd/MM/yyyy', 'en-fr');
              const dateF = formatDate(this.dateFin, 'dd/MM/yyyy', 'en-fr');
                this.prefinencementService.getOrdreReglementPayeAndTackedCheque(dateD, dateF)
                .subscribe((response: any) => {
                  this.ordreReglementListTakedCheque = response;
                }, error => {
                  console.error('Erreur lors de la récupération des données', error);
                });
              }
              
          }

          onSearByOdreReglementPayeByPeriodeAndByTakeCheque() {

          if(!this.dateDebut || !this.dateFin){
              this.dateDebut = new Date();
              this.dateFin = new Date();
          }
    
            if(this.dateDebut.getTime()> this.dateFin.getTime()) {
              this.addMessage('error', 'Dates  invalide',
              'La date de debut ne peut pas être supérieure à celle du de fin');
            } else {
      
              const dateD = formatDate(this.dateDebut, 'dd/MM/yyyy', 'en-fr');
              const dateF = formatDate(this.dateFin, 'dd/MM/yyyy', 'en-fr');
                this.prefinencementService.getOrdreReglementPayeAndTackedCheque(dateD, dateF)
                .subscribe((response: any) => {
                  this.ordreReglementListTakedCheque = response;
                  this.isOrdreReglementListTakedCheque = true;
                  this.isOrdreReglementListByCheque = false;
                  this.isOrdreReglementListNotTakedCheque = false;
                  this.isOrdreReglementListDevalider = false;
                  this.isByCheque = true;
                }, error => {
                  console.error('Erreur lors de la récupération des données', error);
                });
              }
              this.searByOdreReglementPrefincementPayeByPeriode();
              this.searByOdreReglementPayeByPeriodeAndByNotTakeCheque();
              this.searByOdreReglementPayeByPeriodeAndDevalider();
              
          }


          searByOdreReglementPayeByPeriodeAndDevalider() {

          if(!this.dateDebut || !this.dateFin){
              this.dateDebut = new Date();
              this.dateFin = new Date();
          }
    
            if(this.dateDebut.getTime()> this.dateFin.getTime()) {
              this.addMessage('error', 'Dates  invalide',
              'La date de debut ne peut pas être supérieure à celle du de fin');
            } else {
      
              const dateD = formatDate(this.dateDebut, 'dd/MM/yyyy', 'en-fr');
              const dateF = formatDate(this.dateFin, 'dd/MM/yyyy', 'en-fr');
                this.prefinencementService.getOrdreReglementPayeAndDevalider(dateD, dateF)
                .subscribe((response: any) => {
                  this.ordreReglementListDevalider = response;
                }, error => {
                  console.error('Erreur lors de la récupération des données', error);
                });
              }
              
          }

          onSearByOdreReglementPayeByPeriodeAndDevalider() {

          if(!this.dateDebut || !this.dateFin){
              this.dateDebut = new Date();
              this.dateFin = new Date();
          }
    
            if(this.dateDebut.getTime()> this.dateFin.getTime()) {
              this.addMessage('error', 'Dates  invalide',
              'La date de debut ne peut pas être supérieure à celle du de fin');
            } else {
      
              const dateD = formatDate(this.dateDebut, 'dd/MM/yyyy', 'en-fr');
              const dateF = formatDate(this.dateFin, 'dd/MM/yyyy', 'en-fr');
                this.prefinencementService.getOrdreReglementPayeAndDevalider(dateD, dateF)
                .subscribe((response: any) => {
                  this.ordreReglementListDevalider = response;
                  
                  this.isOrdreReglementListDevalider = true;
                  this.isOrdreReglementListTakedCheque = false;
                  this.isOrdreReglementListByCheque = false;
                  this.isOrdreReglementListNotTakedCheque = false;
                  this.isByCheque = true;
                }, error => {
                  console.error('Erreur lors de la récupération des données', error);
                });
              }
              this.searByOdreReglementPrefincementPayeByPeriode();
              this.searByOdreReglementPayeByPeriodeAndByTakeCheque();
              this.searByOdreReglementPayeByPeriodeAndByNotTakeCheque();
              
          }


    onInitExcelExport(){
      this.isToEporteExcel = true;
    }

     onInitDevalidation(ordreReglement: OrdreReglement){
    
        this.ordreReglementToDevalide = ordreReglement;
        this.numeroAdherent = ordreReglement.assurePrinc.numero;
        
        this.isToDisplayMotifDevalidation = true;
              
        this.ordrePrefinencement = ordreReglement;
        this.assureBeneficaireNom = ordreReglement.assurePrinc?.nom.trim();
        
        const rawPrenom = ordreReglement.assurePrinc?.prenom.trim().toLowerCase() || '';
        this.assureBeneficairePrenom = rawPrenom
        .split(/[-\s]/)
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join(rawPrenom.includes('-') ? '-' : ' ');

    
      }
    
      onAcceptDevalidation(ordreReglement: OrdreReglement){
    
        if(ordreReglement){
          this.confirmationService.confirm({
            message: 'voulez-vous dévalider le paiement de cet ordre de reglement ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              this.confirmDevalidation(ordreReglement);
            },
          });
        }
    
      }
    
      confirmDevalidation(ordreReglement: OrdreReglement){
            this.tierPayantService.devaliderPaiementOrdreReglementPrefinencement(ordreReglement).subscribe(
              response => {            
    
                if(response && response === true){
                  
                  this.getSucessInfo();
                  this.getRefreshfunctions();
                  this.isToDisplayMotifDevalidation = false;
                  this.isEditing = false;
                  this.rowIndex = null;
                }
                if(response && response === false){
                  this.getFailledInfo();
                }
    
              }, error => {
                this.getErrorInfo(error.message.message);
              }
            );
    
            this.getRefreshfunctions();
    
      }

      isMotifValid(): boolean {
        const motif = this.ordreReglementToDevalide?.motifDevalidation || '';
        return motif.trim().length >= 10;
      }

      
    onSelectedBeneficiaire(beneficiaire: CustumBeneficiare){
      this.beneficiaireSelected = beneficiaire.libelle;
    }
    
      
      onExportAllOrdre(){
        this.ordreReglementListBeneficiaire = [];
        this.isAllExport = true;
        this.isTackedChequeExport = false;
        this.isWithoutTakedChequeExport = false;
        this.isDevalideChequeExport = false;
        this.messageToDisplay = '';
        this.beneficiaireSelected = '';
        this.messageToDisplay = 'Êtes-vous sûr de vouloir exportez toutes les ordres?'
        let beneficiaires = this.ordreReglementListByCheque.map(nomAssure => nomAssure.assurePrinc.numero + ' - ' + nomAssure.assurePrinc.nom +  ' - ' + nomAssure.assurePrinc.prenom );
        this.ordreReglementListBeneficiaire = beneficiaires.map(libelle => ({ libelle }));

      }

      onExportOrdreWithTakeCheque(){
        this.ordreReglementListBeneficiaire = [];
        this.beneficiaireSelected = '';
        this.isTackedChequeExport = true;
        this.isAllExport = false;
        this.isWithoutTakedChequeExport = false;
        this.isDevalideChequeExport = false;
        this.messageToDisplay = '';
        this.messageToDisplay =  'Êtes-vous sûr de vouloir exportez les ordres avec prise de chèque?'
        let beneficiaires = this.ordreReglementListTakedCheque.map(nomAssure => nomAssure.assurePrinc.numero + ' - ' + nomAssure.assurePrinc.nom +  ' - ' + nomAssure.assurePrinc.prenom );
        this.ordreReglementListBeneficiaire = beneficiaires.map(libelle => ({ libelle }));

      }

      onExportOrdreWithoutTakeCheque(){
        this.ordreReglementListBeneficiaire = [];
        this.beneficiaireSelected = '';
        this.isWithoutTakedChequeExport = true;
        this.isAllExport = false;
        this.isTackedChequeExport = false;
        this.isDevalideChequeExport = false;
        
        this.messageToDisplay = '';
        this.messageToDisplay =  'Êtes-vous sûr de vouloir exportez les ordres sans prise de chèque?'
        let beneficiaires = this.ordreReglementListNotTakedCheque.map(nomAssure => nomAssure.assurePrinc.numero + ' - ' + nomAssure.assurePrinc.nom +  ' - ' + nomAssure.assurePrinc.prenom );
        this.ordreReglementListBeneficiaire = beneficiaires.map(libelle => ({ libelle }));

      }

      onExportOrdreDevalide(){
        this.ordreReglementListBeneficiaire = [];
        this.beneficiaireSelected = '';
        this.isDevalideChequeExport = true;
        this.isAllExport = false;
        this.isTackedChequeExport = false;
        this.isWithoutTakedChequeExport = false;
        this.isWithoutTakedChequeExport = false;
        
        this.messageToDisplay = '';
        this.messageToDisplay =  'Êtes-vous sûr de vouloir exportez les ordres dévalidés?'
        let beneficiaires = this.ordreReglementListDevalider.map(nomAssure => nomAssure.assurePrinc.numero + ' - ' + nomAssure.assurePrinc.nom +  ' - ' + nomAssure.assurePrinc.prenom );
        this.ordreReglementListBeneficiaire = beneficiaires.map(libelle => ({ libelle }));

      }

      onExportOrdreReglement(){

        this.confirmationService.confirm({
          message: this.messageToDisplay,
          header: 'Confirmation',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            if(this.isAllExport){

              this.exportAllOrdre();
            }
            if(this.isTackedChequeExport){

              this.onExportAllOrdreWithCheque();
            }
            if(this.isWithoutTakedChequeExport){

              this.onExportAllOrdreWithoutCheque();
            }
            if(this.isDevalideChequeExport){

              this.onExportAllOrdreDevalide();
            }
          },
        });
      
    }

    exportAllOrdre() {
      if (!this.dateDebut || !this.dateFin) {
        alert("Veuillez sélectionner une période !");
        return;
      }

      const dateD = formatDate(this.dateDebut, 'dd/MM/yyyy', 'en-fr');
      const dateF = formatDate(this.dateFin, 'dd/MM/yyyy', 'en-fr');
  
      this.tierPayantService.exportAllOrdreReglementPrefinencement(this.dateDebut, this.dateFin, this.numeroAdherent.toString())
        .subscribe(response => {
          const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `ordre_reglement_prefinencement_paye_du_${dateD}_au_${dateF}.xlsx`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          this.isToEporteExcel = false;
          this.getSucessInfo();
          this.beneficiaireSelected = '';
        }, error => {
          console.error("Erreur lors de l'exportation :", error);
        });
    }

    onExportAllOrdreWithCheque() {
      if (!this.dateDebut || !this.dateFin) {
        alert("Veuillez sélectionner une période !");
        return;
      }

      const dateD = formatDate(this.dateDebut, 'dd/MM/yyyy', 'en-fr');
      const dateF = formatDate(this.dateFin, 'dd/MM/yyyy', 'en-fr');
  
      this.tierPayantService.getExportAllOrdreWithCheque(this.dateDebut, this.dateFin, this.numeroAdherent.toString())
        .subscribe(response => {
          const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `ordre_reglement_tier_prefinencement_paye_avec_cheque_du_${dateD}_au_${dateF}.xlsx`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          this.isToEporteExcel = false;
          this.getSucessInfo();
          this.beneficiaireSelected = '';
        }, error => {
          console.error("Erreur lors de l'exportation :", error);
        });
    }

    onExportAllOrdreWithoutCheque() {
      if (!this.dateDebut || !this.dateFin) {
        alert("Veuillez sélectionner une période !");
        return;
      }

      const dateD = formatDate(this.dateDebut, 'dd/MM/yyyy', 'en-fr');
      const dateF = formatDate(this.dateFin, 'dd/MM/yyyy', 'en-fr');
  
      this.tierPayantService.getExportAllOrdreWithoutCheque(this.dateDebut, this.dateFin, this.numeroAdherent.toString())
        .subscribe(response => {
          const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `ordre_reglement_prefinencement_paye_sans_cheque_du_${dateD}_au_${dateF}.xlsx`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          this.isToEporteExcel = false;
          this.getSucessInfo();
          this.beneficiaireSelected = '';
        }, error => {
          console.error("Erreur lors de l'exportation :", error);
        });
    }

    onExportAllOrdreDevalide() {
      if (!this.dateDebut || !this.dateFin) {
        alert("Veuillez sélectionner une période !");
        return;
      }

      const dateD = formatDate(this.dateDebut, 'dd/MM/yyyy', 'en-fr');
      const dateF = formatDate(this.dateFin, 'dd/MM/yyyy', 'en-fr');
  
      this.tierPayantService.getExportAllOrdreDevalide(this.dateDebut, this.dateFin, this.numeroAdherent.toString())
        .subscribe(response => {
          const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `ordre_reglement_prefinencement_devalide_du_${dateD}_au_${dateF}.xlsx`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          this.isToEporteExcel = false;
          this.getSucessInfo();
          this.beneficiaireSelected = '';
        }, error => {
          console.error("Erreur lors de l'exportation :", error);
        });
    }
    

}
