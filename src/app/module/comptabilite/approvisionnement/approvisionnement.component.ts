import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BreadcrumbService } from 'src/app/app.breadcrumb.service';
import { Compte } from 'src/app/store/comptabilite/compte/model';
import { CompteService } from 'src/app/store/comptabilite/compte/service';
import { ReceteTotalDepenseTotalOrdreReglementTierPayant } from 'src/app/store/comptabilite/ReceteTotalDepenseTotalOrdreReglementTierPayant';
import { ReceteTotalDepenseTotalOrdreReglementTierPayantService } from 'src/app/store/comptabilite/totalRectteTotalDepense/ReceteTotalDepenseTotalOrdreReglementTierPayantService';

@Component({
  selector: 'app-approvisionnement',
  templateUrl: './approvisionnement.component.html',
  styleUrls: ['./approvisionnement.component.scss']
})
export class ApprovisionnementComponent implements OnInit {

  comptes: Compte[] = [];
  compte : Compte = {};
  compteSelected : Compte = {};
  compteId: string = '';
  receteTotalDepenseTotal: ReceteTotalDepenseTotalOrdreReglementTierPayant = {}
  receteTotalDepenseTotals: ReceteTotalDepenseTotalOrdreReglementTierPayant[] = [];

  isToApprov: boolean = false;

  recettes: any[] = [];
  page: number = 0;
  size: number = 10;
  startDate: string = '';
  endDate: string = '';

  totalElements: number = 0;

  isByCompte  = false;
  isListe  = false;
  isByDate  = false;
  firstOccurance : ReceteTotalDepenseTotalOrdreReglementTierPayant;

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private compteService: CompteService,
    private breadcrumbService: BreadcrumbService, 
    private receteTotalDepenseTotalService: ReceteTotalDepenseTotalOrdreReglementTierPayantService

  ) { this.breadcrumbService.setItems([{ label: 'Approvionnement'}]);}

  ngOnInit(): void {
    this.onGetComptes();
    this.loadRecettes();
    this.findfirst();
    
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
          this.loadRecettes();
          this.findfirst();
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

  // Charger toutes les recettes triées par ID décroissant
  loadRecettes(): void {
    this.receteTotalDepenseTotalService.getAllOrderedDesc(this.page, this.size).subscribe(data => {
      this.receteTotalDepenseTotals = data.content;
      this.totalElements = data.totalElements;
      this.isByCompte  = false;
      this.isListe  = true;
      this.isByDate  = false;

    });
  }

  findfirst(): void {
    this.receteTotalDepenseTotalService.findfirst().subscribe(data => {
      this.firstOccurance = data;
    });
  }

    // Méthode appelée lorsqu'on change de page
  onPageChange(event: any): void {
    this.page = event.first / event.rows;
    this.size = event.rows;
    if(this.isByCompte){
        this.filterByCompte(this.compteId);
    }
    if(this.isByDate){
      this.filterByDate();
    }
    if(this.isListe){
      this.loadRecettes();
    }
  }

    // Filtrer par plage de dates
    filterByDate(): void {
      if (!this.startDate || !this.endDate) {
        alert('Veuillez sélectionner les dates.');
        return;
      }
  
      this.receteTotalDepenseTotalService.getByDateRange(this.startDate, this.endDate, this.page, this.size).subscribe(data => {
        this.receteTotalDepenseTotals = data.content;
        this.totalElements = data.totalElements;
        this.isByCompte  = false;
        this.isListe  = false;
        this.isByDate  = true;
      });
    }


  // Filtrer par compte
  filterByCompte(compteId?: string): void {
    if (!compteId) {
      alert('Veuillez selectionner un compte!');
      return;
    }
    this.compteId = compteId;

    this.receteTotalDepenseTotalService.getByCompteId(compteId, this.page, this.size).subscribe(data => {
      this.receteTotalDepenseTotals = data.content;
      this.totalElements = data.totalElements;
      this.isByCompte  = true;
      this.isListe  = false;
      this.isByDate  = false;
    });
  }

}
