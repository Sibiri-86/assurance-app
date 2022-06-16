import { OrdonnanceMedical, OrdonnanceMedicalProduitPharmaceutique, OrdonnanceMedicalProduitPharmaceutiqueList } from "./model";

export interface OrdonnanceMedicaleState {
    ordonnanceMedicalProduitPharmaceutiqueList: Array<OrdonnanceMedical>;
    reportFile: ArrayBuffer;
}
