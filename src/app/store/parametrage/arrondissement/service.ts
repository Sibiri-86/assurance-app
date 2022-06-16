import { from } from "rxjs";
import {Arrondissement, ArrondissementList} from "./model";
import { HttpClient, HttpEvent, HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {GlobalConfig} from '../../../config/global.config';
import {Endpoints} from '../../../config/module.endpoints';

@Injectable({providedIn: 'root'})
export class ArrondissementService {
constructor(private http: HttpClient) {}

$getArrondissements(): Observable<ArrondissementList> {
    // @FIXME: get request
    return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_ARRONDISSEMENT)}`).pipe(
      map((response: ArrondissementList) => response),
      catchError(this.handleError())
    );
  }

posArrondissement(Arrondissement: Arrondissement): Observable<any> {
    // @FIXME: post request
    return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_ARRONDISSEMENT)}`, Arrondissement);
  }

updateArrondissement(Arrondissement: Arrondissement): Observable<any> {
    // @FIXME: post request
    return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_ARRONDISSEMENT)}/${Arrondissement.id}`, Arrondissement);
  }

deleteArrondissement(Arrondissement: Arrondissement): Observable<any> {
    // @FIXME: post request
    return this.http.patch(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_ARRONDISSEMENT)}/${Arrondissement.id}`, null);
}



pushFileToStorage(file: File): Observable<any> {
  const data: FormData = new FormData();
  data.append('file', file);
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'multipart/form-data');
  headers.set('Accept', 'application/json');
  return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_ARRONDISSEMENT)}/upload`, data, { headers: headers });
}

private handleError<T>() {
    return (error: HttpErrorResponse) => {
      return throwError(error.message || 'Something went wrong');
    };
  }
}

