import { Component, OnInit, OnDestroy} from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { Secteur } from 'src/app/store/parametrage/secteur/model';
import { Arrondissement } from 'src/app/store/parametrage/arrondissement/model';
import { Observable, of, Subject } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { AppState} from 'src/app/store/app.state';
import { loadGarant } from 'src/app/store/contrat/garant/actions';
import { element } from 'protractor';
import { Banque } from 'src/app/store/parametrage/Banques/model';
import { TauxCommissionIntermediaire } from 'src/app/store/parametrage/taux-commission-intermediaire/model';
import { Compte } from 'src/app/store/comptabilite/compte/model';
import * as appelFondAction from 'src/app/store/comptabilite/appelFond/actions';
import { AppelFond, TypeCompte } from 'src/app/store/comptabilite/appelFond/model';
import { Police, Report } from 'src/app/store/contrat/police/model';
import { TypeReport } from 'src/app/store/contrat/enum/model';
import { AppelFondService } from 'src/app/store/comptabilite/appelFond/service';
import { Recapitulatif } from 'src/app/store/reporting/production/recapitulatif/model';
import * as recapAction from 'src/app/store/reporting/production/recapitulatif/action';
import { RecapitulatifService } from 'src/app/store/reporting/production/recapitulatif/service';
import { loadPoliceByAffaireNouvelle } from 'src/app/store/contrat/police/actions';
import { policeList } from 'src/app/store/contrat/police/selector';
import { Groupe } from 'src/app/store/contrat/groupe/model';
import { loadGroupe } from 'src/app/store/contrat/groupe/actions';
import { groupeList } from 'src/app/store/contrat/groupe/selector';
import { Status } from 'src/app/store/global-config/model';
import {status} from '../../../store/global-config/selector';
import { BreadcrumbService } from 'src/app/app.breadcrumb.service';
import { ConsommationPortail, DepenseFamille, Personne, PrefinancementChart, PrefinancementPortail } from 'src/app/store/portail/recapitulatif/model';
import { PortailService } from 'src/app/store/portail/recapitulatif/service';
import { Prestation } from 'src/app/store/prestation/prefinancement/model';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';


