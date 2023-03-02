import { from } from "rxjs";
import {Prestataire, PrestataireList} from "./model";
import { HttpClient, HttpEvent, HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {GlobalConfig} from '../../../config/global.config';
import {Endpoints} from '../../../config/module.endpoints';

@Injectable({providedIn: 'root'})
export class PrestataireService {
constructor(private http: HttpClient) {}

$getPrestataires(): Observable<PrestataireList> {
    // @FIXME: get request
    return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_PRESTATAIRE)}`).pipe(
      map((response: PrestataireList) => response),
      catchError(this.handleError())
    );
  }

posPrestataire(Prestataire: Prestataire): Observable<any> {
    // @FIXME: post request
    return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_PRESTATAIRE)}`, Prestataire);
  }

updatePrestataire(Prestataire: Prestataire): Observable<any> {
    // @FIXME: post request
    return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_PRESTATAIRE)}/${Prestataire.id}`, Prestataire);
  }

deletePrestataire(Prestataire: Prestataire): Observable<any> {
    // @FIXME: post request
    return this.http.patch(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_PRESTATAIRE)}/${Prestataire.id}`, null);
}



pushFileToStorage(file: File): Observable<any> {
  const data: FormData = new FormData();
  data.append('file', file);
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'multipart/form-data');
  headers.set('Accept', 'application/json');
  return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_PRESTATAIRE)}/upload`, data, { headers: headers });
}

getPrestataireByDepartementId(idDep: string): Observable<Prestataire[]> {
  // @FIXME: get request
  return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_PRESTATAIRE)}/departementList/${idDep}`).pipe(
      map((response: Prestataire[]) => response),
      catchError(this.handleError())
  );
}

getPrestataireByQuartierId(idQt: string): Observable<Prestataire[]> {
  // @FIXME: get request
  return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_PRESTATAIRE)}/quartierList/${idQt}`).pipe(
      map((response: Prestataire[]) => response),
      catchError(this.handleError())
  );
}

getPrestataireByQuartierIdType(idQt: string, typeId: string): Observable<Prestataire[]> {
  // @FIXME: get request
  return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_PRESTATAIRE)}/quartierList/${idQt}/${typeId}`).pipe(
      map((response: Prestataire[]) => response),
      catchError(this.handleError())
  );
}
private handleError<T>() {
    return (error: HttpErrorResponse) => {
      return throwError(error.message || 'Something went wrong');
    };
  }
}

