import { from } from "rxjs";
import {Adherent, AdherentList} from "./model";
import { HttpClient, HttpEvent, HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {GlobalConfig} from '../../../config/global.config';
import { AdherentFamille } from "./model";
import {Endpoints} from '../../../config/module.endpoints';

@Injectable({providedIn: 'root'})
export class AdherentService {
constructor(private http: HttpClient) {}

$getAdherents(idPolice: string): Observable<AdherentList> {
    // @FIXME: get request
    return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.CONTRAT_ADHERENT)}/${idPolice}`).pipe(
      map((response: AdherentList) => response),
      catchError(this.handleError())
    );
}

posAdherent(Adherent: Adherent): Observable<any> {
    // @FIXME: post request
    return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_ADHERENT)}`, Adherent);
  }

  posAdherentWithFamille(adherentFamille: AdherentFamille): Observable<any> {
    // @FIXME: post request
    return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_ADHERENT_WITH_FAMILLE)}`, adherentFamille);
  }

updateAdherent(Adherent: Adherent): Observable<any> {
    // @FIXME: post request
    return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_ADHERENT)}/${Adherent.id}`, Adherent);
  }

deleteAdherent(Adherent: Adherent): Observable<any> {
    // @FIXME: post request
    return this.http.patch(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_ADHERENT)}/${Adherent.id}`, Adherent);
}

deleteAdherents(adherent: Array<Adherent>): Observable<any> {
    // @FIXME: post request
    return this.http.patch(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_ADHERENT)}`, adherent);
}



pushFileToStorage(file: File): Observable<any> {
  const data: FormData = new FormData();
  data.append('file', file);
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'multipart/form-data');
  headers.set('Accept', 'application/json');
  return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_ADHERENT)}/upload`, data, { headers: headers });
}

private handleError<T>() {
    return (error: HttpErrorResponse) => {
      return throwError(error.message || 'Something went wrong');
    };
  }

    getAdherentsByPolice(idPolice: string): Observable<Adherent[]> {
        // @FIXME: get request
        return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.CONTRAT_ADHERENT_POLICE)}/${idPolice}`).pipe(
            map((response: Adherent[]) => response),
            catchError(this.handleError())
        );
    }
}