@Component({
  selector: 'app-registerChoose',
  templateUrl: './registerChoose.component.html',
  styleUrls: ['./registerChoose.component.scss']
})
export class RegisterChooseComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();
  cols: any[];
  arrondissementList$: Observable<Array<Arrondissement>>;
  arrondissementList: Array<Arrondissement>;
  displayDialogFormGarant = false;
  garantForm: FormGroup;
  loading: boolean;
  secteurList: Array<Secteur>;
  secteurList$: Observable<Array<Secteur>>;
  banqueList: Array<Banque>;
  banqueList$: Observable<Array<Banque>>;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isEditable = false;
  infosGarant = false;
  etatAppel = false;
  tauxCommissionIntermediaireList: Array<TauxCommissionIntermediaire>;
  tauxCommissionIntermediaireList$: Observable<Array<TauxCommissionIntermediaire>>;
  arrondissement: Arrondissement;
  selectedDataDef: any;
  selectedDataDefList$: Observable<Array<any>>;
  selectedDataDefList: Array<any>;
  compteForm: FormGroup;
  compte: Compte;
  compteList$: Observable<Array<Compte>>;
  compteList: Array<Compte>;
  selectedDataType: any;
  editForm: FormGroup;
  appelFondForm: FormGroup;
  typeCompte = Object.keys(TypeCompte).map(key => ({ label: TypeCompte[key], value: key }));
  appelFond: AppelFond;
  appelFondView: AppelFond;
  appelFondList$: Observable<Array<AppelFond>>;
  appelFondList: Array<AppelFond>;
  report: Report = {};
  dateDebut: Date;
  dateFin: Date;
  appelFondTotal: AppelFond;
  display = false;
  policeList$: Observable<Array<Police>>;
  policeList = [];
  groupeList$: Observable<Array<Groupe>>;
  groupeList: Array<Groupe>;
  statusObject$: Observable<Status>;
  depenseFamilleForm: FormGroup;
  depenseFamille: DepenseFamille;
  depenseFamilles: Array<DepenseFamille>;
  selectedGarants: Array<Recapitulatif>;
  prestationDetail: DepenseFamille;
  displaySinistreDetail= false;
  descTitle = '';
  descType = '';
  name = '';
  role = '';
  consoFamilles: Array<ConsommationPortail>;
  consoFamillesSinistre: Array<ConsommationPortail>;
  consoFamillesSinistreTiersPayant: Array<ConsommationPortail>;
  prefinancementChart : PrefinancementChart;
  consoSinistreFamilles: Array<PrefinancementPortail>;
  basicData: any;
  personnes: string[] = [];
  montantTotalReclameFamille: number;
  montantTotalRembourseFamille: number;
  montantSinistreTiersPayantTotalReclameFamille: number;
  montantSinistreTiersPayantTotalRembourseFamille: number;
  consoSinistreTiersPayantFamilles: Array<Prestation>;
  data1:  any[] = [];

  groupePolicy: Array<Groupe>;



  recapitulatif: Recapitulatif;
  recapitulatifs: Array<Recapitulatif>;


  constructor(private formBuilder: FormBuilder,
              private store: Store<AppState>, 
              private messageService: MessageService,
              private confirmationService: ConfirmationService, 
              private breadcrumbService: BreadcrumbService,
              private appelFondService: AppelFondService, 
              private recaptulatifService: RecapitulatifService,
              private portailService: PortailService,
              private router: Router,
              private keycloak: KeycloakService) {

      this.depenseFamilleForm = this.formBuilder.group({
        dateFin: new FormControl('', [Validators.required]),
        dateDebut: new FormControl('', [Validators.required]),
        adherentId: new FormControl()
    });

      this.breadcrumbService.setItems([
        {label: ''}
    ]);
    console.log('les roles du user est'+this.keycloak.getUserRoles());
      this.keycloak.loadUserProfile().then(profile => {
        console.log("===========profile===========>", profile['attributes'].role);
        this.name = profile.firstName + ' ' + profile.lastName;
        if (profile['attributes'].role.length != 0){
        this.role = profile['attributes'].role[0]; //gives you array of all attributes of user, extract what you need
        }
        console.log("oooooooooooothis.keycloak.getToken 12", this.keycloak.getToken());
        this.portailService.fetchDepenseSinistreAndFamille$(this.depenseFamille).subscribe(
          (res) => {
              console.log('..............consoSinistreFamilles222222..............   ', res);
              this.consoSinistreFamilles = res;
              this.personnes = [];
              this.consoSinistreFamilles.forEach(value =>{
                this.personnes.push(value.adherent.prenom)
              });

              
              /* this.consoSinistreFamilles.forEach(value =>{
                this.personnes.push(value.adherent.prenom)
              });
              indicat.scores.forEach(score => {
                if (score.score) {
                  indicaScore.push(this.truncateNumber(score.score));
                } else {
                  indicaScore.push(score.score);
                }
              }); */
              console.log('....this.personnes..............   ', this.personnes);
              if(res){
                
              }
            }
      );

      this.portailService.fetchDepenseSinistreAndFamille$(this.depenseFamille).subscribe(
        (res) => {
            console.log('..............consoSinistreFamilles222222..............   ', res);
            this.consoSinistreFamilles = res;
            if(res){
              this.montantTotalReclameFamille = 0;
              this.montantTotalRembourseFamille = 0;
              for(let i = 0; i < this.consoSinistreFamilles.length; i++) {
                this.montantTotalReclameFamille = this.montantTotalReclameFamille + this.consoSinistreFamilles[i].montantReclame;
                this.montantTotalRembourseFamille = this.montantTotalRembourseFamille + this.consoSinistreFamilles[i].montantRembourse;
              }
              this.data1.push(this.montantTotalReclameFamille);
              console.log('..............this.montantTotalReclameFamille..............   ', this.truncateNumber(this.montantTotalReclameFamille));
              console.log('..............this.montantTotalRembourseFamille..............   ', this.truncateNumber(this.montantTotalRembourseFamille));
            }
          }
    );
    
    this.portailService.fetchDepenseSinistreTiersPayantAndFamille$(this.depenseFamille).subscribe(
      (res) => {
          console.log('..............consoSinistreTiersPayantFamilles55555555555..............   ', res);
          this.consoSinistreTiersPayantFamilles = res;
          if(res){
            this.montantSinistreTiersPayantTotalReclameFamille = 0;
            this.montantSinistreTiersPayantTotalRembourseFamille = 0;
            for(let i = 0; i < this.consoSinistreTiersPayantFamilles.length; i++) {
              this.montantSinistreTiersPayantTotalReclameFamille = this.montantSinistreTiersPayantTotalReclameFamille + this.consoSinistreTiersPayantFamilles[i].baseRemboursement;
              this.montantSinistreTiersPayantTotalRembourseFamille = this.montantSinistreTiersPayantTotalRembourseFamille + this.consoSinistreTiersPayantFamilles[i].montantRembourse;
            }
            this.data1.push(this.montantSinistreTiersPayantTotalReclameFamille);
            console.log('ffffffffff', this.data1);
          }
        }
  );

  this.basicData = {
    labels: ['Préfinancement', 'Tiers-Payant'],
    datasets: [
        {
            label: 'Montant Réclamé',
            backgroundColor: '#42A5F5',
            data: [this.data1]
        },
        {
            label: 'Montant Remboursé',
            backgroundColor: '#FFA726',
            data: [this.montantTotalRembourseFamille, this.montantSinistreTiersPayantTotalRembourseFamille]
        }
    ]
};

    
      })
    }

