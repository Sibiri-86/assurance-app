import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable, Subject } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { AddSousActeDto, AdherentPermute, AdherentPermuteList, HistoriqueAvenant, HistoriquePlafondActe, HistoriquePlafondFamilleActe } from 'src/app/store/contrat/historiqueAvenant/model';
import { Acte } from 'src/app/store/parametrage/acte/model';
import { Garant } from 'src/app/store/parametrage/garant/model';
import { Garantie } from 'src/app/store/parametrage/garantie/model';
import { Pays } from 'src/app/store/parametrage/pays/model';
import { PlafondFamilleActe, PlafondSousActe } from 'src/app/store/parametrage/plafond/model';
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
  selector: 'app-ajout_acte',
  templateUrl: './ajout_acte.component.html',
  styleUrls: ['./ajout_acte.component.scss']
})
export class AjoutActeComponent implements OnInit {

  @Input() police: Police;
  @Input() exerciceRevenu: Exercice;
  @Input() groupeListes: Array<Groupe>;
  @Input() exerciceId: string;
  @Input() avenantId: string;

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
  historiqueAveantAdherantsPermuteList: Array<HistoriqueAvenantAdherant> = [];

  groupeSelectedPermuter: Groupe = {};
  groupeListNouvo: Groupe []= [];
  groupeSelectedNouvo: Groupe = {};
  adherentPermutList?: AdherentPermute [] = [];
  adherentPermutSelect?: AdherentPermute = {};
  historiqueAveantAdherantsPermuteSelected: HistoriqueAvenantAdherant[] = [];
  clonedHistoriqueAveantAdherant: { [s: string]: HistoriqueAvenantAdherant } = {};
  case: boolean = false;
  historiqueAveantAdherantsTMPList$:  Observable<Array<HistoriqueAvenantAdherant>>;
  addSousActeDto : AddSousActeDto = {};
  qa: QualiteAssure = {};
  selectedQualiteAssure : Array<QualiteAssure>;
  sousActeNouveau : SousActe = {};
  acteNouveau : Acte = {};
  listeSousActe : SousActe [] = [];
  listeSousActeFiltrer : SousActe [] = [];
  clonedSousActe: { [s: string]: SousActe } = {};

  constructor(
      private store: Store<AppState>,
      private messageService: MessageService,
      private confirmationService: ConfirmationService,
      private historiqueAvenantAdherentService: HistoriqueAvenantAdherentService,
      private historiqueAvenantService: HistoriqueAvenantService
  ) { }

  ngOnInit(): void {
    console.log('******this.historiqueAveantAdherantsTMP*******', this.historiqueAveantAdherantsTMP);

    this.qualiteAssureList$ = this.store.pipe(
      select(qualiteAssureSelector.qualiteAssureList)
  );
  this.store.dispatch(loadQualiteAssure());
  this.qualiteAssureList$
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        if (value) {
          this.qualiteAssureList = value.slice();
        }
      });
 
      this.sousActeList$ = this.store.pipe(select(sousActeSelector.sousacteList));
    this.store.dispatch(loadSousActe());
    this.sousActeList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        console.log(this.sousActeList);
        this.sousActeList = value.slice();
      }
    });

    this.acteList$ = this.store.pipe(select(acteSelector.acteList));
    this.store.dispatch(loadActe());
    this.acteList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.acteList = value.slice();
      }
    });

    this.dimensionPeriodeList$ = this.store.pipe(
      select(dimensionPeriodeSelector.dimensionPeriodeList)
    );
    this.store.dispatch(loadDimensionPeriode());
    this.dimensionPeriodeList$
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        if (value) {
          this.dimensionPeriodeList = value.slice();
        }
      });

      this.tauxList$ = this.store.pipe(select(tauxSelector.tauxList));
        this.store.dispatch(loadTaux());
        this.tauxList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
          if (value) {
            this.tauxList = value.slice();
          }
    });
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
    this.addSousActeDto.groupeId = this.groupeSelectedPermuter.id;
    console.log(this.addSousActeDto);
    if(this.addSousActeDto.montantPlafond != null || this.addSousActeDto.dimensionPeriode != null || this.addSousActeDto.dateEffet != null
      || this.addSousActeDto.taux ) {
      this.store.dispatch(featureActionHistoriqueAdherant.ajoutActe(this.addSousActeDto));
      this.listeSousActe = [];
    } else {
      this.messageService.add({severity:'error', summary: 'Erreur', detail:'Veuillez Renseigner les informations nécéssaires'});
    }
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



onRowEditInit(sa: SousActe) {
  this.clonedSousActe[sa.id] = {...sa};
 
}

onRowEditSave(sa: SousActe) {
  this.addSousActeDto.dimensionPeriode = sa.dimensionPeriode;
  this.addSousActeDto.domaine = this.selectedQualiteAssure;
  this.addSousActeDto.montantPlafond = sa.montantPlafond;
  this.addSousActeDto.montantPlafondParActe = sa.montantPlafondParActe;
  this.addSousActeDto.groupeId = this.groupeSelectedPermuter.id;
  this.addSousActeDto.idTypeActe =  sa.idTypeActe;
  this.addSousActeDto.exerciceId = this.exerciceRevenu.id;
  this.addSousActeDto.avenantId = this.avenantId;
  this.addSousActeDto.sousActeId = sa.id;
  this.addSousActeDto.dateEffet = sa.dateEffet;
  this.addSousActeDto.taux = sa.taux;
  this.addSousActeDto.montantPrime = sa.montantPrime;
  console.log('ssssssssssssssssssssssss', this.addSousActeDto);
  delete this.clonedSousActe[sa.id];
}

onRowEditCancel(sa: SousActe, index: number) {
delete this.clonedSousActe[sa.id];
}


onRowSelect(event: any) {
  console.log('row event 1 : ', event);
  this.historiqueAveantAdherantsPermuteList =  this.historiqueAveantAdherantsPermute.filter(his=>his.adherent?.adherentPrincipal?.id === event.data.adherent?.id);
  console.log('row historiqueAveantAdherantsPermuteSelected 1 : ',  this.historiqueAveantAdherantsPermuteList);
  if(this.historiqueAveantAdherantsPermuteList) {
    this.historiqueAveantAdherantsPermuteList?.forEach(adh=>{
    //  adh.dateEffet = event.data.dateEffet;

      this.historiqueAveantAdherantsPermuteSelected.push(adh);
    });

    this.historiqueAveantAdherantsPermuteList = [];
   
  }
  console.log('row historiqueAveantAdherantsPermuteSelected : ',  this.historiqueAveantAdherantsPermuteSelected);
  }
  onRowUnselect(event: any) {
  // simply logging the event
  this.historiqueAveantAdherantsPermuteSelected =this.historiqueAveantAdherantsPermuteSelected.filter(ah=>ah.adherent?.adherentPrincipal?.id !== event.data.adherent?.id);
  
  console.log('row historiqueAveantAdherantsPermuteSelected 2 : ',  this.historiqueAveantAdherantsPermuteSelected);
  }

  selectSousActe(sa: SousActe) {
    sa.taux = this.groupeSelectedPermuter.taux;
    this.listeSousActe.push(sa);
    console.log("this listeSousActe", this.listeSousActe);
  }

  selectActe(a: Acte) {
    this.listeSousActeFiltrer = this.sousActeList.filter(s => s.idTypeActe === a.id);
    console.log(this.listeSousActeFiltrer);
  }

  modificationTauxCouverture(plafondSousActe: PlafondSousActe) {
      
    if(plafondSousActe.taux) {
       plafondSousActe.taux = this.groupeSelectedPermuter.taux;
      }
    }

}
