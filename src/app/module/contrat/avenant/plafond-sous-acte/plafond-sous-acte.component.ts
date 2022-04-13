import { Component, Input, OnInit } from '@angular/core';
import { HistoriquePlafondSousActe } from 'src/app/store/contrat/historiqueAvenant/model';

@Component({
  selector: 'app-plafond-sous-acte',
  templateUrl: './plafond-sous-acte.component.html',
  styleUrls: ['./plafond-sous-acte.component.scss']
})
export class PlafondSousActeComponent implements OnInit {

  @Input() historiquePlafondSousActes: HistoriquePlafondSousActe[];

  constructor() { }

  ngOnInit(): void {
  }

}
