import { from } from "rxjs";
import { HttpClient, HttpEvent, HttpRequest, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {GlobalConfig} from '../../../config/global.config';
import {Endpoints} from '../../../config/module.endpoints';
import { Alerte, AlerteAdresseMail, AlerteList } from "./model";

@Injectable({providedIn: 'root'})
export class AlerteService {
constructor(private http: HttpClient) {}

$getBanques(): Observable<AlerteList> {
    // @FIXME: get request
    return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_ALERTE)}`).pipe(
      map((response: AlerteList) => response),
      catchError(this.handleError())
    );
  }

posBanque(Alerte: Alerte): Observable<any> {
    // @FIXME: post request
    return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_ALERTE)}`, Alerte);
  }

updateBanque(Alerte: Alerte): Observable<any> {
    // @FIXME: post request
    return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_ALERTE)}/${Alerte.id}`, Alerte);
  }

deleteBanque(Alerte: Alerte): Observable<any> {
    // @FIXME: post request
    return this.http.patch(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_ALERTE)}/${Alerte.id}`, null);
}

getAlertesByDate():  Observable<Alerte[]> {
            // @FIXME: get request
            /* const formattedDateDebut = new Date(dateDebut).toISOString().split('T')[0]; // Convertit en YYYY-MM-DD
            const formattedDateFin = new Date(dateFin).toISOString().split('T')[0];
      
            const params = new HttpParams()
              .set('dateDebut', formattedDateDebut)
              .set('dateFin', formattedDateFin) */
            return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_ALERTE_BY_DATE)}`).pipe(
              map((response: Alerte[]) => response),
              catchError(this.handleError())
            );
            
      }



pushFileToStorage(file: File): Observable<any> {
  const data: FormData = new FormData();
  data.append('file', file);
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'multipart/form-data');
  headers.set('Accept', 'application/json');
  return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_ALERTE)}/upload`, data, { headers: headers });
}

createAlerteAdresseMail(alerteAdresseMail: AlerteAdresseMail): Observable<any> {
  // @FIXME: post request
  return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_ALERTE_ADRESSE_MAIL)}`, alerteAdresseMail);
}


fetchAlerteAdresseMail():  Observable<AlerteAdresseMail[]> {
  // @FIXME: get request
  return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_FETCH_ALERTE_ADRESSE_MAIL)}`).pipe(
    map((response: AlerteAdresseMail[]) => response),
    catchError(this.handleError())
  );
  
}

fetchMailListeByAdresseMail(mail:string):  Observable<AlerteAdresseMail[]> {
  // @FIXME: get request
  return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_FETCH_MAIL_LISTE_BY_ADRESSE_MAIL)}`,{params :
      this.createRequestOption({mail})}).pipe(
        map((response: AlerteAdresseMail[]) => response),
        catchError(this.handleError())
    );
  
}

private handleError<T>() {
    return (error: HttpErrorResponse) => {
      return throwError(error.message || 'Something went wrong');
    };
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
}

