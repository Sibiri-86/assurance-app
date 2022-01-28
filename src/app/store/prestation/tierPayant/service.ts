import { from } from "rxjs";
import { HttpClient, HttpEvent, HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {GlobalConfig} from '../../../config/global.config';
import {Endpoints} from '../../../config/module.endpoints';
// import { OrdreReglement, OrdreReglementList, Prefinancement, PrefinancementList } from "./model";
import { TypeEtatSinistre } from 'src/app/module/common/models/enum.etat.sinistre';
import { TypeEtatOrdreReglement } from 'src/app/module/common/models/emum.etat.ordre-reglement';
import { Report } from '../../contrat/police/model';
import {SinistreTierPayant, SinistreTierPayantList} from './model';
import {PrefinancementList} from '../prefinancement/model';

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

private handleError<T>() {
    return (error: HttpErrorResponse) => {
        return throwError(error.message || 'Something went wrong');
    };
}
}
