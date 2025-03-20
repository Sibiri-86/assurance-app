import { Component, OnInit } from '@angular/core';
import { ExportPrestationService } from './export-prestation.service';
import { formatDate } from '@angular/common';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-export-prestation',
  templateUrl: './export-prestation.component.html',
  styleUrls: ['./export-prestation.component.scss']
})
export class ExportPrestationComponent implements OnInit {

  dateDebut: any;
  dateFin: any;
  choose: string ='';
  displayExportDialogue = false;

  PREFINANCEMENT = 'PREFINANCEMENT';
  TIERSPAYANT = 'TIERSPAYANT';

  constructor(
    private exportPrestationService: ExportPrestationService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
  }


  onInitExportation(){
    this.displayExportDialogue =true;
  }


   exportPrestationPrefincementToExcel() {
          if (!this.dateDebut || !this.dateFin) {
            alert("Veuillez sélectionner une période !");
            return;
          }
  
          const dateD = formatDate(this.dateDebut, 'dd/MM/yyyy', 'en-fr');
          const dateF = formatDate(this.dateFin, 'dd/MM/yyyy', 'en-fr');
          const choose ='PREFINANCEMENT';
          this.exportPrestationService.exportPrestationPrefincementTierPayantToExcel(this.dateDebut, this.dateFin, choose)
            .subscribe(response => {
              const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `prestation_prefinancement_du_${dateD}_au_${dateF}.xlsx`;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              this.displayExportDialogue = false;
              this.getSucessInfo();
              this.dateDebut = '';
              this.dateFin = '';

            }, error => {
              this.getErrorInfo(error.error.message);
              console.error("Erreur lors de l'exportation :", error);
            });
        } 

   exportPrestationTierPayantToExcel() {
          if (!this.dateDebut || !this.dateFin) {
            alert("Veuillez sélectionner une période !");
            return;
          }
  
          const dateD = formatDate(this.dateDebut, 'dd/MM/yyyy', 'en-fr');
          const dateF = formatDate(this.dateFin, 'dd/MM/yyyy', 'en-fr');
          const choose ='TIERSPAYANT';
          this.exportPrestationService.exportPrestationPrefincementTierPayantToExcel(this.dateDebut, this.dateFin, choose)
            .subscribe(response => {
              const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `prestation_tiers_payant_du_${dateD}_au_${dateF}.xlsx`;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              this.displayExportDialogue = false;
              this.getSucessInfo();
              this.dateDebut = '';
              this.dateFin = '';

            }, error => {
              this.getErrorInfo(error.error.message);
              console.error("Erreur lors de l'exportation :", error);
            });
        } 
   exportPrestationPrefinancementAndTierPayantToExcel() {
          if (!this.dateDebut || !this.dateFin) {
            alert("Veuillez sélectionner une période !");
            return;
          }
  
          const dateD = formatDate(this.dateDebut, 'dd/MM/yyyy', 'en-fr');
          const dateF = formatDate(this.dateFin, 'dd/MM/yyyy', 'en-fr');
          const choose ='ALL';
          this.exportPrestationService.exportPrestationPrefincementTierPayantToExcel(this.dateDebut, this.dateFin, choose)
            .subscribe(response => {
              const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `prestation_prefinancement_et_tiers_payant_du_${dateD}_au_${dateF}.xlsx`;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              this.displayExportDialogue = false;
              this.getSucessInfo();
              this.dateDebut = '';
              this.dateFin = '';
            }, error => {
              console.error("Erreur lors de l'exportation :", error);
              this.getErrorInfo(error.error.message);
            });
        } 

   exportBonDePriseEnChargeToExcel() {
          if (!this.dateDebut || !this.dateFin) {
            alert("Veuillez sélectionner une période !");
            return;
          }
  
          const dateD = formatDate(this.dateDebut, 'dd/MM/yyyy', 'en-fr');
          const dateF = formatDate(this.dateFin, 'dd/MM/yyyy', 'en-fr');
          const choose ='BONDEPRISENECHARGE';
          this.exportPrestationService.exportPrestationPrefincementTierPayantToExcel(this.dateDebut, this.dateFin, choose)
            .subscribe(response => {
              const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `bon_de_prise_en_charge_du_${dateD}_au_${dateF}.xlsx`;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              this.displayExportDialogue = false;
              this.getSucessInfo();
              this.dateDebut = '';
              this.dateFin = '';
            }, error => {
              console.error("Erreur lors de l'exportation :", error);
              this.getErrorInfo(error.error.message);
            });
        } 


        getSucessInfo(): void {
          this.messageService.add({severity: 'success', summary: 'EXPORTATION', detail: 'Opération réussie!'});
        }
        getCancelInfo(): void {
          this.messageService.add({severity: 'info', summary: 'EXPORTATION', detail: 'Paiement annulé!'});
        }
        getFailledInfo(): void {
          this.messageService.add({severity: 'error', summary: 'EXPORTATION', detail: 'Paiement échouée!'});
        }
        
        getErrorInfo(message: string): void {
          this.messageService.add({severity: 'error', summary: 'EXPORTATION', detail: message});
        }
      
}
