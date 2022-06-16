import { Component, OnInit, OnDestroy} from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import {Garant} from '../../../store/contrat/garant/model';
import * as featureAction from '../../../store/contrat/garant/actions';
import {garantList} from '../../../store/contrat/garant/selector';
import {Pays} from '../../../store/parametrage/pays/model';
import {Region} from '../../../store/parametrage/region/model';
import * as typeGarant from '../../../store/parametrage/garant/model';
import { GarantList } from '../../../store/contrat/garant/model';

import {Departement} from '../../../store/parametrage/departement/model';
import {DimensionPeriode} from '../../../store/parametrage/dimension-periode/model';
import { Secteur } from 'src/app/store/parametrage/secteur/model';
import {Commune} from '../../../store/parametrage/commune/model';
import { Arrondissement } from 'src/app/store/parametrage/arrondissement/model';
import {SecteurActivite} from '../../../store/parametrage/secteur-activite/model';
import { Observable, of, Subject } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { AppState} from 'src/app/store/app.state';
import {loadPays} from '../../../store/parametrage/pays/actions';
import * as paysSelector from '../../../store/parametrage/pays/selector';
import {loadRegion} from '../../../store/parametrage/region/actions';
import * as regionSelector from '../../../store/parametrage/region/selector';
import * as typeGarantSelector from '../../../store/parametrage/garant/selector';
import {loadDepartement} from '../../../store/parametrage/departement/actions';
import * as departementSelector from '../../../store/parametrage/departement/selector';
import {loadCommune} from '../../../store/parametrage/commune/actions';
import * as communeSelector from '../../../store/parametrage/commune/selector';

import {loadSecteurActivite} from '../../../store/parametrage/secteur-activite/actions';
import * as secteurActiviteSelector from '../../../store/parametrage/secteur-activite/selector';
import * as secteurAction from '../../../store/parametrage/secteur/actions';
import {loadSecteur} from '../../../store/parametrage/secteur/actions';
import * as secteurSelector from '../../../store/parametrage/secteur/selector';

import * as arrondissementAction from '../../../store/parametrage/arrondissement/actions';
import {loadArrondissement} from '../../../store/parametrage/arrondissement/actions';
import * as arrondissementSelector from '../../../store/parametrage/arrondissement/selector';


import * as banqueAction from '../../../store/parametrage/Banques/actions';
import * as banqueSelector from '../../../store/parametrage/Banques/selector';

import * as tauxCommissionIntermediaireSelector from '../../../store/parametrage/taux-commission-intermediaire/selector';
import * as tauxCommissionAction from '../../../store/parametrage/taux-commission-intermediaire/actions';

import {loadDimensionPeriode} from '../../../store/parametrage/dimension-periode/actions';
import * as dimensionPeriodeSelector from '../../../store/parametrage/dimension-periode/selector';
import { loadGarant } from 'src/app/store/contrat/garant/actions';
import * as typeGarantAction from 'src/app/store/parametrage/garant/actions';
import {Status} from '../../../store/global-config/model';
import {status} from '../../../store/global-config/selector';
import { EntityValidations } from '../../common/models/validation';
import {BreadcrumbService} from '../../../app.breadcrumb.service';
import { element } from 'protractor';
import { Banque } from 'src/app/store/parametrage/Banques/model';
import { TauxCommissionIntermediaire } from 'src/app/store/parametrage/taux-commission-intermediaire/model';
import * as tauxCommissionIntermediaireAction from '../../../store/parametrage/taux-commission-intermediaire/actions';

