import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import {
  ControlContainer,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormArray
} from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { loadSousActe } from '../../../../store/parametrage/sous-acte/actions';
import * as sousActeSelector from '../../../../store/parametrage/sous-acte/selector';
import { takeUntil } from 'rxjs/operators';
import { SousActe } from 'src/app/store/parametrage/sous-acte/model';
import { Taux } from '../../../../store/parametrage/taux/model';
import { loadTaux } from '../../../../store/parametrage/taux/actions';
import * as tauxSelector from '../../../../store/parametrage/taux/selector';
import { Sort } from '../../../common/models/sort.enum';
import { loadGarantie } from '../../../../store/parametrage/garantie/actions';
import * as garantieSelector from '../../../../store/parametrage/garantie/selector';

import { loadPrestataire} from '../../../../store/parametrage/prestataire/actions';
import * as prestataireSelector from '../../../../store/parametrage/prestataire/selector';

import * as prefinancementSelector from '../../../../store/prestation/prefinancement/selector';
import * as prefinancementActions from '../../../../store/prestation/prefinancement/action';

import { loadMedecin} from '../../../../store/parametrage/medecin/actions';
import * as medecinSelector from '../../../../store/parametrage/medecin/selector';
import {medecinList} from '../../../../store/parametrage/medecin/selector';

import { loadActe } from '../../../../store/parametrage/acte/actions';
import * as acteSelector from '../../../../store/parametrage/acte/selector';

import { loadPathologie } from 'src/app/store/parametrage/pathologie/actions';
import * as pathologieSelector from '../../../../store/parametrage/pathologie/selector';

import { loadProduitPharmaceutique } from 'src/app/store/parametrage/produit-pharmaceutique/actions';
import * as produitPharmaceutiqueSelector from 'src/app/store/parametrage/produit-pharmaceutique/selector';

import { Acte } from 'src/app/store/parametrage/acte/model';
import { Garantie } from 'src/app/store/parametrage/garantie/model';
import { element } from 'protractor';
import { Prestataire } from 'src/app/store/parametrage/prestataire/model';
import { Medecin } from 'src/app/store/parametrage/medecin/model';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { Adherent } from 'src/app/store/contrat/adherent/model';
import * as featureActionAdherent from '../../../../store/contrat/adherent/actions';
import * as featureActionPrefinancement from '../../../../store/prestation/prefinancement/action';
import * as adherentSelector from '../../../../store/contrat/adherent/selector';
import { BonPriseEnCharge, CheckPlafond, CheckPrefinancementResult, Prefinancement, Prestation } from 'src/app/store/prestation/prefinancement/model';
import { Status } from 'src/app/store/global-config/model';
import { status } from '../../../../store/global-config/selector';
import { TypeEtatSinistre } from '../../../common/models/enum.etat.sinistre';
import { printPdfFile } from 'src/app/module/util/common-util';
import { TypeReport } from 'src/app/store/contrat/enum/model';
import { Report } from 'src/app/store/contrat/police/model';
import { TauxCommissionIntermediaireEffects } from 'src/app/store/parametrage/taux-commission-intermediaire/effect';
import { Pathologie } from 'src/app/store/parametrage/pathologie/model';
import { ProduitPharmaceutique } from 'src/app/store/parametrage/produit-pharmaceutique/model';
import { Dialog } from 'primeng/dialog/dialog';
import { BreadcrumbService } from 'src/app/app.breadcrumb.service';
import * as featureActionBonPriseEnCharge from '../../../../store/medical/bon-prise-en-charge/actions';
import * as selectorsBonPriseEnCharge from '../../../../store/medical/bon-prise-en-charge/selector';
import { TypeBon } from 'src/app/module/medical/enumeration/bon.enum';


