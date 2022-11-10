import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable} from 'rxjs';
import { GlobalConfig } from 'src/app/config/global.config';
import { Endpoints } from 'src/app/config/module.endpoints';
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

private handleError<T>() {
    return (error: HttpErrorResponse) => {
        return throwError(error.message || 'Something went wrong');
    };
}



}
