import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { GlobalConfig } from "src/app/config/global.config";
import { Endpoints } from "src/app/config/module.endpoints";
import { createRequestOption } from "src/app/module/util/loader-util";
import { Report } from "../../contrat/police/model";
import { AppelFond, AppelFondList } from "./model";

@Injectable({providedIn: 'root'})
export class AppelFondService {
actions$: any;
constructor(private http: HttpClient) {}

postAppelFond(AppelFond: AppelFond): Observable<any> {
  console.log('3', AppelFond);
  // @FIXME: post request
  return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.COMPTABILITE_APPEL_FOND)}`, AppelFond);
}

updateAppelFond(AppelFond: AppelFond): Observable<any> {
  // @FIXME: post request+
  return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.COMPTABILITE_APPEL_FOND)}/${AppelFond.id}`, AppelFond);
}

$getAppelFonds(): Observable<AppelFondList> {
  // @FIXME: get request
  return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.COMPTABILITE_APPEL_FOND)}`).pipe(
    map((response: AppelFondList) => response),
    catchError(this.handleError())
  );
}

$getReport(report: Report): Observable<ArrayBuffer> {
  // @FIXME: get request
  return this.http.post( `${GlobalConfig.getEndpoint(Endpoints.COMPTABILITE_APPEL_FOND)}/report`,
      report, {responseType: 'arraybuffer'});
}

findAppelFondTotalAmount(AppelFond: AppelFond): Observable<any> {
    // @FIXME: post request+
    return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.COMPTABILITE_APPEL_FOND)}/by-Garant-and-two-dates`, AppelFond);
      /* {params: createRequestOption({idGarant, dateDebut, dateFin}), observe: 'response'})
      .pipe(
          map((response: any) => response),
          catchError(this.handleError())
      ); */
}

private handleError<T>() {
  return (error: HttpErrorResponse) => {
    return throwError(error.message || 'Something went wrong');
  };
}

deleteAppelFond(AppelFond: AppelFond): Observable<any> {
  // @FIXME: post request+
  return this.http.patch(`${GlobalConfig.getEndpoint(Endpoints.COMPTABILITE_APPEL_FOND)}/delete/${AppelFond.id}`, AppelFond);
}


}

