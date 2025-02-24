import { Component, OnInit } from '@angular/core';
import { error } from 'console';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BreadcrumbService } from 'src/app/app.breadcrumb.service';
import { Compte } from 'src/app/store/comptabilite/compte/model';
import { CompteService } from 'src/app/store/comptabilite/compte/service';
import { ReceteTotalDepenseTotalOrdreReglementTierPayant } from 'src/app/store/comptabilite/ReceteTotalDepenseTotalOrdreReglementTierPayant';

@Component({
  selector: 'app-approvisionnement',
  templateUrl: './approvisionnement.component.html',
  styleUrls: ['./approvisionnement.component.scss']
})
export class ApprovisionnementComponent implements OnInit {

  comptes: Compte[] = [];
  compte : Compte = {};
  compteId: string = '';
  receteTotalDepenseTotal: ReceteTotalDepenseTotalOrdreReglementTierPayant = {}
  receteTotalDepenseTotals: ReceteTotalDepenseTotalOrdreReglementTierPayant[] = [];

  isToApprov: boolean = false;

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private compteService: CompteService,
    private breadcrumbService: BreadcrumbService, 

  ) { this.breadcrumbService.setItems([{ label: 'Approvionnement'}]);}

  ngOnInit(): void {
    this.onGetComptes();
  }



  onGetComptes(){
    this.compteService.$getComptesBanquaires().subscribe(
      res => {
        if(res){
          this.comptes = res;
        }
      }
    );
  }

  onInitApprovionnement(){
    this.isToApprov = true;
  }

  onDoApprovionnement(compte: Compte){
    if(compte){
      const compteId = compte.id;
      const montant = compte.montant;

      if(compteId && montant){

        this.confirmationService.confirm({
          message: 'Êtes-vous sûr de vouloir ?',
          header: 'Confirmation',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.onConfirmApprovionnement(compteId, montant);
          },
        });
      }
    }
  }

  onConfirmApprovionnement( compteId: string, montant: any){
    this.compteService.approvisionnerCompte(compteId, montant).subscribe(
      res => {
        if(res){
          this.getSucessInfo();
          this.onGetComptes();
          this.isToApprov = false;
          this.compte = {};
        }
      },error =>{
          this.getErrorInfo(error.message.message);
      }
    );
  }

  getSucessInfo(): void {
    this.messageService.add({severity: 'success', summary: 'APPROVIONNEMENT', detail: 'Opération réussie!'});
  }
  getCancelInfo(): void {
    this.messageService.add({severity: 'info', summary: 'APPROVIONNEMENT', detail: 'Opération annulé!'});
  }
  getFailledInfo(): void {
    this.messageService.add({severity: 'error', summary: 'APPROVIONNEMENT', detail: 'Opération échouée!'});
  }
  
  getErrorInfo(message: string): void {
    this.messageService.add({severity: 'error', summary: 'APPROVIONNEMENT', detail: message});
  }

}
