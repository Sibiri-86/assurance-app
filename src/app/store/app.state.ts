import {GarantieState,} from '../store/parametrage/garantie/state';
import {ActeState} from '../store/parametrage/acte/state';
import {SousActeState} from '../store/parametrage/sous-acte/state';
import {SecteurActiviteState} from '../store/parametrage/secteur-activite/state';
import {GlobalState} from '../store/global-config/state';
import {TauxState} from '../store/parametrage/taux/state';
import {DimensionPeriodeState} from '../store/parametrage/dimension-periode/state';
import {TerritorialiteState} from '../store/parametrage/territorialite/state';
import {TypeGarantState} from '../store/parametrage/garant/state';
import { QualiteAssureState } from './parametrage/qualite-assure/state';
import { CategorieSocioProfessionnelState } from './parametrage/categorie-socio-professionnel/state';
import { ProfessionState } from './parametrage/profession/state';
import { StatusState } from './parametrage/status/state';
import { TypePrestataireState } from './parametrage/type-prestataire/state';
import { PrestataireState } from './parametrage/prestataire/state';
import { NaturePrestataireState } from './parametrage/nature-prestataire/state';
import { MedecinState } from './parametrage/medecin/state';
import { QualiteMedecinState } from './parametrage/qualite-medecin/state';
import { ProduitPharmaceutiqueState } from './parametrage/produit-pharmaceutique/state';
import { PathologieState } from './parametrage/pathologie/state';
import { TypeAvenantState } from './parametrage/type-avenant/state';
import { TypeAffaireState } from './parametrage/type-affaire/state';
import { TypePrimeState } from './parametrage/type-prime/state';
import { GenreState } from './parametrage/genre/state';
import { ModePaiementState } from './parametrage/mode-paiement/state';
import { VilleState } from './parametrage/ville/state';
import { DepartementState } from './parametrage/departement/state';
import { RegionState } from './parametrage/region/state';
import { CommuneState } from './parametrage/commune/state';
import { PaysState } from './parametrage/pays/state';
import { ZonePaysState } from './parametrage/zone-pays/state';
import {GarantState} from './contrat/garant/state';
import {IntermediaireState} from './contrat/intermediaire/state';
import {PoliceState} from './contrat/police/state';
import {GroupeState} from './contrat/groupe/state';
import { TypeIntermediaireState } from './parametrage/type-intermediaire/state';
import {PlafondState} from './contrat/plafond/state';
import { AdherentState } from './contrat/adherent/state';
import { ArrondissementState } from './parametrage/arrondissement/state';
import { SecteurState } from './parametrage/secteur/state';
import {HistoriqueAvenantState} from "./contrat/historiqueAvenant/state";
import { BanqueState } from './parametrage/Banques/state';
import { TauxCommissionIntermediaireState } from './parametrage/taux-commission-intermediaire/state';

export interface AppState {
  garantieState: GarantieState
  secteurActiviteState: SecteurActiviteState
  globalState: GlobalState
  acteState: ActeState
  sousActeState: SousActeState
  tauxState: TauxState
  dimensionPeriodeState: DimensionPeriodeState
  territorialiteState: TerritorialiteState
  typeGarantState: TypeGarantState
  garantState: GarantState
  qualiteAssureState: QualiteAssureState
  categorieSocioProfessionnelState: CategorieSocioProfessionnelState
  professionState: ProfessionState
  statusState: StatusState
  typePrestataireState: TypePrestataireState
  prestataireState:PrestataireState
  naturePrestataireState: NaturePrestataireState
  medecinState: MedecinState
  qualiteMedecinState: QualiteMedecinState
  produitPharmaceutiqueState: ProduitPharmaceutiqueState
  pathologieState: PathologieState
  typeAvenantState: TypeAvenantState
  typeAffaireState: TypeAffaireState
  typePrimeState: TypePrimeState
  genreState: GenreState
  modePaiementState: ModePaiementState
  villeState: VilleState
  departementState: DepartementState
  regionState: RegionState
  communeState: CommuneState
  paysState: PaysState
  zonePaysState: ZonePaysState
  intermediaireState: IntermediaireState
  policeState: PoliceState
  groupeState: GroupeState
  typeIntermediaireState: TypeIntermediaireState
  plafondState: PlafondState
  adherentState: AdherentState
  arrondissementState: ArrondissementState
  secteurState: SecteurState
  historiqueAvenantState: HistoriqueAvenantState
  banqueState: BanqueState
  tauxCommissionIntermediaireState: TauxCommissionIntermediaireState
}