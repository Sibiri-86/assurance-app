import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-plafond-component',
  templateUrl: './plafond.component.html',
  styleUrls: ['./plafond.component.scss']
})
export class PlafondComponent implements OnInit {

  @Output() plafandEvent = new EventEmitter();
  plafondForm: FormGroup;
  isInternationalGroupe = false;

  constructor(private formBuilder: FormBuilder) {
    this.init();
  }

  init(): void {
    this.plafondForm = this.formBuilder.group({
      // domaine: new FormControl({}),
      plafondAnnuelleFamille: new FormControl(''),
      plafondAnnuellePersonne: new FormControl(''),
      plafondGlobalInternationnal: new FormControl(''),
      plafondGlobalEvacuationSanitaire: new FormControl('')
    });
  }

  ngOnInit(): void {}

  emitPlafandEvent($event: any) {
    const plafond = $event.value;
    console.log(plafond);
    this.emitPlafandEvent(plafond);
    this.init();
  }
}
