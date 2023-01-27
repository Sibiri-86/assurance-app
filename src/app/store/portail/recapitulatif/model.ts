import { Groupe } from "src/app/store/contrat/groupe/model";
import { Garant } from "src/app/store/parametrage/garant/model";
import { Adherent } from "../../contrat/adherent/model";
import { Garantie } from "../../parametrage/garantie/model";
import { Pathologie } from "../../parametrage/pathologie/model";
import { Prestataire } from "../../parametrage/prestataire/model";
import { Prestation } from "../../prestation/prefinancement/model";


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

export interface DepenseFamille {
    adherent?: Adherent;
    adherentP?: Adherent;
    age?: number;
    nature?: string;
    totalMontantReclame?: number;
    totalMontantRembourse?: number;
    prestationList?:Array<Prestation>;
    familleActe?: Garantie;
    nombreActe?: number;
    montantRembourse?: number;
    coutMoyen?: number;
    taux?: number;
    nombreActePrecedent?: number;
    montantRemboursePrecedent?: number;
    coutMoyenPrecedent?: number;
    totalMontantRemboursePrecendet?: number;
    tauxPrecedent?: number;
    prestataire?: Prestataire ;
    pathologie?: Pathologie ;
    totalMontantReclameFamille?: number;
    totalMontantRembourseFamille?: number;
    boolFamille?:boolean;
    boolGeneral?:boolean;
    informationPrincipal?:boolean;
    boolPrincipal?:boolean;
    adherentId?:number;
    dateDebut?: Date;
    dateFin?: Date;
}