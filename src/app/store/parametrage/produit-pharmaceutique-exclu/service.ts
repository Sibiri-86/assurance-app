import { from } from "rxjs";
import {ProduitPharmaceutiqueExclu, ProduitPharmaceutiqueExcluList} from "./model";
import { HttpClient, HttpEvent, HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {GlobalConfig} from '../../../config/global.config';
import {Endpoints} from '../../../config/module.endpoints';
import { PharmacieGarde } from "../pharmacie-garde/model";

@Injectable({providedIn: 'root'})
export class ProduitPharmaceutiqueExcluService {
constructor(private http: HttpClient) {}

$getProduitPharmaceutiquesExclu(): Observable<ProduitPharmaceutiqueExcluList> {
    // @FIXME: get request
    return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_TYPE_PRODUIT_PHARMACEUTIQUE_EXCLU)}`).pipe(
      map((response: ProduitPharmaceutiqueExcluList) => response),
      catchError(this.handleError())
    );
  }

posProduitPharmaceutiqueExclu(ProduitPharmaceutique: ProduitPharmaceutiqueExclu): Observable<any> {
    // @FIXME: post request
    return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_TYPE_PRODUIT_PHARMACEUTIQUE_EXCLU)}`, ProduitPharmaceutique);
  }

updateProduitPharmaceutiqueExclu(ProduitPharmaceutique: ProduitPharmaceutiqueExclu): Observable<any> {
    // @FIXME: post request
    return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_TYPE_PRODUIT_PHARMACEUTIQUE_EXCLU)}/${ProduitPharmaceutique.id}`, ProduitPharmaceutique);
  }

deleteProduitPharmaceutiqueExclu(ProduitPharmaceutique: ProduitPharmaceutiqueExclu): Observable<any> {
    // @FIXME: post request
    return this.http.patch(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_TYPE_PRODUIT_PHARMACEUTIQUE_EXCLU)}/${ProduitPharmaceutique.id}`, null);
}

/* $getProduitPharmaceutiquesExclu(): Observable<any[]> {
  // @FIXME: get request
  return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_TYPE_PRODUIT_PHARMACEUTIQUE_EXCLU)}/produit-exclu`).pipe(
    map((response: any[]) => response),
    catchError(this.handleError())
  );
} */

$getTodayPharmacieGarde(): Observable<Array<PharmacieGarde>> {
  // @FIXME: get request
  return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.PORTAIL)}/getTodayPharmacieGarde`).pipe(
    map((response: Array<PharmacieGarde>) => response),
    catchError(this.handleError())
  );
}



pushFileToStorage(file: File): Observable<any> {
  const data: FormData = new FormData();
  data.append('file', file);
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'multipart/form-data');
  headers.set('Accept', 'application/json');
  return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_TYPE_PRODUIT_PHARMACEUTIQUE_EXCLU)}/upload`, data, { headers: headers });
}

/* pushFileToStorageExclu(file: File): Observable<any> {
  const data: FormData = new FormData();
  data.append('file', file);
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'multipart/form-data');
  headers.set('Accept', 'application/json');
  return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_TYPE_PRODUIT_PHARMACEUTIQUE_EXCLU)}/exclu-upload`, data, { headers: headers });
} */

private handleError<T>() {
    return (error: HttpErrorResponse) => {
      return throwError(error.message || 'Something went wrong');
    };
  }
}

