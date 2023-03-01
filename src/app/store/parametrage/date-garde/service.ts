import { from } from "rxjs";
import {DateGarde, DateGardeList} from "./model";
import { HttpClient, HttpEvent, HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {GlobalConfig} from '../../../config/global.config';
import {Endpoints} from '../../../config/module.endpoints';

@Injectable({providedIn: 'root'})
export class DateGardeService {
constructor(private http: HttpClient) {}

$getDateGardes(): Observable<DateGardeList> {
    // @FIXME: get request
    return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_DATE_GARDE)}`).pipe(
      map((response: DateGardeList) => response),
      catchError(this.handleError())
    );
  }

/* posProduitPharmaceutique(ProduitPharmaceutique: ProduitPharmaceutique): Observable<any> {
    // @FIXME: post request
    return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_TYPE_PRODUIT_PHARMACEUTIQUE)}`, ProduitPharmaceutique);
  }

updateDateGarde(DateGarde: DateGarde): Observable<any> {
    // @FIXME: post request
    return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_DATE_GARDE)}/${ProduitPharmaceutique.id}`, ProduitPharmaceutique);
  }

deleteProduitPharmaceutique(ProduitPharmaceutique: ProduitPharmaceutique): Observable<any> {
    // @FIXME: post request
    return this.http.patch(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_TYPE_PRODUIT_PHARMACEUTIQUE)}/${ProduitPharmaceutique.id}`, null);
} */



pushFileToStorage(file: File): Observable<any> {
  const data: FormData = new FormData();
  data.append('file', file);
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'multipart/form-data');
  headers.set('Accept', 'application/json');
  return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_DATE_GARDE)}/upload`, data, { headers: headers });
}

private handleError<T>() {
    return (error: HttpErrorResponse) => {
      return throwError(error.message || 'Something went wrong');
    };
  }
}