@Component({
  selector: 'app-prefinancement',
  templateUrl: './prefinancement-edition.component.html',
  styleUrls: ['./prefinancement-edition.component.scss']
})
export class PrefinancementEditionComponent implements OnInit, OnDestroy {
  displayFormPrefinancement = false;
  prestationList: Array<FraisReels>;
  sousActeList$: Observable<Array<SousActe>>;
  sousActeList: Array<SousActe>;
  sousActeListFilter: Array<SousActe>;
  destroy$ = new Subject<boolean>();
  tauxList$: Observable<Array<Taux>>;
  tauxList: Array<Taux>;
  typeSort = Object.keys(Sort).map(key => ({ label: Sort[key], value: key }));
  prestationForm: FormGroup;
  acteList$: Observable<Array<Acte>>;
  acteList: Array<Acte>;
  prestataireList$: Observable<Array<Prestataire>>;
  prestataireList: Array<Prestataire>;
  prestatairePrescripteur: Array<Prestataire>;
  prestataireExecutant: Array<Prestataire>;
  medecinList$: Observable<Array<Medecin>>;
  medecinList: Array<Medecin>;
  pathologieList$: Observable<Array<Pathologie>>;
  pathologieList: Array<Pathologie>;
  produitPharmaceutiqueList$: Observable<Array<ProduitPharmaceutique>>;
  produitPharmaceutiqueList: Array<ProduitPharmaceutique>;
  acteListFilter: Array<Acte>;
  garanties: Array<Garantie>;
  garantieList$: Observable<Array<Garantie>>;
  adherentSelected: Adherent;
  adherentSelected$: Observable<Adherent>;
  medecinListFilter: Array<SelectItem>;
  prefinancementList: Array<Prefinancement> = [];
  prefinancementModel: Prefinancement = {};
  statusObject$: Observable<Status>;
  prefinancementDtoList$: Observable<Array<Prefinancement>>;
  prefinancementDtoList: Array<Prefinancement>;
  selectedPrefinancement: Prefinancement[];
  cols: any[];
  tab: number[] = [];
  taux: Taux;
  displayPrestation = false;
  prestationListPrefinancement: Array<Prestation>;
  prestationListPrefinancementFilter: Array<Prestation>;
  report: Report = {};
  public defaultDate: Date;
  checkControl = true;
  checkPrefinancementResult: Array<CheckPrefinancementResult>;
  bonPriseEnCharge: BonPriseEnCharge = {};
  bonPriseEnChargeList$: Observable<Array<BonPriseEnCharge>>;
  bonPriseEnChargeList: Array<BonPriseEnCharge>;
  plafondSousActe: CheckPlafond;

  constructor( private store: Store<AppState>,
               private confirmationService: ConfirmationService,
               private formBuilder: FormBuilder,  private messageService: MessageService,  private breadcrumbService: BreadcrumbService) {
                this.breadcrumbService.setItems([{ label: 'Sinistre edition' }]);
   }

   get prestation() {
    return this.prestationForm.controls.prestation as FormArray;
   }

   addItemPrestation(): void {
    const formPrestation: FormGroup = this.createItem();
    this.prestation.push(formPrestation);
  }

   deleteItemPrestation(i: number) {
    /**verifier si lelements est dans tab */
    for (const f of this.tab){
      if (f === i) {
        this.tab.splice(i);
      }
    }
    if (!this.tab.length) {
      this.checkControl = true;
    }

    if (this.prestationForm.get('montantReclame').value !== 0){
      this.prestationForm.get('montantSaisie').setValue(
        this.prestationForm.get('montantSaisie').value
        - this.prestationForm.get('montantSaisie').value[i].montantSaisie);
      this.prestationForm.get('montantRestant').setValue(
          this.prestationForm.get('montantRestant').value
          - this.prestationForm.get('montantRestant').value[i].montantRestant);
    }
    this.prestation.removeAt(i);
   }

   createItem(): FormGroup {
    return this.formBuilder.group({
      id: new FormControl(),
      nombreActe: new FormControl('', [Validators.required]),
      coutUnitaire: new FormControl('', [Validators.required]),
      debours: new FormControl(),
      sousActe: new FormControl(Validators.required),
      baseRemboursement: new FormControl(),
      taux: new FormControl(),
      montantRembourse: new FormControl(),
      montantPlafond: new FormControl(),
      sort: new FormControl(),
      montantRestant: new FormControl(),
      montantSupporte: new FormControl(),
      observation: new FormControl(),
      prestataire: new FormControl(null, Validators.required),
      centreExecutant: new FormControl(),
      produitPharmaceutique: new FormControl(),
      pathologie: new FormControl(),
      dateSoins: new FormControl(null, Validators.required),
      acte: new FormControl(),
      medecin: new FormControl(),
      historiqueAvenant: new FormControl()
    });
  }

