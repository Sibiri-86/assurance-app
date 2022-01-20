import {Component, Input, OnInit} from '@angular/core';
import {Adherent, AdherentFamille} from '../../../../store/contrat/adherent/model';

@Component({
  selector: 'app-adherent-list',
  templateUrl: './adherent-list.component.html',
  styleUrls: ['./adherent-list.component.scss']
})
export class AdherentListComponent implements OnInit {
  @Input() adherentFamilleList: Array<AdherentFamille>;
  @Input() listeAdherent: Array<Adherent>;
  adherentList: Array<Adherent>;

  constructor() { }

  ngOnInit(): void {
    this.adherentList = [];
    this.createAdherents();
  }
  createAdherents(): void {
    if (this.adherentFamilleList) {
      console.log('--------this.adherentFamilleList.length------');
      console.log(this.adherentFamilleList);
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
    if (this.listeAdherent) {
      console.log('--------listeAdherent------');
      console.log(this.listeAdherent.length);
      this.adherentList = this.listeAdherent;
    }
  }

}
