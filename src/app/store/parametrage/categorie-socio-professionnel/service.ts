import { from } from "rxjs";
import {CategorieSocioProfessionnel, CategorieSocioProfessionnelList} from "./model";
import { HttpClient, HttpEvent, HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {GlobalConfig} from '../../../config/global.config';
import {Endpoints} from '../../../config/module.endpoints';

@Injectable({providedIn: 'root'})
export class CategorieSocioProfessionnelService {
constructor(private http: HttpClient) {}

$getCategorieSocioProfessionnels(): Observable<CategorieSocioProfessionnelList> {
    // @FIXME: get request
    return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_TYPE_CATEGORIE_SOCIO_PROFESSIONNEL)}`).pipe(
      map((response: CategorieSocioProfessionnelList) => response),
      catchError(this.handleError())
    );
  }

posCategorieSocioProfessionnel(CategorieSocioProfessionnel: CategorieSocioProfessionnel): Observable<any> {
    // @FIXME: post request
    return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_TYPE_CATEGORIE_SOCIO_PROFESSIONNEL)}`, CategorieSocioProfessionnel);
  }

updateCategorieSocioProfessionnel(CategorieSocioProfessionnel: CategorieSocioProfessionnel): Observable<any> {
    // @FIXME: post request
    return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_TYPE_CATEGORIE_SOCIO_PROFESSIONNEL)}/${CategorieSocioProfessionnel.id}`, CategorieSocioProfessionnel);
  }

deleteCategorieSocioProfessionnel(CategorieSocioProfessionnel: CategorieSocioProfessionnel): Observable<any> {
    // @FIXME: post request
    return this.http.patch(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_TYPE_CATEGORIE_SOCIO_PROFESSIONNEL)}/${CategorieSocioProfessionnel.id}`, null);
}



pushFileToStorage(file: File): Observable<any> {
  const data: FormData = new FormData();
  data.append('file', file);
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'multipart/form-data');
  headers.set('Accept', 'application/json');
  return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_TYPE_CATEGORIE_SOCIO_PROFESSIONNEL)}/upload`, data, { headers: headers });
}

private handleError<T>() {
    return (error: HttpErrorResponse) => {
      return throwError(error.message || 'Something went wrong');
    };
  }
}

