import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'console';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AdherentFamille } from 'src/app/store/contrat/adherent/model';
import { Exercice } from 'src/app/store/contrat/exercice/model';
import { ExerciceService } from 'src/app/store/contrat/exercice/service';
import { Groupe } from 'src/app/store/contrat/groupe/model';
import { GroupeService } from 'src/app/store/contrat/groupe/service';
import { HistoriqueAvenant, TypeDemandeur, TypeHistoriqueAvenant } from 'src/app/store/contrat/historiqueAvenant/model';
import { HistoriqueAvenantService } from 'src/app/store/contrat/historiqueAvenant/service';
import { Police } from 'src/app/store/contrat/police/model';
import { PoliceService } from 'src/app/store/contrat/police/service';

@Component({
  selector: 'app-new-avenant-incorporation',
  templateUrl: './new-avenant-incorporation.component.html',
  styleUrls: ['./new-avenant-incorporation.component.scss']
})
export class NewAvenantIncorporationComponent implements OnInit {

  selectedFile?: File;
  isToImporteExcelFile: boolean = true;
  exercices: Exercice[] = [];
  groupesByPolicy: Groupe [] = [];
  incorporationDate: any;
  avenantDate: any;
  historiqueAvenant: HistoriqueAvenant = {};
  file:any;
  curentGroupe: Groupe = {};
  curentExercice: Exercice = {};
  adherentFamilleListe: AdherentFamille[] = [];

  isInValidateDateAvenant = false;
  isInValidateDateEffect = false;
  

  @Input() policeSelected: Police;

  demandeursList: any = [
      {libelle: 'VIMSO', value: TypeDemandeur.VIMSO},
      {libelle: 'SOUSCRIPTEUR', value: TypeDemandeur.SOUSCRIPTEUR},
      {libelle: 'GARANT', value: TypeDemandeur.GARANT}
      ];

  constructor(
      private http: HttpClient,
      private router : Router,
      private exerciceService: ExerciceService,
      private groupeService: GroupeService,
      private historiqueAvenantService: HistoriqueAvenantService,
      private policeService: PoliceService,
      private messageService: MessageService,
      private confirmationService: ConfirmationService,
    ) {}

  ngOnInit(): void {

    this.historiqueAvenant = {
        observation: 'INCORPORATION'
      };

    this.loadExerciceByPolice();
    this.loadGroupeByPolice();

  }


  loadExerciceByPolice(){
    if(this.policeSelected && this.policeSelected.id){
        this.exerciceService.$getExercices(this.policeSelected.id).subscribe(
         res => {
           this.exercices = res;
         }
        );
    }
  }

