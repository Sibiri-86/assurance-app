import { from } from "rxjs";
import {NaturePrestataire, NaturePrestataireList} from "./model";
import { HttpClient, HttpEvent, HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {GlobalConfig} from '../../../config/global.config';
import {Endpoints} from '../../../config/module.endpoints';

@Injectable({providedIn: 'root'})
export class NaturePrestataireService {
constructor(private http: HttpClient) {}

$getNaturePrestataires(): Observable<NaturePrestataireList> {
    // @FIXME: get request
    return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_NATURE_PRESTATAIRE)}`).pipe(
      map((response: NaturePrestataireList) => response),
      catchError(this.handleError())
    );
  }

posNaturePrestataire(NaturePrestataire: NaturePrestataire): Observable<any> {
    // @FIXME: post request
    return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_NATURE_PRESTATAIRE)}`, NaturePrestataire);
  }

updateNaturePrestataire(NaturePrestataire: NaturePrestataire): Observable<any> {
    // @FIXME: post request
    return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_NATURE_PRESTATAIRE)}/${NaturePrestataire.id}`, NaturePrestataire);
  }

deleteNaturePrestataire(NaturePrestataire: NaturePrestataire): Observable<any> {
    // @FIXME: post request
    return this.http.patch(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_NATURE_PRESTATAIRE)}/${NaturePrestataire.id}`, null);
}



pushFileToStorage(file: File): Observable<any> {
  const data: FormData = new FormData();
  data.append('file', file);
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'multipart/form-data');
  headers.set('Accept', 'application/json');
  return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_NATURE_PRESTATAIRE)}/upload`, data, { headers: headers });
}

private handleError<T>() {
    return (error: HttpErrorResponse) => {
      return throwError(error.message || 'Something went wrong');
    };
  }
}

