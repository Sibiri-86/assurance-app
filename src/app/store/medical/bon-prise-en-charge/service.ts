import { from } from 'rxjs';
import {BonPriseEnCharge, BonPriseEnChargeList, Report} from './model';
import { HttpClient, HttpEvent, HttpRequest, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {GlobalConfig} from '../../../config/global.config';
import {Endpoints} from '../../../config/module.endpoints';
import { EndpointsMedical } from 'src/app/config/module.medical.endpoints';
import { Prestation } from '../../prestation/prefinancement/model';

@Injectable({providedIn: 'root'})
export class BonPriseEnChargeService {
constructor(private http: HttpClient) {}

$getBons(): Observable<BonPriseEnChargeList> {
    // @FIXME: get request
    return this.http.get( `${GlobalConfig.getEndpoint(EndpointsMedical.BONPRISEENCHARGE)}`).pipe(
      map((response: BonPriseEnChargeList) => response),
      catchError(this.handleError())
    );
  }

  $getBonsSansPrestation(): Observable<BonPriseEnChargeList> {
    // @FIXME: get request
    return this.http.get( `${GlobalConfig.getEndpoint(EndpointsMedical.BONPRISEENCHARGE)}/no-prestation`).pipe(
      map((response: BonPriseEnChargeList) => response),
      catchError(this.handleError())
    );
  }

  $getBonsSansPrestationByAdherent(adherentId: string): Observable<BonPriseEnChargeList> {
    // @FIXME: get request
    return this.http.get( `${GlobalConfig.getEndpoint(EndpointsMedical.BONPRISEENCHARGE)}/no-prestation-byadherent/${adherentId}`).pipe(
      map((response: BonPriseEnChargeList) => response),
      catchError(this.handleError())
    );
  }

posBons(bon: BonPriseEnCharge): Observable<any> {
    // @FIXME: post request
    return this.http.post(`${GlobalConfig.getEndpoint(EndpointsMedical.BONPRISEENCHARGE)}`, bon);
  }

posvalideBons(bon: BonPriseEnCharge): Observable<any> {
    // @FIXME: post request
    return this.http.post(`${GlobalConfig.getEndpoint(EndpointsMedical.BONPRISEENCHARGE)}/valide`, bon);
  }

posInvalideBons(bon: BonPriseEnCharge): Observable<any> {
    // @FIXME: post request
    return this.http.post(`${GlobalConfig.getEndpoint(EndpointsMedical.BONPRISEENCHARGE)}/invalide`, bon);
  }

updateBons(bon: BonPriseEnCharge): Observable<any> {
    // @FIXME: post request
    return this.http.put(`${GlobalConfig.getEndpoint(EndpointsMedical.BONPRISEENCHARGE)}/${bon.id}`, bon);
  }

deleteBons(bon: BonPriseEnCharge): Observable<any> {
    // @FIXME: post request
    return this.http.patch(`${GlobalConfig.getEndpoint(EndpointsMedical.BONPRISEENCHARGE)}`, bon);
}

$getReport(report: Report): Observable<ArrayBuffer> {
    // @FIXME: get request
    return this.http.post( `${GlobalConfig.getEndpoint(EndpointsMedical.BONPRISEENCHARGE)}/report`,
     report, {responseType: 'arraybuffer'});
}

$getBonsByPeriode(dateD: string, dateF: string): Observable<BonPriseEnChargeList> {
  // @FIXME: get request
  return this.http.get( `${GlobalConfig.getEndpoint(EndpointsMedical.BONPRISEENCHARGE)}/by_periode` ,{params :
    this.createRequestOption({dateD, dateF})}).pipe(
    map((response: BonPriseEnChargeList) => response),
    catchError(this.handleError())
  );
}

getPrestationByBonDePriseEnCharge(idBon: string): Observable<Prestation[]> {
  // @FIXME: post request
  return this.http.get( `${GlobalConfig.getEndpoint(EndpointsMedical.BONPRISEENCHARGE)}/prestationBy-bonPriseEnCharge-Id/${idBon}`).pipe(
      map((response: Prestation[]) => response),
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

