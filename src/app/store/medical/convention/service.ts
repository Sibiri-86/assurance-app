import { from } from 'rxjs';
import { HttpClient, HttpEvent, HttpRequest, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {GlobalConfig} from '../../../config/global.config';
import {Endpoints} from '../../../config/module.endpoints';
import { EndpointsMedical } from 'src/app/config/module.medical.endpoints';
import { Convention, ConventionList } from './model';


@Injectable({providedIn: 'root'})
export class ConventionService {
constructor(private http: HttpClient) {}



$posConvention(convention: Convention): Observable<any> {
    // @FIXME: post request
    return this.http.post(`${GlobalConfig.getEndpoint(EndpointsMedical.CONVENTION)}`, convention);
  }

$putConvention(convention: Convention): Observable<any> {
    // @FIXME: post request
    return this.http.post(`${GlobalConfig.getEndpoint(EndpointsMedical.CONVENTION)}`, convention);
  }
$getConvention(): Observable<ConventionList> {
    // @FIXME: get request
    return this.http.get( `${GlobalConfig.getEndpoint(EndpointsMedical.CONVENTION)}`).pipe(
      map((response: ConventionList) => response),
      catchError(this.handleError())
    );
  }

  $getConventionPrestataire(code: string): Observable<ConventionList> {
    // @FIXME: get request
    return this.http.get( `${GlobalConfig.getEndpoint(EndpointsMedical.CONVENTION)}/prestataire`,{params :
      this.createRequestOption({code})}).pipe(
      map((response: ConventionList) => response),
      catchError(this.handleError())
    );
  }
  $findMontantConvention(sousActeId: string): Observable<any> {
    // @FIXME: get request
    return this.http.get(`${GlobalConfig.getEndpoint(EndpointsMedical.CONVENTION)}/find-montant`, {params :
      this.createRequestOption({sousActeId})});
   
  }

  pushPhotosConvention(file: File, idConvention: string): Observable<any> {
    const data: FormData = new FormData();
    data.append('file', file);
    data.append('idConvention', idConvention);
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.set('Accept', 'application/json');
    return this.http.post(`${GlobalConfig.getEndpoint(EndpointsMedical.CONVENTION)}/upload`, data, { headers });
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
  $deleteConvention(convention: Convention): Observable<any> {
    // @FIXME: post request
    return this.http.patch(`${GlobalConfig.getEndpoint(EndpointsMedical.CONVENTION)}`, convention);
  }

  private handleError<T>() {
    return (error: HttpErrorResponse) => {
      return throwError(error.message || 'Something went wrong');
    };
  }
}
