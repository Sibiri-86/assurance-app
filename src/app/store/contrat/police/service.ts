import { from } from "rxjs";
import {Police, PoliceList} from "./model";
import { HttpClient, HttpEvent, HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {GlobalConfig} from '../../../config/global.config';
import {Endpoints} from '../../../config/module.endpoints';

@Injectable({providedIn: 'root'})
export class PoliceService {
constructor(private http: HttpClient) {}

$getPolices(): Observable<PoliceList> {
    // @FIXME: get request
    return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.CONTRAT_POLICE)}`).pipe(
      map((response: PoliceList) => response),
      catchError(this.handleError())
    );
  }

posPolice(Police: Police): Observable<any> {
    // @FIXME: post request
    return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_POLICE)}`, Police);
  }

updatePolice(Police: Police): Observable<any> {
    // @FIXME: post request
    return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_POLICE)}/${Police.id}`, Police);
  }

  validerPolice(Police: Police): Observable<any> {
    // @FIXME: post request
    return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_POLICE)}/valider`, Police);
  }

deletePolice(Police: Police): Observable<any> {
    // @FIXME: post request
    return this.http.patch(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_POLICE)}/${Police.id}`, null);
}

deletePolices(police: Array<Police>): Observable<any> {
    // @FIXME: post request
    return this.http.patch(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_POLICE)}`, police);
}



pushFileToStorage(file: File): Observable<any> {
  const data: FormData = new FormData();
  data.append('file', file);
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'multipart/form-data');
  headers.set('Accept', 'application/json');
  return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_POLICE)}/upload`, data, { headers: headers });
}

private handleError<T>() {
    return (error: HttpErrorResponse) => {
      return throwError(error.message || 'Something went wrong');
    };
  }

    getPolicesFilterByAffNou(): Observable<PoliceList> {
        // @FIXME: get request
        return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.CONTRAT_POLICE)}/filter_by_affaire_nouvelle`).pipe(
            map((response: PoliceList) => response),
            catchError(this.handleError())
        );
    }
}

