import {Component, OnDestroy, OnInit} from '@angular/core';
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

import * as ordonnanceMedicalSelector from '../../../../store/medical/ordonnance-medical/selector';
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
import {ConfirmationService, MessageService, SelectItem} from 'primeng/api';
import {Adherent} from 'src/app/store/contrat/adherent/model';
import * as featureActionAdherent from '../../../../store/contrat/adherent/actions';
import * as featureActionTierPayant from '../../../../store/prestation/tierPayant/action';
import * as tierPayantSelector from '../../../../store/prestation/tierPayant/selector';
import * as featureActionPlafond from '../../../../store/contrat/plafond/action';
import * as adherentSelector from '../../../../store/contrat/adherent/selector';
import {CheckTierPayantResult, Prestation} from 'src/app/store/prestation/tierPayant/model';
import {Status} from 'src/app/store/global-config/model';
import {status} from '../../../../store/global-config/selector';
import {TypeEtatSinistre} from '../../../common/models/enum.etat.sinistre';
import {printPdfFile} from 'src/app/module/util/common-util';
import {TypeReport} from 'src/app/store/contrat/enum/model';
import {Police, Report} from 'src/app/store/contrat/police/model';
import {SinistreTierPayant} from '../../../../store/prestation/tierPayant/model';
import {Pathologie} from '../../../../store/parametrage/pathologie/model';
import * as pathologieSelector from '../../../../store/parametrage/pathologie/selector';
import {loadPathologie} from '../../../../store/parametrage/pathologie/actions';
import {ProduitPharmaceutique} from '../../../../store/parametrage/produit-pharmaceutique/model';
import * as produitPharmaceutiqueSelector from '../../../../store/parametrage/produit-pharmaceutique/selector';
import {loadProduitPharmaceutique} from '../../../../store/parametrage/produit-pharmaceutique/actions';
import * as featureActionPrefinancement from '../../../../store/prestation/prefinancement/action';
import {PlafondActe, PlafondFamilleActe, PlafondSousActe} from '../../../../store/parametrage/plafond/model';
import {loadFamilleActeEnCours} from '../../../../store/contrat/plafond/action';
import * as prefinancementSelector from '../../../../store/prestation/prefinancement/selector';
import {CheckPrefinancementResult} from '../../../../store/prestation/prefinancement/model';
import {BreadcrumbService} from '../../../../app.breadcrumb.service';
import { CourrierPrestataire, OrdonnanceMedical, OrdonnanceMedicalProduitPharmaceutique, TypeQuantite } from 'src/app/store/medical/ordonnance-medical/model';
import * as featureActionOrdonnanceMedical from '../../../../store/medical/ordonnance-medical/actions';
import * as selectorsOrdonnanceMedicale from '../../../../store/medical/ordonnance-medical/selector';
import * as featureActionOrdonnanceMedicale from '../../../../store/medical/ordonnance-medical/actions';
import { loadPoliceAll } from 'src/app/store/contrat/police/actions';
import { policeList } from 'src/app/store/contrat/police/selector';
import { AdherentService } from 'src/app/store/contrat/adherent/service';
import { formatDate } from '@angular/common';
import { PrefinancementService } from 'src/app/store/prestation/prefinancement/service';
import { TierPayantService } from 'src/app/store/prestation/tierPayant/service';
import { Commune } from 'src/app/store/parametrage/commune/model';
import { loadCommune } from 'src/app/store/parametrage/commune/actions';
import * as communeSelector from "../../../../store/parametrage/commune/selector";






