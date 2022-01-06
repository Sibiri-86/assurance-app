import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Taux} from '../../../../../store/parametrage/taux/model';
import {Garant} from '../../../../../store/contrat/garant/model';
import {QualiteAssure} from '../../../../../store/parametrage/qualite-assure/model';
import {Status as Etat} from '../../../../common/models/etat.enum';
import {PlafondFamilleActe} from '../../../../../store/parametrage/plafond/model';
import {DimensionPeriode} from '../../../../../store/parametrage/dimension-periode/model';

@Component({
  selector: 'app-plafond-famille-acte',
  templateUrl: './plafond-famille-acte.component.html',
  styleUrls: ['./plafond-famille-acte.component.scss']
})
export class PlafondFamilleActeComponent implements OnInit {

  tauxList$: Observable<Array<Taux>>;
  tauxList: Array<Taux>;
  garantList$: Observable<Array<Garant>>;
  garantList: Array<Garant>;
  qualiteAssureList: Array<QualiteAssure>;
  qualitePrincipalList: Array<QualiteAssure>;
  membreList: Array<QualiteAssure>;
  qualiteAssureList$: Observable<Array<QualiteAssure>>;
  typeEtat = Object.keys(Etat).map(key => ({ label: Etat[key], value: key }));
  @Input() plafondFamilleActe: PlafondFamilleActe[];
  dimensionPeriodeList$: Observable<Array<DimensionPeriode>>;
  dimensionPeriodeList: Array<DimensionPeriode>;

  constructor() { }

  ngOnInit(): void {
  }

}
