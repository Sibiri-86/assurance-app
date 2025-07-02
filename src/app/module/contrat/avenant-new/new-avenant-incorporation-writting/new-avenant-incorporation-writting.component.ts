import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Adherent } from 'src/app/store/contrat/adherent/model';
import { AdherentService } from 'src/app/store/contrat/adherent/service';
import { Exercice } from 'src/app/store/contrat/exercice/model';
import { ExerciceService } from 'src/app/store/contrat/exercice/service';
import { Groupe } from 'src/app/store/contrat/groupe/model';
import { GroupeService } from 'src/app/store/contrat/groupe/service';
import { HistoriqueAvenant, TypeDemandeur, TypeHistoriqueAvenant } from 'src/app/store/contrat/historiqueAvenant/model';
import { HistoriqueAvenantService } from 'src/app/store/contrat/historiqueAvenant/service';
import { HistoriqueAvenantAdherentService } from 'src/app/store/contrat/historiqueAvenantAdherent/service';
import { Police } from 'src/app/store/contrat/police/model';
import { PoliceService } from 'src/app/store/contrat/police/service';
import { Genre } from 'src/app/store/parametrage/genre/model';
import { GenreService } from 'src/app/store/parametrage/genre/service';
import { Profession } from 'src/app/store/parametrage/profession/model';
import { ProfessionService } from 'src/app/store/parametrage/profession/service';
import { QualiteAssure } from 'src/app/store/parametrage/qualite-assure/model';
import { QualiteAssureService } from 'src/app/store/parametrage/qualite-assure/service';


@Component({
  selector: 'app-new-avenant-incorporation-writting',
  templateUrl: './new-avenant-incorporation-writting.component.html',
  styleUrls: ['./new-avenant-incorporation-writting.component.scss']
})
export class NewAvenantIncorporationWrittingComponent implements OnInit {

  isTodisplayEntetDialogue = false;
  isTodisplayFamilyDialogue = false;
  historiqueAvenant: HistoriqueAvenant = {};
  historiqueAvenantNewDTO: any = {};
  policeSelectedId: string = '';
  qualiteAssures: QualiteAssure[] = [];
  genres: Genre[] = [];
  professions: Profession[] = [];
  exercices: Exercice[] = [];
  groupesByPolicy: any;
  policeByAffaireNouvelles: Police [] = [];
  adherentsList: any;

  policeSelected: any;
  police: Police;
  policeItem: Police;
  exerciceId: string;
  adherantFamily: Adherent [] = [];
  adherantNew: Adherent = {};
  adherentPrincipal: Adherent = {};
  groupe: Groupe = {};

  demandeursList: any = [
    {libelle: 'VIMSO', value: TypeDemandeur.VIMSO},
    {libelle: 'SOUSCRIPTEUR', value: TypeDemandeur.SOUSCRIPTEUR},
    {libelle: 'GARANT', value: TypeDemandeur.GARANT}
    ];



  constructor(
         private router : Router,
          private exerciceService: ExerciceService,
          private groupeService: GroupeService,
          private historiqueAvenantService: HistoriqueAvenantService,
          private historiqueAvenantAdherentService: HistoriqueAvenantAdherentService,
          private policeService: PoliceService,
          private messageService: MessageService,
          private confirmationService: ConfirmationService,
          private adherentService: AdherentService,
          private qualiteAssureService: QualiteAssureService,
          private professionService: ProfessionService,
          private genreService: GenreService,
          private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.onDisplayEntetDialogue();
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

    onDisplayEntetDialogue(){
    this.isTodisplayEntetDialogue = true;
  }



  onGetQualiteAssure(){
    this.qualiteAssureService.$getQualiteAssures().subscribe(
      resp => {
        this.qualiteAssures = resp.typeQualiteAssureDtoList.filter(notAdherent => notAdherent.code !=='ADHERENT');
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
            this.police = resp;    
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
  
  onGetPoliceByAffaireNouvelles(){

       this.policeService.$getPoliceByAffaireNouvelles().subscribe(
        resp => {
          if(resp){

            this.policeByAffaireNouvelles = resp.policeDtoList;
          }
        }
       );
  }


  onGetSelectedExerciceId(exerciceId: string){
    this.exerciceId = exerciceId;

  }

searchAdherentPrincipaleByExerciceAndPolice(exerciceId?: string, policeId?: string): any {
  if (this.exerciceId && this.policeSelectedId) {

    this.historiqueAvenantAdherentService.searchAdherentPrincipaleByExerciceAndPolice(exerciceId, policeId).subscribe(
      resp => {
        if (resp) {
          this.adherentsList = resp.map(adherent => {
            adherent.fullName = `${adherent.numero}-${adherent.nom}-${adherent.prenom}`;
            return adherent;
          });
        }
      }
    );
  }
}



    onNextStepp(historiqueAvenant: any){

    historiqueAvenant.police = this.policeSelected;
    historiqueAvenant.typeHistoriqueAvenant = TypeHistoriqueAvenant.INCORPORATION;
    historiqueAvenant.dateSaisie = new Date();

    this.historiqueAvenant = historiqueAvenant;
    this.historiqueAvenantNewDTO = historiqueAvenant;

    this.isTodisplayEntetDialogue = false;
    this.isTodisplayFamilyDialogue = true;

    this.searchAdherentPrincipaleByExerciceAndPolice(this.exerciceId, this.policeSelectedId);


  }

    onBackStepp(){

    this.isTodisplayEntetDialogue = true;
    this.isTodisplayFamilyDialogue = false;

  }


  

    onGetSelectedGroupeId(groupe: Adherent){
        if(groupe){
        this.groupe = groupe;
      }
    }
    onSelectedAdherent(adherentPrincipal: Adherent){
        if(adherentPrincipal){
          this.adherentPrincipal = adherentPrincipal;
      }
    }

    onAddMember(adherent: Adherent){
      if(this.adherentPrincipal && adherent){
        adherent.adherentPrincipal = this.adherentPrincipal;
        adherent.groupe = this.adherentPrincipal.groupe;
        this.adherantFamily.push(adherent);
        this.adherantNew = {};
      }
      
    }

    onRetrieveMamber(adherent: Adherent) {
      if (adherent) {
        const index = this.adherantFamily.findIndex(a => a === adherent);
        if (index !== -1) {
          this.adherantFamily.splice(index, 1);
        }
      }
    }

    onConfirmIncorporationSaved() {

    this.historiqueAvenantNewDTO.aderantsNew = this.adherantFamily;
    this.historiqueAvenantNewDTO.police = this.policeSelected;
    this.historiqueAvenantNewDTO.typeHistoriqueAvenant = TypeHistoriqueAvenant.INCORPORATION;
    this.historiqueAvenantNewDTO.dateSaisie = new Date();

    this.historiqueAvenantService.saveIncorporationWrittingService(this.historiqueAvenantNewDTO).subscribe(
      resp => {
        
        if(resp == true){
          this.getSucessInfo();
          this.historiqueAvenant = {};
          this.historiqueAvenantNewDTO = {};

          this.isTodisplayEntetDialogue = false;
          this.isTodisplayFamilyDialogue = false;
          this.router.navigateByUrl('contrat/avenant');
          
        }
      }
    );

    }


    onSaveIncorporation(){

      console.log('historiqueAvenantNewDTO', this.historiqueAvenantNewDTO);
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

      onCancelIncorporation(){
        this.router.navigateByUrl('contrat/avenant');
      }

}