  loadGroupeByPolice(){
    if(this.policeSelected && this.policeSelected.id){
        this.groupeService.$getGroupes(this.policeSelected.id).subscribe(
         res => {
           this.groupesByPolicy = res.groupeDtoList;
         }
        );
    }
  }


  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }


  onInitIncorporation(){
    this.isToImporteExcelFile = true;
  }

    onTabChange(event: any) {
      if (event.index === 0) {
          this.onInitIncorporation();
      }
  }

  onSelectedAvenatDate(avenantDate: any){
    this.avenantDate = avenantDate;
  }

  onSelectedIncorporationDateDate(avenantDate: any){
    this.incorporationDate = avenantDate;
  }

  addMessage(severite: string, resume: string, detaile: string): void {
        this.messageService.add({severity: severite, summary: resume, detail: detaile});
    }


  /* getFiles(event: File) {

    console.log('event', event);
       //  this.historiqueAvenant1.fileToLoad = event;
        this.historiqueAvenant.fileToLoad = event;
        this.selectedFile = event;
        this.policeService.loadAdherentsByExcelFile(event).subscribe(
            (res) => {
                if(res) {
                    if(this.curentGroupe.id !== undefined && this.curentExercice.id !== undefined) {
                        console.log('***************1111111111 ');
                        console.log('***************1111111111 ', this.curentGroupe.id);
                        console.log('***************1111111111 ', this.curentExercice.id);
                        this.adherentFamilleListe = res.slice();
                        this.adherentFamilleListe.forEach(p=> {
                            p.groupeFamille = this.curentGroupe;
                        });
                    } else {
                        console.log('***************222222222 ');
                        this.addMessage('error', 'Groupe ou Exercice non sélectionnés',
                            'Veuillez selectionner un groupe et un exercice avant de faire cette action !!');
                    }
                    
                }
            }
        );
    } */

    getFiles(event: Event) {
      const input = event.target as HTMLInputElement;
      if (input?.files?.length) {
        this.file = input.files[0];
        this.historiqueAvenant.fileToLoad = this.file;
        this.selectedFile = this.file;
/* 
        this.policeService.loadAdherentsByExcelFile(file).subscribe((res) => {
          if (res) {
            if (this.curentGroupe?.id && this.curentExercice?.id) {
              this.adherentFamilleListe = res.slice();
              this.adherentFamilleListe.forEach(p => {
                p.groupeFamille = this.curentGroupe;
              });
            } else {
              this.addMessage('error', 'Groupe ou Exercice non sélectionnés',
                'Veuillez sélectionner un groupe et un exercice avant de faire cette action !!');
            }
          }
        }); */

      }
}

    onCompareDateAvenant(historiqueAvenant: any) {
      const dateAvenant = new Date(historiqueAvenant.dateAvenant);
      const dateIncorparation = new Date(historiqueAvenant?.dateIncorparation);

      dateAvenant.setHours(0, 0, 0, 0);
      dateIncorparation.setHours(0, 0, 0, 0);
        this.isInValidateDateAvenant = dateAvenant > dateIncorparation;
    }

    onCompareDateEffect(historiqueAvenant: any) {
      const dateIncorparation = new Date(historiqueAvenant.dateIncorparation);
      const dateEffet = new Date(historiqueAvenant?.dateEffet);

      dateIncorparation.setHours(0, 0, 0, 0);
      dateEffet.setHours(0, 0, 0, 0);
        this.isInValidateDateEffect = dateIncorparation > dateEffet;
    }

   addAdherentFamille(historiqueAvenant: HistoriqueAvenant): void {
      if (historiqueAvenant.id == null) {
        this.historiqueAvenant = historiqueAvenant;
        this.historiqueAvenant.id = null;
        
        const formData = new FormData();
        formData.append('file', this.historiqueAvenant.fileToLoad);
        if (this.historiqueAvenant.fileToLoad !== null && this.historiqueAvenant.fileToLoad !== undefined
            && this.historiqueAvenant.fileToLoad.size > 0) {
              this.historiqueAvenantService.postHistoriqueAvenantFile(historiqueAvenant, this.file).subscribe(

                res => {
                  this.historiqueAvenant = {};
                  this.getSucessInfo();
                  this.onCancelIncorporation();
                }, error => {
                  this.getErrorInfo(error.message)
                }
              );
        } else {
          this.historiqueAvenantService.postHistoriqueAvenant(historiqueAvenant).subscribe();
        }
      }
    }

    onCancelIncorporation(){
    this.isToImporteExcelFile = false;
    this.router.navigateByUrl('/contrat/avenant');
  }

    onSaveIncorporation(historiqueAvenant: HistoriqueAvenant){

        if(historiqueAvenant){
        historiqueAvenant.typeHistoriqueAvenant = TypeHistoriqueAvenant.INCORPORATION;
        this.confirmationService.confirm({
          message: 'Voulez-vous procéder à l’incorporation ?',
          header: 'Confirmation',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.addAdherentFamille(historiqueAvenant);
          },
        });
  }

}

      getSucessInfo(): void {
        this.messageService.add({severity: 'success', summary: 'AVENANT INCORPORATION', detail: 'Opération réussie!'});
      }
      getCancelInfo(): void {
        this.messageService.add({severity: 'info', summary: 'AVENANT INCORPORATION', detail: 'Opération annulé!'});
      }
      getFailledInfo(): void {
        this.messageService.add({severity: 'error', summary: 'AVENANT INCORPORATION', detail: 'Opération échouée!'});
      }
      
      getErrorInfo(message: string): void {
        this.messageService.add({severity: 'error', summary: 'AVENANT INCORPORATION', detail: message});
      }


}
