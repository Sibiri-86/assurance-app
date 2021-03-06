import { from } from "rxjs";
import {Groupe, GroupeList} from "./model";
import { HttpClient, HttpEvent, HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {GlobalConfig} from '../../../config/global.config';
import {Endpoints} from '../../../config/module.endpoints';

@Injectable({providedIn: 'root'})
export class GroupeService {
constructor(private http: HttpClient) {}

$getGroupes(idPolice: string): Observable<GroupeList> {
    // @FIXME: get request
    return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.CONTRAT_GROUPE)}/${idPolice}`).pipe(
      map((response: GroupeList) => response),
      catchError(this.handleError())
    );
}

posGroupe(Groupe: Groupe): Observable<any> {
    // @FIXME: post request
    return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_GROUPE)}`, Groupe);
  }

updateGroupe(Groupe: Groupe): Observable<any> {
    // @FIXME: post request
    return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_GROUPE)}`, Groupe);
  }

  updateCurentGroupe(groupe: Groupe, newGroupe: Groupe): Observable<any> {
    // @FIXME: post request
    return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_GROUPE_UPDATE)}/${groupe.id}}`, newGroupe);
  }

deleteGroupe(Groupe: Groupe): Observable<any> {
    // @FIXME: post request
    return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_GROUPE)}/delete`, Groupe);
}

deleteGroupes(groupe: Array<Groupe>): Observable<any> {
    // @FIXME: post request
    return this.http.patch(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_GROUPE)}/deletes`, groupe);
}

rapportGroupe(groupe: Groupe): Observable<any> {
  // @FIXME: post request
  return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_GROUPE)}/rapport`, groupe);
}


pushFileToStorage(file: File): Observable<any> {
  const data: FormData = new FormData();
  data.append('file', file);
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'multipart/form-data');
  headers.set('Accept', 'application/json');
  return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_GROUPE)}/upload`, data, { headers: headers });
}

private handleError<T>() {
    return (error: HttpErrorResponse) => {
      return throwError(error.message || 'Something went wrong');
    };
  }
}

