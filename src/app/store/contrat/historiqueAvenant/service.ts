import {Avenant, HistoriqueAvenant, HistoriqueAvenantAdherant, HistoriqueAvenantList} from "./model";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {GlobalConfig} from '../../../config/global.config';
import {Endpoints} from '../../../config/module.endpoints';

@Injectable({providedIn: 'root'})
export class HistoriqueAvenantService {
constructor(private http: HttpClient) {}

getHistoriqueAvenants(policeId: string): Observable<HistoriqueAvenantList> {
    // @FIXME: get request
    return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.HISTORIQUE_AVENANT)}/${policeId}`).pipe(
      map((response: HistoriqueAvenantList) => response),
      catchError(this.handleError())
    );
}

postHistoriqueAvenant(historiqueAvenant: HistoriqueAvenant): Observable<any> {
    // @FIXME: post request
    return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.HISTORIQUE_AVENANT)}`, historiqueAvenant);
  }

updateHistoriqueAvenant(historiqueAvenant: HistoriqueAvenant): Observable<any> {
    // @FIXME: post request
    return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.HISTORIQUE_AVENANT_UPDATE)}`, historiqueAvenant);
  }

deleteHistoriqueAvenant(historiqueAvenant: HistoriqueAvenant): Observable<any> {
    // @FIXME: post request
    return this.http.patch(`${GlobalConfig.getEndpoint(Endpoints.HISTORIQUE_AVENANT)}/${historiqueAvenant.id}`, null);
}

getHistoriqueAvenantAdherantsByPolice(policeId: string): Observable<HistoriqueAvenantAdherant[]> {
    // @FIXME: get request
    return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.HISTORIQUE_AVENANT_ADHERANT)}/${policeId}`).pipe(
        map((response: HistoriqueAvenantAdherant[]) => response),
        catchError(this.handleError())
    );
}

    postAvenant(avenant: Avenant): Observable<any> {
        // @FIXME: post request
        return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.HISTORIQUE_AVENANT_MODIF)}`, avenant);
    }

private handleError<T>() {
    return (error: HttpErrorResponse) => {
      return throwError(error.message || 'Something went wrong');
    };
  }
}
