import { Component, OnInit, OnDestroy} from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import {Intermediaire} from '../../../store/contrat/intermediaire/model';
import * as featureAction from '../../../store/contrat/intermediaire/actions';
import {intermediaireList} from '../../../store/contrat/intermediaire/selector';
import {Pays} from '../../../store/parametrage/pays/model';
import { TypeIntermediaire } from 'src/app/store/parametrage/type-intermediaire/model';
import {Region} from '../../../store/parametrage/region/model';
import {Departement} from '../../../store/parametrage/departement/model';
import {DimensionPeriode} from '../../../store/parametrage/dimension-periode/model';
import {Commune} from '../../../store/parametrage/commune/model';
import {SecteurActivite} from '../../../store/parametrage/secteur-activite/model';
import { Observable, of, Subject } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { AppState} from 'src/app/store/app.state';
import {loadPays} from '../../../store/parametrage/pays/actions';
import * as paysSelector from '../../../store/parametrage/pays/selector';

import {loadRegion} from '../../../store/parametrage/region/actions';
import * as regionSelector from '../../../store/parametrage/region/selector';

import {loadDepartement} from '../../../store/parametrage/departement/actions';
import * as departementSelector from '../../../store/parametrage/departement/selector';


import {loadCommune} from '../../../store/parametrage/commune/actions';
import * as communeSelector from '../../../store/parametrage/commune/selector';

import {loadTypeIntermediaire} from '../../../store/parametrage/type-intermediaire/actions';
import * as typeIntermediaireSelector from '../../../store/parametrage/type-intermediaire/selector';

import {loadSecteurActivite} from '../../../store/parametrage/secteur-activite/actions';
import * as secteurActiviteSelector from '../../../store/parametrage/secteur-activite/selector';

import {loadDimensionPeriode} from '../../../store/parametrage/dimension-periode/actions';
import * as dimensionPeriodeSelector from '../../../store/parametrage/dimension-periode/selector';
import { loadIntermediaire } from 'src/app/store/contrat/intermediaire/actions';
import {Status} from '../../../store/global-config/model';
import {status} from '../../../store/global-config/selector';
import { EntityValidations } from '../../common/models/validation';
import {BreadcrumbService} from '../../../app.breadcrumb.service';

import { Arrondissement } from 'src/app/store/parametrage/arrondissement/model';
import { Secteur } from 'src/app/store/parametrage/secteur/model';
import { ArrondissementService } from 'src/app/store/parametrage/arrondissement/service';
import * as secteurAction from '../../../store/parametrage/secteur/actions';
import {loadSecteur} from '../../../store/parametrage/secteur/actions';
import * as secteurSelector from '../../../store/parametrage/secteur/selector';

import * as arrondissementAction from '../../../store/parametrage/arrondissement/actions';
import {loadArrondissement} from '../../../store/parametrage/arrondissement/actions';
import * as arrondissementSelector from '../../../store/parametrage/arrondissement/selector';

import { Taux } from 'src/app/store/parametrage/taux/model';
import { loadTaux } from 'src/app/store/parametrage/taux/actions';
import * as tauxAction from '../../../store/parametrage/taux/actions';
import * as tauxSelector from '../../../store/parametrage/taux/selector';
import { element } from 'protractor';
import * as banqueAction from '../../../store/parametrage/Banques/actions';
import * as banqueSelector from '../../../store/parametrage/Banques/selector';
import { Banque } from 'src/app/store/parametrage/Banques/model';
import * as tauxCommissionIntermediaireSelector from '../../../store/parametrage/taux-commission-intermediaire/selector';
import * as tauxCommissionIntermediaireAction from '../../../store/parametrage/taux-commission-intermediaire/actions';
import { TauxCommissionIntermediaire } from 'src/app/store/parametrage/taux-commission-intermediaire/model';


