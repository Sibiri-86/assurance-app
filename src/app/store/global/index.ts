import {
    ActionReducer,
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
    MetaReducer
} from '@ngrx/store';
import {environment} from '../../../environments/environment';
import {AppState} from '../app.state';
import * as garantieReducer from '../parametrage/garantie/reducer';
import * as acteReducer from '../parametrage/acte/reducer';
import * as secteurActiviteReducer from '../parametrage/secteur-activite/reducer';
import * as globaleStateReducer from '../global-config/reducer';
import * as sousActeReducer from '../parametrage/sous-acte/reducer';
import * as tauxReducer from '../parametrage/taux/reducer';
import * as tauxState from '../parametrage/taux/state';
import * as dimensionPeriodeState from '../parametrage/dimension-periode/state';
import * as dimensionPeriodeReducer from '../parametrage/dimension-periode/reducer';

import * as territorialiteState from '../parametrage/territorialite/state';
import * as territorialiteReducer from '../parametrage/territorialite/reducer';

import * as typeGarantState from '../parametrage/garant/state';
import * as typeGarantReducer from '../parametrage/garant/reducer';

import * as qualiteAssureState from '../parametrage/qualite-assure/state';
import * as qualiteAssureReducer from '../parametrage/qualite-assure/reducer';

import * as categorieSocioProfessionnelState from '../parametrage/categorie-socio-professionnel/state';
import * as categorieSocioProfessionnelReducer from '../parametrage/categorie-socio-professionnel/reducer';

import * as professionState from '../parametrage/profession/state';
import * as professionReducer from '../parametrage/profession/reducer';

import * as statusState from '../parametrage/status/state';
import * as statusReducer from '../parametrage/status/reducer';

import * as typePrestataireState from '../parametrage/type-prestataire/state';
import * as typePrestataireReducer from '../parametrage/type-prestataire/reducer';

import * as prestataireState from '../parametrage/prestataire/state';
import * as prestataireReducer from '../parametrage/prestataire/reducer';

import * as naturePrestataireState from '../parametrage/nature-prestataire/state';
import * as naturePrestataireReducer from '../parametrage/nature-prestataire/reducer';

import * as medecinState from '../parametrage/medecin/state';
import * as medecineReducer from '../parametrage/medecin/reducer';

import * as qualiteMedecinState from '../parametrage/qualite-medecin/state';
import * as qualiteMedecinReducer from '../parametrage/qualite-medecin/reducer';

import * as produitPharmaceutiqueState from '../parametrage/produit-pharmaceutique/state';
import * as produitPharmaceutiqueReducer from '../parametrage/produit-pharmaceutique/reducer';

import * as pathologieState from '../parametrage/pathologie/state';
import * as pathologieReducer from '../parametrage/pathologie/reducer';

import * as typeAvenantState from '../parametrage/type-avenant/state';
import * as typeAvenantReducer from '../parametrage/type-avenant/reducer';

import * as typeAffaireState from '../parametrage/type-affaire/state';
import * as typeAffaireReducer from '../parametrage/type-affaire/reducer';

import * as typePrimeState from '../parametrage/type-prime/state';
import * as typePrimeReducer from '../parametrage/type-prime/reducer';

import * as genreState from '../parametrage/genre/state';
import * as genreReducer from '../parametrage/genre/reducer';

import * as villeState from '../parametrage/ville/state';
import * as villeReducer from '../parametrage/ville/reducer';

import * as departementState from '../parametrage/departement/state';
import * as departementReducer from '../parametrage/departement/reducer';

import * as regionState from '../parametrage/region/state';
import * as regionReducer from '../parametrage/region/reducer';

import * as communeState from '../parametrage/commune/state';
import * as communeReducer from '../parametrage/commune/reducer';

import * as modePaiementState from '../parametrage/mode-paiement/state';
import * as modePaiementReducer from '../parametrage/mode-paiement/reducer';

import * as paysState from '../parametrage/pays/state';
import * as paysReducer from '../parametrage/pays/reducer';

import * as zonePaysState from '../parametrage/zone-pays/state';
import * as zonePaysReducer from '../parametrage/zone-pays/reducer';

import * as typeIntermediaireState from '../parametrage/type-intermediaire/state';
import * as typeIntermediaireReducer from '../parametrage/type-intermediaire/reducer';

import * as garantState from '../contrat/garant/state';
import * as garantReducer from '../contrat/garant/reducer';

import * as intermediaireState from '../contrat/intermediaire/state';
import * as intermediaireReducer from '../contrat/intermediaire/reducer';

