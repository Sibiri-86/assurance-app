import { ProduitPharmaceutiqueExcluEntite } from "../../parametrage/produit-pharmaceutique-exclu/model";
export interface PortailState {
    // recapitulatif: Array<Recapitulatif>;
    reportFile: ArrayBuffer;
    produitPharmaceutiqueExcluEntiteList: Array<ProduitPharmaceutiqueExcluEntite>;
   
}
