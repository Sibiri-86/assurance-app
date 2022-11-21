import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable} from 'rxjs';
import { GlobalConfig } from 'src/app/config/global.config';
import { Endpoints } from 'src/app/config/module.endpoints';
import { Report } from 'src/app/store/medical/ordonnance-medical/model';

@Injectable({providedIn: 'root'})
export class RepartitionDepenseStatutService {
constructor(private http: HttpClient) {

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
