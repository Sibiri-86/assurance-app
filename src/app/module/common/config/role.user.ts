export const Function = {
    sm_parametrage: 'sm_parametrage',
    sm_production: 'sm_production',
    sm_garant: 'sm_garant',
    sm_exercice: 'sm_exercice',
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
    sm_tiers_payant_ordre_reglement_consultation: 'sm_tiers_payant_ordre_reglement_consultation',
    sm_bulletin_adhesion: 'sm_bulletin_adhesion',
    sm_medical: 'sm_medical',
    sm_finance: 'sm_finance',
    sm_assure: 'sm_assure',
    sm_workflow: 'sm_workflow',
    sm_workflow_prefinancement: 'sm_workflow_prefinancement',
    sm_workflow_prefinancement_prestation: 'sm_workflow_prefinancement_prestation',
    sm_workflow_prefinancement_Medical: 'sm_workflow_prefinancement_Medical',
    sm_workflow_prefinancement_finance: 'sm_workflow_prefinancement_finance',
    sm_workflow_prefinancement_direction: 'sm_workflow_prefinancement_direction',
    
    sm_workflow_prefinancement_prestation_valider: 'sm_workflow_prefinancement_prestation_valider',
    sm_workflow_prefinancement_Medical_valider: 'sm_workflow_prefinancement_Medical_valider',
    sm_workflow_prefinancement_finance_valider: 'sm_workflow_prefinancement_finance_valider',
    sm_workflow_prefinancement_direction_valider: 'sm_workflow_prefinancement_direction_valider',
    sm_workflow_prefinancement_prestation_devalider: 'sm_workflow_prefinancement_prestation_devalider',
    sm_workflow_prefinancement_Medical_devalider: 'sm_workflow_prefinancement_Medical_devalider',
    sm_workflow_prefinancement_finance_devalider: 'sm_workflow_prefinancement_finance_devalider',
    sm_workflow_prefinancement_direction_devalider: 'sm_workflow_prefinancement_direction_devalider',
    VUE_ASSURE: 'VUE_ASSURE',
    VUE_PRESTATAIRE: 'VUE_PRESTATAIRE',
    sm_portail: 'sm_portail',
    sm_reporting: 'sm_reporting',
    sm_dashboard: 'sm_dashboard',
    VUE_SOUSCRIPTEUR: 'VUE_SOUSCRIPTEUR',
    sm_reporting_AG_DGA: 'sm_reporting_AG_DGA',
    vue_maj_assuere: 'vue_maj_assuere',
    vue_maj_prestataire: 'vue_maj_prestataire',
    vue_maj_paiement: 'vue_maj_paiement',
};

export const UsersRoles = {
    producteur: [Function.sm_parametrage, Function.sm_production, Function.sm_garant, Function.sm_intermediaire, Function.sm_bareme,
        Function.sm_police, Function.sm_avenant, Function.sm_bulletin_adhesion],
    prestataire: [Function.sm_prestation, Function.sm_prefinancement, Function.sm_sinistre_edition,
        Function.sm_sinistre_valide, Function.sm_sinistre_consultation, Function.sm_ordre_reglement_edition,
    Function.sm_ordre_reglement_valide, Function.sm_ordre_reglement_consultation,
    Function.sm_tiers_payant, Function.sm_tiers_payant_consultation, Function.sm_tiers_payant_edition,
    Function.sm_tiers_payant_ordre_reglement_consultation, Function.sm_tiers_payant_ordre_reglement_edition,
    Function.sm_tiers_payant_ordre_reglement_valide, Function.sm_tiers_payant_valide, Function.sm_medical, Function.sm_finance, Function.sm_assure,
    Function.sm_workflow, Function.sm_workflow_prefinancement, Function.sm_workflow_prefinancement_prestation, Function.sm_workflow_prefinancement_Medical, 
    Function.sm_workflow_prefinancement_finance, Function.sm_workflow_prefinancement_direction, Function.sm_workflow_prefinancement_prestation_valider, Function.sm_workflow_prefinancement_Medical_valider, 
    Function.sm_workflow_prefinancement_finance_valider, Function.sm_workflow_prefinancement_direction_valider, Function.sm_workflow_prefinancement_prestation_devalider, Function.sm_workflow_prefinancement_Medical_devalider, 
    Function.sm_workflow_prefinancement_finance_devalider, Function.sm_workflow_prefinancement_direction_devalider, 
    Function.VUE_ASSURE, Function.sm_portail, Function.sm_reporting_AG_DGA, Function.vue_maj_assuere, Function.vue_maj_prestataire, Function.vue_maj_paiement]
};
