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
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { BreadcrumbService } from 'src/app/app.breadcrumb.service';
import { loadEntente, loadEntenteExclu, loadNewBareme } from 'src/app/store/parametrage/sous-acte/actions';
import * as sousActeSelector from "../../../store/parametrage/sous-acte/selector";
import { SousActeService } from 'src/app/store/parametrage/sous-acte/service';
import * as featureActionsousActe from '../../../store/parametrage/sous-acte/actions';
import { PlafondService } from 'src/app/store/contrat/plafond/service';
import { KeycloakService } from 'keycloak-angular';
import { PlafondSousActe } from 'src/app/store/parametrage/plafond/model';
import { Adherent } from 'src/app/store/contrat/adherent/model';
import * as featureActionAdherent from '../../../store/contrat/adherent/actions';
import * as adherentSelector from '../../../store/contrat/adherent/selector';




@Component({
  selector: 'app-assure-bareme',
  templateUrl: './assure-bareme.component.html',
  styleUrls: ['./assure-bareme.component.scss']
})
export class AssureBaremeComponent implements OnInit {
  displayFormPrefinancement = false;
  sousActeList$: Observable<Array<SousActe>>;
  sousActeList: Array<SousActe>;
  sousActeFinalList$: Observable<Array<SousActe>>;
  sousActeFinalList: Array<SousActe>;
  destroy$ = new Subject<boolean>();
  isDetail: boolean;
  selectsousActe: SousActe[] = [];
  sousActeListSave: SousActeList = {};
  sousActeListPlafond: PlafondSousActe[]= [];
  adherent: Adherent = {};
  adherentSelected$: Observable<Adherent>;
  images: any[];


  constructor( private store: Store<AppState>,   private formBuilder: FormBuilder,
               private confirmationService: ConfirmationService,  private messageService: MessageService,
               private sousActeService: SousActeService,
               private keycloakService: KeycloakService,
               private plafondService: PlafondService,
               private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([{ label: 'Barème ' }]);
  }

  
  ngOnInit(): void {
   //console.log(this.keycloakService.getUsername());
   this.sousActeList$ = this.store.pipe(select(sousActeSelector.sousacteList));
    this.store.dispatch(loadNewBareme());
    this.sousActeList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        console.log(this.sousActeList);
        this.sousActeList = value.slice();
      }
    });

    this.adherentSelected$ = this.store.pipe(select(adherentSelector.selectedAdherent));
        this.store.dispatch(featureActionAdherent.searchAdherentByDateSoinsAndMatricule({dateSoins:new Date(), matricule: 2}));;

    this.adherentSelected$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
        console.log(value);
        if (value) {
          this.adherent = value;
          this.images.push(this.adherent.urlPhoto);
          console.log(this.adherent);

        }
      })
      this.keycloakService.loadUserProfile().then(profile => {
        this.plafondService.findBaremeByUserConnect(profile.username).subscribe(
          (res) => {
            this.sousActeListPlafond = res.body;
          }
        );
      });
   
    
    
    this.sousActeService.$getNewBaremeExclus().subscribe((rest)=>{
      if (rest) {
        this.sousActeFinalList = rest.typeSousActeDtoList;
      }
    });
    

  }

  onRowUnselectSinistre(event){
    //console.log(event);
    // this.selectsousActe = this.selectsousActe.filter(sous=>sous !== event.value)
   
  }


  onRowSelectSinistre(event) {
    //this.selectsousActe.push(event.value);
    console.log(this.selectsousActe);
  }
  annulerPrestation(sousActe: SousActe) {
   this.store.dispatch(featureActionsousActe.deleteEntente(sousActe));
  }
  creerEntente() {
    this.displayFormPrefinancement = true;
    this.sousActeService.$getNewBaremeExclus().subscribe((rest)=>{
      if (rest) {
        this.sousActeFinalList = rest.typeSousActeDtoList;
      }
    });
  }


  enregistre() {
    if(this.selectsousActe) {
      this.sousActeListSave.typeSousActeDtoList = this.selectsousActe;
      this.store.dispatch(featureActionsousActe.createNewBareme(this.sousActeListSave));
      this.selectsousActe = [];
      this.displayFormPrefinancement = false;
    }
    
  }
  
}