  ngOnInit(): void {
    //this.prefinancementDtoList$ = this.store.pipe(select(prefinancementSelector.selectCheckPrefinancementReponse));

    //this.prestationList = [];
    this.prestationForm = this.formBuilder.group({
      // domaine: new FormControl({}),
      id: new FormControl(),
      referenceSinistreGarant: new FormControl(''),
      referenceBordereau: new FormControl(''),
      dateSaisie: new FormControl({value: '', disabled: true}),
      dateDeclaration: new FormControl(),
      matriculeAdherent: new FormControl(''),
      nomAdherent: new FormControl({value: '', disabled: true}),
      prenomAdherent: new FormControl({value: '', disabled: true}),
      numeroGroupe: new FormControl({value: '', disabled: true}),
      numeroPolice: new FormControl({value: '', disabled: true}),
      montantSaisie: new FormControl(0),
      montantReclame: new FormControl(0),
      montantRestant: new FormControl(0),
      bonPriseEnCharge: new FormControl(),
      prestation: this.formBuilder.array([])
    });
    this.prestationForm.get('dateSaisie').setValue(new Date());
    this.store.dispatch(featureActionPrefinancement.setReportPrestation(null));
    this.store.pipe(select(prefinancementSelector.selectByteFile)).pipe(takeUntil(this.destroy$))
    .subscribe(bytes => {
        if (bytes) {
                printPdfFile(bytes);
        }
    });

    // chargement des bons de prise en charge
    this.bonPriseEnChargeList$ = this.store.pipe(select(selectorsBonPriseEnCharge.bonPriseEnChargeList));
    this.store.dispatch(featureActionBonPriseEnCharge.loadBon());
    this.bonPriseEnChargeList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      console.log(value);
      if (value) {
        this.bonPriseEnChargeList = value.slice();
      }
    });

    // this.adherentSelected$ = ;
    this.store.dispatch(featureActionAdherent.selectedAdherentForSearch(null));
    this.store.pipe(select(adherentSelector.selectedAdherent)).pipe(takeUntil(this.destroy$)).subscribe((value) => {
    console.log(value);
    if (value) {
        console.log(value);
        this.adherentSelected = value;
        console.log(this.adherentSelected);
        this.prestationForm.get('nomAdherent').setValue(this.adherentSelected.nom);
        this.prestationForm.get('prenomAdherent').setValue(this.adherentSelected.prenom);
        this.prestationForm.get('numeroGroupe').setValue(this.adherentSelected.groupe.numeroGroupe);
        this.prestationForm.get('numeroPolice').setValue(this.adherentSelected.groupe.police.numero);
        console.log(this.bonPriseEnChargeList);
        this.bonPriseEnChargeList = this.bonPriseEnChargeList.filter(e => e.adherent.id === this.adherentSelected.id &&
          e.typeBon === TypeBon.ENTENTEPREALABLE);
        //this.taux = this.adherentSelected.groupe.taux;
      }
    });

    this.produitPharmaceutiqueList$ = this.store.pipe(select(produitPharmaceutiqueSelector.produitPharmaceutiqueList));
    this.store.dispatch(loadProduitPharmaceutique());
    this.produitPharmaceutiqueList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      console.log(value);
      if (value) {
        this.produitPharmaceutiqueList = value.slice();
      }
    });

    this.pathologieList$ = this.store.pipe(select(pathologieSelector.pathologieList));
    this.store.dispatch(loadPathologie());
    this.pathologieList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      console.log(value);
      if (value) {
        this.pathologieList = value.slice();
      }
    });

    this.prefinancementDtoList$ = this.store.pipe(select(prefinancementSelector.prefinancementList));
    this.store.dispatch(featureActionPrefinancement.loadPrefinancement());
    this.prefinancementDtoList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      console.log(value);
      if (value) {
        this.prefinancementDtoList = value.slice();
      }
    });
    
    //this.store.pipe(select(prefinancementSelector.montantSousActe));
    //this.store.dispatch(featureActionPrefinancement.setPlafondSousActe(null));
    

    this.sousActeList$ = this.store.pipe(select(sousActeSelector.sousacteList));
    this.store.dispatch(loadSousActe());
    this.sousActeList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        console.log(this.sousActeList);
        this.sousActeList = value.slice();
        this.sousActeListFilter = this.sousActeList;
      }
    });

    this.tauxList$ = this.store.pipe(select(tauxSelector.tauxList));
    this.store.dispatch(loadTaux());
    this.tauxList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.tauxList = value.slice();
      }
    });

    this.garantieList$ = this.store.pipe(select(garantieSelector.garantieList));
    this.store.dispatch(loadGarantie());
    this.garantieList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.garanties = value.slice();
      }
    });

    this.prestataireList$ = this.store.pipe(select(prestataireSelector.prestataireList));
    this.store.dispatch(loadPrestataire());
    this.prestataireList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.prestataireList = value.slice();
       // this.prestataireList.filter(ele => console.log('***************' + ele.libelleTypePrestataire.toUpperCase()));
        this.prestatairePrescripteur = this.prestataireList.filter(ele => ele.libelleTypePrestataire &&
           ele.libelleTypePrestataire.toUpperCase() !== 'PHARMACIE');
        console.log(this.prestatairePrescripteur);
        this.prestataireExecutant = this.prestataireList;
      }
    });

    this.medecinList$ = this.store.pipe(select(medecinSelector.medecinList));
    this.store.dispatch(loadMedecin());
    this.medecinList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.medecinList = value.slice();
      }
    });

    this.acteList$ = this.store.pipe(select(acteSelector.acteList));
    this.store.dispatch(loadActe());
    this.acteList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.acteList = value.slice();
        this.acteListFilter = this.acteList;
      }
    });

    this.statusObject$ = this.store.pipe(select(status));
    this.checkStatus();
  }

  imprimer(pref: Prefinancement) {
    this.report.typeReporting = TypeReport.PREFINANCEMENT_FICHE_DETAIL_REMBOURSEMENT;
    this.report.prefinancementDto = pref;
    this.store.dispatch(featureActionPrefinancement.FetchReportPrestation(this.report));
  }

  validerPrestation(pref: Prefinancement) {
    this.confirmationService.confirm({
      message: 'voulez-vous valider le sinistre',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(featureActionPrefinancement.updateEtatValiderPrefinancement({prefinancement: pref,
          etat: TypeEtatSinistre.VALIDE}));
      },
    });
  }

  selectDateSoins(i: number){
    console.log('************************ selection de la date de soins' + i);
    this.plafondSousActe = {};
    this.plafondSousActe.date = this.prestationForm.get('prestation').value[i].dateSoins;
    this.plafondSousActe.adherent = this.adherentSelected;
    this.plafondSousActe.sousActe = this.prestationForm.get('prestation').value[i].sousActe;
    if (this.plafondSousActe.sousActe && this.plafondSousActe.date && this.plafondSousActe.adherent){
    this.store.dispatch(featureActionPrefinancement.checkPlafond(this.plafondSousActe));
    this.store.pipe(select(prefinancementSelector.montantSousActe)).pipe(takeUntil(this.destroy$)).subscribe((value) => {
      console.log(value);
      const myForm = (this.prestationForm.get('prestation') as FormArray).at(i);
      if (value) {
        myForm.patchValue({montantPlafond: value});
      } else {
        myForm.patchValue({montantPlafond: 0, sort: Sort.REJETE});
      }
    });
    }
    console.log(this.plafondSousActe);
  }

  supprimerPrefinancement() {
    console.log(this.selectedPrefinancement);
    if (!this.selectedPrefinancement) {
      this.showToast('error', 'INFORMATION', 'aucun préfinancement selectionné');
    } else {
      this.confirmationService.confirm({
        message: 'voulez-vous supprimer le sinistre',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.store.dispatch(featureActionPrefinancement.deletePrefinancement({prefinancement: this.selectedPrefinancement}));
      }
     });
    }
  }

  selectActe(event){
    console.log(event);
    this.sousActeListFilter = this.sousActeList.filter(e => e.idTypeActe === event.value.id);
  }

  onRowSelectBon($event){
    console.log($event.value);
    for (const pr of $event.value.prestation) {
      const formPrestation: FormGroup = this.createItem();
      pr.id = null;
      formPrestation.patchValue(pr);
      formPrestation.get('dateSoins').setValue(new Date(pr.dateSoins));
      formPrestation.get('debours').setValue(pr.debours);
      formPrestation.get('taux').setValue(pr.taux);
      formPrestation.get('montantRembourse').setValue(pr.montantRembourse);
      formPrestation.get('baseRemboursement').setValue(pr.baseRemboursement);
      this.prestation.push(formPrestation);
      }
    this.displayFormPrefinancement = true;
  }

  editerPrestation(pref: Prefinancement) {
    console.log(pref);
    this.adherentSelected = pref.adherent;
    this.prestationForm.get('referenceBordereau').setValue(pref.referenceBordereau);
    this.prestationForm.get('matriculeAdherent').setValue(pref.adherent.numero);
    this.prestationForm.get('nomAdherent').setValue(pref.adherent.nom);
    this.prestationForm.get('prenomAdherent').setValue(pref.adherent.prenom);
    this.prestationForm.get('numeroGroupe').setValue(pref.adherent.groupe.numeroGroupe);
    this.prestationForm.get('numeroPolice').setValue(pref.adherent.groupe.police.numero);
    this.prestationForm.get('dateDeclaration').setValue(new Date(pref.dateDeclaration));
    //this.prestationForm.get('dateSoins').setValue(new Date(pref.dateSoins));
    this.prestationForm.get('dateSaisie').setValue(new Date(pref.dateSaisie));
    for (const pr of pref.prestation) {
    const formPrestation: FormGroup = this.createItem();
    formPrestation.patchValue(pr);
    formPrestation.get('dateSoins').setValue(new Date(pr.dateSoins));
    formPrestation.get('debours').setValue(pr.debours);
    formPrestation.get('taux').setValue(pr.taux);
    formPrestation.get('montantRembourse').setValue(pr.montantRembourse);
    formPrestation.get('baseRemboursement').setValue(pr.baseRemboursement);
    this.prestation.push(formPrestation);
    }
    this.displayFormPrefinancement = true;
  }

  voirPrestation(pref: Prefinancement){
    this.displayPrestation = true;
    this.prestationListPrefinancement = pref.prestation;
    this.prestationListPrefinancementFilter = this.prestationListPrefinancement;
  }
  
  supprimerPrestation(prestation: Prestation) {
    this.confirmationService.confirm({
      message: 'voulez-vous supprimer la prestation',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(featureActionPrefinancement.deletePrestation(prestation));
        this.prestationListPrefinancementFilter = this.prestationListPrefinancement.filter(el  => el.id  !== prestation.id);
      },
    });
  }

  calculDebours(i: number) {
    let myForm = (this.prestationForm.get('prestation') as FormArray).at(i);
    myForm.patchValue({taux: this.adherentSelected.groupe.taux, sort: Sort.ACCORDE});
    if (this.prestationForm.get('prestation').value[i].nombreActe &&
    this.prestationForm.get('prestation').value[i].coutUnitaire) {
      myForm.patchValue({debours: this.prestationForm.get('prestation').value[i].nombreActe *
      this.prestationForm.get('prestation').value[i].coutUnitaire, baseRemboursement:
      this.prestationForm.get('prestation').value[i].nombreActe *
      this.prestationForm.get('prestation').value[i].coutUnitaire});
    }
    this.prefinancementModel = this.prestationForm.value;
    this.prefinancementModel.dateSaisie = new Date();
    this.prefinancementModel.adherent = this.adherentSelected;
    this.prefinancementList.push(this.prefinancementModel);
    /* executer le controle de la prestation */
    this.store.dispatch(featureActionPrefinancement.checkPrefinancement({prefinancement: this.prefinancementList}));
    this.store.pipe(select(prefinancementSelector.selectCheckPrefinancementReponse)).pipe(takeUntil(this.destroy$)).subscribe((value) => {
      console.log(value);
      if (!value) {

      } else {
        this.checkPrefinancementResult = value.slice();
        console.log(this.checkPrefinancementResult);
        for (let j = 0; j < this.checkPrefinancementResult.length; j++){
          /** */
          this.prestationForm.get('montantSaisie').setValue(
            this.prestationForm.get('montantSaisie').value + this.checkPrefinancementResult[j].montantRembourse);
          this.prestationForm.get('montantRestant').setValue(
              this.prestationForm.get('montantReclame').value - this.prestationForm.get('montantSaisie').value);
          myForm = (this.prestationForm.get('prestation') as FormArray).at(j);
          myForm.patchValue({montantRembourse: this.checkPrefinancementResult[j].montantRembourse,
            montantSupporte: (this.prestationForm.get('prestation').value[i].nombreActe *
            this.prestationForm.get('prestation').value[i].coutUnitaire) - this.checkPrefinancementResult[j].montantRembourse,
            sort: this.checkPrefinancementResult[j].sort, montantRestant: this.checkPrefinancementResult[j].montantRestant,
            observation: this.checkPrefinancementResult[j].message, historiqueAvenant: this.checkPrefinancementResult[j].historiqueAvenant
          });
        }
        }
    });
    this.prefinancementList = [];
    this.prefinancementModel = {};
  }

  calculCoutDebours(data: FraisReels, ri: number) {
    /*
    console.log(this.prestationList);
    console.log(data);
    this.prestationList[ri].debours = data.coutUnitaire * Number(data.nombreActe);
    this.prestationList[ri].baseRemboursement =   this.prestationList[ri].debours;
    this.prestationList[ri].montantRembourse = this.prestationList[ri].baseRemboursement*(this.prestationList[ri].taux.taux/100); 
    */
  }

  setNombreActe(data: FraisReels, ri) {
    this.prestationList[ri].nombreActe = data.cle;
  }

  rechercherAdherent(event) {
    if (event.target.value !== '') {
    console.log(event.target.value);
    this.prestationForm.get('nomAdherent').setValue('');
    this.prestationForm.get('prenomAdherent').setValue('');
    this.prestationForm.get('numeroGroupe').setValue('');
    this.prestationForm.get('numeroPolice').setValue('');
    this.adherentSelected = null;
    this.store.dispatch(featureActionAdherent.searchAdherent({numero: event.target.value}));
    }
  }

  // valider prefinancement
  validerPrefinancement() {
    console.log(this.prefinancementList);
    this.store.dispatch(featureActionPrefinancement.createPrefinancement({prefinancement: this.prefinancementList}));
    this.prefinancementList = [];
    this.prestationList = [];
    this.prestationForm.reset();
  }

  closeDialog() {
   this.prefinancementList = [];
   this.prestationForm.reset();
   this.prestation.clear();
   console.log(this.prestation);
  }

  /** enregistrement cas de prefinancement */
  onCreate() {
    /** fonction pour enregistrer la prestation */ 
   console.log('creation prefinancement');
   this.prefinancementModel = this.prestationForm.value;
   this.prefinancementModel.dateSaisie = new Date();
   this.prefinancementModel.adherent = this.adherentSelected;
   this.prefinancementList.push(this.prefinancementModel);
   this.store.dispatch(featureActionPrefinancement.createPrefinancement({prefinancement: this.prefinancementList}));
  // this.prefinancementModel.prestation = this.prestationForm.get('itemsPrestation').value;
   console.log(this.prefinancementModel);
   this.prefinancementList = [];
   this.prestationForm.reset();
   //this.prestationForm.get('dateSaisie').setValue(new Date());
   }

  // permet d'enregistrer une prestation par famille
  addPrestation(){
    this.prefinancementModel.prestation = this.prestationList;
    this.prefinancementModel.dateDeclaration = this.prestationForm.get('dateDeclaration').value;
    //this.prefinancementModel.dateSoins = this.prestationForm.get('dateSoins').value;
    this.prefinancementModel.referenceBordereau = this.prestationForm.get('referenceBordereau').value;
    this.prefinancementModel.adherent = this.adherentSelected;
    this.prefinancementList.push(this.prefinancementModel);
    this.prestationList = [];
    this.prestationForm.reset();
  }
  
  changeGarantie(garantie) {
    console.log(garantie);
    this.acteListFilter = this.acteList.filter(element => element.idTypeGarantie === garantie.value.id);
  }
  
  showDialogPlafondMaximized(dialog: Dialog) {
    dialog.maximized = true;
  }
  
  newRowPrestation() {
    return {taux: this.taux};
  }

  addPrefinancement(){
    this.displayFormPrefinancement = true;
    this.prestationForm.get('dateSaisie').setValue(new Date());
  }
  
  showToast(severity: string, summary: string, detail: string) {
    this.messageService.add({ severity, summary, detail });
  }
  
  checkStatus() {
    this.statusObject$.pipe(takeUntil(this.destroy$)).subscribe((statusObj) => {
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

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}


export interface FraisReels {
  nombreActe?: number;
  coutUnitaire?: number;
  debours?: number;
  sousActe?: SousActe;
  cle?: number;
  baseRemboursement?: number;
  taux?: Taux;
  montantRembourse?: number;
  sort?: Sort;
  observation?: string;
  dateSoins?: Date;
  produitPharmaceutique: Array<ProduitPharmaceutique>;
}
