import { Adherent } from "../../contrat/adherent/model";
import { Police } from "../../contrat/police/model";

export interface Alerte{
    id?: string,
    code?: string,
    libelle?: string,
    description?: string,
    adherent?: Adherent,
    policeId?: string
    adresseMail?:string
}

export interface AlerteAdresseMail{
    id?: string,
    policeId?: Array<Police>;
    adresseMail?:string
}
export interface AlerteList {
    alerteDtoList?: Array<Alerte>;
}