ngOnInit(): void {
  this.loadData();
  this.compteList = [];
  // this.loading = true;


    this.policeList$ = this.store.pipe(select(policeList));
    this.store.dispatch(loadPoliceByAffaireNouvelle());
    this.policeList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.loading = false;
        this.policeList = value.slice();
        console.log('................this.policeList............................');
        console.log(this.policeList);
      }
    });
  
    
    

  this.statusObject$ = this.store.pipe(select(status));
  this.checkStatus();

}

truncateNumber(a: number) {
  return Math.floor(a * 1000) / 1000;
}

loadGroupeList() {
  this.groupeList$ = this.store.pipe(select(groupeList));
    this.store.dispatch(loadGroupe({policeId: this.appelFondForm.get('police').value?.id}));
    this.groupeList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.groupeList = value.slice();
        console.log("-------------->",this.groupeList);
      }
    });

}



checkStatus() {
  this.statusObject$.pipe(takeUntil(this.destroy$))
      .subscribe(statusObj => {
        if (statusObj) {
          this.showToast(statusObj.status, 'INFORMATION', statusObj.message);
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
  this.compte = {};
  this.displayDialogFormGarant = true;
  // this.garantForm.get('pays').setValue(this.paysList?.find(pay=>pay.code ==="BUR"));
}

voirDetail(appelFond: AppelFond) {
  console.log('==================>', appelFond);
  this.infosGarant = true;
  this.appelFondView = appelFond;
}

voirDetailEtatAppel() {
  this.etatAppel = true;
}



editGarant(appelFond: AppelFond) {
  console.log('nnnnnnnnnnnnnnnnnnnnnnnnnnnn>>>>', appelFond);
// this.appelFond = {...appelFond};
this.appelFondForm.patchValue(appelFond);
this.appelFondForm.get('garant').setValue(appelFond?.garant?.nom);
console.log('========55555555555==========>', this.appelFondForm.get('garant').value);
this.displayDialogFormGarant = true;
}

/* deleteGarant(garant: Garant) {
  this.confirmationService.confirm({
    message: 'Etes vous sur de vouloir supprimer?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
        this.store.dispatch(featureAction.deleteGarant(garant));
    }
});
} */

/* onCreate() {
this.appelFond = this.appelFondForm.value;
console.log('nnnnnnnnnnnnnnnnnnnnnnnnnnnn', this.appelFond);
this.confirmationService.confirm({
  message: 'Etes vous sur de vouloir ajouter cet appel de fond ?',
  header: 'Confirmation',
  icon: 'pi pi-exclamation-triangle',
  accept: () => {
    if (this.appelFond.id) {
      console.log('1', this.appelFond);
      this.store.dispatch(appelFondAction.updateAppelFond(this.appelFondForm.value));
      this.displayDialogFormGarant = false;
    }else{
      console.log('2', this.appelFond);
    this.store.dispatch(appelFondAction.createAppelFond(this.appelFondForm.value));
    }
    this.appelFondForm.reset();
    this.displayDialogFormGarant = false;
  }
});


} */

deleteAppelFond(appel: AppelFond) {
  this.confirmationService.confirm({
    message: 'Etes vous sur de vouloir supprimer cet appel de fond ?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      if (appel.id) {
        console.log('2', appel);
        this.store.dispatch(appelFondAction.deleteAppelFond(appel));
        // this.displayDialogFormGarant = false;
      } 
    }
  });
}

annulerSaisie() {
  this.appelFondForm.reset();
  this.displayDialogFormGarant = false;
}

/* deleteSelectedGrant() {
  this.listeGarant.garantDtoList = this.selectedGarants;
  this.confirmationService.confirm({
    message: 'Etes vous sur de vouloir supprimer ces garants?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.store.dispatch(featureAction.deleteGarants(this.listeGarant));
    }
  });
} */

ngOnDestroy() {
  this.destroy$.next(true);
  // Now let's also unsubscribe from the subject itself:
  this.destroy$.unsubscribe();
}


imprimerAppelFond(appelFondPrint: AppelFond) {
  console.log('appelFondPrint=============>', appelFondPrint);
  this.report.typeReporting = TypeReport.APPEL_FOND;
  this.report.appelFond = appelFondPrint;
  console.log('this.report', this.report);
  this.store.dispatch(appelFondAction.FetchReportAppelFond(this.report));
}

onCreate() {
  this.recapitulatif = {};
  console.log('===========================================>', this.appelFondForm.get('idGarant').value);
  this.recapitulatif.idGarant = this.appelFondForm.get('idGarant').value;

  this.recapitulatif.datePrime = this.appelFondForm.get('datePrime').value;
  console.log('===========================================>', this.recapitulatif);
  this.recaptulatifService.fetchRecap$(this.recapitulatif).subscribe((res) => {
    this.recapitulatifs = res;
    console.log("this.recapitulatifs", res);
  });
}

imprimerFormulaire() {
  this.display = true;
}

onPoliceChange() {
  if(this.appelFondForm.get('police').value?.id) {
    this.groupeList$ = this.store.pipe(select(groupeList));
    this.store.dispatch(loadGroupe({policeId: this.appelFondForm.get('police').value?.id}));
    this.groupeList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.groupePolicy = value.slice();
        console.log(this.groupePolicy);
      }
    });
  }
}

