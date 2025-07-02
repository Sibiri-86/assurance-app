import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Adherent, AdherentFamille } from 'src/app/store/contrat/adherent/model';
import { AdherentService } from 'src/app/store/contrat/adherent/service';
import { Exercice } from 'src/app/store/contrat/exercice/model';
import { ExerciceService } from 'src/app/store/contrat/exercice/service';
import { Groupe } from 'src/app/store/contrat/groupe/model';
import { GroupeService } from 'src/app/store/contrat/groupe/service';
import { HistoriqueAvenant, TypeDemandeur, TypeHistoriqueAvenant } from 'src/app/store/contrat/historiqueAvenant/model';
import { HistoriqueAvenantService } from 'src/app/store/contrat/historiqueAvenant/service';
import { Police, PoliceList } from 'src/app/store/contrat/police/model';
import { PoliceService } from 'src/app/store/contrat/police/service';
import { GenreService } from 'src/app/store/parametrage/genre/service';
import { ProfessionService } from 'src/app/store/parametrage/profession/service';
import { QualiteAssureService } from 'src/app/store/parametrage/qualite-assure/service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-new-avenant-incorporation',
  templateUrl: './new-avenant-incorporation.component.html',
  styleUrls: ['./new-avenant-incorporation.component.scss']
})
export class NewAvenantIncorporationComponent implements OnInit {

  selectedFile?: File;
  isToImporteExcelFile: boolean = false;
  exercices: Exercice[] = [];
  groupesByPolicy: Groupe [] = [];
  incorporationDate: any;
  avenantDate: any;
  historiqueAvenant: HistoriqueAvenant = {};
  historiqueAvenantNewDTO: any = {};
  file:any;
  curentGroupe: Groupe = {};
  curentExercice: Exercice = {};
  adherentFamilleListe: AdherentFamille[] = [];
  adherent?: Adherent = {};
  adherentFamille?: Adherent[] = [];

  isInValidateDateAvenant = false;
  isInValidateDateEffect = false; 


  police: any; // Objet police courant
  policeItem: any; // Police sélectionnée à envoyer au composant enfant
  policeSelected: any;
  
  adhrentAJourToSave: Adherent[] = [];
  displayViewContrat = false;
  isToViewImporteExcelFile = false;
  isToWriteAssure = false;
  isIncorporationByWrite = false;

  adherents: any[] = [];
  families: any[][] = [];
  typeActions: MenuItem[] = [];
  cols: any[];
  entete = '';

  policeByTypeGarand: Police [] = [];
  policeByAffaireNouvelles: Police [] = [];

  totalAssure = 0;
  nbAdherents = 0;
  nbConjoints = 0; 
  nbEnfants = 0;
  qualiteAssures: any;
  professions: any;
  genres: any;
  assuresFamille: any[] = [];
  policeSelectedId: string = '';
  activeIndex: number = 0;
  historiqueAvenants: any[] = [];

  demandeursList: any = [
      {libelle: 'VIMSO', value: TypeDemandeur.VIMSO},
      {libelle: 'SOUSCRIPTEUR', value: TypeDemandeur.SOUSCRIPTEUR},
      {libelle: 'GARANT', value: TypeDemandeur.GARANT}
      ];

  genreOptions = [
    { label: 'Masculin', value: 'M' },
    { label: 'Féminin', value: 'F' }
  ];
  qualiteOptions = [
    { label: 'ADHERENT', value: 'ADHERENT' },
    { label: 'CONJOINT', value: 'CONJOINT' },
    { label: 'ENFANT', value: 'ENFANT' }
  ];

qualites = [
  { label: 'Principal', value: 'PRINCIPAL' },
  { label: 'Ayant droit', value: 'AYANT_DROIT' }
];

groupesImport: { groupe: Groupe | null; fichier?: File; adherents?: Adherent[] }[] = [];


ajouterFamille() {
  // logiques d’ajout de famille ici
  console.log('Ajouter un membre de famille');
}

  constructor(
      private router : Router,
      private exerciceService: ExerciceService,
      private groupeService: GroupeService,
      private historiqueAvenantService: HistoriqueAvenantService,
      private policeService: PoliceService,
      private messageService: MessageService,
      private confirmationService: ConfirmationService,
      private adherentService: AdherentService,
      private qualiteAssureService: QualiteAssureService,
      private professionService: ProfessionService,
      private genreService: GenreService,
      private route: ActivatedRoute,
    ) {}

