import { from } from 'rxjs';
import { HttpClient, HttpEvent, HttpRequest, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {GlobalConfig} from '../../../config/global.config';
import {Endpoints} from '../../../config/module.endpoints';
import { TypeEtatSinistre } from 'src/app/module/common/models/enum.etat.sinistre';
import { TypeEtatOrdreReglement, Workflow } from 'src/app/module/common/models/emum.etat.ordre-reglement';
import { Report } from '../../contrat/police/model';
import {formatDate} from '@angular/common';
import { Taux } from '../../parametrage/taux/model';
import { CheckPlafond, MontantPlafondGarantieResponse, OrdreReglement, OrdreReglementList, OrdreReglementListDirection, OrdreReglementListFinance, OrdreReglementListMedical, Prefinancement, PrefinancementList, ReponseCheckMontantRestantGarantie, TypePaiement } from '../../prestation/prefinancement/model';
import { Prestation } from '../../prestation/tierPayant/model';
import { BonPrestataire, BonPrestataireList } from './model';

@Injectable({providedIn: 'root'})
export class BonPrestataireService {
constructor(private http: HttpClient) {

}




posBonPrestataire(bonPrestataire: BonPrestataire): Observable<any> {
  console.log("==================bon==============");
    // @FIXME: post request
    return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.PORTAIL)}/bon/enregistrer`, bonPrestataire);
  }

  validerPrestation(prestation: Prestation): Observable<any> {
    console.log("==================bon==============");
      // @FIXME: post request
      return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.PORTAIL)}/bon/update-prestation`, prestation);
    }

  $getBonPrestataire(): Observable<BonPrestataireList> {
    // @FIXME: get request
    return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.PORTAIL)}/bon`).pipe(
        map((response: BonPrestataireList) => response),
        catchError(this.handleError())
    );
  }
  
  deletePrefinancement(prefinancement: Array<Prefinancement>): Observable<any> {
    // @FIXME: post request
    return this.http.patch(`${GlobalConfig.getEndpoint(Endpoints.PRESTATION_PREFINANCEMENT)}`, prefinancement);
  }

  deleteOrdreReglement(ordreReglement: Array<OrdreReglement>): Observable<any> {
    // @FIXME: post request
    return this.http.patch(`${GlobalConfig.getEndpoint(Endpoints.PRESTATION_PREFINANCEMENT)}/ordreReglement`, ordreReglement);
  }

  putUpdateOrdreReglement(ordre: OrdreReglement, etat: TypeEtatOrdreReglement): Observable<any> {
    // @FIXME: post request
    return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.PRESTATION_PREFINANCEMENT)}/ordreReglement/etat/${etat}`, ordre);
  }

  $getReport(report: Report): Observable<ArrayBuffer> {
    // @FIXME: get request
    return this.http.post( `${GlobalConfig.getEndpoint(Endpoints.PRESTATION_PREFINANCEMENT)}/report`,
     report, {responseType: 'arraybuffer'});
}


$getOrdreReglementValideAndWorkFlowDirection(): Observable<OrdreReglementListDirection> {
  // @FIXME: get request
  return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.PRESTATION_PREFINANCEMENT)}/ordreReglement/valide/direction`).pipe(
      map((response: OrdreReglementListDirection) => response),
      catchError(this.handleError())
  );
}

putUpdateOrdreReglementWorkflow(ordre: OrdreReglement, etat: TypeEtatOrdreReglement, w: Workflow): Observable<any> {
  // @FIXME: post request
  return this.http.patch(`${GlobalConfig.getEndpoint(Endpoints.PRESTATION_PREFINANCEMENT)}/ordreReglement/etat/${etat}/${w}`, ordre);
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

private handleError<T>() {
    return (error: HttpErrorResponse) => {
        return throwError(error.message || 'Something went wrong');
    };
}
}
