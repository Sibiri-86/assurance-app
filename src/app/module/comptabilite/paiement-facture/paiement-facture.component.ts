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
import * as featureActionBanque from '../../../store//parametrage/Banques/actions';
import { TierPayantService } from 'src/app/store/prestation/tierPayant/service';
import { formatDate } from '@angular/common';
import { error } from 'console';
import { CompteService } from 'src/app/store/comptabilite/compte/service';
import { Compte, CompteList } from 'src/app/store/comptabilite/compte/model';
import { TiersService } from 'src/app/store/comptabilite/tiers/service';
import { Tiers } from 'src/app/store/comptabilite/tiers/model';
import { TypeJournaux } from 'src/app/store/parametrage/typeJournaux/model';
import { TypeJournauxService } from 'src/app/store/parametrage/typeJournaux/service';
import { JournauxService } from 'src/app/store/comptabilite/journaux/service';
import { Journaux} from 'src/app/store/comptabilite/journaux/model';
import { KeycloakService } from 'keycloak-angular';
import { Function } from '../../common/config/role.user';
import { Prestataire } from 'src/app/store/parametrage/prestataire/model';


@Component({
  selector: 'app-paiement-facture',
  templateUrl: './paiement-facture.component.html',
  styleUrls: ['./paiement-facture.component.scss']
})
export class PaiementFactureComponent implements OnInit {
  destroy$ = new Subject<boolean>();
  ordreReglementList: Array<OrdreReglementTierPayant>;
  ordreReglementList$: Observable<Array<OrdreReglementTierPayant>>;
  cols: any[];
  displaySinistre = false;
  isEditing = false;
  isToPayeOrdreReglementTierPayant = false;
  displayPrestation = false;
  sinistreTierPayant: Array<SinistreTierPayant>;
  prestations: Array<Prestation>;
  report: Report = {};
  displayPaiement = false;
  ordreReglementPaiement: OrdreReglementTierPayant = {};
  banqueList$: Observable<Array<Banque>>;
  banqueList: Array<Banque>;
  typePaiement = Object.keys(TypePaiement).filter(kj=>kj !==TypePaiement.ORANGE_MONEY && kj !== TypePaiement.MOOV_MONEY && kj !== TypePaiement.ESPECE).map(key => ({ label: TypePaiement[key], value: key }));
  type = TypePaiement.CHEQUE;
  sm_finance_voir_detail_ordre = this.keycloak.isUserInRole(Function.sm_finance_voir_detail_ordre);
  sm_finance_payer_ordreTiersPayant = this.keycloak.isUserInRole(Function.sm_finance_payer_ordreTiersPayant);

  dateDebut: any;
  dateFin: any;
  loading: false;
  totalRecords: number;
  totalRecordSinistreTierPayantsecords: number;
  totalRecordPprestations: number;
  idOrdreReglement: string;
  ordreReglementTierPayant: OrdreReglementTierPayant = {};
  prestataire: string = '';
  sinistreTierPayants: SinistreTierPayant [] = [];

  page : number = 0;
  size : number = 10;
  editing = false;

  comptes: Compte[] = [];
  comptesTiers: Tiers[] = [];
  comptesTiersPrestataires: Tiers[] = [];
  comptesTiersPrestataire: Tiers;
  comptesTiersPrestataireContact: string;
  typeJournaux: TypeJournaux[] = [];
  journaux: Array<Journaux>
  compteCollectifId: string;
  compteSelected: Compte;

  numeroCheque: string = '';
  existe: boolean | null = null;
  sticker: string = '';
  stickerConfirmation: string = '';
  isStickerConfimartion: boolean = null;

  constructor(private store: Store<AppState>,
              private confirmationService: ConfirmationService,
              private tierPayantService: TierPayantService,
              private keycloak: KeycloakService,
              private compteService: CompteService,
              private compteTiersService: TiersService,
              private typeJournauxService: TypeJournauxService,
              private journauxService: JournauxService,
              private messageService: MessageService, private breadcrumbService: BreadcrumbService) {
  this.breadcrumbService.setItems([{ label: 'Factures impayées' }]);
}