  ngOnInit(): void {
    this.onInitIncorporation();
    this.policeSelectedId = this.route.snapshot.paramMap.get('id');

    if(this.policeSelectedId != null){
      this.onGetPoliceById(this.policeSelectedId);
    }

    this.loadExerciceByPolice(this.policeSelectedId);
    this.loadGroupeByPolice(this.policeSelectedId);
    this.onGetPoliceByAffaireNouvelles();
    this.onGetQualiteAssure();
    this.onGetProfessions();
    this.onGetGenre();

  }

  onGetQualiteAssure(){
    this.qualiteAssureService.$getQualiteAssures().subscribe(
      resp => {
        this.qualiteAssures = resp.typeQualiteAssureDtoList.filter( qualite => qualite.code === 'ADHERENT' );
      }
    );
  }
  onGetGenre(){
    this.genreService.$getGenres().subscribe(
      resp => {
        this.genres = resp.genreDtoList;      }
    );
  }

  onGetProfessions(){
    this.professionService.$getProfessions().subscribe(
      resp => {
        this.professions = resp.typeProfessionDtoList;
      }
    );
  }


   onGetPoliceSelected(police){

      this.policeSelected = police;
      this.policeItem = police;
      this.loadExerciceByPolice(police)
      this.loadGroupeByPolice(police)
   }

      onGetPoliceById(policeId?: string){

       this.policeService.getPoliceById(policeId).subscribe(
        resp => {
          if(resp){

            this.policeSelected = resp;    
            }
        }
       );
  }

  loadExerciceByPolice(policeId?: string){
    if(policeId){
        this.exerciceService.$getExercices(policeId).subscribe(
         res => {
           this.exercices = res;
         }
        );
    }
  }

