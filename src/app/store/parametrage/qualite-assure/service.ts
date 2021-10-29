import { from } from "rxjs";
import {QualiteAssure, QualiteAssureList} from "./model";
import { HttpClient, HttpEvent, HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {GlobalConfig} from '../../../config/global.config';
import {Endpoints} from '../../../config/module.endpoints';

@Injectable({providedIn: 'root'})
export class QualiteAssureService {
constructor(private http: HttpClient) {}

$getQualiteAssures(): Observable<QualiteAssureList> {
    // @FIXME: get request
    return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_TYPE_QUALITE_ASSURE)}`).pipe(
      map((response: QualiteAssureList) => response),
      catchError(this.handleError())
    );
  }

posQualiteAssure(QualiteAssure: QualiteAssure): Observable<any> {
    // @FIXME: post request
    return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_TYPE_QUALITE_ASSURE)}`, QualiteAssure);
  }

updateQualiteAssure(QualiteAssure: QualiteAssure): Observable<any> {
    // @FIXME: post request
    return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_TYPE_QUALITE_ASSURE)}/${QualiteAssure.id}`, QualiteAssure);
  }

deleteQualiteAssure(QualiteAssure: QualiteAssure): Observable<any> {
    // @FIXME: post request
    return this.http.patch(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_TYPE_QUALITE_ASSURE)}/${QualiteAssure.id}`, null);
}



pushFileToStorage(file: File): Observable<any> {
  const data: FormData = new FormData();
  data.append('file', file);
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'multipart/form-data');
  headers.set('Accept', 'application/json');
  return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_TYPE_QUALITE_ASSURE)}/upload`, data, { headers: headers });
}

private handleError<T>() {
    return (error: HttpErrorResponse) => {
      return throwError(error.message || 'Something went wrong');
    };
  }
}

