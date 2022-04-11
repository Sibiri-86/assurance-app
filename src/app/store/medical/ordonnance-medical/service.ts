import { from } from 'rxjs';
import { HttpClient, HttpEvent, HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {GlobalConfig} from '../../../config/global.config';
import {Endpoints} from '../../../config/module.endpoints';
import { EndpointsMedical } from 'src/app/config/module.medical.endpoints';
import { OrdonnanceMedical, OrdonnanceMedicalProduitPharmaceutique, OrdonnanceMedicalProduitPharmaceutiqueList, Report } from './model';

@Injectable({providedIn: 'root'})
export class OrdonnanceMedicaleService {
constructor(private http: HttpClient) {}

postOrdonnanceMedicale(ordonnace: OrdonnanceMedical): Observable<any> {
    // @FIXME: post request
    return this.http.post(`${GlobalConfig.getEndpoint(EndpointsMedical.ORDONNANCE_MEDICALE_CREATED)}`, ordonnace);
  }

  $getOrdonnanceMedicale(): Observable<OrdonnanceMedicalProduitPharmaceutiqueList> {
    // @FIXME: get request
    return this.http.get( `${GlobalConfig.getEndpoint(EndpointsMedical.ORDONNANCE_MEDICALE_LOAD)}`).pipe(
      map((response: OrdonnanceMedicalProduitPharmaceutiqueList) => response),
      catchError(this.handleError())
    );
  }

  $getReportOrdonnance(report: Report): Observable<ArrayBuffer> {
    // @FIXME: get request
    return this.http.post( `${GlobalConfig.getEndpoint(EndpointsMedical.ORDONNANCE_MEDICALE_REPORT)}`,
     report, {responseType: 'arraybuffer'});
}

updateOrdonnanceMedicale(ordonnance: OrdonnanceMedical): Observable<any> {
  // @FIXME: post request
  return this.http.put(`${GlobalConfig.getEndpoint(EndpointsMedical.ORDONNANCE_MEDICALE_UPDATE)}`, ordonnance);
}

deleteOrdonnanceMedicale(ordonnace: Array<OrdonnanceMedical>): Observable<any> {
  // @FIXME: post request
  return this.http.patch(`${GlobalConfig.getEndpoint(EndpointsMedical.ORDONNANCE_MEDICALE_DELETE)}`, ordonnace);
}

deleteOrdonnanceMedicaleProduit(ordonnace: OrdonnanceMedical): Observable<any> {
  // @FIXME: post request
  return this.http.patch(`${GlobalConfig.getEndpoint(EndpointsMedical.ORDONNANCE_MEDICALE_DELETE_ORDONNANCE_PRODUIT)}`, ordonnace);
}


private handleError<T>() {
    return (error: HttpErrorResponse) => {
      return throwError(error.message || 'Something went wrong');
    };
  }
}

