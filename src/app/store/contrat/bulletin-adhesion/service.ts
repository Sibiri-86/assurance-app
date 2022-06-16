import { from } from 'rxjs';
import { HttpClient, HttpEvent, HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {GlobalConfig} from '../../../config/global.config';
import {Endpoints} from '../../../config/module.endpoints';
import { EndpointsMedical } from 'src/app/config/module.medical.endpoints';
import { BulletinAdhesion, BulletinAdhesionList } from './model';

@Injectable({providedIn: 'root'})
export class BulletinAdhesionService {
constructor(private http: HttpClient) {}

$getBulletin(): Observable<BulletinAdhesionList> {
    // @FIXME: get request
    return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.BULLETINADHESION)}`).pipe(
      map((response: BulletinAdhesionList) => response),
      catchError(this.handleError())
    );
  }

posBulletin(bulletin: BulletinAdhesion): Observable<any> {
    // @FIXME: post request
    return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.BULLETINADHESION)}`, bulletin);
  }

posvalideBulletin(bulletin: BulletinAdhesion): Observable<any> {
    // @FIXME: post request
    return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.BULLETINADHESION)}/valide`, bulletin);
  }

posInvalideBulletin(bulletin: BulletinAdhesion): Observable<any> {
    // @FIXME: post request
    return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.BULLETINADHESION)}/invalide`, bulletin);
  }

updateBulletin(bulletin: BulletinAdhesion): Observable<any> {
    // @FIXME: post request
    return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.BULLETINADHESION)}`, bulletin);
  }

deleteBulletin(bulletin: BulletinAdhesion): Observable<any> {
    // @FIXME: post request
    return this.http.patch(`${GlobalConfig.getEndpoint(Endpoints.BULLETINADHESION)}/${bulletin.id}`, null);
}

deleteBulletins(bulletins: BulletinAdhesionList): Observable<any> {
  // @FIXME: post request
  return this.http.patch(`${GlobalConfig.getEndpoint(Endpoints.BULLETINADHESION)}/deletAll`, bulletins);
}


/* 
$getReport(report: Report): Observable<ArrayBuffer> {
    // @FIXME: get request
    return this.http.post( `${GlobalConfig.getEndpoint(EndpointsMedical.BONPRISEENCHARGE)}/report`,
     report, {responseType: 'arraybuffer'});
}
 */
private handleError<T>() {
    return (error: HttpErrorResponse) => {
      return throwError(error.message || 'Something went wrong');
    };
  }
}

