import { from } from "rxjs";
import {TypeJournaux, TypeJournauxList} from "./model";
import { HttpClient, HttpEvent, HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {GlobalConfig} from '../../../config/global.config';
import {Endpoints} from '../../../config/module.endpoints';


@Injectable({providedIn: 'root'})
export class TypeJournauxService {
constructor(private http: HttpClient) {}

$getTypeJournaux(): Observable<TypeJournauxList> {
    // @FIXME: get request
    return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_TYPE_JOURNAUX)}`).pipe(
      map((response: TypeJournauxList) => response),
      catchError(this.handleError())
    );
  }

 

posTypeJournaux(typeJournaux: TypeJournaux): Observable<any> {
    // @FIXME: post request
    console.log(typeJournaux);
    console.log("====================");
    return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_TYPE_JOURNAUX)}`, typeJournaux);
  }

updateTypeJournaux(typeJournaux: TypeJournaux): Observable<any> {
    // @FIXME: post request
    return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_TYPE_JOURNAUX)}/${typeJournaux.id}`, typeJournaux);
  }

deleteTypeJournaux(typeJournaux: TypeJournaux): Observable<any> {
    // @FIXME: post request
    return this.http.patch(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_TYPE_JOURNAUX)}/${typeJournaux.id}`, null);
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
  return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_TYPE_JOURNAUX)}/upload`, data, { headers: headers });
}

private handleError<T>() {
    return (error: HttpErrorResponse) => {
      return throwError(error.message || 'Something went wrong');
    };
  }
}

