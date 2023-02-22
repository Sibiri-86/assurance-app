import { from } from "rxjs";
import { HttpClient, HttpEvent, HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {GlobalConfig} from '../../../config/global.config';
import {Endpoints} from '../../../config/module.endpoints';
import { Quartier, QuartierList } from "./model";

@Injectable({providedIn: 'root'})
export class QuartierService {
constructor(private http: HttpClient) {}

$getQuartier(): Observable<QuartierList> {
    // @FIXME: get request
    return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_QUARTIER)}`).pipe(
      map((response: QuartierList) => response),
      catchError(this.handleError())
    );
  }

 
 
posQuartier(quartier: Quartier): Observable<any> {
    // @FIXME: post request
    return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_QUARTIER)}`, quartier);
  }

updateQuartier(quartier: Quartier): Observable<any> {
    // @FIXME: post request
    return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_QUARTIER)}/${quartier.id}`, quartier);
  }

deleteQuartier(quartier: Quartier): Observable<any> {
    // @FIXME: post request
    return this.http.patch(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_QUARTIER)}/${quartier.id}`, null);
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
  return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_QUARTIER)}/upload`, data, { headers: headers });
}

private handleError<T>() {
    return (error: HttpErrorResponse) => {
      return throwError(error.message || 'Something went wrong');
    };
  }
}

