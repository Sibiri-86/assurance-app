import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable, Subject } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { AdherentPermute, AdherentPermuteList, HistoriqueAvenant, HistoriquePlafondActe, HistoriquePlafondFamilleActe } from 'src/app/store/contrat/historiqueAvenant/model';
import { Acte } from 'src/app/store/parametrage/acte/model';
import { Garant } from 'src/app/store/parametrage/garant/model';
import { Garantie } from 'src/app/store/parametrage/garantie/model';
import { Pays } from 'src/app/store/parametrage/pays/model';
import { PlafondFamilleActe } from 'src/app/store/parametrage/plafond/model';
import { SousActe } from 'src/app/store/parametrage/sous-acte/model';
import { Taux } from 'src/app/store/parametrage/taux/model';
import { Territorialite } from 'src/app/store/parametrage/territorialite/model';
import { Genre } from 'src/app/store/parametrage/genre/model';
import { DimensionPeriode } from 'src/app/store/parametrage/dimension-periode/model';
import { Plafond } from 'src/app/store/contrat/plafond/model';
import { FormGroup } from '@angular/forms';
import { QualiteAssure } from 'src/app/store/parametrage/qualite-assure/model';
import { Exercice } from 'src/app/store/contrat/exercice/model';
import { HistoriqueAvenantService } from 'src/app/store/contrat/historiqueAvenant/service';
import { HistoriqueAvenantAdherant } from 'src/app/store/contrat/historiqueAvenantAdherent/model';
import { Groupe } from 'src/app/store/contrat/groupe/model';
import { HistoriqueAvenantAdherentService } from 'src/app/store/contrat/historiqueAvenantAdherent/service';
import { Police } from 'src/app/store/contrat/police/model';
import { ConsommationPasse } from 'src/app/store/prestation/tierPayant/model';
import { PoliceService } from 'src/app/store/contrat/police/service';

@Component({
  selector: 'app-consommation-passe',
  templateUrl: './consommation-passe.component.html',
  styleUrls: ['./consommation-passe.component.scss']
})
export class ConsommationPasseComponent implements OnInit {

  consommations: Array<ConsommationPasse> = [];
  

  
  constructor(
      private store: Store<AppState>,
      private messageService: MessageService,
      private policeService: PoliceService,
      private confirmationService: ConfirmationService,
     
  ) { }

  ngOnInit(): void {
 
  }
 

  getAdherentFiles(event: any): void {
    
    this.policeService.loadConsommationsByExcelFile(event).subscribe(
        (res) => {
          console.log('liste des adhérents === ');
          console.log(res);
          this.consommations = res;
          
        }
    );
  }

}
