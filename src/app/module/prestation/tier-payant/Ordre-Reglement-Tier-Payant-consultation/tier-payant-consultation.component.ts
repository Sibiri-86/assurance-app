import { OrdreReglement } from 'src/app/store/prestation/prefinancement/model';
import { Dialog } from 'primeng/dialog/dialog';
import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {OrdreReglementTierPayant} from '../../../../store/prestation/tierPayant/model';


@Component({
  selector: 'app-tier-payant-ordre-reglement-consultation',
  templateUrl: './tier-payant-consultation.component.html',
  styleUrls: ['./tier-payant-consultation.component.scss']
})
export class TierPayantConsultationComponent implements OnInit {
  @Input()
  ordreReglement: OrdreReglementTierPayant;
  @Input()
  showDialog = false;
  @Output()
  desactiveDialog: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {

  }

  showDialogPlafondMaximized(dialog: Dialog) {
    dialog.maximized = true;
  }

  closeDialog(){
    this.desactiveDialog.emit(false);
    // this.showDialog = false;
  }
}