  loadGroupeByPolice(policeId: string){
    if(policeId){
        this.groupeService.$getGroupes(policeId).subscribe(
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

/*    onConfirmIncorporation(historiqueAvenant: HistoriqueAvenant): void {
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
 */

    onCancelIncorporation(){
    this.isToImporteExcelFile = false;
    this.isToViewImporteExcelFile = false;
    this.groupesByPolicy = [];
    this.exercices = [];
    this.policeSelected = {};
    this.router.navigateByUrl('contrat/avenant');
  }



  onToGoNextStepp(historiqueAvenant?: any, adherant?:any){

    historiqueAvenant.police = this.policeSelected;
    historiqueAvenant.typeHistoriqueAvenant = TypeHistoriqueAvenant.INCORPORATION;
    historiqueAvenant.dateSaisie = new Date();

    this.historiqueAvenant = historiqueAvenant;
    this.historiqueAvenantNewDTO = historiqueAvenant;

    if(historiqueAvenant != null && adherant.length > 0){
      this.onNextStepp(historiqueAvenant);
    }

  }

  onNextStepp(historiqueAvenant: any){

    historiqueAvenant.police = this.policeSelected;
    historiqueAvenant.typeHistoriqueAvenant = TypeHistoriqueAvenant.INCORPORATION;
    historiqueAvenant.dateSaisie = new Date();

    this.historiqueAvenant = historiqueAvenant;
    this.historiqueAvenantNewDTO = historiqueAvenant;

    this.isToViewImporteExcelFile = true;
    this.isToImporteExcelFile = false;

  }

  onBackStepp(){
    this.isToImporteExcelFile = true;
    this.isToViewImporteExcelFile = false;
  }

    saveMajAdherent() {
    if(this.adhrentAJourToSave.length != 0) {
      this.adherentService.putAdherentMatriculeGarant(this.adhrentAJourToSave).subscribe(
        (res) => {
          this.getSucessInfo();
          this.displayViewContrat = false;
        }
      );
    }
  }

    onConfirmIncorporationSaved() {

    //  const payload = this.families.flat(); // tous les assurés
    const payload = this.families.reduce((acc, cur) => acc.concat(cur), []);  
        payload.forEach( adherent => {
      adherent.groupe.groupe = null;
    }); 
    
    this.historiqueAvenantNewDTO.aderantsNew = payload;

    this.historiqueAvenantNewDTO.police = this.policeSelected;
    this.historiqueAvenantNewDTO.typeHistoriqueAvenant = TypeHistoriqueAvenant.INCORPORATION;
    this.historiqueAvenantNewDTO.dateSaisie = new Date();
    this.historiqueAvenantService.saveIncorporationService(this.historiqueAvenantNewDTO).subscribe(
      resp => {
        
        if(resp == true){
          this.getSucessInfo();
          this.historiqueAvenant = {};
          this.historiqueAvenantNewDTO = {};

          this.isToViewImporteExcelFile = false;
          this.isToImporteExcelFile = false;
          this.router.navigateByUrl('contrat/avenant');
        }
      }
    );

    }


    onSaveIncorporation(){

        this.confirmationService.confirm({
          message: 'Voulez-vous procéder à l’incorporation ?',
          header: 'Confirmation',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.onConfirmIncorporationSaved();
          },
        });

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

  onGetFiles1(event: any): void {
  const target: DataTransfer = <DataTransfer>(event.target);
  if (target.files.length !== 1) return;

  const reader: FileReader = new FileReader();
  reader.onload = (e: any) => {
    const bstr: string = e.target.result;
    const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
    const wsname: string = wb.SheetNames[0];
    const ws: XLSX.WorkSheet = wb.Sheets[wsname];
    const data = XLSX.utils.sheet_to_json(ws, { defval: '' });
    
    this.adherents = data;
    this.groupByOrdre();
  };
  reader.readAsBinaryString(target.files[0]);

}

groupByOrdre1() {
  const grouped = new Map<number, any[]>();
  this.adherents.forEach(item => {
    const ordre = item['ordre'];
    if (!grouped.has(ordre)) grouped.set(ordre, []);
    grouped.get(ordre)!.push(item);
  });

  this.families = Array.from(grouped.values());

}

groupByOrdre() {
  const grouped = new Map<number, any[]>();

  this.adherents.forEach(item => {
    const ordre = item['ordre'];
    if (!grouped.has(ordre)) grouped.set(ordre, []);
    grouped.get(ordre)!.push(item);
  });

  this.families = Array.from(grouped.values());

  this.nbAdherents = 0;
  this.nbConjoints = 0;
  this.nbEnfants = 0;

  this.families.forEach(family => {
    family.forEach(member => {
      const qualite = member['qualiteAssureNew']?.toLowerCase?.();

      if (qualite === 'adherent') {
        this.nbAdherents++;
      } else if (qualite === 'conjoint') {
        this.nbConjoints++;
      } else if (qualite === 'enfant') {
        this.nbEnfants++;
      }
    });
  });

   this.totalAssure = this.nbAdherents + this.nbConjoints + this.nbEnfants;

  // this.onToGoNextStepp(this.historiqueAvenant, this.adherents);
}



toDate(dateStr: string): Date | null {
  if (!dateStr) return null;
  const parsed = new Date(dateStr);
  return isNaN(parsed.getTime()) ? null : parsed;
}

mapQualite(qualite: string): any {
  switch (qualite?.toUpperCase()) {
    case 'ADHERENT':
      return 'ADHERENT';
    case 'CONJOINT':
      return 'CONJOINT';
    case 'ENFANT':
      return 'ENFANT';
    default:
      return null;
  }
}

onGetFiles(event: any, groupe: any, index: number,): void {

  const target: DataTransfer = <DataTransfer>(event.target);
  if (target.files.length !== 1) return;

  const reader: FileReader = new FileReader();
  reader.onload = (e: any) => {
    const bstr: string = e.target.result;
    const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
    const wsname: string = wb.SheetNames[0];
    const ws: XLSX.WorkSheet = wb.Sheets[wsname];
    const rawData = XLSX.utils.sheet_to_json(ws, { defval: '' });
  
    const adherents =  this.transformImportData(rawData, groupe);
    adherents.forEach( adherent => {
      adherent.groupe = groupe;
    });

    this.adherents = [...this.adherents, ...adherents];

     this.groupByOrdre();
  };
  reader.readAsBinaryString(target.files[0]);
}


transformImportData(rawData?: any[], groupe?: any): Adherent[] {
  return rawData.map(row => {
    const nom = row['Nom']?.trim() || '';
    const prenom = row['Prénom']?.trim() || '';

    return {
      groupe,
      nom,
      prenom,
      genreNew: row['Genre (M ou F)'] === 'M' ? 'M' : 'F',
      qualiteAssureNew: this.mapQualite(row['qualité assuré (ADHERENT, CONJOINT ou ENFANF)']),
      dateNaissanceNew: row['date de naissance'],
      dateIncorporationNew: row["Date d'incorporation"],
      dateIncor: this.toDate(row["Date d'incorporation"]),
      dateEntree: this.toDate(row["Date d'entrée"]),
      matricule: row['matricule chez le souscripteur'],
      matriculeGarant: row['matricule de chez le garant'],
      numeroTelephone: row['Numéro téléphone'] || null,
      adresseEmail: row['Email'] || null,
      lieuNaissance: row['lieu de naissance'] || null,
      adresse: row['Adresse'] || null,
      profession: row['profession'] || null,
      referenceBancaire: row['référence bancaire'] || null,
      ordre: Number(row['Ordre']) || 0,
      adherentPrincipalNew: row['ADHERENT principal'] || null,
      fullName: `${nom} ${prenom}`,
      actif: true,
      deleted: false,
    } as Adherent;
  });
}

  onDisplayNewAvenantComposant() {
    this.isToImporteExcelFile = true;
  }

  onDisplayIncorporationByWrite() {
    this.isIncorporationByWrite = true;
  }

  onGetNewAvenantRetraitComponent() {

    this.onGetPoliceSelected(this.policeSelected);
    this.router.navigateByUrl('contrat/new-avenant-retrait/' + this.policeSelected.id);
  }

  onGetPolice(typeGarandCode?: string){

       this.policeService.getPoliceByTypeGarant(typeGarandCode).subscribe(
        resp => {
          if(resp){

            this.policeByTypeGarand = resp;          }
        }
       );
  }

  onGetPoliceByAffaireNouvelles(){

       this.policeService.$getPoliceByAffaireNouvelles().subscribe(
        resp => {
          if(resp){

            this.policeByAffaireNouvelles = resp.policeDtoList;
          }
        }
       );
  }

  supprimerMembre(index: number) {
  this.assuresFamille.splice(index, 1);
}
  
    onAddFamilyMember() {

      
    }

    onDownloadModelIncorporation(): void {
      const worksheetData = [
        [
          'Ordre',
          'ADHERENT principal',
          'Nom',
          'Prénom',
          'Genre (M ou F)',
          'matricule chez le souscripteur',
          'matricule de chez le garant',
          'date de naissance',
          'lieu de naissance',
          'téléphone',
          'adresse',
          'Mail',
          'profession',
          'référence bancaire',
          'qualité assuré (ADHERENT, CONJOINT ou ENFANF)',
          'Date d\'incorporation',
          'Date d\'entrée',
          'NUMERO PRINCIPAL'
        ]
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
      FileSaver.saveAs(blob, 'modele_avenant_incorporation.xlsx');
    }


    removeFormLine(index: number) {
      this.historiqueAvenants.splice(index, 1);
    }

    onGetFiles2(event: any, index: number) {

      const file = event.target.files[0];
      this.historiqueAvenants[index].fichier = file;


    }

    onGetGroupeSelected(event: any, index: number) {
      console.log('event', event);
      console.log('index', index);
    }

    onToGoNextStepp2(avenant: any, ) {
      console.log('Traitement pour ce formulaire', avenant);
    }


  onGetFiles3(event: any, groupe: Groupe, index: number): void {
  const target: DataTransfer = <DataTransfer>(event.target);
  if (!target.files || target.files.length !== 1) return;

  const file = target.files[0];
  const reader: FileReader = new FileReader();

  reader.onload = (e: any) => {
    const bstr: string = e.target.result;
    const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
    const wsname: string = wb.SheetNames[0];
    const ws: XLSX.WorkSheet = wb.Sheets[wsname];
    const rawData = XLSX.utils.sheet_to_json(ws, { defval: '' });

    const adherents = this.transformImportData(rawData);

    this.adherents.push(adherents as any);

    // Stocker les données transformées dans le tableau
    // this.groupesImport[index].adherents = adherents;
    // this.groupesImport[index].fichier = file;

    this.groupByOrdre(); // si tu veux regrouper tous les adhérents
  };

  reader.readAsBinaryString(file);
}

    
}
