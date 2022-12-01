import { Groupe } from "src/app/store/contrat/groupe/model";
import { Police } from "src/app/store/contrat/police/model";
import { Garant } from "src/app/store/parametrage/garant/model";
import { Prestataire } from "src/app/store/parametrage/prestataire/model";
import { TypePrestataire } from "src/app/store/parametrage/type-prestataire/model";


export interface ConsommationParSexe {
    id?: string;
    nombrePopulation?: number;
    nombrePopulationTotal?: number;
    pourcentagePopulation?: number;
    pourcentagePopulationTotal?: number;
    ageMoyen?: number;
    totalAgeMoyen?: number;
    nombreBeneficiaireTraite?: number;
    nombreBeneficiaireTraiteTotal?: number;
    pourcentageBeneficiaireTraite?: number;
    pourcentageBeneficiaireTraiteTotal?: number;
    montantDepensePeriode?: number;
    montantDepensePeriodeTotal?: number;
    pourcentageDepensePeriodeTotal?: number;
    pourcentageDepensePeriode?: number;
    coutMoyent?: number;
    coutMoyentTotal?: number;
    dateDebut?: Date;
    dateFin?: Date;
}


