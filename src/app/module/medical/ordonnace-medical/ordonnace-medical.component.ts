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
import {loadSousActe} from '../../../store/parametrage/sous-acte/actions';
import * as sousActeSelector from '../../../store/parametrage/sous-acte/selector';
import {takeUntil} from 'rxjs/operators';
import {SousActe} from 'src/app/store/parametrage/sous-acte/model';
import {Taux} from '../../../store/parametrage/taux/model';
import {loadTaux} from '../../../store/parametrage/taux/actions';
import * as tauxSelector from '../../../store/parametrage/taux/selector';
import {Sort} from '../../common/models/sort.enum';
import {loadGarantie} from '../../../store/parametrage/garantie/actions';
import * as garantieSelector from '../../../store/parametrage/garantie/selector';
import * as plafondSelector from '../../../store/contrat/plafond/selector';

import {loadPrestataire} from '../../../store/parametrage/prestataire/actions';
import * as prestataireSelector from '../../../store/parametrage/prestataire/selector';

import * as ordonnanceMedicalSelector from '../../../store/medical/ordonnance-medical/selector';
import * as tierPayantActions from '../../../store/prestation/tierPayant/action';

import {loadMedecin} from '../../../store/parametrage/medecin/actions';
import * as medecinSelector from '../../../store/parametrage/medecin/selector';
import {medecinList} from '../../../store/parametrage/medecin/selector';

import {loadActe} from '../../../store/parametrage/acte/actions';
import * as acteSelector from '../../../store/parametrage/acte/selector';

import {Acte} from 'src/app/store/parametrage/acte/model';
import {Garantie} from 'src/app/store/parametrage/garantie/model';
import {element} from 'protractor';
import {Prestataire} from 'src/app/store/parametrage/prestataire/model';
import {Medecin} from 'src/app/store/parametrage/medecin/model';
import {ConfirmationService, MessageService, SelectItem} from 'primeng/api';
import {Adherent} from 'src/app/store/contrat/adherent/model';
import * as featureActionAdherent from '../../../store/contrat/adherent/actions';
import * as featureActionTierPayant from '../../../store/prestation/tierPayant/action';
import * as featureActionPlafond from '../../../store/contrat/plafond/action';
import * as adherentSelector from '../../../store/contrat/adherent/selector';
import {CheckTierPayantResult, Prestation} from 'src/app/store/prestation/tierPayant/model';
import {Status} from 'src/app/store/global-config/model';
import {status} from '../../../store/global-config/selector';
import {TypeEtatSinistre} from '../../common/models/enum.etat.sinistre';
import {printPdfFile} from 'src/app/module/util/common-util';
import {TypeReport} from 'src/app/store/contrat/enum/model';
import {Report} from 'src/app/store/contrat/police/model';
import {SinistreTierPayant} from '../../../store/prestation/tierPayant/model';
import {Pathologie} from '../../../store/parametrage/pathologie/model';
import * as pathologieSelector from '../../../store/parametrage/pathologie/selector';
import {loadPathologie} from '../../../store/parametrage/pathologie/actions';
import {ProduitPharmaceutique} from '../../../store/parametrage/produit-pharmaceutique/model';
import * as produitPharmaceutiqueSelector from '../../../store/parametrage/produit-pharmaceutique/selector';
import {loadProduitPharmaceutique} from '../../../store/parametrage/produit-pharmaceutique/actions';
import * as featureActionPrefinancement from '../../../store/prestation/prefinancement/action';
import {PlafondActe, PlafondFamilleActe, PlafondSousActe} from '../../../store/parametrage/plafond/model';
import {loadFamilleActeEnCours} from '../../../store/contrat/plafond/action';
import * as prefinancementSelector from '../../../store/prestation/prefinancement/selector';
import {CheckPrefinancementResult} from '../../../store/prestation/prefinancement/model';
import {BreadcrumbService} from '../../../app.breadcrumb.service';
import { OrdonnanceMedical, OrdonnanceMedicalProduitPharmaceutique, TypeQuantite } from 'src/app/store/medical/ordonnance-medical/model';
import * as featureActionOrdonnanceMedical from '../../../store/medical/ordonnance-medical/actions';
import * as selectorsOrdonnanceMedicale from '../../../store/medical/ordonnance-medical/selector';
import * as featureActionOrdonnanceMedicale from '../../../store/medical/ordonnance-medical/actions';





