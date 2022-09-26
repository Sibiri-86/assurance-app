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
import { takeUntil } from 'rxjs/operators';

import * as prefinancementSelector from '../../../store/prestation/prefinancement/selector';



import { Acte } from 'src/app/store/parametrage/acte/model';
import { Garantie } from 'src/app/store/parametrage/garantie/model';
import { element } from 'protractor';
import { Prestataire } from 'src/app/store/parametrage/prestataire/model';
import { Medecin } from 'src/app/store/parametrage/medecin/model';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { Adherent } from 'src/app/store/contrat/adherent/model';

import { OrdreReglement, OrdreReglementList, Prefinancement, Prestation } from 'src/app/store/prestation/prefinancement/model';

import { TypeEtatOrdreReglement } from 'src/app/module/common/models/emum.etat.ordre-reglement';
import { printPdfFile } from 'src/app/module/util/common-util';
import { Report } from 'src/app/store/contrat/police/model';
import { TypeReport } from 'src/app/store/contrat/enum/model';
import { BreadcrumbService } from 'src/app/app.breadcrumb.service';
import * as featureActionPrefinancement from '../../../store/prestation/prefinancement/action';
import * as banqueSelector from '../../../store/parametrage/Banques/selector';
import * as featureActionBanque from '../../../store/parametrage/Banques/actions';
import { Banque } from 'src/app/store/parametrage/Banques/model';

@Component({
  selector: 'app-remboursement-effectue',
  templateUrl: './remboursement-effectue.component.html',
  styleUrls: ['./remboursement-effectue.component.scss']
})
export class RemboursementEffectueComponent implements OnInit {
  destroy$ = new Subject<boolean>();
  ordreReglementList: Array<OrdreReglement>;
  ordreReglementList$: Observable<Array<OrdreReglement>>;
  cols: any[];
  displaySinistre = false;
  prefinancement: Array<Prefinancement>;
  report: Report = {};
  displayPaiement = false;
  ordreReglementPaiement: OrdreReglement;
  banqueList$: Observable<Array<Banque>>;
  banqueList: Array<Banque>;

  constructor( private store: Store<AppState>,
               private confirmationService: ConfirmationService,
               private formBuilder: FormBuilder,  private messageService: MessageService,  private breadcrumbService: BreadcrumbService) {
     this.breadcrumbService.setItems([{ label: 'Remboursement effectué' }]);
}

  ngOnInit(): void {
    this.store.dispatch(featureActionPrefinancement.setReportPrestation(null));
    this.store.pipe(select(prefinancementSelector.selectByteFile)).pipe(takeUntil(this.destroy$))
    .subscribe(bytes => {
        if (bytes) {
                printPdfFile(bytes);
        }
    });

    this.ordreReglementList$ = this.store.pipe(select(prefinancementSelector.ordreReglementList));
    this.store.dispatch(featureActionPrefinancement.loadOrdrePaiementValide());
    this.ordreReglementList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      console.log(value);
      if (value) {
        this.ordreReglementList = value.slice();
    }
    });

    this.banqueList$ = this.store.pipe(select(banqueSelector.banqueList));
    this.store.dispatch(featureActionBanque.loadBanque());
    this.banqueList$.pipe(takeUntil(this.destroy$)).subscribe((banque) => {
      
      if (banque) {
     
        this.banqueList = banque.slice();
        
       
      }
    });
  }

 

  imprimer(pref: OrdreReglement) {
    this.report.typeReporting = TypeReport.ORDRE_REGLEMENT;
    this.report.ordreReglementDto = pref;
    this.store.dispatch(featureActionPrefinancement.FetchReportPrestation(this.report));
  }
  deValiderPayement(ordre: OrdreReglement) {
    this.confirmationService.confirm({
      message: 'voulez-vous annuler ce remboursement',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(featureActionPrefinancement.paiementChequeCaisseDevalider({ordre}));
      },
    });
  }
  voirSinistre(ordre: OrdreReglement) {
    this.displaySinistre = true;
    this.prefinancement = ordre.prefinancement;
  }

}
