import { from } from "rxjs";
import {Bareme, BaremeList, Plafond, PlafondConfig, PlafondList} from "./model";
import { HttpClient, HttpEvent, HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {GlobalConfig} from '../../../config/global.config';
import {Endpoints} from '../../../config/module.endpoints';
import { Groupe } from "../groupe/model";

@Injectable({providedIn: 'root'})
export class PlafondService {
constructor(private http: HttpClient) {}

$getPlafonds(): Observable<PlafondList> {
    // @FIXME: get request
    return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.CONTRAT_PLAFOND)}`).pipe(
      map((response: PlafondList) => response),
      catchError(this.handleError())
    );
  }

$getPlafondsByGroupe(groupe: Groupe): Observable<any> {
    // @FIXME: get plafond by groupe
    console.log(groupe);
    return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_PLAFOND)}/consulter`, groupe);
  }

posPlafond(Plafond: Plafond): Observable<any> {
    // @FIXME: post request
    return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_PLAFOND)}`, Plafond);
  }

updatePlafond(Plafond: Plafond): Observable<any> {
    // @FIXME: post request
    return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_PLAFOND)}/${Plafond.id}`, Plafond);
  }

deletePlafond(Plafond: Plafond): Observable<any> {
    // @FIXME: post request
    return this.http.patch(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_PLAFOND)}/${Plafond.id}`, null);
}

deletePlafonds(plafond: Array<Plafond>): Observable<any> {
    // @FIXME: post request
    return this.http.patch(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_PLAFOND)}`, plafond);
}

/**service pour le parametrage des baremes */
postBareme(bareme: Bareme): Observable<any> {
  // @FIXME: post request
  return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.BAREME)}`, bareme);
}

updateBareme(bareme: Bareme): Observable<any> {
  // @FIXME: post request
  return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.BAREME)}/${bareme.id}`, bareme);
}

deleteBareme(bareme: Bareme): Observable<any> {
  // @FIXME: post request
  return this.http.patch(`${GlobalConfig.getEndpoint(Endpoints.BAREME)}/${bareme.id}`, bareme);
}

$getBaremes(): Observable<BaremeList> {
  // @FIXME: get request
  return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.BAREME)}`).pipe(
    map((response: BaremeList) => response),
    catchError(this.handleError())
  );
}

$getBaremesConfig(typeBareme: string, taux: number): Observable<PlafondConfig> {
  // @FIXME: get request
  if(typeBareme && taux){
  return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.BAREME)}/config/${typeBareme}/${taux}`).pipe(
    map((response: PlafondConfig) => response),
    catchError(this.handleError())
  );
  }
}

pushFileToStorage(file: File): Observable<any> {
  const data: FormData = new FormData();
  data.append('file', file);
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'multipart/form-data');
  headers.set('Accept', 'application/json');
  return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_PLAFOND)}/upload`, data, { headers: headers });
}

private handleError<T>() {
    return (error: HttpErrorResponse) => {
      return throwError(error.message || 'Something went wrong');
    };
  }
}

