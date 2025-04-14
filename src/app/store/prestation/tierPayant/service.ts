import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {GlobalConfig} from '../../../config/global.config';
import {Endpoints} from '../../../config/module.endpoints';
import { TypeEtatSinistre } from 'src/app/module/common/models/enum.etat.sinistre';
import { TypeEtatOrdreReglement } from 'src/app/module/common/models/emum.etat.ordre-reglement';
import { Report } from '../../contrat/police/model';
import {
    OrdreReglementTierPayant,
    OrdreReglementTierPayantList,
    Prestation,
    SinistreTierPayant,
    SinistreTierPayantList
} from './model';
import {OrdreReglement, OrdreReglementList, Prefinancement} from '../prefinancement/model';
import { CourrierPrestataire } from '../../medical/ordonnance-medical/model';
import { Page } from 'src/app/module/util/pageable';

@Injectable({providedIn: 'root'})
export class TierPayantService {
constructor(private http: HttpClient) {

}

posTierPayant(tierPayant: Array<SinistreTierPayant>): Observable<any> {
    // @FIXME: post request
    return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.PRESTATION_TIER_PAYANT)}/enregistrer`, tierPayant);
  }

  posTierPayant1(tierPayant: SinistreTierPayant): Observable<any> {
    // @FIXME: post request
    return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.PRESTATION_TIER_PAYANT)}/enregistrer-noList`, tierPayant);
  }

  updatedOrdreTierTierPayantSticker(ordreReglementTierPayant: OrdreReglementTierPayant): Observable<any> {
    return this.http.patch(`${GlobalConfig.getEndpoint(Endpoints.PRESTATION_TIER_PAYANT)}/update-ordre-tiers-payant-sticker`, ordreReglementTierPayant);
  }

    $getTierPayant(): Observable<SinistreTierPayantList> {
        // @FIXME: get request
        return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.PRESTATION_TIER_PAYANT)}`).pipe(
            map((response: SinistreTierPayantList) => response),
            catchError(this.handleError())
        );
    }

    $getReport(report: Report): Observable<ArrayBuffer> {
        // @FIXME: get request
        return this.http.post( `${GlobalConfig.getEndpoint(Endpoints.PRESTATION_TIER_PAYANT)}/report`,
            report, {responseType: 'arraybuffer'});
    }

    putUpdateTierPayant(tierPayant: SinistreTierPayant, etat: TypeEtatSinistre): Observable<any> {
        // @FIXME: post request
        return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.PRESTATION_TIER_PAYANT)}/etat/${etat}`, tierPayant);
    }

    $getTierPayantOrdreReglementValide(): Observable<OrdreReglementTierPayantList> {
        // @FIXME: get request
        return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.PRESTATION_TIER_PAYANT)}/ordreReglement/valideList`).pipe(
            map((response: OrdreReglementTierPayantList) => response),
            catchError(this.handleError())
        );
    }


    $getTierPayantOrdreReglementFactureIstance(): Observable<OrdreReglementTierPayantList> {
        // @FIXME: get request
        return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.PRESTATION_TIER_PAYANT)}/ordreReglement/facture-instance`).pipe(
            map((response: OrdreReglementTierPayantList) => response),
            catchError(this.handleError())
        );
    }

    $getTierPayantOrdreReglementFactureIstance2(dateD: string, dateF: string): Observable<OrdreReglementTierPayantList> {
        // @FIXME: get request
        return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.PRESTATION_TIER_PAYANT)}/ordreReglement/facture-instance2?dateD=${dateD}&dateF=${dateF}`).pipe(
            map((response: OrdreReglementTierPayantList) => response),
            catchError(this.handleError())
        );
    }

    getTierPayantOrdreReglementFactureIstanceWitSticker(dateD: string, dateF: string): Observable<OrdreReglementTierPayantList> {
        // @FIXME: get request
        return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.PRESTATION_TIER_PAYANT)}/ordreReglement/facture-instance-with-sticker?dateD=${dateD}&dateF=${dateF}`).pipe(
            map((response: OrdreReglementTierPayantList) => response),
            catchError(this.handleError())
        );
    }



    getTierPayantOrdreReglementFactureTiersPaye(dateD: string, dateF: string): Observable<OrdreReglementTierPayantList> {
        return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.PRESTATION_TIER_PAYANT)}/ordreReglement/facture-tiers-payant-paye?dateD=${dateD}&dateF=${dateF}`).pipe(
            map((response: OrdreReglementTierPayantList) => response),
            catchError(this.handleError())
        );
    }

    getTierPayantOrdreReglementFactureTiersPayeAndTackedCheque(dateD: string, dateF: string): Observable<OrdreReglementTierPayantList> {
        return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.PRESTATION_TIER_PAYANT)}/ordreReglement/facture-tiers-payant-paye-tacked-cheque?dateD=${dateD}&dateF=${dateF}`).pipe(
            map((response: OrdreReglementTierPayantList) => response),
            catchError(this.handleError())
        );
    }

    getTierPayantOrdreReglementFactureTiersPayeAndNotTackedCheque(dateD: string, dateF: string): Observable<OrdreReglementTierPayantList> {
        return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.PRESTATION_TIER_PAYANT)}/ordreReglement/facture-tiers-payant-paye-not-tacked-cheque?dateD=${dateD}&dateF=${dateF}`).pipe(
            map((response: OrdreReglementTierPayantList) => response),
            catchError(this.handleError())
        );
    }
    getTierPayantOrdreReglementFactureTiersPayeDevalider(dateD: string, dateF: string): Observable<OrdreReglementTierPayantList> {
        return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.PRESTATION_TIER_PAYANT)}/ordreReglement/facture-tiers-payant-devalider?dateD=${dateD}&dateF=${dateF}`).pipe(
            map((response: OrdreReglementTierPayantList) => response),
            catchError(this.handleError())
        );
    }


  getSinistreByOrdreReglementId2(idOrdreReglement: string, page: number, size: number): Observable<any> {
    const params = new HttpParams()
      .set('idOrdreReglement', idOrdreReglement)
      .set('page', page.toString())
      .set('size', size.toString());

      return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.PRESTATION_TIER_PAYANT_ORDRE_REGLEMMENT), { params }}`).pipe(
        map((response: SinistreTierPayant) => response),
        catchError(this.handleError())
    );
  }

  getSinistreByOrdreReglementId(idOrdreReglement: string, page: number, size: number): Observable<any> {
    const params = new HttpParams()
      .set('idOrdreReglement', idOrdreReglement)
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<any>(GlobalConfig.getEndpoint(Endpoints.PRESTATION_TIER_PAYANT_ORDRE_REGLEMMENT), { params });
  }

  payerOrdreReglemnt(ordreReglementTierPayant: OrdreReglementTierPayant): Observable<any> {
    return this.http.patch<any>(GlobalConfig.getEndpoint(Endpoints.PRESTATION_TIER_PAYANT_PAYER_ORDRE_REGLEMENT), ordreReglementTierPayant);
  }
  payerOrdreReglementPrefinencement(ordreReglement: OrdreReglement): Observable<any> {
    return this.http.patch<any>(GlobalConfig.getEndpoint(Endpoints.PRESTATION_TIER_PAYANT_PAYER_ORDRE_REGLEMENT_PREFINENCEMENT), ordreReglement);
  }

  devaliderPaiementOrdreReglemnt(ordreReglementTierPayant: OrdreReglementTierPayant): Observable<any> {
    return this.http.patch<any>(GlobalConfig.getEndpoint(Endpoints.PRESTATION_TIER_PAYANT_DEVALIDER_PAIEMENT_ORDRE_REGLEMENT), ordreReglementTierPayant);
  }

  devaliderPaiementOrdreReglementPrefinencement(ordreReglement: OrdreReglement): Observable<any> {
    return this.http.patch<any>(GlobalConfig.getEndpoint(Endpoints.PRESTATION_TIER_PAYANT_DEVALIDER_PAIEMENT_ORDRE_REGLEMENT_PREFINENCEMENT), ordreReglement);
  }

  getStickerConfirmation(sticker: string): Observable<any> {
    const params = new HttpParams()
    .set('sticker', sticker)

    return this.http.get<any>(GlobalConfig.getEndpoint(Endpoints.PRESTATION_TIER_PAYANT_GET_STICKER),  {params});
  }

  

  verifierExistenceNumeroCheque(numeroCheque: string): Observable<boolean> {
    const params = new HttpParams()
        .set('numeroCheque', numeroCheque)

    return this.http.get<boolean>(GlobalConfig.getEndpoint(Endpoints.PRESTATION_TIER_PAYANT_EXISTANCE_NUMERO_CHEQUE), {params});
  }

  verifierExistenceNumeroChequePrefinencement(numeroCheque: string): Observable<boolean> {
    const params = new HttpParams()
        .set('numeroCheque', numeroCheque)

    return this.http.get<boolean>(GlobalConfig.getEndpoint(Endpoints.PRESTATION_TIER_PAYANT_EXISTANCE_NUMERO_CHEQUE_PREFINENCEMENT), {params});
  }

  exportAllOrdreReglement(dateDebut?: string, dateFin?: string, prestataire?: string) {
    const formattedDateDebut = new Date(dateDebut).toISOString().split('T')[0];
    const formattedDateFin = new Date(dateFin).toISOString().split('T')[0];
  
    let params = new HttpParams()
      .set('dateDebut', formattedDateDebut)
      .set('dateFin', formattedDateFin);
  
    if (prestataire) {
      params = params.set('prestataire', prestataire);
    }
  
    return this.http.get(GlobalConfig.getEndpoint(Endpoints.PRESTATION_TIER_PAYANT_PAYE_EXPORTATION), { 
      params,
      responseType: 'blob'
    });
  }

  getExportAllOrdreWithCheque(dateDebut?: string, dateFin?: string, prestataire?: string) {
    const formattedDateDebut = new Date(dateDebut).toISOString().split('T')[0];
    const formattedDateFin = new Date(dateFin).toISOString().split('T')[0];
  
    let params = new HttpParams()
      .set('dateDebut', formattedDateDebut)
      .set('dateFin', formattedDateFin);
  
    if (prestataire) {
      params = params.set('prestataire', prestataire);
    }
  
    return this.http.get(GlobalConfig.getEndpoint(Endpoints.PRESTATION_TIER_PAYANT_PAYE_EXPORTATION_WITH_CHEQUE), { 
      params,
      responseType: 'blob'
    });
  }
  getExportAllOrdreWithoutCheque(dateDebut?: string, dateFin?: string, prestataire?: string) {
    const formattedDateDebut = new Date(dateDebut).toISOString().split('T')[0];
    const formattedDateFin = new Date(dateFin).toISOString().split('T')[0];
  
    let params = new HttpParams()
      .set('dateDebut', formattedDateDebut)
      .set('dateFin', formattedDateFin);
  
    if (prestataire) {
      params = params.set('prestataire', prestataire);
    }
  
    return this.http.get(GlobalConfig.getEndpoint(Endpoints.PRESTATION_TIER_PAYANT_PAYE_EXPORTATION_WITHOUT_CHEQUE), { 
      params,
      responseType: 'blob'
    });
  }
  

  getExportAllOrdreDevalide(dateDebut?: string, dateFin?: string, prestataire?: string) {
    const formattedDateDebut = new Date(dateDebut).toISOString().split('T')[0];
    const formattedDateFin = new Date(dateFin).toISOString().split('T')[0];
  
    let params = new HttpParams()
      .set('dateDebut', formattedDateDebut)
      .set('dateFin', formattedDateFin);
  
    if (prestataire) {
      params = params.set('prestataire', prestataire);
    }
  
    return this.http.get(GlobalConfig.getEndpoint(Endpoints.PRESTATION_TIER_PAYANT_PAYE_EXPORTATION_DEVALIDE), { 
      params,
      responseType: 'blob'
    });
  }
  

  exportPrestationPrefincementTierPayantToExcel(dateDebut: string, dateFin: string, choose: string) {
    
    const formattedDateDebut = new Date(dateDebut).toISOString().split('T')[0];
    const formattedDateFin = new Date(dateFin).toISOString().split('T')[0];
  
    const params = new HttpParams()
      .set('dateDebut', formattedDateDebut)
      .set('dateFin', formattedDateFin)
      .set('choose', choose);

    return this.http.get(GlobalConfig.getEndpoint(Endpoints.PRESTATION_EXPORT_PREFINANCEMENT_TIER_PAYANT), { 
      params,
      responseType: 'blob'
    });
  }

  getPrestationBySinistreId(sinistreId: string, page: number, size: number): Observable<any> {
    const params = new HttpParams()
      .set('sinistreId', sinistreId)
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<any>(GlobalConfig.getEndpoint(Endpoints.PRESTATION_TIER_PAYANT_PRESTATION_BY_SINSITRE), { params });
  }


    $getTierPayantOrdreReglementFacturePaye(): Observable<OrdreReglementTierPayantList> {
        // @FIXME: get request
        return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.PRESTATION_TIER_PAYANT)}/ordreReglement/facture-paye`).pipe(
            map((response: OrdreReglementTierPayantList) => response),
            catchError(this.handleError())
        );
    }

    paiementFacture(ordre: OrdreReglementTierPayant): Observable<any> {
        // @FIXME: post request
        return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.PRESTATION_TIER_PAYANT)}/ordreReglement/paiement-facture`, ordre);
      }

      devaliderPaiementFacture(ordre: OrdreReglementTierPayant): Observable<any> {
        // @FIXME: post request
        return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.PRESTATION_TIER_PAYANT)}/ordreReglement/paiement-devalider`, ordre);
      }

    $findMontantConsomme(idAdherent: string, idSousActe: string): Observable<any> {
        // @FIXME: get request
        return this.http.get(`${GlobalConfig.getEndpoint(Endpoints.PRESTATION_TIER_PAYANT)}/find-montant-consomme`, {params :
          this.createRequestOption({idAdherent,idSousActe})});
       
      }

      $findMontantPlafond(idAdherent: string, idActe: string): Observable<any> {
        // @FIXME: get request
        return this.http.get(`${GlobalConfig.getEndpoint(Endpoints.PRESTATION_TIER_PAYANT)}/find-montant-consomme-Acte`, {params :
          this.createRequestOption({idAdherent,idActe})});
       
      }

    $getTierPayantValide(): Observable<SinistreTierPayantList> {
        // @FIXME: get request
        return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.PRESTATION_TIER_PAYANT)}/valide`).pipe(
            map((response: SinistreTierPayantList) => response),
            catchError(this.handleError())
        );
    }

    postTierPayantOrdreReglement(tierPayants: Array<SinistreTierPayant>): Observable<any> {
        // @FIXME: post request
        return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.PRESTATION_TIER_PAYANT)}/ordreReglement`, tierPayants);
    }

    deletePrestation(prestation: Prestation): Observable<any> {
        // @FIXME: post request
        return this.http.patch(`${GlobalConfig.getEndpoint(Endpoints.PRESTATION_TIER_PAYANT)}/prestation/${prestation.id}`, null);
    }

    findPrestationBySinitreTierPayant(sinitreTierId: string): Observable<Prestation[]> {
        // @FIXME: post request
        return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.PRESTATION_TIER_PAYANT)}/prestation/${sinitreTierId}`).pipe(
            map((response: Prestation[]) => response),
            catchError(this.handleError())
        );    
    }

    findPrestationBySinitreTierPayant2(sinitreTierId: string, page: number, size: number): Observable<Page<Prestation[]>> {
    const params = new HttpParams()
      .set('sinitreTierId', sinitreTierId)
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<Page<Prestation[]>>(
      `${GlobalConfig.getEndpoint(Endpoints.PRESTATION_TIER_PAYANT2)}${sinitreTierId}`, { params });
  }

   // Bircof
    // Rechercher les adhérants par Prestataire, numeroFacture, nom et exercice
    searchAdherentByExerciceAndPrestataireAndByNumeroFactureAndByPrenom(
        prestataireId?: string,
        sinistreTierPayantNumeroFacture?: string,
        nom?: string,
        prenom?: string,
        page: number = 0,
        size: number = 10): Observable<Page<Prestation[]>> {
        let params = new HttpParams()
            .set('prestataireId', prestataireId)
            .set('sinistreTierPayantNumeroFacture', sinistreTierPayantNumeroFacture)
            .set('nom', nom)
            .set('prenom', prenom)
            .set('page', page.toString())
            .set('size', size.toString());
        return this.http.get<Page<Prestation[]>>(
            `${GlobalConfig.getEndpoint(Endpoints.ADHERANT_BY_EXERCICE_AND_PRESTAIRE_AND_NUMERO_FACTURE)}`, { params });
    }

    


    deleteTierPayant(tierPayant: Array<SinistreTierPayant>): Observable<any> {
        // @FIXME: post request
        return this.http.patch(`${GlobalConfig.getEndpoint(Endpoints.PRESTATION_TIER_PAYANT)}`, tierPayant);
    }

    $getOrdreReglement(): Observable<OrdreReglementTierPayantList> {
        // @FIXME: get request
        return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.PRESTATION_TIER_PAYANT)}/ordreReglement/list`).pipe(
            map((response: OrdreReglementTierPayantList) => response),
            catchError(this.handleError())
        );
    }

    putUpdateTierPayantOrdreReglement(ordre: OrdreReglementTierPayant, etat: TypeEtatOrdreReglement): Observable<any> {
        // @FIXME: post request
        return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.PRESTATION_TIER_PAYANT)}/ordreReglement/valider/${etat}`, ordre);
    }

    deleteOrdreReglement(ordreReglement: Array<OrdreReglementTierPayant>): Observable<any> {
        // @FIXME: post request
        return this.http.patch(`${GlobalConfig.getEndpoint(Endpoints.PRESTATION_TIER_PAYANT)}/ordreReglement/del`, ordreReglement);
    }

    checkTierPayant(tierPayant: Array<SinistreTierPayant>): Observable<any> {
        // @FIXME: post request
        return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.PRESTATION_TIER_PAYANT)}/consulter`, tierPayant);
    }

    searchTiersPayant(matricule: number, dateDeclaration: string): Observable<any> {
        // @FIXME: post request
        return this.http.get(`${GlobalConfig.getEndpoint(Endpoints.PRESTATION_TIER_PAYANT)}/search`, {params :
                this.createRequestOption({matricule, dateDeclaration})});
    }

    searchTiersPayantByFacture(numeroFacture: string, dateDeclaration: string): Observable<any> {
        // @FIXME: post request
        return this.http.get(`${GlobalConfig.getEndpoint(Endpoints.PRESTATION_TIER_PAYANT)}/search-by-Facture`, {params :
                this.createRequestOption({numeroFacture, dateDeclaration})});
    }

    searchTierPayantOrdreReglement(numero: string, date: string): Observable<any> {
        // @FIXME: post request
        return this.http.get(`${GlobalConfig.getEndpoint(Endpoints.PRESTATION_TIER_PAYANT)}/tierPayantOrdreReglement/consulter`, {params :
          this.createRequestOption({numero, date})});
      }

      $getTierPayantOrdreReglementPeriode(dateD: string, dateF: string): Observable<any> {
        // @FIXME: get request
        return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.PRESTATION_TIER_PAYANT)}/tierPayantOrdreReglement/valide/periode` , {params :
          this.createRequestOption({dateD, dateF})}).pipe(
            map((response: any) => response),
            catchError(this.handleError())
        );
      }

      $getTierPayantByPeriode(dateD: string, dateF: string): Observable<SinistreTierPayantList> {
        // @FIXME: get request
        return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.PRESTATION_TIER_PAYANT)}/periode`, {params :
            this.createRequestOption({dateD, dateF})}).pipe(
              map((response: SinistreTierPayantList) => response),
              catchError(this.handleError())
          );
        }

        findSinistreTierPayantByOrdreReglementTierPayantId(ordreId: string): Observable<Prestation[]> {
            // @FIXME: post request
            return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.PRESTATION_TIER_PAYANT)}/sinistreTiersPayantByOrdreId/${ordreId}`).pipe(
                map((response: Prestation[]) => response),
                catchError(this.handleError())
            );    
        }

        findSinistreTiersPayantByOrdreReglementId(ordreId: string): Observable<Prestation[]> {
            // @FIXME: post request
            return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.PRESTATION_TIER_PAYANT)}/sinistreTiersPayantBy-Ordre-Id/${ordreId}`).pipe(
                map((response: Prestation[]) => response),
                catchError(this.handleError())
            );    
        }

        postCourrierPrestataire(courrier: CourrierPrestataire): Observable<any> {
            // @FIXME: post request
            return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.PRESTATION_TIER_PAYANT)}/courrier/save`, courrier);
          }

        updateCourrierPrestataire(courrierPrestataire: CourrierPrestataire): Observable<any> {
            // @FIXME: post request
            return this.http.patch(`${GlobalConfig.getEndpoint(Endpoints.PRESTATION_TIER_PAYANT)}/courrier/save-update`, courrierPrestataire);
          }

          $getCourriersByPeriode(dateD: string, dateF: string): Observable<Array<CourrierPrestataire>> {
            // @FIXME: get request
            return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.PRESTATION_TIER_PAYANT)}/courrier/by_periode` ,{params :
              this.createRequestOption({dateD, dateF})}).pipe(
              map((response: Array<CourrierPrestataire>) => response),
              catchError(this.handleError())
            );
          }

    private createRequestOption = (req?: any): HttpParams => {
        let options: HttpParams = new HttpParams();
        if (req) {
            Object.keys(req).forEach(key => {
                if (key !== 'sort' && key !== 'type' &&
                    req[key] !== null && req[key] !== undefined) {
                    options = options.set(key, req[key]);
                }
            });
            if (req.sort) {
                req.sort.forEach(val => {
                    options = options.append('sort', val);
                });
            }
        }
        return options;
    }

private handleError<T>() {
    return (error: HttpErrorResponse) => {
        return throwError(error.message || 'Something went wrong');
    };
}



}