@Component({
  selector: 'app-intermediaire',
  templateUrl: './intermediaire.component.html',
  styleUrls: ['./intermediaire.component.scss']
})
export class IntermediaireComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();
  cols: any[];
  intermediaireList$: Observable<Array<Intermediaire>>;
  intermediaireList: Array<Intermediaire>;
  paysList$: Observable<Array<Pays>>;
  paysList: Array<Pays>;
  regionList$: Observable<Array<Region>>;
  regionList: Array<Region>;
  departementList$: Observable<Array<Departement>>;
  departementList: Array<Departement>;
  communeList$: Observable<Array<Commune>>;
  communeList: Array<Commune>;
  typeIntermediaireList$: Observable<Array<TypeIntermediaire>>;
  typeIntermediaireList: Array<TypeIntermediaire>;
  secteurActiviteList$: Observable<Array<SecteurActivite>>;
  secteurActiviteList: Array<SecteurActivite>;
  dimensionPeriodeList$: Observable<Array<DimensionPeriode>>;
  dimensionPeriodeList: Array<DimensionPeriode>;
  intermediaire: Intermediaire;
  selectedIntermediaires: Intermediaire[];
  displayDialogFormIntermediaire: boolean = false;
  intermediaireForm: FormGroup;
  statusObject$: Observable<Status>;
  entityValidations: Array<EntityValidations>;
  secteurList: Array<Secteur>;
  secteurList$: Observable<Array<Secteur>>;
  arrondissementList$: Observable<Array<Arrondissement>>;
  arrondissementList: Array<Arrondissement>;
  tauxList$: Observable<Array<Taux>>;
  tauxList: Array<Taux>;
  infosIntermediaire: boolean = false;
  banqueList: Array<Banque>;
  banqueList$: Observable<Array<Banque>>;
  tauxCommissionIntermediaireList: Array<TauxCommissionIntermediaire>;
  tauxCommissionIntermediaireList$: Observable<Array<TauxCommissionIntermediaire>>;

  constructor(private formBuilder: FormBuilder,
              private store: Store<AppState>, private messageService: MessageService, 
              private confirmationService: ConfirmationService, private breadcrumbService: BreadcrumbService) { 
      this.intermediaireForm = this.formBuilder.group({
        id: new FormControl(''),
        code: new FormControl(''),
        nom: new FormControl('',[Validators.required]),
        contact: new FormControl('',[Validators.required]),
        adresseEmail: new FormControl(null,[Validators.required, Validators.email]),
        adressePostale: new FormControl(null,[Validators.required]),
        typeIntermediaire: new FormControl(null,[Validators.required]),
        personneRessource: new FormControl('',[Validators.required]),
        numeroCompteBancaire1: new FormControl(''),
        banque1: new FormControl('',[Validators.required]),
        banque2: new FormControl(''),
        numeroCompteBancaire2: new FormControl(''),
        numeroIfu: new FormControl(''),
        //periodiciteAppelFond: new FormControl(''),
        rccm: new FormControl(''),
        secteur: new FormControl('', [Validators.required]),
        commune: new FormControl('', [Validators.required]),
        pays: new FormControl(''),
        region: new FormControl(''),
        departement: new FormControl(''),
        arrondissement: new FormControl(''),
        contactPersonneRessource: new FormControl('', [Validators.required]),
        emailPersonneRessource: new FormControl('', [Validators.required, Validators.email]),
      });
      this.breadcrumbService.setItems([
        {label: 'Intermediaire'}
    ]);

    }
  
    
    
  
    
   
