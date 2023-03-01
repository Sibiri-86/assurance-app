
export interface DateGarde {
    id?: string;
    dateDebutD?: Date;
    dateFinF?: Date;
    moisGarde?: string;
    annee?: string;
    code?: string;
}
export interface DateGardeList {
    dateGardeDtoList?: Array<DateGarde>;
}
