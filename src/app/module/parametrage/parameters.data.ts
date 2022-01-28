import {Validators} from '@angular/forms';
import {SelectItem} from 'primeng/api';
import {garantieList} from '../../store/parametrage/garantie/selector';
import {acteList} from '../../store/parametrage/acte/selector';
import {sousacteList} from '../../store/parametrage/sous-acte/selector';
import {secteurActiviteList} from '../../store/parametrage/secteur-activite/selector';
import * as garantieActions from '../../store/parametrage/garantie/actions';
import * as secteurActiviteActions from '../../store/parametrage/secteur-activite/actions';
import * as categorieSocioProfessionnelActions from '../../store/parametrage/categorie-socio-professionnel/actions';
import { categorieSocioProfessionnelList } from 'src/app/store/parametrage/categorie-socio-professionnel/selector';
import * as acteActions from '../../store/parametrage/acte/actions';
import * as sousActeActions from '../../store/parametrage/sous-acte/actions';
import * as acteSelector from '../../store/parametrage/acte/selector';
import * as garantieSelector from '../../store/parametrage/garantie/selector';
import * as tauxActions from '../../store/parametrage/taux/actions';
import { tauxList } from 'src/app/store/parametrage/taux/selector';

import * as dimensionPeriodeActions from '../../store/parametrage/dimension-periode/actions';
import {dimensionPeriodeList} from 'src/app/store/parametrage/dimension-periode/selector';

import * as territorialiteActions from '../../store/parametrage/territorialite/actions';
import {territorialiteList} from 'src/app/store/parametrage/territorialite/selector';

import * as regionActions from '../../store/parametrage/region/actions';
import {regionList} from 'src/app/store/parametrage/region/selector';

import * as departementActions from '../../store/parametrage/departement/actions';
import {departementList} from 'src/app/store/parametrage/departement/selector';

import * as villeActions from '../../store/parametrage/ville/actions';
import {villeList} from 'src/app/store/parametrage/ville/selector';

import * as typeGarantActions from '../../store/parametrage/garant/actions';
import {garantList} from 'src/app/store/parametrage/garant/selector';

import * as qualiteAssureActions from '../../store/parametrage/qualite-assure/actions';
import {qualiteAssureList} from 'src/app/store/parametrage/qualite-assure/selector';

import * as professionActions from '../../store/parametrage/profession/actions';
import {professionList} from 'src/app/store/parametrage/profession/selector';

import { typeAffaireList } from 'src/app/store/parametrage/type-affaire/selector';
import * as typeAffaireActions from '../../store/parametrage/type-affaire/actions';

import * as statusActions from '../../store/parametrage/status/actions';
import {statusList} from 'src/app/store/parametrage/status/selector';

import * as typePrestataireActions from '../../store/parametrage/type-prestataire/actions';
import {typePrestataireList} from 'src/app/store/parametrage/type-prestataire/selector';

import * as prestataireActions from '../../store/parametrage/prestataire/actions';
import {prestataireList} from 'src/app/store/parametrage/prestataire/selector';

import * as naturePrestataireActions from '../../store/parametrage/nature-prestataire/actions';
import {naturePrestataireList} from 'src/app/store/parametrage/nature-prestataire/selector';

import * as medecinActions from '../../store/parametrage/medecin/actions';
import {medecinList} from 'src/app/store/parametrage/medecin/selector';

import * as qualiteMedecinActions from '../../store/parametrage/qualite-medecin/actions';
import {QualiteMedecinList} from 'src/app/store/parametrage/qualite-medecin/selector';

import * as produitPharmaceutiqueActions from '../../store/parametrage/produit-pharmaceutique/actions';
import {produitPharmaceutiqueList} from 'src/app/store/parametrage/produit-pharmaceutique/selector';

import * as pathologieActions from '../../store/parametrage/pathologie/actions';
import {pathologieList} from 'src/app/store/parametrage/pathologie/selector';

import * as typeAvenantActions from '../../store/parametrage/type-avenant/actions';
import {typeAvenantList} from 'src/app/store/parametrage/type-avenant/selector';

import * as typePrimeActions from '../../store/parametrage/type-prime/actions';
import {typePrimeList} from 'src/app/store/parametrage/type-prime/selector';

import * as genreActions from '../../store/parametrage/genre/actions';
import {genreList} from 'src/app/store/parametrage/genre/selector';

import * as modePaiementActions from '../../store/parametrage/mode-paiement/actions';
import {modePaiementList} from 'src/app/store/parametrage/mode-paiement/selector';

import * as communeActions from '../../store/parametrage/commune/actions';
import {communeList} from 'src/app/store/parametrage/commune/selector';


import * as zonePaysActions from '../../store/parametrage/zone-pays/actions';
import {zonepaysList} from 'src/app/store/parametrage/zone-pays/selector';


import * as paysActions from '../../store/parametrage/pays/actions';
import {paysList} from 'src/app/store/parametrage/pays/selector';

import * as typeIntermediaireActions from '../../store/parametrage/type-intermediaire/actions';
import {typeIntermediaireList} from 'src/app/store/parametrage/type-intermediaire/selector';

import * as arrondissementActions from '../../store/parametrage/arrondissement/actions';
import {arrondissementList} from 'src/app/store/parametrage/arrondissement/selector';

import * as secteurActions from '../../store/parametrage/secteur/actions';
import {secteurList} from 'src/app/store/parametrage/secteur/selector';

import * as banqueActions from '../../store/parametrage/Banques/actions';
import { banqueList } from 'src/app/store/parametrage/Banques/selector';

import * as tauxCommissionIntermediaireAction from '../../store/parametrage/taux-commission-intermediaire/actions';
import { TauxCommissionIntermediaireList } from 'src/app/store/parametrage/taux-commission-intermediaire/model';
import { tauxcommissionintermediaireList } from 'src/app/store/parametrage/taux-commission-intermediaire/selector';

