import {NgModule, APP_INITIALIZER,  CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {AppRoutingModule} from './app-routing.module';
// PrimeNG Components for demos
import {AccordionModule} from 'primeng/accordion';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {AvatarGroupModule} from 'primeng/avatargroup';
import {AvatarModule} from 'primeng/avatar';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {BadgeModule} from 'primeng/badge';
import {ButtonModule} from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';
import {CardModule} from 'primeng/card';
import {CarouselModule} from 'primeng/carousel';
import {ChartModule} from 'primeng/chart';
import {CheckboxModule} from 'primeng/checkbox';
import {ChipModule} from 'primeng/chip';
import {ChipsModule} from 'primeng/chips';
import {CodeHighlighterModule} from 'primeng/codehighlighter';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {ColorPickerModule} from 'primeng/colorpicker';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DataViewModule} from 'primeng/dataview';
import {DialogModule} from 'primeng/dialog';
import {DividerModule} from 'primeng/divider';
import {DropdownModule} from 'primeng/dropdown';
import {FieldsetModule} from 'primeng/fieldset';
import {FileUploadModule} from 'primeng/fileupload';
import {FullCalendarModule} from 'primeng/fullcalendar';
import {GalleriaModule} from 'primeng/galleria';
import {InplaceModule} from 'primeng/inplace';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputMaskModule} from 'primeng/inputmask';
import {InputSwitchModule} from 'primeng/inputswitch';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {LightboxModule} from 'primeng/lightbox';
import {KnobModule} from 'primeng/knob';
import {ListboxModule} from 'primeng/listbox';
import {MegaMenuModule} from 'primeng/megamenu';
import {MenuModule} from 'primeng/menu';
import {MenubarModule} from 'primeng/menubar';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {MultiSelectModule} from 'primeng/multiselect';
import {OrderListModule} from 'primeng/orderlist';
import {OrganizationChartModule} from 'primeng/organizationchart';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {PaginatorModule} from 'primeng/paginator';
import {PanelModule} from 'primeng/panel';
import {PanelMenuModule} from 'primeng/panelmenu';
import {PasswordModule} from 'primeng/password';
import {PickListModule} from 'primeng/picklist';
import {ProgressBarModule} from 'primeng/progressbar';
import {RadioButtonModule} from 'primeng/radiobutton';
import {RatingModule} from 'primeng/rating';
import {RippleModule} from 'primeng/ripple';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {ScrollTopModule} from 'primeng/scrolltop';
import {SelectButtonModule} from 'primeng/selectbutton';
import {SidebarModule} from 'primeng/sidebar';
import {SkeletonModule} from 'primeng/skeleton';
import {SlideMenuModule} from 'primeng/slidemenu';
import {SliderModule} from 'primeng/slider';
import {SplitButtonModule} from 'primeng/splitbutton';
import {SplitterModule} from 'primeng/splitter';
import {StepsModule} from 'primeng/steps';
import {TabMenuModule} from 'primeng/tabmenu';
import {TableModule} from 'primeng/table';
import {TabViewModule} from 'primeng/tabview';
import {TagModule} from 'primeng/tag';
import {TerminalModule} from 'primeng/terminal';
import {TieredMenuModule} from 'primeng/tieredmenu';
import {TimelineModule} from 'primeng/timeline';
import {ToastModule} from 'primeng/toast';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {ToolbarModule} from 'primeng/toolbar';
import {TooltipModule} from 'primeng/tooltip';
import {TreeModule} from 'primeng/tree';
import {TreeTableModule} from 'primeng/treetable';
import {VirtualScrollerModule} from 'primeng/virtualscroller';

// Application Components
import {AppComponent} from './app.component';
import {AppMainComponent} from './app.main.component';
import {AppMenuComponent} from './app.menu.component';
import {AppMenuitemComponent} from './app.menuitem.component';
import {AppActionBarComponent} from './app.actionbar.component';
import {AppConfigComponent} from './app.config.component';
import {AppTopBarComponent} from './app.topbar.component';
import {AppFooterComponent} from './app.footer.component';
// Demo pages
import {AppCodeModule} from './app.code.component';
import {DashboardDemoComponent} from './demo/view/dashboarddemo.component';
import {FormLayoutDemoComponent} from './demo/view/formlayoutdemo.component';
import {FloatLabelDemoComponent} from './demo/view/floatlabeldemo.component';
import {InputDemoComponent} from './demo/view/inputdemo.component';
import {InvalidStateDemoComponent} from './demo/view/invalidstatedemo.component';
import {ButtonDemoComponent} from './demo/view/buttondemo.component';
import {TableDemoComponent} from './demo/view/tabledemo.component';
import {ListDemoComponent} from './demo/view/listdemo.component';
import {TreeDemoComponent} from './demo/view/treedemo.component';
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
import {AppNotfoundComponent} from './pages/app.notfound.component';
import {AppErrorComponent} from './pages/app.error.component';
import {AppAccessdeniedComponent} from './pages/app.accessdenied.component';
import {AppTimelineDemoComponent} from './pages/app.timelinedemo.component';
import {AppLoginComponent} from './pages/app.login.component';

