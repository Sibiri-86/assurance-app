import { Component, Input, OnInit } from '@angular/core';
import { HistoriquePlafondFamilleActe } from 'src/app/store/contrat/historiqueAvenant/model';
import { PlafondFamilleActe } from 'src/app/store/parametrage/plafond/model';

@Component({
  selector: 'app-plafond-famille-acte',
  templateUrl: './plafond-famille-acte.component.html',
  styleUrls: ['./plafond-famille-acte.component.scss']
})
export class PlafondFamilleActeComponent implements OnInit {

  @Input() historiquePlafondFamilleActePlafongConfig: Array<HistoriquePlafondFamilleActe>;
  @Input() etat: string;
  plafondFamilleActeTempPlafongConfig: PlafondFamilleActe = {};
  plafondFamilleActeConstructPlafongConfig: Array<PlafondFamilleActe> = [];

  constructor() { }

  ngOnInit(): void {
    
  }

}