@Component({
  selector: 'app-courrier-prestataire',
  templateUrl: './courrier-prestataire.component.html',
  styleUrls: ['./courrier-prestataire.component.scss']
})
export class CourrierPrestataireComponent implements OnInit {
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
    courrierForm: FormGroup;
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
    tierPayantList: Array<SinistreTierPayant> = [];
    ordonnance: OrdonnanceMedical = {};
    courrierPrestataire : CourrierPrestataire = {}; 
    courrierPrestataires : Array<CourrierPrestataire>; 
    statusObject$: Observable<Status>;
    sinistreTierPayantDTOList$: Observable<Array<SinistreTierPayant>>;
    sinistreTierPayantDTOList: Array<SinistreTierPayant>;
    cols: any[];
    taux: Taux;
    tauxSelect: Taux;
    displayPrestation = false;
    report: Report = {};
    sousActeListFilter: Array<SousActe>;
    pathologieList: Array<Pathologie>;
    pathologieList$: Observable<Array<Pathologie>>;
    produitPharmaceutiqueList$: Observable<Array<ProduitPharmaceutique>>;
    produitPharmaceutiqueList: Array<ProduitPharmaceutique>;
    ordonnanceSelected: OrdonnanceMedical[];
    familleActeEnCours$: Observable<PlafondFamilleActe[]>;
    familleActeEnCours: Array<PlafondFamilleActe>;
    familleActeEnCour: PlafondFamilleActe;
    acteEnCours$: Observable<PlafondActe[]>;
    acteEnCours: Array<PlafondActe>;
    sousActeEnCours$: Observable<PlafondSousActe[]>;
    sousActeEnCours: Array<PlafondSousActe>;
    checkControl = true;
    displayAssure = false;
    tab: number[] = [];
    checkTierPayantResult: Array<CheckTierPayantResult>;
    isDetail: boolean;
    editForm: FormGroup;
    ordonnanceMedicalProduitPharmaceutiqueList: Array<OrdonnanceMedicalProduitPharmaceutique>;
    ordonnanceMedicaleProduit: OrdonnanceMedicalProduitPharmaceutique = {};
    ordonnanceMedicalList$: Observable<Array<OrdonnanceMedicalProduitPharmaceutique>>;
    ordonnaceMedicalProduitPharmaceutiqueDTOList: Array<OrdonnanceMedicalProduitPharmaceutique>;
    prestationListPrefinancement: Array<OrdonnanceMedical>;
    prestationListPrefinancementFilter: Array<OrdonnanceMedical>;
    prestatairePrescripteur: Array<Prestataire>;
    policeList: Array<Police>;
    communeList: Array<Commune>;
    police: Police;
    policeList$: Observable<Array<Police>>;
    commune: Commune;
    communeList$: Observable<Array<Commune>>;
    adherentsearch:  Adherent = {};
    adherentsList: Array<Adherent> = [];
    adherentsSelected: Adherent = {};
    typeQuantiteList: Array<SelectItem> = [
        {label: 'BOÎTE', value: TypeQuantite.BOITE},
        {label: 'PAQUET', value: TypeQuantite.PAQUET},
        {label: 'PLAQUETTE', value: TypeQuantite.PLAQUETTE},
        {label: 'FLACON', value: TypeQuantite.FLACON},
        {label: 'TUBE', value: TypeQuantite.TUBE},
        {label: 'UNITAIRE', value: TypeQuantite.UNITAIRE}
        ];
        dateDebut: any;
        dateFin: any;
        isDifferent: boolean;



    constructor(private store: Store<AppState>,
                private confirmationService: ConfirmationService,
                private adherentService: AdherentService,
                private formBuilder: FormBuilder, private messageService: MessageService,
                private prefinancementService: PrefinancementService,
                private breadcrumbService: BreadcrumbService,
              private tierPayantService: TierPayantService) {
        this.breadcrumbService.setItems([{ label: 'COURRIER PRESTATAIRE' }]);
    }


    rechercherAssure(): void {
        this.displayAssure = true;
      }


