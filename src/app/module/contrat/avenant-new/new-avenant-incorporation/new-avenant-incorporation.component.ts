import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TypeDemandeur } from 'src/app/store/contrat/historiqueAvenant/model';

@Component({
  selector: 'app-new-avenant-incorporation',
  templateUrl: './new-avenant-incorporation.component.html',
  styleUrls: ['./new-avenant-incorporation.component.scss']
})
export class NewAvenantIncorporationComponent implements OnInit {

  selectedFile?: File;
  isToImporteExcelFile: boolean = true;

  demandeursList: any = [
      {libelle: 'VIMSO', value: TypeDemandeur.VIMSO},
      {libelle: 'SOUSCRIPTEUR', value: TypeDemandeur.SOUSCRIPTEUR},
      {libelle: 'GARANT', value: TypeDemandeur.GARANT}
      ];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {

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
  }

  onTabChange(event: any) {
    if (event.index === 0) {
        this.onInitIncorporation();
    }
}


}
