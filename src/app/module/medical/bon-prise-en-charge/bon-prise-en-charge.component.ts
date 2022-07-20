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
import { loadSousActe } from '../../../store/parametrage/sous-acte/actions';
import * as sousActeSelector from '../../../store/parametrage/sous-acte/selector';
import { takeUntil } from 'rxjs/operators';
import { SousActe } from 'src/app/store/parametrage/sous-acte/model';
import { Taux } from '../../../store/parametrage/taux/model';
import { loadTaux } from '../../../store/parametrage/taux/actions';
import * as tauxSelector from '../../../store/parametrage/taux/selector';
import { Sort } from '../../common/models/sort.enum';
import { loadGarantie } from '../../../store/parametrage/garantie/actions';
import * as garantieSelector from '../../../store/parametrage/garantie/selector';
import { loadPrestataire} from '../../../store/parametrage/prestataire/actions';
import * as prestataireSelector from '../../../store/parametrage/prestataire/selector';
import * as prefinancementSelector from '../../../store/prestation/prefinancement/selector';
import * as prefinancementActions from '../../../store/prestation/prefinancement/action';
import { loadMedecin} from '../../../store/parametrage/medecin/actions';
import * as medecinSelector from '../../../store/parametrage/medecin/selector';
import {medecinList} from '../../../store/parametrage/medecin/selector';
import { loadActe } from '../../../store/parametrage/acte/actions';
import * as acteSelector from '../../../store/parametrage/acte/selector';
import { loadPathologie } from 'src/app/store/parametrage/pathologie/actions';
import * as pathologieSelector from '../../../store/parametrage/pathologie/selector';
import { loadProduitPharmaceutique } from 'src/app/store/parametrage/produit-pharmaceutique/actions';
import * as produitPharmaceutiqueSelector from 'src/app/store/parametrage/produit-pharmaceutique/selector';
import { Acte } from 'src/app/store/parametrage/acte/model';
import { Garantie } from 'src/app/store/parametrage/garantie/model';
import { element } from 'protractor';
import { Prestataire } from 'src/app/store/parametrage/prestataire/model';
import { Medecin } from 'src/app/store/parametrage/medecin/model';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { Adherent } from 'src/app/store/contrat/adherent/model';
import * as featureActionAdherent from '../../../store/contrat/adherent/actions';
import * as featureActionPrefinancement from '../../../store/prestation/prefinancement/action';
import * as adherentSelector from '../../../store/contrat/adherent/selector';
import { CheckPlafond, CheckPrefinancementResult, Prefinancement, Prestation } from 'src/app/store/prestation/prefinancement/model';
import { Status } from 'src/app/store/global-config/model';
import { status } from '../../../store/global-config/selector';
import { TypeEtatSinistre } from '../../common/models/enum.etat.sinistre';
import { printPdfFile } from 'src/app/module/util/common-util';
import { TypeReport } from 'src/app/store/contrat/enum/model';
import { Report } from 'src/app/store/medical/bon-prise-en-charge/model';
import { TauxCommissionIntermediaireEffects } from 'src/app/store/parametrage/taux-commission-intermediaire/effect';
import { Pathologie } from 'src/app/store/parametrage/pathologie/model';
import { ProduitPharmaceutique } from 'src/app/store/parametrage/produit-pharmaceutique/model';
import { Dialog } from 'primeng/dialog/dialog';
import { BreadcrumbService } from 'src/app/app.breadcrumb.service';
import { BonPriseEnCharge } from 'src/app/store/medical/bon-prise-en-charge/model';
import * as featureActionBonPriseEnCharge from '../../../store/medical/bon-prise-en-charge/actions';
import * as selectorsBonPriseEnCharge from '../../../store/medical/bon-prise-en-charge/selector';
import { BonPriseEnChargeState } from 'src/app/store/medical/bon-prise-en-charge/state';
import { KeycloakService } from 'keycloak-angular';
import { ConventionService } from 'src/app/store/medical/convention/service';
import { TierPayantService } from 'src/app/store/prestation/tierPayant/service';