@Component({
  selector: 'app-ordonnace-medical',
  templateUrl: './ordonnace-medical.component.html',
  styleUrls: ['./ordonnace-medical.component.scss']
})
export class OrdonnaceMedicalComponent implements OnInit {
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
    adherentSelected$: Observable<Adherent>;
    medecinListFilter: Array<SelectItem>;
    tierPayantList: Array<SinistreTierPayant> = [];
    ordonnance: OrdonnanceMedical = {};
    statusObject$: Observable<Status>;
    sinistreTierPayantDTOList$: Observable<Array<SinistreTierPayant>>;
    sinistreTierPayantDTOList: Array<SinistreTierPayant>;
    cols: any[];
    taux: Taux;
    displayPrestation = false;
    report: Report = {};
    sousActeListFilter: Array<SousActe>;
    pathologieList: Array<Pathologie>;
    pathologieList$: Observable<Array<Pathologie>>;
    produitPharmaceutiqueList$: Observable<Array<ProduitPharmaceutique>>;
    produitPharmaceutiqueList: Array<ProduitPharmaceutique>;
    TierPayantSelected: SinistreTierPayant[];
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
    ordonnanceMedicalProduitPharmaceutiqueList: Array<OrdonnanceMedicalProduitPharmaceutique>;
    ordonnanceMedicaleProduit: OrdonnanceMedicalProduitPharmaceutique = {};
    ordonnanceMedicalList$: Observable<Array<OrdonnanceMedicalProduitPharmaceutique>>;
    ordonnaceMedicalProduitPharmaceutiqueDTOList: Array<OrdonnanceMedicalProduitPharmaceutique>;
    prestationListPrefinancement: Array<OrdonnanceMedical>;
    prestationListPrefinancementFilter: Array<OrdonnanceMedical>;

    typeQuantiteList: any = [
        {libelle: 'BOÎTE', value: TypeQuantite.BOITE},
        {libelle: 'PAQUET', value: TypeQuantite.PAQUET},
        {libelle: 'PLAQUETTE', value: TypeQuantite.PLAQUETTE},
        {libelle: 'FLACON', value: TypeQuantite.FLACON},
        {libelle: 'TUBE', value: TypeQuantite.TUBE},
        {libelle: 'UNITAIRE', value: TypeQuantite.UNITAIRE}
        ];



    constructor(private store: Store<AppState>,
                private confirmationService: ConfirmationService,
                private formBuilder: FormBuilder, private messageService: MessageService,
                private breadcrumbService: BreadcrumbService) {
        this.breadcrumbService.setItems([{ label: 'Ordonnance Médical' }]);
    }

    onCreate() {
        /** fonction pour enregistrer la prestation */
        console.log('creation tierPayant');
        this.ordonnance = this.prestationForm.value;
        this.ordonnance.dateSaisie = new Date();
        this.ordonnance.adherent = this.adherentSelected;
        this.ordonnance.prescripteur = this.prestationForm.get('prescripteur').value;
        this.ordonnance.prestataire= this.prestationForm.get('prestataire').value;
        this.ordonnance.ordonnanceMedicalProduitPharmaceutiques.forEach(element => { const el: any = element.typeQuantite;
            element.typeQuantite = el.value;
            console.log('******************element.typeQuantite********************', element.typeQuantite);
        });
        this.store.dispatch(featureActionOrdonnanceMedical.createOrdonnance(this.ordonnance));
        console.log('******************this.ordonnance********************', this.ordonnance);
        this.prestationForm.reset();
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
        this.prestationForm = this.formBuilder.group({
            id: new FormControl(),
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
            prescripteur: new FormControl('', Validators.required),
            matriculeAdherent: new FormControl('', Validators.required),
            ordonnanceMedicalProduitPharmaceutiques: this.formBuilder.array([], Validators.required),
        });

        this.prestationForm.get('dateSaisie').setValue(new Date());
        this.store.dispatch(featureActionOrdonnanceMedical.setReportOrdonnance(null));
        this.store.pipe(select(ordonnanceMedicalSelector.selectByteFile)).pipe(takeUntil(this.destroy$))
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

        this.prestataireList$ = this.store.pipe(select(prestataireSelector.prestataireList));
        this.store.dispatch(loadPrestataire());
        this.prestataireList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
            if (value) {
                this.prestataireList = value.slice();
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

    this.ordonnanceMedicalList$ = this.store.pipe(select(selectorsOrdonnanceMedicale.ordonnanceMedicalProduitPharmaceutiqueList));
    this.store.dispatch(featureActionOrdonnanceMedicale.loadOrdonnance());
    this.ordonnanceMedicalList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      console.log(value);
      if (value) {
        this.ordonnaceMedicalProduitPharmaceutiqueDTOList = value.slice();
        console.log('***************this.ordonnaceMedicalProduitPharmaceutiqueDTOList*****************', this.ordonnaceMedicalProduitPharmaceutiqueDTOList);
      }
    });

