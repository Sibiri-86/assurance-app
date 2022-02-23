import { OrdreReglement } from 'src/app/store/prestation/prefinancement/model';
import { Dialog } from 'primeng/dialog/dialog';
import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-ordre-reglement-consultation',
  templateUrl: './ordre-reglement-consultation.component.html',
  styleUrls: ['./ordre-reglement-consultation.component.scss']
})
export class OrdreReglementConsultationComponent implements OnInit {
  @Input()
  ordreReglement: OrdreReglement;
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
    //this.showDialog = false;
  }
}
