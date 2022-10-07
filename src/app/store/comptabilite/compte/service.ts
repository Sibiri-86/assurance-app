import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { GlobalConfig } from "src/app/config/global.config";
import { Endpoints } from "src/app/config/module.endpoints";
import { Compte, CompteList } from "./model";

@Injectable({providedIn: 'root'})
export class CompteService {
actions$: any;
constructor(private http: HttpClient) {}

pushFileToStorage(file: File): Observable<any> {
  const data: FormData = new FormData();
  data.append('file', file);
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'multipart/form-data');
  headers.set('Accept', 'application/json');
  return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.COMPTABILITE_COMPTE)}/upload`, data, { headers: headers });
}

postCompte(Compte: Compte): Observable<any> {
  console.log('3',Compte);
  // @FIXME: post request
  return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.COMPTABILITE_COMPTE)}`, Compte);
}

updateCompte(Compte: Compte): Observable<any> {
  // @FIXME: post request+
  return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.COMPTABILITE_COMPTE)}/${Compte.id}`, Compte);
}

$getComptes(): Observable<CompteList> {
  // @FIXME: get request
  return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.COMPTABILITE_COMPTE)}`).pipe(
    map((response: CompteList) => response),
    catchError(this.handleError())
  );
}

$getComptesNoRacine(): Observable<CompteList> {
  // @FIXME: get request
  return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.COMPTABILITE_COMPTE)}/no-racine`).pipe(
    map((response: CompteList) => response),
    catchError(this.handleError())
  );
}
findCompteByNumero(numero: number): Observable<any> {
  // @FIXME: post request+
  return this.http.get(`${GlobalConfig.getEndpoint(Endpoints.COMPTABILITE_COMPTE)}/find-compte/${numero}`);
}

private handleError<T>() {
  return (error: HttpErrorResponse) => {
    return throwError(error.message || 'Something went wrong');
  };
}


}

