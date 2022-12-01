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
import { StatistiqueParTrancheAgeComponent } from './module/reporting/production/statistiqueParTrancheAge/statistiqueParTrancheAge.component';
import { DepenseFamillePrestataireComponent } from './module/reporting/production/depense-famille-prestataire/depense-famille-prestataire.component';
import { DepenseFamillePathologieComponent } from './module/reporting/production/depense-famille-pathologie/depense-famille-pathologie.component';
import { RepartitionDepenseStatutComponent } from './module/reporting/production/repartitiondDepenseStatut/repartitionDepenseStatut.component';
import { DepenseOptiqueComponent } from './module/reporting/production/depense-optique/depense-optique.component';
import { FacturePrestatairesComponent } from './module/reporting/prestation/FacturePrestataires/facturePrestataires.component';
import { ConsommationParSexeComponent } from './module/reporting/medical/consommationParSexe/consommationParSexe.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppMainComponent,
                children: [
                    {path: '', component: DashboardDemoComponent},
                    {path: 'prestataire-cartographie', component: PrestataireCartographieComponent},
                    {path: 'parametrage', component: ParametrageComponent},
                    {path: 'contrat/affaire-nouvelle', component: AffaireNouvelleComponent,
                     children: [
                        {path: 'souscripteur', component: SouscripteurComponent},
                        {path: 'parametrage', component: ParametrageComponent}
                    ]
                    },
                    {path: 'contrat/garant', component: GarantComponent},
                    {path: 'contrat/intermediaire', component: IntermediaireComponent},
                    {path: 'contrat/police', component: PoliceComponent},
                    {path: 'contrat/assure', component: AssureComponent},
                    {path: 'contrat/bareme', component: BaremeComponent},
                    {path: 'contrat/exercice', component: ExerciceComponent},
                    {path: 'contrat/avenant', component: AvenantComponent},
                    {path: 'prestation/prefinancement', component: PrefinancementEditionComponent},
                    {path: 'prestation/prefinancement/valide', component: PrefinancementValideComponent},
                    {path: 'prestation/prefinancement/consultation', component: ConsultationSinistreComponent},
                    {path: 'prestation/prefinancement/ordre-reglement', component: OrdreReglementEditionComponent},
                    {path: 'prestation/prefinancement/ordre-reglement/valide', component: OrdreReglementValideComponent},
                    {path: 'prestation/prefinancement/ordre-reglement/consultation', component: OrdreReglementRechercheComponent},
                    {path: 'medical/bon-prise-en-charge', component: BonPriseEnChargeComponent},
                    {path: 'medical/convention', component: ConventionComponent},
                    {path: 'uikit/formlayout', component: FormLayoutDemoComponent},
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
                    {path: 'documentation', component: DocumentationComponent},
                    {path: 'prestation/tierPayant', component: TierPayantEditionComponent},
                    {path: 'prestation/tierPayant/valide', component: TierPayantValideComponent},
                    {path: 'prestation/tierPayant/ordre-reglement', component: OrdreReglementTierPayantEditionComponent},
                    {path: 'prestation/tierPayant/ordre-reglement/valide', component: TierPayantOrdreReglementValideComponent},
                    {path: 'prestation/tierPayant/ORD', component: TierPayantConsultationComponent},
                    {path: 'prestation/tierPayant/consultation', component: SinistreTiersPayantConsultationComponent},
                    {path: 'prestation/tierPayant/ord-reglement/consultation', component: TierPayantOrdreReglementSearchComponent},
                    {path: 'medical/ordonnace-medical', component: OrdonnaceMedicalComponent},
                    {path: 'contrat/bulletin-adhesion', component: BulletinAdhesionComponent},
                    {path: 'comptabilite/compte', component: CompteComponent},
                    {path: 'comptabilite/journal', component: JournalComponent},
                    {path: 'comptabilite/exercice-comptable', component: ExerciceComptableComponent},
                    {path: 'comptabilite/exercice-comptable-operation', component: ExerciceComptableOperationComponent},
                    {path: 'comptabilite/ordre-paiment-instance', component: OrdrePaimentInstanceComponent},
                    {path: 'comptabilite/ordre-paiment-instance-cheque', component: OrdrePaimentInstanceChequeComponent},
                    {path: 'comptabilite/appel-fond', component: AppelFondComponent},
                    {path: 'comptabilite/paiement-facture', component: PaiementFactureComponent},
                    {path: 'comptabilite/facture-paye', component: FacturePayeComponent},
                    {path: 'comptabilite/remboursement-effectue', component: RemboursementEffectueComponent},
                    {path: 'comptabilite/arrete-journaux', component: ArreteJournauxComponent},
                    {path: 'comptabilite/grand-livre-general', component: GrandLivreGeneralComponent},
                    {path: 'comptabilite/balance', component: BalanceComponent},
                    {path: 'comptabilite/tiers', component: TiersComponent},
                    {path: 'comptabilite/grand-livre-auxiliaire', component: GrandLivreAuxiliaireComponent},
                    {path: 'comptabilite/balance-tiers', component: BalanceTiersComponent},
                    {path: 'reporting/recapitulatif', component: RecapitulatifComponent},
                    {path: 'reporting/depense-famille', component: DepenseFamilleComponent},
                    {path: 'reporting/depense-famille-acte', component: DepenseFamilleActeComponent},
                    {path: 'reporting/repartition-depense-statut', component: RepartitionDepenseStatutComponent},
                    {path: 'reporting/depense-famille-prestataire', component: DepenseFamillePrestataireComponent},
                    {path: 'reporting/depense-famille-pathologie', component: DepenseFamillePathologieComponent},
                    {path: 'reporting/statistique-tranche-age', component: StatistiqueParTrancheAgeComponent},
                    {path: 'reporting/depense-famille-prestataire', component: DepenseFamillePrestataireComponent},
                    {path: 'reporting/depense-famille-pathologie', component: DepenseFamillePathologieComponent},
                    {path: 'reporting/repartition-depense-statut', component: RepartitionDepenseStatutComponent},
                    {path: 'reporting/depense-optique', component: DepenseOptiqueComponent},
                    {path: 'reporting/facture-par-prestataires', component: FacturePrestatairesComponent},
                    {path: 'reporting/medical/consommation-par-sexe', component: ConsommationParSexeComponent},

                    
                ]
            },
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
