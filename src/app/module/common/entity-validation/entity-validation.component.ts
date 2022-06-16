import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EntityValidations } from '../models/validation';

@Component({
  selector: 'app-entity-validation',
  templateUrl: './entity-validation.component.html',
  styleUrls: ['./entity-validation.component.scss']
})
export class EntityValidationComponent implements OnInit {

  @Input() entityValidations?: EntityValidations[];
  @Input() entityField?: string;
  @Input() formGroup: FormGroup;

  constructor() {
  }

  ngOnInit() {
  }

}