@Component({
  selector: 'app-bon-prise-en-charge',
  templateUrl: './bon-prise-en-charge.component.html',
  styleUrls: ['./bon-prise-en-charge.component.scss']
})
export class BonPriseEnChargeComponent implements OnInit, OnDestroy {
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
  displayDetail = false;
  prestationListPrefinancement: Array<Prestation>;
  prestationListPrefinancementFilter: Array<Prestation>;
  report: Report = {};
  public defaultDate: Date;
  checkControl = true;
  checkPrefinancementResult: Array<CheckPrefinancementResult>;
  test: Array<SelectItem>;
  bonPriseEnCharge: BonPriseEnCharge = {};
  bonPriseEnChargeDetail: BonPriseEnCharge = {};
  bonPriseEnChargeList$: Observable<Array<BonPriseEnCharge>>;
  bonPriseEnChargeList: Array<BonPriseEnCharge>;
  typeBon: Array<SelectItem>;
  montantConvention :number = 0;
  montantConsomme: number = 0;
  montantPlafond: number = 0;
  plafondSousActe: CheckPlafond;
 // userCurent: Us

  constructor( private store: Store<AppState>,
               private confirmationService: ConfirmationService,
               private keycloak: KeycloakService,
               private conventionService: ConventionService,
               private tierPayantService: TierPayantService,
               private formBuilder: FormBuilder,  private messageService: MessageService,  private breadcrumbService: BreadcrumbService) {
                this.breadcrumbService.setItems([{ label: 'Bon prise en charge / Entente préalable'}]);
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
    this.prestation.removeAt(i);
   }

   createItem(): FormGroup {
    return this.formBuilder.group({
      id: new FormControl(),
      nombreActe: new FormControl('', [Validators.required]),
      coutUnitaire: new FormControl('', [Validators.required]),
      debours: new FormControl(),
      sousActe: new FormControl([Validators.required]),
      baseRemboursement: new FormControl(),
      taux: new FormControl(),
      montantRembourse: new FormControl(),
      sort: new FormControl(),
      montantRestant: new FormControl(),
      observation: new FormControl(),
      prestataire: new FormControl(),
      centreExecutant: new FormControl(),
      produitPharmaceutique: new FormControl(),
      pathologie: new FormControl(),
      dateSoins: new FormControl('', [Validators.required]),
      acte: new FormControl(),
      familleActe: new FormControl(),
      medecin: new FormControl()
    });
  }

  findMontantConsomme(event){
    console.log(event);
    this.tierPayantService.$findMontantConsomme(this.adherentSelected.id, event.value?.id).subscribe(rest=>{

        this.montantConsomme = rest;
       
    });
}

