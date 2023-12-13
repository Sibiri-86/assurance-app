import { Component, OnInit } from '@angular/core';
import { AppMainComponent } from './app.main.component';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import { Function } from './module/common/config/role.user';
import { AuthGuard } from './auth/user-route-access-service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {
    model: any[];
    constructor(public app: AppMainComponent, private keycloak: KeycloakService) {}
    ngOnInit() {
        this.model = [
            

            {label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'], visible: this.keycloak.isUserInRole(Function.sm_dashboard)},
            {label: 'Parametrage', icon: 'pi pi-fw pi-home', routerLink: ['/parametrage'],
            visible: this.keycloak.isUserInRole(Function.sm_parametrage)},
            {
                label: 'Production', icon: 'pi pi-fw pi-compass', routerLink: ['/contrat'],
                 visible: this.keycloak.isUserInRole(Function.sm_production),
                items: [
                    {label: 'Condition générale', icon: '', routerLink: ['/contrat/condition-generale'], visible: this.keycloak.isUserInRole(Function.sm_garant)},
                    {label: 'Garant', icon: '', routerLink: ['/contrat/garant'], visible: this.keycloak.isUserInRole(Function.sm_garant)},
                    {label: 'Intermediaire', icon: '', routerLink: ['/contrat/intermediaire'],
                    visible: this.keycloak.isUserInRole(Function.sm_intermediaire)},
                    {label: 'Barème', icon: '', routerLink: ['/contrat/bareme'], visible: this.keycloak.isUserInRole(Function.sm_bareme)},
                    {label: 'Police', icon: '', routerLink: ['/contrat/police'], visible: this.keycloak.isUserInRole(Function.sm_police)},
                    {label: 'Assuré', icon: '', routerLink: ['/contrat/assure'], visible: this.keycloak.isUserInRole(Function.sm_assure)},
                    {label: 'Bulletin d\'adhésion', icon: '', routerLink: ['/contrat/bulletin-adhesion'], visible: this.keycloak.isUserInRole(Function.sm_bulletin_adhesion)},
                    {label: 'Avenant', icon: '', routerLink: ['/contrat/avenant'],
                    visible: this.keycloak.isUserInRole(Function.sm_avenant)},
                    {label: 'Clôture d\'exercice', icon: '', routerLink: ['/contrat/exercice'], visible: this.keycloak.isUserInRole(Function.sm_exercice)},
                    {label: 'FAQ', icon: '', routerLink: ['/contrat/foire'], visible: this.keycloak.isUserInRole(Function.sm_production)},
                    {label: 'Assurance Voyage', icon: '', routerLink: ['/contrat/assurance-voyage'], visible: this.keycloak.isUserInRole(Function.sm_production)},

                ]
            },
            {
                label: 'Prestation', icon: 'pi pi-fw pi-compass', visible: this.keycloak.isUserInRole(Function.sm_prestation),
                        items: [
                            {
                                label: 'prefinancement', icon: 'pi pi-fw pi-align-left', routerLink: ['/prestation'],
                                visible: this.keycloak.isUserInRole(Function.sm_prefinancement),
                                items: [
                                    {label: 'sinistre | Edition', icon: '', routerLink: ['/prestation/prefinancement'], visible: 
                                    this.keycloak.isUserInRole(Function.sm_sinistre_edition)},
                                    {
                                        label: 'Remboursement en instance', icon: 'pi pi-fw ', routerLink: ['/prestation/remboursement-instance'], 
                                        visible: this.keycloak.isUserInRole(Function.sm_sinistre_edition)
                                    },
                                    {label: 'sinistre | valide', icon: '', routerLink: ['/prestation/prefinancement/valide'],
                                     visible: this.keycloak.isUserInRole(Function.sm_sinistre_valide)},
                                    {label: 'sinistre | consultation', icon: '', routerLink: ['/prestation/prefinancement/consultation'],
                                    visible: this.keycloak.isUserInRole(Function.sm_sinistre_consultation)},
                                    {label: 'ordre de paiement | edition', icon: '',  routerLink: ['/prestation/prefinancement/ordre-reglement'], visible: this.keycloak.isUserInRole(Function.sm_ordre_reglement_edition)},
                                    {label: 'ordre de paiement | valide', icon: '', routerLink: ['/prestation/prefinancement/ordre-reglement/valide'], visible: this.keycloak.isUserInRole(Function.sm_ordre_reglement_valide)},
                                    {label: 'ordre de paiement | consultation', icon: '', routerLink: ['/prestation/prefinancement/ordre-reglement/consultation'], visible: this.keycloak.isUserInRole(Function.sm_ordre_reglement_consultation)}
                                ]
                            },
                            {
                                label: 'Tiers Payant', icon: 'pi pi-fw pi-align-left', routerLink: ['/prestation'],
                                visible: this.keycloak.isUserInRole(Function.sm_tiers_payant),
                                items: [
                                    {label: 'Sinistre | Edition', icon: '', routerLink: ['/prestation/tierPayant'],
                                    visible: this.keycloak.isUserInRole(Function.sm_sinistre_edition)},
                                    {label: 'Sinistre | Valide', icon: '', routerLink: ['/prestation/tierPayant/valide'],
                                    visible: this.keycloak.isUserInRole(Function.sm_sinistre_valide)},
                                    {label: 'Sinistre | Consultation ', icon: '', routerLink: ['/prestation/tierPayant/consultation'],
                                    visible: this.keycloak.isUserInRole(Function.sm_tiers_payant_consultation)},
                                    {label: 'Ordre de paiement | Edition', icon: '',  routerLink: ['/prestation/tierPayant/ordre-reglement'],
                                    visible: this.keycloak.isUserInRole(Function.sm_tiers_payant_ordre_reglement_edition)},
                                    {label: 'Ordre de paiement | Valide', icon: '', routerLink: ['/prestation/tierPayant/ordre-reglement/valide'],
                                    visible: this.keycloak.isUserInRole(Function.sm_tiers_payant_ordre_reglement_valide)},
                                    {label: 'Ordre de paiement | Consultation', icon: '', routerLink: ['prestation/tierPayant/ord-reglement/consultation'],
                                    visible: this.keycloak.isUserInRole(Function.sm_tiers_payant_ordre_reglement_consultation)}
                                ]
                            },
                            {
                                label: 'Worflow', icon: 'pi pi-fw pi-align-left', routerLink: ['/prestation'],
                                visible: this.keycloak.isUserInRole(Function.sm_workflow),
                                items: [
                                    {label: 'Prefinancement', icon: 'pi pi-fw pi-chevron-circle-right',  routerLink: ['/prestation/Workflow/ordre-reglement-workflow'], visible: this.keycloak.isUserInRole(Function.sm_workflow_prefinancement)},
                                    {label: 'Tiers Payant', icon: 'pi pi-fw pi-chevron-circle-right', routerLink: ['/prestation/prefinancement/ordre-reglement/valide'], visible: this.keycloak.isUserInRole(Function.sm_ordre_reglement_valide)}
                                    
                                ]
                            },
                        ]
            },
            {
                label: 'Medical', icon: 'pi pi-fw pi-star', routerLink: ['/medical'],
                visible: this.keycloak.isUserInRole(Function.sm_medical),
                items: [
                    {label: 'convention', icon: 'pi pi-pencil', routerLink: ['/medical/convention'], visible: true},
                    {label: 'bon / Entente Préalable', icon: 'pi pi-comment', routerLink: ['/medical/bon-prise-en-charge'], visible: true},
                    {label: 'Bon de prise en charge Pharmacie', icon: 'pi pi-comments', routerLink: ['/medical/ordonnace-medical'], visible: true},
                    {label: 'Cartographie', icon: 'pi pi-fw pi-home', routerLink: ['/prestataire-cartographie'], visible: true},
                    {label: 'Produit Exclu', icon: 'pi pi-fw pi-times', routerLink: ['/medical/produit-exclu'], visible: true},
                    {label: 'Entente', icon: '', routerLink: ['/medical/entente-bon'], visible: true},
                    {label: 'Localité prestataire', icon: '', routerLink: ['/medical/quartier-prestataire-garant'], visible: true},
                    {label: 'New barème', icon: '', routerLink: ['/medical/new-bareme'], visible: true},
                    {label: 'Remboursement en entente de validation', icon: '', routerLink: ['/medical/remboursement-entente'], visible: true},
                    {label: 'majPrestataire', icon: '', routerLink: ['/medical/maj-prestataire'], visible: true},
                    
                ]
            },

            {
                label: 'Finance', icon: 'pi pi-fw pi-money-bill', routerLink: ['/comptabilite'],
                visible: this.keycloak.isUserInRole(Function.sm_finance),
                items: [
                      
                    {label: 'Opération', icon: 'pi pi-align-justify', routerLink: ['/comptabilite'], visible: true,
                         items: [
                            {label: 'compte', icon: 'pi pi-pencil', routerLink: ['/comptabilite/compte'], visible: true},
                            {label: 'Journal', icon: 'pi pi-book', routerLink: ['/comptabilite/journal'], visible: true},
                            {label: 'Exercice comptabilité', icon: 'pi pi-clock', routerLink: ['/comptabilite/exercice-comptable'], visible: true},
                            {label: 'Opération', icon: 'pi pi-fw pi-list', routerLink: ['/comptabilite/exercice-comptable-operation'], visible: true},
                            {label: 'Appel de Fond', icon: 'pi pi-fw pi-phone', routerLink: ['/comptabilite/appel-fond'], visible: true},
                            
                         ]
                
                },
                {
                    label: 'Paiement', icon: 'pi pi-align-justify', routerLink: ['/comptabilite'], visible: true,
                    items: [
                        {label: 'Ordre de paiment instance', icon: 'pi pi-fw pi-home', routerLink: ['/comptabilite/ordre-paiment-instance'], visible: true},
                        {label: 'Ordre de paiment par chèque instance', routerLink: ['/comptabilite/ordre-paiment-instance-cheque'], visible: true},
                        {label: 'Facture en instance', routerLink: ['/comptabilite/paiement-facture'], visible: true},
                        {label: 'Facture  payé', routerLink: ['/comptabilite/facture-paye'], visible: true},
                        {label: 'Remboursement effectué', routerLink: ['/comptabilite/remboursement-effectue'], visible: true},
                        {label: 'Arreté journalier', routerLink: ['/comptabilite/arrete-journaux'], visible: true},
                        {label: 'Grand livre', routerLink: ['/comptabilite/grand-livre-general'], visible: true},

                    ]
                },
                {
                    label: 'Etat', icon: 'pi pi-print', routerLink: ['/comptabilite'], visible: true,
                    items: [
                        {label: 'Balance', icon: 'pi pi-print', routerLink: ['/comptabilite/balance'], visible: true},
                        {label: 'Tiers', icon: 'pi pi-print', routerLink: ['/comptabilite/tiers'], visible: true},
                        {label: 'Grand livre auxiliaire', routerLink: ['/comptabilite/grand-livre-auxiliaire'], visible: true},
                        {label: 'Balance tiers', icon: 'pi pi-print', routerLink: ['/comptabilite/balance-tiers'], visible: true},
                        {label: 'Etats financiers', icon: 'pi pi-print', routerLink: ['/comptabilite/bilan'], visible: true},
                    ]
                }
                    
                    
                    
                    
                                    ]
            },
            {
                label: 'Production', icon: 'pi pi-fw pi-chart-line', routerLink: ['/reporting'],
                
                visible: this.keycloak.isUserInRole(Function.sm_reporting), 
                items: [
                      
                            {label: 'récapitulatif', icon: 'pi pi-fw pi-chart-line', routerLink: ['/reporting/recapitulatif'], visible: true},
                            {label: 'Dép. familiale', icon: 'pi pi-fw pi-chart-line', routerLink: ['/reporting/depense-famille'], visible: true},
                            {label: 'Dép. famille acte', icon: 'pi pi-fw pi-chart-line', routerLink: ['/reporting/depense-famille-acte'], visible: true},
                            {label: 'Dépense Statut', icon: 'pi pi-fw pi-chart-line', routerLink: ['/reporting/repartition-depense-statut'], visible: true},
                            {label: 'Dép. Cen. Prescrip.', icon: 'pi pi-fw pi-chart-line', routerLink: ['/reporting/depense-famille-prestataire'], visible: true},
                            {label: 'Affection', icon: 'pi pi-fw pi-chart-line', routerLink: ['/reporting/depense-famille-pathologie'], visible: true},
                            {label: 'Stat Tranche Age', icon: 'pi pi-fw pi-chart-line', routerLink: ['/reporting/statistique-tranche-age'], visible: true},
                            {label: 'Dépenses Optique', icon: 'pi pi-fw pi-chart-line', routerLink: ['/reporting/depense-optique'], visible: true},
                            {label: 'Evo. mensuelle', icon: 'pi pi-fw pi-chart-line', routerLink: ['/reporting/evolution-mensuelle'], visible: true},
                            {label: 'Fam. Assure', icon: 'pi pi-fw pi-chart-line', routerLink: ['/reporting/famille-assure'], visible: true},
                    
                                    ]
            },

            {
                label: 'Prestation', icon: 'pi pi-fw pi-chart-line', routerLink: ['/reporting'],
                
                visible: this.keycloak.isUserInRole(Function.sm_reporting), 
                items: [
                      
                    {label: 'Fact. Type Prest. & Prest.', icon: 'pi pi-fw pi-chart-line', routerLink: ['/reporting/facture-par-prestataires'], visible: true},
                    {label: 'Statistique des opérateurs de saisie', routerLink: ['/reporting/reporting-operateur'], visible: true},
                    {label: 'Statistique des factures impayées par prestataire', routerLink: ['/reporting/reporting-cheque-non-valide'], visible: true},
                    {label: 'Statistique des factures payées par prestataire', routerLink: ['/reporting/reporting-cheque-valide'], visible: true},
                    
                    ]
            },
            {
                label: 'Médical', icon: 'pi pi-fw pi-chart-line', routerLink: ['/reporting'],
                
                visible: this.keycloak.isUserInRole(Function.sm_reporting), 
                items: [
                      
                    {label: 'Consom. Par Sexe', icon: 'pi pi-fw pi-chart-line', routerLink: ['/reporting/medical/consommation-par-sexe'], visible: true},
                    {label: 'Fact. Type Prest. & Prest.', icon: 'pi pi-fw pi-chart-line', routerLink: ['/reporting/facture-par-prestataires'], visible: true},
                    
                    ]
            },
            {label: 'Consommation.', icon: '', routerLink: ['/portail/assureConsommation'],
                    visible: this.keycloak.isUserInRole(Function.VUE_ASSURE)},
                    { label: 'Suivi Remb.', icon: '', routerLink: ['/portail/suivi-rembourssement'],
                    visible: this.keycloak.isUserInRole(Function.VUE_ASSURE)},
                    {label: 'Exclusion', icon: '', routerLink: ['/portail/produit-exclu'],
                    visible: this.keycloak.isUserInRole(Function.VUE_ASSURE)},
                    { label: 'Entente', icon: '', routerLink: ['/portail/entente'], 
                    visible: this.keycloak.isUserInRole(Function.VUE_ASSURE)},
                    {
                        label: 'Pharmacies', icon: '', routerLink: ['/portail/pharmacie-garde'],
                         visible: this.keycloak.isUserInRole(Function.VUE_ASSURE)
                    },
                    {
                        label: 'Condit. gle et parti.', icon: '', routerLink: ['/portail/condition-generale-particuliere'],
                        visible: this.keycloak.isUserInRole(Function.VUE_ASSURE)
                    },
                    {
                        label: 'Barème', icon: '', routerLink: ['/portail/bareme'], 
                        visible: this.keycloak.isUserInRole(Function.VUE_ASSURE)
                    },
                    {
                        label: 'remboursement', icon: '', routerLink: ['/portail/remboursement-initie'], 
                        visible: this.keycloak.isUserInRole(Function.VUE_ASSURE)
                    },
                    {
                        label: 'Prestataire', icon: '', routerLink: ['/portail/prestataire-cartographie-quartier'], 
                        visible: this.keycloak.isUserInRole(Function.sm_portail)
                    },
                    {
                        label: 'FAQ', icon: '', routerLink: ['/portail/foire-question'],
                         visible: this.keycloak.isUserInRole(Function.sm_portail)
                    },
            {
                label: 'Suivi Facture', icon: '', routerLink: ['/portail/suivi-facture'], 
                visible: this.keycloak.isUserInRole(Function.VUE_PRESTATAIRE)
            },
            
            {
                label: 'Convention', icon: '', routerLink: ['/portail/convention'],
                 visible: this.keycloak.isUserInRole(Function.VUE_PRESTATAIRE)
            },
            {
                label: 'Bon', icon: '', routerLink: ['/portail/bon-prestataire'], 
                visible: this.keycloak.isUserInRole(Function.VUE_PRESTATAIRE)
            },
            
            {label: 'Infos assuré', icon: '', routerLink: ['/portail/bareme-prestataire'], visible: this.keycloak.isUserInRole(Function.VUE_PRESTATAIRE)},

            {
                label: 'Souscripteur Mouvement', icon: '', routerLink: ['/portail/mouvement-souscripteur'], 
                visible: this.keycloak.isUserInRole(Function.VUE_SOUSCRIPTEUR) 
            },

            {
                label: 'Reporting', icon: 'pi pi-fw pi-chart-line', routerLink: ['/reporting'],visible: this.keycloak.isUserInRole(Function.sm_reporting_AG_DGA), 
                items: [
                    {
                        label: 'Production', icon: 'pi pi-fw pi-align-left', routerLink: ['/reporting'],visible: true,
                                items: [
                                    {label: 'récapitulatif', icon: 'pi pi-fw pi-chart-line', routerLink: ['/reporting/recapitulatif'], visible: true},
                                    {label: 'Dép. familiale', icon: 'pi pi-fw pi-chart-line', routerLink: ['/reporting/depense-famille'], visible: true},
                                    {label: 'Dép. famille acte', icon: 'pi pi-fw pi-chart-line', routerLink: ['/reporting/depense-famille-acte'], visible: true},
                                    {label: 'Dépense Statut', icon: 'pi pi-fw pi-chart-line', routerLink: ['/reporting/repartition-depense-statut'], visible: true},
                                    {label: 'Dép. Cen. Prescrip.', icon: 'pi pi-fw pi-chart-line', routerLink: ['/reporting/depense-famille-prestataire'], visible: true},
                                    {label: 'Affection', icon: 'pi pi-fw pi-chart-line', routerLink: ['/reporting/depense-famille-pathologie'], visible: true},
                                    {label: 'Stat Tranche Age', icon: 'pi pi-fw pi-chart-line', routerLink: ['/reporting/statistique-tranche-age'], visible: true},
                                    {label: 'Dépenses Optique', icon: 'pi pi-fw pi-chart-line', routerLink: ['/reporting/depense-optique'], visible: true},
                                    {label: 'Evo. mensuelle', icon: 'pi pi-fw pi-chart-line', routerLink: ['/reporting/evolution-mensuelle'], visible: true},
                                    {label: 'Fam. Assure', icon: 'pi pi-fw pi-chart-line', routerLink: ['/reporting/famille-assure'], visible: true},
                                ]
                    },
                    {
                        label: 'Prestation', icon: 'pi pi-fw pi-align-left', routerLink: ['/reporting'],visible: true,
                                items: [
                                    {label: 'Fact. Type Prest. & Prest.', icon: 'pi pi-fw pi-chart-line', routerLink: ['/reporting/facture-par-prestataires'], visible: true},
                                    {label: 'Statistique des opérateurs de saisie', routerLink: ['/reporting/reporting-operateur'], visible: true},
                                    {label: 'Statistique des factures impayées par prestataire', routerLink: ['/reporting/reporting-cheque-non-valide'], visible: true},
                                    {label: 'Statistique des factures payées par prestataire', routerLink: ['/reporting/reporting-cheque-valide'], visible: true},
                                ]
                    },
                    {
                        label: 'Médical', icon: 'pi pi-fw pi-align-left', routerLink: ['/reporting'],visible: true,
                                items: [
                                    {label: 'Consom. Par Sexe', icon: 'pi pi-fw pi-chart-line', routerLink: ['/reporting/medical/consommation-par-sexe'], visible: true},
                                    {label: 'Fact. Type Prest. & Prest.', icon: 'pi pi-fw pi-chart-line', routerLink: ['/reporting/facture-par-prestataires'], visible: true},
                                ]
                    }
                    
                                    ]
            },
        ];

    }

}