      addAssure(): void {
        this.displayAssure = false;
        this.adherentsList = [];
        console.log("=============this.adherentsSelected=====================");
        console.log(this.adherentsSelected);
        console.log("==========this.adherentsSelected========================");
        this.prestationForm.get('matriculeAdherent').setValue(this.adherentsSelected?.numero);
        
        if (this.adherentsSelected) {
           
            this.adherentSelected = this.adherentsSelected;
            this.prestationForm.get('nomAdherent').setValue(this.adherentSelected.nom);
            this.prestationForm.get('prenomAdherent').setValue(this.adherentSelected.prenom);
            if (this.adherentSelected.adherentPrincipal != null) {
                this.prestationForm.get('nomAssurePrin').setValue(this.adherentSelected.adherentPrincipal.nom);
                this.prestationForm.get('prenomAssurePrin').setValue(this.adherentSelected.adherentPrincipal.prenom);
            } else {
                this.prestationForm.get('nomAssurePrin').setValue(this.adherentSelected.nom);
                this.prestationForm.get('prenomAssurePrin').setValue(this.adherentSelected.prenom);
            }
            this.prestationForm.get('numeroGroupe').setValue(this.adherentSelected.groupe.numeroGroupe);
            this.prestationForm.get('numeroPolice').setValue(this.adherentSelected.groupe.police.numero);
            this.prestationForm.get('nomGroupeAdherent').setValue(this.adherentSelected.groupe.libelle);
            this.prestationForm.get('nomPoliceAdherent').setValue(this.adherentSelected.groupe.police.nom);
        
           
           
            if(this.adherentSelected.signeAdherent ==='-') {
              if((this.adherentsSelected.dateSortie === null && this.adherentsSelected.dateSuspension  !== null) || (this.adherentsSelected.dateSortie !== null && this.adherentsSelected.dateSuspension  !== null && new Date(this.adherentsSelected.dateSuspension).getTime() < new Date(this.adherentsSelected.dateSortie).getTime()
            && new Date(this.adherentsSelected.dateSortie).getTime() > new Date(this.prestationForm.value.dateSoins).getTime()) ||  new Date(this.adherentSelected?.dateSuspension).getTime() == new Date(this.prestationForm.value.dateSoins).getTime()) {
                this.addMessage('error', 'Assuré(e) non pris en compte',
                'Cet(te) assuré(e) est  suspendu(e) !!!');
                if( new Date(this.adherentSelected?.dateSuspension).getTime() < new Date(this.prestationForm.value.dateSoins).getTime() ||  new Date(this.adherentSelected?.dateSuspension).getTime() == new Date(this.prestationForm.value.dateSoins).getTime()) {
                    this.prestationForm.patchValue({
                    //  dateRetrait: new Date(this.adherentSelected.dateSortie),
                      montantRembourse : 0,
                      observation: "Cet(te) assuré(e) a  été suspendu(e)",
                      sort : Sort.REJETE
                      // sort: Sort.ACCORDE
                      });
                   
                }
                this.prestationForm.patchValue({
                  dateRetrait: new Date(this.adherentSelected.dateSuspension),
                  // sort: Sort.ACCORDE
                  });
                
            } 
            if(this.adherentsSelected.dateSortie !== null || (this.adherentsSelected.dateSuspension !=null && (new Date(this.adherentsSelected.dateSuspension)?.getTime() < new Date(this.adherentsSelected.dateSortie)?.getTime() ))) {
                this.addMessage('error', 'Assuré(e) non pris en compte',
                'Cet(te) assuré(e) est  retiré(e) !!!');
                if( new Date(this.adherentSelected?.dateSortie).getTime() < new Date(this.prestationForm.value.dateSoins).getTime() ||  new Date(this.adherentSelected?.dateSortie).getTime() == new Date(this.prestationForm.value.dateSoins).getTime()) {
                    this.prestationForm.patchValue({
                      montantRembourse : 0,
                      observation: "Cet(te) assuré(e) a  été retiré(e)",
                      sort : Sort.REJETE
                      });
                   
                }
    
                if( this.adherentSelected.dateSuspension !== null && new Date(this.adherentSelected?.dateSuspension).getTime() < new Date(this.prestationForm.value.dateSoins).getTime() ||  new Date(this.adherentSelected?.dateSuspension).getTime() == new Date(this.prestationForm.value.dateSoins).getTime()) {
                 
                  this.prestationForm.patchValue({
                    montantRembourse : 0,
                    observation: "Cet(te) assuré(e) a  été suspendu(e)",
                    sort : Sort.REJETE
                    });
      
                }
                this.prestationForm.patchValue({
                  dateRetrait: new Date(this.adherentSelected.dateSortie),
                  });
                
            } 
            }
          
         
         
          
        }
        this.adherentsearch = {};
        this.adherentsSelected = {};
      }



      addMessage(severite: string, resume: string, detaile: string): void {
        this.messageService.add({severity: severite, summary: resume, detail: detaile});
      }
      filtrer(): void {
        if(this.adherentsearch.matriculeGarant && !this.police.nom) {
          this.adherentService.searchAllAdherentByDateSoinsAndMatriculeGarant(this.prestationForm.get('dateSoins').value,this.adherentsearch.matriculeGarant).subscribe((rest)=>{
            if(rest) {
              this.adherentsList= rest;
            }
            });
        
          }
          if(!this.adherentsearch.matriculeGarant && this.police.nom) {
            this.adherentService.searchAllAdherentByDateSoinsAndSouscripteur(this.prestationForm.get('dateSoins').value,this.police.nom).subscribe((rest)=>{
              if(rest) {
                this.adherentsList= rest;
              }
              });
          }
          if(this.adherentsearch.matriculeGarant && this.police.nom) {
            this.adherentService.searchAllAdherentByDateSoinsAndSouscripteurMatriculeGarant(this.prestationForm.get('dateSoins').value,this.adherentsearch.nom, this.adherentsearch.matriculeGarant).subscribe((rest)=>{
              if(rest) {
                this.adherentsList= rest;
              }
              });
          }
        
          }

