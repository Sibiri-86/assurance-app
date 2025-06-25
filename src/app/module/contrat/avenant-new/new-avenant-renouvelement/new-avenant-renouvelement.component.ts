import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Adherent } from 'src/app/store/contrat/adherent/model';
import { AdherentService } from 'src/app/store/contrat/adherent/service';
import { Exercice } from 'src/app/store/contrat/exercice/model';
import { ExerciceService } from 'src/app/store/contrat/exercice/service';
import { Groupe } from 'src/app/store/contrat/groupe/model';
import { GroupeService } from 'src/app/store/contrat/groupe/service';
import { HistoriqueAvenantService } from 'src/app/store/contrat/historiqueAvenant/service';
import { HistoriqueAvenant, TypeDemandeur, TypeHistoriqueAvenant } from 'src/app/store/contrat/historiqueAvenant/model';
import { HistoriqueAvenantAdherentService } from 'src/app/store/contrat/historiqueAvenantAdherent/service';
import { Police } from 'src/app/store/contrat/police/model';
import { PoliceService } from 'src/app/store/contrat/police/service';
import { GenreService } from 'src/app/store/parametrage/genre/service';
import { ProfessionService } from 'src/app/store/parametrage/profession/service';
import { QualiteAssureService } from 'src/app/store/parametrage/qualite-assure/service';

@Component({
  selector: 'app-new-avenant-renouvelement',
  templateUrl: './new-avenant-renouvelement.component.html',
  styleUrls: ['./new-avenant-renouvelement.component.scss']
})
export class NewAvenantRenouvelementComponent implements OnInit {

  activeIndex: number = 0;
  isTodisplayRenouvelementDialogue = false;
  isTodisplayEntete = true;
  historiqueAvenant:  HistoriqueAvenant = {};
  historiqueAvenantNewDTO: any = {};


  qualiteAssures: any;
  professions: any;
  genres: any;
  groupesByPolicy: Groupe [] = [];

  policeSelected: any;
  police: Police;
  policeItem: Police;
  exerciceId: string;
  adherantFamily: Adherent [] = [];
  adherantNew: Adherent = {};
  adherentPrincipal: Adherent = {};
  groupe: Groupe = {};
  policeByAffaireNouvelles: Police [] = [];
  exercices: Exercice[] = [];
  exerciceSelected: Exercice;
  policeSelectedId: string = '';
  
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
    this.onTodisplayRenouvelementDialogue();
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

  onTodisplayRenouvelementDialogue(){
    this.isTodisplayRenouvelementDialogue = true;
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


  onGetSelectedExercice(exercice: Exercice){
    this.exerciceSelected = exercice;
    this.exerciceId = exercice.id;

  }

  onCancelIncorporation(){

    // the cancel logique
  }

    onNextStepp(historiqueAvenant: any){

    historiqueAvenant.police = this.policeSelected;
    historiqueAvenant.typeHistoriqueAvenant = TypeHistoriqueAvenant.INCORPORATION;
    historiqueAvenant.dateSaisie = new Date();

    this.historiqueAvenant = historiqueAvenant;
    this.historiqueAvenantNewDTO = historiqueAvenant;

    this.activeIndex += 1;

  }

    onBackStepp(){
    this.activeIndex -= 1;
  }

  onCancelRenouvelement() {
    this.router.navigateByUrl('contrat/avenant');
  }


}