@Component({
  selector: 'app-garant',
  templateUrl: './garant.component.html',
  styleUrls: ['./garant.component.scss']
})
export class GarantComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();
  cols: any[];
  garantList$: Observable<Array<Garant>>;
  garantList: Array<Garant>;
  paysList$: Observable<Array<Pays>>;
  paysList: Array<Pays>;
  arrondissementList$: Observable<Array<Arrondissement>>;
  arrondissementList: Array<Arrondissement>;
  regionList$: Observable<Array<Region>>;
  regionList: Array<Region>;
  departementList$: Observable<Array<Departement>>;
  departementList: Array<Departement>;
  communeList$: Observable<Array<Commune>>;
  communeList: Array<Commune>;
  listeGarant: GarantList = {};
  secteurActiviteList$: Observable<Array<SecteurActivite>>;
  secteurActiviteList: Array<SecteurActivite>;
  dimensionPeriodeList$: Observable<Array<DimensionPeriode>>;
  dimensionPeriodeList: Array<DimensionPeriode>;
  garant: Garant;
  selectedGarants: Garant[];
  displayDialogFormGarant = false;
  garantForm: FormGroup;
  statusObject$: Observable<Status>;
  entityValidations: Array<EntityValidations>;
  typeGarantList$: Observable<Array<typeGarant.Garant>>;
  typeGarantList: Array<typeGarant.Garant>;
  loading: boolean;
  secteurList: Array<Secteur>;
  secteurList$: Observable<Array<Secteur>>;
  banqueList: Array<Banque>;
  banqueList$: Observable<Array<Banque>>;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isEditable = false;
  infosGarant = false;
  tauxCommissionIntermediaireList: Array<TauxCommissionIntermediaire>;
  tauxCommissionIntermediaireList$: Observable<Array<TauxCommissionIntermediaire>>;
  arrondissement: Arrondissement;
  commune: Commune;
  province: Departement;
  region: Region;
  pays: Pays;


  constructor(private formBuilder: FormBuilder,
              private store: Store<AppState>, private messageService: MessageService,
              private confirmationService: ConfirmationService, private breadcrumbService: BreadcrumbService) {
      this.garantForm = this.formBuilder.group({
        id: new FormControl(''),
        code: new FormControl(''),
        nom: new FormControl('', [Validators.required]),
        contact: new FormControl('', [Validators.required]),
        adresseEmail: new FormControl(null, [Validators.required, Validators.email]),
        personneRessource1: new FormControl('', [Validators.required]),
        contactPersonneRessource1: new FormControl('', [Validators.required]),
        emailPersonneRessource1: new FormControl('', [Validators.required, Validators.email]),
        emailPersonneRessource2: new FormControl('', [Validators.email]),
        personneRessource2: new FormControl(''),
        contactPersonneRessource2: new FormControl(''),
        numeroCompteBancaire1: new FormControl('', [Validators.required]),
        numeroCompteBancaire2: new FormControl(''),
        adressePostale: new FormControl('', [Validators.required]),
        secteurActivite: new FormControl('', [Validators.required]),
        numeroIfu: new FormControl('', [Validators.required]),
        periodiciteAppelFond: new FormControl('', [Validators.required]),
        rccm: new FormControl('', [Validators.required]),
        pays: new FormControl(null),
        region: new FormControl(null),
        departement: new FormControl(null),
        arrondissement: new FormControl(null),
        typeGarant: new FormControl('', [Validators.required]),
        commune: new FormControl('', [Validators.required]),
        banque1: new FormControl('', [Validators.required]),
        banque2: new FormControl(''),
        secteur: new FormControl('', [Validators.required]),
        commissionPrime: new FormControl('', [Validators.required]),
        commissionAccessoire: new FormControl('', [Validators.required])
      });

      this.breadcrumbService.setItems([
        {label: 'Garant'}
    ]);

      this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
      this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    }