    onCreate() {
        /** Methode pour enregistrer l'ordonnance médicale*/
        if(this.courrierForm.get('id').value) {
            /** partie concernant la mise à jour */
        this.courrierPrestataire = this.courrierForm.value;
        this.courrierPrestataire.dateSaisie = this.prestationForm.get('dateSaisie').value;
        console.log('creation courrier 1 ====>', this.courrierPrestataire);
        //this.store.dispatch(featureActionOrdonnanceMedical.updateOrdonnance(this.ordonnance));
        
        } else {
            /** partie concernant la création d'un nouvel ordonnance */
        this.courrierPrestataire = this.courrierForm.value;
        this.courrierPrestataire.dateSaisie = new Date();
        /* this.ordonnance.dateSoins = this.prestationForm.get('dateSoins').value;
        this.ordonnance.adherent = this.adherentSelected;
        this.ordonnance.prescripteur = this.prestationForm.get('prescripteur').value;
        this.ordonnance.prestataire= this.prestationForm.get('prestataire').value; */
        console.log('creation courrier 2 ====>', this.courrierPrestataire);
        //this.store.dispatch(featureActionOrdonnanceMedical.createOrdonnance(this.ordonnance));
        this.tierPayantService.postCourrierPrestataire(this.courrierPrestataire).subscribe((rest)=>{
          if(rest) {
            //this.courrierPrestataires = rest;
            this.rechercherPrefinancementByPeriode();
          }
          });
        
        }
        this.courrierForm.reset();
        this.displayFormPrefinancement = false;
    }

    selectActe(){
        
    }

    addPrestation1() {
        /* this.prefinancementModel.prestation = this.prestationList;
        this.prefinancementModel.dateDeclaration = this.prestationForm.get('dateDeclaration').value;
        this.prefinancementModel.dateSoins = this.prestationForm.get('dateSoins').value;
        this.prefinancementModel.referenceBordereau = this.prestationForm.get('referenceBordereau').value;
        this.prefinancementModel.adherent = this.adherentSelected;
        this.tierPayantList.push(this.prefinancementModel); */
        this.prestationList = [];
        this.prestationForm.reset();
    }

