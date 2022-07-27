import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable, Subject } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { AdherentPermute, AdherentPermuteList, HistoriqueAvenant, HistoriquePlafondActe, HistoriquePlafondFamilleActe } from 'src/app/store/contrat/historiqueAvenant/model';
import { Acte } from 'src/app/store/parametrage/acte/model';
import { Garant } from 'src/app/store/parametrage/garant/model';
import { Garantie } from 'src/app/store/parametrage/garantie/model';
import { Pays } from 'src/app/store/parametrage/pays/model';
import { PlafondFamilleActe } from 'src/app/store/parametrage/plafond/model';
import { SousActe } from 'src/app/store/parametrage/sous-acte/model';
import { Taux } from 'src/app/store/parametrage/taux/model';
import { Territorialite } from 'src/app/store/parametrage/territorialite/model';
import {loadGenre} from '../../../../store/parametrage/genre/actions';
import * as sousActeSelector from '../../../../store/parametrage/sous-acte/selector';
import {loadActe} from '../../../../store/parametrage/acte/actions';
import { takeUntil } from 'rxjs/operators';
import {loadSousActe} from '../../../../store/parametrage/sous-acte/actions';
import * as tauxSelector from '../../../../store/parametrage/taux/selector';
import {loadTaux} from '../../../../store/parametrage/taux/actions';
import * as garantSelector from '../../../../store/contrat/garant/selector';
import {loadGarant} from '../../../../store/contrat/garant/actions';
import * as genreSelector from '../../../../store/parametrage/genre/selector';
import { Genre } from 'src/app/store/parametrage/genre/model';
import * as acteSelector from '../../../../store/parametrage/acte/selector';
import { DimensionPeriode } from 'src/app/store/parametrage/dimension-periode/model';
import { Plafond } from 'src/app/store/contrat/plafond/model';
import { FormGroup } from '@angular/forms';
import { QualiteAssure } from 'src/app/store/parametrage/qualite-assure/model';
import * as dimensionPeriodeSelector from '../../../../store/parametrage/dimension-periode/selector';
import {loadDimensionPeriode} from '../../../../store/parametrage/dimension-periode/actions';
import {loadGarantie} from '../../../../store/parametrage/garantie/actions';
import * as garantieSelector from '../../../../store/parametrage/garantie/selector';
import * as territorialiteSelector from '../../../../store/parametrage/territorialite/selector';
import {loadTerritorialite} from '../../../../store/parametrage/territorialite/actions';
import * as qualiteAssureSelector from '../../../../store/parametrage/qualite-assure/selector';
import {loadQualiteAssure} from '../../../../store/parametrage/qualite-assure/actions';
import { Exercice } from 'src/app/store/contrat/exercice/model';
import { HistoriqueAvenantService } from 'src/app/store/contrat/historiqueAvenant/service';
import { HistoriqueAvenantAdherant } from 'src/app/store/contrat/historiqueAvenantAdherent/model';
import { Groupe } from 'src/app/store/contrat/groupe/model';
import { HistoriqueAvenantAdherentService } from 'src/app/store/contrat/historiqueAvenantAdherent/service';
import { Police } from 'src/app/store/contrat/police/model';
import * as featureActionHistoriqueAdherant from '../../../../store/contrat/historiqueAvenant/actions';
import * as featureActionHistoriqueAvenantAdherant from '../../../../store/contrat/historiqueAvenantAdherent/actions';
import * as selectorHistoriqueAvenantAdherant from '../../../../store/contrat/historiqueAvenantAdherent/selector';

@Component({
  selector: 'app-adherent-basculer',
  templateUrl: './adherent-basculer.component.html',
  styleUrls: ['./adherent-basculer.component.scss']
})
export class AdherentBasculerComponent implements OnInit {

  @Input() police: Police;
  @Input() exerciceRevenu: Exercice;
  @Input() groupeListes: Array<Groupe>;

