import { Component, OnInit } from '@angular/core';
import { AppMainComponent } from './app.main.component';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import { Function } from './module/common/config/role.user';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {
    model: any[];
    constructor(public app: AppMainComponent, private keycloak: KeycloakService) {}
    ngOnInit() {
        this.model = [
            
            {label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'], visible: true},
            {label: 'Parametrage', icon: 'pi pi-fw pi-home', routerLink: ['/parametrage'],
            visible: this.keycloak.isUserInRole(Function.sm_parametrage)},
            {
                label: 'Production', icon: 'pi pi-fw pi-compass', routerLink: ['/contrat'],
                 visible: this.keycloak.isUserInRole(Function.sm_production),
                items: [
                    {label: 'Garant', icon: '', routerLink: ['/contrat/garant'], visible: this.keycloak.isUserInRole(Function.sm_garant)},
                    {label: 'Intermediaire', icon: '', routerLink: ['/contrat/intermediaire'],
                    visible: this.keycloak.isUserInRole(Function.sm_intermediaire)},
                    {label: 'Barème', icon: '', routerLink: ['/contrat/bareme'], visible: this.keycloak.isUserInRole(Function.sm_bareme)},
                    {label: 'Police', icon: '', routerLink: ['/contrat/police'], visible: this.keycloak.isUserInRole(Function.sm_police)},
                    {label: 'Assuré', icon: '', routerLink: ['/contrat/assure'], visible: this.keycloak.isUserInRole(Function.sm_assure)},
                    {label: 'Bulletin d\'adhésion', icon: '', routerLink: ['/contrat/bulletin-adhesion'], visible: this.keycloak.isUserInRole(Function.sm_bulletin_adhesion)},
                    {label: 'Avenant', icon: '', routerLink: ['/contrat/avenant'],
                    visible: this.keycloak.isUserInRole(Function.sm_avenant)},
                    {label: 'Clôture d\'exercice', icon: '', routerLink: ['/contrat/exercice'], visible: this.keycloak.isUserInRole(Function.sm_exercice)}
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
                    {label: 'Produit Exclu', icon: 'pi pi-fw pi-times', routerLink: ['/medical/produit-exclu'], visible: true}
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
                    ]
                }
                    
                    
                    
                    
                                    ]
            },
            {
                label: 'Reporting', icon: 'pi pi-fw pi-chart-line', routerLink: ['/reporting'],
                visible: true,
                items: [
                      
                    {label: 'Production', icon: 'pi pi-align-justify', routerLink: ['/reporting'], visible: true,
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
                    label: 'Prestation', icon: 'pi pi-align-justify', routerLink: ['/comptabilite'], visible: true,
                    items: [
                        {label: 'Fact. Type Prest. & Prest.', icon: 'pi pi-fw pi-chart-line', routerLink: ['/reporting/facture-par-prestataires'], visible: true},
                        {label: 'Statistique ',  icon: 'pi pi-fw pi-chart-line', routerLink: ['/reporting/reporting-operateur'], visible: true},
                        {label: 'Statistique des opérateurs de saisie', routerLink: ['/reporting/reporting-operateur'], visible: true},
                        {label: 'Statistique des factures impayées par prestataire', routerLink: ['/reporting/reporting-cheque-non-valide'], visible: true},
                        {label: 'Statistique des factures payées par prestataire', routerLink: ['/reporting/reporting-cheque-valide'], visible: true},
                        /* {label: 'Ordre de paiment instance', icon: 'pi pi-fw pi-home', routerLink: ['/comptabilite/ordre-paiment-instance'], visible: true},
                        {label: 'Ordre de paiment par chèque instance', routerLink: ['/comptabilite/ordre-paiment-instance-cheque'], visible: true},
                        {label: 'Facture en instance', routerLink: ['/comptabilite/paiement-facture'], visible: true},
                        {label: 'Facture  payé', routerLink: ['/comptabilite/facture-paye'], visible: true},
                        {label: 'Remboursement effectué', routerLink: ['/comptabilite/remboursement-effectue'], visible: true},
                        {label: 'Arreté journalier', routerLink: ['/comptabilite/arrete-journaux'], visible: true},
                        {label: 'Grand livre', routerLink: ['/comptabilite/grand-livre-general'], visible: true}, */

                    ]
                },
                {
                    label: 'Médical', icon: 'pi pi-align-justify', routerLink: ['/comptabilite'], visible: true,
                    items: [
                        {label: 'Consom. Par Sexe', icon: 'pi pi-fw pi-chart-line', routerLink: ['/reporting/medical/consommation-par-sexe'], visible: true},
                        {label: 'Fact. Type Prest. & Prest.', icon: 'pi pi-fw pi-chart-line', routerLink: ['/reporting/facture-par-prestataires'], visible: true},
                        /* {label: 'Ordre de paiment instance', icon: 'pi pi-fw pi-home', routerLink: ['/comptabilite/ordre-paiment-instance'], visible: true},
                        {label: 'Ordre de paiment par chèque instance', routerLink: ['/comptabilite/ordre-paiment-instance-cheque'], visible: true},
                        {label: 'Facture en instance', routerLink: ['/comptabilite/paiement-facture'], visible: true},
                        {label: 'Facture  payé', routerLink: ['/comptabilite/facture-paye'], visible: true},
                        {label: 'Remboursement effectué', routerLink: ['/comptabilite/remboursement-effectue'], visible: true},
                        {label: 'Arreté journalier', routerLink: ['/comptabilite/arrete-journaux'], visible: true},
                        {label: 'Grand livre', routerLink: ['/comptabilite/grand-livre-general'], visible: true}, */

                    ]
                },
                
                /* {
                    label: 'Etat', icon: 'pi pi-print', routerLink: ['/comptabilite'], visible: true,
                    items: [
                        {label: 'Balance', icon: 'pi pi-print', routerLink: ['/comptabilite/balance'], visible: true},
                        {label: 'Tiers', icon: 'pi pi-print', routerLink: ['/comptabilite/tiers'], visible: true},
                        {label: 'Grand livre auxiliaire', routerLink: ['/comptabilite/grand-livre-auxiliaire'], visible: true},

                        {label: 'Balance tiers', icon: 'pi pi-print', routerLink: ['/comptabilite/balance-tiers'], visible: true},
                    ]
                } */
                    
                    
                    
                    
                                    ]
            },

            {
                label: 'Portail', icon: 'pi pi-fw pi-compass', routerLink: ['/portail'],
                visible: this.keycloak.isUserInRole(Function.sm_portail),
                items: [
                    {label: 'Assuré Consom.', icon: ' pi pi-fw pi-wallet', routerLink: ['/portail/assureConsommation'], visible: this.keycloak.isUserInRole(Function.VUE_ASSURE)},
                    {label: 'Suivi Remb.', icon: 'pi pi-fw pi-chevron-circle-right', routerLink: ['/portail/suivi-rembourssement'], visible: this.keycloak.isUserInRole(Function.VUE_ASSURE)},
                    {label: 'Suivi Facture', icon: 'pi pi-fw pi-chevron-circle-right', routerLink: ['/portail/suivi-facture'], visible: this.keycloak.isUserInRole(Function.VUE_PRESTATAIRE)},
                    {label: 'Produit Exclu', icon: 'pi pi-fw pi-slack', routerLink: ['/portail/produit-exclu'], visible: this.keycloak.isUserInRole(Function.VUE_PRESTATAIRE)}
                    /* {label: 'login', icon: 'pi pi-fw pi-home', routerLink: ['/login'], visible: true},
                    {label: 'registerChoose', icon: 'pi pi-fw pi-home', routerLink: ['/portail/registerChoose'], visible: true},
                    {label: 'register', icon: 'pi pi-fw pi-home', routerLink: ['/portail/register'], visible: true}, */
                ]
            },
            /*
            {
                label: 'UI Kit', icon: 'pi pi-fw pi-star', routerLink: ['/uikit'],
                items: [
                    {label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout']},
                    {label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input']},
                    {label: 'Float Label', icon: 'pi pi-fw pi-bookmark', routerLink: ['/uikit/floatlabel']},
                    {label: 'Invalid State', icon: 'pi pi-exclamation-circle', routerLink: ['/uikit/invalidstate']},
                    {label: 'Button', icon: 'pi pi-fw pi-mobile', routerLink: ['/uikit/button'], class: 'rotated-icon'},
                    {label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table']},
                    {label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list']},
                    {label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/uikit/tree']},
                    {label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/uikit/panel']},
                    {label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/uikit/overlay']},
                    {label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/uikit/media']},
                    {label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu']},
                    {label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/uikit/message']},
                    {label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/uikit/file']},
                    {label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/uikit/charts']},
                    {label: 'Misc', icon: 'pi pi-fw pi-circle-off', routerLink: ['/uikit/misc']}
                ]
            },
            {
                label: 'Utilities', icon: 'pi pi-fw pi-compass', routerLink: ['utilities'],
                items: [
                    {label: 'Display', icon: 'pi pi-fw pi-desktop', routerLink: ['utilities/display']},
                    {label: 'Elevation', icon: 'pi pi-fw pi-external-link', routerLink: ['utilities/elevation']},
                    {label: 'FlexBox', icon: 'pi pi-fw pi-directions', routerLink: ['utilities/flexbox']},
                    {label: 'Icons', icon: 'pi pi-fw pi-search', routerLink: ['utilities/icons']},
                    {label: 'Text', icon: 'pi pi-fw pi-pencil', routerLink: ['utilities/text']},
                    {label: 'Widgets', icon: 'pi pi-fw pi-star-o', routerLink: ['utilities/widgets']},
                    {label: 'Grid System', icon: 'pi pi-fw pi-th-large', routerLink: ['utilities/grid']},
                    {label: 'Spacing', icon: 'pi pi-fw pi-arrow-right', routerLink: ['utilities/spacing']},
                    {label: 'Typography', icon: 'pi pi-fw pi-align-center', routerLink: ['utilities/typography']}
                ]
            },
            {
                label: 'Pages', icon: 'pi pi-fw pi-briefcase', routerLink: ['/pages'],
                items: [
                    {label: 'Crud', icon: 'pi pi-fw pi-pencil', routerLink: ['/pages/crud']},
                    {label: 'Calendar', icon: 'pi pi-fw pi-calendar-plus', routerLink: ['/pages/calendar']},
                    {label: 'Timeline', icon: 'pi pi-fw pi-calendar', routerLink: ['/pages/timeline']},
                    {label: 'Landing', icon: 'pi pi-fw pi-globe', url: 'assets/pages/landing.html', target: '_blank'},
                    {label: 'Login', icon: 'pi pi-fw pi-sign-in', routerLink: ['/login']},
                    {label: 'Invoice', icon: 'pi pi-fw pi-dollar', routerLink: ['/pages/invoice']},
                    {label: 'Help', icon: 'pi pi-fw pi-question-circle', routerLink: ['/pages/help']},
                    {label: 'Error', icon: 'pi pi-fw pi-times-circle', routerLink: ['/error']},
                    {label: 'Not Found', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/notfound']},
                    {label: 'Access Denied', icon: 'pi pi-fw pi-lock', routerLink: ['/access']},
                    {label: 'Empty', icon: 'pi pi-fw pi-circle-off', routerLink: ['/pages/empty']}
                ]
            },
            {
                label: 'Hierarchy', icon: 'pi pi-fw pi-align-left',
                items: [
                    {
                        label: 'Submenu 1', icon: 'pi pi-fw pi-align-left',
                        items: [
                            {
                                label: 'Submenu 1.1', icon: 'pi pi-fw pi-align-left',
                                items: [
                                    {label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-align-left'},
                                    {label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-align-left'},
                                    {label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-align-left'},
                                ]
                            },
                            {
                                label: 'Submenu 1.2', icon: 'pi pi-fw pi-align-left',
                                items: [
                                    {label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-align-left'}
                                ]
                            },
                        ]
                    },
                    {
                        label: 'Submenu 2', icon: 'pi pi-fw pi-align-left',
                        items: [
                            {
                                label: 'Submenu 2.1', icon: 'pi pi-fw pi-align-left',
                                items: [
                                    {label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-align-left'},
                                    {label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-align-left'},
                                ]
                            },
                            {
                                label: 'Submenu 2.2', icon: 'pi pi-fw pi-align-left',
                                items: [
                                    {label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-align-left'},
                                ]
                            },
                        ]
                    }
                ]
            },
            {
                label: 'Buy Now', icon: 'pi pi-fw pi-shopping-cart', url: ['https://www.primefaces.org/store']
            },
            {
                label: 'Documentation', icon: 'pi pi-fw pi-info-circle', routerLink: ['/documentation']
            }
            */
        ];

    }

}
