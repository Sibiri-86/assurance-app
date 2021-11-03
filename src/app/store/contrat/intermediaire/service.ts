import { from } from "rxjs";
import {Intermediaire, IntermediaireList} from "./model";
import { HttpClient, HttpEvent, HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {GlobalConfig} from '../../../config/global.config';
import {Endpoints} from '../../../config/module.endpoints';

@Injectable({providedIn: 'root'})
export class IntermediaireService {
constructor(private http: HttpClient) {}

$getIntermediaires(): Observable<IntermediaireList> {
    // @FIXME: get request
    return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_INTERMEDIAIRE)}`).pipe(
      map((response: IntermediaireList) => response),
      catchError(this.handleError())
    );
  }

posIntermediaire(Intermediaire: Intermediaire): Observable<any> {
    // @FIXME: post request
    return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_INTERMEDIAIRE)}`, Intermediaire);
  }

updateIntermediaire(Intermediaire: Intermediaire): Observable<any> {
    // @FIXME: post request
    return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_INTERMEDIAIRE)}/${Intermediaire.id}`, Intermediaire);
  }

deleteIntermediaire(Intermediaire: Intermediaire): Observable<any> {
    // @FIXME: post request
    return this.http.patch(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_INTERMEDIAIRE)}/${Intermediaire.id}`, null);
}

deleteIntermediaires(intermediaire: Array<Intermediaire>): Observable<any> {
    // @FIXME: post request
    return this.http.patch(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_INTERMEDIAIRE)}`, intermediaire);
}

pushFileToStorage(file: File): Observable<any> {
  const data: FormData = new FormData();
  data.append('file', file);
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'multipart/form-data');
  headers.set('Accept', 'application/json');
  return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_INTERMEDIAIRE)}/upload`, data, { headers: headers });
}

private handleError<T>() {
    return (error: HttpErrorResponse) => {
      return throwError(error.message || 'Something went wrong');
    };
  }
}

