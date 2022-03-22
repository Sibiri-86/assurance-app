import { from } from 'rxjs';
import { HttpClient, HttpEvent, HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {GlobalConfig} from '../../../config/global.config';
import {Endpoints} from '../../../config/module.endpoints';
import { EndpointsMedical } from 'src/app/config/module.medical.endpoints';
import { OrdonnanceMedical, OrdonnanceMedicalProduitPharmaceutique } from './model';

@Injectable({providedIn: 'root'})
export class OrdonnanceMedicaleService {
constructor(private http: HttpClient) {}

postOrdonnanceMedicale(ordonnace: OrdonnanceMedical): Observable<any> {
    // @FIXME: post request
    return this.http.post(`${GlobalConfig.getEndpoint(EndpointsMedical.ORDONNANCE_MEDICALE_CREATED)}`, ordonnace);
  }

private handleError<T>() {
    return (error: HttpErrorResponse) => {
      return throwError(error.message || 'Something went wrong');
    };
  }
}

