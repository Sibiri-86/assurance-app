import { from } from "rxjs";
import { HttpClient, HttpEvent, HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {GlobalConfig} from '../../../config/global.config';
import {Endpoints} from '../../../config/module.endpoints';
import {   Operation, OperationList} from "./model";


@Injectable({providedIn: 'root'})
export class OperationService {
constructor(private http: HttpClient) {}

$getOperation(): Observable<OperationList> {
    // @FIXME: get request
    return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.COMTABILITE_OPERATION)}`).pipe(
      map((response: OperationList) => response),
      catchError(this.handleError())
    );
  }

 
  posOperation(operation: Operation): Observable<any> {
    // @FIXME: post request
    return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.COMTABILITE_OPERATION)}`, operation);
  }

  posOperationList(operationList: Array<Operation>): Observable<any> {

    // @FIXME: post request
    return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.COMTABILITE_OPERATION)}/liste`, operationList);
  }

updateOperation(operation: Operation): Observable<any> {
    // @FIXME: post request
    return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.COMTABILITE_OPERATION)}/${operation.id}`, operation);
  }

deleteOperation(operation: Operation): Observable<any> {
    // @FIXME: post request
    return this.http.patch(`${GlobalConfig.getEndpoint(Endpoints.COMTABILITE_OPERATION)}/${operation.id}`, null);
}

$getOperationByExerciceOperation(exerciceOperationId: string): Observable<OperationList> {
  // @FIXME: get request
  return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.COMTABILITE_OPERATION)}/by-exercice-operation/${exerciceOperationId}`).pipe(
    map((response: OperationList) => response),
    catchError(this.handleError())
  );
}




private handleError<T>() {
    return (error: HttpErrorResponse) => {
      return throwError(error.message || 'Something went wrong');
    };
  }
}

