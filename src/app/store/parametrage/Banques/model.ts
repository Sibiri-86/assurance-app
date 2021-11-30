export interface Banque{
    id?: string,
    code?: string,
    libelle?: string,
    description?: string
}
export interface BanqueList {
    banqueDtoList?: Array<Banque>;
}