ngOnInit(): void {
    this.intermediaireList = [];
    this.entityValidations = [
    {
      field: 'nom',
      validations: [
        {validName: 'required', validMessage: 'Ce champs est obligatoire'},
        {
          validName: 'maxlength',
          validMessage: 'Ce champs requiert au plus 5 caractères'
        }
      ]
    },
    {
      field: 'code',
      validations: [
        {validName: 'required', validMessage: 'Ce champs est obligatoire'},
        {
          validName: 'maxlength',
          validMessage: 'Ce champs requiert au plus 5 caractères'
        }
      ]
    },
    {
      field: 'contact',
      validations: [
        {validName: 'required', validMessage: 'Ce champs est obligatoire'}
      ]
    },
    {
      field: 'contactPersonneRessource',
      validations: [
        {validName: 'required', validMessage: 'Ce champs est obligatoire'}
      ]
    },
    {
      field: 'adresseEmail',
      validations: [
        {validName: 'required', validMessage: 'Ce champs est obligatoire'},
        {
          validName: 'email',
          validMessage: 'Veuillez renseigner une adresse email valide'
        }
      ]
    },

    {
      field: 'emailPersonneRessource',
      validations: [
        {validName: 'required', validMessage: 'Ce champs est obligatoire'},
        {
          validName: 'email',
          validMessage: 'Veuillez renseigner une adresse email valide'
        }
      ]
    },
    {
      field: 'numeroCompteBancaire1',
      validations: [
        {validName: 'required', validMessage: 'Ce champs est obligatoire'},
        {
          validName: 'maxlength',
          validMessage: 'Ce champs requiert au plus 5 caractères'
        }
      ]
    },
    {
      field: 'personneRessource',
      validations: [
        {validName: 'required', validMessage: 'Ce champs est obligatoire'},
        {
          validName: 'maxlength',
          validMessage: 'Ce champs requiert au plus 5 caractères'
        }
      ]
    },
    {
      field: 'numeroCompteBancaire2',
      validations: [
        {validName: 'required', validMessage: 'Ce champs est obligatoire'},
        {
          validName: 'maxlength',
          validMessage: 'Ce champs requiert au plus 5 caractères'
        }
      ]
    },
    {
      field: 'numeroIfu',
      validations: [
        {validName: 'required', validMessage: 'Ce champs est obligatoire'},
        {
          validName: 'maxlength',
          validMessage: 'Ce champs requiert au plus 5 caractères'
        }
      ]
    },
    {
      field: 'numeroPattente',
      validations: [
        {validName: 'required', validMessage: 'Ce champs est obligatoire'},
        {
          validName: 'maxlength',
          validMessage: 'Ce champs requiert au plus 5 caractères'
        }
      ]
    },
    {
      field: 'secteurActivite',
      validations: [
        {validName: 'required', validMessage: 'Ce champs est obligatoire'},
        {
          validName: 'maxlength',
          validMessage: 'Ce champs requiert au plus 5 caractères'
        }
      ]
    },
    {
      field: 'pays',
      validations: [
        {validName: 'required', validMessage: 'Ce champs est obligatoire'},
        {
          validName: 'maxlength',
          validMessage: 'Ce champs requiert au plus 5 caractères'
        }
      ]
    },
    {
      field: 'region',
      validations: [
        {validName: 'required', validMessage: 'Ce champs est obligatoire'},
        {
          validName: 'maxlength',
          validMessage: 'Ce champs requiert au plus 5 caractères'
        }
      ]
    },
    {
      field: 'departement',
      validations: [
        {validName: 'required', validMessage: 'Ce champs est obligatoire'},
        {
          validName: 'maxlength',
          validMessage: 'Ce champs requiert au plus 5 caractères'
        }
      ]
    },
    {
      field: 'commune',
      validations: [
        {validName: 'required', validMessage: 'Ce champs est obligatoire'},
        {
          validName: 'maxlength',
          validMessage: 'Ce champs requiert au plus 5 caractères'
        }
      ]
    },
    {
      field: 'periodiciteAppelFond',
      validations: [
        {validName: 'required', validMessage: 'Ce champs est obligatoire'},
        {
          validName: 'maxlength',
          validMessage: 'Ce champs requiert au plus 5 caractères'
        }
      ]
    },
    {
      field: 'rccm',
      validations: [
        {validName: 'required', validMessage: 'Ce champs est obligatoire'},
        {
          validName: 'maxlength',
          validMessage: 'Ce champs requiert au plus 5 caractères'
        }
      ]
    }
  ];

 
    this.banqueList$=this.store.pipe(select(banqueSelector.banqueList));
    this.store.dispatch(banqueAction.loadBanque());
    this.banqueList$.pipe(takeUntil(this.destroy$))
            .subscribe(value => {
              if (value) {
                this.banqueList = value.slice();
              }
  });

  
    this.tauxCommissionIntermediaireList$=this.store.pipe(select(tauxCommissionIntermediaireSelector.tauxcommissionintermediaireList));
    this.store.dispatch(tauxCommissionIntermediaireAction.loadTauxCommissionIntermediaire());
    this.tauxCommissionIntermediaireList$.pipe(takeUntil(this.destroy$))
            .subscribe(value => {
              if (value) {
                this.tauxCommissionIntermediaireList = value.slice();
              }
  });

    this.tauxList$ = this.store.pipe(select(tauxSelector.tauxList));
    this.store.dispatch(loadTaux());
    this.tauxList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
    if (value) {

      this.tauxList = value.slice();
      this.tauxList =this.tauxList.filter(element=>element.taux<50);
    }
  });

    this.arrondissementList$=this.store.pipe(select(arrondissementSelector.arrondissementList));
    this.store.dispatch(arrondissementAction.loadArrondissement());
    this.arrondissementList$.pipe(takeUntil(this.destroy$))
            .subscribe(value => {
              if (value) {
                //this.loading = false;
                this.arrondissementList = value.slice();
              }
  });

    this.secteurList$=this.store.pipe(select(secteurSelector.secteurList));
    this.store.dispatch(secteurAction.loadSecteur());
    this.secteurList$.pipe(takeUntil(this.destroy$))
            .subscribe(value => {
              if (value) {
                //this.loading = false;
                this.secteurList = value.slice();
              }
  });

    this.typeIntermediaireList$=this.store.pipe(select(typeIntermediaireSelector.typeIntermediaireList));
    this.store.dispatch(loadTypeIntermediaire());
    this.typeIntermediaireList$.pipe(takeUntil(this.destroy$))
            .subscribe(value => {
              if (value) {
                this.typeIntermediaireList = value.slice();
              }
  });

    this.intermediaireList$=this.store.pipe(select(intermediaireList));
    this.store.dispatch(loadIntermediaire());
    this.intermediaireList$.pipe(takeUntil(this.destroy$))
            .subscribe(value => {
              if (value) {
                this.intermediaireList = value.slice();
              }
  });

    this.paysList$=this.store.pipe(select(paysSelector.paysList));
    this.store.dispatch(loadPays());
    this.paysList$.pipe(takeUntil(this.destroy$))
            .subscribe(value => {
              if (value) {
                this.paysList = value.slice();
              }
  });


    this.regionList$=this.store.pipe(select(regionSelector.regionList));
    this.store.dispatch(loadRegion());
    this.regionList$.pipe(takeUntil(this.destroy$))
            .subscribe(value => {
              if (value) {
                this.regionList = value.slice();
              }
  });

    this.departementList$=this.store.pipe(select(departementSelector.departementList));
    this.store.dispatch(loadDepartement());
    this.departementList$.pipe(takeUntil(this.destroy$))
            .subscribe(value => {
              if (value) {
                this.departementList = value.slice();
              }
  });

    this.communeList$=this.store.pipe(select(communeSelector.communeList));
    this.store.dispatch(loadCommune());
    this.communeList$.pipe(takeUntil(this.destroy$))
            .subscribe(value => {
              if (value) {
                this.communeList = value.slice();
              }
  });

    this.secteurActiviteList$=this.store.pipe(select(secteurActiviteSelector.secteurActiviteList));
    this.store.dispatch(loadSecteurActivite());
    this.secteurActiviteList$.pipe(takeUntil(this.destroy$))
            .subscribe(value => {
              if (value) {
                this.secteurActiviteList = value.slice();
              }
  });

    this.dimensionPeriodeList$=this.store.pipe(select(dimensionPeriodeSelector.dimensionPeriodeList));
    this.store.dispatch(loadDimensionPeriode());
    this.dimensionPeriodeList$.pipe(takeUntil(this.destroy$))
            .subscribe(value => {
              if (value) {
                this.dimensionPeriodeList = value.slice();
              }
  });

    this.statusObject$ = this.store.pipe(select(status));
    this.checkStatus();

}