    ngOnInit(): void {
        this.isDifferent = false;
        this.dateDebut = new Date();
        this.dateFin = new Date();
        this.prestationForm = this.formBuilder.group({
            id: new FormControl(''),
            dateSaisie: new FormControl({value: '', disabled: true}),
            nomAdherent: new FormControl({value: '', disabled: true}),
            prenomAdherent: new FormControl({value: '', disabled: true}),
            nomAssurePrin: new FormControl({value: '', disabled: true}),
            prenomAssurePrin: new FormControl({value: '', disabled: true}),
            numeroGroupe: new FormControl({value: '', disabled: true}),
            numeroPolice: new FormControl({value: '', disabled: true}),
            // prestation: this.formBuilder.array([], Validators.required),
            nomGroupeAdherent: new FormControl({value: '', disabled: true}),
            nomPoliceAdherent: new FormControl({value: '', disabled: true}),
            prestataire: new FormControl('', Validators.required),
            prescripteur: new FormControl(''),
            matriculeAdherent: new FormControl('', Validators.required),
            adherent: new FormControl(''),
            pathologie: new FormControl(''),
            dateSoins: new FormControl('',Validators.required),
            ordonnanceMedicalProduitPharmaceutiques: this.formBuilder.array([], Validators.required),
        });

        this.courrierForm = this.formBuilder.group({
            id: new FormControl(),
            prestataire: new FormControl('',  Validators.required),
            dateSaisie: new FormControl({value: '', disabled: true}),
            localite: new FormControl('',  Validators.required),
            telephone: new FormControl('',  Validators.required),
            initialAgent: new FormControl('',  Validators.required),
            //referenceCourrier: new FormControl('',  Validators.required),
            cheques: this.formBuilder.array([]),
        });


        /* createCourrierItem(): FormGroup {
            return this.formBuilder.group({
                id: new FormControl(),
                numeroCheque: new FormControl('',  Validators.required),
                numeroFacture: new FormControl('',  Validators.required),
                MontantPaye: new FormControl('',  Validators.required),
                MontantReclame: new FormControl('',  Validators.required),
                differenceMontant: new FormControl(''),
                isDifferent: new FormControl(''),
            });
        } */
      
          this.rechercherPrefinancementByPeriode();

        this.courrierForm.get('dateSaisie').setValue(new Date());
        this.store.dispatch(featureActionTierPayant.setReportTierPayant(null));
        this.store.pipe(select(tierPayantSelector.selectByteFile)).pipe(takeUntil(this.destroy$))
            .subscribe(bytes => {
                if (bytes) {
                    printPdfFile(bytes);
                }
            });

            this.policeList$ = this.store.pipe(select(policeList));
        this.store.dispatch(loadPoliceAll());
        this.policeList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
          if (value) {
            this.policeList = value.slice();
            console.log('+++++++++++this.policeList+++++++++++++');
            console.log(this.policeList);
          }
        });

        this.communeList$ = this.store.pipe(select(communeSelector.communeList));
    this.store.dispatch(loadCommune());
    this.communeList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.communeList = value.slice();
        console.log("===============commune=============");
        console.log(this.communeList);
        console.log("===============commune=============");
      }
    });

        this.adherentSelected$ = this.store.pipe(select(adherentSelector.selectedAdherent));
        this.store.dispatch(featureActionAdherent.searchAdherent({numero: 0}));
        this.adherentSelected$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
            console.log(value);
            if (value) {
                console.log(value);
                this.adherentSelected = value;
                this.prestationForm.get('nomAdherent').setValue(this.adherentSelected.nom);
                this.prestationForm.get('prenomAdherent').setValue(this.adherentSelected.prenom);
                if (this.adherentSelected.adherentPrincipal != null) {
                    this.prestationForm.get('nomAssurePrin').setValue(this.adherentSelected.adherentPrincipal.nom);
                    this.prestationForm.get('prenomAssurePrin').setValue(this.adherentSelected.adherentPrincipal.prenom);
                } else {
                    this.prestationForm.get('nomAssurePrin').setValue(this.adherentSelected.nom);
                    this.prestationForm.get('prenomAssurePrin').setValue(this.adherentSelected.prenom);
                }
                this.prestationForm.get('numeroGroupe').setValue(this.adherentSelected.groupe.numeroGroupe);
                this.prestationForm.get('numeroPolice').setValue(this.adherentSelected.groupe.police.numero);
                this.prestationForm.get('nomGroupeAdherent').setValue(this.adherentSelected.groupe.libelle);
                this.prestationForm.get('nomPoliceAdherent').setValue(this.adherentSelected.groupe.police.nom);
            }
        });

        this.tauxList$ = this.store.pipe(select(tauxSelector.tauxList));
        this.store.dispatch(loadTaux());
        this.tauxList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
          if (value) {
            this.tauxList = value.slice();
          }
    });


    this.medecinList$ = this.store.pipe(select(medecinSelector.medecinList));
    this.store.dispatch(loadMedecin());
    this.medecinList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.medecinList = value.slice();
      }
    });
        this.prestataireList$ = this.store.pipe(select(prestataireSelector.prestataireList));
        this.store.dispatch(loadPrestataire());
        this.prestataireList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
            if (value) {
                this.prestataireList = value.slice();
                this.prestatairePrescripteur = this.prestataireList.filter(ele => ele.libelleTypePrestataire &&
                    ele.libelleTypePrestataire.toUpperCase() === 'PHARMACIE');
            }
        });
       this.produitPharmaceutiqueList$ = this.store.pipe(select(produitPharmaceutiqueSelector.produitPharmaceutiqueList));
        this.store.dispatch(loadProduitPharmaceutique());
        this.produitPharmaceutiqueList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
            console.log('*********produitPharmaceutiqueList***********',value);
            if (value) {
                this.produitPharmaceutiqueList = value.slice();
            }
        });

    /**this.ordonnanceMedicalList$ = this.store.pipe(select(selectorsOrdonnanceMedicale.ordonnanceMedicalProduitPharmaceutiqueList));
    this.store.dispatch(featureActionOrdonnanceMedicale.loadOrdonnance());
    this.ordonnanceMedicalList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      console.log(value);
      if (value) {
        this.ordonnaceMedicalProduitPharmaceutiqueDTOList = value.slice();
        console.log('***************this.ordonnaceMedicalProduitPharmaceutiqueDTOList*****************', this.ordonnaceMedicalProduitPharmaceutiqueDTOList);
      }
    });*/

    this.ordonnanceMedicalList$ = this.store.pipe(select(selectorsOrdonnanceMedicale.ordonnanceMedicalProduitPharmaceutiqueList));      
    if(this.dateDebut.getTime()> this.dateFin.getTime()) {
        this.addMessage('error', 'Dates  invalide',
        'La date de debut ne peut pas être supérieure à celle du de fin');
      } else {
        this.store.dispatch(featureActionOrdonnanceMedicale.loadOrdonnancePeriode({dateD: formatDate(this.dateDebut, 'dd/MM/yyyy', 'en-fr'),
        dateF: formatDate(this.dateFin, 'dd/MM/yyyy', 'en-fr')})); 
      }

      this.ordonnanceMedicalList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
        console.log(value);
        if (value) {
          this.ordonnaceMedicalProduitPharmaceutiqueDTOList = value.slice();
          console.log("this.ordonnaceMedicalProduitPharmaceutique=================> ", this.ordonnaceMedicalProduitPharmaceutiqueDTOList);
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

        this.statusObject$ = this.store.pipe(select(status));
        this.checkStatus();
    }

    handleChange(i: number) {
        this.isDifferent = !this.isDifferent;
        console.log("this.isDifferent ====> ", this.isDifferent);
        
        let myForm = (this.courrierForm.get('cheques') as FormArray).at(i);
        //console.log('lmmmmmmmmmmmmmmmmmmmmmmmmmmmm', this.adherentSelected);   
        myForm.patchValue({taux: this.tauxSelect});
        if(this.isDifferent) {
            myForm.patchValue({
              differenceMontant: ((this.courrierForm.get('cheques').value[i].montantReclame - this.courrierForm.get('cheques').value[i].montantPaye))
                // * this.prestationForm.get('ordonnanceMedicalProduitPharmaceutiques').value[i].quantite
        })
        
    }

    }

    imprimer(courrier: CourrierPrestataire) {
        this.report.typeReporting = TypeReport.COURRIER_PRESTATAIRE;
        this.report.courrierReport = courrier;
        console.log('***************this.ordonnance*****************', courrier);
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

    voirPrestation1(pref: OrdonnanceMedical){
        console.log('///////////////////pref////////////////////////',pref);
        this.displayPrestation = true;
        this.prestationListPrefinancement = pref.ordonnanceMedicalProduitPharmaceutiques;
        this.prestationListPrefinancementFilter = this.prestationListPrefinancement;
      }

    editerPrestation(pref?: OrdonnanceMedical) {
        console.log('****************pref****************', pref);
            if (pref) {
                this.prestationForm.get('id').setValue(pref.id);
                this.prestationForm.get('dateSaisie').setValue(new Date(pref.dateSaisie));
                this.prestationForm.get('dateSoins').setValue(new Date(pref.dateSoins));
                this.prestationForm.get('matriculeAdherent').enable();
                this.prestationForm.get('adherent').patchValue(pref.adherent);
                this.prestationForm.get('prestataire').enable();
                this.prestationForm.get('prescripteur').setValue(pref.prescripteur);
                this.prestationForm.get('matriculeAdherent').setValue(pref.adherent.numero);
                this.prestationForm.get('nomAdherent').setValue(pref.adherent.nom);
                this.prestationForm.get('prenomAdherent').setValue(pref.adherent.prenom);
                if (pref.adherent.adherentPrincipal != null) {
                    this.prestationForm.get('nomAssurePrin').setValue(pref.adherent.adherentPrincipal.nom);
                    this.prestationForm.get('prenomAssurePrin').setValue(pref.adherent.adherentPrincipal.prenom);
                } else {
                    this.prestationForm.get('nomAssurePrin').setValue(pref.adherent.nom);
                    this.prestationForm.get('prenomAssurePrin').setValue(pref.adherent.prenom);
                }
                //this.prestationForm.get('nomAssurePrin').setValue(pref?.adherent?.adherentPrincipal?.nom);
                // this.prestationForm.get('prenomAssurePrin').setValue(pref?.adherent?.adherentPrincipal?.prenom);
                this.prestationForm.get('numeroGroupe').setValue(pref.adherent.groupe.numeroGroupe);
                this.prestationForm.get('numeroPolice').setValue(pref.adherent.groupe.police.numero);
                this.prestationForm.get('prestataire').setValue(this.prestataireList.find(p => p.id === pref.prestataire.id));
                this.prestationForm.get('pathologie').setValue(this.pathologieList.find(p => p.id === pref?.pathologie?.id))
                console.log('***************pref.prestataire.libelle******************', pref.prestataire);
                this.prestationForm.get('nomGroupeAdherent').setValue(pref.adherent.groupe.libelle);
                this.prestationForm.get('nomPoliceAdherent').setValue(pref.adherent.groupe.police.nom);
                // this.prestationForm.get('dateSoins').setValue(new Date(pref.dateSoins));
                this.prestationForm.get('dateSaisie').setValue(new Date(pref.dateSaisie));
                this.prestationForm.get('dateSoins').setValue(pref.dateSoins);
                this.adherentSelected = pref.adherent;

                for (const pr of pref.ordonnanceMedicalProduitPharmaceutiques) {
                    const formPrestation: FormGroup = this.createItem();
                    formPrestation.patchValue(pr);
                    formPrestation.get('typeQuantite').setValue(pr.typeQuantite);
                    this.ordonnanceMedicalProduitPharmaceutiques.push(formPrestation);
                    console.log('*****this.ordonnanceMedicalProduitPharmaceutiques*******', this.ordonnanceMedicalProduitPharmaceutiques); 
                    console.log('prestation', this.prestationForm);
                }
                if (this.isDetail) {
                    this.courrierForm.disable({onlySelf: false, emitEvent: true});
                }
            }
            this.displayFormPrefinancement = true;


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
        this.adherentSelected = null;
        this.store.dispatch(featureActionAdherent.searchAdherentByDateSoinsAndMatricule({dateSoins:this.prestationForm.get('dateSoins').value, matricule: event.target.value}));

    }

    rechercheAdherentDateSoin(event) {
        if(this.prestationForm.get('dateSoins').value  && this.prestationForm.get('matriculeAdherent').value) {
          this.store.dispatch(featureActionAdherent.searchAdherentByDateSoinsAndMatricule({dateSoins:this.prestationForm.get('dateSoins').value, matricule: this.prestationForm.get('matriculeAdherent').value}));
      
        }
      }

    // valider TierPayant
    validerTierPayant() {
        console.log('********************this.tierPayantList**************************', this.tierPayantList);
        this.store.dispatch(featureActionTierPayant.createTierPayant({tierPayant: this.tierPayantList}));
        this.tierPayantList = [];
        this.prestationList = [];
        this.prestationForm.reset();
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
        // this.ordonnanceMedicalProduitPharmaceutiques.clear();
        this.prestationForm.get('matriculeAdherent').enable();
        this.prestationForm.get('prestataire').enable();
        this.prestationForm.get('dateSaisie').setValue(new Date());
        this.isDetail = false;
        this.isModif = true;
        this.displayFormPrefinancement = true;
    }

    showToast(severity: string, summary: string, detail: string) {
        this.messageService.add({severity, summary, detail});
    }

    checkStatus() {
        this.statusObject$.pipe(takeUntil(this.destroy$)).subscribe((statusObj) => {
            if (statusObj) {
                this.showToast(statusObj.status, 'INFORMATION', statusObj.message);
            }
        });
    }

    get ordonnanceMedicalProduitPharmaceutiques() {
        return this.prestationForm.controls.ordonnanceMedicalProduitPharmaceutiques as FormArray;
    }

    get cheques() {
        return this.courrierForm.controls.cheques as FormArray;
    }

    addItemPrestation(): void {
        /* const formPrestation: FormGroup = this.createItem();
        this.ordonnanceMedicalProduitPharmaceutiques.push(formPrestation); */
        const formCheque: FormGroup = this.createItem();
        this.cheques.push(formCheque);
        this.isDifferent = false;
    }

    deleteItemPrestation(i: number) {
        this.cheques.removeAt(i);
    }

    createItem(): FormGroup {
        return this.formBuilder.group({
            id: new FormControl(),
            numeroCheque: new FormControl('',  Validators.required),
            numeroFacture: new FormControl('',  Validators.required),
            montantPaye: new FormControl('',  Validators.required),
            montantReclame: new FormControl('',  Validators.required),
            differenceMontant: new FormControl(''),
            isDifferent: new FormControl(''),
        });
    }

    closeDialog() {
        this.tierPayantList = [];
        this.prestationForm.reset();
        this.ordonnanceMedicalProduitPharmaceutiques.clear();
        console.log('******************this.prestation************************', this.ordonnanceMedicalProduitPharmaceutiques);
        this.displayFormPrefinancement = false;
    }

    supprimerOrdonnanceProduit(prestation: OrdonnanceMedicalProduitPharmaceutique) {
        this.confirmationService.confirm({
            message: 'voulez-vous supprimer ce produit',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.store.dispatch(featureActionOrdonnanceMedical.deleteOrdonnanceMedicalProduit(prestation));
                // this.prestationListPrefinancementFilter = this.prestationListPrefinancement.filter(el  => el.id  !== prestation.id);
            },
        });
    }

    supprimerOrdonnance() {
        console.log(this.ordonnanceSelected);
        if (!this.ordonnanceSelected) {
            this.showToast('error', 'INFORMATION', 'aucune ordonnance médicale selectionnée');
        } else {
            this.confirmationService.confirm({
                message: 'voulez-vous supprimer cette selection ???',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.store.dispatch(featureActionOrdonnanceMedical.deleteOrdonnanceMedical({ordonnance: this.ordonnanceSelected}));
                    this.ordonnanceSelected = [];
                }
            });
        }
    }
    calculTaux() {
      this.prefinancementService.findTauxSousActe(this.adherentSelected.groupe.id, "62c6bd1c100c61638b86e261", this.adherentSelected?.id).subscribe((rest)=>{
        if(rest) {
          this.tauxSelect = rest;
        } else {
          this.tauxSelect = {};
        }
        
      });
    }

    calculMontant(i:number) {
        let myForm = (this.prestationForm.get('ordonnanceMedicalProduitPharmaceutiques') as FormArray).at(i);
        console.log('lmmmmmmmmmmmmmmmmmmmmmmmmmmmm', this.adherentSelected);   
        myForm.patchValue({taux: this.tauxSelect});
        if(this.prestationForm.get('ordonnanceMedicalProduitPharmaceutiques').value[i].declaration 
        && this.prestationForm.get('ordonnanceMedicalProduitPharmaceutiques').value[i].quantite) {
            myForm.patchValue({
                montantRembourse: (((this.prestationForm.get('ordonnanceMedicalProduitPharmaceutiques').value[i].declaration * this.prestationForm.get('ordonnanceMedicalProduitPharmaceutiques').value[i].quantite) * this.tauxSelect.taux) / 100)
                // * this.prestationForm.get('ordonnanceMedicalProduitPharmaceutiques').value[i].quantite
        })
        
    }

}

