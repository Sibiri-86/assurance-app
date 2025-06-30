import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { HistoriqueAvenantService } from 'src/app/store/contrat/historiqueAvenant/service';
import { Police } from 'src/app/store/contrat/police/model';
import { ExerciceService } from 'src/app/store/contrat/exercice/service';
import { GroupeService } from 'src/app/store/contrat/groupe/service';
import { Exercice } from 'src/app/store/contrat/exercice/model';
import { Groupe } from 'src/app/store/contrat/groupe/model';
import { ActivatedRoute, Router } from '@angular/router';
import { HistoriqueAvenant, TypeDemandeur, TypeHistoriqueAvenant } from 'src/app/store/contrat/historiqueAvenant/model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PoliceService } from 'src/app/store/contrat/police/service';


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
  isTodisplayEntetDialogue = false;
  adherentAndFamilyLength : number = 0;
  exercices: Exercice[] = [];
  groupesByPolicy: Groupe [] = [];
  
  @Input() policeSelected: any;
  @Input() police: any;

  policeSelectedId: string = '';
  groupeSelectedId: string = '';
  selectedExerciceId: string = '';
  dateEffetExercice: Date;
  dateEcheanceExercice: Date;
  accordionIndex: number = 0;

  historiqueAvenant: HistoriqueAvenant = {};
  historiqueAvenant2: HistoriqueAvenant = {};
  historiqueAvenantNewDTO: any = {};
  historiqueAvenantAdherants: any = {};

  policeByTypeGarand: Police[] = [];

  allAdherents: any;
  numeros: string[] = [];

 
  // @Output() reponseEnvoyee = new EventEmitter<string>();

  adherentByFamily: { familleId: string, membres: any[] }[] = [];

    demandeursList: any = [
        {libelle: 'VIMSO', value: TypeDemandeur.VIMSO},
        {libelle: 'SOUSCRIPTEUR', value: TypeDemandeur.SOUSCRIPTEUR},
        {libelle: 'GARANT', value: TypeDemandeur.GARANT}
        ];
  

  constructor(
     private historiqueAvenantService: HistoriqueAvenantService,
          private exerciceService: ExerciceService,
          private groupeService: GroupeService,
          private route: ActivatedRoute,
          private messageService: MessageService,
          private confirmationService: ConfirmationService,
          private policeService: PoliceService,
          private router: Router,
  ) { }

  ngOnInit(): void {
    this.policeSelectedId = this.route.snapshot.paramMap.get('id');
    this.showDialog();

    if(this.policeSelectedId != null){

      this.loadExerciceByPolice(this.policeSelectedId);
      this.loadGroupeByPolice(this.policeSelectedId);
      this.onGetPoliceById(this.policeSelectedId);

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

    onGetSelectedExerciceId(selectedExercice?: Exercice){
      this.selectedExerciceId = selectedExercice.id;

      this.dateEffetExercice = selectedExercice.debut;
      this.dateEcheanceExercice = selectedExercice.fin;
      }


    onGetSelectedGroupeId(groupeSelectedId?: string){
      this.groupeSelectedId = groupeSelectedId;
  }

  showDialog() {
    //this.displayChoose = true;
    this.isTodisplayEntetDialogue = true;
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
      this.numeros = data
        .slice(1)
        .map(row => row[0])
        .filter(m => !!m);

      this.onGetAdherentByMatricule(this.numeros);
      //this.onGetHistoriqueAvenantAdherentService(numeros);

    };

    reader.readAsBinaryString(target.files[0]);
  }

  onGetAdherentByMatricule(numeros: any){

    this.historiqueAvenantService.saveNewAvenantRetraitService(numeros, this.selectedExerciceId, this.groupeSelectedId, this.policeSelectedId).subscribe(
            (response) => {

              this.adherentAndFamilyLength = response.length;
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

  
  onGetHistoriqueAvenantAdherentService(numeros: any){

    this.historiqueAvenantService.getHistoriqueAvenantAdherentService(numeros, this.selectedExerciceId, this.groupeSelectedId, this.policeSelectedId).subscribe(
            (response) => {              
              this.historiqueAvenantAdherants = response;
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

          this.confirmationService.confirm({
          message: 'Voulez-vous procéder au retrait ?',
          header: 'Confirmation',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.onConfirmRetraitSaved();
          },
        });
  }


  groupAssuresByFamille(assures: any[]): Map<string, any[]> {
  const grouped = new Map<string, any[]>();

  assures.forEach(assure => {
    const familleId = assure.adherentPrincipal?.id || assure.id;
    if (!grouped.has(familleId)) {
      grouped.set(familleId, []);
    }
    grouped.get(familleId)?.push(assure);
  });

  return grouped;
}


onDisplayAdherentByFamily(response: string[]) {
  this.allAdherents = response;
  const groupedMap = this.groupAssuresByFamille(response);
    this.adherentByFamily = Array.from(groupedMap.entries()).map(([familleId, membres]) => ({
      familleId,
      membres
    }));

}



onConfirmRetraitSaved() {

    this.historiqueAvenantNewDTO.aderantsNew = this.allAdherents;
    this.historiqueAvenantNewDTO.police = this.police;
    this.historiqueAvenantNewDTO.typeHistoriqueAvenant = TypeHistoriqueAvenant.RETRAIT;
    this.historiqueAvenantNewDTO.dateSaisie = new Date();

     this.historiqueAvenantService.saveRetraitNewService(this.historiqueAvenantNewDTO).subscribe(
      resp => {    
          
        if(resp == true){
          this.getSucessInfo();
          this.historiqueAvenant = {};
          this.historiqueAvenantNewDTO = {};

          this.isTodisplayEntetDialogue = false;
          this.isToDisplayAdherentByFamily = false;
          this.onCancelRetrait();
          this.onGetPolice();
        }
      }
    );  


    }

    onReimportExcel(){
      this.numeros = [];
      this.allAdherents = [];
      this.adherentByFamily = [];
      this.displayFileChoose = false;
      this.isTodisplayEntetDialogue = true;
      this.isToDisplayAdherentByFamily = false;
    }


onConfirmRetraitSaved1() {

    this.historiqueAvenant2.historiqueAvenantAdherants =  this.historiqueAvenantAdherants;

    this.historiqueAvenant2.police = this.police;
    this.historiqueAvenant2.typeHistoriqueAvenant = TypeHistoriqueAvenant.RETRAIT;
    this.historiqueAvenant2.dateSaisie = new Date();

      this.historiqueAvenantService.updateHistoriqueAvenant(this.historiqueAvenant2).subscribe(
      resp => {        
        if(resp == true){
          this.getSucessInfo();
          this.historiqueAvenant = {};
          this.historiqueAvenant2 = {};

          this.isTodisplayEntetDialogue = false;
          this.isToDisplayAdherentByFamily = false;
          this.onGetPolice();
        }
      }
    ); 

    }

      onGetPolice(typeGarandCode?: string){

       this.policeService.getPoliceByTypeGarant(typeGarandCode).subscribe(
        resp => {
          if(resp){

            this.policeByTypeGarand = resp;          }
        }
       );
  }

      onGetPoliceById(policeId?: string){

       this.policeService.getPoliceById(policeId).subscribe(
        resp => {
          if(resp){

            this.police = resp;    
            }
        }
       );
  }


    onNextStepp(historiqueAvenant: any){

    historiqueAvenant.police = this.police;
    historiqueAvenant.typeHistoriqueAvenant = TypeHistoriqueAvenant.RETRAIT;
    historiqueAvenant.dateSaisie = new Date();

    this.historiqueAvenant = historiqueAvenant;
    this.historiqueAvenantNewDTO = historiqueAvenant;
    this.historiqueAvenant2 = historiqueAvenant;
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

    onCancelRetrait() {
    this.router.navigateByUrl('contrat/avenant');
  }


}
