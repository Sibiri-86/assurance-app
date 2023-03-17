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
import { AppState } from '../../../store/app.state';
import { elementAt, takeUntil } from 'rxjs/operators';
import { SousActe, SousActeList } from '../../../store/parametrage/sous-acte/model';
import { Acte } from '../../../store/parametrage/acte/model';
import { Garantie } from '../../../store/parametrage/garantie/model';
import { element } from 'protractor';
import { Prestataire } from '../../../store/parametrage/prestataire/model';
import { Medecin } from '../../../store/parametrage/medecin/model';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { BreadcrumbService } from '../../../app.breadcrumb.service';
import { loadEntente, loadEntenteExclu, loadNewBareme } from '../../../store/parametrage/sous-acte/actions';
import * as sousActeSelector from "../../../store/parametrage/sous-acte/selector";
import { SousActeService } from '../../../store/parametrage/sous-acte/service';
import * as featureActionsousActe from '../../../store/parametrage/sous-acte/actions';
import { PlafondService } from '../../../store/contrat/plafond/service';
import { KeycloakService } from 'keycloak-angular';
import { PlafondSousActe } from '../../../store/parametrage/plafond/model';
import * as featureActionAdherent from '../../../store/contrat/adherent/actions';
import * as adherentSelector from '../../../store/contrat/adherent/selector';
import { Adherent } from '../../../store/contrat/adherent/model';
import { Prestation } from 'src/app/store/prestation/tierPayant/model';
import { PortailService } from 'src/app/store/portail/recapitulatif/service';
import { ProduitPharmaceutiqueExcluEntite } from 'src/app/store/parametrage/produit-pharmaceutique-exclu/model';




@Component({
  selector: 'app-assure-bareme-prestataire',
  templateUrl: './assure-bareme-prestataire.component.html',
  styleUrls: ['./assure-bareme-prestataire.component.scss']
})
export class AssureBaremePrestataireComponent implements OnInit {
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
  prestationAdd: Prestation = {};
  display: boolean = false;
  username: any;
  produitPharmaceutiqueExcluList3: Array<ProduitPharmaceutiqueExcluEntite>;
  constructor( private store: Store<AppState>,   private formBuilder: FormBuilder,
               private confirmationService: ConfirmationService,  private messageService: MessageService,
               private sousActeService: SousActeService,
               private keycloakService: KeycloakService,
               private plafondService: PlafondService,
               private portailService: PortailService,
               private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([{ label: 'Carte et  barème de l\'assuré ' }]);
  }

  
  ngOnInit(): void {
   //console.log(this.keycloakService.getUsername());
   this.display = false;
   this.keycloakService.loadUserProfile().then(profile => {
    this.username = profile.username;
  });
   this.sousActeList$ = this.store.pipe(select(sousActeSelector.sousacteList));
    this.store.dispatch(loadNewBareme());
    this.sousActeList$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value) {
        console.log(this.sousActeList);
        this.sousActeList = value.slice();
      }
    });

    this.adherentSelected$ = this.store.pipe(select(adherentSelector.selectedAdherent));
    this.adherentSelected$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
        console.log(value);
        if (value) {
          this.adherent = value;
          this.display= true;
          this.images.push(this.adherent.urlPhoto);
          console.log(this.adherent);

        }
      })
   
    
    
    this.sousActeService.$getNewBaremeExclus().subscribe((rest)=>{
      if (rest) {
        this.sousActeFinalList = rest.typeSousActeDtoList;
      }
    });
    

  }

  filtrer() {
    if(this.prestationAdd) {
      this.images = [];
      this.display = false;
      this.store.dispatch(featureActionAdherent.searchAdherentByDateSoinsAndMatricule({dateSoins:new Date(), matricule: Number(this.prestationAdd.matriculeAdherent)}));
      this.plafondService.findBaremeByUserConnect(this.prestationAdd.matriculeAdherent).subscribe(
        (res) => {
          this.sousActeListPlafond = res.body;
        }
      );
      this.portailService.getAssureProduitPharmaceutiqueExcluEntiteDtoBySourcripteurAndGroupe(parseInt(this.prestationAdd.matriculeAdherent)).subscribe(
        (res) => {
            console.log('..............produitPharmaceutiqueExcluList44444444..............   ', res);
            this.produitPharmaceutiqueExcluList3 = res;
        }
  );
  

    }
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