import {CountryService} from './demo/service/countryservice';
import {CustomerService} from './demo/service/customerservice';
import {EventService} from './demo/service/eventservice';
import {IconService} from './demo/service/iconservice';
import {NodeService} from './demo/service/nodeservice';
import {PhotoService} from './demo/service/photoservice';
import {ProductService} from './demo/service/productservice';
import {BreadcrumbService} from './app.breadcrumb.service';
import {MenuService} from './app.menu.service';
import {initializeKeycloak} from './init/keycloak-init.factory';
import {KeycloakAngularModule, KeycloakService} from 'keycloak-angular';
import { ParametrageComponent } from './module/parametrage/parametrage.component';
import {StoreModule} from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {GarantieEffects} from './store/parametrage/garantie/effect';
import {ActeEffects} from './store/parametrage/acte/effect';
import {SousActeEffects} from './store/parametrage/sous-acte/effect';
import {SecteurActiviteEffects} from './store/parametrage/secteur-activite/effect';

import { TauxEffects } from './store/parametrage/taux/effect';
import { DimensionPeriodeEffects } from './store/parametrage/dimension-periode/effect';
import { TerritorialiteEffects } from './store/parametrage/territorialite/effect';
import { TypeGarantEffects } from './store/parametrage/garant/effect';
import { QualiteAssureEffects } from './store/parametrage/qualite-assure/effect';
import { CategorieSocioProfessionnelEffects } from './store/parametrage/categorie-socio-professionnel/effect';
import { ProfessionEffects } from './store/parametrage/profession/effect';
import { StatusEffects } from './store/parametrage/status/effect';
import { TypePrestataireEffects } from './store/parametrage/type-prestataire/effect';
import { PrestataireEffects } from './store/parametrage/prestataire/effect';
import { NaturePrestataireEffects } from './store/parametrage/nature-prestataire/effect';
import { MedecinEffects } from './store/parametrage/medecin/effect';
import { QualiteMedecinEffects } from './store/parametrage/qualite-medecin/effect';
import { ProduitPharmaceutiqueEffects } from './store/parametrage/produit-pharmaceutique/effect';
import { PathologieEffects } from './store/parametrage/pathologie/effect';
import { TypeAvenantEffects } from './store/parametrage/type-avenant/effect';
import { TypeAffaireEffects } from './store/parametrage/type-affaire/effect';
import { TypePrimeEffects } from './store/parametrage/type-prime/effect';
import { GenreEffects } from './store/parametrage/genre/effect';
import { ModePaiementEffects } from './store/parametrage/mode-paiement/effect';
import { RegionEffects } from './store/parametrage/region/effect';
import { DepartementEffects } from './store/parametrage/departement/effect';
import { VilleEffects } from './store/parametrage/ville/effect';
import { CommuneEffects } from './store/parametrage/commune/effect';
import {metaReducers, reducers} from './store/global/index';
import {ReactiveFormsModule} from '@angular/forms';
import {ConfirmationService,MessageService} from 'primeng/api';
import { PaysEffects } from './store/parametrage/pays/effect';
import { ZonePaysEffects } from './store/parametrage/zone-pays/effect';
import { AffaireNouvelleComponent } from './module/contrat/affaire-nouvelle/affaire-nouvelle.component';
import { GarantComponent } from './module/contrat/garant/garant.component';
import { IntermediaireComponent } from './module/contrat/intermediaire/intermediaire.component';
import { GarantEffects } from './store/contrat/garant/effect';
import {IntermediaireEffects} from './store/contrat/intermediaire/effects';
import { PrefinancementEffects } from './store/prestation/prefinancement/effect';
import {PoliceEffects} from './store/contrat/police/effect';
import {GroupeEffects} from './store/contrat/groupe/effect';
import { Plafond } from './store/contrat/plafond/model';
import { PlafondEffects } from './store/contrat/plafond/effect';
import { TypeIntermediaireEffects } from './store/parametrage/type-intermediaire/effect';
import { EntityValidationComponent } from './module/common/entity-validation/entity-validation.component';
import { SouscripteurComponent } from './module/contrat/souscripteur/souscripteur.component';
import { PoliceComponent } from './module/contrat/police/police.component';
import { AddRowDirective } from './module/contrat/police/add-row.directive';
import {FormatTableValuePipe} from './module/pipes/format-table-value.pipe';
import {MatStepperModule} from '@angular/material/stepper';
import {AvenantComponent} from './module/contrat/avenant/avenant.component';
import { AdherentEffects } from './store/contrat/adherent/effect';
import { SecteurEffects } from './store/parametrage/secteur/effect';
import { ArrondissementEffects } from './store/parametrage/arrondissement/effect';
import { LoaderService,LoaderInterceptor } from './module/util/loader-util';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {BlockUIModule} from 'primeng/blockui';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {AvenantIncorporationComponent} from './module/contrat/avenant/avenant-incorporation/avenant-incorporation.component';
import {GroupeComponent} from './module/contrat/avenant/grpoue/groupe.component';
import {HistoriqueAvenantEffects} from './store/contrat/historiqueAvenant/effect';
import { BanqueEffects } from './store/parametrage/Banques/effect';
import { TauxCommissionIntermediaireEffects } from './store/parametrage/taux-commission-intermediaire/effect';
import {AvenantRetraitComponent} from './module/contrat/avenant/avenant-retrait.component/avenant-retrait.component';
import {AvenantRenouvellementComponent} from './module/contrat/avenant/avenant-renouvellement/avenant-renouvellement.component';
import {AvenantModificationComponent} from './module/contrat/avenant/avenant-modification.component/avenant-modification.component';
import { PlafondComponent } from './module/contrat/avenant/plafond/plafond.component';
import {Upercase} from './module/pipes/upercase';
import { SeparatorPipe } from './module/pipes/separator.pipe';
import { BaremeComponent } from './module/contrat/bareme/bareme.component';
import { UploadFileComponent } from './module/contrat/avenant/upload-file/upload-file.component';
import { AdherentListComponent } from './module/contrat/police/adherent-list/adherent-list.component';
import { AvenantSuspensionComponent } from './module/contrat/avenant/avenant-suspension/avenant-suspension.component';
import { AvenantResiliationComponent } from './module/contrat/avenant/avenant-resiliation/avenant-resiliation.component';
import {BeginLowerCasePipe} from './module/pipes/begin-lower-case.pipe';
import { PrefinancementValideComponent } from './module/prestation/sinistre/prefinancement-valide/prefinancement-valide.component';
import { OrdreReglementEditionComponent } from './module/prestation/ordre-reglement/ordre-reglement-edition/ordre-reglement-edition.component';
import { OrdreReglementValideComponent } from './module/prestation/ordre-reglement/ordre-reglement-valide/ordre-reglement-valide.component';
import { PrefinancementEditionComponent } from './module/prestation/sinistre/prefinancement-edition/prefinancement-edition.component';
import { AvenantFacturationComponent } from './module/contrat/avenant/avenant-facturation/avenant-facturation.component';
import {TierPayantEditionComponent} from './module/prestation/tier-payant/tierPayant-edition/tierPayant-edition.component';
import {TierPayantEffects} from './store/prestation/tierPayant/effect';
import {ExerciceEffects} from './store/contrat/exercice/effect';
import {TierPayantValideComponent} from './module/prestation/tier-payant/tier-payant-valide/tier-payant-valide.component';
import {OrdreReglementTierPayantEditionComponent} from './module/prestation/tier-payant/ordre-reglement-edition/ordre-reglement-tier-payant-edition.component';
import {TierPayantOrdreReglementValideComponent} from './module/prestation/tier-payant/Tier-Payant-ordre-reglement-valide/tier-payant-ordre-reglement-valide.component';
import { ConsultationSinistreComponent } from './module/prestation/sinistre/consultation-sinistre/consultation-sinistre.component';
import {TierPayantConsultationComponent} from './module/prestation/tier-payant/Ordre-Reglement-Tier-Payant-consultation/tier-payant-consultation.component';
import { OrdreReglementConsultationComponent } from './module/prestation/ordre-reglement/ordre-reglement-consultation/ordre-reglement-consultation.component';
import {SinistreTiersPayantConsultationComponent} from './module/prestation/tier-payant/sinistre-Tiers-Payant-consultation/sinistre-Tiers-Payant-consultation.component';
import { OrdreReglementRechercheComponent } from './module/prestation/ordre-reglement/ordre-reglement-recherche/ordre-reglement-recherche.component';
import { BonPriseEnChargeComponent } from './module/medical/bon-prise-en-charge/bon-prise-en-charge.component';
import { BonPriseEnChargeEffects } from './store/medical/bon-prise-en-charge/effect';
import { OrdonnaceMedicalComponent } from './module/medical/ordonnace-medical/ordonnace-medical.component';
import { AdherentListEditComponent } from './module/contrat/avenant/adherent-list-edit/adherent-list-edit.component';
import { OrdonnanceMedicaleEffects } from './store/medical/ordonnance-medical/effect';
import { ConventionComponent } from './module/medical/convention/convention.component';
import { ConventionEffects } from './store/medical/convention/effect';
import { MedicalPipe } from './module/medical/pipes/medical.pipe';
import { AssureComponent } from './module/contrat/assure/assure.component';
import { TierPayantOrdreReglementSearchComponent } from './module/prestation/tier-payant/tier-payant-ordre-reglement-search/tier-payant-ordre-reglement-search.component';
import { PlafondFamilleActeComponent } from './module/contrat/avenant/plafond-famille-acte/plafond-famille-acte.component';
import { PlafondActeComponent } from './module/contrat/avenant/plafond-acte/plafond-acte.component';
import { PlafondSousActeComponent } from './module/contrat/avenant/plafond-sous-acte/plafond-sous-acte.component';
import { BulletinAdhesionComponent } from './module/contrat/bulletin-adhesion/bulletin-adhesion.component';
import { BulletinAdhesionEffects } from './store/contrat/bulletin-adhesion/effect';

