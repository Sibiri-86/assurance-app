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

@Injectable({providedIn: 'root'})
export class TierPayantService {
constructor(private http: HttpClient) {

}

posTierPayant(tierPayant1: Array<SinistreTierPayant>): Observable<any> {
    // @FIXME: post request
    return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.PRESTATION_TIER_PAYANT)}/enregistrer`, tierPayant1);
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

    searchTierPayantOrdreReglement(numero: string, date: string): Observable<any> {
        // @FIXME: post request
        return this.http.get(`${GlobalConfig.getEndpoint(Endpoints.PRESTATION_TIER_PAYANT)}/tierPayantOrdreReglement/consulter`, {params :
          this.createRequestOption({numero, date})});
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
