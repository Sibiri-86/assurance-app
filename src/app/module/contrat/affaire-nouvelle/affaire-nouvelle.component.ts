import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
@Component({
  selector: 'app-affaire-nouvelle',
  templateUrl: './affaire-nouvelle.component.html',
  styleUrls: ['./affaire-nouvelle.component.scss']
})
export class AffaireNouvelleComponent implements OnInit {
  activeIndex: number = 0;
  items: MenuItem[];
  constructor() { }

  ngOnInit(): void {

    this.items = [{
      label: 'souscripteur',
      routerLink: '/contrat/affaire-nouvelle/souscripteur',
      command: () => {
        this.activeIndex = 0;
      }
    },
    {
      label: 'police',
      routerLink: '/contrat/affaire-nouvelle/police',
      command: () => {
        this.activeIndex = 1;
      }
    }
];
   
  }

}