// Definition des type de paramettres
export const DATA_TYPE = [
  {label: 'Famille d\'acte', value: 'TypeGarantie'},
  {label: 'Sous acte', value: 'SousActe'},
  {label: 'Acte', value: 'Acte'},
  {label: 'Genre', value: 'Genre'},
  {label: 'Banque', value: 'Banque'},
  {label: 'Taux de commission intermediaire', value: 'TauxDeCommissionIntermediaire'},
  {label: 'Taux', value: 'Taux'},
  {label: 'Dimension periode', value: 'DimensionPeriode'},
  {label: 'Territorialité', value: 'Territorialite'},
  {label: 'Pays', value: 'Pays'},
  {label: 'Zone Pays', value: 'ZonePays'},
  {label: 'Region', value: 'Region'},
  {label: 'Province', value: 'Province'},
  {label: 'Commune', value: 'Commune'},
  {label: 'Arrondissement', value: 'Arrondissement'},
  {label: 'Secteur', value: 'Secteur'},
  //{label: 'Ville', value: 'Ville'},
  {label: 'Type de garant', value: 'TypeGarant'},
  {label: 'Qualité assuré', value: 'QualiteAssure'},
  {label: 'Secteur d\'activité', value: 'SecteurDactivite'},
  {label: 'Categorie socio professionnelle', value: 'CategorieSocioProfessionnelle'},
  {label: 'Profession', value: 'Profession'},
  {label: 'Status', value: 'Status'},
  {label: 'Type Prestataire', value: 'TypePrestataire'},
  {label: 'Prestataire', value: 'Prestataire'},
  {label: 'Nature prestataire', value: 'NaturePrestataire'},
  {label: 'Medecin', value: 'Medecin'},
  {label: 'Qualité medecin', value: 'QualiteMedecin'},
  {label: 'Produit pharmaceutiques', value: 'ProduitPharmaceutique'},
  {label: 'Pathologie', value: 'Pathologie'},
  {label: 'Type Avenant', value: 'TypeAvenant'},
  {label: 'Type Affaire', value: 'TypeAffaire'},
  {label: 'Type Prime', value: 'TypePrime'},
  {label: 'Mode de paiement', value: 'ModePaiement'},
  {label: 'Type intermediaire', value: 'TypeIntermediaire'}
];

const dropdownEntriesObj: Array<SelectItem> = [
  {label: 'OUI', value: true},
  {label: 'NON', value: false}
];

