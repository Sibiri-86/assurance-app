import { Groupe } from "src/app/store/contrat/groupe/model";
import { Garant } from "src/app/store/parametrage/garant/model";


export interface Recapitulatif {
    id?: string;
    police?: string;
    souscripteur?: string;
    dateEffet?: Date;
    dateEcheance?: Date;
    effectif?: string;
    primeNette?: number;
    primeAcquise?: number;
    sinistre?: number;
    sinistreSurPrime?: string;
    resultatTechnique?: number;
    observation?: string;
    datePrime?: Date;
    idGarant?: Garant;
    groupe?: Groupe;
    dateDebut?: Date;
    policeId?: string;
    groupeId?: string;
    garantId?: string;
}

export interface ConsommationParFamille {
    /* matriculeAdherentP?: number;
    montantReclameFamille?: number;
    montantRembourseFamille?: number;
    montantNonRembourseFamille?: number;
    PopulationActive?: number;
    PopulationTraitee?: number;
    totalMontantReclame?: number;
    totalMontantRembourse?: number;
    coutMoyenFamille?: number;
    coutMoyenTotal?: number; */
    garantId?: string;
    policeId?: string;
    groupeId?: string;
    dateDebut?: Date;
    dateFin?: Date;
}


export interface RecapitulatifList {
    recapitulatif: Array<Recapitulatif>;
}