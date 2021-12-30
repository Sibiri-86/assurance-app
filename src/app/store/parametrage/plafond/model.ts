import { Garantie } from '../garantie/model';
import { DimensionPeriode } from '../dimension-periode/model';
import { Acte } from '../acte/model';
import { SousActe } from '../sous-acte/model';
import { Taux } from '../taux/model';
import { QualiteAssure } from '../qualite-assure/model';
import { Etat } from 'src/app/module/common/models/model';
import { Status } from 'src/app/module/common/models/etat.enum';

export interface PlafondFamilleActe {
    id?: string;
    garantie?: Garantie;
    montantPlafond?: number;
    dimensionPeriode?: DimensionPeriode;
    dateEffet?: Date;
    taux?: Taux;
    nombre?: number;
    listeActe?: Array<PlafondActe>;
    domaine?: Array<QualiteAssure>;
    etat?: Status;
  }

export interface PlafondActe {
    id?: string;
    acte?: Acte;
    montantPlafond?: number;
    dateEffet?: Date;
    taux?: Taux;
    dimensionPeriode?: DimensionPeriode;
    nombre?: number;
    listeSousActe?: Array<PlafondSousActe>;
    etat?: Status;
  }

export interface PlafondSousActe {
    id?: string,
    sousActe?: SousActe;
    taux?: Taux;
    dateEffet?: Date;
    montantPlafond?: number;
    montantPlafondParActe?: number;
    dimensionPeriode?: DimensionPeriode;
    nombre?: number;
    etat?: Status;
}