        this.statusObject$ = this.store.pipe(select(status));
        this.checkStatus();
    }

    imprimer(ordonnance: OrdonnanceMedical) {
        this.report.typeReporting = TypeReport.ORDONNANCEMEDICALE;
        this.report.ordonnanceMedical = ordonnance;
        console.log('***************this.ordonnance*****************', ordonnance);
        this.store.dispatch(featureActionOrdonnanceMedical.FetchReportOrdonnance(this.report));
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
        // this.prestationForm.get('dateSoins').setValue(new Date(pref.dateSoins));
        this.prestationForm.get('dateSaisie').setValue(new Date(pref.dateSaisie));
        for (const pr of pref.prestation) {
            const formPrestation: FormGroup = this.createItem();
            formPrestation.patchValue(pr);
            this.ordonnanceMedicalProduitPharmaceutiques.push(formPrestation);
        }
        console.log('****************pref.prestation****************', pref.prestation);
        this.displayFormPrefinancement = true;
    }

    voirPrestation1(pref: OrdonnanceMedical){
        console.log('///////////////////pref////////////////////////',pref);
        this.displayPrestation = true;
        this.prestationListPrefinancement = pref.ordonnanceMedicalProduitPharmaceutiques;
        this.prestationListPrefinancementFilter = this.prestationListPrefinancement;
      }

    voirPrestation(pref?: SinistreTierPayant, isDetail?: boolean) {
        console.log('****************pref****************', pref);
        console.log('****************isDetail****************', isDetail);
        if (this.displayFormPrefinancement) {
            this.displayFormPrefinancement = false;
            this.isDetail = false;
            this.prestationForm.reset();
            this.prestationForm.enable({onlySelf: false, emitEvent: true});
            
        } else {
            if (pref) {
                this.isDetail = isDetail;
                this.prestationForm.get('dateFacture').enable();
                this.prestationForm.get('numeroFacture').enable();
                this.prestationForm.get('matriculeAdherent').enable();
                this.prestationForm.get('dateDeclaration').enable();
                this.prestationForm.get('prestataire').enable();
                this.prestationForm.get('matriculeAdherent').setValue(pref.adherent.numero);
                this.prestationForm.get('nomAdherent').setValue(pref.adherent.nom);
                this.prestationForm.get('prenomAdherent').setValue(pref.adherent.prenom);
                this.prestationForm.get('nomAssurePrin').setValue(pref.adherent.adherentPrincipal.nom);
                this.prestationForm.get('prenomAssurePrin').setValue(pref.adherent.adherentPrincipal.prenom);
                this.prestationForm.get('numeroGroupe').setValue(pref.adherent.groupe.numeroGroupe);
                this.prestationForm.get('numeroPolice').setValue(pref.adherent.groupe.police.numero);
                this.prestationForm.get('prestataire').setValue(this.prestataireList.find(p => p.id === pref.prestataire.id));
                console.log('***************pref.prestataire.libelle******************', pref.prestataire);
                this.prestationForm.get('dateDeclaration').setValue(new Date(pref.dateDeclaration));
                this.prestationForm.get('dateFacture').setValue(new Date(pref.dateFacture));
                this.prestationForm.get('numeroFacture').setValue(pref.numeroFacture);
                this.prestationForm.get('nomGroupeAdherent').setValue(pref.adherent.groupe.libelle);
                this.prestationForm.get('nomPoliceAdherent').setValue(pref.adherent.groupe.police.nom);
                // this.prestationForm.get('dateSoins').setValue(new Date(pref.dateSoins));
                this.prestationForm.get('dateSaisie').setValue(new Date(pref.dateSaisie));
                for (const pr of pref.prestation) {
                    const formPrestation: FormGroup = this.createItem();
                    formPrestation.patchValue(pr);
                    this.ordonnanceMedicalProduitPharmaceutiques.push(formPrestation);
                }
                if (this.isDetail) {
                    this.prestationForm.disable({onlySelf: false, emitEvent: true});
                }
            }
            this.displayFormPrefinancement = true;
        }


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
        this.store.dispatch(featureActionAdherent.searchAdherent({numero: event.target.value}));
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

    addItemPrestation(): void {
        const formPrestation: FormGroup = this.createItem();
        this.ordonnanceMedicalProduitPharmaceutiques.push(formPrestation);
    }

    deleteItemPrestation(i: number) {
        this.ordonnanceMedicalProduitPharmaceutiques.removeAt(i);
    }

    createItem(): FormGroup {
        return this.formBuilder.group({
            id: new FormControl(),
            quantite: new FormControl(null, Validators.required),
            observation: new FormControl(null, Validators.required),
            /* prestataire: new FormControl(),
            centreExecutant: new FormControl(null), */
            pharmaceutique: new FormControl(),
            dateSaisie: new FormControl(null),
            typeQuantite: new FormControl(null, [Validators.required]),
        });
    }

    closeDialog() {
        this.tierPayantList = [];
        this.prestationForm.reset();
        this.ordonnanceMedicalProduitPharmaceutiques.clear();
        console.log('******************this.prestation************************', this.ordonnanceMedicalProduitPharmaceutiques);
        this.displayFormPrefinancement = false;
    }

   /*  supprimerPrestation(prestation: Prestation) {
        this.confirmationService.confirm({
            message: 'voulez-vous supprimer la prestation',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.store.dispatch(featureActionTierPayant.deletePrestationTierPayant(prestation));
                this.prestationListPrefinancementFilter = this.prestationListPrefinancement.filter(el  => el.id  !== prestation.id);
            },
        });
    } */

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
