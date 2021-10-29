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


  constructor(private formBuilder: FormBuilder,
    private store: Store<AppState>, private messageService: MessageService, 
    private confirmationService: ConfirmationService, private breadcrumbService: BreadcrumbService) { 
      this.intermediaireForm = this.formBuilder.group({
        id: new FormControl(''),
        nom: new FormControl('',[Validators.required]),
        contact: new FormControl('',[Validators.required]),
        adresseEmail: new FormControl(null,[Validators.required]),
        adressePostale: new FormControl(null,[Validators.required]),
        typeIntermediaire: new FormControl(null,[Validators.required]),
        personneRessource: new FormControl('',[Validators.required]),
        numeroCompteBancaire1: new FormControl('',[Validators.required]),
        numeroCompteBancaire2: new FormControl(''),
        numeroIfu: new FormControl('',[Validators.required]),
        //periodiciteAppelFond: new FormControl(''),
        rccm: new FormControl(''),
        pays: new FormControl('',[Validators.required]),
        region: new FormControl('',),
        province: new FormControl(''),
        commune: new FormControl('')
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
}

editIntermediaire(intermediaire: Intermediaire) {
this.intermediaireForm.get('id').setValue(intermediaire.id);
this.intermediaire = {...intermediaire};
this.displayDialogFormIntermediaire = true;
}

deleteIntermediaire(intermediaire: Intermediaire) {
  this.confirmationService.confirm({
    message: 'Etes vous sur de vouloir supprimer?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
        this.store.dispatch(featureAction.deleteIntermediaire(intermediaire));
    }
});
}

onCreate() {
this.intermediaire = this.intermediaireForm.value;
console.log(this.intermediaire);
this.confirmationService.confirm({
  message: 'Etes vous sur de vouloir Ajouter ce intermediaire?',
  header: 'Confirmation',
  icon: 'pi pi-exclamation-triangle',
  accept: () => {
    if(this.intermediaire.id) { 
      this.store.dispatch(featureAction.updateIntermediaire(this.intermediaireForm.value));
    }else{
    this.store.dispatch(featureAction.createIntermediaire(this.intermediaireForm.value));
    }
    this.intermediaireForm.reset();
  }
});
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


