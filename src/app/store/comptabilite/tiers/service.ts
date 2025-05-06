import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { GlobalConfig } from "src/app/config/global.config";
import { Endpoints } from "src/app/config/module.endpoints";
import { createRequestOption } from "src/app/module/util/loader-util";
import { Tiers, TiersList } from "./model";

@Injectable({providedIn: 'root'})
export class TiersService {
actions$: any;
constructor(private http: HttpClient) {}

postTiers(Tiers: Tiers): Observable<any> {
  console.log('3', Tiers);
  // @FIXME: post request
  return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.COMPTABILITE_TIERS)}`, Tiers);
}

updateTiers(Tiers: Tiers): Observable<any> {
  // @FIXME: post request+
  return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.COMPTABILITE_TIERS)}/${Tiers.id}`, Tiers);
}

$getTierss(): Observable<TiersList> {
  // @FIXME: get request
  return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.COMPTABILITE_TIERS)}`).pipe(
    map((response: TiersList) => response),
    catchError(this.handleError())
  );
}

$getTiersWithCompteCollectif(): Observable<Tiers[]> {
  // @FIXME: get request
  return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.COMPTABILITE_COMPTE_TIERS_COLLECTIF)}`).pipe(
    map((response: Tiers[]) => response),
    catchError(this.handleError())
  );
}

getComptesTiersPrestataire(): Observable<Tiers[]> {
  // @FIXME: get request
  return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.COMPTABILITE_COMPTE_TIERS_PRESTATAIRE)}`).pipe(
    map((response: Tiers[]) => response),
    catchError(this.handleError())
  );
}

$findCompteTierByCode(compteTier: number): Observable<any> {
  // @FIXME: get request
  return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.COMPTABILITE_TIERS)}/find-by-compte`,{params: createRequestOption({compteTier})}).pipe(
    map((response: Tiers) => response),
    catchError(this.handleError())
  );
}

findCompteTiersByPrestataire(prestataireLibelle: string): Observable<any> {
  const params = new HttpParams()
  .set('prestataireLibelle', prestataireLibelle)

  return this.http.get<any>(GlobalConfig.getEndpoint(Endpoints.COMPTABILITE_COMPTE_BY_PRESTATAIRE),  {params});
}

getOperation(tiersPayantId: string): Observable<any> {
  const params = new HttpParams()
  .set('tiersPayantId', tiersPayantId)

  return this.http.get<any>(GlobalConfig.getEndpoint(Endpoints.COMPTABILITE_OPERATION_GET_GENERATED_OPERATION),  {params});
}

findCompteTiersByPrestataireId(prestataireLibelle: string): Observable<any> {
  const params = new HttpParams()
  .set('prestataireLibelle', prestataireLibelle)

  return this.http.get<any>(GlobalConfig.getEndpoint(Endpoints.COMPTABILITE_COMPTE_BY_PRESTATAIRE_BY_ID),  {params});
}

findCompteTiersByPrefinence(): Observable<any> {
  return this.http.get<any>(GlobalConfig.getEndpoint(Endpoints.COMPTABILITE_COMPTE_BY_PREFINENCE));
}

$findCompteTierByCompteCollectif(compte: string): Observable<TiersList> {
  // @FIXME: get request
  return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.COMPTABILITE_TIERS)}/find-by-compte-collectif`,{params: createRequestOption({compte})}).pipe(
    map((response: TiersList) => response),
    catchError(this.handleError())
  );
}

/* $getReport(report: Report): Observable<ArrayBuffer> {
  // @FIXME: get request
  return this.http.post( `${GlobalConfig.getEndpoint(Endpoints.COMPTABILITE_APPEL_FOND)}/report`,
      report, {responseType: 'arraybuffer'});
} */


private handleError<T>() {
  return (error: HttpErrorResponse) => {
    return throwError(error.message || 'Something went wrong');
  };
}


}

