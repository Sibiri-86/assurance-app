import { from } from "rxjs";
import { HttpClient, HttpEvent, HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {GlobalConfig} from '../../../config/global.config';
import {Endpoints} from '../../../config/module.endpoints';
import { Journaux, JournauxList } from "./model";
import { Report } from "../../contrat/police/model";


@Injectable({providedIn: 'root'})
export class JournauxService {
constructor(private http: HttpClient) {}

$getJournaux(): Observable<JournauxList> {
    // @FIXME: get request
    return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_JOURNAUX)}`).pipe(
      map((response: JournauxList) => response),
      catchError(this.handleError())
    );
  }

 

posJournaux(journaux: Journaux): Observable<any> {
    // @FIXME: post request
    return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_JOURNAUX)}`, journaux);
  }

updateJournaux(journaux: Journaux): Observable<any> {
    // @FIXME: post request
    return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_JOURNAUX)}/${journaux.id}`, journaux);
  }

deleteJournaux(journaux: Journaux): Observable<any> {
    // @FIXME: post request
    return this.http.patch(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_JOURNAUX)}/${journaux.id}`, null);
}



pushFileToStorage(file: File): Observable<any> {
  console.log(file);
  const data: FormData = new FormData();
  data.append('file', file);
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'multipart/form-data');
  headers.set('Accept', 'application/json');
 // const newRequest = new HttpRequest('POST', `${Endpoints.PARAMETRAGE_TYPE_GARANTIE}/upload`, data, {
  //reportProgress: true,
  //responseType: 'text'
  //});
  return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_JOURNAUX)}/upload`, data, { headers: headers });
}

$getReport(report: Report): Observable<ArrayBuffer> {
  // @FIXME: get request
  return this.http.post( `${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_JOURNAUX)}/report`,
      report, {responseType: 'arraybuffer'});
}

private handleError<T>() {
    return (error: HttpErrorResponse) => {
      return throwError(error.message || 'Something went wrong');
    };
  }
}

