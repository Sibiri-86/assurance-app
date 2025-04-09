import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Report } from 'src/app/store/contrat/police/model';
import { Banque } from 'src/app/store/parametrage/Banques/model';
import { TierPayantService } from 'src/app/store/prestation/tierPayant/service';
import { formatDate } from '@angular/common';
import { Compte,  } from 'src/app/store/comptabilite/compte/model';
import { Tiers } from 'src/app/store/comptabilite/tiers/model';
import { TypeJournaux } from 'src/app/store/parametrage/typeJournaux/model';
import { Journaux} from 'src/app/store/comptabilite/journaux/model';
import { KeycloakService } from 'keycloak-angular';
import { OrdreReglementTierPayant, Prestation, SinistreTierPayant } from 'src/app/store/prestation/tierPayant/model';
import { Function } from 'src/app/module/common/config/role.user';
import { BreadcrumbService } from 'src/app/app.breadcrumb.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TypeReport } from 'src/app/store/contrat/enum/model';
import * as tierPayantSelector from '../../../../store/prestation/tierPayant/selector';
import * as featureActionTierPayant from '../../../../store/prestation/tierPayant/action';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { takeUntil } from 'rxjs/operators';
import { printPdfFile } from 'src/app/module/util/common-util';
import * as flatted from 'flatted';
import { NgModel } from '@angular/forms';
import { error } from 'console';

@Component({
  selector: 'app-consulation-ordre-tier-payant',
  templateUrl: './consulation-ordre-tier-payant.component.html',
  styleUrls: ['./consulation-ordre-tier-payant.component.scss']
})
export class ConsulationOrdreTierPayantComponent implements OnInit {
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
  sinistreTierPayants: SinistreTierPayant [] = [];

  page : number = 0;
  size : number = 10;
  rowIndex : number = null;
  editing = false;

  comptes: Compte[] = [];
  comptesTiers: Tiers[] = [];
  typeJournaux: TypeJournaux[] = [];
  journaux: Array<Journaux>
  compteCollectifId: string;
  compteSelected: Compte;

  numeroCheque: string = '';
  existe: boolean | null = null;
  tierpayantToPrint: SinistreTierPayant = {};

  sticker: string = '';
  stickerConfirmation: string = '';
  isStickerConfimartion: boolean = null;

  constructor(
              private store: Store<AppState>,
              private tierPayantService: TierPayantService,
              private keycloak: KeycloakService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private breadcrumbService: BreadcrumbService) {
  this.breadcrumbService.setItems([{ label: 'Factures impayées' }]);
}

  ngOnInit(): void {
    this.onSerByOdreReglementByPeriode();

    
    this.store.dispatch(featureActionTierPayant.setReportTierPayant(null));
        this.store.pipe(select(tierPayantSelector.selectByteFile)).pipe(takeUntil(this.destroy$))
            .subscribe(bytes => {
              if (bytes) {
                printPdfFile(bytes);
              }
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

    onGetSinistreByOrdreReglementId(idOrdreReglement?: string) {      
      this.idOrdreReglement = idOrdreReglement;    
      if (idOrdreReglement) {
        this.tierPayantService.getSinistreByOrdreReglementId(idOrdreReglement, this.page, this.size).subscribe(response => {
          this.sinistreTierPayants = response.content;
          this.totalRecordSinistreTierPayantsecords = response.totalElements;
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
      if(sinistreId){
        const page = 0;
        this.tierPayantService.getPrestationBySinistreId(sinistreId, page, this.size).subscribe(
          response => {
            this.prestations = response.content;
            this.displayPrestation = true;
            this.totalRecordPprestations = response.totalElements;
          }
        );
      }
    }
    
    imprimerPrestation(prestation: Prestation) {

        this.report.sinistreTierPayantDTO = prestation.sinistreTierPayant;
        this.report.sinistreTierPayantDTO.prestation = [];

        this.report.sinistreTierPayantDTO.prestation.push(prestation);
        delete this.report.sinistreTierPayantDTO.prestation[0].sinistreTierPayant;
      
        this.report.typeReporting = TypeReport.TIERPAYANT_FICHE_DETAIL_REMBOURSEMENT;
        this.tierPayantService.$getReport(this.report).subscribe();

        this.store.dispatch(featureActionTierPayant.FetchReportTierPayant(this.report));
        this.report.sinistreTierPayantDTO = prestation.sinistreTierPayant;

      }

        imprimerOrdreReglementTierPayant(ordre: OrdreReglementTierPayant) {
          this.report.typeReporting = TypeReport.ORDRE_REGLEMENT_TIER_PAYANT;
          this.report.ordreReglementDto = ordre;
          this.store.dispatch(featureActionTierPayant.FetchReportTierPayant(this.report));
        }
      

      onIniteStickerUpdate(ordre: OrdreReglementTierPayant, rowIndex: number){
        this.rowIndex = rowIndex;
        this.isEditing = true;
        this.ordreReglementTierPayant = ordre;
      }

      onUpdateSticker(ordreReglementTierPyant: OrdreReglementTierPayant){

        if(ordreReglementTierPyant){
          this.confirmationService.confirm({
            message: 'voulez-vous payer cet ordre de reglement ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
              this.onConfirmStickerUpdating(ordreReglementTierPyant);
            },
          });
        }
    

      }

      getStickerConfirmation(sticker){

        this.tierPayantService.getStickerConfirmation(sticker).subscribe( 
           response => {
            if(response){
              this.sticker = response;
              if(sticker != ''){
                this.isStickerConfimartion = true;
              }

            }
            if(!response){
              this.isStickerConfimartion = false;
            }
    
           }
        );
    
      }


      onConfirmStickerUpdating(ordreReglementTierPyant : OrdreReglementTierPayant){

        if(ordreReglementTierPyant && ordreReglementTierPyant.sticker){
          ordreReglementTierPyant.sticker.trim();
          this.tierPayantService.updatedOrdreTierTierPayantSticker(ordreReglementTierPyant).subscribe(
              response => {
                if(response){
                  this.rowIndex = null;
                  this.isEditing = false;
                  this.isStickerConfimartion = false;
                  this.getSucessInfo();
                  this.onSerByOdreReglementByPeriode();
                }
              }, 
              error => {
                this.getErrorInfo(error.error.message);
              }
          );
        }
      }

      onCancelStickerUpdated(ordre?: OrdreReglementTierPayant, sticker? : string){
        this.rowIndex = null;
        this.isEditing = false;
        ordre.sticker = null;
        this.ordreReglementTierPayant = ordre;
        this.isStickerConfimartion = false;
        this.getCancelInfo();
      }


      getSucessInfo(): void {
        this.messageService.add({severity: 'success', summary: 'CONSULTATION TIERS PAYANT', detail: 'Opération réussie!'});
      }
      getCancelInfo(): void {
        this.messageService.add({severity: 'info', summary: 'CONSULTATION TIERS PAYANT', detail: 'Opération annulé!'});
      }
      getFailledInfo(): void {
        this.messageService.add({severity: 'error', summary: 'CONSULTATION TIERS PAYANT', detail: 'Opération échouée!'});
      }
      
      getErrorInfo(message: string): void {
        this.messageService.add({severity: 'error', summary: 'CONSULTATION TIERS PAYANT', detail: message});
      }

    
}
