import { TypeEtatOrdreReglement } from 'src/app/module/common/models/emum.etat.ordre-reglement';
import { Adherent } from '../../contrat/adherent/model';
import { Police } from '../../contrat/police/model';
import { Medecin } from '../../parametrage/medecin/model';
import { Prestataire } from '../../parametrage/prestataire/model';
import { SousActe } from '../../parametrage/sous-acte/model';
import { Taux } from '../../parametrage/taux/model';
import {OrdreReglement} from '../prefinancement/model';

export interface Sinistre {
    referenceSinistreGarant?: string;
    police?: string;
}


export interface OrdreReglementTierPayantList {
    ordreReglementTierPayantDTOList?: Array<OrdreReglementTierPayant>;
}

export interface OrdreReglementTierPayant{
    id?: string;
    numero?: string;
    numeroBordereau?: string;
    police?: Police;
    tierPayant?: Array<SinistreTierPayant>;
    etat?: TypeEtatOrdreReglement;
}

export interface SinistreTierPayant {
    id?: string;
    dateSoins?: Date;
    referenceBordereau?: string;
    dateDeclaration?: Date;
    dateSaisie?: Date;
    adherent?: Adherent;
    numeroSinistre?: string;
    ordreReglementTierPayant?: OrdreReglementTierPayant;
    prestation?: Array<Prestation>;
}

export interface Prestation {
    id?: string;
    coutUnitaire?: number;
    debours?: number;
    baseRemboursement?: number;
    taux?: Taux;
    montantRembourse?: number;
    observation?: string;
    sousActe?: SousActe;
    prestataire?: Prestataire;
    medecin?: Medecin;
    dateSoins?: Date;
}

export interface SinistreTierPayantList {
    sinistreTierPayantDTOList: Array<SinistreTierPayant>;
}
