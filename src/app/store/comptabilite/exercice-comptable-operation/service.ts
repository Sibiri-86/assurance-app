import { from } from "rxjs";
import { HttpClient, HttpEvent, HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {GlobalConfig} from '../../../config/global.config';
import {Endpoints} from '../../../config/module.endpoints';
import {  ExerciceComptableOperation, ExerciceComptableOperationList,OperationList} from "./model";


@Injectable({providedIn: 'root'})
export class ExerciceComptableOperationService {
constructor(private http: HttpClient) {}

$getExerciceComptableOperation(): Observable<ExerciceComptableOperationList> {
    // @FIXME: get request
    return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.COMTABILITE_EXERCICE_OPERATION)}`).pipe(
      map((response: ExerciceComptableOperationList) => response),
      catchError(this.handleError())
    );
  }

  $getExerciceComptableOperationByJournal(journalId: string): Observable<ExerciceComptableOperationList> {
    // @FIXME: get request
    return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.COMTABILITE_EXERCICE_OPERATION)}/${journalId}`).pipe(
      map((response: ExerciceComptableOperationList) => response),
      catchError(this.handleError())
    );
  }

  $getExerciceComptableOperationMisaJous(id: string): Observable<ExerciceComptableOperation> {
    // @FIXME: get request
    return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.COMTABILITE_EXERCICE_OPERATION)}/mis-a-jours/${id}`).pipe(
      map((response: ExerciceComptableOperation) => response),
      catchError(this.handleError())
      );
    }
  $getOperations(): Observable<OperationList> {
    // @FIXME: get request
    return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.COMTABILITE_EXERCICE_OPERATION)}/liste-opration`).pipe(
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

