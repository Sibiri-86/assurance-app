import { TypeEtatOrdreReglement, Workflow } from 'src/app/module/common/models/emum.etat.ordre-reglement';
import { Sort } from 'src/app/module/common/models/sort.enum';
import { TypeBon } from 'src/app/module/medical/enumeration/bon.enum';
import { Adherent } from '../../contrat/adherent/model';
import { Prestataire } from '../../parametrage/prestataire/model';
import { TypePaiement } from '../../prestation/prefinancement/model';
import { Prestation } from '../../prestation/tierPayant/model';


export interface BonPrestataireList {
    bonPrestataireDtoList?: Array<BonPrestataire>;
}

export interface BonPrestataire {
    id?: string;
    dateSaisie?: Date;
    prestataire?: Prestataire;
    adherent?: Adherent;
    prestations?: Prestation[];
    prestationProduits?: Prestation[];
    
}








