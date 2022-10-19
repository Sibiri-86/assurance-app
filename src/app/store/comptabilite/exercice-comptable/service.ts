import { from } from "rxjs";
import { HttpClient, HttpEvent, HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {GlobalConfig} from '../../../config/global.config';
import {Endpoints} from '../../../config/module.endpoints';
import { ExerciceComptable, ExerciceComptableList} from "./model";


@Injectable({providedIn: 'root'})
export class ExerciceComptableService {
constructor(private http: HttpClient) {}

$getExerciceComptable(): Observable<ExerciceComptableList> {
    // @FIXME: get request
    return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.COMTABILITE_JOURNAUX)}`).pipe(
      map((response: ExerciceComptableList) => response),
      catchError(this.handleError())
    );
  }

 

posExerciceComptable(exercice: ExerciceComptable): Observable<any> {
    // @FIXME: post request
    return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.COMTABILITE_JOURNAUX)}`, exercice);
  }

updateExerciceComptable(exercice: ExerciceComptable): Observable<any> {
    // @FIXME: post request
    return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.COMTABILITE_JOURNAUX)}/${exercice.id}`, exercice);
  }

  fermeExerciceComptable(exercice: ExerciceComptable): Observable<any> {
    // @FIXME: post request
    return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.COMTABILITE_JOURNAUX)}/cloture`, exercice);
  }
  activeExerciceComptable(exercice: ExerciceComptable): Observable<any> {
    // @FIXME: post request
    return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.COMTABILITE_JOURNAUX)}/active/${exercice.id}`, exercice);
  }

  findExerciceComptableActif(exercice: ExerciceComptable): Observable<any> {
    // @FIXME: post request
    return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.COMTABILITE_JOURNAUX)}/find-exercice-actif/${exercice.id}`, exercice);
  }

deleteExerciceComptable(exercice: ExerciceComptable): Observable<any> {
    // @FIXME: post request
    return this.http.patch(`${GlobalConfig.getEndpoint(Endpoints.COMTABILITE_JOURNAUX)}/${exercice.id}`, null);
}





private handleError<T>() {
    return (error: HttpErrorResponse) => {
      return throwError(error.message || 'Something went wrong');
    };
  }
}

