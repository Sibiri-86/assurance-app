import { from } from "rxjs";
import { HttpClient, HttpEvent, HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {GlobalConfig} from '../../../config/global.config';
import {Endpoints} from '../../../config/module.endpoints';
import { OrdreReglement, OrdreReglementList, Prefinancement, PrefinancementList, Prestation } from "./model";
import { TypeEtatSinistre } from "src/app/module/common/models/enum.etat.sinistre";
import { TypeEtatOrdreReglement } from "src/app/module/common/models/emum.etat.ordre-reglement";
import { Report } from "../../contrat/police/model";

@Injectable({providedIn: 'root'})
export class PrefinancementService {
constructor(private http: HttpClient) {
    
}


posOrdreReglement(prefinancement: Array<Prefinancement>): Observable<any> {
    // @FIXME: post request
    return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.PRESTATION_PREFINANCEMENT)}/ordreReglement`, prefinancement);
  }

posPrefinancement(prefinancement: Array<Prefinancement>): Observable<any> {
    // @FIXME: post request
    return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.PRESTATION_PREFINANCEMENT)}/enregistrer`, prefinancement);
  }
  
  checkPrefinancement(prefinancement: Array<Prefinancement>): Observable<any> {
    // @FIXME: post request
    return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.PRESTATION_PREFINANCEMENT)}/consulter`, prefinancement);
  }
  
  putUpdatePrefinancement(prefinancement: Prefinancement, etat: TypeEtatSinistre): Observable<any> {
    // @FIXME: post request
    return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.PRESTATION_PREFINANCEMENT)}/etat/${etat}`, prefinancement);
  }
  
  deletePrestation(prestation: Prestation): Observable<any> {
    // @FIXME: post request
    return this.http.patch(`${GlobalConfig.getEndpoint(Endpoints.PRESTATION_PREFINANCEMENT)}/prestation/${prestation.id}`, null);
  }

  deletePrefinancement(prefinancement: Array<Prefinancement>): Observable<any> {
    // @FIXME: post request
    return this.http.patch(`${GlobalConfig.getEndpoint(Endpoints.PRESTATION_PREFINANCEMENT)}`, prefinancement);
  }

  deleteOrdreReglement(ordreReglement: Array<OrdreReglement>): Observable<any> {
    // @FIXME: post request
    return this.http.patch(`${GlobalConfig.getEndpoint(Endpoints.PRESTATION_PREFINANCEMENT)}/ordreReglement`, ordreReglement);
  }

  putUpdateOrdreReglement(ordre: OrdreReglement, etat: TypeEtatOrdreReglement): Observable<any> {
    // @FIXME: post request
    return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.PRESTATION_PREFINANCEMENT)}/ordreReglement/etat/${etat}`, ordre);
  }
  
  $getReport(report: Report): Observable<ArrayBuffer> {
    // @FIXME: get request
    return this.http.post( `${GlobalConfig.getEndpoint(Endpoints.PRESTATION_PREFINANCEMENT)}/report`,
     report, {responseType: 'arraybuffer'});
}
  
    
  $getOrdreReglement(): Observable<OrdreReglementList> {
    // @FIXME: get request
    return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.PRESTATION_PREFINANCEMENT)}/ordreReglement`).pipe(
        map((response: OrdreReglementList) => response),
        catchError(this.handleError())
    );
}

  $getOrdreReglementValide(): Observable<OrdreReglementList> {
    // @FIXME: get request
    return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.PRESTATION_PREFINANCEMENT)}/ordreReglement/valide`).pipe(
        map((response: OrdreReglementList) => response),
        catchError(this.handleError())
    );
  }
  
  $getPrefinancement(): Observable<PrefinancementList> {
    // @FIXME: get request
    return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.PRESTATION_PREFINANCEMENT)}`).pipe(
        map((response: PrefinancementList) => response),
        catchError(this.handleError())
    );
}

$getPrefinancementValide(): Observable<PrefinancementList> {
    // @FIXME: get request
    return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.PRESTATION_PREFINANCEMENT)}/valide`).pipe(
        map((response: PrefinancementList) => response),
        catchError(this.handleError())
    );
}

private handleError<T>() {
    return (error: HttpErrorResponse) => {
        return throwError(error.message || 'Something went wrong');
    };
}
}
