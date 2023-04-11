import { TypeEtatOrdreReglement, Workflow } from 'src/app/module/common/models/emum.etat.ordre-reglement';
import { Sort } from 'src/app/module/common/models/sort.enum';
import { TypeBon } from 'src/app/module/medical/enumeration/bon.enum';
import { Adherent } from '../../contrat/adherent/model';
import { TypePaiement } from '../../prestation/prefinancement/model';


export interface RemboursementList {
    remboursementDtoList?: Array<Remboursement>;
}

export interface Remboursement {
    id?: string;
    numero?: string;
    dateSaisie?: Date;
    dateDeclaration?: Date;
    adherent?: Adherent;
    typePaiement?: TypePaiement;
    numeroOrange?: string;
    numeroMobicash?: string;
    numeroVirement?: string;
    nomBenefiniciaire?: string;
    files?: File[];
    documents?: DocumentFacture[];
    validePrestation?: boolean;
    valideMedical?: boolean;

   
}

export interface DocumentFacture {
    nom?: string;
    url?: string;
}