  ngOnInit(): void {
    this.typeBon = [{label: 'PRISE-EN-CHARGE', value: 'PRISEENCHARGE'},
    {label: 'ENTENTE-PREALABLE', value: 'ENTENTEPREALABLE'}];
    //this.prefinancementDtoList$ = this.store.pipe(select(prefinancementSelector.selectCheckPrefinancementReponse));

    //this.prestationList = [];
    this.prestationForm = this.formBuilder.group({
      // domaine: new FormControl({}),
      id: new FormControl(),
      referenceSinistreGarant: new FormControl(''),
      referenceBordereau: new FormControl(''),
      dateSaisie: new FormControl({value: '', disabled: true}),
      dateDeclaration: new FormControl(''),
      matriculeAdherent: new FormControl(''),
      nomAdherent: new FormControl({value: '', disabled: true}),
      prenomAdherent: new FormControl({value: '', disabled: true}),
      numeroGroupe: new FormControl({value: '', disabled: true}),
      numeroPolice: new FormControl({value: '', disabled: true}),
      prestataire: new FormControl('', Validators.required),
      typeBon: new FormControl('', Validators.required),
      souscripteur: new FormControl({value: '', disabled: true}),
      prestation: this.formBuilder.array([])
    });
    this.prestationForm.get('dateSaisie').setValue(new Date());
    this.store.dispatch(featureActionBonPriseEnCharge.setBon(null));
    this.store.pipe(select(selectorsBonPriseEnCharge.selectByteFile)).pipe(takeUntil(this.destroy$))
    .subscribe(bytes => {
        if (bytes) {
                printPdfFile(bytes);
        }
    });

    // this.adherentSelected$ = ;
    this.store.dispatch(featureActionAdherent.selectedAdherentForSearch(null));
    this.store.pipe(select(adherentSelector.selectedAdherent)).pipe(takeUntil(this.destroy$)).subscribe((value) => {
    console.log(value);

    if (value) {
        console.log(value);
        this.adherentSelected = value;
        this.prestationForm.get('souscripteur').setValue(this.adherentSelected.groupe.police.nom);
        this.prestationForm.get('souscripteur').disable();
        this.prestationForm.get('nomAdherent').setValue(this.adherentSelected.nom.concat(" ").concat(this.adherentSelected.prenom));
        if(this.adherentSelected.adherentPrincipal) {
          this.prestationForm.get('prenomAdherent').setValue(this.adherentSelected.adherentPrincipal.nom.concat(" ").concat(this.adherentSelected.adherentPrincipal.prenom));
        }else {
          this.prestationForm.get('prenomAdherent').setValue(this.adherentSelected.nom.concat(" ").concat(this.adherentSelected.prenom));

        }
        
        this.prestationForm.get('numeroGroupe').setValue(this.adherentSelected.groupe.numeroGroupe);
        this.prestationForm.get('numeroPolice').setValue(this.adherentSelected.groupe.police.numero);
        //this.taux = this.adherentSelected.groupe.taux;
      }
    });

    this.bonPriseEnChargeList$ = this.store.pipe(select(selectorsBonPriseEnCharge.bonPriseEnChargeList));
    this.store.dispatch(featureActionBonPriseEnCharge.loadBon());
    this.bonPriseEnChargeList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      console.log(value);
      if (value) {
        this.bonPriseEnChargeList = value.slice();
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

  imprimer(bon: BonPriseEnCharge) {
    bon.userCurent = this.keycloak.getUsername();
    this.report.typeReporting = TypeReport.BONPRISEENCHARGE;
    this.report.bonPriseEnChargeDto = bon;
    this.store.dispatch(featureActionBonPriseEnCharge.FetchReportBon(this.report));
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

  editer(pref: BonPriseEnCharge) {
    console.log(pref);
    this.adherentSelected = pref.adherent;
    //this.prestationForm.get('referenceBordereau').setValue(pref.referenceBordereau);
    this.prestationForm.get('matriculeAdherent').setValue(pref.adherent.numero);
    this.prestationForm.get('nomAdherent').setValue(pref.adherent.nom);
    this.prestationForm.get('typeBon').setValue(pref.typeBon);
    this.prestationForm.get('nomAdherent').setValue(pref.adherent.nom.concat(" ").concat(pref.adherent.prenom));
        if(pref.adherent.adherentPrincipal) {
          this.prestationForm.get('prenomAdherent').setValue(pref.adherent.adherentPrincipal.nom.concat(" ").concat(pref.adherent.adherentPrincipal.prenom));
        }else {
          this.prestationForm.get('prenomAdherent').setValue(pref?.adherent?.nom.concat(" ").concat(pref?.adherent?.prenom));

        }
    this.prestationForm.get('numeroGroupe').setValue(pref.adherent.groupe.numeroGroupe);
    this.prestationForm.get('numeroPolice').setValue(pref.adherent.groupe.police.numero);
    this.prestationForm.get('souscripteur').setValue(pref.adherent.groupe.police.nom);
    this.prestationForm.get('dateDeclaration').setValue(pref.dateDeclaration);
    this.prestationForm.get('prestataire').setValue(pref.prestataire);
    this.prestationForm.get('prestataire').setValue(pref.prestataire);
    //this.prestationForm.get('dateSoins').setValue(new Date(pref.dateSoins));
    this.prestationForm.get('dateSaisie').setValue(new Date(pref.dateSaisie));
    for (const pr of pref.prestation) {
      const prest : Prestation = pr;
     
    const formPrestation: FormGroup = this.createItem();
    formPrestation.patchValue(pr);
    formPrestation.get('dateSoins').setValue(new Date(pr.dateSoins));
    formPrestation.get('debours').setValue(pr.debours);
    formPrestation.get('taux').setValue(pr.taux);
    formPrestation.get('montantRembourse').setValue(pr.montantRembourse);
    formPrestation.get('baseRemboursement').setValue(pr.baseRemboursement);
    // formPrestation.get('familleActe').setValue(this.garanties.find(garan=>garan.actes[0]?.id === prest?.acte.id));
    console.log("==========================",this.garanties, prest?.acte);
    this.prestation.push(formPrestation);
    }
    this.displayFormPrefinancement = true;
  }

  voir(bon: BonPriseEnCharge) {
    this.displayDetail = true;
    this.bonPriseEnChargeDetail = bon;
    console.log(bon);
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

  selectDateSoins(event){
    this.plafondSousActe = {};
    this.plafondSousActe.sousActe =  event.value; 
    this.plafondSousActe.dateSoins = new Date();
    this.plafondSousActe.adherent = this.adherentSelected;
   
   
    this.store.dispatch(featureActionPrefinancement.checkPlafond(this.plafondSousActe));
    this.store.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      console.log(value);
      if (value) {
          this.montantPlafond =  value.prefinancementState?.montantPlafondSousActe;
      } 
    
    });
    }
  
  calculDebours(i: number) {
    if(this.prestationForm.get('prestation')?.value?.length > 1) {
      this.prestationForm.get('prestation')?.value.forEach(prestation=>{
        console.log( "+++++++++++.+++", prestation?.montantRembourse);

        if(prestation?.sousActe.id === this.prestationForm.get('prestation').value[i]?.sousActe?.id && !prestation.id) {
          this.montantConsomme = this.montantConsomme + prestation?.montantRembourse;
          console.log( "+++++++ this.montantConsomme++",  this.montantConsomme);
        }
      });
    }
    let myForm = (this.prestationForm.get('prestation') as FormArray).at(i);
console.log(myForm);
    myForm.patchValue({taux: this.adherentSelected.groupe.taux, sort: Sort.ACCORDE});
    this.conventionService.$findMontantConvention(this.prestationForm.get('prestation').value[i]?.sousActe?.id).subscribe((rest)=>{
      this.montantConvention = rest;
      console.log( this.montantConvention);
   if(this.montantConvention !== 0 &&  this.montantConvention < this.prestationForm.get('prestation').value[i].coutUnitaire) {
      this.showToast('error', 'INFORMATION', 'coût unitaire differnt du montant de la convention');
      myForm.patchValue({coutUnitaire: this.montantConvention}); 
   //   this.prestationForm.get('prestation').value[i].coutUnitaire = myForm.patchValue({coutUnitaire: this.montantConvention}); 
      
  }

    if (this.prestationForm.get('prestation').value[i].nombreActe &&
    this.prestationForm.get('prestation').value[i].coutUnitaire) {
      myForm.patchValue({debours: this.prestationForm.get('prestation').value[i].nombreActe *
      this.prestationForm.get('prestation').value[i].coutUnitaire, baseRemboursement:
      this.prestationForm.get('prestation').value[i].nombreActe *
      this.prestationForm.get('prestation').value[i].coutUnitaire, montantRembourse :
      (this.prestationForm.get('prestation').value[i].nombreActe *
      this.prestationForm.get('prestation').value[i].coutUnitaire * this.adherentSelected.groupe.taux.taux)  / 100});
      if((this.montantConsomme + this.prestationForm.get('prestation').value[i]?.montantRembourse) < this.montantPlafond) {
        myForm.patchValue({ montantRembourse :
          (this.prestationForm.get('prestation').value[i].nombreActe *
          this.prestationForm.get('prestation').value[i].coutUnitaire * this.adherentSelected.groupe.taux.taux)  / 100 });
          if(this.prestationForm.get('prestation').value[i].sousActe.idGenre) {
            if((this.adherentSelected.genre.id === this.prestationForm.get('prestation').value[i].sousActe.idGenre) ||
            (this.adherentSelected.genre.id !== this.prestationForm.get('prestation').value[i].sousActe.idGenre && this.adherentSelected.qualiteAssure.code =="ENFANT")){
              myForm.patchValue({ montantRembourse : 0});
              myForm.patchValue({ montantRestant:  this.prestationForm.get('prestation').value[i].baseRemboursement - this.prestationForm.get('prestation').value[i].montantRembourse})
              if(this.adherentSelected.genre.id !== this.prestationForm.get('prestation').value[i].sousActe.idGenre && this.adherentSelected.qualiteAssure.code =="ENFANT") {
                myForm.patchValue({observation: "Nous ne prenons pas en compte "+ this.prestationForm.get('prestation').value[i].sousActe.libelle+ " "+"pour les enfants filles"}); 
        
              } else {
                myForm.patchValue({observation: "Nous ne prenons pas en compte "+ this.prestationForm.get('prestation').value[i].sousActe.libelle+ " "+"pour le genre"+ " " +this.adherentSelected.genre.libelle}); 
        
              }              
              myForm.patchValue({sort: Sort.REJETE}); 
            }
    
          }
      }else {
        console.log("======sousctra=========",this.montantPlafond - this.montantConsomme);
        if((this.montantPlafond - this.montantConsomme) >= 0) {
          if(this.prestationForm.get('prestation').value[i].sousActe.idGenre) {
            if((this.adherentSelected.genre.id === this.prestationForm.get('prestation').value[i].sousActe.idGenre) ||
            (this.adherentSelected.genre.id !== this.prestationForm.get('prestation').value[i].sousActe.idGenre && this.adherentSelected.qualiteAssure.code =="ENFANT")){
              myForm.patchValue({ montantRembourse : 0});
              myForm.patchValue({ montantRestant:  this.prestationForm.get('prestation').value[i].baseRemboursement - this.prestationForm.get('prestation').value[i].montantRembourse})
              if(this.adherentSelected.genre.id !== this.prestationForm.get('prestation').value[i].sousActe.idGenre && this.adherentSelected.qualiteAssure.code =="ENFANT") {
                myForm.patchValue({observation: "Nous ne prenons pas en compte "+ this.prestationForm.get('prestation').value[i].sousActe.libelle+ " "+"pour les enfants filles"}); 
        
              } else {
                myForm.patchValue({observation: "Nous ne prenons pas en compte "+ this.prestationForm.get('prestation').value[i].sousActe.libelle+ " "+"pour le genre"+ " " +this.adherentSelected.genre.libelle}); 
        
              }
              myForm.patchValue({sort: Sort.REJETE}); 
            }
    
          } else {
            myForm.patchValue({ montantRembourse : this.montantPlafond - this.montantConsomme });
          }
         

        } 

      }
     
    }
    console.log(this.montantConsomme, this.montantPlafond);
   


//  if(this.montantConsomme > )
 
    this.prefinancementModel = this.prestationForm.value;
    this.prefinancementModel.dateSaisie = new Date();
    this.prefinancementModel.adherent = this.adherentSelected;
    this.prefinancementList.push(this.prefinancementModel);
    /* executer le controle de la prestation */
    
  /*  this.store.dispatch(featureActionPrefinancement.checkPrefinancement({prefinancement: this.prefinancementList}));
    this.store.pipe(select(prefinancementSelector.selectCheckPrefinancementReponse)).pipe(takeUntil(this.destroy$)).subscribe((value) => {
      console.log(value);
      if (!value) {

      } else {
        this.checkPrefinancementResult = value.slice();
        console.log(this.checkPrefinancementResult);
        for (let j = 0; j < this.checkPrefinancementResult.length; j++){
          myForm = (this.prestationForm.get('prestation') as FormArray).at(j);
          myForm.patchValue({montantRembourse: this.checkPrefinancementResult[j].montantRembourse,
            sort: this.checkPrefinancementResult[j].sort, montantRestant: this.checkPrefinancementResult[j].montantRestant,
            observation: this.checkPrefinancementResult[j].message
          });
          console.log(this.checkPrefinancementResult[j].montantRestant);
          if(!this.checkPrefinancementResult[j].montantRestant) {
            myForm.patchValue({ montantRestant:  this.prestationForm.get('prestation').value[i].baseRemboursement - this.prestationForm.get('prestation').value[i].montantRembourse})
          }
          
        }
        }
    });*/
    if(this.montantConsomme > this.montantPlafond) {
      myForm.patchValue({montantRembourse: 0}); 
      myForm.patchValue({ montantRestant:  this.prestationForm.get('prestation').value[i].baseRemboursement - this.prestationForm.get('prestation').value[i].montantRembourse})
      myForm.patchValue({observation: "Vous avez atteint le plafond"}); 
      myForm.patchValue({sort: Sort.REJETE}); 

    } else {
      if(this.prestationForm.get('prestation').value[i].sousActe.idGenre) {
        if((this.adherentSelected.genre.id === this.prestationForm.get('prestation').value[i].sousActe.idGenre) ||
        (this.adherentSelected.genre.id !== this.prestationForm.get('prestation').value[i].sousActe.idGenre && this.adherentSelected.qualiteAssure.code =="ENFANT")){
          myForm.patchValue({ montantRembourse : 0});
          myForm.patchValue({ montantRestant:  this.prestationForm.get('prestation').value[i].baseRemboursement - this.prestationForm.get('prestation').value[i].montantRembourse})
          if(this.adherentSelected.genre.id !== this.prestationForm.get('prestation').value[i].sousActe.idGenre && this.adherentSelected.qualiteAssure.code =="ENFANT") {
            myForm.patchValue({observation: "Nous ne prenons pas en compte "+ this.prestationForm.get('prestation').value[i].sousActe.libelle+ " "+"pour les enfants filles"}); 
    
          } else {
            myForm.patchValue({observation: "Nous ne prenons pas en compte "+ this.prestationForm.get('prestation').value[i].sousActe.libelle+ " "+"pour le genre"+ " " +this.adherentSelected.genre.libelle}); 
    
          }
          myForm.patchValue({sort: Sort.REJETE}); 
        }

      } else {
        myForm.patchValue({ montantRestant:  this.prestationForm.get('prestation').value[i].baseRemboursement - this.prestationForm.get('prestation').value[i].montantRembourse})
        myForm.patchValue({observation: "Remborsement favorable"}); 
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
    this.bonPriseEnCharge.prestation = [];
    this.bonPriseEnCharge = this.prestationForm.value;
    this.bonPriseEnCharge.adherent = this.adherentSelected;
    this.bonPriseEnCharge.police = this.adherentSelected.groupe.police;
    /*
    const prest: Prestation = {};
    prest.produitPharmaceutique = [];
    for (const prestation of this.prefinancementModel.prestation){
      prest.idMedecin = prestation.medecin.id;
      prest.idSousActe = prestation.sousActe.id;
      prest.codeSousActe = prestation.sousActe.code;
      prest.idTaux = prestation.taux.id;
      prest.montantRembourse = prestation.montantRembourse;
      prest.nombreActe = prestation.nombreActe;
      prest.observation = prestation.observation;
      prest.montantRembourse = prestation.montantRembourse;
      prest.debours = prestation.debours;
      for (const produitPharmaceutique of prestation.produitPharmaceutique) {
        const produit: ProduitPharmaceutique = {};
        produit.idProduitPharmaceutique = produitPharmaceutique.id;
        prest.produitPharmaceutique.push(produit);
      }
      this.bonPriseEnCharge.prestations.push(prest);
    }
    */
    console.log(this.bonPriseEnCharge);
     this.store.dispatch(featureActionBonPriseEnCharge.createBon(this.bonPriseEnCharge));
    this.displayPrestation = false;
   }

   valider(bon: BonPriseEnCharge){
     console.log(bon);
     this.confirmationService.confirm({
      message: 'Etes vous sûre de vouloir valider?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(featureActionBonPriseEnCharge.valideBon(bon));
      },
    });
   }

   inValider(bon: BonPriseEnCharge){
    this.confirmationService.confirm({
      message: 'Etes vous sûre de vouloir valider?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(featureActionBonPriseEnCharge.invalideBon(bon));
      },
    });

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
