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


@Component({
  selector: 'app-ordre-paiement-instance',
  templateUrl: './ordre-paiement-instance.component.html',
  styleUrls: ['./ordre-paiement-instance.component.scss']
})
export class OrdrePaimentInstanceComponent implements OnInit {
  destroy$ = new Subject<boolean>();
  ordreReglementList: Array<OrdreReglement>;
  ordreReglementList$: Observable<Array<OrdreReglement>>;
  cols: any[];
  displaySinistre = false;
  prefinancement: Array<Prefinancement>;
  report: Report = {};

  constructor( private store: Store<AppState>,
               private confirmationService: ConfirmationService,
               private formBuilder: FormBuilder,  private messageService: MessageService,  private breadcrumbService: BreadcrumbService) {
     this.breadcrumbService.setItems([{ label: 'Ordre de paiement en espèce instance' }]);
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
    this.store.dispatch(featureActionPrefinancement.loadOrdrePaiementInstance());
    this.ordreReglementList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      console.log(value);
      if (value) {
        this.ordreReglementList = value.slice();
    }
    });
  }

  

  imprimer(pref: OrdreReglement) {
    this.report.typeReporting = TypeReport.ORDRE_REGLEMENT;
    this.report.ordreReglementDto = pref;
    this.store.dispatch(featureActionPrefinancement.FetchReportPrestation(this.report));
  }

  paiemrntEspece(ordre: OrdreReglement) {
    this.store.dispatch(featureActionPrefinancement.validerPaiementEspece({ordre: ordre}));
    this.store.dispatch(featureActionPrefinancement.loadOrdrePaiementInstance());
  }

  voirSinistre(ordre: OrdreReglement) {
    this.displaySinistre = true;
    this.prefinancement = ordre.prefinancement;
  }

}
