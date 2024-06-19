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
import {Status}  from '../../common/models/etat.enum';
import {Status as St} from '../../../store/global-config/model';
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
import {status} from '../../../store/global-config/selector';
import { TypeEtat } from 'src/app/store/contrat/historiqueAvenant/model';
import { count } from 'console';
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
  plafondFamilleActeConstructEnregistrement: Array<PlafondFamilleActe> = [];
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
  statusObject$: Observable<St>;
  displayPrevisualiserParametrageEdition = false;
  dateEffetFamilleActe: Date = new Date();
  dateEffetActe: Date = new Date();
  dateEffetSousActe: Date = new Date();
  plafondFamilleActeControle: PlafondFamilleActe = {};
  plafondActeControle: PlafondActe = {};
  plafondFamilleActeConstructConstant: Array<PlafondFamilleActe> = [];
  boAdul = false;
  boMembre = false;
  acteByGarantieList: Array<Acte>;
  plafondActeAjout: Array<PlafondActe>;
  plafondSousActeAjout: Array<PlafondSousActe>;
  sousActeByActeList: Array<SousActe>;
  constructor(private breadcrumbService: BreadcrumbService, private messageService: MessageService,
              private confirmationService: ConfirmationService, private formBuilder: FormBuilder,
              private store: Store<AppState>) {

    this.breadcrumbService.setItems([
      {label: 'Barème'}
    ]);


    this.baremeForm = this.formBuilder.group({
    // domaine: new FormControl({}),
    id: new FormControl(null),
    libelle: new FormControl(),
    description: new FormControl(null, [Validators.required]),
    taux: new FormControl(),
    typeBareme: new FormControl(null, [Validators.required]),
    ageMin: new FormControl(),
    ageMax: new FormControl(),
  });

   }

   
  ngOnInit(): void{
    this.listeEtat = [{libelle: 'ACTIVER', identifiant: 1}, {libelle: 'DESACTIVER', identifiant: 2}];

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
        acte: {},
        garantie : {}
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
    this.statusObject$ = this.store.pipe(select(status));
    this.checkStatus();
  }

  voirParametrageEdition() {
    this.displayPrevisualiserParametrageEdition = true;
  }

  checkStatus() {
    this.statusObject$.pipe(takeUntil(this.destroy$))
        .subscribe(statusObj => {
          if (statusObj) {
            this.showToast(statusObj.status, 'INFORMATION', statusObj.message);
            /*
            if (this.isAdding && statusObj.status === StatusEnum.success) {
              this.display = false;
              this.isAdding = false;
            }
            this.loading = false;
            */
          }
        });
  }

  showToast(severity: string, summary: string, detail: string) {
    this.messageService.add({severity, summary, detail});
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

    closePrevisualisation(){
      console.log('yes');
      this.plafondFamilleActeConstruct = [];
    }

  validerPlafond() {
    this.dispplayDialogueBareme = false;
    this.bareme = this.baremeForm.value;
    for (let i = 0; i < this.plafondFamilleActeConstructEnregistrement.length; i++){
      this.plafondFamilleActeConstructEnregistrement[i].plafondFamilles = [];
      if(this.plafondFamilleActeConstructEnregistrement[i]?.montantPlafond) {
        this.plafondFamilleActeConstructEnregistrement[i].montantPlafond = removeBlanks(this.plafondFamilleActeConstructEnregistrement[i].montantPlafond + '');

      }
      for (let j = 0; j < this.plafondFamilleActeConstructEnregistrement[i].listeActe.length; j++){
        if(this.plafondFamilleActeConstructEnregistrement[i].listeActe[j]?.montantPlafond) {
          this.plafondFamilleActeConstructEnregistrement[i].listeActe[j].montantPlafond = removeBlanks(this.plafondFamilleActeConstructEnregistrement[i].listeActe[j].montantPlafond + '');
  
        }
        for (let k = 0; k < this.plafondFamilleActeConstructEnregistrement[i].listeActe[j].listeSousActe.length; k++){
          if(this.plafondFamilleActeConstructEnregistrement[i].listeActe[j].listeSousActe[k]?.montantPlafond ) {
            this.plafondFamilleActeConstructEnregistrement[i].listeActe[j].listeSousActe[k].montantPlafond =  removeBlanks(this.plafondFamilleActeConstructEnregistrement[i].listeActe[j].listeSousActe[k].montantPlafond + '');
    
          }
          if(this.plafondFamilleActeConstructEnregistrement[i].listeActe[j].listeSousActe[k]?.montantPlafondParActe) {
            this.plafondFamilleActeConstructEnregistrement[i].listeActe[j].listeSousActe[k].montantPlafondParActe =  removeBlanks(this.plafondFamilleActeConstructEnregistrement[i].listeActe[j].listeSousActe[k].montantPlafondParActe + '');

          }
        }
      }
    }
    this.bareme.baremeFamilleActe = this.plafondFamilleActeConstructEnregistrement;
    console.log(this.bareme);
    console.log("================================",this.plafondFamilleActeConstructEnregistrement);
    if (!this.baremeForm.value.id){
    this.store.dispatch(featureActionsPlafond.createBareme(this.bareme));
    } else {
    this.store.dispatch(featureActionsPlafond.updateBareme(this.bareme));
    }
    //this.store.dispatch(featureActionsPlafond.createPlafond(this.plafond));
    this.plafondFamilleActe = [{garantie: {}}];
    this.plafondActe = [];
    this.plafondFamilleActeConstruct = [];
    this.plafondFamilleActeConstructEnregistrement = [];
    this.countfamilleActe = 0;
    this.baremeForm.reset();
  }

 quitter() {
  this.dispplayDialogueBareme = false;
  this.baremeForm.reset();
  this.plafondFamilleActeConstruct = [];
}

  modifierBareme(bareme: Bareme) {
    console.log(bareme);
    /* if(!this.typeBareme.find(type=>type.value === bareme.typeBareme )) {
      this.typeBareme.push({ label: bareme.typeBareme, value: bareme.typeBareme });

    } */
    
    this.baremeForm.patchValue(bareme);
    this.plafondFamilleActeConstruct = bareme.baremeFamilleActe.filter(famille=> famille?.etat === "ACTIF");
    
    this.plafondFamilleActeConstructEnregistrement = bareme.baremeFamilleActe.filter(famille=> famille?.etat === "ACTIF");;
    console.log("=========================vrai===length======vrai======", this.plafondFamilleActeConstructEnregistrement);
    // changer les dates effet à la date du jour
    for (let i = 0; i < this.plafondFamilleActeConstruct.length; i++) {
      this.plafondFamilleActeConstruct[i].dateEffet = new Date();
      this.plafondFamilleActeConstruct[i].listeActe = this.plafondFamilleActeConstruct[i]?.listeActe?.filter(acte=>acte.etat ==="ACTIF");
      for (let j = 0; j < this.plafondFamilleActeConstruct[i].listeActe.length; j++){
        this.plafondFamilleActeConstruct[i].listeActe[j].dateEffet = new Date();
        this.plafondFamilleActeConstruct[i].listeActe[j].listeSousActe = this.plafondFamilleActeConstruct[i]?.listeActe[j]?.listeSousActe.filter(sousActe=>sousActe.etat ==="ACTIF");
        for (let k = 0; k < this.plafondFamilleActeConstruct[i].listeActe[j].listeSousActe.length; k++) {
          this.plafondFamilleActeConstruct[i].listeActe[j].listeSousActe[k].dateEffet =  new Date();
        }
      }
      console.log("=========================vrai===length======vrai===1===", this.plafondFamilleActeConstruct);


             this.plafondFamilleActeConstructConstant = this.plafondFamilleActeConstruct.filter(plafo=>plafo.garantie.id === this.plafondFamilleActeConstruct[i].garantie.id);
             console.log("=========================vrai===length======vrai= vari=====", this.plafondFamilleActeConstructConstant);
             if(this.plafondFamilleActeConstructConstant && this.plafondFamilleActeConstructConstant.length >1) {

              if(this.plafondFamilleActeConstructConstant.length == 3) {
                for(let t=0; t<this.plafondFamilleActeConstructConstant.length; t++) {
                  if(!this.plafondFamilleActeConstructConstant[t].domaine) {
                    this.plafondFamilleActeConstructConstant[t].membre = this.plafondFamilleActeConstructConstant[t].garantie.libelle;
                  }else {

                    if(this.plafondFamilleActeConstructConstant[t].domaine  ) {
                      this.plafondFamilleActeConstructConstant[t].membre = this.plafondFamilleActeConstructConstant[t]?.domaine[0]?.code;

                    }
                  }
                }
              }else {
                for(let t=0; t<this.plafondFamilleActeConstructConstant.length; t++) {
                  if(!this.plafondFamilleActeConstructConstant[t].domaine ) {
                    
                    for(let t1=0; t1<this.plafondFamilleActeConstructConstant.length; t1++) {

                      if(this.plafondFamilleActeConstructConstant[t1].domaine && 
                        this.plafondFamilleActeConstructConstant[t1].domaine [0].code =="ENFANT") {
                          this.boAdul = true;
                      
                        }
                        if(this.plafondFamilleActeConstructConstant[t1].domaine  && 
                          this.plafondFamilleActeConstructConstant[t1].domaine [0].code =="CONJOINT") {
                            this.boMembre = true;
                        
                          }

                          if(this.plafondFamilleActeConstructConstant[t1].domaine  && 
                            this.plafondFamilleActeConstructConstant[t1].domaine [0].code =="ADHERENT") {
                              this.boMembre = true;
                          
                            }
                    }
                    if(this.boAdul && !this.boMembre) {
                      this.plafondFamilleActeConstructConstant[t].membre = "ADULTE";
                    }

                    if(!this.boAdul && this.boMembre) {
                      this.plafondFamilleActeConstructConstant[t].membre = "MEMBRE";
                    }
                    if(this.boAdul && this.boMembre) {
                      this.plafondFamilleActeConstructConstant[t].membre= "ADHERENT";
                    }
                    this.boAdul = false;
                    this.boMembre =false
                    
                  }if(this.plafondFamilleActeConstructConstant[t].domaine) {
                    console.log("==========================oui=======",)
                    this.plafondFamilleActeConstructConstant[t].membre = this.plafondFamilleActeConstructConstant[t]?.domaine[0]?.code;
                  }
                }
              }
              this.plafondFamilleActeConstruct[i].plafondFamilles = this.plafondFamilleActeConstructConstant;
              
              if(i+1 < this.plafondFamilleActeConstruct.length) {
                for(let x = i+1; x<this.plafondFamilleActeConstruct.length ; x++){
                  if(this.plafondFamilleActeConstruct[i].garantie.id === this.plafondFamilleActeConstruct[x].garantie.id) {
                    
                    this.plafondFamilleActeConstruct.splice(x,2);
                   // console.log("=========================vrai=====2==========",this.plafondFamilleActeConstruct.length);
                  }
                }
              }
             
              
             }
             console.log("=========================vrai===length======vrai==5====", this.plafondFamilleActeConstruct);
             console.log("=========================vrai=========3======",i);
             this.plafondFamilleActeConstructConstant = [];
      
    }
    this.dispplayDialogueBareme = true;
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
        console.log("=================bien======vrai====");
    console.log(rowData);
    console.log(this.plafondFamilleActeConstruct);
    console.log("=======================vrai====");
    
    for ( let i = 0; i < this.plafondFamilleActeConstruct.length; i++){
      
      /** verifier si la garantie existe deja, juste le modifier */
      if (this.plafondFamilleActeConstruct[i].garantie.id === rowData.garantie.id && 
        this.plafondFamilleActeConstruct[i].domaine === rowData.domaine) {
        console.log("=======================vrai====");
        console.log(this.plafondFamilleActeConstruct[i].domaine);
        console.log(rowData.domaine);
        console.log("=======================vrai====");
        console.log('oui');
        this.clonedPlafondFamilleActeTemp[rowData.garantie.id] = { ...rowData };
        this.plafondFamilleActeTemp = this.clonedPlafondFamilleActeTemp[rowData.garantie.id];
        this.plafondFamilleActeTemp.listeActe = this.plafondActe;
        console.log(i);
        /** enregistrer */
        this.plafondFamilleActeConstruct[i] = this.plafondFamilleActeTemp;
        for ( let j = 0; j < this.plafondFamilleActeConstructEnregistrement.length; j++) {
          if (this.plafondFamilleActeConstructEnregistrement[j].garantie.id === rowData.garantie.id && 
            this.plafondFamilleActeConstructEnregistrement[j].domaine === rowData.domaine) {
              this.plafondFamilleActeConstructEnregistrement[j] = this.plafondFamilleActeTemp;
            }
        }
        delete this.clonedPlafondFamilleActeTemp[rowData.garantie.id];
        return;
        }
    }
    this.countfamilleActe = this.plafondFamilleActeConstruct.length;
    const countFinal =  this.plafondFamilleActeConstructEnregistrement.length;
    console.log("========countFinal====================", this.plafondFamilleActeConstructEnregistrement.length);
  
    /** si la garantie n'est pas encore ajouté, ajouter */
    this.plafondFamilleActeConstruct.forEach( async (element, index) => {
    if (element.garantie.id === rowData.garantie.id && 
      element.domaine === rowData.domaine) {
    console.log('oui');
    console.log("========oui====================");
    this.clonedPlafondFamilleActeTemp[rowData.garantie.id] = { ...rowData };
    this.plafondFamilleActeTemp = this.clonedPlafondFamilleActeTemp[rowData.garantie.id];
    this.plafondFamilleActeTemp.listeActe = this.plafondActe;
    console.log(index);
    this.plafondFamilleActeConstruct[index] = this.plafondFamilleActeTemp;
    for ( let j = 0; j < this.plafondFamilleActeConstructEnregistrement.length; j++) {
      if (this.plafondFamilleActeConstructEnregistrement[j].garantie.id === rowData.garantie.id && 
        this.plafondFamilleActeConstructEnregistrement[j].domaine === rowData.domaine) {
          this.plafondFamilleActeConstructEnregistrement[j] = this.plafondFamilleActeTemp;
        }
    }
    delete this.clonedPlafondFamilleActeTemp[rowData.garantie.id];
    return;
    }
    });
    console.log("========non====================");
    console.log("========rowData====================", rowData);
    this.clonedPlafondFamilleActeTemp[rowData.garantie.id] = { ...rowData };
    console.log("========this.clonedPlafondFamilleActeTemp[rowData.garantie.id]====================", this.clonedPlafondFamilleActeTemp[rowData.garantie.id]);
    console.log(this.clonedPlafondFamilleActeTemp);
    this.plafondFamilleActeTemp = this.clonedPlafondFamilleActeTemp[rowData.garantie.id];
    this.plafondFamilleActeTemp.listeActe = this.plafondActe;
    this.plafondFamilleActeConstruct[this.countfamilleActe] = this.plafondFamilleActeTemp;
    this.plafondFamilleActeConstructEnregistrement[countFinal] = this.plafondFamilleActeTemp;
    console.log("compteur========1======",this.plafondFamilleActeConstructEnregistrement.length);
    console.log("compteur========1======",this.plafondFamilleActeConstructEnregistrement);
    console.log("compteur==============",this.plafondFamilleActeConstruct[this.countfamilleActe]);
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
    if (this.plafondFamilleActe[0].montantPlafond){
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
  changeDomaine(rowData: PlafondFamilleActe) {

    rowData.domaine = [];
    rowData.etat = null;
  }
  
changeGarantie(garantie, indexLigne: number) {
  this.plafondActe = [];
  garantie.value.domaine = [];
  this.plafondSousActe = [];
  this.displayActe = true;
  if (this.plafondActe.length === 0){
    for (let j = 0; j < this.acteList.length; j++){
    if (this.acteList[j].idTypeGarantie === garantie.value.id) {
      this.plafondSousActe = [];
      // recuperer les sous actes de l'acte
      for (let i = 0; i < this.sousActeList.length; i++){
        if (this.sousActeList[i].idTypeActe === this.acteList[j].id) {
          this.plafondSousActe.push({id: this.sousActeList[i].id, sousActe: this.sousActeList[i], taux: {}, dateEffet: new Date(), montantPlafond: 0, montantPlafondParActe: 0})
        }
      }
      this.plafondActe.push({id: this.acteList[j].id, acte: this.acteList[j], taux: {}, dateEffet: new Date(), listeSousActe: this.plafondSousActe, garantie: garantie.value});
    }
  }
    console.log(this.plafondActe);
  }
}

changeActeANdSousActeList(plafond: PlafondFamilleActe) {
  plafond.display = true;
  this.acteByGarantieList= [];
  let compteurActe = 0;
  let compteurSousActe = 0;

    this.acteByGarantieList= [];
      if(plafond.listeActe) {
        this.acteByGarantieList=  this.acteList.filter(acte=>acte.idTypeGarantie===plafond.garantie.id);
        for (let j = 0; j < this.acteByGarantieList.length; j++) {
          let compteur = 0;
          this.plafondSousActeAjout= [];
          this.plafondActeAjout= [];
          for (let k = 0; k < plafond.listeActe.length; k++) {
            
            if(this.acteByGarantieList[j].id === plafond.listeActe[k].acte.id) {
              compteur= 1;
              this.sousActeByActeList = this.sousActeList?.filter(sous=>sous.idTypeActe === plafond.listeActe[j].acte.id);
              if(this.sousActeByActeList) {
                this.plafondSousActeAjout =[];
                for (let i = 0; i < this.sousActeByActeList.length; i++) {
                  this.plafondSousActeAjout.push({id: this.sousActeByActeList[i].id, sousActe: this.sousActeByActeList[i], taux: plafond.taux, dateEffet: plafond.dateEffet, montantPlafond: 0, montantPlafondParActe: 0 , display: true})

                  let compteur1 = 0;
                  if( plafond.listeActe[k].listeSousActe) {
                    for (let t = 0; t < plafond.listeActe[k].listeSousActe.length; t++) {
    
                      if(plafond.listeActe[k].listeSousActe[t].sousActe.id === this.sousActeByActeList[i].id ) {
                        compteur1 = 1;
                      }
                    }
                     if(compteur1 === 0) {
                      plafond.listeActe[k].listeSousActe.push({id: this.sousActeByActeList[i].id, sousActe: this.sousActeByActeList[i], taux: plafond.taux, dateEffet: plafond.dateEffet, montantPlafond: 0, montantPlafondParActe: 0, display: true})
                     
                      console.log("============compteurSousActe====1================");
                      console.log(plafond.listeActe[k].listeSousActe);
                      console.log("==============compteurSousActe==2================");
                      compteurSousActe =  compteurSousActe +1;
                     }
                  }
                }
              }
    
            }
            
          }
    
          if(compteur === 0) {
            
            for (let i = 0; i < this.sousActeList.length; i++){
              if (this.sousActeList[i].idTypeActe === this.acteByGarantieList[j].id) {
                this.plafondSousActeAjout.push({id: this.sousActeList[i].id, sousActe: this.sousActeList[i], taux: plafond.taux, dateEffet: plafond.dateEffet, montantPlafond: 0, montantPlafondParActe: 0 , display: true})
              }
            }
            plafond.listeActe.push({id: this.acteList[j].id, acte: this.acteList[j], taux:plafond.taux, dateEffet: plafond.dateEffet, listeSousActe: this.plafondSousActeAjout, garantie: plafond.garantie , display: true});
            compteurActe= compteurActe + 1;
          } 
        }
      } else {
        this.plafondActe = [];
        if (this.plafondActe.length === 0){
          for (let j = 0; j < this.acteList.length; j++){
          if (this.acteList[j].idTypeGarantie === plafond.garantie.id) {
            this.plafondSousActe = [];
            // recuperer les sous actes de l'acte
            for (let i = 0; i < this.sousActeList.length; i++){
              if (this.sousActeList[i].idTypeActe === this.acteList[j].id) {
                this.plafondSousActe.push({id: this.sousActeList[i].id, sousActe: this.sousActeList[i], taux: {}, dateEffet: new Date(), montantPlafond: 0, montantPlafondParActe: 0, display: true})
              }
            }
            this.plafondActe.push({id: this.acteList[j].id, acte: this.acteList[j], taux: {}, dateEffet: new Date(), listeSousActe: this.plafondSousActe, garantie: plafond.garantie, display: true});
            compteurActe = compteurActe + 1;
          }
        }
        plafond.listeActe.push(... this.plafondActe);
        }
      }
     
      delete this.clonedPlafondConfiguration[plafond.id];
}

changeActeANdSousActe(plafond: PlafondFamilleActe) {
  plafond.display = true;
  this.acteByGarantieList= [];
  let compteurActe = 0;
  let compteurSousActe = 0;
  if(plafond.plafondFamilles) {
    this.acteByGarantieList= [];
    for(let x = 0; x< plafond.plafondFamilles.length; x++) {
      if(plafond.plafondFamilles[x].listeActe) {
        this.acteByGarantieList=  this.acteList.filter(acte=>acte.idTypeGarantie===plafond.plafondFamilles[x].garantie.id);
        for (let j = 0; j < this.acteByGarantieList.length; j++) {
          let compteur = 0;
          this.plafondSousActeAjout= [];
          this.plafondActeAjout= [];
          for (let k = 0; k < plafond.plafondFamilles[x].listeActe.length; k++) {
            
            if(this.acteByGarantieList[j].id === plafond.plafondFamilles[x].listeActe[k].acte.id) {
              compteur= 1;
              this.sousActeByActeList = this.sousActeList?.filter(sous=>sous.idTypeActe === plafond.plafondFamilles[x].listeActe[j].acte.id);
              if(this.sousActeByActeList) {
                this.plafondSousActeAjout =[];
                for (let i = 0; i < this.sousActeByActeList.length; i++) {
                  this.plafondSousActeAjout.push({id: this.sousActeByActeList[i].id, sousActe: this.sousActeByActeList[i], taux: plafond.taux, dateEffet: plafond.dateEffet, montantPlafond: 0, montantPlafondParActe: 0 , display: true})

                  let compteur1 = 0;
                  if( plafond.plafondFamilles[x].listeActe[k].listeSousActe) {
                    for (let t = 0; t < plafond.plafondFamilles[x].listeActe[k].listeSousActe.length; t++) {
    
                      if(plafond.plafondFamilles[x].listeActe[k].listeSousActe[t].sousActe.id === this.sousActeByActeList[i].id ) {
                        compteur1 = 1;
                      }
                    }
                     if(compteur1 === 0) {
                      plafond.plafondFamilles[x].listeActe[k].listeSousActe.push({id: this.sousActeByActeList[i].id, sousActe: this.sousActeByActeList[i], taux: plafond.taux, dateEffet: plafond.dateEffet, montantPlafond: 0, montantPlafondParActe: 0, display: true, dimensionPeriode: plafond.dimensionPeriode, etat: plafond.etat})
                     
                      
                      compteurSousActe =  compteurSousActe +1;
                     }
                  }
                }
              }
    
            }
          }
    
          if(compteur === 0) {
            
            for (let i = 0; i < this.sousActeList.length; i++){
              if (this.sousActeList[i].idTypeActe === this.acteByGarantieList[j].id) {
                this.plafondSousActeAjout.push({id: this.sousActeList[i].id, sousActe: this.sousActeList[i], taux: plafond.taux, dateEffet: plafond.dateEffet, montantPlafond: 0, montantPlafondParActe: 0 , display: true, dimensionPeriode: plafond.dimensionPeriode, etat: plafond.etat})
              }
            }
            plafond.plafondFamilles[x].listeActe.push({id: this.acteList[j].id, acte: this.acteList[j], taux:plafond.taux, dateEffet: plafond.dateEffet, listeSousActe: this.plafondSousActeAjout, garantie: plafond.garantie , display: true, dimensionPeriode: plafond.dimensionPeriode, etat: plafond.etat});
            compteurActe= compteurActe + 1;
          } 
        }
      } else {
        this.plafondActe = [];
        if (this.plafondActe.length === 0){
          for (let j = 0; j < this.acteList.length; j++){
          if (this.acteList[j].idTypeGarantie === plafond.garantie.id) {
            this.plafondSousActe = [];
            // recuperer les sous actes de l'acte
            for (let i = 0; i < this.sousActeList.length; i++){
              if (this.sousActeList[i].idTypeActe === this.acteList[j].id) {
                this.plafondSousActe.push({id: this.sousActeList[i].id, sousActe: this.sousActeList[i], taux: {}, dateEffet: new Date(), montantPlafond: 0, montantPlafondParActe: 0, display: true, dimensionPeriode: plafond.dimensionPeriode, etat: plafond.etat})
              }
            }
            this.plafondActe.push({id: this.acteList[j].id, acte: this.acteList[j], taux: {}, dateEffet: new Date(), listeSousActe: this.plafondSousActe, garantie: plafond.garantie, display: true, dimensionPeriode: plafond.dimensionPeriode, etat: plafond.etat});
            compteurActe = compteurActe + 1;
          }
        }
        plafond.plafondFamilles[x].listeActe.push(... this.plafondActe);
        }
      }
    }
  }
  if(!plafond?.plafondFamilles) {
    this.acteByGarantieList= [];
    if(plafond.listeActe) {
      

      this.acteByGarantieList=  this.acteList.filter(acte=>acte.idTypeGarantie===plafond.garantie.id);
      for (let j = 0; j < this.acteByGarantieList.length; j++) {
        let compteur = 0;
        this.plafondSousActeAjout= [];
        this.plafondActeAjout= [];
        for (let k = 0; k < plafond.listeActe.length; k++) {
  
          if(this.acteByGarantieList[j].id === plafond.listeActe[k]?.acte?.id) {
            compteur= 1;
            this.sousActeByActeList = this.sousActeList?.filter(sous=>sous.idTypeActe === plafond.listeActe[k].acte.id);
            if(this.sousActeByActeList) {
              for (let i = 0; i < this.sousActeByActeList.length; i++) {
                let compteur1 = 0;
                if( plafond.listeActe[k].listeSousActe) {
                  for (let t = 0; t < plafond.listeActe[k].listeSousActe.length; t++) {
  
                    if(plafond.listeActe[k].listeSousActe[t].sousActe.id === this.sousActeByActeList[i].id ) {
                      compteur1 = 1;
                    }
                  }
                   if(compteur1 === 0) {
                    plafond.listeActe[k].listeSousActe.push({id: this.sousActeByActeList[i].id, sousActe: this.sousActeByActeList[i], taux: plafond.taux, dateEffet: plafond.dateEffet, montantPlafond: 0, montantPlafondParActe: 0, display: true,
                       dimensionPeriode: plafond.dimensionPeriode, etat: plafond.etat})
                    compteurSousActe =  compteurSousActe+1;
                   }
                }
              }
            }
  
          }
        }
  
        if(compteur === 0) {
          
          this.plafondSousActeAjout= [];
          for (let i = 0; i < this.sousActeList.length; i++){
            if (this.sousActeList[i].idTypeActe === this.acteByGarantieList[j].id) {
              
              this.plafondSousActeAjout.push({id: this.sousActeList[i].id, sousActe: this.sousActeList[i], taux: plafond?.taux, dateEffet: plafond.dateEffet, montantPlafond: 0, montantPlafondParActe: 0 , display: true,  dimensionPeriode: plafond.dimensionPeriode, etat: plafond.etat})
            }
          }
          plafond.listeActe.push({id: this.acteByGarantieList[j].id, acte: this.acteByGarantieList[j], taux:plafond?.taux, dateEffet: plafond.dateEffet, listeSousActe: this.plafondSousActeAjout, garantie: plafond.garantie , display: true, dimensionPeriode: plafond.dimensionPeriode, etat: plafond.etat});
          compteurActe= compteurActe + 1;
        } 
      }
    } else {
      this.plafondActe = [];
      if (this.plafondActe.length === 0){
        for (let j = 0; j < this.acteList.length; j++){
        if (this.acteList[j].idTypeGarantie === plafond.garantie.id) {
          this.plafondSousActe = [];
          // recuperer les sous actes de l'acte
          for (let i = 0; i < this.sousActeList.length; i++){
            if (this.sousActeList[i].idTypeActe === this.acteList[j].id) {
              this.plafondSousActe.push({id: this.sousActeList[i].id, sousActe: this.sousActeList[i], taux: {}, dateEffet: new Date(), montantPlafond: 0, montantPlafondParActe: 0, display: true,  dimensionPeriode: plafond.dimensionPeriode, etat: plafond.etat})
            }
          }
          this.plafondActe.push({id: this.acteList[j].id, acte: this.acteList[j], taux: {}, dateEffet: new Date(), listeSousActe: this.plafondSousActe, garantie: plafond.garantie, display: true,  dimensionPeriode: plafond.dimensionPeriode, etat: plafond.etat});
          compteurActe = compteurActe + 1;
        }
      }
      plafond.listeActe.push(... this.plafondActe);
      }
    }
  }
  
  
  this.messageService.add({severity:'success', summary: 'Success', detail:'Vous venez d\' ajouter '+compteurActe +' '+ 'Actes'+ ' et '+compteurSousActe+ ' sousActe' });
  
  
}


  ajouterBareme(){
    this.dispplayDialogueBareme = true;
    if(this.baremeList) {
      
      this.baremeList.forEach(bareme=>{
        if(bareme.typeBareme) {
          
          this.typeBareme = this.typeBareme.filter(type=>type.value !== bareme.typeBareme);
          
        }
      })
    }
    this.typeBareme
  }
  controleDateFamilleActe(dateEffet: Date) {
    this.dateEffetFamilleActe = dateEffet;
  }
  controleDateActe(rowData: PlafondActe) {
  
    this.plafondFamilleActeControle = this.plafondFamilleActe.find(plafon => plafon.garantie ===  rowData.garantie);

    if(rowData.dateEffet.getTime() > this.plafondFamilleActeControle.dateEffet.getTime()) {

      this.messageService.add({severity:'success', summary: 'Success', detail:'La date d\'effet de l\'acte est supérieure à celle du groupe !!! '});
      rowData.dateEffet = null;
    }
    

  }

  controleDateSousActe(rowData: PlafondSousActe) {
    this.plafondActeControle = this.plafondActe.find(plafon => plafon.listeSousActe.find(sous=>sous.sousActe.id === rowData.id));
    if(rowData.dateEffet.getTime() > this.plafondActeControle.dateEffet.getTime()) {

      this.messageService.add({severity:'success', summary: 'Success', detail:'La date d\'effet du sous acte est supérieure à celle de l\'acte !!! '});
      rowData.dateEffet = null;
    }
  } 


  
  modificationEtatActe(plafond: PlafondFamilleActe) {
    if(plafond){

      plafond?.listeActe?.forEach(acte=>{

        acte.etat = plafond.etat;
        acte?.listeSousActe?.forEach(sous=>{

          sous.etat = plafond.etat;
        });

      })
    }
  }

  modificationEtatActe1(plafond: PlafondFamilleActe) {
    if(plafond){

      this.plafondActe.forEach(acte=>{

        acte.etat = plafond.etat;
        acte?.listeSousActe?.forEach(sous=>{

          sous.etat = plafond.etat;
        });

      })
    }
  }
  ngOnDestroy() {

  }

}