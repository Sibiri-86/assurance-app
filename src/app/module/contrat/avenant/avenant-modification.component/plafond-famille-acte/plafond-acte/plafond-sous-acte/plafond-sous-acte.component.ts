
import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Taux} from '../../../../../../../store/parametrage/taux/model';
import {Garant} from '../../../../../../../store/contrat/garant/model';
import {QualiteAssure} from '../../../../../../../store/parametrage/qualite-assure/model';
import {Status as Etat} from '../../../../../../common/models/etat.enum';

@Component({
  selector: 'app-plafond-sous-acte',
  templateUrl: './plafond-sous-acte.component.html',
  styleUrls: ['./plafond-sous-acte.component.scss']
})
export class PlafondSousActeComponent implements OnInit {

  tauxList$: Observable<Array<Taux>>;
  tauxList: Array<Taux>;
  garantList$: Observable<Array<Garant>>;
  garantList: Array<Garant>;
  qualiteAssureList: Array<QualiteAssure>;
  qualitePrincipalList: Array<QualiteAssure>;
  membreList: Array<QualiteAssure>;
  qualiteAssureList$: Observable<Array<QualiteAssure>>;
  typeEtat = Object.keys(Etat).map(key => ({ label: Etat[key], value: key }));

  constructor() { }

  ngOnInit(): void {
  }

}