import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable} from 'rxjs';
import { GlobalConfig } from 'src/app/config/global.config';
import { Endpoints } from 'src/app/config/module.endpoints';
import { Report } from 'src/app/store/medical/ordonnance-medical/model';
import { Recapitulatif } from './model';

@Injectable({providedIn: 'root'})
export class RecapitulatifService {
constructor(private http: HttpClient) {

}

fetchRecap$(Recapitulatif: Recapitulatif): Observable<any> {
    // @FIXME: post request+
    console.log('========Recapitulatif=========>', Recapitulatif);
    return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.REPORTING_PRODUCTION)}/recapitulatif`, Recapitulatif);
}

$getReport(report: Report): Observable<ArrayBuffer> {
    // @FIXME: get request
    return this.http.post( `${GlobalConfig.getEndpoint(Endpoints.REPORTING_PRODUCTION)}/recapitulatif/report`,
        report, {responseType: 'arraybuffer'});
  }

private handleError<T>() {
    return (error: HttpErrorResponse) => {
        return throwError(error.message || 'Something went wrong');
    };
}



}