rechercherPrefinancementByPeriode() {
    if(this.dateDebut.getTime()> this.dateFin.getTime()) {
        this.addMessage('error', 'Dates  invalide',
        'La date de debut ne peut pas être supérieure à celle du de fin');
      } else {
        this.tierPayantService.$getCourriersByPeriode(formatDate(this.dateDebut, 'dd/MM/yyyy', 'en-fr'),
          formatDate(this.dateFin, 'dd/MM/yyyy', 'en-fr')).subscribe((rest)=>{
            if(rest) {
              this.courrierPrestataires = rest;
              console.log("courriers ",this.courrierPrestataires);
            }
            });
        
        /* this.store.dispatch(featureActionOrdonnanceMedicale.loadOrdonnancePeriode({dateD: formatDate(this.dateDebut, 'dd/MM/yyyy', 'en-fr'),
        dateF: formatDate(this.dateFin, 'dd/MM/yyyy', 'en-fr')}));  */
      }
    /* if(this.dateDebut.getTime()> this.dateFin.getTime()) {
      this.addMessage('error', 'Dates  invalide',
      'La date de debut ne peut pas être supérieure à celle du de fin');
    } else {
      this.store.dispatch(featureActionBonPriseEnCharge.loadBonPriseEnChargePeriode({dateD: formatDate(this.dateDebut, 'dd/MM/yyyy', 'en-fr'),
      dateF: formatDate(this.dateFin, 'dd/MM/yyyy', 'en-fr')}));
    } */
    
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
