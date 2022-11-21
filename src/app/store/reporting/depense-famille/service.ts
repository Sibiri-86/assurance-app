import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {GlobalConfig} from '../../../config/global.config';
import {Endpoints} from '../../../config/module.endpoints';
import { TypeEtatSinistre } from 'src/app/module/common/models/enum.etat.sinistre';
import { TypeEtatOrdreReglement } from 'src/app/module/common/models/emum.etat.ordre-reglement';
import { Report } from '../../contrat/police/model';
import { Check, DepenseFamilleList } from './model';
import { DepartementList } from '../../parametrage/departement/model';

@Injectable({providedIn: 'root'})
export class DepenseFamilleService {
constructor(private http: HttpClient) {

}

 findDepenseFamille(check: Check): Observable<DepenseFamilleList> {
        // @FIXME: post request
        return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.REPORTING_PRODUCTION)}`, check).pipe(
            map((response: DepenseFamilleList) => response),
            catchError(this.handleError()));
    }

    findDepenseFamilleActe(check: Check): Observable<DepenseFamilleList> {
        // @FIXME: post request
        return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.REPORTING_PRODUCTION)}/depense-famille`, check).pipe(
            map((response: DepenseFamilleList) => response),
            catchError(this.handleError()));
    }

    $getReport(report: Report): Observable<ArrayBuffer> {
        // @FIXME: get request
        return this.http.post( `${GlobalConfig.getEndpoint(Endpoints.REPORTING_PRODUCTION)}/depense-famille/report`,
            report, {responseType: 'arraybuffer'});
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

private handleError<T>() {
    return (error: HttpErrorResponse) => {
        return throwError(error.message || 'Something went wrong');
    };
}



}
