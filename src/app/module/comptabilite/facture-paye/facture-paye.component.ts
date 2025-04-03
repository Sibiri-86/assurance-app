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
import * as featureActionBanque from '../../../store/parametrage/Banques/actions';
import { formatDate } from '@angular/common';
import { TiersService } from 'src/app/store/comptabilite/tiers/service';
import { TierPayantService } from 'src/app/store/prestation/tierPayant/service';
import { error } from 'console';

@Component({
  selector: 'app-facture-paye',
  templateUrl: './facture-paye.component.html',
  styleUrls: ['./facture-paye.component.scss']
})
export class FacturePayeComponent implements OnInit {
  destroy$ = new Subject<boolean>();
  ordreReglementList: Array<OrdreReglementTierPayant>;
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

  constructor(private store: Store<AppState>,
              private confirmationService: ConfirmationService,
              private tierPayantService: TierPayantService,
              private messageService: MessageService, private breadcrumbService: BreadcrumbService) {
  this.breadcrumbService.setItems([{ label: 'Factures payés' }]);
}

  ngOnInit(): void {
    this.onSerByOdreReglementPayeByPeriode();
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
            if(response && response === true){
              
              this.getSucessInfo();
              this.isToDisplayMotifDevalidation = false;
              this.onSerByOdreReglementPayeByPeriode();
            }
            if(response && response === false){
              
              this.getFailledInfo();
            }
          }, error => {
            this.getErrorInfo(error.message.message);
          }
        );

        this.onSerByOdreReglementPayeByPeriode();

  }


  onInitTakingCheque(ri: number){
    this.rowIndex = ri;
    this.isEditing = true;
  }

  onCancelTakingCheque(){

    this.isEditing = false;
    this.isToDisplayMotifDevalidation = false;

    this.getCancelInfo();
    this.onSerByOdreReglementPayeByPeriode();
  }

    onSerByOdreReglementPayeByPeriode() {

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

              console.log('ordreReglementList' , this.ordreReglementList);
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
                      this.getSucessInfo();
                      this.isEditing = false;
                      this.onSerByOdreReglementPayeByPeriode();
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


      exportExcel() {
        if (!this.dateDebut || !this.dateFin) {
          alert("Veuillez sélectionner une période !");
          return;
        }

        const dateD = formatDate(this.dateDebut, 'dd/MM/yyyy', 'en-fr');
        const dateF = formatDate(this.dateFin, 'dd/MM/yyyy', 'en-fr');
    
        this.tierPayantService.exportOrdreReglement(this.dateDebut, this.dateFin)
          .subscribe(response => {
            const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `ordre_reglement_tier_payant_paye_du_${dateD}_au_${dateF}.xlsx`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
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
          }, error => {
            console.error("Erreur lors de l'exportation :", error);
          });
      }

}
