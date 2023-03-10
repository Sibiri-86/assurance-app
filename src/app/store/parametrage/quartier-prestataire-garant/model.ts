import { Garant } from "../garant/model";
import { Prestataire } from "../prestataire/model";
import { Quartier } from "../quartier/model";

export interface QuartierPrestataireGarant {
    id?: string,
    quartier?: Quartier,
    garant?: Garant,
    prestataires?: Prestataire[],
}

export interface QuartierPrestataireGarantList {
    quartierPrestataireGarantDtoList: Array<QuartierPrestataireGarant>
}