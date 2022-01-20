import { from } from "rxjs";
import {Adherent, AdherentList} from "./model";
import { HttpClient, HttpEvent, HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {GlobalConfig} from '../../../config/global.config';
import { AdherentFamille } from "./model";
import {Endpoints} from '../../../config/module.endpoints';

@Injectable({providedIn: 'root'})
export class AdherentService {
constructor(private http: HttpClient) {}

$getAdherents(idPolice: string): Observable<AdherentList> {
    // @FIXME: get request
    return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.CONTRAT_ADHERENT)}/${idPolice}`).pipe(
      map((response: AdherentList) => response),
      catchError(this.handleError())
    );
}

posAdherent(Adherent: Adherent): Observable<any> {
    // @FIXME: post request
    return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_ADHERENT)}`, Adherent);
  }

  posAdherentWithFamille(adherentFamille: AdherentFamille): Observable<any> {
    // @FIXME: post request
    return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_ADHERENT_WITH_FAMILLE)}`, adherentFamille);
  }

  
  pushPhotosAdherent(file: File, idAdherent: string): Observable<any> {
    const data: FormData = new FormData();
    data.append('file', file);
    data.append('idAdherent', idAdherent);
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.set('Accept', 'application/json');
    return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_ADHERENT)}/upload`, data, { headers: headers });
  }
  
  
  pushPhotosAdherentLot(filesList: File[]): Observable<any> {
    const data: FormData = new FormData();
    for (let i = 0; i < filesList.length; i++) {
      data.append('fileArray', filesList[i], filesList[i].name);
    }
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.set('Accept', 'application/json');
    return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_ADHERENT)}/upload/lot`, data, { headers: headers });
  }
  
updateAdherent(Adherent: Adherent): Observable<any> {
    // @FIXME: post request
    return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_ADHERENT)}/${Adherent.id}`, Adherent);
  }
  
  searchAdherent(numero: number): Observable<Adherent> {
    // @FIXME: post request
    if(numero && numero!=0){
    return this.http.get(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_ADHERENT)}/getByNumero/${numero}`).pipe(
      map((response: Adherent) => response),
      catchError(this.handleError())
     );
    }
  }

deleteAdherent(Adherent: Adherent): Observable<any> {
    // @FIXME: post request
    return this.http.patch(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_ADHERENT)}/${Adherent.id}`, Adherent);
}

deleteAdherents(adherent: Array<Adherent>): Observable<any> {
    // @FIXME: post request
    return this.http.patch(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_ADHERENT)}`, adherent);
}
    getAdherentsByPolice(idPolice: string): Observable<Adherent[]> {
        // @FIXME: get request
        return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.CONTRAT_ADHERENT_POLICE)}/${idPolice}`).pipe(
            map((response: Adherent[]) => response),
            catchError(this.handleError())
        );
    }

    findAdherantActuallList(idPolice: string): Observable<Adherent[]> {
        // @FIXME: get request
        return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.CONTRAT_ADHERENT_POLICE_ACTUALL)}/${idPolice}`).pipe(
            map((response: Adherent[]) => response),
            catchError(this.handleError())
        );
    }

    loadAdherentsByPolice(idPolice: string): Observable<Adherent[]> {
        // @FIXME: get request
        return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.CONTRAT_ADHERENT_POLICE)}/${idPolice}`).pipe(
            map((response: Adherent[]) => response),
            catchError(this.handleError())
        );
    }



pushFileToStorage(file: File): Observable<any> {
  const data: FormData = new FormData();
  data.append('file', file);
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'multipart/form-data');
  headers.set('Accept', 'application/json');
  return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_ADHERENT)}/upload`, data, { headers: headers });
}

private handleError<T>() {
    return (error: HttpErrorResponse) => {
      return throwError(error.message || 'Something went wrong');
    };
  }

    getAdherentPrincipauxByGroupe(idGpe: string): Observable<Adherent[]> {
        // @FIXME: get request
        return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.CONTRAT_ADHERENT_PRINCIPAL_GROUPE)}/${idGpe}`).pipe(
            map((response: Adherent[]) => response),
            catchError(this.handleError())
        );
    }

}

