import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AdherentFamille } from 'src/app/store/contrat/adherent/model';
import { Exercice } from 'src/app/store/contrat/exercice/model';
import { ExerciceService } from 'src/app/store/contrat/exercice/service';
import { Groupe } from 'src/app/store/contrat/groupe/model';
import { GroupeService } from 'src/app/store/contrat/groupe/service';
import { HistoriqueAvenant, TypeDemandeur } from 'src/app/store/contrat/historiqueAvenant/model';
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
  historiqueAvenant: HistoriqueAvenant;
  file:any;
  curentGroupe: Groupe = {};
  curentExercice: Exercice = {};
  adherentFamilleListe: AdherentFamille[] = [];
  

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
    ) {}

  ngOnInit(): void {

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

  uploadFile() {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http.post('http://localhost:8080/api/excel/upload', formData)
      .subscribe({
        next: (res) => console.log('Upload successful', res),
        error: (err) => console.error('Upload error', err)
      });
  }

  onInitIncorporation(){
    this.isToImporteExcelFile = true;
  }
  onCancelIncorporation(){
    this.isToImporteExcelFile = false;
    this.router.navigateByUrl('/contrat/avenant');
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


  getFiles(event: File) {
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
    }


   addAdherentFamille(historiqueAvenant: HistoriqueAvenant): void {
      console.log('**************HistoriqueAvenan-----t***------*************');
      console.log(historiqueAvenant);
      if (historiqueAvenant.id == null) {
        this.historiqueAvenant = historiqueAvenant;
        this.historiqueAvenant.id = null;
        this.historiqueAvenant.file.append('file', this.historiqueAvenant.fileToLoad);
        console.log('**************HistoriqueAvenan-----t****************');

        if (this.historiqueAvenant.fileToLoad !== null && this.historiqueAvenant.fileToLoad !== undefined
            && this.historiqueAvenant.fileToLoad.size > 0) {
              this.historiqueAvenantService.postHistoriqueAvenantFile(historiqueAvenant, this.file).subscribe();
        } else {
          this.historiqueAvenantService.postHistoriqueAvenant(historiqueAvenant).subscribe();
        }
      }
    }


}