@NgModule({
    imports: [
        BrowserModule,
        MatStepperModule,
        ProgressSpinnerModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        AccordionModule,
        AutoCompleteModule,
        AvatarGroupModule,
        AvatarModule,
        BreadcrumbModule,
        BadgeModule,
        ButtonModule,
        CalendarModule,
        CardModule,
        BlockUIModule,
        CarouselModule,
        ChartModule,
        CheckboxModule,
        ChipModule,
        ChipsModule,
        CodeHighlighterModule,
        ConfirmDialogModule,
        ConfirmPopupModule,
        ColorPickerModule,
        ContextMenuModule,
        DataViewModule,
        DialogModule,
        DividerModule,
        DropdownModule,
        FieldsetModule,
        FileUploadModule,
        FullCalendarModule,
        GalleriaModule,
        InplaceModule,
        InputNumberModule,
        InputMaskModule,
        InputSwitchModule,
        InputTextModule,
        InputTextareaModule,
        KnobModule,
        LightboxModule,
        ListboxModule,
        MegaMenuModule,
        MenuModule,
        MenubarModule,
        MessageModule,
        MessagesModule,
        MultiSelectModule,
        OrderListModule,
        OrganizationChartModule,
        OverlayPanelModule,
        PaginatorModule,
        PanelModule,
        PanelMenuModule,
        PasswordModule,
        PickListModule,
        ProgressBarModule,
        RadioButtonModule,
        RatingModule,
        RippleModule,
        ScrollTopModule,
        ScrollPanelModule,
        SelectButtonModule,
        SidebarModule,
        SkeletonModule,
        SlideMenuModule,
        SliderModule,
        SplitButtonModule,
        SplitterModule,
        StepsModule,
        TableModule,
        TabMenuModule,
        TabViewModule,
        TagModule,
        TerminalModule,
        TieredMenuModule,
        TimelineModule,
        ToastModule,
        ToggleButtonModule,
        ToolbarModule,
        TooltipModule,
        TreeModule,
        TreeTableModule,
        VirtualScrollerModule,
        KeycloakAngularModule,
        AppCodeModule,
        ReactiveFormsModule,
        StoreModule.forRoot(reducers,
          {metaReducers,
            runtimeChecks: {
              strictStateImmutability: false,
              strictActionImmutability: false,
            }}),
        EffectsModule.forRoot([GarantieEffects, ActeEffects, HistoriqueAvenantEffects,
             SecteurActiviteEffects, SousActeEffects, CategorieSocioProfessionnelEffects, TauxEffects,
             DimensionPeriodeEffects, TerritorialiteEffects, TypeGarantEffects, QualiteAssureEffects, 
             TypeAffaireEffects, ProfessionEffects, TypePrimeEffects, ModePaiementEffects, StatusEffects,PrestataireEffects, 
             TypeAvenantEffects, TypePrestataireEffects, GenreEffects, MedecinEffects, NaturePrestataireEffects, 
             QualiteMedecinEffects, PathologieEffects, ProduitPharmaceutiqueEffects,
            RegionEffects, PlafondEffects, AdherentEffects, PrefinancementEffects,
             TypeIntermediaireEffects, GroupeEffects, PoliceEffects, BanqueEffects, TauxCommissionIntermediaireEffects, 
             DepartementEffects, VilleEffects, CommuneEffects, PaysEffects, ZonePaysEffects, GarantEffects, IntermediaireEffects,
             SecteurEffects, ArrondissementEffects, ConventionEffects, TierPayantEffects,
             ExerciceEffects, BonPriseEnChargeEffects, OrdonnanceMedicaleEffects, BulletinAdhesionEffects])
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    declarations: [
        AppComponent,
        AvenantComponent,
        AppMainComponent,
        AppMenuComponent,
        AppMenuitemComponent,
        AppTopBarComponent,
        AppFooterComponent,
        AppConfigComponent,
        AppActionBarComponent,
        DashboardDemoComponent,
        FormLayoutDemoComponent,
        FloatLabelDemoComponent,
        InputDemoComponent,
        InvalidStateDemoComponent,
        ButtonDemoComponent,
        TableDemoComponent,
        ListDemoComponent,
        TreeDemoComponent,
        PanelsDemoComponent,
        OverlaysDemoComponent,
        MediaDemoComponent,
        MenusDemoComponent,
        MessagesDemoComponent,
        MessagesDemoComponent,
        MiscDemoComponent,
        ChartsDemoComponent,
        EmptyDemoComponent,
        FileDemoComponent,
        DocumentationComponent,
        DisplayComponent,
        ElevationComponent,
        FlexboxComponent,
        GridComponent,
        IconsComponent,
        WidgetsComponent,
        SpacingComponent,
        TypographyComponent,
        TextComponent,
        AppCrudComponent,
        AppCalendarComponent,
        AppLoginComponent,
        AppInvoiceComponent,
        AppHelpComponent,
        AppNotfoundComponent,
        AppErrorComponent,
        AppTimelineDemoComponent,
        AppAccessdeniedComponent,
        ParametrageComponent,
        AffaireNouvelleComponent,
        GarantComponent,
        IntermediaireComponent,
        EntityValidationComponent,
        SouscripteurComponent,
        AddRowDirective,
        PoliceComponent,
        FormatTableValuePipe,
        AvenantIncorporationComponent,
        GroupeComponent,
        AvenantRetraitComponent,
        AvenantRenouvellementComponent,
        AvenantModificationComponent,
        PlafondComponent,
        Upercase,
        SeparatorPipe,
        BaremeComponent,
        UploadFileComponent,
        AdherentListComponent,
        AvenantSuspensionComponent,
        AvenantResiliationComponent,
        BeginLowerCasePipe,
        PrefinancementValideComponent,
        OrdreReglementEditionComponent,
        OrdreReglementValideComponent,
        PrefinancementEditionComponent,
        AvenantFacturationComponent,
        TierPayantEditionComponent,
        TierPayantValideComponent,
        OrdreReglementTierPayantEditionComponent,
        TierPayantOrdreReglementValideComponent,
        ConsultationSinistreComponent,
        TierPayantConsultationComponent,
        OrdreReglementConsultationComponent,
        SinistreTiersPayantConsultationComponent,
        OrdreReglementRechercheComponent,
        BonPriseEnChargeComponent,
        OrdonnaceMedicalComponent,
        AdherentListEditComponent,
        ConventionComponent,
        MedicalPipe,
        AssureComponent,
        TierPayantOrdreReglementSearchComponent,
        PlafondFamilleActeComponent,
        PlafondActeComponent,
        PlafondSousActeComponent,
        BulletinAdhesionComponent
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: initializeKeycloak,
            multi: true,
            deps: [KeycloakService],
            //provide: LocationStrategy,
            useClass: HashLocationStrategy
            //useClass:  HashLocationStrategy
          },
          {
            provide: HTTP_INTERCEPTORS,
            useClass: LoaderInterceptor,
            multi: true
          },
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService, LoaderService, ConfirmationService, MessageService, MenuService, BreadcrumbService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
