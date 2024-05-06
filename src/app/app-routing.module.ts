import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {DashboardDemoComponent} from './demo/view/dashboarddemo.component';
import {FormLayoutDemoComponent} from './demo/view/formlayoutdemo.component';
import {PanelsDemoComponent} from './demo/view/panelsdemo.component';
import {OverlaysDemoComponent} from './demo/view/overlaysdemo.component';
import {MediaDemoComponent} from './demo/view/mediademo.component';
import {MenusDemoComponent} from './demo/view/menusdemo.component';
import {MessagesDemoComponent} from './demo/view/messagesdemo.component';
import {MiscDemoComponent} from './demo/view/miscdemo.component';
import {EmptyDemoComponent} from './demo/view/emptydemo.component';
import {ChartsDemoComponent} from './demo/view/chartsdemo.component';
import {FileDemoComponent} from './demo/view/filedemo.component';
import {DocumentationComponent} from './demo/view/documentation.component';
import {AppMainComponent} from './app.main.component';
import {AppNotfoundComponent} from './pages/app.notfound.component';
import {AppErrorComponent} from './pages/app.error.component';
import {AppAccessdeniedComponent} from './pages/app.accessdenied.component';
import {AppLoginComponent} from './pages/app.login.component';
import {InputDemoComponent} from './demo/view/inputdemo.component';
import {FloatLabelDemoComponent} from './demo/view/floatlabeldemo.component';
import {InvalidStateDemoComponent} from './demo/view/invalidstatedemo.component';
import {ButtonDemoComponent} from './demo/view/buttondemo.component';
import {TableDemoComponent} from './demo/view/tabledemo.component';
import {ListDemoComponent} from './demo/view/listdemo.component';
import {TreeDemoComponent} from './demo/view/treedemo.component';
import {DisplayComponent} from './utilities/display.component';
import {ElevationComponent} from './utilities/elevation.component';
import {FlexboxComponent} from './utilities/flexbox.component';
import {GridComponent} from './utilities/grid.component';
import {IconsComponent} from './utilities/icons.component';
import {WidgetsComponent} from './utilities/widgets.component';
import {SpacingComponent} from './utilities/spacing.component';
import {TypographyComponent} from './utilities/typography.component';
import {TextComponent} from './utilities/text.component';
import {AppCrudComponent} from './pages/app.crud.component';
import {AppCalendarComponent} from './pages/app.calendar.component';
import {AppInvoiceComponent} from './pages/app.invoice.component';
import {AppHelpComponent} from './pages/app.help.component';
import {AppTimelineDemoComponent} from './pages/app.timelinedemo.component';
import { ParametrageComponent } from './module/parametrage/parametrage.component';
import {AffaireNouvelleComponent} from './module/contrat/affaire-nouvelle/affaire-nouvelle.component';
import {GarantComponent} from './module/contrat/garant/garant.component';
import {IntermediaireComponent} from './module/contrat/intermediaire/intermediaire.component';
import {PoliceComponent} from './module/contrat/police/police.component';
import {AvenantComponent} from './module/contrat/avenant/avenant.component';
import { BaremeComponent } from './module/contrat/bareme/bareme.component';
import { PrefinancementEditionComponent } from './module/prestation/sinistre/prefinancement-edition/prefinancement-edition.component';
import { PrefinancementValideComponent } from './module/prestation/sinistre/prefinancement-valide/prefinancement-valide.component';
import { OrdreReglementEditionComponent } from './module/prestation/ordre-reglement/ordre-reglement-edition/ordre-reglement-edition.component';
import { OrdreReglementValideComponent } from './module/prestation/ordre-reglement/ordre-reglement-valide/ordre-reglement-valide.component';
import { SouscripteurComponent } from './module/contrat/souscripteur/souscripteur.component';
import {TierPayantEditionComponent} from './module/prestation/tier-payant/tierPayant-edition/tierPayant-edition.component';
import {TierPayantValideComponent} from './module/prestation/tier-payant/tier-payant-valide/tier-payant-valide.component';
import {OrdreReglementTierPayantEditionComponent} from './module/prestation/tier-payant/ordre-reglement-edition/ordre-reglement-tier-payant-edition.component';
import {TierPayantOrdreReglementValideComponent} from './module/prestation/tier-payant/Tier-Payant-ordre-reglement-valide/tier-payant-ordre-reglement-valide.component';
import { ConsultationSinistreComponent } from './module/prestation/sinistre/consultation-sinistre/consultation-sinistre.component';
import {TierPayantConsultationComponent} from './module/prestation/tier-payant/Ordre-Reglement-Tier-Payant-consultation/tier-payant-consultation.component';
import {SinistreTiersPayantConsultationComponent} from './module/prestation/tier-payant/sinistre-Tiers-Payant-consultation/sinistre-Tiers-Payant-consultation.component';
import { OrdreReglementRechercheComponent } from './module/prestation/ordre-reglement/ordre-reglement-recherche/ordre-reglement-recherche.component';
import { BonPriseEnChargeComponent } from './module/medical/bon-prise-en-charge/bon-prise-en-charge.component';
import { OrdonnaceMedicalComponent } from './module/medical/ordonnace-medical/ordonnace-medical.component';
import { ConventionComponent } from './module/medical/convention/convention.component';
import { AssureComponent } from './module/contrat/assure/assure.component';
import { TierPayantOrdreReglementSearchComponent } from './module/prestation/tier-payant/tier-payant-ordre-reglement-search/tier-payant-ordre-reglement-search.component';
import { BulletinAdhesionComponent } from './module/contrat/bulletin-adhesion/bulletin-adhesion.component';
import { PrestataireCartographieComponent } from './module/contrat/prestataire-cartographie/prestataire-cartographie.component';
import { ExerciceComponent } from './module/contrat/exercice/exercice.component';
import { CompteComponent } from './module/comptabilite/compte/compte.component';
import { JournalComponent } from './module/comptabilite/journal/journal.component';
import { ExerciceComptableComponent } from './module/comptabilite/exercice-comptable/exercice-comptable.component';
import { ExerciceComptableOperationComponent } from './module/comptabilite/exercice-comptable-operation/exercice-comptable-operation.component';
import { OrdrePaimentInstanceComponent } from './module/comptabilite/ordre-paiment-instance/ordre-paiment-instance.component';
import { OrdrePaimentInstanceChequeComponent } from './module/comptabilite/ordre-paiment-instance-cheque/ordre-paiment-instance-cheque.component';
import { AppelFondComponent } from './module/comptabilite/appelFond/appelFond.component';
import { PaiementFactureComponent } from './module/comptabilite/paiement-facture/paiement-facture.component';
import { FacturePayeComponent } from './module/comptabilite/facture-paye/facture-paye.component';
import { RemboursementEffectueComponent } from './module/comptabilite/remboursement-effectue/remboursement-effectue.component';
import { ArreteJournauxComponent } from './module/comptabilite/arrete-journaux/arrete-journaux.component';
import { GrandLivreGeneralComponent } from './module/comptabilite/grand-livre-general/grand-livre-general.component';
import { BalanceComponent } from './module/comptabilite/balance/balance.component';
import { TiersComponent } from './module/comptabilite/tiers/tiers.component';
import { GrandLivreAuxiliaireComponent } from './module/comptabilite/grand-livre-auxiliaire/grand-livre-auxiliaire.component';
import { BalanceTiersComponent } from './module/comptabilite/balance-tiers/balance-tiers.component';
import { RecapitulatifComponent } from './module/reporting/production/recapitulatif/recapitulatif.component';
import { DepenseFamilleComponent } from './module/reporting/production/depense-famille/depense-famille.component';
import { DepenseFamilleActeComponent } from './module/reporting/production/depense-famille-acte/depense-famille-acte.component';
import { DepenseFamillePrestataireComponent } from './module/reporting/production/depense-famille-prestataire/depense-famille-prestataire.component';
import { DepenseFamillePathologieComponent } from './module/reporting/production/depense-famille-pathologie/depense-famille-pathologie.component';
import { RepartitionDepenseStatutComponent } from './module/reporting/production/repartitiondDepenseStatut/repartitionDepenseStatut.component';
import { DepenseOptiqueComponent } from './module/reporting/production/depense-optique/depense-optique.component';
import { ReportingOperateurComponent } from './module/reporting/prestation/reporting-operateur/reporting-operateur.component';
import { StatistiqueParTrancheAgeComponent } from './module/reporting/production/statistiqueParTrancheAge/statistiqueParTrancheAge.component';
import { ReportingChequeNonValideComponent } from './module/reporting/prestation/reporting-cheque-non-valide/reporting-cheque-non-valide.component';
import { ReportingChequeValideComponent } from './module/reporting/prestation/reporting-cheque-valide/reporting-cheque-valide.component';
import { FacturePrestatairesComponent } from './module/reporting/prestation/FacturePrestataires/facturePrestataires.component';
import { ConsommationParSexeComponent } from './module/reporting/medical/consommationParSexe/consommationParSexe.component';
import { OrdreReglementWorkflowComponent } from './module/prestation/ordre-reglement/ordre-reglement-workflow/ordre-reglement-workflow.component';
import { EvolutionMensuelleComponent } from './module/reporting/production/evolution-mensuelle/evolution-mensuelle.component';
import { FamilleAssureComponent } from './module/reporting/production/famille-assure/famille-assure.component';
import { AssureConsommationComponent } from './module/portail/assureConsommation/assureConsommation.component';
import { LoginComponent } from './login.component';
import { RegisterChooseComponent } from './module/portail/registerChoose/registerChoose.component';
import { RegisterComponent } from './module/portail/register/register.component';
import { SuiviRembourssementComponent } from './module/portail/suivi-rembourssement/suivi-rembourssement.component';
import { SuiviFactureComponent } from './module/portail/suivi-facture/suivi-facture.component';
import { ProduitExcluComponent } from './module/portail/produit-exclu/produit-exclu.component';
import { ProduitExcluUpdateComponent } from './module/medical/produit-exclu-update/produit-exclu-update.component';
import { EntenteComponent } from './module/portail/entente/entente.component';
import { EntenteBonComponent } from './module/medical/entente-bon/entente-bon.component';
import { QuartierPrestataireGarantComponent } from './module/medical/prestataire-garant-quartier/prestataire-garant-quartier.component';
import { PrestataireCartographieQuartierComponent } from './module/portail/prestataire-cartographie-quartier/prestataire-cartographie-quartier.component';
import { ConditionGeneraleComponent } from './module/contrat/condition-generale/condition-generale.component';
import { ConditionGeneraleParticuliereComponent } from './module/portail/condition-generale-particuliere/condition-generale-particuliere.component';
import { PharmacieGardeComponent } from './module/portail/pharmacie-garde/pharmacie-garde.component';
import { NouveauBaremeComponent } from './module/medical/nouveau-bareme/nouveau-bareme.component';
import { AssureBaremeComponent } from './module/portail/assure-bareme/assure-bareme.component';
import { ConventionPrestataireComponent } from './module/portail/convention-prestataire/convention-prestataire.component';
import { FoireComponent } from './module/contrat/foire/foire.component';
import { FoireQuestionComponent } from './module/portail/foire-question/foire-question.component';
import { AssureBaremePrestataireComponent } from './module/portail/assure-bareme-prestataire/assure-bareme-prestataire.component';
import { RemboursementInitieComponent } from './module/portail/remboursement-initie/remboursement-initie.component';
import { RemboursementInstanceComponent } from './module/prestation/remboursement-instance/remboursement-instance.component';
import { RemboursementEntenteComponent } from './module/medical/remboursement-entente/remboursement-entente.component';
import { BonPrestataireComponent } from './module/portail/bon-prestataire/bon-prestataire.component';
import { SouscripteurMouvementComponent } from './module/portail/souscripteur-mouvement/souscripteur-mouvement.component';
import { AuthGuard } from './auth/user-route-access-service';
import { AssuranceVoyageComponent } from './module/contrat/assurance-voyage/assurance-voyage.component';
import { MajPrestataireComponent } from './module/medical/majPrestataire/majPrestataire.component';
import { BilanComponent } from './module/comptabilite/bilan/bilan.component';
import { ConsommationPasseComponent } from './module/contrat/consommation-passe/consommation-passe.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                

                path: '', component: AppMainComponent,
                children: [
                    {
                        path: 'portail',  component: DashboardDemoComponent,
                        children:[]
                      },
                      {path: 'login', component: LoginComponent},

                    {path: '', component: DashboardDemoComponent},
                    {path: 'prestataire-cartographie', component: PrestataireCartographieComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_medical','sm_medical_tout']}},
                    {path: 'parametrage', component: ParametrageComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_parametrage']}},
                    {path: 'contrat/affaire-nouvelle', component: AffaireNouvelleComponent,
                     children: [
                        {path: 'souscripteur', component: SouscripteurComponent},
                        {path: 'parametrage', component: ParametrageComponent,
                        canActivate: [AuthGuard],
                        data: { roles: ['sm_parametrage']}},
                    ]
                    },
                    {path: 'contrat/consommation-passe', 
                    canActivate: [AuthGuard],
                    component: ConsommationPasseComponent,    
                    data: { roles: ['sm_production', 'sm_garant']}},
                    {path: 'contrat/garant', 
                    canActivate: [AuthGuard],
                    component: GarantComponent,    
                    data: { roles: ['sm_production', 'sm_garant']}},
                    {path: 'contrat/intermediaire', 
                    component: IntermediaireComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_production', 'sm_intermediaire']}},
                    {path: 'contrat/police', component: PoliceComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_production', 'sm_police']}},
                    {path: 'contrat/assure', component: AssureComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_production', 'sm_assure']}},
                    {path: 'contrat/bareme', component: BaremeComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_production', 'sm_bareme']}},
                    {path: 'contrat/exercice', component: ExerciceComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_production', 'sm_exercice']}},
                    {path: 'contrat/avenant', component: AvenantComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_production', 'sm_avenant']}},
                    {path: 'contrat/condition-generale', component: ConditionGeneraleComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_production']}},
                    {path: 'prestation/prefinancement', component: PrefinancementEditionComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_prestation', 'sm_prefinancement', 'sm_sinistre_edition']}},
                    {path: 'prestation/prefinancement/valide', component: PrefinancementValideComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_prestation', 'sm_prefinancement', 'sm_sinistre_valide']}},
                    {path: 'prestation/prefinancement/consultation', component: ConsultationSinistreComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_prestation', 'sm_prefinancement', 'sm_sinistre_consultation']}},
                    {path: 'prestation/prefinancement/ordre-reglement', component: OrdreReglementEditionComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_prestation', 'sm_prefinancement', 'sm_ordre_reglement_edition']}},
                    {path: 'prestation/prefinancement/ordre-reglement/valide', component: OrdreReglementValideComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_prestation', 'sm_prefinancement', 'sm_ordre_reglement_valide']}},
                    {path: 'prestation/prefinancement/ordre-reglement/consultation', component: OrdreReglementRechercheComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_prestation', 'sm_prefinancement', 'sm_ordre_reglement_consultation']}},
                    {path: 'medical/bon-prise-en-charge', component: BonPriseEnChargeComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_medical', 'sm_medical_pretataire']}},
                    {path: 'medical/convention', component: ConventionComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_medical','sm_medical_tout']}},
                    /* {path: 'uikit/formlayout', component: FormLayoutDemoComponent},
                    {path: 'uikit/input', component: InputDemoComponent},
                    {path: 'uikit/floatlabel', component: FloatLabelDemoComponent},
                    {path: 'uikit/invalidstate', component: InvalidStateDemoComponent},
                    {path: 'uikit/button', component: ButtonDemoComponent},
                    {path: 'uikit/table', component: TableDemoComponent},
                    {path: 'uikit/list', component: ListDemoComponent},
                    {path: 'uikit/tree', component: TreeDemoComponent},
                    {path: 'uikit/panel', component: PanelsDemoComponent},
                    {path: 'uikit/overlay', component: OverlaysDemoComponent},
                    {path: 'uikit/menu', component: MenusDemoComponent},
                    {path: 'uikit/media', component: MediaDemoComponent},
                    {path: 'uikit/message', component: MessagesDemoComponent},
                    {path: 'uikit/misc', component: MiscDemoComponent},
                    {path: 'uikit/charts', component: ChartsDemoComponent},
                    {path: 'uikit/file', component: FileDemoComponent},
                    {path: 'utilities/display', component: DisplayComponent},
                    {path: 'utilities/elevation', component: ElevationComponent},
                    {path: 'utilities/flexbox', component: FlexboxComponent},
                    {path: 'utilities/grid', component: GridComponent},
                    {path: 'utilities/icons', component: IconsComponent},
                    {path: 'utilities/widgets', component: WidgetsComponent},
                    {path: 'utilities/spacing', component: SpacingComponent},
                    {path: 'utilities/typography', component: TypographyComponent},
                    {path: 'utilities/text', component: TextComponent},
                    {path: 'pages/crud', component: AppCrudComponent},
                    {path: 'pages/calendar', component: AppCalendarComponent},
                    {path: 'pages/timeline', component: AppTimelineDemoComponent},
                    {path: 'pages/invoice', component: AppInvoiceComponent},
                    {path: 'pages/help', component: AppHelpComponent},
                    {path: 'pages/empty', component: EmptyDemoComponent},
                    {path: 'documentation', component: DocumentationComponent}, */
                    {path: 'prestation/tierPayant', component: TierPayantEditionComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_prestation', 'sm_tiers_payant', 'sm_tiers_payant_edition']}},
                    {path: 'prestation/tierPayant/valide', component: TierPayantValideComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_prestation', 'sm_tiers_payant', 'sm_tiers_payant_valide']}},
                    {path: 'prestation/tierPayant/ordre-reglement', component: OrdreReglementTierPayantEditionComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_prestation', 'sm_tiers_payant', 'sm_tiers_payant_ordre_reglement_edition']}},
                    {path: 'prestation/tierPayant/ordre-reglement/valide', component: TierPayantOrdreReglementValideComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_prestation', 'sm_tiers_payant', 'sm_tiers_payant_ordre_reglement_valide']}},
                    {path: 'prestation/tierPayant/ORD', component: TierPayantConsultationComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_prestation', 'sm_tiers_payant', 'sm_tiers_payant_ordre_reglement_consultation']}},
                    {path: 'prestation/tierPayant/consultation', component: SinistreTiersPayantConsultationComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_prestation', 'sm_tiers_payant', 'sm_tiers_payant_consultation']}},
                    {path: 'prestation/tierPayant/ord-reglement/consultation', component: TierPayantOrdreReglementSearchComponent},
                    {path: 'medical/ordonnace-medical', component: OrdonnaceMedicalComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_medical','sm_medical_tout']}},
                    {path: 'contrat/bulletin-adhesion', component: BulletinAdhesionComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_production', 'sm_bulletin_adhesion']}},
                    {path: 'comptabilite/compte', component: CompteComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_finance']}},
                    {path: 'comptabilite/journal', component: JournalComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_finance']}},
                    {path: 'comptabilite/exercice-comptable', component: ExerciceComptableComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_finance']}},
                    {path: 'comptabilite/exercice-comptable-operation', component: ExerciceComptableOperationComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_finance']}},
                    {path: 'comptabilite/ordre-paiment-instance', component: OrdrePaimentInstanceComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_finance']}},
                    {path: 'comptabilite/ordre-paiment-instance-cheque', component: OrdrePaimentInstanceChequeComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_finance']}},
                    {path: 'comptabilite/appel-fond', component: AppelFondComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_finance']}},
                    {path: 'comptabilite/paiement-facture', component: PaiementFactureComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_finance']}},
                    {path: 'comptabilite/facture-paye', component: FacturePayeComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_finance']}},
                    {path: 'comptabilite/remboursement-effectue', component: RemboursementEffectueComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_finance']}},
                    {path: 'comptabilite/arrete-journaux', component: ArreteJournauxComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_finance']}},
                    {path: 'comptabilite/grand-livre-general', component: GrandLivreGeneralComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_finance']}},
                    {path: 'comptabilite/balance', component: BalanceComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_finance']}},
                    {path: 'comptabilite/tiers', component: TiersComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_finance']}},
                    {path: 'comptabilite/grand-livre-auxiliaire', component: GrandLivreAuxiliaireComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_finance']}},
                    {path: 'comptabilite/balance-tiers', component: BalanceTiersComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_finance']}},
                    {path: 'reporting/recapitulatif', component: RecapitulatifComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_reporting']}},
                    {path: 'reporting/depense-famille', component: DepenseFamilleComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_reporting']}},
                    {path: 'reporting/evolution-mensuelle', component: EvolutionMensuelleComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_reporting']}},
                    {path: 'reporting/depense-famille-acte', component: DepenseFamilleActeComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_reporting']}},
                    {path: 'reporting/repartition-depense-statut', component: RepartitionDepenseStatutComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_reporting']}},
                    {path: 'reporting/depense-famille-prestataire', component: DepenseFamillePrestataireComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_reporting']}},
                    {path: 'reporting/depense-famille-pathologie', component: DepenseFamillePathologieComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_reporting']}},
                    {path: 'reporting/statistique-tranche-age', component: StatistiqueParTrancheAgeComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_reporting']}},
                    {path: 'reporting/depense-famille-prestataire', component: DepenseFamillePrestataireComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_reporting']}},
                    {path: 'reporting/depense-famille-pathologie', component: DepenseFamillePathologieComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_reporting']}},
                    {path: 'reporting/repartition-depense-statut', component: RepartitionDepenseStatutComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_reporting']}},
                    {path: 'reporting/depense-optique', component: DepenseOptiqueComponent},
                    {path: 'reporting/facture-par-prestataires', component: FacturePrestatairesComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_reporting']}},
                    {path: 'reporting/medical/consommation-par-sexe', component: ConsommationParSexeComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_reporting']}},
                    {path: 'reporting/reporting-operateur', component: ReportingOperateurComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_reporting']}},
                    {path: 'reporting/reporting-cheque-non-valide', component: ReportingChequeNonValideComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_reporting']}},
                    {path: 'reporting/reporting-cheque-valide', component: ReportingChequeValideComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_reporting']}},
                    {path: 'prestation/Workflow/ordre-reglement-workflow', component: OrdreReglementWorkflowComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_reporting']}},
                    {path: 'reporting/famille-assure', component: FamilleAssureComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_reporting']}},
                    {path: 'portail/assureConsommation', 
                    canActivate: [AuthGuard],
                    component: AssureConsommationComponent,
                    data: { roles: ['VUE_ASSURE']}},
                    {path: 'portail/registerChoose', component: RegisterChooseComponent},
                    {path: 'portail/register', component: RegisterComponent},
                    {path: 'portail/suivi-rembourssement', component: SuiviRembourssementComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['VUE_ASSURE']}},
                    {path: 'portail/suivi-facture', component: SuiviFactureComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['VUE_PRESTATAIRE']}},
                    {path: 'portail/produit-exclu', component: ProduitExcluComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['VUE_ASSURE']}},
                    {path: 'medical/produit-exclu', component: ProduitExcluUpdateComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_medical']}},
                    {path: 'portail/entente', component: EntenteComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['VUE_ASSURE']}},
                    {path: 'portail/prestataire-cartographie-quartier', component: PrestataireCartographieQuartierComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_portail']}},
                    {path: 'medical/entente-bon', component: EntenteBonComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_medical']}},
                    {path: 'medical/quartier-prestataire-garant', component: QuartierPrestataireGarantComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_medical']}},
                    {path: 'portail/condition-generale-particuliere', component: ConditionGeneraleParticuliereComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['VUE_ASSURE']}},
                    {path: 'medical/entente-bon', component: EntenteBonComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_medical']}},
                    {path: 'portail/pharmacie-garde', 
                    canActivate: [AuthGuard],
                    component: PharmacieGardeComponent,
                    data: { roles: ['VUE_ASSURE']}},
                    {path: 'medical/new-bareme', component: NouveauBaremeComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_medical']}},
                    {path: 'portail/bareme', component: AssureBaremeComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['VUE_ASSURE']}},
                    {path: 'portail/convention', component: ConventionPrestataireComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['VUE_PRESTATAIRE']}},
                    {path: 'contrat/foire', component: FoireComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_production']}},
                    {path: 'portail/foire-question', component: FoireQuestionComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_portail']}},
                    {path: 'portail/bareme-prestataire', component: AssureBaremePrestataireComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['VUE_PRESTATAIRE']}},
                    {path: 'portail/mouvement-souscripteur', component: SouscripteurMouvementComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['VUE_SOUSCRIPTEUR']}},
                    {path: 'portail/remboursement-initie', component: RemboursementInitieComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['VUE_ASSURE']}},
                    {path: 'prestation/remboursement-instance', component: RemboursementInstanceComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_prestation']}},
                    {path: 'medical/remboursement-entente', component: RemboursementEntenteComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_medical','sm_medical_tout']}},
                    {path: 'portail/bon-prestataire', component: BonPrestataireComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['VUE_PRESTATAIRE']}},
                    {path: 'contrat/assurance-voyage', 
                    canActivate: [AuthGuard],
                    component: AssuranceVoyageComponent,    
                    data: { roles: ['sm_production']}},
                    {path: 'medical/maj-prestataire', component: MajPrestataireComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['vue_maj_prestataire']}},
                    {path: 'comptabilite/bilan', component: BilanComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_finance']}},
                    /* {path: 'reporting', 
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_reporting_AG_DGA']}}, */
                    /** Partie devant être affichée dans les comptes de gestion dans SOLMAVI */
                    {path: 'reporting_AG_DGA/recapitulatif', component: RecapitulatifComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_reporting_AG_DGA']}},
                    {path: 'reporting_AG_DGA/depense-famille', component: DepenseFamilleComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_reporting_AG_DGA']}},
                    {path: 'reporting_AG_DGA/evolution-mensuelle', component: EvolutionMensuelleComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_reporting_AG_DGA']}},
                    {path: 'reporting_AG_DGA/depense-famille-acte', component: DepenseFamilleActeComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_reporting_AG_DGA']}},
                    {path: 'reporting_AG_DGA/repartition-depense-statut', component: RepartitionDepenseStatutComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_reporting_AG_DGA']}},
                    {path: 'reporting_AG_DGA/depense-famille-prestataire', component: DepenseFamillePrestataireComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_reporting_AG_DGA']}},
                    {path: 'reporting_AG_DGA/depense-famille-pathologie', component: DepenseFamillePathologieComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_reporting_AG_DGA']}},
                    {path: 'reporting_AG_DGA/statistique-tranche-age', component: StatistiqueParTrancheAgeComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_reporting_AG_DGA']}},
                    {path: 'reporting_AG_DGA/depense-famille-prestataire', component: DepenseFamillePrestataireComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_reporting_AG_DGA']}},
                    {path: 'reporting_AG_DGA/depense-famille-pathologie', component: DepenseFamillePathologieComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_reporting_AG_DGA']}},
                    {path: 'reporting_AG_DGA/repartition-depense-statut', component: RepartitionDepenseStatutComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_reporting_AG_DGA']}},
                    {path: 'reporting_AG_DGA/depense-optique', component: DepenseOptiqueComponent},
                    {path: 'reporting_AG_DGA/facture-par-prestataires', component: FacturePrestatairesComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_reporting_AG_DGA']}},
                    {path: 'reporting_AG_DGA/medical/consommation-par-sexe', component: ConsommationParSexeComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_reporting_AG_DGA']}},
                    {path: 'reporting_AG_DGA/reporting-operateur', component: ReportingOperateurComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_reporting_AG_DGA']}},
                    {path: 'reporting_AG_DGA/reporting-cheque-non-valide', component: ReportingChequeNonValideComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_reporting_AG_DGA']}},
                    {path: 'reporting_AG_DGA/reporting-cheque-valide', component: ReportingChequeValideComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_reporting_AG_DGA']}},
                    {path: 'prestation/Workflow/ordre-reglement-workflow', component: OrdreReglementWorkflowComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_reporting_AG_DGA']}},
                    {path: 'reporting_AG_DGA/famille-assure', component: FamilleAssureComponent,
                    canActivate: [AuthGuard],
                    data: { roles: ['sm_reporting_AG_DGA']}},
                    

                    
                    
                    
                    
                    
                    
                ]
            },
           /*  {
                path: 'admin',
                data: {
                  authorities: []
                },
              
              }, */
            {path: 'error', component: AppErrorComponent},
            {path: 'access', component: AppAccessdeniedComponent},
            {path: 'notfound', component: AppNotfoundComponent},
            {path: 'login', component: AppLoginComponent},
            {path: '**', redirectTo: '/notfound'},
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
