export const Function = {
    sm_parametrage: 'sm_parametrage',
    sm_production: 'sm_production',
    sm_garant: 'sm_garant',
    sm_intermediaire: 'sm_intermediaire',
    sm_bareme: 'sm_bareme',
    sm_police: 'sm_police',
    sm_avenant: 'sm_avenant',
    sm_prestation: 'sm_prestation',
    sm_prefinancement: 'sm_prefinancement',
    sm_sinistre_edition: 'sm_sinistre_edition',
    sm_sinistre_valide: 'sm_sinistre_valide',
    sm_sinistre_consultation: 'sm_sinistre_consultation',
    sm_ordre_reglement_edition: 'sm_ordre_reglement_edition',
    sm_ordre_reglement_valide: 'sm_ordre_reglement_valide',
    sm_ordre_reglement_consultation: 'sm_ordre_reglement_consultation',
    sm_tiers_payant: 'sm_tiers_payant',
    sm_tiers_payant_edition: 'sm_tiers_payant_edition',
    sm_tiers_payant_valide: 'sm_tiers_payant_valide',
    sm_tiers_payant_consultation: 'sm_tiers_payant_consultation',
    sm_tiers_payant_ordre_reglement_edition: 'sm_tiers_payant_ordre_reglement_edition',
    sm_tiers_payant_ordre_reglement_valide: 'sm_tiers_payant_ordre_reglement_valide',
    sm_tiers_payant_ordre_reglement_consultation: 'sm_tiers_payant_ordre_reglement_consultation'
};

export const UsersRoles = {
    producteur: [Function.sm_parametrage, Function.sm_production, Function.sm_garant, Function.sm_intermediaire, Function.sm_bareme,
        Function.sm_police, Function.sm_avenant],
    prestataire: [Function.sm_prestation, Function.sm_prefinancement, Function.sm_sinistre_edition,
        Function.sm_sinistre_valide, Function.sm_sinistre_consultation, Function.sm_ordre_reglement_edition,
    Function.sm_ordre_reglement_valide, Function.sm_ordre_reglement_consultation,
    Function.sm_tiers_payant, Function.sm_tiers_payant_consultation, Function.sm_tiers_payant_edition,
    Function.sm_tiers_payant_ordre_reglement_consultation, Function.sm_tiers_payant_ordre_reglement_edition,
    Function.sm_tiers_payant_ordre_reglement_valide, Function.sm_tiers_payant_valide]
};