  historiqueAveantAdherantsTMP: Array<HistoriqueAvenantAdherant>
  tauxList$: Observable<Array<Taux>>;
  tauxList: Array<Taux>;
  sousActeList$: Observable<Array<SousActe>>;
  sousActeList: Array<SousActe>;
  garantList$: Observable<Array<Garant>>;
  garantList: Array<Garant>;
  acteList$: Observable<Array<Acte>>;
  acteList: Array<Acte>;
  paysList$: Observable<Array<Pays>>;
  paysList: Array<Pays>;
  garanties: Array<Garantie>;
  garantieList$: Observable<Array<Garantie>>;
  territorialiteList$: Observable<Array<Territorialite>>;
  territorialiteList: Array<Territorialite>;
  destroy$ = new Subject<boolean>();
  genreList: Array<Genre>;
  genreList$: Observable<Array<Genre>>;
  plafondFamilleActePlafongConfig: Array<HistoriquePlafondFamilleActe> = [];
  plafondFamilleActeTempPlafongConfig: HistoriquePlafondFamilleActe = {};
  plafondFamilleActeConstructPlafongConfig: Array<HistoriquePlafondFamilleActe> = [];
  plafondActePlafongConfig: Array<HistoriquePlafondActe> = [];
  plafondSousActePlafongConfig: Array<HistoriquePlafondActe> = [];
  clonedPlafondConfiguration: any = {};
  plafondActuelleConfiguration: any = {};
  dimensionPeriodeList$: Observable<Array<DimensionPeriode>>;
  
  dimensionPeriodeList: Array<DimensionPeriode>;
  plafond: Plafond;
  plafondForm: FormGroup;
  private historiqueAvenantAdherantFrom: FormGroup;
  private familleActe$: Observable<any>;
  qualiteAssureList: Array<QualiteAssure>;
  qualiteAssureList$: Observable<Array<QualiteAssure>>;
  curentExercice: Exercice = {};
  historiqueAveantAdherantsPermute: Array<HistoriqueAvenantAdherant> = [];

  groupeSelectedPermuter: Groupe = {};
  groupeListNouvo: Groupe []= [];
  groupeSelectedNouvo: Groupe = {};
  adherentPermutList?: AdherentPermute [] = [];
  adherentPermutSelect?: AdherentPermute = {};
  historiqueAveantAdherantsPermuteSelected: HistoriqueAvenantAdherant[] = [];
  clonedHistoriqueAveantAdherant: { [s: string]: HistoriqueAvenantAdherant } = {};
  case: boolean = false;
  historiqueAveantAdherantsTMPList$:  Observable<Array<HistoriqueAvenantAdherant>>;

  constructor(
      private store: Store<AppState>,
      private messageService: MessageService,
      private confirmationService: ConfirmationService,
      private historiqueAvenantAdherentService: HistoriqueAvenantAdherentService,
      private historiqueAvenantService: HistoriqueAvenantService
  ) { }

  ngOnInit(): void {
    console.log('******this.historiqueAveantAdherantsTMP*******', this.historiqueAveantAdherantsTMP);
 
  }
 

  loadHistoriqueAvenantAdherantByPolice(): void {


    console.log("==============this.police.id==",this.police.id);
    console.log("==============this.exerciceRevd==",this.exerciceRevenu.id);
    /* this.historiqueAveantAdherantsTMPList$ = this.store.pipe(select(selectorHistoriqueAvenantAdherant.historiqueAvenantAdherantListByPoliceAndExercice));
    
        this.store.dispatch(featureActionHistoriqueAvenantAdherant.loadHistoriqueAvenantAdherentByPoliceAndExercice({idPolice: this.police.id, exerciceId: this.exerciceRevenu.id}));
        this.historiqueAveantAdherantsTMPList$.pipe(takeUntil(this.destroy$)).subscribe(
            (res) => {
                this.historiqueAveantAdherantsTMP = res;
                console.log('******this.historiqueAveantAdherantsTMP*******', this.historiqueAveantAdherantsTMP);
            }
        );*/
   /* this.historiqueAvenantAdherentService.findHistoriqueAvenantAdherantActuallByExercice(this.police.id, this.exerciceRevenu.id).subscribe(
        (res) => {
     
          this.historiqueAveantAdherantsTMP = res;
          console.log("==============jj==",this.historiqueAveantAdherantsTMP);
        }
    );*/
}

