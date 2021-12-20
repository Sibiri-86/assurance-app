import {Police, PoliceList, Report, Statistique} from "./model";
import { HttpClient, HttpEvent, HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {GlobalConfig} from '../../../config/global.config';
import {Endpoints} from '../../../config/module.endpoints';
import {HistoriqueAvenant} from '../historiqueAvenant/model';

@Injectable({providedIn: 'root'})
export class PoliceService {
    constructor(private http: HttpClient) {}

    $getPolices(): Observable<PoliceList> {
        // @FIXME: get request
        return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.CONTRAT_POLICE)}`).pipe(
            map((response: PoliceList) => response),
            catchError(this.handleError())
        );
    }

    $getStatistiquePolice(): Observable<Statistique> {
        // @FIXME: get request
        return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.CONTRAT_POLICE)}/statistique`).pipe(
            map((response: Statistique) => response),
            catchError(this.handleError())
        );
    }
    $getPolicesByValideIsTrue(): Observable<PoliceList> {
        // @FIXME: get request
        return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.CONTRAT_POLICE_VALIDE )}`).pipe(
            map((response: PoliceList) => response),
            catchError(this.handleError())
        );
    }

    $getReport(report: Report): Observable<ArrayBuffer> {
        // @FIXME: get request
        return this.http.post( `${GlobalConfig.getEndpoint(Endpoints.CONTRAT_POLICE)}/report`, report, {responseType: 'arraybuffer'});
    }

    posPolice(Police: Police): Observable<any> {
        // @FIXME: post request
        return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_POLICE)}`, Police);
    }

    rapportPolice(police: Police): Observable<any> {
        // @FIXME: post request
        return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_POLICE)}/rapport`, police);
    }

    updatePolice(Police: Police): Observable<any> {
        // @FIXME: post request
        return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_POLICE_UPDATE)}}`, Police);
    }

    validerPolice(Police: Police): Observable<any> {
        // @FIXME: post request
        return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_POLICE)}/valider`, Police);
    }
    cloturePolice(Police: Police): Observable<any> {
        // @FIXME: post request
        return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_POLICE_CLOTURE)}/cloturePolice`, Police);
    }

    deletePolice(Police: Police): Observable<any> {
        // @FIXME: post request
        return this.http.patch(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_POLICE)}/${Police.id}`, null);
    }

    deletePolices(police: Array<Police>): Observable<any> {
        // @FIXME: post request
        return this.http.patch(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_POLICE)}`, police);
    }



    pushFileToStorage(file: File): Observable<any> {
        const data: FormData = new FormData();
        data.append('file', file);
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'multipart/form-data');
        headers.set('Accept', 'application/json');
        return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_POLICE)}/upload`, data, { headers: headers });
    }

    private handleError<T>() {
        return (error: HttpErrorResponse) => {
            return throwError(error.message || 'Something went wrong');
        };
    }

    $getPoliceByAffaireNouvelles(): Observable<PoliceList> {
        // @FIXME: get request
        return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.CONTRAT_POLICE_BY_AFFAIRE_NOUVELLE)}`).pipe(
            map((response: PoliceList) => response),
            catchError(this.handleError())
        );
    }
    deValiderPolice(Police: Police): Observable<any> {
        // @FIXME: post request
        return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_POLICE)}/deValider`, Police);
    }

    loadAdherentsByExcelFile(file: File): Observable<any> {
        // @FIXME: post request
        const data: FormData = new FormData();
        data.append('file', file);
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'multipart/form-data');
        headers.set('Accept', 'application/json');
        console.log('++++++++++++++++++data++++++++++++++++++++++');
        console.log(data);
        return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_POLICE_LOAD_ADHERENT)}`, data, {headers: headers});
    }
}