imprimerRecap() {
  //console.log('recap=============>', recap);
  this.recapitulatif = {};
  this.recapitulatif.idGarant = this.appelFondForm.get('idGarant').value;
  this.recapitulatif.datePrime = this.appelFondForm.get('datePrime').value;
  this.recapitulatif.dateDebut = this.appelFondForm.get('dateDebut').value;
  this.recapitulatif.policeId = this.appelFondForm.get('police').value?.id;
  this.recapitulatif.groupeId = this.appelFondForm.get('groupe').value?.id;
  this.recapitulatif.garantId = this.appelFondForm.get('idGarant').value?.id;
  this.report.typeReporting = TypeReport.RECAPITULATIF_POLICE;
  this.report.recapitulatif = this.recapitulatif;
  console.log('this.recapitulatif=============>', this.recapitulatif);
  console.log('this.report', this.report);
  this.store.dispatch(recapAction.FetchReportRecapitulatif(this.report));
}
loadData() {
  this.depenseFamille = {};
  this.depenseFamille.adherentId = 5;
  this.depenseFamille.dateDebut = this.depenseFamilleForm.get('dateDebut').value;
  this.depenseFamille.dateFin = this.depenseFamilleForm.get('dateFin').value;
  console.log('this.depenseFamille=============>', this.depenseFamille);
  this.portailService.fetchDepenseFamille$(this.depenseFamille).subscribe(
    (res) => {
        console.log('..............RES..............   ', res);
        this.depenseFamilles = res;
    }
);
}

 voirPrestationDetail(prestation: DepenseFamille) {
  console.log('this.depenseFamille recuperer=============>', prestation);
  console.log('prestation recuperer=============>', prestation.prestationList);
  this.prestationDetail = prestation;
  this.displaySinistreDetail = true;
}


getDecrption(title, type) {
  this.descTitle = title;
  this.descType = type;
}
resetvalue() {
  this.descTitle = '';
  this.descType = '';
}

register2(){
  this.router.navigate(['/portail/register']);
}
/* grapgOfByIndicateur(conso: ConsommationPortail): any {
  let myData: any;
  let consoFamille: ConsommationPortail = conso;
  if (conso !== null) {
    consoFamille = conso;
  }
  this.selectIndicate = indicat;
  if (indicat !== null) {
    const indicaScore: any[] = [];

    indicat.scores.forEach(score => {
      if (score.score) {
        indicaScore.push(this.truncateNumber(score.score));
      } else {
        indicaScore.push(score.score);
      }
    });
    myData = {
      labels: this.annees,
      datasets: [
        {
          label: '',
          data: indicaScore,
          fill: false,
          borderColor: '#4bc0c0',
          backgroundColor: '#9CCC65'
        }
      ]
    };
  }
  return myData;
} */

}