ngOnInit(): void {
  this.garantList = [];
  this.loading = true;
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
        {validName: 'required', validMessage: 'Ce champs est obligatoire'},
        {
          validName: 'maxlength',
          validMessage: 'Ce champs requiert au plus 5 caractères'
        }
      ]
    },
    {
      field: 'adresseEmail',
      validations: [
        {validName: 'required', validMessage: 'Ce champs est obligatoire'},
        {
          validName: 'maxlength',
          validMessage: 'Ce champs requiert au plus 5 caractères'
        },
        {
          validName: 'email',
          validMessage: 'Veuillez renseigner une adresse email valide'
        },
      ]
    },
    {
      field: 'emailPersonneRessource1',
      validations: [
        {validName: 'required', validMessage: 'Ce champs est obligatoire'},
        {
          validName: 'email',
          validMessage: 'Veuillez renseigner une adresse email valide'
        },
      ]
    },
    {
      field: 'emailPersonneRessource2',
      validations: [
        {
          validName: 'email',
          validMessage: 'Veuillez renseigner une adresse email valide'
        },
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


  this.tauxCommissionIntermediaireList$ = this.store.pipe(select(tauxCommissionIntermediaireSelector.tauxcommissionintermediaireList));
  this.store.dispatch(tauxCommissionIntermediaireAction.loadTauxCommissionIntermediaire());
  this.tauxCommissionIntermediaireList$.pipe(takeUntil(this.destroy$))
            .subscribe(value => {
              if (value) {
                this.tauxCommissionIntermediaireList = value.slice();
              }
  });

  this.banqueList$ = this.store.pipe(select(banqueSelector.banqueList));
  this.store.dispatch(banqueAction.loadBanque());
  this.banqueList$.pipe(takeUntil(this.destroy$))
            .subscribe(value => {
              if (value) {
                this.loading = false;
                this.banqueList = value.slice();
              }
  });

  this.typeGarantList$ = this.store.pipe(select(typeGarantSelector.garantList));
  this.store.dispatch(typeGarantAction.loadGarant());
  this.typeGarantList$.pipe(takeUntil(this.destroy$))
            .subscribe(value => {
              if (value) {
                this.loading = false;
                this.typeGarantList = value.slice();
              }
  });

  this.arrondissementList$ = this.store.pipe(select(arrondissementSelector.arrondissementList));
  this.store.dispatch(arrondissementAction.loadArrondissement());
  this.arrondissementList$.pipe(takeUntil(this.destroy$))
            .subscribe(value => {
              if (value) {
                this.loading = false;
                this.arrondissementList = value.slice();
              }
  });

  this.secteurList$ = this.store.pipe(select(secteurSelector.secteurList));
  this.store.dispatch(secteurAction.loadSecteur());
  this.secteurList$.pipe(takeUntil(this.destroy$))
            .subscribe(value => {
              if (value) {
                this.loading = false;
                this.secteurList = value.slice();
              }
  });


  this.garantList$ = this.store.pipe(select(garantList));
  this.store.dispatch(loadGarant());
  this.garantList$.pipe(takeUntil(this.destroy$))
            .subscribe(value => {
              if (value) {
                this.loading = false;
                this.garantList = value.slice();
              }
  });

  this.paysList$ = this.store.pipe(select(paysSelector.paysList));
  this.store.dispatch(loadPays());
  this.paysList$.pipe(takeUntil(this.destroy$))
            .subscribe(value => {
              if (value) {
                this.paysList = value.slice();
              }
  });


  this.regionList$ = this.store.pipe(select(regionSelector.regionList));
  this.store.dispatch(loadRegion());
  this.regionList$.pipe(takeUntil(this.destroy$))
            .subscribe(value => {
              if (value) {
                this.regionList = value.slice();
              }
  });

  this.departementList$ = this.store.pipe(select(departementSelector.departementList));
  this.store.dispatch(loadDepartement());
  this.departementList$.pipe(takeUntil(this.destroy$))
            .subscribe(value => {
              if (value) {
                this.departementList = value.slice();
              }
  });

  this.communeList$ = this.store.pipe(select(communeSelector.communeList));
  this.store.dispatch(loadCommune());
  this.communeList$.pipe(takeUntil(this.destroy$))
            .subscribe(value => {
              if (value) {
                this.communeList = value.slice();
              }
  });

  this.secteurActiviteList$ = this.store.pipe(select(secteurActiviteSelector.secteurActiviteList));
  this.store.dispatch(loadSecteurActivite());
  this.secteurActiviteList$.pipe(takeUntil(this.destroy$))
            .subscribe(value => {
              if (value) {
                this.secteurActiviteList = value.slice();
              }
  });

  this.dimensionPeriodeList$ = this.store.pipe(select(dimensionPeriodeSelector.dimensionPeriodeList));
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
      this.regionList = this.regionList.filter(elements => elements.idTypePays === event.value.id);
    }
});
}