import * as policeState from '../contrat/police/state';
import * as policeReducer from '../contrat/police/reducer';

import * as groupeState from '../contrat/groupe/state';
import * as groupeReducer from '../contrat/groupe/reducer';

import * as plafondState from '../contrat/plafond/state';
import * as plafondReducer from '../contrat/plafond/reducer';

import * as adherentState from '../contrat/adherent/state';
import * as adherentReducer from '../contrat/adherent/reducer';

import * as arrondissementState from '../parametrage/arrondissement/state';
import * as arrondissementReducer from '../parametrage/arrondissement/reducer';

import * as secteurState from '../parametrage/secteur/state';
import * as secteurReducer from '../parametrage/secteur/reducer';

import * as historiqueAvenantReducer from '../contrat/historiqueAvenant/reducer';
import * as historiqueAvenantState from '../contrat/historiqueAvenant/state';

import * as prefinancementReducer from '../prestation/prefinancement/reducer';
import * as prefinancementState from '../prestation/prefinancement/state';
import * as banqueReducer from '../parametrage/Banques/reducer';
import * as banqueState from '../parametrage/Banques/state';
import * as tauxCommissionIntermediaireReducer from '../parametrage/taux-commission-intermediaire/reducer';
import * as tauxCommissionIntermediaireState from '../parametrage/taux-commission-intermediaire/state';
import { tauxcommissionintermediaireList } from '../parametrage/taux-commission-intermediaire/selector';
import * as exerciceReducer from '../contrat/exercice/reducer';
import * as exerciceState from '../contrat/exercice/state';


import * as tierPayantReducer from '../prestation/tierPayant/reducer';
import * as tierPayantState from '../prestation/tierPayant/state';
import * as bonPriseEnChargeReducer from '../medical/bon-prise-en-charge/reducer';

export const reducers: ActionReducerMap<AppState> = {
    garantieState: garantieReducer.reducer,
    secteurActiviteState: secteurActiviteReducer.reducer,
    globalState: globaleStateReducer.reducer,
    acteState: acteReducer.reducer,
    banqueState: banqueReducer.reducer,
    tauxCommissionIntermediaireState: tauxCommissionIntermediaireReducer.reducer,
    sousActeState: sousActeReducer.reducer,
    tauxState: tauxReducer.reducer,
    dimensionPeriodeState: dimensionPeriodeReducer.reducer,
    territorialiteState: territorialiteReducer.reducer,
    typeGarantState: typeGarantReducer.reducer,
    garantState: garantReducer.reducer,
    qualiteAssureState: qualiteAssureReducer.reducer,
    categorieSocioProfessionnelState: categorieSocioProfessionnelReducer.reducer,
    professionState: professionReducer.reducer,
    statusState: statusReducer.reducer,
    typePrestataireState: typePrestataireReducer.reducer,
    prestataireState: prestataireReducer.reducer,
    naturePrestataireState: naturePrestataireReducer.reducer,
    medecinState: medecineReducer.reducer,
    qualiteMedecinState: qualiteMedecinReducer.reducer,
    produitPharmaceutiqueState: produitPharmaceutiqueReducer.reducer,
    pathologieState: pathologieReducer.reducer,
    typeAvenantState: typeAvenantReducer.reducer,
    typeAffaireState: typeAffaireReducer.reducer,
    typePrimeState: typePrimeReducer.reducer,
    genreState: genreReducer.reducer,
    modePaiementState: modePaiementReducer.reducer,
    villeState: villeReducer.reducer,
    departementState: departementReducer.reducer,
    regionState: regionReducer.reducer,
    communeState: communeReducer.reducer,
    zonePaysState: zonePaysReducer.reducer,
    paysState: paysReducer.reducer,
    intermediaireState: intermediaireReducer.reducer,
    policeState: policeReducer.reducer,
    groupeState: groupeReducer.reducer,
    typeIntermediaireState: typeIntermediaireReducer.reducer,
    plafondState: plafondReducer.reducer,
    adherentState: adherentReducer.reducer,
    arrondissementState: arrondissementReducer.reducer,
    secteurState: secteurReducer.reducer,
    historiqueAvenantState: historiqueAvenantReducer.reducer,
    prefinancementState: prefinancementReducer.reducer,
    exerciceState: exerciceReducer.reducer,
    tierPayantState: tierPayantReducer.reducer,
    bonPriseEnChargeState: bonPriseEnChargeReducer.reducer
};

  
  // console.log all actions
export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
    return function(state, action) {
        console.log('state', state);
        console.log('action', action);
        return reducer(state, action);
    };
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [debug] : [];
