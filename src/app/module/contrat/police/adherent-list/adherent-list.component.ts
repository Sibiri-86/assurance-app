import {Component, Input, OnInit} from '@angular/core';
import {Adherent, AdherentFamille} from '../../../../store/contrat/adherent/model';

@Component({
  selector: 'app-adherent-list',
  templateUrl: './adherent-list.component.html',
  styleUrls: ['./adherent-list.component.scss']
})
export class AdherentListComponent implements OnInit {
  @Input() adherentFamilleList: Array<AdherentFamille>;
  adherentList: Array<Adherent>;

  constructor() { }

  ngOnInit(): void {
    this.adherentList = [];
    console.log('--------this.adherentFamilleList.length------');
    console.log(this.adherentFamilleList);
    this.createAdherents();
  }
  createAdherents(): void {
    if (this.adherentFamilleList.length) {
      this.adherentFamilleList.forEach(adherentFamille => {
        this.adherentList.push(adherentFamille.adherent);
        if (adherentFamille.famille) {
          adherentFamille.famille.forEach(ayantDroit => {
            ayantDroit.adherentPrincipal = adherentFamille.adherent;
            this.adherentList.push(ayantDroit);
          });
        }
      });
    }
  }

}
