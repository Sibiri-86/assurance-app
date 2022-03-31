import { from } from 'rxjs';
import { HttpClient, HttpEvent, HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
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
