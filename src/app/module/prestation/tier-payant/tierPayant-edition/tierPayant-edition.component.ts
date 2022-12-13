import {Component, OnInit} from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {
    ControlContainer, FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {AppState} from 'src/app/store/app.state';
import {loadSousActe} from '../../../../store/parametrage/sous-acte/actions';
import * as sousActeSelector from '../../../../store/parametrage/sous-acte/selector';
import {takeUntil} from 'rxjs/operators';
import {SousActe} from 'src/app/store/parametrage/sous-acte/model';
import {Taux} from '../../../../store/parametrage/taux/model';
import {loadTaux} from '../../../../store/parametrage/taux/actions';
import * as tauxSelector from '../../../../store/parametrage/taux/selector';
import {Sort} from '../../../common/models/sort.enum';
import {loadGarantie} from '../../../../store/parametrage/garantie/actions';
import * as garantieSelector from '../../../../store/parametrage/garantie/selector';
import * as plafondSelector from '../../../../store/contrat/plafond/selector';

import {loadPrestataire} from '../../../../store/parametrage/prestataire/actions';
import * as prestataireSelector from '../../../../store/parametrage/prestataire/selector';

import * as tierPayantSelector from '../../../../store/prestation/tierPayant/selector';

import * as tierPayantActions from '../../../../store/prestation/tierPayant/action';

import {loadMedecin} from '../../../../store/parametrage/medecin/actions';
import * as medecinSelector from '../../../../store/parametrage/medecin/selector';
import {medecinList} from '../../../../store/parametrage/medecin/selector';

import {loadActe} from '../../../../store/parametrage/acte/actions';
import * as acteSelector from '../../../../store/parametrage/acte/selector';

import {Acte} from 'src/app/store/parametrage/acte/model';
import {Garantie} from 'src/app/store/parametrage/garantie/model';
import {element} from 'protractor';
import {Prestataire} from 'src/app/store/parametrage/prestataire/model';
import {Medecin} from 'src/app/store/parametrage/medecin/model';
import {ConfirmationService, MenuItem, MessageService, SelectItem} from 'primeng/api';
import {Adherent} from 'src/app/store/contrat/adherent/model';
import * as featureActionAdherent from '../../../../store/contrat/adherent/actions';
import * as featureActionTierPayant from '../../../../store/prestation/tierPayant/action';
import * as featureActionPlafond from '../../../../store/contrat/plafond/action';
import * as adherentSelector from '../../../../store/contrat/adherent/selector';
import {CheckTierPayantResult, Prestation} from 'src/app/store/prestation/tierPayant/model';
import {Status, StatusEnum} from 'src/app/store/global-config/model';
import {status} from '../../../../store/global-config/selector';
import {TypeEtatSinistre} from '../../../common/models/enum.etat.sinistre';
import {printPdfFile} from 'src/app/module/util/common-util';
import {TypeReport} from 'src/app/store/contrat/enum/model';
import {Report} from 'src/app/store/contrat/police/model';
import {SinistreTierPayant} from '../../../../store/prestation/tierPayant/model';
import {Pathologie} from '../../../../store/parametrage/pathologie/model';
import * as pathologieSelector from '../../../../store/parametrage/pathologie/selector';
import {loadPathologie} from '../../../../store/parametrage/pathologie/actions';
import {ProduitPharmaceutique} from '../../../../store/parametrage/produit-pharmaceutique/model';
import * as produitPharmaceutiqueSelector from '../../../../store/parametrage/produit-pharmaceutique/selector';
import {loadProduitPharmaceutique} from '../../../../store/parametrage/produit-pharmaceutique/actions';
import {PlafondActe, PlafondFamilleActe, PlafondSousActe} from '../../../../store/parametrage/plafond/model';
import {BonPriseEnCharge, CheckPlafond} from '../../../../store/prestation/prefinancement/model';
import {BreadcrumbService} from '../../../../app.breadcrumb.service';
import * as featureActionBonPriseEnCharge from '../../../../store/medical/bon-prise-en-charge/actions';
import * as selectorsBonPriseEnCharge from '../../../../store/medical/bon-prise-en-charge/selector';
import { TypeBon } from 'src/app/module/medical/enumeration/bon.enum';
import { HistoriqueAvenantService } from 'src/app/store/contrat/historiqueAvenant/service';
import * as featureActionPrefinancement from '../../../../store/prestation/prefinancement/action';
import * as prefinancementSelector from '../../../../store/prestation/prefinancement/selector';
import { Exercice } from 'src/app/store/contrat/exercice/model';
import * as exerciceSelector from 'src/app/store/contrat/exercice/selector';
import * as featureExerciceAction from 'src/app/store/contrat/exercice/actions';
import { Event } from '@angular/router';
import { TierPayantService } from 'src/app/store/prestation/tierPayant/service';
import { GlobalConfig } from 'src/app/config/global.config';
import { ConventionService } from 'src/app/store/medical/convention/service';
import { PrefinancementService } from 'src/app/store/prestation/prefinancement/service';



@Component({
    // tslint:disable-next-line:component-selector
    selector: 'app-tierPayant',
    templateUrl: './tierPayant-edition.component.html',
    styleUrls: ['./tierPayant-edition.component.scss']
})
export class TierPayantEditionComponent implements OnInit {
    displayFormPrefinancement: boolean;
    isModif: boolean;
    prestationList: Array<FraisReels>;
    sousActeList$: Observable<Array<SousActe>>;
    sousActeList: Array<SousActe>;
    destroy$ = new Subject<boolean>();
    tauxList$: Observable<Array<Taux>>;
    tauxList: Array<Taux>;
    typeSort = Object.keys(Sort).map(key => ({label: Sort[key], value: key}));
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
    adherentSelect: Adherent;
    prestataireSelected: Prestataire = {};
    adherentSelected$: Observable<Adherent>;
    adherentNomSelected$: Observable<Array<Adherent>>;
    adherentNomSelected: Array<Adherent>;
    medecinListFilter: Array<SelectItem>;
    tierPayantList: Array<SinistreTierPayant> = [];
    prefinancementDetail: SinistreTierPayant = {};
    prefinancementModel: SinistreTierPayant = {};
    statusObject$: Observable<Status>;
    sinistreTierPayantDTOList$: Observable<Array<SinistreTierPayant>>;
    sinistreTierPayantDTOList: Array<SinistreTierPayant>;
    cols: any[];
    taux: Taux;
    displayPrestation = false;
    prestationListPrefinancement: Array<Prestation>;
    report: Report = {};
    sousActeListFilter: Array<SousActe>;
    pathologieList: Array<Pathologie>;
    pathologieList$: Observable<Array<Pathologie>>;
    produitPharmaceutiqueList$: Observable<Array<ProduitPharmaceutique>>;
    produitPharmaceutiqueList: Array<ProduitPharmaceutique>;
    TierPayantSelected: SinistreTierPayant[];
    prestationListPrefinancementFilter: Array<Prestation>;
    familleActeEnCours$: Observable<PlafondFamilleActe[]>;
    familleActeEnCours: Array<PlafondFamilleActe>;
    familleActeEnCour: PlafondFamilleActe;
    acteEnCours$: Observable<PlafondActe[]>;
    acteEnCours: Array<PlafondActe>;
    sousActeEnCours$: Observable<PlafondSousActe[]>;
    sousActeEnCours: Array<PlafondSousActe>;
    checkControl = true;
    tab: number[] = [];
    checkTierPayantResult: Array<CheckTierPayantResult>;
    isDetail: boolean;
    editForm: FormGroup;
    typeAction: MenuItem[] = [];
    adherentList: Array<Adherent>;
    adherentList$: Observable<Array<Adherent>>;
    tierPaysList$: Observable<SinistreTierPayant>;
    bonPriseEnChargeList$: Observable<Array<BonPriseEnCharge>>;
    bonPriseEnChargeList: Array<BonPriseEnCharge>;
    exerciceList$: Observable<Array<Exercice>>;
    exerciceList: Array<Exercice>;
    plafondSousActe: CheckPlafond;
    exerciceSelected: Exercice = {};
    prestationsList: Prestation[]= [];
    prestationDetail:Prestation = {};
    prestationAdd: Prestation = {};
    displayPrestationpop = false;
    compteur: number = null;
    baseAnterieur: number = null;
    prefinancement: SinistreTierPayant = {};
    i: number = 0;
    displayFormPrefinancementDetail = false;
    displaySinistreDetail = false;
    montantPlafond: number = null; 
    montantConvention: number = 0;
    montantConsomme: number = 0;
    montantPlafond1: number = 0;
    displayAdherent = false;
    private successMsg = 'Les 10 dernières prestation sont enregistrées avec succès !';
    private montantRemboursessMsg = 'Le montant remboursé est : ';
    displayFP = false;



    constructor(private store: Store<AppState>,
                private confirmationService: ConfirmationService,
                private tierPayantService: TierPayantService,
                private prefinancementService: PrefinancementService,
                private conventionService: ConventionService,
                private formBuilder: FormBuilder, private messageService: MessageService,
                private breadcrumbService: BreadcrumbService, private historiqueAvenantService: HistoriqueAvenantService) {
        this.breadcrumbService.setItems([{ label: 'TIERS PAYANT | SINISTRE EDITION' }]);
    }

    onCreate() {
        
        
        
    
        this.prefinancement.dateSaisie = new Date();
      this.prefinancement.prestation = this.prestationsList;
      console.log(this.prefinancement);
           this.store.dispatch(featureActionTierPayant.createTierPayantNoList({tierPayant:  this.prefinancement}));
        
        // tslint:disable-next-line:max-line-length 
        // console.log('*******this.prefinancementModel*******', this.prefinancementModel);
        // this.prefinancementModel.prestation = this.prestationForm.get('itemsPrestation').value;
        console.log(this.prefinancementModel);
        this.tierPayantList = [];
        this.prestationsList = [];
        this.prestationForm.reset();
        this.prefinancement = {};
        this.displayFormPrefinancement = false;
    }

    addPrestation1() {
        this.prefinancementModel.prestation = this.prestationsList;
        this.prefinancementModel.dateDeclaration = this.prestationForm.get('dateDeclaration').value;
        this.prefinancementModel.dateSoins = this.prestationForm.get('dateSoins').value;
        this.prefinancementModel.referenceBordereau = this.prestationForm.get('referenceBordereau').value;
        this.prefinancementModel.adherent = this.adherentSelected;
        this.tierPayantList.push(this.prefinancementModel);
        this.prestationList = [];
        this.prestationForm.reset();
    }

   /* loadAllAherents(exercice: string) {
        this.adherentList$ = this.store.pipe(select(adherentSelector.adherentList));
        this.store.dispatch(featureActionAdherent.findAdherents({exercice}));
        this.adherentList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
            if(value) {
                this.adherentList = value.slice();
            }

        })

    }*/


    findMontantConsomme(){
        this.tierPayantService.$findMontantConsomme(this.adherentSelected.id, this.prestationAdd.sousActe.id).subscribe(rest=>{

            this.montantConsomme = rest;
           
        });
    }

    findMontantPlafond(){
        this.tierPayantService.$findMontantPlafond(this.adherentSelected.id, this.prestationAdd.acte.id).subscribe(rest=>{

            this.montantPlafond1 = rest;
           
        });
    }


    ngOnInit(): void {

        // this.prestationList = [];
        this.prestationForm = this.formBuilder.group({
            // domaine: new FormControl({}),
            id: new FormControl(),
            /* referenceSinistreGarant: new FormControl(),
            referenceBordereau: new FormControl(),*/
            dateSaisie: new FormControl({value: '', disabled: true}),
            /* garantie: new FormControl(''),
            acte: new FormControl(''),*/
            nomAdherent: new FormControl({value: '', disabled: true}),
            prenomAdherent: new FormControl({value: '', disabled: true}),
            nomAssurePrin: new FormControl({value: '', disabled: true}),
            prenomAssurePrin: new FormControl({value: '', disabled: true}),
            numeroGroupe: new FormControl({value: '', disabled: true}),
            numeroPolice: new FormControl({value: '', disabled: true}),
            prestation: this.formBuilder.array([], Validators.required),
            nomGroupeAdherent: new FormControl({value: '', disabled: true}),
            nomPoliceAdherent: new FormControl({value: '', disabled: true}),
            dateFacture: new FormControl('', Validators.required),
            prestataire: new FormControl('', Validators.required),
            numeroFacture: new FormControl('', Validators.required),
            matriculeAdherent: new FormControl(),
            dateDeclaration: new FormControl('', Validators.required),
            montantReclame: new FormControl('', Validators.required),
            bonPriseEnCharge: new FormControl(),
            montantPaye: new FormControl(),
            montantRestant: new FormControl()
        });

       
        this.prestationForm.get('dateSaisie').setValue(new Date());
        this.store.dispatch(featureActionTierPayant.setReportTierPayant(null));
        this.store.pipe(select(tierPayantSelector.selectByteFile)).pipe(takeUntil(this.destroy$))
            .subscribe(bytes => {
                if (bytes) {
                    printPdfFile(bytes);
                }
            });
            


        this.adherentSelected$ = this.store.pipe(select(adherentSelector.selectedAdherent));
        this.store.dispatch(featureActionAdherent.searchAdherent({numero: 0}));
        this.adherentSelected$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
            console.log(value);
            if (value) {
                console.log('=========value=============',value);
                this.adherentSelected = value;
                this.onRowSelectBonAdherent();
                if( new Date(this.adherentSelected.dateIncorporation).getTime() > new Date(this.prestationAdd.dateSoins).getTime()) {
            

                    this.addMessage('error', 'Date de soins invalide',
                                'La date de soins du sinistre ne peut pas être antérieure à celle de la date d\'incorporation du sinitre');
                                this.prestationAdd.dateSoins = null;
                                this.adherentSelected = null;
                                
                         
        
        
                }
                if(this.adherentSelected.signeAdherent !=='*') {
                    if((value.dateSortie === null && value.dateSuspension  !== null) || (value.dateSortie !== null && value.dateSuspension  !== null && new Date(value.dateSuspension).getTime() < new Date(value.dateSortie).getTime()
                    && new Date(value.dateSortie).getTime() > new Date(this.prestationAdd.dateSoins).getTime())) {
                        this.addMessage('error', 'Assuré(e) non pris en compte',
                        'Cet(te) assuré(e) est  suspendu(e) !!!');
                        if( new Date(this.adherentSelected?.dateSuspension).getTime() <= new Date(this.prestationAdd.dateSoins).getTime()) {
                            this.prestationAdd.observation = "Cet(te) assuré(e) a  été suspendu(e)";
                            this.prestationAdd.sort = Sort.REJETE;
                            this.prestationAdd.montantRembourse = 0;
                           
                        }
                        this.prestationAdd.dateRetrait = new Date(this.adherentSelected.dateSuspension);
                        
                    } 
                    
                    if(value.dateSortie !== null && (new Date(value.dateSuspension)?.getTime() < new Date(value.dateSortie)?.getTime() )) {
                        this.addMessage('error', 'Assuré(e) non pris en compte',
                        'Cet(te) assuré(e) a problablement été rétiré(e), résilié(e) ou suspendu(e) !!!');

                     
                        if( new Date(this.adherentSelected?.dateSortie).getTime() <= new Date(this.prestationAdd.dateSoins).getTime() 
                        ) {
                          this.prestationAdd.observation = "Cet(te) assuré(e) a problablement été rétiré(e)";
                          this.prestationAdd.sort = Sort.REJETE;
                          this.prestationAdd.montantRembourse = 0;
                         
                      }

                      if( this.adherentSelected.dateSuspension !== null && new Date(this.adherentSelected?.dateSuspension).getTime() <= new Date(this.prestationAdd.dateSoins).getTime()) {
                        this.prestationAdd.observation = "Cet(te) assuré(e) a problablement été suspendu(e)";
                          this.prestationAdd.sort = Sort.REJETE;
                          this.prestationAdd.montantRembourse = 0;
            
                      }
                      this.prestationAdd.dateRetrait = new Date(this.adherentSelected.dateSortie);
                     
                    }
                   
    
           
                    
                  }
                this.prestationAdd.matriculeAdherent = this.adherentSelected.numero.toString();
                this.prestationAdd.nomAdherent = this.adherentSelected.nom.concat("  ").concat(this.adherentSelected.prenom);
                
                this.prestationAdd.prenomAdherent = this.adherentSelected.prenom;
                
                this.prestationAdd.numeroGroupe = this.adherentSelected.groupe.numeroGroupe?.toString();
                console.log("========this.prestationAdd.numeroGroupe============", this.prestationAdd.numeroGroupe);
                
                this.prestationAdd.numeroPolice = this.adherentSelected.groupe.police.numero;
                this.prestationAdd.souscripteur =  this.adherentSelected.groupe.police.nom;
                this.prestationAdd.nomGroupe = this.adherentSelected.groupe.libelle;
                this.prestationAdd.adherent = this.adherentSelected;
            
                this.prestationForm.get('nomAdherent').setValue(this.adherentSelected.nom);
                this.prestationForm.get('prenomAdherent').setValue(this.adherentSelected.prenom);
                if (this.adherentSelected.adherentPrincipal != null) {
                    this.prestationForm.get('nomAssurePrin').setValue(this.adherentSelected.adherentPrincipal.nom);
                    this.prestationForm.get('prenomAssurePrin').setValue(this.adherentSelected.adherentPrincipal.prenom);
                    this.prestationAdd.nomAdherentPrincipal = this.adherentSelected.adherentPrincipal.nom.concat("  ").concat(this.adherentSelected.adherentPrincipal.prenom);
                    this.prestationAdd.prenomAdherentPrincipal = this.adherentSelected.adherentPrincipal.prenom;
                } else {
                    this.prestationForm.get('nomAssurePrin').setValue(this.adherentSelected.nom);
                    this.prestationForm.get('prenomAssurePrin').setValue(this.adherentSelected.prenom);
                    this.prestationAdd.nomAdherentPrincipal = this.adherentSelected.nom.concat("  ").concat(this.adherentSelected.prenom);
                    this.prestationAdd.prenomAdherentPrincipal = this.adherentSelected.prenom;
                }
                this.prestationForm.get('numeroGroupe').setValue(this.adherentSelected.groupe.numeroGroupe);
                this.prestationForm.get('numeroPolice').setValue(this.adherentSelected.groupe.police.numero);
                this.prestationForm.get('nomGroupeAdherent').setValue(this.adherentSelected.groupe.libelle);
                this.prestationForm.get('nomPoliceAdherent').setValue(this.adherentSelected.groupe.police.nom);
                
                

               
              /*  this.bonPriseEnChargeList = this.bonPriseEnChargeList.filter(e => e.adherent.id === this.adherentSelected.id &&
                    e.typeBon === TypeBon.PRISEENCHARGE);*/
                    this.onRowSelectBonAdherent();

                    
            } else {

            }
        });
        this.exerciceList$ = this.store.pipe(select(exerciceSelector.selectExerciceList));
        this.store.dispatch(featureExerciceAction.loadExercices());
        this.exerciceList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
            if(value) {
                this.exerciceList = value.slice();
            }
        });

        this.sinistreTierPayantDTOList$ = this.store.pipe(select(tierPayantSelector.tierPayantList));
        this.store.dispatch(featureActionTierPayant.loadTierPayant());
        this.sinistreTierPayantDTOList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
            console.log(value);
            if (value) {
                this.sinistreTierPayantDTOList = value.slice();
            }
        });

        /* this.sousActeList$ = this.store.pipe(select(sousActeSelector.sousacteList));
        this.store.dispatch(loadSousActe());
        this.sousActeList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
            if (value) {
                console.log(this.sousActeList);
                this.sousActeList = value.slice();
            }
        }); */

        this.tauxList$ = this.store.pipe(select(tauxSelector.tauxList));
        this.store.dispatch(loadTaux());
        this.tauxList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
            if (value) {
                this.tauxList = value.slice();
                if (this.tauxList) {
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

        this.sousActeList$ = this.store.pipe(select(sousActeSelector.sousacteList));
        this.store.dispatch(loadSousActe());
        this.sousActeList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
            if (value) {
                console.log(this.sousActeList);
                this.sousActeList = value.slice();
                this.sousActeListFilter = this.sousActeList;
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

        this.produitPharmaceutiqueList$ = this.store.pipe(select(produitPharmaceutiqueSelector.produitPharmaceutiqueList));
        this.store.dispatch(loadProduitPharmaceutique());
        this.produitPharmaceutiqueList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
            console.log(value);
            if (value) {
                this.produitPharmaceutiqueList = value.slice();
            }
        });

        // chargement des bons de prise en charge
        this.bonPriseEnChargeList$ = this.store.pipe(select(selectorsBonPriseEnCharge.bonPriseEnChargeList));
        this.store.dispatch(featureActionBonPriseEnCharge.loadBons());
        this.bonPriseEnChargeList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
          console.log(value);
          if (value) {
            this.bonPriseEnChargeList = value.slice();
          }
    });

        this.statusObject$ = this.store.pipe(select(status));
        this.checkStatus();
    }


    initilisation() {
        
            this.prefinancement.montantPaye = 0;
      
       
        
    }

    onRowSelectAdherent() {
        this.adherentList$ = this.store.pipe(select(adherentSelector.adherentList));
        this.store.dispatch(featureActionAdherent.findAdherents({exercice: this.prestationAdd.dateSoins}));
        this.adherentList$.pipe(takeUntil(this.destroy$)).subscribe((value) =>{
            if(value) {
                console.log('=============adh======',value.slice());
                this.adherentList = value.slice();
               
            }

        });
    }
    onRowSelectPrestataire(event)  {
       
          this.prestataireSelected = event.value;
    }

    onRowSelectBonAdherent() {
    

          this.bonPriseEnChargeList = this.bonPriseEnChargeList.filter(bon=>bon?.adherent?.id === this.adherentSelected.id 
            && bon.prestataire?.id === this.prestataireSelected.id &&  bon.typeBon === TypeBon.PRISEENCHARGE);
            console.log('====lidt==========', this.bonPriseEnChargeList);
        
    }


    selectActe(event){
        this.sousActeListFilter = this.sousActeList.filter(e => e.idTypeActe === event.value.id);
        /* this.sousActeEnCours$ = this.store.pipe(select(plafondSelector.plafondSousActeEnCours));
        this.store.dispatch(featureActionPlafond.loadSousActeEnCours({idPGA: event.value.acte.id}));
        console.log('++++++++++++++++++++++++++++++++++++event.value.acte.id+++', event.value.acte.id);
        this.sousActeEnCours$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
            console.log('++++++++++++++++++++++++++++++++++++value+++', value);
            if (value) {
                this.sousActeEnCours = value.slice();
                console.log('++++++++++++++++++++++++++++++++++++acteEnCours$+++', this.sousActeEnCours);
            }
        }); */
    }

    imprimer(pref: SinistreTierPayant) {
        this.report.typeReporting = TypeReport.TIERPAYANT_FICHE_DETAIL_REMBOURSEMENT;
        this.report.sinistreTierPayantDTO = pref;
        this.store.dispatch(featureActionTierPayant.FetchReportTierPayant(this.report));
    }

     validerPrestation(pref: SinistreTierPayant) {
      this.confirmationService.confirm({
        message: 'voulez-vous valider le sinistre',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.store.dispatch(featureActionTierPayant.updateEtatValiderTierPayant({tierPayant: pref,
            etat: TypeEtatSinistre.VALIDE}));
        },
      });
    }

   

    editerPrestation(pref: SinistreTierPayant) {
        console.log(pref);
        this.prestationForm.get('referenceBordereau').setValue(pref.referenceBordereau);
        this.prestationForm.get('matriculeAdherent').setValue(pref.adherent.numero);
        this.prestationForm.get('nomAdherent').setValue(pref.adherent.nom);
        this.prestationForm.get('prenomAdherent').setValue(pref.adherent.prenom);
        this.prestationForm.get('nomAssurePrin').setValue(this.adherentSelected.adherentPrincipal.nom);
        this.prestationForm.get('prenomAssurePrin').setValue(this.adherentSelected.adherentPrincipal.prenom);
        this.prestationForm.get('numeroGroupe').setValue(pref.adherent.groupe.numeroGroupe);
        this.prestationForm.get('numeroPolice').setValue(pref.adherent.groupe.police.numero);
        this.prestationForm.get('dateDeclaration').setValue(new Date(pref.dateDeclaration));
        this.prestationForm.get('numeroFacture').setValue(pref.numeroFacture);
        this.prestationForm.get('nomGroupeAdherent').setValue(pref.adherent.groupe.libelle);
        this.prestationForm.get('nomPoliceAdherent').setValue(pref.adherent.groupe.police.nom);
        this.prestationForm.get('bonPriseEnCharge').setValue(pref.bonPriseEnCharge);
        // this.prestationForm.get('dateSoins').setValue(new Date(pref.dateSoins));
        this.prestationForm.get('dateSaisie').setValue(new Date(pref.dateSaisie));
        for (const pr of pref.prestation) {
            const formPrestation: FormGroup = this.createItem();
            formPrestation.patchValue(pr);
            
       
            this.prestation.push(formPrestation);
        }
        // this.prestationList = pref.prestation;
        console.log('****************pref.prestation****************', pref.prestation);
        this.displayFormPrefinancement = true;
    }

    voirPrestation(pref?: SinistreTierPayant, isDetail?: boolean) {
        console.log('****************pref****************', pref);
        console.log('****************isDetail****************', isDetail);
        pref.prestation?.forEach(presta => {
            this.bonPriseEnChargeList.push(presta.bonPriseEnCharge);
        })
        
        if (this.displayFormPrefinancement) {
            this.displayFormPrefinancement = false;
            this.isDetail = false;
            this.prestationForm.reset();
            this.prestationForm.enable({onlySelf: false, emitEvent: true});
            // this.prestationListPrefinancement = pref.prestation;
            // this.prestationListPrefinancementFilter = this.prestationListPrefinancement;
        } else {
            if (pref) {
                this.isDetail = isDetail;
                // this.prestationForm.get('referenceBordereau').setValue(pref.referenceBordereau);
                /** Activer les autres champs*/
                this.prestationForm.get('dateFacture').enable();
                this.prestationForm.get('numeroFacture').enable();
                this.prestationForm.get('matriculeAdherent').enable();
                this.prestationForm.get('dateDeclaration').enable();
                this.prestationForm.get('prestataire').enable();
                // tslint:disable-next-line:jsdoc-format
                /** Recuperer les infos de tous les champs*/
                // tslint:disable-next-line:no-unused-expression
                this.isModif === true;
                this.prestationForm.get('matriculeAdherent').setValue(pref.adherent.numero);
                this.prestationForm.get('nomAdherent').setValue(pref.adherent.nom);
                this.prestationForm.get('prenomAdherent').setValue(pref.adherent.prenom);
                this.prestationForm.get('nomAssurePrin').setValue(pref?.adherent?.adherentPrincipal?.nom);
                this.prestationForm.get('prenomAssurePrin').setValue(pref?.adherent?.adherentPrincipal?.prenom);
                this.prestationForm.get('numeroGroupe').setValue(pref.adherent.groupe.numeroGroupe);
                this.prestationForm.get('numeroPolice').setValue(pref.adherent.groupe.police.numero);
                this.prestationForm.get('prestataire').setValue(this.prestataireList.find(p => p.id === pref.prestataire.id));
                console.log('***************pref.prestataire.libelle******************', pref.prestataire);
                this.prestationForm.get('dateDeclaration').setValue(new Date(pref.dateDeclaration));
                this.prestationForm.get('dateFacture').setValue(new Date(pref.dateFacture));
                this.prestationForm.get('numeroFacture').setValue(pref.numeroFacture);
                this.prestationForm.get('nomGroupeAdherent').setValue(pref.adherent.groupe.libelle);
                this.prestationForm.get('nomPoliceAdherent').setValue(pref.adherent.groupe.police.nom);
                this.prestationForm.get('bonPriseEnCharge').setValue(pref.bonPriseEnCharge);
                // this.prestationForm.get('dateSoins').setValue(new Date(pref.dateSoins));
                this.prestationForm.get('dateSaisie').setValue(new Date(pref.dateSaisie));""
                for (const pr of pref.prestation) {
                   
                  this.adherentList$ = this.store.pipe(select(adherentSelector.adherentList));
                   this.store.dispatch(featureActionAdherent.findAdherents({exercice: pr.dateSoins}));
                   this.adherentList$.pipe(takeUntil(this.destroy$)).subscribe((value) =>{
                       if(value) {
                         //  console.log('=============adh======',value.slice());
                           this.adherentList = value.slice();
                          
                       }
           
                   }); 
                
                    const formPrestation: FormGroup = this.createItem();
                    formPrestation.patchValue(pr);
                    this.prestation.push(formPrestation);
                }
                if (this.isDetail) {
                    // tslint:disable-next-line:no-unused-expression
                    // this.isModif === false;
                    this.prestationForm.disable({onlySelf: false, emitEvent: true});
                }
            }
            this.displayFormPrefinancement = true;
        }


    }

    calculCoutDebours(data: FraisReels, ri: number) {
        console.log(this.prestationList);
        console.log(data);
        this.prestationList[ri].debours = data.coutUnitaire * Number(data.nombreActe);
        this.prestationList[ri].baseRemboursement = this.prestationList[ri].debours;
        this.prestationList[ri].montantRembourse = this.prestationList[ri].baseRemboursement * (this.prestationList[ri].taux.taux / 100);
    }

    rechercherAdherent1(event) {

        // this.adherentSelected$ = this.store.pipe(select(adherentSelector.selectedAdherent));
        this.adherentSelected = null;
        this.prestationAdd.matriculeAdherent = "";
        this.prestationAdd.nomAdherent = "";
        
        this.prestationAdd.prenomAdherent = "";

    
                
                this.prestationAdd.numeroGroupe = "";
                this.prestationAdd.numeroPolice = "";
                this.prestationAdd.souscripteur =  "";
                this.prestationAdd.nomGroupe = "";
                this.prestationAdd.adherent = this.adherentSelected;
            
               
                  
                    this.prestationAdd.nomAdherentPrincipal = "";
                    this.prestationAdd.prenomAdherentPrincipal = "";
                
                    this.prestationAdd.nomAdherentPrincipal = "";
                    this.prestationAdd.prenomAdherentPrincipal = "";
                    this.prestationAdd.sort = null;
                    this.prestationAdd.observation = "";
                
        
        this.store.dispatch(featureActionAdherent.searchAdherentByDateSoinsAndMatricule({dateSoins:this.prestationAdd.dateSoins, matricule: event.target.value}));;
      /*   this.adherentSelected$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
            console.log(value);
            if (value) {
                this.prestationAdd.adherent = value;
                console.log(this.prestationAdd.adherent);
            }
        }); */
    }

    rechercherAdherentByNom(event) {
        this.displayAdherent = true;
        this.adherentNomSelected$ = this.store.pipe(select(adherentSelector.adherentList));
        this.store.dispatch(featureActionAdherent.searchAdherentByNom({nom: event.target.value}));
        this.adherentNomSelected$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
            console.log(value);
            if (value) {
                this.adherentNomSelected = value;
               
            }
        });
    }

    rechercherAdherent(event) {
        console.log(event.target.value);
        this.prestationForm.get('nomAdherent').setValue('');
        this.prestationForm.get('prenomAdherent').setValue('');
        this.prestationForm.get('nomAssurePrin').setValue('');
        this.prestationForm.get('prenomAssurePrin').setValue('');
        this.prestationForm.get('numeroGroupe').setValue('');
        this.prestationForm.get('numeroPolice').setValue('');
        this.prestationForm.get('nomGroupeAdherent').setValue('');
        this.prestationForm.get('nomPoliceAdherent').setValue('');
        
        
       
    
        
        this.store.dispatch(featureActionAdherent.searchAdherent({numero: event.target.value}));

        /* this.familleActeEnCours$ = this.store.pipe(select(plafondSelector.plafondEnCours));
        this.store.dispatch(featureActionPlafond.loadFamilleActeEnCours({numero: event.target.value}));
        this.familleActeEnCours$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
            console.log('++++++++++++++++++++++++++++++++++++value+++', value);
            if (value) {
                this.familleActeEnCours = value.slice();
                console.log('++++++++++++++++++++++++++++++++++++familleActeEnCours+++', this.familleActeEnCours);
            }
        }); */
    }

    onRowSelectBon($event){
        console.log($event.value.prestation);
      const  index = 0;
        const prestaList: Prestation[] =$event.value.prestation; 
        
        if(!this.prefinancement.montantRestant) {
            this.prefinancement.montantRestant = this.prefinancement.montantReclame;
        }
        if(!this.prefinancement.montantPaye ) {
            this.prefinancement.montantPaye = 0;
        }
        if(this.prestationsList.length === undefined  || this.prestationsList.length === 0) {
            this.prefinancement.montantPaye = 0;
            this.prefinancement.montantRestant = this.prefinancement.montantReclame;
            this.prefinancement.montantPaye = this.prefinancement.montantPaye + this.prestationAdd.montantRembourse;
            this.prefinancement.montantRestant = this.prefinancement.montantRestant - this.prefinancement.montantPaye;
        }

         if(prestaList.length == 1) {
            console.log("==============================", this.acteList.find(garan=>garan.id === prestaList[0].acte?.id));
            console.log("==============================", prestaList[0].acte);
             
             this.prestationAdd.familleActe = prestaList[0].familleActe;

             this.prestationAdd.acte = prestaList[0].acte;
             this.prestationAdd.sousActe = prestaList[0].sousActe;
             this.prestationAdd.pathologie = prestaList[0].pathologie;
             this.prestationAdd.prestataire = prestaList[0].prestataire;
             this.prestationAdd.produitPharmaceutique = prestaList[0].produitPharmaceutique;
             this.prestationAdd.medecin = prestaList[0].medecin;
             this.prestationAdd.nombreActe = prestaList[0].nombreActe;
             this.prestationAdd.coutUnitaire = prestaList[0].coutUnitaire;
             this.prestationAdd.debours = prestaList[0].debours;
             this.prestationAdd.baseRemboursement = prestaList[0].baseRemboursement;
             this.prestationAdd.taux = prestaList[0].taux;
             this.prestationAdd.montantRestant = prestaList[0].montantRestant;
             

             this.selectDateSoins();
             console.log("==========================",this.prestationAdd.montantPlafond);
             
           //  this.prestationAdd.montantPlafond = prestaList[0]?.sousActe?.montantPlafond;
             if(this.prestationAdd.montantRembourse !== 0) {

                this.prestationAdd.montantRembourse = prestaList[0].montantRembourse;
                this.prestationAdd.montantRestant = this.prestationAdd.baseRemboursement - this.prestationAdd.montantRembourse;

                this.prestationAdd.sort = prestaList[0].sort;
                this.prestationAdd.sort = prestaList[0].sort;
                this.prestationAdd.observation = prestaList[0].observation;
            }
             
             this.prestationAdd.montantPlafond = this.prestationAdd.sousActe?.montantPlafond;
             if(this.prestationAdd.montantPlafond <  this.prestationAdd.montantRembourse){
                this.prestationAdd.montantRembourse = this.prestationAdd.montantPlafond;
                

               }

               this.prefinancement.montantPaye = this.prefinancement.montantPaye + this.prestationAdd.montantRembourse;
              this.prefinancement.montantRestant = this.prefinancement.montantReclame - this.prefinancement.montantPaye;
         }
         if(prestaList.length > 1) {
             if(this.prestationsList?.length === 0 || this.prestationsList?.length === undefined) {
                 this.prestationAdd.familleActe = prestaList[0].familleActe;
               // this.prestationAdd.familleActe = this.garanties.find(garan=>garan.id === this.acteList.find(acte=>acte.id === prestaList[0].acte?.id)?.idTypeGarantie);
                this.prestationAdd.acte = prestaList[0].acte;
                this.prestationAdd.sousActe = prestaList[0].sousActe;
                this.prestationAdd.pathologie = prestaList[0].pathologie;
                this.prestationAdd.prestataire = prestaList[0].prestataire;
                this.prestationAdd.produitPharmaceutique = prestaList[0].produitPharmaceutique;
                this.prestationAdd.medecin = prestaList[0].medecin;
                this.prestationAdd.nombreActe = prestaList[0].nombreActe;
                this.prestationAdd.coutUnitaire = prestaList[0].coutUnitaire;
                this.prestationAdd.debours = prestaList[0].debours;
                this.prestationAdd.baseRemboursement = prestaList[0].baseRemboursement;
                this.prestationAdd.taux = prestaList[0].taux;
                
                this.selectDateSoins();
               // this.prestationAdd.montantPlafond = prestaList[0]?.sousActe?.montantPlafond;

                if(this.prestationAdd.montantRembourse !== 0) {

                    this.prestationAdd.montantRembourse = prestaList[0].montantRembourse;
                    this.prestationAdd.montantRestant = this.prestationAdd.baseRemboursement - this.prestationAdd.montantRembourse;
                    this.prestationAdd.sort = prestaList[0].sort;
                    this.prestationAdd.sort = prestaList[0].sort;
                    this.prestationAdd.observation = prestaList[0].observation;
                }
               
                this.prestationAdd.montantPlafond = this.prestationAdd.sousActe?.montantPlafond;
                if(this.prestationAdd.montantPlafond <  this.prestationAdd.montantRembourse){
                    this.prestationAdd.montantRembourse = this.prestationAdd.montantPlafond;
                    
    
                   }
    
                   this.prefinancement.montantPaye = this.prefinancement.montantPaye + this.prestationAdd.montantRembourse;
                  this.prefinancement.montantRestant = this.prefinancement.montantReclame - this.prefinancement.montantPaye;
                

                
                
             } else {
                console.log("========montantRembourse1============", this.prestationAdd.montantRembourse);
                const prestaList1: Prestation[] = [];
                prestaList.forEach(prest=>{
                    this.i = 0;
                    this.prestationsList.forEach(prestation=>{
                        if(prest.sousActe == prestation.sousActe) {
                            this.i = 1;
                        }
                    });
                    if(this.i === 0) {
                        prestaList1.push(prest);
                    }
                });
                if(prestaList1?.length > 0) {
                    this.prestationAdd.familleActe = prestaList1[0].familleActe;
                   // this.prestationAdd.familleActe = this.garanties.find(garan=>garan.id === this.acteList.find(acte=>acte.id === prestaList[0].acte?.id)?.idTypeGarantie);
                    this.prestationAdd.acte = prestaList1[0].acte;
                    this.prestationAdd.sousActe = prestaList1[0].sousActe;
                    this.prestationAdd.pathologie = prestaList1[0].pathologie;
                    this.prestationAdd.prestataire = prestaList1[0].prestataire;
                    this.prestationAdd.produitPharmaceutique = prestaList1[0].produitPharmaceutique;
                    this.prestationAdd.medecin = prestaList1[0].medecin;
                    this.prestationAdd.nombreActe = prestaList1[0].nombreActe;
                    this.prestationAdd.coutUnitaire = prestaList1[0].coutUnitaire;
                    this.prestationAdd.debours = prestaList1[0].debours;
                    this.prestationAdd.baseRemboursement = prestaList1[0].baseRemboursement;
                    this.prestationAdd.taux = prestaList1[0].taux;
                   // this.prestationAdd.montantRestant = prestaList1[0].montantRestant;
                    this.selectDateSoins();
                   // this.prestationAdd.montantPlafond = prestaList1[0]?.sousActe?.montantPlafond;

                    if(this.prestationAdd.montantRembourse !== 0) {
                       this.prestationAdd.montantRembourse = prestaList1[0].montantRembourse;
                       this.prestationAdd.montantRestant = this.prestationAdd.baseRemboursement - this.prestationAdd.montantRembourse;

                        this.prestationAdd.sort = prestaList1[0].sort;
                        this.prestationAdd.sort = prestaList1[0].sort;
                        this.prestationAdd.observation = prestaList1[0].observation;
                    }
                    
                    this.prestationAdd.montantPlafond = this.prestationAdd.sousActe?.montantPlafond;
                    if(this.prestationAdd.montantPlafond <  this.prestationAdd.montantRembourse){
                        this.prestationAdd.montantRembourse = this.prestationAdd.montantPlafond;
                        
        
                       }
        
                       this.prefinancement.montantPaye = this.prefinancement.montantPaye + this.prestationAdd.montantRembourse;
                      this.prefinancement.montantRestant = this.prefinancement.montantReclame - this.prefinancement.montantPaye;
                }

                
                                
             }
         }  
        this.displayFormPrefinancement = true;
      }

      voirAdherent(event){

        console.log("==================",event);
          this.adherentSelected = event.value;
      }

    // valider TierPayant
    validerTierPayant() {
        console.log('********************this.tierPayantList**************************', this.tierPayantList);
       // this.store.dispatch(featureActionTierPayant.createTierPayant({tierPayant: this.tierPayantList}));
        this.tierPayantList = [];
        this.prestationList = [];
        this.prestationForm.reset();
    }

    changeGarantie(event) {
        if(event.value?.code == "FP") {
            this.displayFP = true;
           } else {
            this.displayFP = false;
          }
        this.acteListFilter = this.acteList.filter(element => element.idTypeGarantie === event.value.id);
        /* this.acteEnCours$ = this.store.pipe(select(plafondSelector.plafondActeEnCours));
        this.store.dispatch(featureActionPlafond.loadActeEnCours({idPGFA: event.value.garantie.id}));
        console.log('++++++++++++++++++++++++++++++++++++item+++', event.value.garantie.id);
        this.acteEnCours$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
            console.log('++++++++++++++++++++++++++++++++++++value+++', value);
            if (value) {
                this.acteEnCours = value.slice();
                console.log('++++++++++++++++++++++++++++++++++++acteEnCours$+++', this.acteEnCours$);
            }
        }); */
    }

    changeDisplay() {
        if(this.prestationAdd.produitPharmaceutique) {
          this.displayFP = false;
        } else {
          if(this.prestationAdd?.familleActe?.garantie?.code == "FP") {
            this.displayFP = true;
          } 
        }
      }

    getfamilleActeEnCourId(): string {
        if (this.familleActeEnCour !== null) {
            return this.familleActeEnCour?.id;
        } else {
            return null;
        }
    }

    newRowPrestation() {
        return {taux: this.taux};
    }

    addTierPayant() {
        this.prestationForm.reset();
        this.prestation.clear();
        // this.prestationForm.enable({onlySelf: false, emitEvent: true});
        this.prestationForm.get('dateFacture').enable();
        this.prestationForm.get('numeroFacture').enable();
        this.prestationForm.get('matriculeAdherent').enable();
        this.prestationForm.get('dateDeclaration').enable();
        this.prestationForm.get('prestataire').enable();
        this.prestationForm.get('dateSaisie').setValue(new Date());
        this.isDetail = false;
        this.isModif = true;
        this.prefinancement = {};
        this.prestationAdd = {};
        this.prestationsList =[];
        this.prefinancement.dateSaisie = new Date();
        console.log("=====================bien==========");
        console.log(this.prefinancement.dateSaisie);
        console.log("=====================bien==========");
        this.prefinancement.montantPaye = 0;
        this.displayFormPrefinancement = true;
    }

    showToast(severity: string, summary: string, detail: string) {
        this.messageService.add({severity, summary, detail});
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
    

    calculDebours() {
        console.log("======idGenre=======",this.adherentSelected.qualiteAssure.code);
        if(this.prestationAdd.sort === Sort.REJETE) {
            this.prestationAdd.debours = this.prestationAdd.nombreActe * this.prestationAdd.coutUnitaire;
            this.prestationAdd.baseRemboursement = this.prestationAdd.nombreActe * this.prestationAdd.coutUnitaire;
            this.prestationAdd.montantRestant = this.prestationAdd.nombreActe * this.prestationAdd.coutUnitaire;
        } else {

       
        if((this.prestationAdd?.sousActe.idGenre && this.adherentSelected.genre.id === this.prestationAdd?.sousActe.idGenre) ||
         (this.prestationAdd?.sousActe.idGenre && this.adherentSelected.genre.id !== this.prestationAdd?.sousActe?.idGenre && this.adherentSelected.qualiteAssure.code =="ENFANT")) {
          
            this.prestationAdd.montantRembourse = 0;
            this.prestationAdd.debours = this.prestationAdd.nombreActe * this.prestationAdd.coutUnitaire;
            this.prestationAdd.baseRemboursement = this.prestationAdd.nombreActe * this.prestationAdd.coutUnitaire;
            this.prestationAdd.montantRestant = this.prestationAdd.nombreActe * this.prestationAdd.coutUnitaire;
            this.prestationAdd.sort = Sort.REJETE;
            if(this.adherentSelected.qualiteAssure.code =="ENFANT") {
                this.prestationAdd.observation = "Nous ne prenons pas en compte "+ this.prestationAdd.sousActe?.libelle+ " "+"pour les enfants filles "
            } else {
                this.prestationAdd.observation = "Nous ne prenons pas en compte "+ this.prestationAdd.sousActe?.libelle+ " "+"pour le genre"+ " " +this.adherentSelected.genre.libelle;

            }
        
      
          
      
        } else {

       
        const prestati: Prestation[] = this.prestationsList.filter(presta=>!presta.id && presta?.sousActe?.id === this.prestationAdd?.sousActe?.id);
        if(prestati?.length > 0) {
            console.log("======1=======",this.montantConsomme);
            prestati.forEach(pre=>{
                if(pre.montantRembourse) {
                    this.montantConsomme = this.montantConsomme + pre.montantRembourse;
                }
            });
        }
        console.log(this.montantConsomme , this.montantPlafond);
        if(this.montantConsomme > this.montantPlafond1  ) {
            this.showToast('error', 'INFORMATION', 'Vous avez atteint votre plafond');

         //   console.log(this.montantConsomme , this.montantPlafond);

            this.prestationAdd.sort = Sort.REJETE;
            this.prestationAdd.observation = "Vous avez atteint votre plafond " ;
            this.prestationAdd.montantRembourse = 0;
        }
       

       
        if(this.montantConvention !== 0 &&  this.montantConvention < this.prestationAdd.coutUnitaire) {
            this.showToast('error', 'INFORMATION', 'coût unitaire differnt du montant de la convention');
            const c =this.montantConvention - this.prestationAdd.coutUnitaire;
            this.prestationAdd.coutUnitaire = this.montantConvention;
            this.prestationAdd.inotPlafond = true;
            if(!this.prestationAdd.observation) {
                this.prestationAdd.observation = "la differnce entre le coût unitaire et le montant de la convention est " + c;

            }
        }

       /*  if(this.montantPlafond === 0 || !this.montantPlafond ) {
            console.log('gggggggggggggggggg');
=======
        if(this.montantPlafond === 0  ) {
            this.showToast('error', 'INFORMATION', 'l\'assurance ne couvre pas ce produit');
>>>>>>> feature_button_policy_validation

            this.prestationAdd.sort = Sort.ACCORDE;
            if (this.prestationAdd.nombreActe &&
                this.prestationAdd.coutUnitaire) {
                    this.prestationAdd.debours = this.prestationAdd.nombreActe * this.prestationAdd.coutUnitaire;
                    this.prestationAdd.baseRemboursement = this.prestationAdd.nombreActe * this.prestationAdd.coutUnitaire;
                    if(this.prestationAdd.montantRembourse !== 0  || this.prestationAdd.montantRembourse === 0 ) {
                        if((this.montantConsomme + (this.prestationAdd.nombreActe * this.prestationAdd.coutUnitaire * this.prestationAdd.adherent?.groupe?.taux?.taux) / 100) <= this.montantPlafond1  ){
                            console.log('gggggggggggggggggg');
                            this.prestationAdd.montantRembourse = (this.prestationAdd.nombreActe * this.prestationAdd.coutUnitaire * this.prestationAdd.adherent?.groupe?.taux?.taux) / 100;
                            console.log('this.prestationAdd.montantRembourse', this.prestationAdd.montantRembourse);
                            this.prestationAdd.montantRestant =  this.prestationAdd.baseRemboursement - this.prestationAdd.montantRembourse;
                            console.log('this.prestationAdd.montantRestant', this.prestationAdd.montantRestant );
        
                        } 
                       
                    } else {
                        console.log('else');
                        this.prestationAdd.montantRestant =  this.prestationAdd.baseRemboursement;
                    }
                }

        }

       */
           // this.prestationAdd.taux = this.prestationAdd.adherent?.groupe?.taux;
            if(!this.prestationAdd.sort) {
                this.prestationAdd.sort = Sort.ACCORDE;
                this.prestationAdd.montantRembourse = (this.prestationAdd.nombreActe * this.prestationAdd.coutUnitaire * this.prestationAdd?.taux?.taux) / 100;
                this.prestationAdd.montantRestant =  this.prestationAdd.baseRemboursement - this.prestationAdd.montantRembourse;
    
               

            }
            
        
        
            if (this.prestationAdd.nombreActe &&
            this.prestationAdd.coutUnitaire) {
                this.prestationAdd.debours = this.prestationAdd.nombreActe * this.prestationAdd.coutUnitaire;
                this.prestationAdd.baseRemboursement = this.prestationAdd.nombreActe * this.prestationAdd.coutUnitaire;
                if(this.prestationAdd.montantRembourse !== 0) {
                    if((this.montantConsomme + (this.prestationAdd.nombreActe * this.prestationAdd.coutUnitaire * this.prestationAdd?.taux?.taux) / 100) <= this.montantPlafond1  ){

                        this.prestationAdd.montantRembourse = (this.prestationAdd.nombreActe * this.prestationAdd.coutUnitaire * this.prestationAdd?.taux?.taux) / 100;
                        this.prestationAdd.montantRestant =  this.prestationAdd.baseRemboursement - this.prestationAdd.montantRembourse;
    
                    } 
                   
                } else {
                    this.prestationAdd.montantRestant =  this.prestationAdd.baseRemboursement;
                }
            }
            
           /* if(this.prefinancement.montantRestant == null ) {
                this.prefinancement.montantRestant = this.prefinancement.montantReclame;
            }
            if(this.prefinancement.montantPaye == null ) {
                this.prefinancement.montantPaye = 0;
            }
            if(this.prestationsList.length === undefined  || this.prestationsList.length === 0) {
                this.prefinancement.montantPaye = this.prefinancement.montantPaye + this.prestationAdd.montantRembourse;
                this.prefinancement.montantRestant = this.prefinancement.montantRestant - this.prefinancement.montantPaye;
            } else {
                if(this.compteur === null){
                    if(this.prefinancement === undefined) {
                        this.prestationsList.forEach(prest=> {
                            this.prefinancement.montantPaye = this.prefinancement.montantPaye + prest.montantRembourse;
                        });
                        this.prefinancement.montantRestant = this.prefinancement.montantReclame - this.prefinancement.montantPaye;
            
                    } else {
                        console.log("=============montantPaye===============");
                        console.log(this.prefinancement.montantPaye);
                        console.log("compter============",this.compteur);
                        console.log("===============montantPaye=============");

                        if((this.montantConsomme + (this.prestationAdd.nombreActe * this.prestationAdd.coutUnitaire * this.prestationAdd?.taux?.taux) / 100) <= this.montantPlafond1  ) {
                           
                       
                            this.prefinancement.montantPaye = this.prefinancement.montantPaye +  this.prestationAdd.montantRembourse;
                            this.prefinancement.montantRestant = this.prefinancement.montantReclame - this.prefinancement.montantPaye;
    
                        }
                       
            
                    }
                }else {
                    if(this.prefinancement === undefined) {
                        this.prefinancement.montantPaye = this.prefinancement.montantPaye - this.baseAnterieur;
                        this.prefinancement.montantPaye = this.prefinancement.montantPaye + this.prestationAdd.montantRembourse;
                        this.prefinancement.montantRestant = this.prefinancement.montantReclame - this.prefinancement.montantPaye;
            
                    } else {
                        console.log("base========",this.baseAnterieur);


                        this.prefinancement.montantPaye = this.prefinancement.montantPaye - this.baseAnterieur;
                        console.log("base========",this.prefinancement.montantPaye);
                        this.prefinancement.montantPaye = this.prefinancement.montantPaye + this.prestationAdd.montantRembourse;
                        this.prefinancement.montantRestant = this.prefinancement.montantReclame - this.prefinancement.montantPaye;

            
                    }
                }
            

            
                
            }*/

            if(this.montantPlafond !== null && this.montantPlafond !== 0 ) {
                if(this.montantPlafond < this.prestationAdd.coutUnitaire) {
                   // this.prestationAdd.montantRestant = this.prestationAdd.montantRembourse - this.montantPlafond;
                    this.prestationAdd.montantRembourse = this.montantPlafond * this.prestationAdd.nombreActe;
                    this.prestationAdd.montantRestant = this.prestationAdd.baseRemboursement - this.prestationAdd.montantRembourse;
                }
                this.prestationAdd.montantPlafond = this.montantPlafond;
            }

            if(!this.prestationAdd.observation) {
                this.prestationAdd.observation= "remboursement favorable";
            }
            console.log("=============this.montantPlafond12=============",this.montantPlafond1);

            if((this.montantConsomme + this.prestationAdd.montantRembourse) > this.montantPlafond1  ) {

                
                this.prestationAdd.sort = Sort.ACCORDE;
                this.prestationAdd.observation = "Remboursement favorable avec un plafond atteint. Vous avez franchi de " + (this.montantPlafond1 -(this.montantConsomme +  (this.prestationAdd.baseRemboursement))) ;
               
                this.prestationAdd.montantRembourse = this.montantPlafond1 - this.montantConsomme;
                this.prestationAdd.montantRestant =  this.prestationAdd.baseRemboursement - this.prestationAdd.montantRembourse;
                
             //   this.prefinancement.montantPaye = this.prefinancement.montantPaye + this.prestationAdd.montantRembourse;
               

              //  this.prefinancement.montantRestant = this.prefinancement.montantReclame - this.prefinancement.montantPaye;
            }
        }
            /* if(this.prefinancement.montantRestant < 0){
                this.prestationAdd.sort = Sort.REJETE;
                if(!this.prestationAdd.observation) {
                    this.prestationAdd.observation = "le plafond famille-acte sur la periode est atteint";
                }
            } else{
                if(!this.prestationAdd.observation) {
                    this.prestationAdd.observation= "remboursement favorable";
                }
               
            }
            */
        



        
        /* this.store.dispatch(featureActionTierPayant.checkTierPayant({tierPayant: this.tierPayantList}));
            this.store.pipe(select(tierPayantSelector.selectCheckTierPayantReponse)).pipe(takeUntil(this.destroy$)).subscribe((value) => {
                console.log(value);
                if (!value) {
                    this.tab.push(i);
                    this.checkControl = false;
                } else {
                    this.checkTierPayantResult = value.slice();
                    console.log('**********************************', this.checkTierPayantResult);
                    for (let j = 0; j < this.checkTierPayantResult.length; j++){

                        this.prestationForm.get('montantPaye').setValue(this.prestationForm.get('montantPaye').value + this.checkTierPayantResult[j].montantRembourse);
                        this.prestationForm.get('montantRestant').setValue(this.prestationForm.get('montantReclame').value - this.prestationForm.get('montantPaye').value);
                        console.log('*****************this.prestationForm.getMontantPaye*****************', this.prestationForm.get('montantPaye').value);
                        console.log('*****************this.prestationForm.getMontantRestant*****************', this.prestationForm.get('montantRestant').value);
                        myForm = (this.prestationForm.get('prestation') as FormArray).at(j);
                        myForm.patchValue({montantRembourse: this.checkTierPayantResult[j].montantRembourse,
                            sort: this.checkTierPayantResult[j].sort, montantRestant: this.checkTierPayantResult[j].montantRestant,
                            observation: this.checkTierPayantResult[j].message, historiqueAvenant: this.checkTierPayantResult[j].historiqueAvenant
                        });
                    }
                }
            });*/
            this.tierPayantList = [];
            this.prefinancementModel = {};
        }
            // this.prestationForm.get('prestation').value[i].montantPayeTMP = this.prestationForm.get('prestation').value[i].montantPaye;
            // console.log('**************** this.prestationForm.getTMP******************', this.prestationForm.get('prestation').value[i].montantPayeTMP);
       
    }
    

    calculExclu() {
        if(this.prestationAdd.montantExclu) {
            if(this.prestationAdd.sort === Sort.ACCORDE) {
               this.prestationAdd.montantRembourse =  ((this.prestationAdd.baseRemboursement - this.prestationAdd.montantExclu) *  this.prestationAdd.taux?.taux) /100;
               this.prestationAdd.montantRestant = this.prestationAdd.baseRemboursement  - this.prestationAdd.montantRembourse ;
               if( this.montantPlafond1 !== null && (this.montantConsomme + this.prestationAdd.montantRembourse) > this.montantPlafond1  ) {

                
                this.prestationAdd.sort = Sort.ACCORDE;
                this.prestationAdd.observation = "Remboursement favorable avec un plafond atteint. Vous avez franchi de " + (this.montantPlafond1 -(this.montantConsomme +  (this.prestationAdd.baseRemboursement))) ;
               
                this.prestationAdd.montantRembourse = this.montantPlafond1 - this.montantConsomme;
                this.prestationAdd.montantRestant =  this.prestationAdd.baseRemboursement - this.prestationAdd.montantRembourse;
                
                this.prefinancement.montantPaye = this.prefinancement.montantPaye + this.prestationAdd.montantRembourse;
               

                this.prefinancement.montantRestant = this.prefinancement.montantReclame - this.prefinancement.montantPaye;
            }
            }
        }
    }


    findTaux() {
        this.prefinancementService.findTauxSousActe(this.adherentSelected.groupe.id, this.prestationAdd?.sousActe?.id, this.adherentSelected.id).subscribe((rest)=>{
          
          this.prestationAdd.taux  =rest;
        });
      }

    get prestation() {
        return this.prestationForm.controls.prestation as FormArray;
    }

    addItemPrestation(): void {
        this.displayPrestationpop = true;
        this.prestationAdd = {};
        // this.prefinancement.montantRestant = this.prefinancement.montantPaye;
        const formPrestation: FormGroup = this.createItem();
        this.store.dispatch(featureActionBonPriseEnCharge.loadBons());
        // formPrestation.get('montantReclame').setValue(this.prestationForm.get('montantReclame').value)
        
        this.prestation.push(formPrestation);
    }

    deleteItemPrestation(i: number) {
        this.prestation.removeAt(i);
    }

    createItem(): FormGroup {
        return this.formBuilder.group({
            id: new FormControl(),
            nombreActe: new FormControl(null, Validators.required),
            coutUnitaire: new FormControl(null, Validators.required),
            debours: new FormControl(),
            sousActe: new FormControl(null, Validators.required),
            baseRemboursement: new FormControl(),
            taux: new FormControl( Validators.required),
            montantRembourse: new FormControl(Validators.required),
            sort: new FormControl(),
            observation: new FormControl(),
            prestataire: new FormControl(),
            produitPharmaceutique: new FormControl(),
            pathologie: new FormControl(),
            medecin: new FormControl(),
            dateSoins: new FormControl(null, Validators.required),
            acte: new FormControl(null, Validators.required),
            familleActe: new FormControl(null, Validators.required),
            centreExecutant: new FormControl(null),
            historiqueAvenant: new FormControl(),
            montantPaye: new FormControl( ),
            adherent: new FormControl( ),
            exercice: new FormControl( ),
            bonPriseEnCharge: new FormControl( ),

            /* montantReclame: new FormControl( ),
            montantRestant: new FormControl() */
        });
    }

    closeDialog() {
        this.confirmationService.confirm({
            message: 'voulez-vous fermer le préfinancement',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.tierPayantList = [];
                this.prestationForm.reset();
                this.prestation.clear();
                console.log('******************this.prestation************************', this.prestation);
                this.displayFormPrefinancement = false;
          },
          reject:()=>{
            this.displayFormPrefinancement = true;
          }
         });
       
    }

    supprimerPrestation(prestation: Prestation) {
        this.confirmationService.confirm({
            message: 'voulez-vous supprimer la prestation',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                if(prestation.id) {
                    this.store.dispatch(featureActionTierPayant.deletePrestationTierPayant(prestation));
                    this.prestationsList =    this.prestationsList.filter(el  => el.id  !== prestation.id);

                } else {

                    this.prestationsList = this.prestationsList.filter(el  => el !== prestation);
                }
                
             //   this.prestationListPrefinancementFilter = this.prestationListPrefinancement.filter(el  => el.id  !== prestation.id);
            },
        });
    }


  
    supprimerPrefinancement() {
        console.log(this.TierPayantSelected);
        if (!this.TierPayantSelected) {
            this.showToast('error', 'INFORMATION', 'aucun tiers-payant selectionné');
        } else {
            this.confirmationService.confirm({
                message: 'voulez-vous supprimer le sinistre',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.store.dispatch(featureActionTierPayant.deleteTierPayant({tierPayant: this.TierPayantSelected}));
                    this.TierPayantSelected = [];
                }
            });
        }
    }
    onTypeActionChoose(tierPayant: SinistreTierPayant, boolean: Boolean) {
        this.typeAction = [
            {label: 'Voir Prestation', icon: 'pi pi-search', command: ($event) => {
                this.voirPrestation(tierPayant, true)
              }},
              {label: 'Editer Prestation', icon: 'pi pi-pencil', command: ($event) => {
                this.voirPrestation(tierPayant, false)
              }},
              {label: 'Valider Prestation', icon: 'pi pi-check', command: ($event) => {
                this.validerPrestation(tierPayant)
              }},
              {label: 'Imprimer Prestation', icon: 'pi pi-print', command: ($event) => {
                this.imprimer(tierPayant)
              }}
        ]
    }

    compareDateDeclarationAndDateFacture(): void {
        /* console.log('this.prestationForm.getDateFacture', this.prestationForm.get('dateFacture').value);
        console.log('this.prestationForm.getdateDeclaration', this.prestationForm.get('dateDeclaration').value); */
        if(this.prefinancement.dateDeclaration && this.prefinancement.dateFacture) {
            this.historiqueAvenantService.compareDate(this.prefinancement.dateDeclaration, this.prefinancement.dateFacture ).subscribe(
                (res) => {
                  if (res) {
                    this.addMessage('error', 'Date de déclaration invalide',
                        'La date de déclaration du sinistre ne peut pas être antérieure à celle de la facture');
                        this.prefinancement.dateDeclaration = null;
                        this.prefinancement.dateFacture = null;
                  }
                }
            );
        }
      }

      compareDateDeclarationAndToday(): void {
        /* console.log('this.prestationForm.getDateFacture', this.prestationForm.get('dateFacture').value);
        console.log('this.prestationForm.getdateDeclaration', this.prestationForm.get('dateDeclaration').value); */
        console.log("=============");
        const maDate = new Date();
        if(this.prefinancement.dateDeclaration && maDate) {
            this.historiqueAvenantService.compareDate( maDate,this.prefinancement.dateDeclaration).subscribe(
                (res) => {
                  if (res) {
                    this.addMessage('error', 'Date de déclaration invalide',
                        'La date de déclaration du sinistre ne peut pas être postérieure à celle du jour');
                        this.prefinancement.dateFacture = null;
                        this.prefinancement.dateDeclaration = null;
                  }
                }
            );
        }
      }

      addPrestation() {

        
        if(this.prefinancement.montantRestant == null ) {
            this.prefinancement.montantRestant = 0;
        }
        if(this.prefinancement.montantPaye == null ) {
            this.prefinancement.montantPaye = 0;
        }
        if(this.compteur === null){
                this.prefinancement.montantPaye = this.prefinancement.montantPaye + this.prestationAdd.montantRembourse;
               
                    this.prefinancement.montantRestant = this.prefinancement.montantReclame - this.prefinancement.montantPaye;
        
          } 

        

        
            
        
        if(this.compteur !=null) {
            this.prefinancement.montantPaye = this.prefinancement.montantPaye - this.prestationsList[this.compteur].montantRembourse;
               
            this.prefinancement.montantRestant = this.prefinancement.montantReclame - this.prefinancement.montantPaye;
            this.prestationsList[this.compteur] = this.prestationAdd;
          } else {
            this.prestationsList.push(this.prestationAdd);
          }
          this.messageService.add({severity:'success', summary:'Service Message', detail:this.montantRemboursessMsg.concat(this.prefinancement.montantPaye.toString())});
          
          this.prestationAdd = {};
          this.compteur = null;
          if(this.prestationsList?.length%10 == 0){

            this.prefinancement.prestation = this.prestationsList;
            this.tierPayantService.posTierPayant1(this.prefinancement).subscribe((rest=>{

                this.prefinancement = rest;
                this.prestationsList = this.prefinancement.prestation;
                this.store.dispatch(featureActionTierPayant.loadTierPayant());
                this.messageService.add({severity:'success', summary:'Service Message', detail:this.successMsg});

            }));
          }
        
          this.store.dispatch(featureActionBonPriseEnCharge.loadBons());
          
      }

      fermerPrestation(){
        this.prestationAdd = {};
        this.displayPrestationpop = false;
      }
      voirPrestationDetail(prestation: Prestation) {
          this.prestationDetail = prestation;
          this.displaySinistreDetail = true;
      }

      editerPrestation1(prestation: Prestation, rowIndex: number) {
        this.compteur = rowIndex;
        console.log("========prestation==============",prestation);
        this.adherentSelected = prestation?.adherent;
       
        this.tierPayantService.$findMontantConsomme(prestation.adherent.id, prestation.sousActe?.id).subscribe(rest=>{

            this.montantConsomme = rest;
           
           
        });

        this.tierPayantService.$findMontantPlafond(this.adherentSelected.id, prestation?.acte?.id).subscribe(rest=>{

            this.montantPlafond1 = rest;
           
          });

          this.prestationAdd = prestation;
          this.prestationAdd.matriculeAdherent = this.prestationAdd?.adherent?.numero.toString();
          this.prestationAdd.nomAdherent = this.prestationAdd?.adherent?.nom.concat(" ").concat(this.prestationAdd?.adherent?.prenom);
        if(this.prestationAdd.prenomAdherentPrincipal) {
         //   this.prestationAdd.prenomAdherentPrincipal = this.prestationAdd?.adherent?.adherentPrincipal?.prenom;
            this.prestationAdd.nomAdherentPrincipal = this.prestationAdd?.adherent?.adherentPrincipal?.nom.concat(" ").concat(this.prestationAdd?.adherent?.adherentPrincipal?.prenom);
        } else {
            this.prestationAdd.nomAdherentPrincipal = this.prestationAdd?.adherent?.nom.concat(" ").concat(this.prestationAdd?.adherent?.prenom);

        }
         

          this.prestationAdd.numeroGroupe = this.prestationAdd?.adherent?.groupe.numeroGroupe.toString();
          this.prestationAdd.nomGroupe = prestation.adherent?.groupe.libelle;
          this.prestationAdd.numeroPolice = this.prestationAdd?.adherent?.groupe.police.numero;
          this.prestationAdd.souscripteur = this.prestationAdd?.adherent?.groupe.police.nom;
          if(this.prestationAdd?.bonPriseEnCharge?.id !==undefined) {
            this.bonPriseEnChargeList.push(this.prestationAdd?.bonPriseEnCharge);
          }
        
         // this.onRowSelectAdherent();
         
          this.bonPriseEnChargeList = this.bonPriseEnChargeList.filter(bon=>bon?.adherent?.id === prestation?.adherent?.id 
            && bon.prestataire?.id === this.prefinancement?.prestataire?.id);
         
          this.displayPrestationpop = true;
          this.baseAnterieur = prestation.montantRembourse;
      }

      addMessage(severite: string, resume: string, detaile: string): void {
        this.messageService.add({severity: severite, summary: resume, detail: detaile});
      }

      reportSomme(){
        const formPrestation: FormGroup = this.createItem();
        formPrestation.get('montantReclame').setValue(this.prestationForm.get('montantReclame').value) 
        this.prestation.push(formPrestation);
      }

      selectDateSoins(){
        this.plafondSousActe = {};
        this.plafondSousActe.sousActe =  this.prestationAdd.sousActe; 
        this.plafondSousActe.dateSoins = this.prestationAdd.dateSoins;
        this.plafondSousActe.adherent = this.prestationAdd.adherent;
        this.conventionService.$findMontantConvention(this.prestationAdd.sousActe.id).subscribe((rest)=>{
            this.montantConvention = rest;

        });
       
        if (this.prestationAdd.sousActe && this.prestationAdd.dateSoins && this.prestationAdd.adherent){
        this.store.dispatch(featureActionPrefinancement.checkPlafond(this.plafondSousActe));
        this.store.pipe(takeUntil(this.destroy$)).subscribe((value) => {
          console.log(value);
          if (value) {
              this.prestationAdd.montantPlafond = value.prefinancementState.montantPlafondSousActe; 
              this.montantPlafond =  value.prefinancementState?.montantPlafondSousActe;
          } else {
            this.prestationAdd.sort = Sort.REJETE;
           // myForm.patchValue({montantPlafond: 0, sort: Sort.REJETE});
          } 
         /*  const myForm = (this.prestationForm.get('prestation') as FormArray).at(i);
          if (value) {
            myForm.patchValue({montantPlafond: value});
          } else {
            myForm.patchValue({montantPlafond: 0, sort: Sort.REJETE});
          } */
        });
        }
      //  console.log(this.plafondSousActe);
      }

      editerTierPayant(tierPayant: SinistreTierPayant) {
          console.log(tierPayant);

          console.log("===bonPriseEnChargeList===",this.bonPriseEnChargeList);
          this.prefinancement = tierPayant;
          this.prestataireSelected = tierPayant.prestataire;
         
          this.prefinancement.dateDeclaration = tierPayant.dateDeclaration;
          this.prefinancement.dateSaisie = new Date(tierPayant.dateSaisie);
          this.prestationsList = tierPayant.prestation;
          this.displayFormPrefinancement = true;
      }

      voirTierPyant(tierPayant: SinistreTierPayant){
        this.prefinancementDetail = tierPayant;
        this.prefinancementDetail.dateDeclaration = tierPayant.dateDeclaration;
        // this.prestationDetail = tierPayant.prestation[0];
       // console.log(tierPayant.prestation[0]?.sousActe);
          this.displayFormPrefinancementDetail = true;
      }


      imprimerPrestation(prestation: Prestation) {
        this.report.typeReporting = TypeReport.TIERPAYANT_FICHE_DETAIL_REMBOURSEMENT;
        this.report.sinistreTierPayantDTO = prestation.sinistreTierPayant;
        
        this.store.dispatch(featureActionTierPayant.FetchReportTierPayant(this.report));
      }

      compareToDateIncorportion() {

        if( new Date(this.adherentSelected.dateIncor).getTime() > new Date(this.prestationAdd.dateSoins).getTime()) {
            

            this.addMessage('error', 'Date de soins invalide',
                        'La date de soins du sinistre ne peut pas être antérieure à celle de la date d\'incorporation du sinitre');
                        this.prestationAdd.dateSoins = null;
                        
                 


        }
      }

      rechercheAdherentDateSoin(event) {
        this.prestationAdd.sort = null;
        this.prestationAdd.observation = "";
        if(this.prestationAdd.dateSoins  && this.prestationAdd.matriculeAdherent) {
          this.store.dispatch(featureActionAdherent.searchAdherentByDateSoinsAndMatricule({dateSoins:this.prestationAdd.dateSoins, matricule: Number(this.prestationAdd.matriculeAdherent)}));
      
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
    dateSoins?: Date;
    produitPharmaceutique: Array<ProduitPharmaceutique>;
}