changeCountry(event) {
  this.regionList$.pipe(takeUntil(this.destroy$))
  .subscribe(value => {
    if (value) {
      this.regionList = value.slice();
      this.regionList = this.regionList.filter(element=> element.idTypePays===event.value.id);
    }
});
}

changeRegion(event) {
  this.departementList$.pipe(takeUntil(this.destroy$))
  .subscribe(value => {
    if (value) {
      this.departementList = value.slice();
      this.departementList = this.departementList.filter(element=> element.idRegion===event.value.id);
    }
});
}

changeDepartement(event) {
  this.communeList$.pipe(takeUntil(this.destroy$))
  .subscribe(value => {
    if (value) {
      this.communeList = value.slice();
      this.communeList = this.communeList.filter(element=> element.idDepartement===event.value.id);
    }
});
}

changeCommune(event) {
  this.arrondissementList$.pipe(takeUntil(this.destroy$))
  .subscribe(value => {
    if (value) {
      this.arrondissementList = value.slice();
      this.arrondissementList = this.arrondissementList.filter(element=> element.idCommune===event.value.id);
    }
});
}

changeArrondissement(event) {
  this.secteurList$.pipe(takeUntil(this.destroy$))
  .subscribe(value => {
    if (value) {
      this.secteurList = value.slice();
      this.secteurList = this.secteurList.filter(element=> element.idArrondissement===event.value.id);
    }
});
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

addIntermediaire() {
  this.intermediaire = {};
  this.displayDialogFormIntermediaire = true;
  this.intermediaireForm.get('pays').setValue(this.paysList?.find(pay=>pay.code ==="BUR"));

}

annulerSaisie() {
  this.intermediaireForm.reset();
  this.displayDialogFormIntermediaire = false;
}

editIntermediaire(intermediaire: Intermediaire) {




this.intermediaire = {...intermediaire};
console.log(this.intermediaire);
this.intermediaireForm.get('arrondissement').setValue(this.arrondissementList.find(arrondi=> arrondi.id === intermediaire?.secteur?.idArrondissement));
console.log(this.arrondissementList);    
const id = this.arrondissementList.find(arrondi=> arrondi.id === intermediaire?.secteur?.idArrondissement)?.idCommune;
    const departement = this.communeList.find(commun=> commun.id === id)?.idDepartement;
    console.log(departement);
    console.log();
    this.intermediaireForm.get('commune').setValue(this.communeList.find(commun=> commun.id === id));
    this.intermediaireForm.get('departement').setValue(this.departementList.find(depart=> depart.id === departement));
    this.intermediaireForm.get('region').setValue(this.regionList.find(regio=> regio.id === this.departementList.find(depart=> depart.id === departement)?.idRegion));
    this.intermediaireForm.get('pays').setValue(this.paysList.
      find(pay=> pay.id === this.intermediaireForm.get('region').value?.idTypePays));
this.intermediaireForm.patchValue(this.intermediaire);

this.displayDialogFormIntermediaire = true;
}

deleteIntermediaire(intermediaire: Intermediaire) {
  this.confirmationService.confirm({
    message: 'Etes vous sûr de vouloir supprimer l\'intermédiaire ?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
        this.store.dispatch(featureAction.deleteIntermediaire(intermediaire));
    }
});
}