  ngOnInit(): void {

    this.onGetComptes();
    this.onGetComptesTiersByCompteCollectifAndGarand();
    this.onSerByOdreReglementByPeriode();
   this.onGetComptesTiersPrestataires();
    //this.onGetTypeJournaux();
    this.onGetJournaux();
   /*  this.store.dispatch(featureActionTierPayant.setReportTierPayant(null));
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
        }); */

/*     this.ordreReglementList$ = this.store.pipe(select(tierPayantSelector.ordreReglementTierPayantList));
    this.store.dispatch(featureActionTierPayant.loadTierPayantOrdreReglementFactureInstance());
    this.ordreReglementList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      console.log(value);
      if (value) {
        this.ordreReglementList = value.slice();
    }
    }); */


   // this.initSearch();

  }
  paiement(ordre: OrdreReglement) {
    this.displayPaiement = true;
    this.ordreReglementPaiement = ordre;
   
  }
  checkType() {
    if(this.ordreReglementPaiement.typePaiement) {
      this.type = this.ordreReglementPaiement.typePaiement;
    }
    
  }

  deValiderOrdreReglement(ordre: OrdreReglementTierPayant) {
    this.confirmationService.confirm({
      message: 'voulez-vous annuler cet ordre de reglement',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(featureActionTierPayant.deValiderOrdreReglement({ordre, etat: TypeEtatOrdreReglement.DEVALIDE}));
      },
    });
  }
  
  addMessage(severite: string, resume: string, detaile: string): void {
    this.messageService.add({severity: severite, summary: resume, detail: detaile});
  }

    
    onSerByOdreReglementByPeriode() {
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
          this.tierPayantService.$getTierPayantOrdreReglementFactureIstance2(dateD, dateF)
          .subscribe((response: any) => {
            this.ordreReglementList = response;
            this.ordreReglementList$ = response;
            }, error => {
            console.error('Erreur lors de la récupération des données', error);
          });
        }
        
    }

    onGetComptesTiersBySelectedCompteCollectifId(compteSelected: Compte){
      this.compteSelected = compteSelected;
    }

    onGetSinistreByOrdreReglementId(idOrdreReglement?: string) {      
      this.idOrdreReglement = idOrdreReglement;    
      if (idOrdreReglement) {
        this.tierPayantService.getSinistreByOrdreReglementId(idOrdreReglement, this.page, this.size).subscribe(response => {
          this.sinistreTierPayants = response.content;
          this.totalRecordSinistreTierPayantsecords = response.totalElements;  // Nombre total d'enregistrements
          this.displaySinistre = true;
        });
      }
    }

    onChangePageSinistreTierPayant(event:any){
      this.page = event ? event.first / event.rows : 0;
      this.size = event ? event.rows : 10;
      this.onGetSinistreByOrdreReglementId(this.idOrdreReglement);
    }

    onChangePagePrestationBySinistre(event:any){
      this.page = event ? event.first / event.rows : 0;
      this.size = event ? event.rows : 10;
      this.onGetPrestationBySinistreId(this.idOrdreReglement);
    }
    

    onGetPrestationBySinistreId(sinistreId: string){
      if(sinistreId)
      this.tierPayantService.getPrestationBySinistreId(sinistreId, this.page, this.size).subscribe(
        response => {
          this.prestations = response.content;
          this.displayPrestation = true;
          this.totalRecordPprestations = response.totalElements;

        }
      );
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

    onFindCompteTiersByPrestataire(prestataireLibelle: string){

        this.compteTiersService.findCompteTiersByPrestataire(prestataireLibelle).subscribe(
          res => {
            this.comptesTiersPrestataire = res;
            this.comptesTiersPrestataireContact = res.compteTiers + ' - ' + res.intitule;
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


  imprimer(pref: OrdreReglementTierPayant) {
    this.report.typeReporting = TypeReport.ORDRE_REGLEMENT_TIER_PAYANT;
    this.report.ordreReglementTierPayant = pref;
    this.store.dispatch(featureActionTierPayant.FetchReportTierPayant(this.report));
  }

  paiementCheque() {
    this.store.dispatch(featureActionTierPayant.validerPaiement({ordre: this.ordreReglementPaiement}));
    this.ordreReglementPaiement = {};
    this.displayPaiement = false;
    //this.store.dispatch(featureActionPrefinancement.loadOrdrePaiementInstance());

  }
  voirSinistre(ordre: OrdreReglementTierPayant) {
    console.log('****************ordre****************', ordre);
    this.displaySinistre = true;
    this.sinistreTierPayant = ordre.tierPayant;
    console.log('****************sinistreTierPayant****************', this.sinistreTierPayant);
  }

  onRowEditInit() {
   this.isEditing = true;
}

  onSaveOrdreReglementPaiement(ordreReglementTierPayant: OrdreReglementTierPayant){

    if(ordreReglementTierPayant){
      ordreReglementTierPayant.compteTiersPrestataire = this.comptesTiersPrestataire;
      this.confirmationService.confirm({
        message: 'voulez-vous payer cet ordre de reglement ?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.confirmPaiement(ordreReglementTierPayant);
        },
      });
    }

  }



  getStickerConfirmation1(sticker){

    this.tierPayantService.getStickerConfirmation(sticker).subscribe( 
       response => {
        if(response){
          this.sticker = response;
          if(sticker != ''){

            this.isStickerConfimartion = true;
          }
          if(sticker == ''){

            this.isStickerConfimartion = false;
          }
        }

       }
    );

  }

  getStickerConfirmation2(ordreReglementTierPayant: OrdreReglementTierPayant){
    
    this.isStickerConfimartion = true;
    this.sticker = ordreReglementTierPayant.sticker.trim().toString();

    this.stickerConfirmation = ordreReglementTierPayant.stickerConfirmation.trim().toString();

    if(this.sticker === this.stickerConfirmation){
      this.isStickerConfimartion = true;
    }
    if(this.sticker !== this.stickerConfirmation){
      this.isStickerConfimartion = false;
    }
    

  }


  getStickerConfirmation(ordreReglementTierPayant: OrdreReglementTierPayant): void {
     this.sticker = ordreReglementTierPayant.sticker?.trim();
     this.stickerConfirmation = ordreReglementTierPayant.stickerConfirmation?.trim();

    if(this.sticker == this.stickerConfirmation){
      this.isStickerConfimartion = true;

    }
    if(this.sticker != this.stickerConfirmation){
      this.isStickerConfimartion = false;
    }


  }
  
    onCancelPaiement(){
      this.isToPayeOrdreReglementTierPayant = false;
      this.ordreReglementTierPayant = null;
      this.comptesTiersPrestataire = null;
      this.comptesTiersPrestataireContact = null;
      this.sticker = '';
      this.stickerConfirmation = '';
      this.isStickerConfimartion = null;
    }

  confirmPaiement(ordreReglementTierPayant: OrdreReglementTierPayant){
    if(ordreReglementTierPayant && ordreReglementTierPayant.compteTiersPrestataire != null) {

      ordreReglementTierPayant.isTakeCheque = false;
          this.tierPayantService.payerOrdreReglemnt(ordreReglementTierPayant).subscribe(
            response => {
              if(response){
                const isPaye = response;
                if(isPaye === true){

                  this.isToPayeOrdreReglementTierPayant = false;
                  this.ordreReglementTierPayant = {};
                  this.compteSelected = {};
                  this.comptesTiersPrestataire = null;
                  this.comptesTiersPrestataireContact = null;
                  this.sticker = '';
                  this.stickerConfirmation = '';
                  this.isStickerConfimartion = null;

                  this.getSucessInfo();
                  this.onSerByOdreReglementByPeriode();
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

    this.onSerByOdreReglementByPeriode();

  }

  onCancelPaiementOrdreReglement(): void{
    this.getCancelInfo();
  }


  onInitPaiement(ordreReglementTierPayant: OrdreReglementTierPayant){

    if(ordreReglementTierPayant){
      this.isToPayeOrdreReglementTierPayant = true;
      this.ordreReglementTierPayant = ordreReglementTierPayant;
      this.prestataire = ordreReglementTierPayant.prestataire;
      this.onFindCompteTiersByPrestataire(ordreReglementTierPayant.prestataire);
    }
  }



  getSucessInfo(): void {
    this.messageService.add({severity: 'success', summary: 'PAIEMENT TIERS PAYANT', detail: 'Opération réussie!'});
  }
  getCancelInfo(): void {
    this.messageService.add({severity: 'info', summary: 'PAIEMENT TIERS PAYANT', detail: 'Paiement annulé!'});
  }
  getFailledInfo(): void {
    this.messageService.add({severity: 'error', summary: 'PAIEMENT TIERS PAYANT', detail: 'Paiement échouée!'});
  }
  
  getErrorInfo(message: string): void {
    this.messageService.add({severity: 'error', summary: 'PAIEMENT TIERS PAYANT', detail: message});
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

}
