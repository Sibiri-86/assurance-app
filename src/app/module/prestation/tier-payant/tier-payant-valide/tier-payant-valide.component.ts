import { Component, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import {
  ControlContainer,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { loadSousActe } from '../../../../store/parametrage/sous-acte/actions';
import * as sousActeSelector from '../../../../store/parametrage/sous-acte/selector';
import { elementAt, takeUntil } from 'rxjs/operators';
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
import { Prefinancement, Prestation } from 'src/app/store/prestation/prefinancement/model';
import { Status } from 'src/app/store/global-config/model';
import { status } from '../../../../store/global-config/selector';
import { TypeEtatSinistre } from '../../../common/models/enum.etat.sinistre';
import { TypeReport } from 'src/app/store/contrat/enum/model';
import { Report } from 'src/app/store/contrat/police/model';
import { printPdfFile } from 'src/app/module/util/common-util';
import {SinistreTierPayant} from '../../../../store/prestation/tierPayant/model';
import * as tierPayantSelector from '../../../../store/prestation/tierPayant/selector';
import * as featureActionTierPayant from '../../../../store/prestation/tierPayant/action';
import {BreadcrumbService} from '../../../../app.breadcrumb.service';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';


@Component({
  selector: 'app-tier-payant-valide',
  templateUrl: './tier-payant-valide.component.html',
  styleUrls: ['./tier-payant-valide.component.scss']
})
export class TierPayantValideComponent implements OnInit {
  displayFormPrefinancement = false;
  prestationList: Array<FraisReels>;
  sousActeList$: Observable<Array<SousActe>>;
  sousActeList: Array<SousActe>;
  destroy$ = new Subject<boolean>();
  tauxList$: Observable<Array<Taux>>;
  tauxList: Array<Taux>;
  typeSort = Object.keys(Sort).map(key => ({ label: Sort[key], value: key }));
  prestationForm: FormGroup;
  acteList$: Observable<Array<Acte>>;
  acteList: Array<Acte>;
  prestataireList$: Observable<Array<Prestataire>>;
  prestataireList: Array<Prestataire>;
  medecinList$: Observable<Array<Medecin>>;
  medecinList: Array<Medecin>;
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
  cols: any[];
  taux: Taux;
  displayPrestation = false;
  prestationListPrefinancement: Array<Prestation>;
  selectTierPayant: SinistreTierPayant[];
  report: Report = {};
  sinistreTierPayantDTOList: Array<SinistreTierPayant>;
  sinistreTierPayantDTOList$: Observable<Array<SinistreTierPayant>>;
  disableButtomOrdreReglement = true;
  tab: Array<string> = [];
  isDetail: boolean;
  editForm: FormGroup;
  nom = '';
  prenom = '';
  operateur = '';
  role = '';



  constructor( private store: Store<AppState>,   private formBuilder: FormBuilder,
               private router: Router,
               private confirmationService: ConfirmationService,  private messageService: MessageService,
               private breadcrumbService: BreadcrumbService,private keycloak: KeycloakService,) {
    this.breadcrumbService.setItems([{ label: 'TIERS PAYANT | SINISTRE VALIDE' }]);
  }

  imprimer(pref: SinistreTierPayant) {
    this.report.typeReporting = TypeReport.TIERPAYANT_FICHE_DETAIL_REMBOURSEMENT;
    this.report.sinistreTierPayantDTO = pref;
    this.store.dispatch(featureActionTierPayant.FetchReportTierPayant(this.report));
  }

   onCreate() {
   }

  ngOnInit(): void {
    this.keycloak.loadUserProfile().then(profile => {
      //console.log("===========profile===========>", profile['attributes'].role);
      this.nom = profile.lastName;
      this.prenom = profile.firstName;
      this.operateur = profile.username;
      console.log("===========profile nom===========>", profile.lastName);
      console.log("===========profile prenom===========>", profile.firstName);
      console.log("===========profile operateur===========>", profile.username);

      if (profile['attributes'].role){
      this.role = profile['attributes'].role[0]; //gives you array of all attributes of user, extract what you need
      }
    });
    this.prestationList = [];
    this.prestationForm = this.formBuilder.group({
      // domaine: new FormControl({}),
      id: new FormControl(''),
      referenceSinistreGarant: new FormControl(''),
      referenceBordereau: new FormControl(''),
      dateSoins: new FormControl(''),
      dateDeclaration: new FormControl(''),
      matriculeAdherent: new FormControl(''),
      garantie: new FormControl(''),
      acte: new FormControl(''),
      nomAdherent: new FormControl(''),
      prestataire: new FormControl(''),
      prenomAdherent: new FormControl(''),
      medecin: new FormControl(''),
      numeroGroupe: new FormControl(''),
      numeroPolice: new FormControl('')
    });

    this.adherentSelected$ = this.store.pipe(select(adherentSelector.selectedAdherent));
    this.store.dispatch(featureActionAdherent.searchAdherent({numero: null}));
    this.adherentSelected$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      console.log(value);
      if (value) {
        console.log(value);
        this.adherentSelected = value;
        this.prestationForm.get('nomAdherent').setValue(this.adherentSelected.nom);
        this.prestationForm.get('prenomAdherent').setValue(this.adherentSelected.prenom);
        this.prestationForm.get('numeroGroupe').setValue(this.adherentSelected.groupe.numeroGroupe);
        this.prestationForm.get('numeroPolice').setValue(this.adherentSelected.groupe.police.numero);
      }
    });

    this.store.dispatch(featureActionTierPayant.setReportTierPayant(null));
    this.store.pipe(select(tierPayantSelector.selectByteFile)).pipe(takeUntil(this.destroy$))
        .subscribe(bytes => {
          if (bytes) {
            printPdfFile(bytes);
          }
        });

    this.sinistreTierPayantDTOList$ = this.store.pipe(select(tierPayantSelector.tierPayantList));
    this.store.dispatch(featureActionTierPayant.loadTierPayantValide());
    this.sinistreTierPayantDTOList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      console.log(value);
      if (value) {
        this.sinistreTierPayantDTOList = value.slice();
        // this.prefinancementDtoList = this.prefinancementDtoList.filter(element => !element.ordreReglement);
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

    this.tauxList$ = this.store.pipe(select(tauxSelector.tauxList));
    this.store.dispatch(loadTaux());
    this.tauxList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.tauxList = value.slice();
        if (this.tauxList){
        this.taux = this.tauxList[0];
        }
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


  annulerPrestation(pref: SinistreTierPayant) {
    this.confirmationService.confirm({
      message: 'voulez-vous dé-valider le sinistre',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(featureActionTierPayant.updateEtatAnnulerTierPayant({tierPayant: pref,
          etat: TypeEtatSinistre.DEVALIDE}));
      },
    });
  }

  creerOrdreRglement() {
    if (!this.selectTierPayant || !this.selectTierPayant.length) {
      this.showToast('error', 'INFORMATION', 'Veuillez selectionner au moins un sinistre');
    } else {

      this.confirmationService.confirm({
        message: 'voulez-vous creer l\'ordre de paiement',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.store.dispatch(featureActionTierPayant.createTierPayantOrdreReglement({tierPayant: this.selectTierPayant}));
          this.selectTierPayant = [];
        },
      });
    }
  

  }

  voirPrestation(pref: SinistreTierPayant){
    this.displayPrestation = true;
    this.prestationListPrefinancement = pref.prestation;
  }

  /* this.report.sinistreTierPayantDTO = this.prefinancementDetail;
  this.report.sinistreTierPayantDTO.prestation = [];
  this.report.sinistreTierPayantDTO.prestation.push(prestation);
  this.report.typeReporting = TypeReport.TIERPAYANT_FICHE_DETAIL_REMBOURSEMENT; */

  imprimerPrestation(prestation: Prestation) {
    this.report.sinistreTierPayantDTO.prestation = [];
    this.report.sinistreTierPayantDTO.prestation.push(prestation);
    this.report.typeReporting = TypeReport.TIERPAYANT_FICHE_DETAIL_REMBOURSEMENT;
    this.report.sinistreTierPayantDTO = prestation.sinistreTierPayant;
    
    this.store.dispatch(featureActionTierPayant.FetchReportTierPayant(this.report));
  }

  calculCoutDebours(data: FraisReels, ri: number){
    console.log(this.prestationList);
    console.log(data);
    this.prestationList[ri].debours = data.coutUnitaire * Number(data.nombreActe);
    this.prestationList[ri].baseRemboursement =   this.prestationList[ri].debours;
    this.prestationList[ri].montantRembourse = this.prestationList[ri].baseRemboursement * (this.prestationList[ri].taux.taux / 100);
  }
  rechercherAdherent(event){
    console.log(event.target.value);
    this.prestationForm.get('nomAdherent').setValue('');
    this.prestationForm.get('prenomAdherent').setValue('');
    this.prestationForm.get('numeroGroupe').setValue('');
    this.prestationForm.get('numeroPolice').setValue('');
    this.adherentSelected = null;
    this.store.dispatch(featureActionAdherent.searchAdherent({numero: event.target.value}));
  }

  // valider prefinancement
  validerPrefinancement() {
    console.log(this.prefinancementList);
    this.store.dispatch(featureActionPrefinancement.createPrefinancement({prefinancement: this.prefinancementList, dateD: formatDate(new Date(), 'dd/MM/yyyy', 'en-fr'),
    dateF: formatDate(new Date(), 'dd/MM/yyyy', 'en-fr'), nom: this.nom, prenom: this.prenom, operateur: this.operateur}));
  }

  // permet d'enregistrer une prestation par famille


  changeGarantie(garantie) {
    console.log(garantie);
    this.acteListFilter = this.acteList.filter(element => element.idTypeGarantie === garantie.value.id);
  }

  newRowPrestation() {
    return {taux: this.taux};
  }
  navigateSinistre() {
    this.router.navigateByUrl('/prestation/tierPayant/ordre-reglement');
  }

  navigateSinistre2() {
    this.router.navigateByUrl('/prestation/tierPayant');
  }
  addPrefinancement(){
    this.displayFormPrefinancement = true;
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

  onRowSelectSinistre(event) {
    if (this.selectTierPayant && this.selectTierPayant.length > 1 && event.data.prestataire.id &&
        !this.selectTierPayant[this.selectTierPayant.length - 2].prestataire.id &&
        this.selectTierPayant[this.selectTierPayant.length - 2].prestataire.id !== event.data.prestataire.id){
      this.disableButtomOrdreReglement = false;
      this.tab.push(event.data.id);
      this.showToast('error', 'INFORMATION', 'les factures n\'appartiennent pas au même prestatiare ');
    }

    if (this.selectTierPayant && this.selectTierPayant.length > 1 && !event.data.prestataire &&
        this.selectTierPayant[this.selectTierPayant.length - 2].prestataire.id &&
        this.selectTierPayant[this.selectTierPayant.length - 2].prestataire.id !== event.data.prestataire.id){
      this.disableButtomOrdreReglement = false;
      this.tab.push(event.data.id);
      this.showToast('error', 'INFORMATION', 'les factures n\'appartiennent pas au même prestatiare');
    }

    if (this.selectTierPayant && this.selectTierPayant.length > 1 && !event.data.prestataire &&
        !this.selectTierPayant[this.selectTierPayant.length - 2].prestataire &&
        event.data.prestataire.id !== this.selectTierPayant[this.selectTierPayant.length - 2].prestataire.id){
      this.disableButtomOrdreReglement = false;
      this.tab.push(event.data.id);
      this.showToast('error', 'INFORMATION', 'les factures n\'appartiennent pas au même prestatiare');
    }

    console.log(this.selectTierPayant);
  }

  onRowUnselectSinistre(event){
    console.log(this.tab);
    let check = true;
    for (const f of this.tab){
      if (!this.selectTierPayant.every(elem => elem.id !== f)){
        check = false;
        return;
      }
    }
    if (check) {
      this.disableButtomOrdreReglement = true;
    }
  }

}


export interface FraisReels {
  nombreActe?: string;
  coutUnitaire?: number;
  debours?: number;
  sousActe?: SousActe;
  cle?: number;
  baseRemboursement?: number;
  taux?: Taux;
  montantRembourse?: number;
  sort?: Sort;
  observation?: string;
}
