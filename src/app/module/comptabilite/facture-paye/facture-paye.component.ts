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
import {CustumPrestatire, OrdreReglementTierPayant, Prestation, SinistreTierPayant} from '../../../store/prestation/tierPayant/model';
import {TypeReport} from '../../../store/contrat/enum/model';
import {TypeEtatOrdreReglement} from '../../common/models/emum.etat.ordre-reglement';
import {BreadcrumbService} from '../../../app.breadcrumb.service';
import { Banque } from 'src/app/store/parametrage/Banques/model';
import * as banqueSelector from '../../../store/parametrage/Banques/selector';
import * as featureActionBanque from '../../../store/parametrage/Banques/actions';
import { formatDate } from '@angular/common';
import { TiersService } from 'src/app/store/comptabilite/tiers/service';
import { TierPayantService } from 'src/app/store/prestation/tierPayant/service';
import { error } from 'console';
import { KeycloakService } from 'keycloak-angular';
import { CompteService } from 'src/app/store/comptabilite/compte/service';
import { JournauxService } from 'src/app/store/comptabilite/journaux/service';
import { TypeJournauxService } from 'src/app/store/parametrage/typeJournaux/service';
import { Compte } from 'src/app/store/comptabilite/compte/model';
import { Journaux } from 'src/app/store/comptabilite/journaux/model';
import { Tiers } from 'src/app/store/comptabilite/tiers/model';
import { TypeJournaux } from 'src/app/store/parametrage/typeJournaux/model';

@Component({
  selector: 'app-facture-paye',
  templateUrl: './facture-paye.component.html',
  styleUrls: ['./facture-paye.component.scss']
})
export class FacturePayeComponent implements OnInit {
  destroy$ = new Subject<boolean>();
  ordreReglementList: Array<OrdreReglementTierPayant>;
  ordreReglementListTakedCheque: OrdreReglementTierPayant[] = [];
  ordreReglementListNotTakedCheque: OrdreReglementTierPayant[] = [];
  ordreReglementListDevalider: OrdreReglementTierPayant[] = [];
  isOrdreReglementListTakedCheque: boolean = false;
  isOrdreReglementListNotTakedCheque: boolean = false;
  isOrdreReglementList: boolean = false;
  isOrdreReglementListDevalider: boolean = false;
  ordreReglementList$: Observable<Array<OrdreReglementTierPayant>>;
  cols: any[];
  displaySinistre = false;
  sinistreTierPayant: Array<SinistreTierPayant>;
  prestations: Array<Prestation>;
  report: Report = {};
  displayPaiement = false;
  selectedRowData : OrdreReglementTierPayant;
  displayDialog = false;
  isEditing = false;
  rowIndex: number;
  ordreReglementPaiement: OrdreReglementTierPayant = {};
  banqueList$: Observable<Array<Banque>>;
  banqueList: Array<Banque>;
  typePaiement = Object.keys(TypePaiement).map(key => ({ label: TypePaiement[key], value: key }));

  dateDebut: any;
  dateFin: any;
  prestataire: string;
  ordreReglementTierPayantToDevalide: OrdreReglementTierPayant = {};;
  isToDisplayMotifDevalidation: boolean = false;

  numeroCheque: string = '';
  existe: boolean | null = null;

  choose: string = '';

  isToPayeOrdreReglementTierPayant = false;
  ordreReglementTierPayant: OrdreReglementTierPayant = {};
  oldNumeroCheque: string = '';

    comptes: Compte[] = [];
    comptesTiers: Tiers[] = [];
    comptesTiersPrestataires: Tiers[] = [];
    comptesTiersPrestataire: Tiers;
    comptesTiersPrestataireContact: string;
    typeJournaux: TypeJournaux[] = [];
    journaux: Array<Journaux>
    compteCollectifId: string;
    compteSelected: Compte;
  
    sticker: string = '';
    stickerConfimartion: boolean = false;
    isToEporteExcel: boolean = false;
    isWithoutTakedChequeExport = false;
    isAllExport = false;
    isTackedChequeExport = false;
    isDevalideChequeExport = false;
    messageToDisplay: string = '';
    prestataireSelected: string = '';
    ordreReglementListPrestataire: CustumPrestatire[] = [];


