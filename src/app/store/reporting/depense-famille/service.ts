import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {GlobalConfig} from '../../../config/global.config';
import {Endpoints} from '../../../config/module.endpoints';
import { TypeEtatSinistre } from 'src/app/module/common/models/enum.etat.sinistre';
import { TypeEtatOrdreReglement } from 'src/app/module/common/models/emum.etat.ordre-reglement';
import { Report } from '../../contrat/police/model';
import { Bilan, Check, DepenseFamilleList } from './model';
import { DepartementList } from '../../parametrage/departement/model';
import { ExerciceComptable } from '../../comptabilite/exercice-comptable/model';
import { OrdreReglement } from '../../prestation/prefinancement/model';
import { Byte } from '@angular/compiler/src/util';

@Injectable({providedIn: 'root'})
export class DepenseFamilleService {
constructor(private http: HttpClient) {

}

 findDepenseFamille(check: Check): Observable<DepenseFamilleList> {
        // @FIXME: post request
        return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.REPORTING_PRODUCTION)}`, check).pipe(
            map((response: DepenseFamilleList) => response),
            catchError(this.handleError()));
    }

    findDepenseFamilleActe(check: Check): Observable<DepenseFamilleList> {
        // @FIXME: post request
        return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.REPORTING_PRODUCTION)}/depense-famille`, check).pipe(
            map((response: DepenseFamilleList) => response),
            catchError(this.handleError()));
    }

    $getReport(report: Report): Observable<ArrayBuffer> {
        // @FIXME: get request
        return this.http.post( `${GlobalConfig.getEndpoint(Endpoints.REPORTING_PRODUCTION)}/depense-famille/report`,
            report, {responseType: 'arraybuffer'});
      }

      $getReportBilan(report: ExerciceComptable): Observable<ArrayBuffer> {
        // @FIXME: get request
        return this.http.post( `${GlobalConfig.getEndpoint(Endpoints.REPORTING_PRODUCTION)}/depense-famille/reportBilan`,
            report, {responseType: 'arraybuffer'});
      }

      $getReportDepenseFamilleExcel(check: Check): Observable<ArrayBuffer> {
        // @FIXME: get request
        return this.http.post( `${GlobalConfig.getEndpoint(Endpoints.REPORTING_PRODUCTION)}/depense-famille/report-excel`,
        check, {responseType: 'arraybuffer'});
      }

      $getReportConsommationWaveExcel(check: Check): Observable<ArrayBuffer> {
        // @FIXME: get request
        return this.http.post( `${GlobalConfig.getEndpoint(Endpoints.REPORTING_PRODUCTION)}/consommation-wave/report-excel`,
        check, {responseType: 'arraybuffer'});
      }

      exportDonneePrestations(dateDebut: string, dateFin: string, garantId:string, policeId:string, adresseMail:string) {
    
        const formattedDateDebut = new Date(dateDebut).toISOString().split('T')[0]; // Convertit en YYYY-MM-DD
        const formattedDateFin = new Date(dateFin).toISOString().split('T')[0];
      
        const params = new HttpParams()
          .set('dateDebut', formattedDateDebut)
          .set('dateFin', formattedDateFin)
          .set('garantId', garantId)
          .set('policeId', policeId)
          .set('adresseMail', adresseMail);
    
        return this.http.get(GlobalConfig.getEndpoint(Endpoints.REPORTING_EXPORT_DONNEES_PRESTATIONS), { 
          params,
          responseType: 'blob'
        });
      }

      exportDonneePrestationsAvecDateSoins(dateDebut: string, dateFin: string, garantId:string, policeId:string, adresseMail:string) {
    
        const formattedDateDebut = new Date(dateDebut).toISOString().split('T')[0]; // Convertit en YYYY-MM-DD
        const formattedDateFin = new Date(dateFin).toISOString().split('T')[0];
      
        const params = new HttpParams()
          .set('dateDebut', formattedDateDebut)
          .set('dateFin', formattedDateFin)
          .set('garantId', garantId)
          .set('policeId', policeId)
          .set('adresseMail', adresseMail);
    
        return this.http.get(GlobalConfig.getEndpoint(Endpoints.REPORTING_EXPORT_DONNEES_PRESTATIONS_AVEC_DATE_SOINS), { 
          params,
          responseType: 'blob'
        });
      }

      exportDonneesPrestationsAvecDateDeSaisie(dateDebut: string, dateFin: string, garantId:string, policeId:string, adresseMail:string) {
    
        const formattedDateDebut = new Date(dateDebut).toISOString().split('T')[0]; // Convertit en YYYY-MM-DD
        const formattedDateFin = new Date(dateFin).toISOString().split('T')[0];
      
        const params = new HttpParams()
          .set('dateDebut', formattedDateDebut)
          .set('dateFin', formattedDateFin)
          .set('garantId', garantId)
          .set('policeId', policeId)
          .set('adresseMail', adresseMail);
    
        return this.http.get(GlobalConfig.getEndpoint(Endpoints.REPORTING_EXPORT_DONNEES_PRESTATIONS_AVEC_DATE_SAISIE), { 
          params,
          responseType: 'blob'
        });
      }

      findOrdreReglementJournanlier(dateDebut: string, dateFin: string) {
    
        const formattedDateDebut = new Date(dateDebut).toISOString().split('T')[0]; // Convertit en YYYY-MM-DD
        const formattedDateFin = new Date(dateFin).toISOString().split('T')[0];
      
        const params = new HttpParams()
          .set('dateDebut', formattedDateDebut)
          .set('dateFin', formattedDateFin)
    
        return this.http.get(GlobalConfig.getEndpoint(Endpoints.REPORTING_EXPORT_DONNEES_ORDRE_JOURNALIER), { 
          params,
          responseType: 'blob'
        });
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
