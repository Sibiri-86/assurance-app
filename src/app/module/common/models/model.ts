import { SelectItem } from 'primeng/api';
import {Input} from '@angular/core';

export interface DropdownSelector {
  action?: any; // [Optional] define an select action when you need to get the data from the database
  selector?: any; // [Optional] define an selector to select the data from the store
  key?: string; // [Optional] define the key of the json object
  field: string; // [Mandatory] define the column of the view table to map
  optionLabel?: string; // [Mandatory] define the column of the view table to map
  dropdownEntries?: SelectItem[]; // [Optional] define directly your dropdown list
}

export interface NextPageObj {
  showButtonTooltip: string; // tooltip of the button
  nextStepUrl: string; // URL to go to the next step
  nextStepIndex: number; // index of the next step
  filterLabelKey: string; // define the label to see in the dropdown
  filterKey: string; // define the key of the object of the dropdown
}