  constructor(private store: Store<AppState>,
              private confirmationService: ConfirmationService,
              private tierPayantService: TierPayantService,
              private compteService: CompteService,
              private compteTiersService: TiersService,
              private typeJournauxService: TypeJournauxService,
              private journauxService: JournauxService,
              private messageService: MessageService, 
              private breadcrumbService: BreadcrumbService) {
  this.breadcrumbService.setItems([{ label: 'Factures payés' }]);
}

  ngOnInit(): void {

    this.onGetComptes();
    this.onGetComptesTiersByCompteCollectifAndGarand();
    this.onGetComptesTiersPrestataires();

    this.onSearByOdreReglementPayeByPeriode();
    this.getRefreshfunctions();
    /* this.store.dispatch(featureActionTierPayant.setReportTierPayant(null));
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
    }); */
  }
  paiement(ordre: OrdreReglement) {
    this.displayPaiement = true;
    this.ordreReglementPaiement = ordre;
  }
  deValiderPayement(ordre: OrdreReglementTierPayant) {
    this.confirmationService.confirm({
      message: 'voulez-vous annuler cette facturée',
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

  addMessage(severite: string, resume: string, detaile: string): void {
    this.messageService.add({severity: severite, summary: resume, detail: detaile});
  }

  onSeeOdreReglementDetail(ordreReglementTierPayant: OrdreReglementTierPayant){
    this.selectedRowData = ordreReglementTierPayant;
    this.displayDialog = true;

  }


  onInitDevalidation(ordreReglementTierPayant: OrdreReglementTierPayant){

    this.ordreReglementTierPayantToDevalide = ordreReglementTierPayant;
    
    this.prestataire = ordreReglementTierPayant.prestataire;
    this.isToDisplayMotifDevalidation = true;

  }

  onAcceptDevalidation(ordreReglementTierPayant: OrdreReglementTierPayant){

    if(ordreReglementTierPayant){
      this.confirmationService.confirm({
        message: 'voulez-vous dévalider le paiement de cet ordre de reglement ?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.confirmDevalidation(ordreReglementTierPayant);
        },
      });
    }

  }

  confirmDevalidation(ordreReglementTierPayant: OrdreReglementTierPayant){
        this.tierPayantService.devaliderPaiementOrdreReglemnt(ordreReglementTierPayant).subscribe(
          response => {            

            console.log('response', response);
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

  searByOdreReglementPayeByPeriode() {

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
            this.tierPayantService.getTierPayantOrdreReglementFactureTiersPaye(dateD, dateF)
            .subscribe((response: any) => {
              this.ordreReglementList = response;
              //this.ordreReglementList$ = response;
            }, error => {
              console.error('Erreur lors de la récupération des données', error);
            });
          }
          
      }

      onSearByOdreReglementPayeByPeriode(){
        this.searByOdreReglementPayeByPeriode();
        this.searByOdreReglementPayeByPeriodeAndByTakeCheque();
        this.searByOdreReglementPayeByPeriodeAndByNotTakeCheque();
        this.searByOdreReglementPayeByPeriodeAndDevalider();
        this.isOrdreReglementList = true;
        this.isOrdreReglementListTakedCheque = false;
        this.isOrdreReglementListNotTakedCheque = false;
        this.isOrdreReglementListDevalider = false;
      }

      onSearByOdreReglementPayeByPeriodeAndByTakeCheque(){
        this.searByOdreReglementPayeByPeriodeAndByTakeCheque();
        this.isOrdreReglementListTakedCheque = true;
        this.isOrdreReglementListNotTakedCheque = false;
        this.isOrdreReglementListDevalider = false;
        this.isOrdreReglementList = false;
      }

      onSearByOdreReglementPayeByPeriodeAndByNotTakeCheque(){
        this.searByOdreReglementPayeByPeriodeAndByNotTakeCheque();
        this.isOrdreReglementListNotTakedCheque = true;
        this.isOrdreReglementListTakedCheque = false;
        this.isOrdreReglementListDevalider = false;
        this.isOrdreReglementList = false;
      }

      onSearByOdreReglementPayeByPeriodeAndDevalider(){
        this.searByOdreReglementPayeByPeriodeAndDevalider();
        this.isOrdreReglementListDevalider = true;
        this.isOrdreReglementListTakedCheque = false;
        this.isOrdreReglementListNotTakedCheque = false;
        this.isOrdreReglementList = false;
        
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
            this.tierPayantService.getTierPayantOrdreReglementFactureTiersPayeAndTackedCheque(dateD, dateF)
            .subscribe((response: any) => {
              this.ordreReglementListTakedCheque = response;
              //this.ordreReglementList$ = response;
            }, error => {
              console.error('Erreur lors de la récupération des données', error);
            });
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
            this.tierPayantService.getTierPayantOrdreReglementFactureTiersPayeAndNotTackedCheque(dateD, dateF)
            .subscribe((response: any) => {
              this.ordreReglementListNotTakedCheque = response;
              //this.ordreReglementList$ = response;
            }, error => {
              console.error('Erreur lors de la récupération des données', error);
            });
          }
          
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
            this.tierPayantService.getTierPayantOrdreReglementFactureTiersPayeDevalider(dateD, dateF)
            .subscribe((response: any) => {
              this.ordreReglementListDevalider = response;
              //this.ordreReglementList$ = response;
            }, error => {
              console.error('Erreur lors de la récupération des données', error);
            });
          }
          
      }

      onSaveOrdreReglementTakeCheque(ordreReglementTierPayant: OrdreReglementTierPayant){

        if(ordreReglementTierPayant){
          this.confirmationService.confirm({
            message: "voulez-vous indiquer que ce prestataire a touché son chèque ?",
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              this.confirmTakedCheque(ordreReglementTierPayant);
            },
          });
        }
    
      }

      confirmTakedCheque(ordreReglementTierPayant: OrdreReglementTierPayant){
        if(ordreReglementTierPayant) {
              ordreReglementTierPayant.isTakeCheque = true;
              this.tierPayantService.payerOrdreReglemnt(ordreReglementTierPayant).subscribe(
                response => {
                  if(response){
                    const isPaye = response;
                    if(isPaye === true){
                      this.isEditing = false;
                      this.rowIndex = null;
                      this.getSucessInfo();
                      this.getRefreshfunctions();
                    }
                  }
                }, error => {
                  this.getErrorInfo(error.error.message);
                }
              );
        }
    
      }


      getSucessInfo(): void {
        this.messageService.add({severity: 'success', summary: 'PAIEMENT TIERS PAYANT', detail: 'Opération réussie!'});
      }
      getCancelInfo(): void {
        this.messageService.add({severity: 'info', summary: 'PAIEMENT TIERS PAYANT', detail: 'Opération annulé!'});
      }
      getFailledInfo(): void {
        this.messageService.add({severity: 'error', summary: 'PAIEMENT TIERS PAYANT', detail: 'Opération échouée!'});
      }
      
      getErrorInfo(message: string): void {
        this.messageService.add({severity: 'error', summary: 'PAIEMENT TIERS PAYANT', detail: message});
      }


      getRefreshfunctions(){
        this.searByOdreReglementPayeByPeriode();
        this.searByOdreReglementPayeByPeriodeAndByTakeCheque();
        this.searByOdreReglementPayeByPeriodeAndByNotTakeCheque();
        this.searByOdreReglementPayeByPeriodeAndDevalider();
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

      onSelectedPrestaire(prestataire: CustumPrestatire){
        this.prestataireSelected = prestataire.libelle;
      }

      onExportAllOrdre(){
        this.ordreReglementListPrestataire = [];
        this.isAllExport = true;
        this.isTackedChequeExport = false;
        this.isWithoutTakedChequeExport = false;
        this.isDevalideChequeExport = false;
        this.messageToDisplay = '';
        this.messageToDisplay = 'Êtes-vous sûr de vouloir exportez toutes les ordres?'
        let prestataires = this.ordreReglementList.map(prestataire => prestataire.prestataire);
        this.ordreReglementListPrestataire = prestataires.map(libelle => ({ libelle }));

      }

      onExportOrdreWithTakeCheque(){
        this.ordreReglementListPrestataire = [];
        this.isTackedChequeExport = true;
        this.isAllExport = false;
        this.isWithoutTakedChequeExport = false;
        this.isDevalideChequeExport = false;
        this.messageToDisplay = '';
        this.messageToDisplay =  'Êtes-vous sûr de vouloir exportez les ordres avec prise de chèque?'
        let prestataires = this.ordreReglementListTakedCheque.map(prestataire => prestataire.prestataire);
        this.ordreReglementListPrestataire = prestataires.map(libelle => ({ libelle }));

      }

      onExportOrdreWithoutTakeCheque(){
        this.ordreReglementListPrestataire = [];
        this.isWithoutTakedChequeExport = true;
        this.isAllExport = false;
        this.isTackedChequeExport = false;
        this.isDevalideChequeExport = false;
        
        this.messageToDisplay = '';
        this.messageToDisplay =  'Êtes-vous sûr de vouloir exportez les ordres sans prise de chèque?'
        let prestataires = this.ordreReglementListNotTakedCheque.map(prestataire => prestataire.prestataire);
        this.ordreReglementListPrestataire = prestataires.map(libelle => ({ libelle }));

      }

      onExportOrdreDevalide(){
        this.ordreReglementListPrestataire = [];
        this.isDevalideChequeExport = true;
        this.isAllExport = false;
        this.isTackedChequeExport = false;
        this.isWithoutTakedChequeExport = false;
        this.isWithoutTakedChequeExport = false;
        
        this.messageToDisplay = '';
        this.messageToDisplay =  'Êtes-vous sûr de vouloir exportez les ordres dévalidés?'
        let prestataires = this.ordreReglementListDevalider.map(prestataire => prestataire.prestataire);
        this.ordreReglementListPrestataire = prestataires.map(libelle => ({ libelle }));

      }


      exportAllOrdre() {
        if (!this.dateDebut || !this.dateFin) {
          alert("Veuillez sélectionner une période !");
          return;
        }

        const dateD = formatDate(this.dateDebut, 'dd/MM/yyyy', 'en-fr');
        const dateF = formatDate(this.dateFin, 'dd/MM/yyyy', 'en-fr');
    
        this.tierPayantService.exportAllOrdreReglement(this.dateDebut, this.dateFin, this.prestataireSelected)
          .subscribe(response => {
            const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `ordre_reglement_tier_payant_paye_du_${dateD}_au_${dateF}.xlsx`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            this.isToEporteExcel = false;
            this.getSucessInfo();
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
    
        this.tierPayantService.getExportAllOrdreWithCheque(this.dateDebut, this.dateFin, this.prestataireSelected)
          .subscribe(response => {
            const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `ordre_reglement_tier_payant_paye_avec_cheque_du_${dateD}_au_${dateF}.xlsx`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            this.isToEporteExcel = false;
            this.getSucessInfo();
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
    
        this.tierPayantService.getExportAllOrdreWithoutCheque(this.dateDebut, this.dateFin, this.prestataireSelected)
          .subscribe(response => {
            const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `ordre_reglement_tier_payant_paye_sans_cheque_du_${dateD}_au_${dateF}.xlsx`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            this.isToEporteExcel = false;
            this.getSucessInfo();
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
    
        this.tierPayantService.getExportAllOrdreDevalide(this.dateDebut, this.dateFin, this.prestataireSelected)
          .subscribe(response => {
            const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `ordre_reglement_tier_payant_paye_devalide_du_${dateD}_au_${dateF}.xlsx`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            this.isToEporteExcel = false;
            this.getSucessInfo();
          }, error => {
            console.error("Erreur lors de l'exportation :", error);
          });
      }
      
      exportPrestationPrefincementToExcel() {
        if (!this.dateDebut || !this.dateFin) {
          alert("Veuillez sélectionner une période !");
          return;
        }

        const dateD = formatDate(this.dateDebut, 'dd/MM/yyyy', 'en-fr');
        const dateF = formatDate(this.dateFin, 'dd/MM/yyyy', 'en-fr');

        this.tierPayantService.exportPrestationPrefincementTierPayantToExcel(this.dateDebut, this.dateFin, this.choose)
          .subscribe(response => {
            const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `prestation_prefinancement_du_${dateD}_au_${dateF}.xlsx`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            this.isToEporteExcel = false;
            this.getSucessInfo();
          }, error => {
            console.error("Erreur lors de l'exportation :", error);
          });
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
  
      onGetComptesTiersPrestataires(){
  
          this.compteTiersService.getComptesTiersPrestataire().subscribe(
            res => {
              this.comptesTiersPrestataires = res;
            }
          );
        
      }
  
      onGetTypeJournaux(){
        this.typeJournauxService.$getTypeJournaux().subscribe(
          res => {
            this.typeJournaux = res.typeJournauxList;
          }
        );
      }
  
      onGetJournaux(){
        this.journauxService.$getJournaux().subscribe(
          res => {
            this.journaux = res.journauxList;
          }
        );
      }
  
      onInitPaiement(ordreReglementTierPayant: OrdreReglementTierPayant){

        if(ordreReglementTierPayant){
          this.isToPayeOrdreReglementTierPayant = true;
          this.ordreReglementTierPayant = ordreReglementTierPayant;
          this.oldNumeroCheque = ordreReglementTierPayant.numeroCheque;
          this.prestataire = ordreReglementTierPayant.prestataire;
          this.onFindCompteTiersByPrestataire(ordreReglementTierPayant.prestataire);
        }
      }

      onCancelPaiement(){
        this.isToPayeOrdreReglementTierPayant = false;
        this.ordreReglementTierPayant = null;
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
      this.tierPayantService.verifierExistenceNumeroCheque(numeroCheque).subscribe(
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

      onSaveOrdreReglementPaiement(ordreReglementTierPayant: OrdreReglementTierPayant){

        if(ordreReglementTierPayant){
          ordreReglementTierPayant.compteTiersPrestataire = this.comptesTiersPrestataire;
          this.confirmationService.confirm({
            message: 'voulez-vous payer cet ordre de reglement ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              this.confirmPaiemnt(ordreReglementTierPayant);
            },
          });
        }
    
      }

      confirmPaiemnt(ordreReglementTierPayant: OrdreReglementTierPayant){
        if(ordreReglementTierPayant) {
    
          ordreReglementTierPayant.isTakeCheque = false;
              this.tierPayantService.payerOrdreReglemnt(ordreReglementTierPayant).subscribe(
                response => {
                    const isPaye = response;
                    if(isPaye === true){
    
                      this.isToPayeOrdreReglementTierPayant = false;
                      this.ordreReglementTierPayant = {};
                      this.compteSelected = {};
                      this.getSucessInfo();
                      this.getRefreshfunctions();
                  }
                }, error => {
                  this.getErrorInfo(error.error.message);
                }
              );
        }
      
    
      }
    
      onCancelPaiementOrdreReglement(): void{
        this.getCancelInfo();
        this.getRefreshfunctions();
      }

      isMotifValid(): boolean {
        const motif = this.ordreReglementTierPayantToDevalide?.motifDevalidation || '';
        return motif.trim().length >= 10;
      }

      onInitExcelExport(){
        this.isToEporteExcel = true;
      }

      onFindCompteTiersByPrestataire(prestataireLibelle: string){

        this.compteTiersService.findCompteTiersByPrestataire(prestataireLibelle).subscribe(
          res => {
            this.comptesTiersPrestataire = res;
            this.comptesTiersPrestataireContact = res.compteTiers + ' - ' + res.intitule;
          }
        );
      
    }

      
  

}
