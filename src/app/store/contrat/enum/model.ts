export enum TypeReport {
    FACTURE_PROFORMA = 'factureProforma',
    POLICE = 'POLICE',
    AVENANT_INCORPORATION = 'AVENANT_INCORPORATION',
    AVENANT_RETRAIT = 'AVENANT_RETRAIT',
    LISTE_INCORPORATION = 'LISTE_INCORPORATION',
    LISTE_RETRAIT = 'LISTE_RETRAIT',
    FACTURE_INCORP = 'FACTURE_INCORP',
    FACTURE_SUSPEN ='FACTURE_SUSPEN',
    AFAIRE_NOUVELLE = 'AFAIRE_NOUVELLE',
    LISTE_AFAIRE_NOUVELLE = 'LISTE_AFAIRE_NOUVELLE',
    LISTE_MODIFIER = 'LISTE_MODIFIER',
    LISTE_AFAIRE_NOUVELLE1 = 'LISTE_AFAIRE_NOUVELLE1',
    AVENANT_RENOUVELLEMENT = 'AVENANT_RENOUVELLEMENT',
    AVENANT_PROROGATION = 'AVENANT_PROROGATION',
    AVENANT_MODIFICATION = 'AVENANT_MODIFICATION',
    LISTE_AVENANT_RENOUVELLEMENT = 'LISTE_AVENANT_RENOUVELLEMENT',
    LISTE_AVENANT_RESILIATION = 'LISTE_AVENANT_RESILIATION',
    AVENANT_RESILIATION = 'AVENANT_RESILIATION',
    LISTE_AVENANT_SUSPENSION = 'LISTE_AVENANT_SUSPENSION',
    AVENANT_SUSPENSION = 'AVENANT_SUSPENSION',
    LISTE_ACTUALISE_POLICE = 'LISTE_ACTUALISE_POLICE',
    PREFINANCEMENT_FICHE_DETAIL_REMBOURSEMENT = 'PREFINANCEMENT_FICHE_DETAIL_REMBOURSEMENT',
    ORDRE_REGLEMENT = 'ORDRE_REGLEMENT',
    TIERPAYANT_FICHE_DETAIL_REMBOURSEMENT = 'TIERPAYANT_FICHE_DETAIL_REMBOURSEMENT',
    ORDRE_REGLEMENT_TIER_PAYANT = 'ORDRE_REGLEMENT_TIER_PAYANT',
    /** type report pour le module medical */
    BONPRISEENCHARGE = 'BONPRISEENCHARGE',
    ORDONNANCEMEDICALE = 'ORDONNANCEMEDICALE',
    /** type report pour le module comptabilité */
    APPEL_FOND = 'APPEL_FOND',
    OPERATION = 'OPERATION',
    GRAND_LIVRE_GENERAL= 'GRAND_LIVRE_GENERAL',
    BALANCE_HUIT_COLONNES = 'BALANCE_HUIT_COLONNES',
    BALANCE_SIX_COLONNES = 'BALANCE_SIX_COLONNES',
    GRAND_LIVRE_AUXILIAIRE = 'GRAND_LIVRE_AUXILIAIRE'
}

export enum TypeDuree {
    JOUR = 'JOUR',
    MOIS = 'MOIS',
    ANNEE = 'ANNEE'
}

export enum SituationFamiliale {
    MARIE = 'MARIE',
    CELIBATAIRE = 'CELIBATAIRE',
    VEUF ='VEUF',
    DIVORCE = 'DIVORCE',
    SEPARE = 'SEPARE'
}
 
export enum Defaut {
    NON ='NON',
    DEFAUT_CONSTITUTION = 'DEFAUT_CONSTITUTION',
    INFIRMITE ='INFIRMITE',
    MALADIE_CHRONIQUE ='MALADIE_CHRONIQUE'

}

export enum Choix {
    OUI = 'OUI',
    NON = 'NON'
}
export  enum AffectionPasse {
NON ='NON',
AFFECTION_PULMONAIRE ='AFFECTION_PULMONAIRE',
AFFECTION_NERVEUSE = 'AFFECTION_NERVEUSE',
AFFECTION_CARDIAQUE = 'AFFECTION_CARDIAQUE',
RENALE_DIABETE = 'RENALE_DIABETE',
MALADIE_FOI = 'MALADIE_FOI',
CANCER = 'CANCER'
}
export enum MaladieProche {
    NON = 'NON',
    TUBERCULOSE ='TUBERCULOSE',
    ALIENAtion_MENTALE   ='ALIENAtion_MENTALE'
}
