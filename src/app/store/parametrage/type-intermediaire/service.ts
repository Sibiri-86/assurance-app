import { from } from "rxjs";
import {TypeIntermediaire, TypeIntermediaireList} from "./model";
import { HttpClient, HttpEvent, HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {GlobalConfig} from '../../../config/global.config';
import {Endpoints} from '../../../config/module.endpoints';

@Injectable({providedIn: 'root'})
export class TypeIntermediaireService {
constructor(private http: HttpClient) {}

$getTypeIntermediaires(): Observable<TypeIntermediaireList> {
    // @FIXME: get request
    return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_TYPE_INTERMEDIAIRE)}`).pipe(
      map((response: TypeIntermediaireList) => response),
      catchError(this.handleError())
    );
  }

posTypeIntermediaire(TypeIntermediaire: TypeIntermediaire): Observable<any> {
    // @FIXME: post request
    return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_TYPE_INTERMEDIAIRE)}`, TypeIntermediaire);
  }

updateTypeIntermediaire(TypeIntermediaire: TypeIntermediaire): Observable<any> {
    // @FIXME: post request
    return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_TYPE_INTERMEDIAIRE)}/${TypeIntermediaire.id}`, TypeIntermediaire);
  }

deleteTypeIntermediaire(TypeIntermediaire: TypeIntermediaire): Observable<any> {
    // @FIXME: post request
    return this.http.patch(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_TYPE_INTERMEDIAIRE)}/${TypeIntermediaire.id}`, null);
}



pushFileToStorage(file: File): Observable<any> {
  const data: FormData = new FormData();
  data.append('file', file);
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'multipart/form-data');
  headers.set('Accept', 'application/json');
  return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_TYPE_INTERMEDIAIRE)}/upload`, data, { headers: headers });
}

private handleError<T>() {
    return (error: HttpErrorResponse) => {
      return throwError(error.message || 'Something went wrong');
    };
  }
}

