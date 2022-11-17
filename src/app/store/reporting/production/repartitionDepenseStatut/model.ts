import { Garant } from "src/app/store/parametrage/garant/model";
import { Recapitulatif } from "../recapitulatif/model";


export interface RepartitionDepenseStatut {
    id?: string;
    nombrePopulationAssure?: string; 
    nombrePopulationConjoint?: string;
    nombrePopulationEnfant?: string; 
    nombrePopulationTotal?: string; 
    pourcentagePopulationAssure?: string;
    pourcentagePopulationConjoint?: string;
    pourcentagePopulationEnfant?: string;
    pourcentagePopulationTotal?: string;
    ageMoyenAssure?: number;
    ageMoyenConjoint?: number;
    ageMoyenEnfant?: number;
    totalAgeMoyen?: number;
    nombreBeneficiaireTraiteAssure?: number;
    nombreBeneficiaireTraiteConjoint?: number;
    nombreBeneficiaireTraiteEnfant?: number;
    nombreBeneficiaireTraiteTotal?: number;
    pourcentageBeneficiaireTraiteAssure?: number;
    pourcentageBeneficiaireTraiteConjoint?: number;
    pourcentageBeneficiaireTraiteEnfant?: number;
    pourcentageBeneficiaireTraiteTotal?: number;
    montantDepensePeriodeAssure?: number;
    montantDepensePeriodeConjoint?: number;
    montantDepensePeriodeEnfant?: number;
    montantDepensePeriodeTotal?: number;
    pourcentageDepensePeriodeTotal?: number;
    pourcentageDepensePeriodeAssure?: number;
    pourcentageDepensePeriodeConjoint?: number;
    pourcentageDepensePeriodeEnfant?: number;
    coutMoyentAssure?: number;
    coutMoyentConjoint?: string;
    coutMoyentEnfant?: string;
    dateDebut?: Date;
    dateFin?: Date;
}


export interface RecapitulatifList {
    recapitulatif: Array<Recapitulatif>;
}