changeRegion(event) {
  this.departementList$.pipe(takeUntil(this.destroy$))
  .subscribe(value => {
    if (value) {
      this.departementList = value.slice();
      this.departementList = this.departementList.filter(element => element.idRegion === event.value.id);
    }
});
}

changeDepartement(event) {
  this.communeList$.pipe(takeUntil(this.destroy$))
  .subscribe(value => {
    if (value) {
      this.communeList = value.slice();
      this.communeList = this.communeList.filter(element => element.idDepartement === event.value.id);
    }
});
}

changeCommune(event) {
  this.arrondissementList$.pipe(takeUntil(this.destroy$))
  .subscribe(value => {
    if (value) {
      this.arrondissementList = value.slice();
      // tslint:disable-next-line: no-shadowed-variable
      this.arrondissementList = this.arrondissementList.filter(element => element.idCommune === event.value.id);
    }
});
}

changeArrondissement(event) {
  this.secteurList$.pipe(takeUntil(this.destroy$))
  .subscribe(value => {
    if (value) {
      this.secteurList = value.slice();
      this.secteurList = this.secteurList.filter(element => element.idArrondissement === event.value.id);
    }
});
}


checkStatus() {
  this.statusObject$.pipe(takeUntil(this.destroy$))
      .subscribe(statusObj => {
        if (statusObj) {
          // this.loading = false;
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

onRowSelect($event){
  console.log($event.data);
}

showToast(severity: string, summary: string, detail: string) {
  this.messageService.add({severity, summary, detail});
}

addGarant() {
  this.garant = {};
  this.displayDialogFormGarant = true;
}

voirDetail(garant: Garant) {
  this.infosGarant = true;
  this.garant = garant;
}

editGarant(garant: Garant) {
// this.garantForm.get('id').setValue(garant.id);
this.garant = {...garant};
this.garantForm.patchValue(this.garant);
this.displayDialogFormGarant = true;
}

deleteGarant(garant: Garant) {
  this.confirmationService.confirm({
    message: 'Etes vous sur de vouloir supprimer?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
        this.store.dispatch(featureAction.deleteGarant(garant));
    }
});
}

onCreate() {
this.garant = this.garantForm.value;
console.log(this.garant);
this.confirmationService.confirm({
  message: 'Etes vous sur de vouloir ajouter ce garant?',
  header: 'Confirmation',
  icon: 'pi pi-exclamation-triangle',
  accept: () => {
    if (this.garant.id) {
      this.store.dispatch(featureAction.updateGarant(this.garantForm.value));
      this.displayDialogFormGarant = false;
    }else{
    this.store.dispatch(featureAction.createGarant(this.garantForm.value));
    }
    this.garantForm.reset();
  }
});
}

annulerSaisie() {
  this.garantForm.reset();
  this.displayDialogFormGarant = false;
}

deleteSelectedGrant() {
  this.listeGarant.garantDtoList = this.selectedGarants;
  this.confirmationService.confirm({
    message: 'Etes vous sur de vouloir supprimer ces garants?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.store.dispatch(featureAction.deleteGarants(this.listeGarant));
    }
  });
}

ngOnDestroy() {
  this.destroy$.next(true);
  // Now let's also unsubscribe from the subject itself:
  this.destroy$.unsubscribe();
}
}


