import { from } from "rxjs";
import {Plafond, PlafondList} from "./model";
import { HttpClient, HttpEvent, HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {GlobalConfig} from '../../../config/global.config';
import {Endpoints} from '../../../config/module.endpoints';

@Injectable({providedIn: 'root'})
export class PlafondService {
constructor(private http: HttpClient) {}

$getPlafonds(): Observable<PlafondList> {
    // @FIXME: get request
    return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.CONTRAT_PLAFOND)}`).pipe(
      map((response: PlafondList) => response),
      catchError(this.handleError())
    );
  }

posPlafond(Plafond: Plafond): Observable<any> {
    // @FIXME: post request
    return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_PLAFOND)}`, Plafond);
  }

updatePlafond(Plafond: Plafond): Observable<any> {
    // @FIXME: post request
    return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_PLAFOND)}/${Plafond.id}`, Plafond);
  }

deletePlafond(Plafond: Plafond): Observable<any> {
    // @FIXME: post request
    return this.http.patch(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_PLAFOND)}/${Plafond.id}`, null);
}

deletePlafonds(plafond: Array<Plafond>): Observable<any> {
    // @FIXME: post request
    return this.http.patch(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_PLAFOND)}`, plafond);
}



pushFileToStorage(file: File): Observable<any> {
  const data: FormData = new FormData();
  data.append('file', file);
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'multipart/form-data');
  headers.set('Accept', 'application/json');
  return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_PLAFOND)}/upload`, data, { headers: headers });
}

private handleError<T>() {
    return (error: HttpErrorResponse) => {
      return throwError(error.message || 'Something went wrong');
    };
  }
}

