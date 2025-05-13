import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Exercice } from 'src/app/store/contrat/exercice/model';
import { ExerciceService } from 'src/app/store/contrat/exercice/service';
import { Groupe, GroupeList } from 'src/app/store/contrat/groupe/model';
import { GroupeService } from 'src/app/store/contrat/groupe/service';
import { TypeDemandeur } from 'src/app/store/contrat/historiqueAvenant/model';
import { Police } from 'src/app/store/contrat/police/model';

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


}
