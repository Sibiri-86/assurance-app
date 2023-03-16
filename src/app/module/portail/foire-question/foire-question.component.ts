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
import { elementAt, takeUntil } from 'rxjs/operators';
import { SousActe, SousActeList } from 'src/app/store/parametrage/sous-acte/model';
import { Acte } from 'src/app/store/parametrage/acte/model';
import { Garantie } from 'src/app/store/parametrage/garantie/model';
import { element } from 'protractor';
import { Prestataire } from 'src/app/store/parametrage/prestataire/model';
import { Medecin } from 'src/app/store/parametrage/medecin/model';
import { ConfirmationService, MenuItem, MessageService, SelectItem } from 'primeng/api';
import { BreadcrumbService } from 'src/app/app.breadcrumb.service';
import { loadEntente, loadEntenteExclu } from 'src/app/store/parametrage/sous-acte/actions';
import { Foire } from 'src/app/store/contrat/foire/model';
import * as foireSelector from "../../../store/contrat/foire/selector";
import * as featureActionFoire from '../../../store/contrat/foire/actions';
import { loadFoireList } from 'src/app/store/contrat/foire/actions';




@Component({
  selector: 'app-foire-question',
  templateUrl: './foire-question.component.html',
  styleUrls: ['./foire-question.component.scss']
})
export class FoireQuestionComponent implements OnInit {
  displayFormPrefinancement = false;
  foireList$: Observable<Array<Foire>>;
  foireList: Array<Foire>;
  
  destroy$ = new Subject<boolean>();
  isDetail: boolean;
  
  foireSave: Foire = {};
  items: MenuItem[] = [];



  constructor( private store: Store<AppState>,   private formBuilder: FormBuilder,
               private confirmationService: ConfirmationService,  private messageService: MessageService,
            
               private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([{ label: 'Liste des questions réponses' }]);
  }

  
  ngOnInit(): void {
   

   
    this.foireList$ = this.store.pipe(select(foireSelector.selectFoireList));
    this.store.dispatch(loadFoireList());
    this.foireList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        this.foireList = value.slice();
      }
    });
    this.items = [
      {
          label: 'Options',
          items: [{
              label: 'Update',
              icon: 'pi pi-refresh',
              command: () => {
                  this.update();
              }
          },
          {
              label: 'Delete',
              icon: 'pi pi-times',
              command: () => {
                  this.delete();
              }
          }
      ]}
      
  ];
  }

  update() {
    this.displayFormPrefinancement = true;
  }
  toggle(foire: Foire) {
    console.log("=======================");
    this.foireSave = foire;
  
  }
  delete() {
    this.annulerFoire(this.foireSave);
  }
  annulerFoire(foire: Foire) {
   this.store.dispatch(featureActionFoire.deleteFoire(foire));
  }
  creerEntente() {
    this.displayFormPrefinancement = true;
    
  }


  enregistre() {
    if(this.foireSave) {
      
      this.store.dispatch(featureActionFoire.createFoire(this.foireSave));
      this.displayFormPrefinancement = false;
    }
    
  }
  
}



