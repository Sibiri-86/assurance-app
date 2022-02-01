import {Component, OnInit} from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {
    ControlContainer,
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
import {ConfirmationService, MessageService, SelectItem} from 'primeng/api';
import {Adherent} from 'src/app/store/contrat/adherent/model';
import * as featureActionAdherent from '../../../../store/contrat/adherent/actions';
import * as featureActionTierPayant from '../../../../store/prestation/tierPayant/action';
import * as adherentSelector from '../../../../store/contrat/adherent/selector';
import {Prefinancement, Prestation} from 'src/app/store/prestation/prefinancement/model';
import {Status} from 'src/app/store/global-config/model';
import {status} from '../../../../store/global-config/selector';
import {TypeEtatSinistre} from '../../../common/models/enum.etat.sinistre';
import {printPdfFile} from 'src/app/module/util/common-util';
import {TypeReport} from 'src/app/store/contrat/enum/model';
import {Report} from 'src/app/store/contrat/police/model';
import {SinistreTierPayant} from '../../../../store/prestation/tierPayant/model';


@Component({
    // tslint:disable-next-line:component-selector
    selector: 'app-tierPayant',
    templateUrl: './tierPayant-edition.component.html',
    styleUrls: ['./tierPayant-edition.component.scss']
})
export class TierPayantEditionComponent implements OnInit {
    displayFormPrefinancement = false;
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
    prefinancementModel: SinistreTierPayant = {};
    statusObject$: Observable<Status>;
    sinistreTierPayantDTOList$: Observable<Array<SinistreTierPayant>>;
    sinistreTierPayantDTOList: Array<SinistreTierPayant>;
    cols: any[];
    taux: Taux;
    displayPrestation = false;
    prestationListPrefinancement: Array<Prestation>;
    report: Report = {};

    constructor(private store: Store<AppState>,
                private confirmationService: ConfirmationService,
                private formBuilder: FormBuilder, private messageService: MessageService) {
    }

    onCreate() {

    }

    ngOnInit(): void {
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
            nomAdherent: new FormControl({value: '', disabled: true}),
            prestataire: new FormControl(''),
            prenomAdherent: new FormControl({value: '', disabled: true}),
            medecin: new FormControl(''),
            numeroGroupe: new FormControl({value: '', disabled: true}),
            numeroPolice: new FormControl({value: '', disabled: true})
        });

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
                console.log(value);
                this.adherentSelected = value;
                this.prestationForm.get('nomAdherent').setValue(this.adherentSelected.nom);
                this.prestationForm.get('prenomAdherent').setValue(this.adherentSelected.prenom);
                this.prestationForm.get('numeroGroupe').setValue(this.adherentSelected.groupe.numeroGroupe);
                this.prestationForm.get('numeroPolice').setValue(this.adherentSelected.groupe.police.numero);
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

        this.statusObject$ = this.store.pipe(select(status));
        this.checkStatus();
    }

    imprimer(pref: SinistreTierPayant) {
        this.report.typeReporting = TypeReport.TIERPAYANT_FICHE_DETAIL_REMBOURSEMENT;
        this.report.sinistreTierPayantDTO = pref;
        this.store.dispatch(featureActionTierPayant.FetchReportTierPayant(this.report));
    }

    /* validerPrestation(pref: Prefinancement) {
      this.confirmationService.confirm({
        message: 'voulez-vous valider le sinistre',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.store.dispatch(featureActionPrefinancement.updateEtatValiderPrefinancement({prefinancement: pref,
            etat: TypeEtatSinistre.VALIDE}));
        },
      });

    } */

    editerPrestation(pref: SinistreTierPayant) {
        this.prestationForm.get('referenceBordereau').setValue(pref.referenceBordereau);
        this.prestationForm.get('matriculeAdherent').setValue(pref.adherent.numero);
        this.prestationForm.get('nomAdherent').setValue(pref.adherent.nom);
        this.prestationForm.get('prenomAdherent').setValue(pref.adherent.prenom);
        this.prestationForm.get('numeroGroupe').setValue(pref.adherent.groupe.numeroGroupe);
        this.prestationForm.get('numeroPolice').setValue(pref.adherent.groupe.police.numero);
        this.prestationForm.get('dateDeclaration').setValue(new Date(pref.dateDeclaration));
        this.prestationForm.get('dateSoins').setValue(new Date(pref.dateSoins));
        this.prestationList = pref.prestation;
        console.log('****************pref.prestation****************', pref.prestation);
        this.displayFormPrefinancement = true;
    }

    voirPrestation(pref: SinistreTierPayant) {
        this.displayPrestation = true;
        this.prestationListPrefinancement = pref.prestation;
    }

    calculCoutDebours(data: FraisReels, ri: number) {
        console.log(this.prestationList);
        console.log(data);
        this.prestationList[ri].debours = data.coutUnitaire * Number(data.nombreActe);
        this.prestationList[ri].baseRemboursement = this.prestationList[ri].debours;
        this.prestationList[ri].montantRembourse = this.prestationList[ri].baseRemboursement * (this.prestationList[ri].taux.taux / 100);
    }

    rechercherAdherent(event) {
        console.log(event.target.value);
        this.prestationForm.get('nomAdherent').setValue('');
        this.prestationForm.get('prenomAdherent').setValue('');
        this.prestationForm.get('numeroGroupe').setValue('');
        this.prestationForm.get('numeroPolice').setValue('');
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

    // permet d'enregistrer une prestation par famille
    addPrestation() {
        this.prefinancementModel.prestation = this.prestationList;
        this.prefinancementModel.dateDeclaration = this.prestationForm.get('dateDeclaration').value;
        this.prefinancementModel.dateSoins = this.prestationForm.get('dateSoins').value;
        this.prefinancementModel.referenceBordereau = this.prestationForm.get('referenceBordereau').value;
        this.prefinancementModel.adherent = this.adherentSelected;
        this.tierPayantList.push(this.prefinancementModel);
        this.prestationList = [];
        this.prestationForm.reset();
    }

    changeGarantie(garantie) {
        console.log(garantie);
        this.acteListFilter = this.acteList.filter(element => element.idTypeGarantie === garantie.value.id);
    }

    newRowPrestation() {
        return {taux: this.taux};
    }

    addTierPayant() {
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