import { from } from "rxjs";
import {TypePrestataire, TypePrestataireList} from "./model";
import { HttpClient, HttpEvent, HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {GlobalConfig} from '../../../config/global.config';
import {Endpoints} from '../../../config/module.endpoints';

@Injectable({providedIn: 'root'})
export class TypePrestataireService {
constructor(private http: HttpClient) {}

$getTypePrestataires(): Observable<TypePrestataireList> {
    // @FIXME: get request
    return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_TYPE_PRESTATAIRE)}`).pipe(
      map((response: TypePrestataireList) => response),
      catchError(this.handleError())
    );
  }

posTypePrestataire(TypePrestataire: TypePrestataire): Observable<any> {
    // @FIXME: post request
    return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_TYPE_PRESTATAIRE)}`, TypePrestataire);
  }

updateTypePrestataire(TypePrestataire: TypePrestataire): Observable<any> {
    // @FIXME: post request
    return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_TYPE_PRESTATAIRE)}/${TypePrestataire.id}`, TypePrestataire);
  }

deleteTypePrestataire(TypePrestataire: TypePrestataire): Observable<any> {
    // @FIXME: post request
    return this.http.patch(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_TYPE_PRESTATAIRE)}/${TypePrestataire.id}`, null);
}



pushFileToStorage(file: File): Observable<any> {
  const data: FormData = new FormData();
  data.append('file', file);
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'multipart/form-data');
  headers.set('Accept', 'application/json');
  return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_TYPE_PRESTATAIRE)}/upload`, data, { headers: headers });
}

private handleError<T>() {
    return (error: HttpErrorResponse) => {
      return throwError(error.message || 'Something went wrong');
    };
  }
}

