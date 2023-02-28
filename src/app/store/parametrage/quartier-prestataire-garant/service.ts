import { from } from "rxjs";
import { HttpClient, HttpEvent, HttpRequest, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {GlobalConfig} from '../../../config/global.config';
import {Endpoints} from '../../../config/module.endpoints';
import { QuartierPrestataireGarant, QuartierPrestataireGarantList } from "./model";

@Injectable({providedIn: 'root'})
export class QuartierPrestataireGarantService {
constructor(private http: HttpClient) {}

$getQuartierPrestataire(quartierId: string, garantId: string): Observable<QuartierPrestataireGarantList> {
    // @FIXME: get request
    return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_QUARTIER_PRESTATAIRE)}`,{params :
      this.createRequestOption({quartierId, garantId})} ).pipe(
      map((response: QuartierPrestataireGarantList) => response),
      catchError(this.handleError())
    );
  }
  
 
 
posQuartierPrestataire(prestataireGarant: QuartierPrestataireGarant): Observable<any> {
    // @FIXME: post request
    return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_QUARTIER_PRESTATAIRE)}`, prestataireGarant);
  }

updateQuartierPrestataire(prestataireGarant: QuartierPrestataireGarant): Observable<any> {
    // @FIXME: post request
    return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_QUARTIER_PRESTATAIRE)}/${prestataireGarant.id}`, prestataireGarant);
  }

deleteQuartierPrestataire(prestataireGarant: QuartierPrestataireGarant): Observable<any> {
    // @FIXME: post request
    return this.http.patch(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_QUARTIER_PRESTATAIRE)}/${prestataireGarant.id}`, null);
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
private createRequestOption = (req?: any): HttpParams => {
  let options: HttpParams = new HttpParams();
  if (req) {
      Object.keys(req).forEach(key => {
          if (key !== 'sort' && key !== 'type' &&
              req[key] !== null && req[key] !== undefined) {
              options = options.set(key, req[key]);
          }
      });
      if (req.sort) {
          req.sort.forEach(val => {
              options = options.append('sort', val);
          });
      }
  }
  return options;
}
private handleError<T>() {
    return (error: HttpErrorResponse) => {
      return throwError(error.message || 'Something went wrong');
    };
  }
}

