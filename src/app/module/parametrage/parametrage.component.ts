import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { Component, OnInit, ViewChild} from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { DATA_DEFINITION, DATA_TYPE } from './parameters.data';
import {Validations, EntityValidations } from '../common/models/validation';
import { DropdownSelector } from '../common/models/model';
import { select, Store } from '@ngrx/store';
import { AppState} from 'src/app/store/app.state';
import {Status, StatusEnum} from '../../store/global-config/model';
import {status} from '../../store/global-config/selector';

@Component({
  selector: 'app-parametrage',
  templateUrl: './parametrage.component.html',
  styleUrls: ['./parametrage.component.scss']
})
export class ParametrageComponent implements OnInit {

  destroy$ = new Subject<boolean>();
  dataTypes = DATA_TYPE;
  dataDefinitions = DATA_DEFINITION;
  editForm: FormGroup;
  selectedDataType: any;
  selectedDataDef: any;
  selectedDataDefList$: Observable<Array<any>>;
  selectedDataDefList: Array<any>;
  cols: any[];
  entityValidations: EntityValidations[];
  editedObj: any;
  dropdownSelectorsList: Array<DropdownSelector>;
  dropdownObservableObj = {};
  clonedRefObj: { [s: string]: any; } = {};
  loading: boolean;
  objKey = 'id';
  bf: any;
  displayDialog: boolean;
  statusObject$: Observable<Status>;

  constructor(private formBuilder: FormBuilder,
    private store: Store<AppState>, private messageService: MessageService) { }

  ngOnInit(): void {
    this.dropdownSelectorsList = [];
    this.statusObject$ = this.store.pipe(select(status));
    this.checkStatus();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onTypeChange(event) {
    if (this.editForm) {
      this.editForm = null;
    }
    if (event.value) {
      console.log(event.value);
      this.selectedDataType = this.dataTypes.find(dataType => dataType.value === event.value);
      if (this.selectedDataType) {
        this.selectedDataDef = this.dataDefinitions.find(df => df.entity === event.value);
        if (this.selectedDataDef) {
          this.selectedDataDefList$ = this.store.pipe(select(this.selectedDataDef.store.select));
          this.selectedDataDefList$.pipe(takeUntil(this.destroy$))
            .subscribe(value => {
              if (value) {
                this.annulerSaisie();
                this.selectedDataDefList = value.slice();
              }
            });
          this.store.dispatch(this.selectedDataDef.store.fetchAction);
          this.editForm = this.formBuilder.group({});
          this.cols = this.selectedDataDef.cols;
          this.entityValidations = this.selectedDataDef.entityValidations;
          this.cols.forEach(col => {
            const control = new FormControl('', col.validators);
            this.editForm.addControl(col.field, control);

            if (col.dropdownEntries) {
              this.dropdownSelectorsList.push({field: col.field, dropdownEntries: col.dropdownEntries});
            } else if (col.dropObj) {
              this.dropdownSelectorsList.push(col.dropObj);
            }
          });
          this.setDropdownObservableObj();
        }
      }
    } else {
      this.onInputDroped();
    }

  }


  setDropdownObservableObj() {
    if (this.dropdownSelectorsList) {
      console.log('dropdown');
      this.dropdownSelectorsList.forEach((dropdownSelector: DropdownSelector) => {
        // when the action is given and the dropdownEntries should be built
        if (dropdownSelector.action) {
          this.store.dispatch(dropdownSelector.action);
          this.store.pipe(select(dropdownSelector.selector)).pipe(takeUntil(this.destroy$))
            .subscribe(objList => {
              if (objList) {
                const values = objList.slice();
                const dropdownEntries: SelectItem[] = [];
                values.forEach((entry: any) => {
                  dropdownEntries.push({
                    label: entry[dropdownSelector.optionLabel],
                    value: entry[dropdownSelector.key]
                  });
                });
                this.dropdownObservableObj[dropdownSelector.field] = dropdownEntries;
                console.log(this.dropdownObservableObj);
              }
            });
        } else {
          // when the dropdownEntries is given directly as object
          this.dropdownObservableObj[dropdownSelector.field] = dropdownSelector.dropdownEntries;
        }
      });
    }
  }

  upload(event){
    //this.file = event.files[0];
   this.store.dispatch(this.selectedDataDef.store.importAction({file: event.files[0]}));
   //this.service.pushFileToStorage(event.files [0]);
  }

  checkStatus() {
    this.statusObject$.pipe(takeUntil(this.destroy$))
        .subscribe(statusObj => {
          if (statusObj) {
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

  showToast(severity: string, summary: string, detail: string) {
    this.messageService.add({severity, summary, detail});
  }

  onCreate() {
    const savedObj = this.editForm.value;
    console.log(savedObj);
    this.store.dispatch(this.selectedDataDef.store.createAction(savedObj));
  }

  openNew() {
    this.displayDialog = true;
  }

  onRowEditInit(refObj: any, columns: Array<any>) {
    this.clonedRefObj[refObj[this.objKey]] = {...refObj};
    console.log(this.clonedRefObj);
  }

  onRowEditSave(refObj: any) {
    let message = '';
    let exist = 0;
    const data: any = this.clonedRefObj[refObj[this.objKey]];
    console.log(data);
    this.store.dispatch(this.selectedDataDef.store.updateAction(data));
  }

  onRowEditCancel(refObj: any, index: number) {
    delete this.clonedRefObj[refObj[this.objKey]];
  }

  onDelete(rowData) {
    this.store.dispatch(this.selectedDataDef.store.deleteAction(rowData));
  }

  annulerSaisie() {
    this.editedObj = null;
    if (this.editForm) {
      this.editForm.reset();
    }
  }

  onInputDroped() {
    this.selectedDataDefList$ = of([]);
  }

}