onCreate() {
this.intermediaire = this.intermediaireForm.value;
this.confirmationService.confirm({
  message: 'Etes vous sur de vouloir ajouter cet intermediaire?',
  header: 'Confirmation',
  icon: 'pi pi-exclamation-triangle',
  accept: () => {
    if(this.intermediaire.id) { 
      this.store.dispatch(featureAction.updateIntermediaire(this.intermediaire));
      this.displayDialogFormIntermediaire = false;
    }else{
    this.store.dispatch(featureAction.createIntermediaire(this.intermediaire));
    }
    this.intermediaireForm.reset();
    
  }
});
this.intermediaireForm.get('pays').setValue(this.paysList?.find(pay=>pay.code ==="BUR"));

}

voirDetail(intermediaire: Intermediaire ) {
  this.intermediaire = {...intermediaire};
  this.infosIntermediaire = true;
}

deleteSelectedIntermediaire() {
  this.confirmationService.confirm({
    message: 'Etes vous sur de vouloir supprimer ces intermediaires?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.store.dispatch(featureAction.deleteIntermediaires({intermediaireList: this.selectedIntermediaires}));
    }
  });
}

ngOnDestroy() {
  this.destroy$.next(true);
  // Now let's also unsubscribe from the subject itself:
  this.destroy$.unsubscribe();
}
}


