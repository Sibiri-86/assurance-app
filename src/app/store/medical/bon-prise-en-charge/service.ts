import { from } from 'rxjs';
import {BonPriseEnCharge, BonPriseEnChargeList, Report} from './model';
import { HttpClient, HttpEvent, HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {GlobalConfig} from '../../../config/global.config';
import {Endpoints} from '../../../config/module.endpoints';
import { EndpointsMedical } from 'src/app/config/module.medical.endpoints';

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

posBons(bon: BonPriseEnCharge): Observable<any> {
    // @FIXME: post request
    return this.http.post(`${GlobalConfig.getEndpoint(EndpointsMedical.BONPRISEENCHARGE)}`, bon);
  }

updateBons(bon: BonPriseEnCharge): Observable<any> {
    // @FIXME: post request
    return this.http.put(`${GlobalConfig.getEndpoint(EndpointsMedical.BONPRISEENCHARGE)}/${bon.id}`, bon);
  }

deleteBons(bon: BonPriseEnCharge): Observable<any> {
    // @FIXME: post request
    return this.http.patch(`${GlobalConfig.getEndpoint(EndpointsMedical.BONPRISEENCHARGE)}/${bon.id}`, null);
}

$getReport(report: Report): Observable<ArrayBuffer> {
    // @FIXME: get request
    return this.http.post( `${GlobalConfig.getEndpoint(EndpointsMedical.BONPRISEENCHARGE)}/report`,
     report, {responseType: 'arraybuffer'});
}

private handleError<T>() {
    return (error: HttpErrorResponse) => {
      return throwError(error.message || 'Something went wrong');
    };
  }
}

