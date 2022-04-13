import { Component, Input, OnInit } from '@angular/core';
import { HistoriquePlafondActe } from 'src/app/store/contrat/historiqueAvenant/model';

@Component({
  selector: 'app-plafond-acte',
  templateUrl: './plafond-acte.component.html',
  styleUrls: ['./plafond-acte.component.scss']
})
export class PlafondActeComponent implements OnInit {

  @Input() historiquePlafondActes: HistoriquePlafondActe[];
  @Input() etat: string;

  constructor() { }

  ngOnInit(): void {
    console.log('plafond groupe acte ==== ', this.historiquePlafondActes);
  }

}
