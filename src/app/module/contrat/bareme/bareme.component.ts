import { Component, OnInit, OnDestroy } from '@angular/core';
import { Acte } from 'src/app/store/parametrage/acte/model';
import { SousActe } from 'src/app/store/parametrage/sous-acte/model';
import {BreadcrumbService} from '../../../app.breadcrumb.service';
import { ConfirmationService, MessageService, SelectItem } from "primeng/api";
import {PlafondActe, PlafondFamilleActe, PlafondSousActe} from "../../../store/parametrage/plafond/model";
import { Observable, of, Subject } from 'rxjs';
import { select, Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.state";
import { takeUntil } from "rxjs/operators";
import { loadActe } from "../../../store/parametrage/acte/actions";
import * as acteSelector from "../../../store/parametrage/acte/selector";
import { Etat } from '../../common/models/model';
import { loadGarantie } from "../../../store/parametrage/garantie/actions";
import * as garantieSelector from "../../../store/parametrage/garantie/selector";
import { TypeBareme } from '../../common/models/bareme.enum';
import { loadSousActe } from "../../../store/parametrage/sous-acte/actions";
import * as sousActeSelector from "../../../store/parametrage/sous-acte/selector";
import { loadTaux } from "../../../store/parametrage/taux/actions";
import * as tauxSelector from "../../../store/parametrage/taux/selector";
import { DimensionPeriode } from "../../../store/parametrage/dimension-periode/model";
import { loadDimensionPeriode } from "../../../store/parametrage/dimension-periode/actions";
import * as dimensionPeriodeSelector from "../../../store/parametrage/dimension-periode/selector";
import { Status } from '../../common/models/etat.enum';
import { loadQualiteAssure } from "../../../store/parametrage/qualite-assure/actions";
import * as qualiteAssureSelector from "../../../store/parametrage/qualite-assure/selector";
import * as featureActionsPlafond from "../../../store/contrat/plafond/action";
import * as plafondSelector from "../../../store/contrat/plafond/selector";
import {
  ControlContainer,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Garantie } from 'src/app/store/parametrage/garantie/model';
import { Dialog } from 'primeng/dialog/dialog';
import { removeBlanks } from '../../util/common-util';
import { Bareme } from 'src/app/store/contrat/plafond/model';
import { Taux } from 'src/app/store/parametrage/taux/model';
import { QualiteAssure } from 'src/app/store/parametrage/qualite-assure/model';
@Component({
  selector: 'app-bareme',
  templateUrl: './bareme.component.html',
  styleUrls: ['./bareme.component.scss']
})
export class BaremeComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();
  dispplayDialogueBareme = false;
  clonedPlafondFamilleActe: { [s: string]: PlafondFamilleActe } = {};
  plafondFamilleActe: Array<PlafondFamilleActe>;
  plafondFamilleActeTemp: PlafondFamilleActe;
  plafondFamilleActeConstruct: Array<PlafondFamilleActe> = [];
  plafondActuelleConfiguration: Array<PlafondFamilleActe> = [];
  plafondActe: Array<PlafondActe>;
  plafondSousActe: Array<PlafondSousActe>;
  sousActeList$: Observable<Array<SousActe>>;
  sousActeList: Array<SousActe>;
  acteList$: Observable<Array<Acte>>;
  bareme: Bareme = {};
  acteList: Array<Acte>;
  listeEtat: Array<Etat>;
  garanties: Array<Garantie>;
  garantieList$: Observable<Array<Garantie>>;
  clonedPlafondFamilleActeTemp: { [s: string]: PlafondFamilleActe } = {};
  displayActe = false;
  baremeForm: FormGroup;
  countfamilleActe: number = 0;
  clonedPlafondActe: { [s: string]: PlafondActe } = {};
  clonedPlafondConfiguration: { [s: string]: PlafondFamilleActe } = {};
  clonedPlafondSousActe: { [s: string]: PlafondSousActe } = {};
  tauxList$: Observable<Array<Taux>>;
  tauxList: Array<Taux>;
  dimensionPeriodeList$: Observable<Array<DimensionPeriode>>;
  dimensionPeriodeList: Array<DimensionPeriode>;
  displayPrevisualiserParametrage = false;
  qualiteAssureList: Array<QualiteAssure>;
  qualiteAssureList$: Observable<Array<QualiteAssure>>;
  baremeList$: Observable<Array<Bareme>>;
  baremeList: Array<Bareme>;
  typeBareme =   Object.keys(TypeBareme).map(key => ({ label: TypeBareme[key], value: key }));
  typeEtat = Object.keys(Status).map(key => ({ label: Status[key], value: key }));
  cols: any[];
  displayVoirBareme = false;

  constructor(private breadcrumbService: BreadcrumbService, private confirmationService: ConfirmationService, private formBuilder: FormBuilder,
    private store: Store<AppState>) {

    this.breadcrumbService.setItems([
      {label: 'Barème'}
    ]);


  this.baremeForm = this.formBuilder.group({
    // domaine: new FormControl({}),
    id:new FormControl(null),
    libelle: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    taux: new FormControl(null, [Validators.required]),
    typeBareme: new FormControl(null, [Validators.required])
  });

   }

  ngOnInit(): void{
    this.listeEtat =[{libelle:'ACTIVER', identifiant:1}, {libelle:'DESACTIVER', identifiant:2}];

    this.baremeList$ = this.store.pipe(select(plafondSelector.baremeList));
    this.store.dispatch(featureActionsPlafond.loadBareme());
    this.baremeList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.baremeList = value.slice();
      }
    });

    this.acteList$ = this.store.pipe(select(acteSelector.acteList));
    this.store.dispatch(loadActe());
    this.acteList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.acteList = value.slice();
      }
    });

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

    this.tauxList$ = this.store.pipe(select(tauxSelector.tauxList));
    this.store.dispatch(loadTaux());
    this.tauxList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.tauxList = value.slice();
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

    this.garantieList$ = this.store.pipe(select(garantieSelector.garantieList));
    this.store.dispatch(loadGarantie());
    this.garantieList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.garanties = value.slice();
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

    this.plafondFamilleActe = [
      {
        dimensionPeriode: {},
        dateEffet: new Date(),
        garantie: {}
      }
    ];

    this.plafondActe = [
      {
        montantPlafond: 0,
        dimensionPeriode: {},
        nombre: 0,
        dateEffet: new Date(),
        acte: {}
      }
    ];

    this.plafondSousActe = [
      {
        montantPlafond: 0,
        dimensionPeriode: {},
        nombre: 0,
        dateEffet: new Date(),
        sousActe: {}
      }
    ];
  }


  expandActe(i){
    console.log(i);
  }

  onRowEditInitPlafondConfiguration(plafond: PlafondFamilleActe) {
    this.clonedPlafondConfiguration[plafond.garantie.id] = {...plafond};
    console.log(this.clonedPlafondConfiguration);
  }

  onRowEditSavePlafondConfiguration(plafond: PlafondFamilleActe) {
    delete this.clonedPlafondConfiguration[plafond.garantie.id];
  }

  onRowEditCancelPlafondConfiguration(plafond: PlafondFamilleActe, index: number) {
    this.plafondActuelleConfiguration[index] = this.clonedPlafondConfiguration[plafond.garantie.id];
    delete this.clonedPlafondConfiguration[plafond.garantie.id];
  }

  onRowEditSavePlafondConfigurationActe(plafond: PlafondActe) {
    delete this.clonedPlafondConfiguration[plafond.acte.id];
  }

  onRowEditInitPlafondConfigurationActe(plafond: PlafondActe) {
    this.clonedPlafondConfiguration[plafond.acte.id] = {...plafond};
    console.log(this.clonedPlafondConfiguration);
  }
  onRowEditCancelPlafondConfigurationActe(plafond: PlafondActe, index: number, indexGarantie: any) {
    console.log(indexGarantie);
    //this.plafondActuelleConfiguration[indexGarantie].listeActe[index] = this.clonedPlafondConfiguration[plafond.acte.id];
    //delete this.clonedPlafondConfiguration[plafond.acte.id];
  }

  onRowEditInitPlafondConfigurationSousActe(plafond: PlafondSousActe) {
    this.clonedPlafondSousActe[plafond.sousActe.id] = {...plafond};
    console.log(this.clonedPlafondSousActe);
  }

  onRowEditSavePlafondConfigurationSousActe(plafond: PlafondSousActe) {
    delete this.clonedPlafondSousActe[plafond.sousActe.id];
  }

  onRowEditCancelPlafondConfigurationSousActe(plafond: PlafondSousActe, index: number, indexGarantie: number) {
    //console.log(indexGarantie);
    //this.plafondActuelleConfiguration[indexGarantie].listeActe[index] = this.clonedPlafondConfiguration[plafond.acte.id];
    //delete this.clonedPlafondConfiguration[plafond.acte.id];
  }

  

  voirParametrage() {
    this.displayPrevisualiserParametrage = true;
    }



  validerPlafond() {
    this.bareme = this.baremeForm.value;
    for(var i=0; i<this.plafondFamilleActeConstruct.length; i++){
      this.plafondFamilleActeConstruct[i].montantPlafond = removeBlanks(this.plafondFamilleActeConstruct[i].montantPlafond+'');
      for(var j=0; j<this.plafondFamilleActeConstruct[i].listeActe.length; j++){
        this.plafondFamilleActeConstruct[i].listeActe[j].montantPlafond = removeBlanks(this.plafondFamilleActeConstruct[i].listeActe[j].montantPlafond+'');
        for(var k =0; k<this.plafondFamilleActeConstruct[i].listeActe[j].listeSousActe.length; k++){
          this.plafondFamilleActeConstruct[i].listeActe[j].listeSousActe[k].montantPlafond =  removeBlanks(this.plafondFamilleActeConstruct[i].listeActe[j].listeSousActe[k].montantPlafond+'');
          this.plafondFamilleActeConstruct[i].listeActe[j].listeSousActe[k].montantPlafondParActe =  removeBlanks(this.plafondFamilleActeConstruct[i].listeActe[j].listeSousActe[k].montantPlafondParActe+'');
        }
      }
    }
    this.bareme.baremeFamilleActe = this.plafondFamilleActeConstruct;
    console.log(this.bareme);
    if(!this.baremeForm.value.id){
    this.store.dispatch(featureActionsPlafond.createBareme(this.bareme));
    } else {
    this.store.dispatch(featureActionsPlafond.updateBareme(this.bareme));
    }
    //this.store.dispatch(featureActionsPlafond.createPlafond(this.plafond));
    this.plafondFamilleActe = [{garantie:{}}];
    this.plafondActe = [];
    this.plafondFamilleActeConstruct = [];
    this.countfamilleActe = 0;
    this.baremeForm.reset();
  }

 quitter() {
  this.dispplayDialogueBareme= false;
  this.baremeForm.reset();
}

  modifierBareme(bareme:Bareme) {
    this.baremeForm.patchValue(bareme);
    this.plafondFamilleActeConstruct = bareme.baremeFamilleActe;
    // changer les dates effet à la date du jour
    for (let i = 0; i < this.plafondFamilleActeConstruct.length; i++) {
      this.plafondFamilleActeConstruct[i].dateEffet= new Date();
      for (let j = 0; j < this.plafondFamilleActeConstruct[i].listeActe.length; j++){
        this.plafondFamilleActeConstruct[i].listeActe[j].dateEffet = new Date();
        for (let k = 0; k < this.plafondFamilleActeConstruct[i].listeActe[j].listeSousActe.length; k++) {
          this.plafondFamilleActeConstruct[i].listeActe[j].listeSousActe[k].dateEffet =  new Date();
        }
      }
    }
    this.dispplayDialogueBareme= true;
}

  supprimerBareme(bareme: Bareme) {
    this.confirmationService.confirm({
      message: 'Etes vous sur de vouloir supprimer?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(featureActionsPlafond.deleteBareme(bareme));
      }
  });
    
  }

  voirBareme(bareme: Bareme){
  this.displayVoirBareme = true;
  this.plafondFamilleActeConstruct = bareme.baremeFamilleActe;
  console.log(this.plafondFamilleActeConstruct);
  }

  addFamilleActe(rowData, ri) {
    this.confirmationService.confirm({
      message: "Etes vous sur de valider?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {

    console.log(rowData);
    console.log(this.plafondFamilleActeConstruct);
    for( var i=0; i<this.plafondFamilleActeConstruct.length; i++){
      /** verifier si la garantie existe deja, juste le modifier */
      if(this.plafondFamilleActeConstruct[i].garantie.id===rowData.garantie.id) {
        console.log('oui');
        this.clonedPlafondFamilleActeTemp[rowData.garantie.id] = { ...rowData };
        this.plafondFamilleActeTemp = this.clonedPlafondFamilleActeTemp[rowData.garantie.id];
        this.plafondFamilleActeTemp.listeActe = this.plafondActe;
        console.log(i);
        /** enregistrer */
        this.plafondFamilleActeConstruct[i]=this.plafondFamilleActeTemp;
        delete this.clonedPlafondFamilleActeTemp[rowData.garantie.id];
        return;
        }
    }

    /** si la garantie n'est pas encore ajouté, ajouter */
    this.plafondFamilleActeConstruct.forEach( async (element,index)=>{
    if(element.garantie.id===rowData.garantie.id) {
    console.log('oui');
    this.clonedPlafondFamilleActeTemp[rowData.garantie.id] = { ...rowData };
    this.plafondFamilleActeTemp = this.clonedPlafondFamilleActeTemp[rowData.garantie.id];
    this.plafondFamilleActeTemp.listeActe = this.plafondActe;
    console.log(index);
    this.plafondFamilleActeConstruct[index]=this.plafondFamilleActeTemp;
    delete this.clonedPlafondFamilleActeTemp[rowData.garantie.id];
    return;
    }
    });

    
    this.clonedPlafondFamilleActeTemp[rowData.garantie.id] = { ...rowData };
    console.log(this.clonedPlafondFamilleActeTemp);
    this.plafondFamilleActeTemp = this.clonedPlafondFamilleActeTemp[rowData.garantie.id];
    this.plafondFamilleActeTemp.listeActe = this.plafondActe;
    this.plafondFamilleActeConstruct[this.countfamilleActe]=this.plafondFamilleActeTemp;
    delete this.clonedPlafondFamilleActeTemp[rowData.garantie.id];
    console.log(this.countfamilleActe);
    this.countfamilleActe++;
    console.log(this.plafondFamilleActeConstruct);
  },
  });
  }

 test(){
   console.log('yessaye');
 }
  
  onRowEditInit(plafondFamilleActe: PlafondFamilleActe, montantPlafondFamilleActe) {
    if(this.plafondFamilleActe[0].montantPlafond){
    montantPlafondFamilleActe = this.plafondFamilleActe[0].montantPlafond.toLocaleString('fr');
    }
    this.clonedPlafondFamilleActe[plafondFamilleActe.garantie.id] = {
      ...plafondFamilleActe,
    };
  }

  onRowEditSave(plafondFamilleActe: PlafondFamilleActe) {
    delete this.clonedPlafondFamilleActe[plafondFamilleActe.garantie.id];
  }

  onRowEditCancel(plafondFamilleActe: PlafondFamilleActe, index: number) {
    this.plafondFamilleActe[index] =
      this.clonedPlafondFamilleActe[plafondFamilleActe.garantie.id];
    delete this.clonedPlafondFamilleActe[plafondFamilleActe.garantie.id];
  }


  onRowEditInitPlafondActe(plafondActe: PlafondActe) {
    this.clonedPlafondActe[plafondActe.acte.id] = { ...plafondActe };
  }

  onRowEditSavePlafondActe(plafondActe: PlafondActe) {
    delete this.clonedPlafondActe[plafondActe.acte.id];
  }

  onRowEditCancelPlafondActe(plafondActe: PlafondActe, index: number) {
    this.plafondActe[index] = this.clonedPlafondActe[plafondActe.acte.id];
    delete this.clonedPlafondActe[plafondActe.acte.id];
  }

  onRowEditInitPlafondSousActe(plafondSousActe: PlafondSousActe) {
    this.clonedPlafondSousActe[plafondSousActe.sousActe.id] = {
      ...plafondSousActe,
    };
  }

  onRowEditSavePlafondSousActe(plafondSousActe: PlafondSousActe) {
    delete this.clonedPlafondSousActe[plafondSousActe.sousActe.id];
  }

  onRowEditCancelPlafondSousActe(
    plafondSousActe: PlafondSousActe,
    index: number
  ) {
    this.plafondSousActe[index] =
      this.clonedPlafondSousActe[plafondSousActe.sousActe.id];
    delete this.clonedPlafondSousActe[plafondSousActe.sousActe.id];
  }

  showDialogPlafondMaximized(dialog: Dialog) {
      dialog.maximized = true;
  }

  fermerConfigurationPlafond() {
    this.displayPrevisualiserParametrage = false;
  }
  
changeGarantie(garantie, indexLigne: number) {
  this.plafondActe = [];
  this.plafondSousActe = [];
  this.displayActe = true;
 if(this.plafondActe.length===0){
    for(var j=0; j<this.acteList.length; j++){
    if(this.acteList[j].idTypeGarantie === garantie.value.id) {
      this.plafondSousActe = [];
      // recuperer les sous actes de l'acte
      for(var i=0; i<this.sousActeList.length; i++){
        if(this.sousActeList[i].idTypeActe === this.acteList[j].id) {
          this.plafondSousActe.push({id: this.sousActeList[i].id, sousActe:this.sousActeList[i], taux: {}, dateEffet: new Date(), montantPlafond: 0, montantPlafondParActe: 0})
        }
      }
      this.plafondActe.push({id: this.acteList[j].id, acte:this.acteList[j], taux: {}, dateEffet: new Date(), listeSousActe: this.plafondSousActe});
    }
  }
  console.log(this.plafondActe);
  }
}




  ajouterBareme(){
    this.dispplayDialogueBareme= true;
  }

  ngOnDestroy() {

  }

}