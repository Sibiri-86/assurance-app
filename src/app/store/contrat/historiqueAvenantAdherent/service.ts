import {HistoriqueAvenant, HistoriqueAvenantAdherant, HistoriqueAvenantAdherentList, HistoriqueAvenantList} from './model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {GlobalConfig} from '../../../config/global.config';
import {Endpoints} from '../../../config/module.endpoints';

@Injectable({providedIn: 'root'})
export class HistoriqueAvenantAdherentService {
constructor(private http: HttpClient) {}

getHistoriqueAvenantAdherents(haId: string): Observable<Array<HistoriqueAvenantAdherant>> {
    // @FIXME: get request
    return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.HISTORIQUE_AVENANT_ADHERENT)}/${haId}`).pipe(
      map((response: Array<HistoriqueAvenantAdherant>) => response),
      catchError(this.handleError())
    );
}

/* postHistoriqueAvenant(historiqueAvenant: HistoriqueAvenant): Observable<any> {
    // @FIXME: post request
    return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.HISTORIQUE_AVENANT)}`, historiqueAvenant);
  }

updateHistoriqueAvenant(historiqueAvenant: HistoriqueAvenant): Observable<any> {
    // @FIXME: post request
    return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.HISTORIQUE_AVENANT)}/${historiqueAvenant.id}`, historiqueAvenant);
  }

deleteHistoriqueAvenant(historiqueAvenant: HistoriqueAvenant): Observable<any> {
    // @FIXME: post request
    return this.http.patch(`${GlobalConfig.getEndpoint(Endpoints.HISTORIQUE_AVENANT)}/${historiqueAvenant.id}`, null);
} */

private handleError<T>() {
    return (error: HttpErrorResponse) => {
      return throwError(error.message || 'Something went wrong');
    };
  }
}
