import { from } from "rxjs";
import {Territorialite, TerritorialiteList} from "./model";
import { HttpClient, HttpEvent, HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {GlobalConfig} from '../../../config/global.config';
import {Endpoints} from '../../../config/module.endpoints';

@Injectable({providedIn: 'root'})
export class TerritorialiteService {
constructor(private http: HttpClient) {}

$getTerritorialites(): Observable<TerritorialiteList> {
    // @FIXME: get request
    return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_TYPE_TERRITORIALITE)}`).pipe(
      map((response: TerritorialiteList) => response),
      catchError(this.handleError())
    );
  }

posTerritorialite(Territorialite: Territorialite): Observable<any> {
    // @FIXME: post request
    return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_TYPE_TERRITORIALITE)}`, Territorialite);
  }

updateTerritorialite(Territorialite: Territorialite): Observable<any> {
    // @FIXME: post request
    return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_TYPE_TERRITORIALITE)}/${Territorialite.id}`, Territorialite);
  }

deleteTerritorialite(Territorialite: Territorialite): Observable<any> {
    // @FIXME: post request
    return this.http.patch(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_TYPE_TERRITORIALITE)}/${Territorialite.id}`, null);
}



pushFileToStorage(file: File): Observable<any> {
  const data: FormData = new FormData();
  data.append('file', file);
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'multipart/form-data');
  headers.set('Accept', 'application/json');
  return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_TYPE_TERRITORIALITE)}/upload`, data, { headers: headers });
}

private handleError<T>() {
    return (error: HttpErrorResponse) => {
      return throwError(error.message || 'Something went wrong');
    };
  }
}