  loadAherantByGroupe1(): void {
    console.log("==============this.police.id==",this.police.id);
    console.log("==============this.groupeSelectedPermuter.id==",this.groupeSelectedPermuter.id);
    /* if(this.adherentPermutList) {
      this.adherentPermutList.forEach(adh=>{
        if(adh.historiqueAvenantAdherents) {
          adh.historiqueAvenantAdherents.forEach(ht=>{
            this.historiqueAveantAdherantsTMP.find(h=>h.id === ht.id).adherent.groupe = adh.groupe;
          });
        }
      })
    }
    this.historiqueAveantAdherantsPermute = this.historiqueAveantAdherantsTMP.filter(a => a.adherent?.groupe?.id === this.groupeSelectedPermuter.id);
   */

    this.historiqueAvenantAdherentService.findHistoriqueAvenantAdherantActuallByPoliceAndGroupe(this.police.id, this.groupeSelectedPermuter.id).subscribe(
      (res) => {
        this.historiqueAveantAdherantsPermute = res;
      }
    );
    this.groupeListNouvo = this.groupeListes.filter(group=>group.id !== this.groupeSelectedPermuter.id); 
  }


  addAherentNewGroupe() {
    this.adherentPermutSelect.groupe = this.groupeSelectedNouvo;
    console.log(this.groupeSelectedNouvo);
    
    this.adherentPermutSelect.historiqueAvenantAdherents = this.historiqueAveantAdherantsPermuteSelected;
    this.adherentPermutList.push(this.adherentPermutSelect);
    if(this.historiqueAveantAdherantsPermuteSelected) {
      this.historiqueAveantAdherantsPermuteSelected.forEach(hist=> {
       
        this.historiqueAveantAdherantsPermute = this.historiqueAveantAdherantsPermute.filter(hist1=> hist1.id !== hist.id);
        // this.historiqueAveantAdherantsTMP.find(hist2=> hist2.id !== hist.id).adherent.groupe =  this.groupeSelectedNouvo;
       


       

      });
    }
    
    this.adherentPermutSelect = {};
    this.groupeSelectedNouvo  = {};
    this.historiqueAveantAdherantsPermuteSelected = [];

   
  }

  saveAherentNewGroupe() {
    const adherentPermutList1:  AdherentPermuteList = {};
    adherentPermutList1.adherentPermuteList = this.adherentPermutList;
    
    console.log(adherentPermutList1);
    this.store.dispatch(featureActionHistoriqueAdherant.permuterAherent(adherentPermutList1));
    this.historiqueAveantAdherantsTMP.filter
    this.historiqueAveantAdherantsPermute = [];
    this.groupeSelectedPermuter = {};
    this.historiqueAveantAdherantsPermuteSelected = [];
    this.adherentPermutList = [];
   // this.loadHistoriqueAvenantAdherantByPolice();
  }

  rowSelected(event) {
    console.log(event);
  }

  onRowSelectionChange(event) {
    if(event) {
    }
    console.log(event);
}



cocherCase(historiqueAveantAdherant: HistoriqueAvenantAdherant, index: number) {
  if(historiqueAveantAdherant.coser) {
    historiqueAveantAdherant.coser = false;
    this.case = false;
  } else {
    historiqueAveantAdherant.coser = true;
    this.case = true;
    //this.historiqueAveantAdherantsPermute[index] =historiqueAveantAdherant;
    // this.historiqueAveantAdherantsPermute.find(his=>his.id === historiqueAveantAdherant.id).coser = true;

  }
  this.historiqueAveantAdherantsPermute[index] =historiqueAveantAdherant;

  console.log(historiqueAveantAdherant.coser);
}



onRowEditInit(historiqueAveantAdherant: HistoriqueAvenantAdherant) {
  this.clonedHistoriqueAveantAdherant[historiqueAveantAdherant.id] = {...historiqueAveantAdherant};
 
}

onRowEditSave(historiqueAveantAdherant: HistoriqueAvenantAdherant) {
  delete this.clonedHistoriqueAveantAdherant[historiqueAveantAdherant.id];
}

onRowEditCancel(historiqueAveantAdherant: HistoriqueAvenantAdherant, index: number) {
this.historiqueAveantAdherantsPermute[index] = this.clonedHistoriqueAveantAdherant[historiqueAveantAdherant.id];
delete this.clonedHistoriqueAveantAdherant[historiqueAveantAdherant.id];
}




}
