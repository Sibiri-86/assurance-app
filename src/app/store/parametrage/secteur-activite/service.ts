import { from } from "rxjs";
import {SecteurActivite, SecteurActiviteList} from "./model";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {GlobalConfig} from '../../../config/global.config';
import {Endpoints} from '../../../config/module.endpoints';

@Injectable({providedIn: 'root'})
export class SecteurActiviteService {
constructor(private http: HttpClient) {}

getSecteurActivites(): Observable<SecteurActiviteList> {
    // @FIXME: get request
    return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_SECTEUR_ACTIVITE)}`).pipe(
      map((response: SecteurActiviteList) => response),
      catchError(this.handleError())
    );
  }

postSecteurActivite(secteurActivite: SecteurActivite): Observable<any> {
    // @FIXME: post request
    return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_SECTEUR_ACTIVITE)}`, secteurActivite);
  }

updateSecteurActivite(secteurActivite: SecteurActivite): Observable<any> {
    // @FIXME: post request
    return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_SECTEUR_ACTIVITE)}/${secteurActivite.id}`, secteurActivite);
  }

deleteSecteurActivite(secteurActivite: SecteurActivite): Observable<any> {
    // @FIXME: post request
    return this.http.patch(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_SECTEUR_ACTIVITE)}/${secteurActivite.id}`, null);
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
  return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_SECTEUR_ACTIVITE)}/upload`, data, { headers: headers });
}


private handleError<T>() {
    return (error: HttpErrorResponse) => {
      return throwError(error.message || 'Something went wrong');
    };
  }
}

