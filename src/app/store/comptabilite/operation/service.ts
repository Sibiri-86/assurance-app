import { from } from "rxjs";
import { HttpClient, HttpEvent, HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {GlobalConfig} from '../../../config/global.config';
import {Endpoints} from '../../../config/module.endpoints';
import {   Operation, OperationLeutreeList, OperationList} from "./model";
import { Report } from '../../contrat/police/model';
import { OperationSoldeAnterieur } from "../exercice-comptable-operation/model";


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

  findOperationCaisseJournalier(operation: Operation): Observable<OperationList> {

    // @FIXME: post request
    return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.COMTABILITE_OPERATION)}/liste-journalier`, operation).pipe(
      map((response: OperationList) => response),
      catchError(this.handleError())
    );
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

$getOperationByExerciceOperationLeutree(exerciceOperationId: string): Observable<OperationList> {
  // @FIXME: get request
  return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.COMTABILITE_OPERATION)}/by-exercice-operation-leutree/${exerciceOperationId}`).pipe(
    map((response: OperationList) => response),
    catchError(this.handleError())
  );
}

$getReport(report: Report): Observable<ArrayBuffer> {
  // @FIXME: get request
  return this.http.post( `${GlobalConfig.getEndpoint(Endpoints.COMTABILITE_OPERATION)}/report`, report, {responseType: 'arraybuffer'});
}

downloadFile(annee: number): Observable<any> {
  // @FIXME: get request
  return this.http.get(`${GlobalConfig.getEndpoint(Endpoints.COMTABILITE_OPERATION)}/report-excel`, {
    responseType: 'blob'
  });
}



findOperationGrandLivre(operation: Operation): Observable<OperationList> {

  // @FIXME: post request
  return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.COMTABILITE_OPERATION)}/grand-livre`, operation).pipe(
    map((response: OperationList) => response),
    catchError(this.handleError())
  );
}

findOperationGrandLivreAuxiliaire(operation: Operation): Observable<OperationList> {

  // @FIXME: post request
  return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.COMTABILITE_OPERATION)}/grand-livre-auxiliaire`, operation).pipe(
    map((response: OperationList) => response),
    catchError(this.handleError())
  );
}

$getSoldeAnterieurByMonth(id: string, b: boolean): Observable<OperationSoldeAnterieur> {
  // @FIXME: get request
  return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.COMTABILITE_OPERATION)}/fetchSoldeAnterieurByMonth/${id}/${b}`).pipe(
    map((response: OperationSoldeAnterieur) => response),
    catchError(this.handleError())
    );
  }

private handleError<T>() {
    return (error: HttpErrorResponse) => {
      return throwError(error.message || 'Something went wrong');
    };
  }
}

