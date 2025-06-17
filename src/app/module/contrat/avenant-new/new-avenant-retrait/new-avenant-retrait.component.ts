import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { HistoriqueAvenantService } from 'src/app/store/contrat/historiqueAvenant/service';
import { Police } from 'src/app/store/contrat/police/model';
import { ExerciceService } from 'src/app/store/contrat/exercice/service';
import { GroupeService } from 'src/app/store/contrat/groupe/service';
import { Exercice } from 'src/app/store/contrat/exercice/model';
import { Groupe } from 'src/app/store/contrat/groupe/model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-avenant-retrait',
  templateUrl: './new-avenant-retrait.component.html',
  styleUrls: ['./new-avenant-retrait.component.scss']
})
export class NewAvenantRetraitComponent implements OnInit {

  displayChoose = false;
  displayFileChoose = false;
  displayWriteChoose = false;
  isToDisplayAdherentByFamily = false;
  exercices: Exercice[] = [];
  groupesByPolicy: Groupe [] = [];
  
  @Input() policeSelected: any;
  @Input() police: any;

  policeSelectedId: string = '';
  groupeSelectedId: string = '';
  selectedExerciceId: string = '';
  accordionIndex: number = 0;

 
  // @Output() reponseEnvoyee = new EventEmitter<string>();

  adherentByFamily: { familleId: string, membres: any[] }[] = [];

  constructor(
     private historiqueAvenantService: HistoriqueAvenantService,
           private exerciceService: ExerciceService,
           private groupeService: GroupeService,
           private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
     this.policeSelectedId = this.route.snapshot.paramMap.get('id');
      this.showDialog();

    if(this.policeSelectedId != null){

      this.loadExerciceByPolice(this.policeSelectedId);
      this.loadGroupeByPolice(this.policeSelectedId);

    }

  }

    loadExerciceByPolice(policeSelectedId?: string){
    if(policeSelectedId){
        this.exerciceService.$getExercices(policeSelectedId).subscribe(
         res => {
           this.exercices = res;
         }
        );
    }
  }

  loadGroupeByPolice(policeSelectedId?: string){
    if(policeSelectedId){
        this.groupeService.$getGroupes(policeSelectedId).subscribe(
         res => {
           this.groupesByPolicy = res.groupeDtoList;
         }
        );
    }
  }

    onGetSelectedExerciceId(selectedExerciceId?: string){
      this.selectedExerciceId = selectedExerciceId;
      }

    onGetSelectedGroupeId(groupeSelectedId?: string){
      this.groupeSelectedId = groupeSelectedId;
  }

  showDialog() {
    this.displayChoose = true;
  }

  showChoooseFileDialog() {
    this.displayFileChoose = true;
    this.displayWriteChoose = false;
    this.displayChoose = false;
  }

  showChoooseWriteDialog() {
    this.displayWriteChoose = true;
    this.displayFileChoose = false;
    this.displayChoose = false;
  }

  onCloseDialog(){
    this.displayWriteChoose = false;
    this.displayFileChoose = false;
    this.displayChoose = false;
  }


   
onDownloadModel(): void {
  const worksheetData = [
    ['matricule Assuré'], // en-tête seulement
  ];

  // Création de la feuille
  const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(worksheetData);

  // Création du classeur
  const workbook: XLSX.WorkBook = {
    Sheets: { 'Modèle': worksheet },
    SheetNames: ['Modèle']
  };

  // Conversion du classeur en buffer
  const excelBuffer: any = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'array'
  });

  // Sauvegarde du fichier avec FileSaver
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  FileSaver.saveAs(blob, 'modele_avenant_retrait.xlsx');
}




  onUploadFile(event: any): void {
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) {
      console.error('Un seul fichier attendu.');
      return;
    }

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      const data = XLSX.utils.sheet_to_json(ws, { header: 1 }) as string[][];

      // Extraire les matricules, en ignorant la première ligne (en-tête)
      const numeros: string[] = data
        .slice(1)
        .map(row => row[0])
        .filter(m => !!m);

      // Envoyer les matricules au backend
      this.onGetAdherentByMatricule(numeros);

    };

    reader.readAsBinaryString(target.files[0]);
  }

  onGetAdherentByMatricule(numeros: any){
    this.historiqueAvenantService.saveNewAvenantRetraitService(numeros, this.selectedExerciceId, this.groupeSelectedId, this.policeSelectedId).subscribe(
            (response) => {
              this.onCloseDialog();
              this.onDisplayAdherentByFamily(response);
                this.accordionIndex = 0; 
              this.isToDisplayAdherentByFamily = true;
          },
          (error) => {
            console.error('Erreur lors de la recherche des assurés', error);
          }
    );

  }

  onExitAdherentByFamilyDialog(){
    
      this.isToDisplayAdherentByFamily = false;
  }
  
  onSaveRetrait(){

      this.isToDisplayAdherentByFamily = false;
  }


  groupAssuresByFamille(assures: any[]): Map<string, any[]> {
  const grouped = new Map<string, any[]>();

  assures.forEach(assure => {
    const familleId = assure.adherentPrincipal?.id || assure.id; // si pas d'adherentPrincipal, c'est lui-même
    if (!grouped.has(familleId)) {
      grouped.set(familleId, []);
    }
    grouped.get(familleId)?.push(assure);
  });

  return grouped;
}



onDisplayAdherentByFamily(response: string[]) {
  const groupedMap = this.groupAssuresByFamille(response);
    this.adherentByFamily = Array.from(groupedMap.entries()).map(([familleId, membres]) => ({
      familleId,
      membres
    }));

    console.log('this.adherentByFamily', this.adherentByFamily);
}





}