// Definition des donnees par type de parametres
export const DATA_DEFINITION = [
  // DEFINITION DE TYPE CREANCE
  {
    entity: 'TypeGarantie',
    cols: [
      {
        field: 'libelle', header: 'Libelle', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'code', header: 'Code', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'description', header: 'Description', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      }
    ],
    entityValidations: [
      {
        field: 'libelle',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'maxlength', validMessage: 'Ce champs requiert 50 caractères maximum'}
        ]
      },
      {
        field: 'code',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'pattern', validMessage: 'Ce champs requiert des chiffres'}
        ]
      },
      {
        field: 'description',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'pattern', validMessage: 'Ce champs requiert des chiffres'}
        ]
      }
    ],
    store: {
      select: garantieList,
      fetchAction: garantieActions.loadGarantie(),
      createAction: garantieActions.createGarantie,
      updateAction: garantieActions.updateGarantie,
      deleteAction: garantieActions.deleteGarantie,
      importAction: garantieActions.importGarantie
    }
  },
  {
    entity: 'TypeIntermediaire',
    cols: [
      {
        field: 'libelle', header: 'Libelle', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'code', header: 'Code', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'description', header: 'Description', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      }
    ],
    entityValidations: [
      {
        field: 'libelle',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'maxlength', validMessage: 'Ce champs requiert 50 caractères maximum'}
        ]
      },
      {
        field: 'code',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'pattern', validMessage: 'Ce champs requiert des chiffres'}
        ]
      },
      {
        field: 'description',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'pattern', validMessage: 'Ce champs requiert des chiffres'}
        ]
      }
    ],
    store: {
      select: typeIntermediaireList,
      fetchAction: typeIntermediaireActions.loadTypeIntermediaire(),
      createAction: typeIntermediaireActions.createTypeIntermediaire,
      updateAction: typeIntermediaireActions.updateTypeIntermediaire,
      deleteAction: typeIntermediaireActions.deleteTypeIntermediaire,
      importAction: typeIntermediaireActions.importTypeIntermediaire
    }
  },
  {
    entity: 'Banque',
    cols: [
      {
        field: 'libelle', header: 'Libelle', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'code', header: 'Code', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'description', header: 'Description', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      }
    ],
    entityValidations: [
      {
        field: 'libelle',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'maxlength', validMessage: 'Ce champs requiert 50 caractères maximum'}
        ]
      },
      {
        field: 'code',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'pattern', validMessage: 'Ce champs requiert des chiffres'}
        ]
      },
      {
        field: 'description',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'pattern', validMessage: 'Ce champs requiert des chiffres'}
        ]
      }
    ],
    store: {
      select: banqueList,
      fetchAction: banqueActions.loadBanque(),
      createAction: banqueActions.createBanque,
      updateAction: banqueActions.updateBanque,
      deleteAction: banqueActions.deleteBanque,
      importAction: banqueActions.importBanque
    }
  },
  
  {
    entity: 'Acte',
    cols: [
      {
        field: 'libelle', header: 'Libelle', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'code', header: 'Code', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'description', header: 'Description', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'idTypeGarantie', header: 'Famille acte', width: 1, label: 'libelleTypeGarantie', text_center: false,
        validators: [Validators.required], type: 'dropdown', dropObj: {
          action: garantieActions.loadGarantie(),
          selector: garantieSelector.garantieList,
          key: 'id',
          field: 'idTypeGarantie',
          optionLabel: 'libelle'
        }
      }
    ],
    entityValidations: [
      {
        field: 'libelle',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'maxlength', validMessage: 'Ce champs requiert 50 caractères maximum'}
        ]
      },
      {
        field: 'code',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'pattern', validMessage: 'Ce champs requiert des chiffres'}
        ]
      },
      {
        field: 'description',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'pattern', validMessage: 'Ce champs requiert des chiffres'}
        ]
      }
    ],
    store: {
      select: acteList,
      fetchAction: acteActions.loadActe(),
      createAction: acteActions.createActe,
      updateAction: acteActions.updateActe,
      deleteAction: acteActions.deleteActe,
      importAction: acteActions.importActe
    }
  },
  {
    entity: 'SousActe',
    cols: [
      {
        field: 'libelle', header: 'Libelle', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'code', header: 'Code', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'description', header: 'Description', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'idTypeActe', header: 'Acte', width: 1, text_center: false,
        validators: [Validators.required], type: 'dropdown', label: 'libelleTypeActe', dropObj: {
          action: acteActions.loadActe(),
          selector: acteSelector.acteList,
          key: 'id',
          field: 'idTypeActe',
          optionLabel: 'libelle'
        }
      }
    ],
    entityValidations: [
      {
        field: 'libelle',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'maxlength', validMessage: 'Ce champs requiert 50 caractères maximum'}
        ]
      },
      {
        field: 'code',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'pattern', validMessage: 'Ce champs requiert des chiffres'}
        ]
      },
      {
        field: 'description',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'pattern', validMessage: 'Ce champs requiert des chiffres'}
        ]
      }
    ],
    store: {
      select: sousacteList,
      fetchAction: sousActeActions.loadSousActe(),
      createAction: sousActeActions.createSousActe,
      updateAction: sousActeActions.updateSousActe,
      deleteAction: sousActeActions.deleteSousActe,
      importAction: sousActeActions.importSousActe
    }
  },
  {
    entity: 'SecteurDactivite',
    cols: [
      {
        field: 'libelle', header: 'Libelle', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'code', header: 'Code', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'description', header: 'Description', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      }
    ],
    entityValidations: [
      {
        field: 'libelle',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'maxlength', validMessage: 'Ce champs requiert 50 caractères maximum'}
        ]
      },
      {
        field: 'code',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'pattern', validMessage: 'Ce champs requiert des chiffres'}
        ]
      },
      {
        field: 'description',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'pattern', validMessage: 'Ce champs requiert des chiffres'}
        ]
      }
    ],
    store: {
      select: secteurActiviteList,
      fetchAction: secteurActiviteActions.loadSecteurActivite(),
      createAction: secteurActiviteActions.createSecteurActivite,
      updateAction: secteurActiviteActions.updateSecteurActivite,
      deleteAction: secteurActiviteActions.deleteSecteurActivite,
      importAction: secteurActiviteActions.importSecteurActivite
    }
  },
  {
    entity: 'CategorieSocioProfessionnelle',
    cols: [
      {
        field: 'libelle', header: 'Libelle', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'code', header: 'Code', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'description', header: 'Description', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      }
    ],
    entityValidations: [
      {
        field: 'libelle',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'maxlength', validMessage: 'Ce champs requiert 50 caractères maximum'}
        ]
      },
      {
        field: 'code',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'pattern', validMessage: 'Ce champs requiert des chiffres'}
        ]
      },
      {
        field: 'description',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'pattern', validMessage: 'Ce champs requiert des chiffres'}
        ]
      }
    ],
    store: {
      select: categorieSocioProfessionnelList,
      fetchAction: categorieSocioProfessionnelActions.loadCategorieSocioProfessionnel(),
      createAction: categorieSocioProfessionnelActions.createCategorieSocioProfessionnel,
      updateAction: categorieSocioProfessionnelActions.updateCategorieSocioProfessionnel,
      deleteAction: categorieSocioProfessionnelActions.deleteCategorieSocioProfessionnel,
      importAction: categorieSocioProfessionnelActions.importCategorieSocioProfessionnel
    }
  },
  {
    entity: 'Taux',
    cols: [
      {
        field: 'taux', header: 'Taux', type: 'number', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'description', header: 'Description', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      }
    ],
    entityValidations: [
      {
        field: 'taux',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'pattern', validMessage: 'Ce champs requiert des chiffres'}
        ]
      },
      {
        field: 'description',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'pattern', validMessage: 'Ce champs requiert des chiffres'}
        ]
      }
    ],
    store: {
      select: tauxList,
      fetchAction: tauxActions.loadTaux(),
      createAction: tauxActions.createTaux,
      updateAction: tauxActions.updateTaux,
      deleteAction: tauxActions.deleteTaux,
      importAction: tauxActions.importTaux
    }
  },
  {
    entity: 'DimensionPeriode',
    cols: [
      {
        field: 'libelle', header: 'Libelle', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'code', header: 'Code', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'description', header: 'Description', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      }
    ],
    entityValidations: [
      {
        field: 'libelle',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'maxlength', validMessage: 'Ce champs requiert 50 caractères maximum'}
        ]
      },
      {
        field: 'code',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'pattern', validMessage: 'Ce champs requiert des chiffres'}
        ]
      },
      {
        field: 'description',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'pattern', validMessage: 'Ce champs requiert des chiffres'}
        ]
      }
    ],
    store: {
      select: dimensionPeriodeList,
      fetchAction: dimensionPeriodeActions.loadDimensionPeriode(),
      createAction: dimensionPeriodeActions.createDimensionPeriode,
      updateAction: dimensionPeriodeActions.updateDimensionPeriode,
      deleteAction: dimensionPeriodeActions.deleteDimensionPeriode,
      importAction: dimensionPeriodeActions.importDimensionPeriode
    }
  },
  {
    entity: 'Taux',
    cols: [
      {
        field: 'taux', header: 'Taux', type: 'number', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'description', header: 'Description', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      }
    ],
    entityValidations: [
      {
        field: 'taux',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'pattern', validMessage: 'Ce champs requiert des chiffres'}
        ]
      },
      {
        field: 'description',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'pattern', validMessage: 'Ce champs requiert des chiffres'}
        ]
      }
    ],
    store: {
      select: tauxList,
      fetchAction: tauxActions.loadTaux(),
      createAction: tauxActions.createTaux,
      updateAction: tauxActions.updateTaux,
      deleteAction: tauxActions.deleteTaux,
      importAction: tauxActions.importTaux
    }
  },
  {
    entity: 'TauxDeCommissionIntermediaire',
    cols: [
      {
        field: 'taux', header: 'Taux', type: 'number', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'description', header: 'Description', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      }
    ],
    entityValidations: [
      {
        field: 'taux',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'maxlength', validMessage: 'Ce champs requiert 50 caractères maximum'}
        ]
      },
      {
        field: 'description',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'pattern', validMessage: 'Ce champs requiert des chiffres'}
        ]
      }
    ],
    store: {
      select: tauxcommissionintermediaireList,
      fetchAction: tauxCommissionIntermediaireAction.loadTauxCommissionIntermediaire(),
      createAction: tauxCommissionIntermediaireAction.createTauxCommissionIntermediaire,
      updateAction: tauxCommissionIntermediaireAction.updateTauxCommissionIntermediaire,
      deleteAction: tauxCommissionIntermediaireAction.deleteTauxCommissionIntermediaire,
      importAction: tauxCommissionIntermediaireAction.importTauxCommissionIntermediaire
    }
  },
  {
    entity: 'Territorialite',
    cols: [
      {
        field: 'libelle', header: 'Libelle', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'code', header: 'Code', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'description', header: 'Description', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      }
    ],
    entityValidations: [
      {
        field: 'libelle',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'maxlength', validMessage: 'Ce champs requiert 50 caractères maximum'}
        ]
      },
      {
        field: 'code',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'pattern', validMessage: 'Ce champs requiert des chiffres'}
        ]
      },
      {
        field: 'description',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'pattern', validMessage: 'Ce champs requiert des chiffres'}
        ]
      }
    ],
    store: {
      select: territorialiteList,
      fetchAction: territorialiteActions.loadTerritorialite(),
      createAction: territorialiteActions.createTerritorialite,
      updateAction: territorialiteActions.updateTerritorialite,
      deleteAction: territorialiteActions.deleteTerritorialite,
      importAction:territorialiteActions.importTerritorialite
    }
  },
  {
    entity: 'TypeGarant',
    cols: [
      {
        field: 'libelle', header: 'Libelle', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'code', header: 'Code', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'description', header: 'Description', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      }
    ],
    entityValidations: [
      {
        field: 'libelle',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'maxlength', validMessage: 'Ce champs requiert 50 caractères maximum'}
        ]
      },
      {
        field: 'code',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'pattern', validMessage: 'Ce champs requiert des chiffres'}
        ]
      },
      {
        field: 'description',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'pattern', validMessage: 'Ce champs requiert des chiffres'}
        ]
      }
    ],
    store: {
      select: garantList,
      fetchAction: typeGarantActions.loadGarant(),
      createAction: typeGarantActions.createGarant,
      updateAction: typeGarantActions.updateGarant,
      deleteAction: typeGarantActions.deleteGarant,
      importAction: typeGarantActions.importGarant
    }
  },
  {
    entity: 'QualiteAssure',
    cols: [
      {
        field: 'libelle', header: 'Libelle', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'code', header: 'Code', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'description', header: 'Description', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      }
    ],
    entityValidations: [
      {
        field: 'libelle',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'maxlength', validMessage: 'Ce champs requiert 50 caractères maximum'}
        ]
      },
      {
        field: 'code',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'pattern', validMessage: 'Ce champs requiert des chiffres'}
        ]
      },
      {
        field: 'description',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'pattern', validMessage: 'Ce champs requiert des chiffres'}
        ]
      }
    ],
    store: {
      select: qualiteAssureList,
      fetchAction: qualiteAssureActions.loadQualiteAssure(),
      createAction: qualiteAssureActions.createQualiteAssure,
      updateAction: qualiteAssureActions.updateQualiteAssure,
      deleteAction: qualiteAssureActions.deleteQualiteAssure,
      importAction: qualiteAssureActions.importQualiteAssure
    }
  },
  {
    entity: 'Profession',
    cols: [
      {
        field: 'libelle', header: 'Libelle', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'code', header: 'Code', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'description', header: 'Description', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'idTypeCategorieSocioProfessionnel', header: 'Categorie socio professionnel', width: 1, label: 'libelleTypeCategorieSocioProfessionnel', text_center: false,
        validators: [Validators.required], type: 'dropdown', dropObj: {
          action: categorieSocioProfessionnelActions.loadCategorieSocioProfessionnel(),
          selector: categorieSocioProfessionnelList,
          key: 'id',
          field: 'idTypeCategorieSocioProfessionnel',
          optionLabel: 'libelle'
        }
      }
    ],
    entityValidations: [
      {
        field: 'libelle',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'maxlength', validMessage: 'Ce champs requiert 50 caractères maximum'}
        ]
      },
      {
        field: 'code',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'pattern', validMessage: 'Ce champs requiert des chiffres'}
        ]
      },
      {
        field: 'description',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'pattern', validMessage: 'Ce champs requiert des chiffres'}
        ]
      }
    ],
    store: {
      select: professionList,
      fetchAction: professionActions.loadProfession(),
      createAction: professionActions.createProfession,
      updateAction: professionActions.updateProfession,
      deleteAction: professionActions.deleteProfession,
      importAction: professionActions.importProfession
    }
  },
  {
    entity: 'TypeAffaire',
    cols: [
      {
        field: 'libelle', header: 'Libelle', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'code', header: 'Code', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'description', header: 'Description', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      }
    ],
    entityValidations: [
      {
        field: 'libelle',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'maxlength', validMessage: 'Ce champs requiert 50 caractères maximum'}
        ]
      },
      {
        field: 'code',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'pattern', validMessage: 'Ce champs requiert des chiffres'}
        ]
      },
      {
        field: 'description',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'pattern', validMessage: 'Ce champs requiert des chiffres'}
        ]
      }
    ],
    store: {
      select: typeAffaireList,
      fetchAction: typeAffaireActions.loadTypeAffaire(),
      createAction: typeAffaireActions.createTypeAffaire,
      updateAction: typeAffaireActions.updateTypeAffaire,
      deleteAction: typeAffaireActions.deleteTypeAffaire,
      importAction: typeAffaireActions.importTypeAffaire
    }
  },
  {
    entity: 'TypePrime',
    cols: [
      {
        field: 'libelle', header: 'Libelle', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'code', header: 'Code', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'description', header: 'Description', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      }
    ],
    entityValidations: [
      {
        field: 'libelle',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'maxlength', validMessage: 'Ce champs requiert 50 caractères maximum'}
        ]
      },
      {
        field: 'code',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'pattern', validMessage: 'Ce champs requiert des chiffres'}
        ]
      },
      {
        field: 'description',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'pattern', validMessage: 'Ce champs requiert des chiffres'}
        ]
      }
    ],
    store: {
      select: typePrimeList,
      fetchAction: typePrimeActions.loadTypePrime(),
      createAction: typePrimeActions.createTypePrime,
      updateAction: typePrimeActions.updateTypePrime,
      deleteAction: typePrimeActions.deleteTypePrime,
      importAction: typePrimeActions.importTypePrime
    }
  },
  {
    entity: 'Genre',
    cols: [
      {
        field: 'libelle', header: 'Libelle', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'code', header: 'Code', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'description', header: 'Description', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      }
    ],
    entityValidations: [
      {
        field: 'libelle',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'maxlength', validMessage: 'Ce champs requiert 50 caractères maximum'}
        ]
      },
      {
        field: 'code',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'pattern', validMessage: 'Ce champs requiert des chiffres'}
        ]
      },
      {
        field: 'description',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'pattern', validMessage: 'Ce champs requiert des chiffres'}
        ]
      }
    ],
    store: {
      select: genreList,
      fetchAction: genreActions.loadGenre(),
      createAction: genreActions.createGenre,
      updateAction: genreActions.updateGenre,
      deleteAction: genreActions.deleteGenre,
      importAction: genreActions.importGenre
    }
  },
  {
    entity: 'Status',
    cols: [
      {
        field: 'libelle', header: 'Libelle', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'code', header: 'Code', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'description', header: 'Description', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      }
    ],
    entityValidations: [
      {
        field: 'libelle',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'maxlength', validMessage: 'Ce champs requiert 50 caractères maximum'}
        ]
      },
      {
        field: 'code',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'pattern', validMessage: 'Ce champs requiert des chiffres'}
        ]
      },
      {
        field: 'description',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'pattern', validMessage: 'Ce champs requiert des chiffres'}
        ]
      }
    ],
    store: {
      select: statusList,
      fetchAction: statusActions.loadStatus(),
      createAction: statusActions.createStatus,
      updateAction: statusActions.updateStatus,
      deleteAction: statusActions.deleteStatus,
      importAction: statusActions.importStatus
    }
  },

  {
    entity: 'ModePaiement',
    cols: [
      {
        field: 'libelle', header: 'Libelle', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'code', header: 'Code', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'description', header: 'Description', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      }
    ],
    entityValidations: [
      {
        field: 'libelle',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'maxlength', validMessage: 'Ce champs requiert 50 caractères maximum'}
        ]
      },
      {
        field: 'code',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'pattern', validMessage: 'Ce champs requiert des chiffres'}
        ]
      },
      {
        field: 'description',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'pattern', validMessage: 'Ce champs requiert des chiffres'}
        ]
      }
    ],
    store: {
      select: modePaiementList,
      fetchAction: modePaiementActions.loadModePaiement(),
      createAction: modePaiementActions.createModePaiement,
      updateAction: modePaiementActions.updateModePaiement,
      deleteAction: modePaiementActions.deleteModePaiement,
      importAction: modePaiementActions.importModePaiement
    }
  },
  {
    entity: 'TypePrestataire',
    cols: [
      {
        field: 'libelle', header: 'Libelle', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'code', header: 'Code', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'description', header: 'Description', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      }
    ],
    entityValidations: [
      {
        field: 'libelle',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'maxlength', validMessage: 'Ce champs requiert 50 caractères maximum'}
        ]
      },
      {
        field: 'code',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'pattern', validMessage: 'Ce champs requiert des chiffres'}
        ]
      },
      {
        field: 'description',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'pattern', validMessage: 'Ce champs requiert des chiffres'}
        ]
      }
    ],
    store: {
      select: typePrestataireList,
      fetchAction: typePrestataireActions.loadTypePrestataire(),
      createAction: typePrestataireActions.createTypePrestataire,
      updateAction: typePrestataireActions.updateTypePrestataire,
      deleteAction: typePrestataireActions.deleteTypePrestataire,
      importAction: typePrestataireActions.importTypePrestataire
    }
  },
  {
    entity: 'Prestataire',
    cols: [
      {
        field: 'libelle', header: 'Libelle', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'code', header: 'Code', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'description', header: 'Description', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'idTypePrestataire', header: 'Type prestataire', width: 1, label: 'libelleTypePrestataire', text_center: false,
        validators: [Validators.required], type: 'dropdown', dropObj: {
          action: typePrestataireActions.loadTypePrestataire(),
          selector: typePrestataireList,
          key: 'id',
          field: 'idTypePrestataire',
          optionLabel: 'libelle'
        }
      },
      {
        field: 'idNaturePrestataire', header: 'Nature prestataire', width: 1, label: 'libelleNaturePrestataire', text_center: false,
        validators: [Validators.required], type: 'dropdown', dropObj: {
          action: naturePrestataireActions.loadNaturePrestataire(),
          selector: naturePrestataireList,
          key: 'id',
          field: 'idNaturePrestataire',
          optionLabel: 'libelle'
        }
      }
    ],
    entityValidations: [
      {
        field: 'libelle',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'maxlength', validMessage: 'Ce champs requiert 50 caractères maximum'}
        ]
      },
      {
        field: 'code',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'pattern', validMessage: 'Ce champs requiert des chiffres'}
        ]
      },
      {
        field: 'description',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'pattern', validMessage: 'Ce champs requiert des chiffres'}
        ]
      }
    ],
    store: {
      select: prestataireList,
      fetchAction: prestataireActions.loadPrestataire(),
      createAction: prestataireActions.createPrestataire,
      updateAction: prestataireActions.updatePrestataire,
      deleteAction: prestataireActions.deletePrestataire,
      importAction: prestataireActions.importPrestataire
    }
  },
  {
    entity: 'TypeAvenant',
    cols: [
      {
        field: 'libelle', header: 'Libelle', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'code', header: 'Code', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'description', header: 'Description', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      }
    ],
    entityValidations: [
      {
        field: 'libelle',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'maxlength', validMessage: 'Ce champs requiert 50 caractères maximum'}
        ]
      },
      {
        field: 'code',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'pattern', validMessage: 'Ce champs requiert des chiffres'}
        ]
      },
      {
        field: 'description',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'pattern', validMessage: 'Ce champs requiert des chiffres'}
        ]
      }
    ],
    store: {
      select: typeAvenantList,
      fetchAction: typeAvenantActions.loadTypeAvenant(),
      createAction: typeAvenantActions.createTypeAvenant,
      updateAction: typeAvenantActions.updateTypeAvenant,
      deleteAction: typeAvenantActions.deleteTypeAvenant,
      importAction: typeAvenantActions.importTypeAvenant
    }
  },
  {
    entity: 'Genre',
    cols: [
      {
        field: 'libelle', header: 'Libelle', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'code', header: 'Code', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'description', header: 'Description', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      }
    ],
    entityValidations: [
      {
        field: 'libelle',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'maxlength', validMessage: 'Ce champs requiert 50 caractères maximum'}
        ]
      },
      {
        field: 'code',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'pattern', validMessage: 'Ce champs requiert des chiffres'}
        ]
      },
      {
        field: 'description',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'pattern', validMessage: 'Ce champs requiert des chiffres'}
        ]
      }
    ],
    store: {
      select: genreList,
      fetchAction: genreActions.loadGenre(),
      createAction: genreActions.createGenre,
      updateAction: genreActions.updateGenre,
      deleteAction: genreActions.deleteGenre,
      importAction: genreActions.importGenre
    }
  },
  {
    entity: 'NaturePrestataire',
    cols: [
      {
        field: 'libelle', header: 'Libelle', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'code', header: 'Code', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'description', header: 'Description', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      }
    ],
    entityValidations: [
      {
        field: 'libelle',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'maxlength', validMessage: 'Ce champs requiert 50 caractères maximum'}
        ]
      },
      {
        field: 'code',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'pattern', validMessage: 'Ce champs requiert des chiffres'}
        ]
      },
      {
        field: 'description',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'pattern', validMessage: 'Ce champs requiert des chiffres'}
        ]
      }
    ],
    store: {
      select: naturePrestataireList,
      fetchAction: naturePrestataireActions.loadNaturePrestataire(),
      createAction: naturePrestataireActions.createNaturePrestataire,
      updateAction: naturePrestataireActions.updateNaturePrestataire,
      deleteAction: naturePrestataireActions.deleteNaturePrestataire,
      importAction: naturePrestataireActions.importNaturePrestataire
    }
  },
  {
    entity: 'Medecin',
    cols: [
      {
        field: 'nom', header: 'Nom', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'prenom', header: 'Prenom', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'description', header: 'Description', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'idQualiteMedecin', header: 'Qualite medecin', width: 1, label: 'libelleQualiteMedecin', text_center: false,
        validators: [Validators.required], type: 'dropdown', dropObj: {
          action: qualiteMedecinActions.loadQualiteMedecin(),
          selector: QualiteMedecinList,
          key: 'id',
          field: 'idQualiteMedecin',
          optionLabel: 'libelle'
        }
      },
      {
        field: 'idPrestataire', header: 'Prestataire', width: 1, label: 'libellePrestataire', text_center: false,
        validators: [Validators.required], type: 'dropdown', dropObj: {
          action: prestataireActions.loadPrestataire(),
          selector: prestataireList,
          key: 'id',
          field: 'idPrestataire',
          optionLabel: 'libelle'
        }
      }
    ],
    entityValidations: [
      {
        field: 'nom',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'maxlength', validMessage: 'Ce champs requiert 50 caractères maximum'}
        ]
      },
      {
        field: 'prenom',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'pattern', validMessage: 'Ce champs requiert des chiffres'}
        ]
      },
      {
        field: 'description',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'pattern', validMessage: 'Ce champs requiert des chiffres'}
        ]
      }
    ],
    store: {
      select: medecinList,
      fetchAction: medecinActions.loadMedecin(),
      createAction: medecinActions.createMedecin,
      updateAction: medecinActions.updateMedecin,
      deleteAction: medecinActions.deleteMedecin,
      importAction: medecinActions.importMedecin
    }
  },
  {
    entity: 'QualiteMedecin',
    cols: [
      {
        field: 'code', header: 'Code', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'libelle', header: 'Libelle', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'description', header: 'Description', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      }
    ],
    entityValidations: [
      {
        field: 'code',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'maxlength', validMessage: 'Ce champs requiert 50 caractères maximum'}
        ]
      },
      {
        field: 'libelle',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'pattern', validMessage: 'Ce champs requiert des chiffres'}
        ]
      },
      {
        field: 'description',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'pattern', validMessage: 'Ce champs requiert des chiffres'}
        ]
      }
    ],
    store: {
      select: QualiteMedecinList,
      fetchAction: qualiteMedecinActions.loadQualiteMedecin(),
      createAction: qualiteMedecinActions.createQualiteMedecin,
      updateAction: qualiteMedecinActions.updateQualiteMedecin,
      deleteAction: qualiteMedecinActions.deleteQualiteMedecin,
      importAction: qualiteMedecinActions.importQualiteMedecin
    }
  },
  {
    entity: 'ProduitPharmaceutique',
    cols: [
      {
        field: 'code', header: 'Code', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'libelle', header: 'Libelle', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'description', header: 'Description', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      }
    ],
    entityValidations: [
      {
        field: 'code',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'maxlength', validMessage: 'Ce champs requiert 50 caractères maximum'}
        ]
      },
      {
        field: 'libelle',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'pattern', validMessage: 'Ce champs requiert des chiffres'}
        ]
      },
      {
        field: 'description',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'pattern', validMessage: 'Ce champs requiert des chiffres'}
        ]
      }
    ],
    store: {
      select: produitPharmaceutiqueList,
      fetchAction: produitPharmaceutiqueActions.loadProduitPharmaceutique(),
      createAction: produitPharmaceutiqueActions.createProduitPharmaceutique,
      updateAction: produitPharmaceutiqueActions.updateProduitPharmaceutique,
      deleteAction: produitPharmaceutiqueActions.deleteProduitPharmaceutique,
      importAction: produitPharmaceutiqueActions.importProduitPharmaceutique
    }
  },
  {
    entity: 'Pathologie',
    cols: [
      {
        field: 'code', header: 'Code', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'libelle', header: 'Libelle', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'description', header: 'Description', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'idSousActe', header: 'Sous acte', width: 1, labelMulti: 'idSousActe', text_center: false,
        validators: [Validators.required], type: 'multiselect', dropObj: {
          action: sousActeActions.loadSousActe(),
          selector: sousacteList,
          key: 'id',
          field: 'idSousActe',
          optionLabel: 'libelle'
        }
      }
    ],
    entityValidations: [
      {
        field: 'code',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'maxlength', validMessage: 'Ce champs requiert 50 caractères maximum'}
        ]
      },
      {
        field: 'libelle',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'pattern', validMessage: 'Ce champs requiert des chiffres'}
        ]
      },
      {
        field: 'description',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'pattern', validMessage: 'Ce champs requiert des chiffres'}
        ]
      }
    ],
    store: {
      select: pathologieList,
      fetchAction: pathologieActions.loadPathologie(),
      createAction: pathologieActions.createPathologie,
      updateAction: pathologieActions.updatePathologie,
      deleteAction: pathologieActions.deletePathologie,
      importAction: pathologieActions.importPathologie
    }
  },
  {
    entity: 'Region',
    cols: [
      {
        field: 'code', header: 'Code', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'libelle', header: 'Libelle', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'description', header: 'Description', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'idTypePays', header: 'Pays', width: 1, label: 'libelleTypePays', text_center: false,
        validators: [Validators.required], type: 'dropdown', dropObj: {
          action: paysActions.loadPays(),
          selector: paysList,
          key: 'id',
          field: 'idTypePays',
          optionLabel: 'libelle'
        }
      }
    ],
    entityValidations: [
      {
        field: 'code',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'maxlength', validMessage: 'Ce champs requiert 50 caractères maximum'}
        ]
      },
      {
        field: 'libelle',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'pattern', validMessage: 'Ce champs requiert des chiffres'}
        ]
      },
      {
        field: 'description',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'pattern', validMessage: 'Ce champs requiert des chiffres'}
        ]
      }
    ],
    store: {
      select: regionList,
      fetchAction: regionActions.loadRegion(),
      createAction: regionActions.createRegion,
      updateAction: regionActions.updateRegion,
      deleteAction: regionActions.deleteRegion,
      importAction: regionActions.importRegion
    }
  },
  {
    entity: 'Province',
    cols: [
      {
        field: 'code', header: 'Code', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'libelle', header: 'Libelle', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'description', header: 'Description', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'idRegion', header: 'Region', width: 1, label: 'libelleRegion', text_center: false,
        validators: [Validators.required], type: 'dropdown', dropObj: {
          action: regionActions.loadRegion(),
          selector: regionList,
          key: 'id',
          field: 'idRegion',
          optionLabel: 'libelle'
        }
      }
    ],
    entityValidations: [
      {
        field: 'code',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'maxlength', validMessage: 'Ce champs requiert 50 caractères maximum'}
        ]
      },
      {
        field: 'libelle',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'pattern', validMessage: 'Ce champs requiert des chiffres'}
        ]
      },
      {
        field: 'description',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'pattern', validMessage: 'Ce champs requiert des chiffres'}
        ]
      }
    ],
    store: {
      select: departementList,
      fetchAction: departementActions.loadDepartement(),
      createAction: departementActions.createDepartement,
      updateAction: departementActions.updateDepartement,
      deleteAction: departementActions.deleteDepartement,
      importAction: departementActions.importDepartement
    }
  },

  {
    entity: 'Arrondissement',
    cols: [
      {
        field: 'code', header: 'Code', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'libelle', header: 'Libelle', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'description', header: 'Description', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'idCommune', header: 'Commune', width: 1, label: 'libelleCommune', text_center: false,
        validators: [Validators.required], type: 'dropdown', dropObj: {
          action: communeActions.loadCommune(),
          selector: communeList,
          key: 'id',
          field: 'idCommune',
          optionLabel: 'libelle'
        }
      }
    ],
    entityValidations: [
      {
        field: 'code',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'maxlength', validMessage: 'Ce champs requiert 50 caractères maximum'}
        ]
      },
      {
        field: 'libelle',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'pattern', validMessage: 'Ce champs requiert des chiffres'}
        ]
      },
      {
        field: 'description',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'pattern', validMessage: 'Ce champs requiert des chiffres'}
        ]
      }
    ],
    store: {
      select: arrondissementList,
      fetchAction: arrondissementActions.loadArrondissement(),
      createAction: arrondissementActions.createArrondissement,
      updateAction: arrondissementActions.updateArrondissement,
      deleteAction: arrondissementActions.deleteArrondissement,
      importAction: arrondissementActions.importArrondissement
    }
  },
  {
    entity: 'Secteur',
    cols: [
      {
        field: 'code', header: 'Code', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'libelle', header: 'Libelle', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'description', header: 'Description', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'idArrondissement', header: 'Arrondissement', width: 1, label: 'libelleArrondissement', text_center: false,
        validators: [Validators.required], type: 'dropdown', dropObj: {
          action: arrondissementActions.loadArrondissement(),
          selector: arrondissementList,
          key: 'id',
          field: 'idArrondissement',
          optionLabel: 'libelle'
        }
      }
    ],
    entityValidations: [
      {
        field: 'code',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'maxlength', validMessage: 'Ce champs requiert 50 caractères maximum'}
        ]
      },
      {
        field: 'libelle',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'pattern', validMessage: 'Ce champs requiert des chiffres'}
        ]
      },
      {
        field: 'description',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'pattern', validMessage: 'Ce champs requiert des chiffres'}
        ]
      }
    ],
    store: {
      select: secteurList,
      fetchAction: secteurActions.loadSecteur(),
      createAction: secteurActions.createSecteur,
      updateAction: secteurActions.updateSecteur,
      deleteAction: secteurActions.deleteSecteur,
      importAction: secteurActions.importSecteur
    }
  },
  {
    entity: 'Ville',
    cols: [
      {
        field: 'code', header: 'Code', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'libelle', header: 'Libelle', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'description', header: 'Description', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      }
    ],
    entityValidations: [
      {
        field: 'code',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'maxlength', validMessage: 'Ce champs requiert 50 caractères maximum'}
        ]
      },
      {
        field: 'libelle',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'pattern', validMessage: 'Ce champs requiert des chiffres'}
        ]
      },
      {
        field: 'description',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'pattern', validMessage: 'Ce champs requiert des chiffres'}
        ]
      }
    ],
    store: {
      select: villeList,
      fetchAction: villeActions.loadVille(),
      createAction: villeActions.createVille,
      updateAction: villeActions.updateVille,
      deleteAction: villeActions.deleteVille
    }
  },
  {
    entity: 'Commune',
    cols: [
      {
        field: 'code', header: 'Code', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'libelle', header: 'Libelle', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'description', header: 'Description', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'idDepartement', header: 'Province', width: 1, label: 'libelleDepartement', text_center: false,
        validators: [Validators.required], type: 'dropdown', dropObj: {
          action: departementActions.loadDepartement(),
          selector: departementList,
          key: 'id',
          field: 'idDepartement',
          optionLabel: 'libelle'
        }
      }
    ],
    entityValidations: [
      {
        field: 'code',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'maxlength', validMessage: 'Ce champs requiert 50 caractères maximum'}
        ]
      },
      {
        field: 'libelle',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'pattern', validMessage: 'Ce champs requiert des chiffres'}
        ]
      },
      {
        field: 'description',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'pattern', validMessage: 'Ce champs requiert des chiffres'}
        ]
      }
    ],
    store: {
      select: communeList,
      fetchAction: communeActions.loadCommune(),
      createAction: communeActions.createCommune,
      updateAction: communeActions.updateCommune,
      deleteAction: communeActions.deleteCommune,
      importAction: communeActions.importCommune
    }
  },
  {
    entity: 'Pays',
    cols: [
      {
        field: 'code', header: 'Code', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'libelle', header: 'Libelle', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'description', header: 'Description', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'idTypeZonePays', header: 'Zone Pays', width: 1, label: 'libelleTypeZonePays', text_center: false,
        validators: [Validators.required], type: 'dropdown', dropObj: {
          action: zonePaysActions.loadZonePays(),
          selector: zonepaysList,
          key: 'id',
          field: 'idTypeZonePays',
          optionLabel: 'libelle'
        }
      }
    ],
    entityValidations: [
      {
        field: 'code',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'maxlength', validMessage: 'Ce champs requiert 50 caractères maximum'}
        ]
      },
      {
        field: 'libelle',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'pattern', validMessage: 'Ce champs requiert des chiffres'}
        ]
      },
      {
        field: 'description',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'pattern', validMessage: 'Ce champs requiert des chiffres'}
        ]
      }
    ],
    store: {
      select: paysList,
      fetchAction: paysActions.loadPays(),
      createAction: paysActions.createPays,
      updateAction: paysActions.updatePays,
      deleteAction: paysActions.deletePays,
      importAction: paysActions.importPays
    }
  },
  {
    entity: 'ZonePays',
    cols: [
      {
        field: 'code', header: 'Code', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'libelle', header: 'Libelle', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      },
      {
        field: 'description', header: 'Description', type: 'string', width: 1, text_center: false,
        validators: [Validators.required, Validators.maxLength(50)]
      }
    ],
    entityValidations: [
      {
        field: 'code',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'maxlength', validMessage: 'Ce champs requiert 50 caractères maximum'}
        ]
      },
      {
        field: 'libelle',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'pattern', validMessage: 'Ce champs requiert des chiffres'}
        ]
      },
      {
        field: 'description',
        validations: [
          {validName: 'required', validMessage: 'Ce champs est obligatoire'},
          {validName: 'pattern', validMessage: 'Ce champs requiert des chiffres'}
        ]
      }
    ],
    store: {
      select: zonepaysList,
      fetchAction: zonePaysActions.loadZonePays(),
      createAction: zonePaysActions.createZonePays,
      updateAction: zonePaysActions.updateZonePays,
      deleteAction: zonePaysActions.deleteZonePays,
      importAction: zonePaysActions.importZonePays
    }
  }

];
