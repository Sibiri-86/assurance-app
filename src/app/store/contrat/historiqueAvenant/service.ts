import {
    Avenant,
    HistoriqueAvenant,
    HistoriqueAvenantAdherant,
    HistoriqueAvenantList,
    HistoriqueAvenantPrime,
    HistoriqueGroupe,
    HistoriquePlafondFamilleActe,
    HistoriquePlafondSousActe,
    TypeHistoriqueAvenant
} from "./model";
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {GlobalConfig} from '../../../config/global.config';
import {Endpoints} from '../../../config/module.endpoints';
import {createRequestOption} from '../../../module/util/loader-util';

@Injectable({providedIn: 'root'})
export class HistoriqueAvenantService {
constructor(private http: HttpClient) {}

getHistoriqueAvenants(policeId: string): Observable<HistoriqueAvenantList> {
    // @FIXME: get request
    return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.HISTORIQUE_AVENANT)}/${policeId}`).pipe(
      map((response: HistoriqueAvenantList) => response),
      catchError(this.handleError())
    );
}

postHistoriqueAvenant(historiqueAvenant: HistoriqueAvenant): Observable<any> {
    // @FIXME: post request
    historiqueAvenant.file = new FormData();
    // const data: FormData = new FormData();
    // data.append('file', historiqueAvenant.fileToLoad);
    // historiqueAvenant.file.append('file', historiqueAvenant.fileToLoad);
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.set('Accept', 'application/json');
    console.log('++++++++++++++++++historiqueAvenant++++++++++++++++++++++');
    console.log(historiqueAvenant);
    return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.HISTORIQUE_AVENANT)}`, historiqueAvenant, {headers: headers});
  }

updateHistoriqueAvenant(historiqueAvenant: HistoriqueAvenant): Observable<any> {
    // @FIXME: post request
    return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.HISTORIQUE_AVENANT_UPDATE)}`, historiqueAvenant);
  }

deleteHistoriqueAvenant(historiqueAvenant: HistoriqueAvenant): Observable<any> {
    // @FIXME: post request
    return this.http.patch(`${GlobalConfig.getEndpoint(Endpoints.HISTORIQUE_AVENANT)}/${historiqueAvenant.id}`, null);
}

getHistoriqueAvenantAdherantsByPolice(policeId: string): Observable<HistoriqueAvenantAdherant[]> {
    // @FIXME: get request
    return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.HISTORIQUE_AVENANT_ADHERANT)}/${policeId}`).pipe(
        map((response: HistoriqueAvenantAdherant[]) => response),
        catchError(this.handleError())
    );
}

    postAvenant(avenant: Avenant): Observable<any> {
        // @FIXME: post request
        return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.HISTORIQUE_AVENANT_MODIF)}`, avenant);
    }

    getHistoriquePlafondFamilleActes(avanantId: string, grpId: string): Observable<HistoriqueAvenantList> {
        // @FIXME: get request
        return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.HISTORIQUE_AVENANT)}/hpgfa`,
            {params: createRequestOption({avanantId, grpId})}
            ).pipe(
            map((response: any) => response),
            catchError(this.handleError())
        );
    }

    getHistoriquePlafondActes(avanantId: string, grpId: string): Observable<HistoriqueAvenantList> {
        // @FIXME: get request
        return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.HISTORIQUE_AVENANT)}/hpga`,
            {params: createRequestOption({avanantId, grpId})}
            ).pipe(
            map((response: any) => response),
            catchError(this.handleError())
        );
    }

    getHistoriquePlafondSousActes(avanantId: string, grpId: string): Observable<HistoriqueAvenantList> {
        // @FIXME: get request
        return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.HISTORIQUE_AVENANT)}/hpgsa`,
            {params: createRequestOption({avanantId, grpId})}
            ).pipe(
            map((response: any) => response),
            catchError(this.handleError())
        );
    }

    getHistoriquePlafonds(avanantId: string, grpId: string): Observable<HistoriqueAvenantList> {
        // @FIXME: get request
        return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.HISTORIQUE_AVENANT)}/hpg`,
            {params: createRequestOption({avanantId, grpId})}
        ).pipe(
            map((response: any) => response),
            catchError(this.handleError())
        );
    }

    postHistoriqueAvenantFile(historiqueAvenant: HistoriqueAvenant, file: File): Observable<any> {
        // @FIXME: post request
        const data: FormData = new FormData();
        data.append('file', file);
        data.append('typeHistoriqueAvenant', historiqueAvenant.typeHistoriqueAvenant);
        data.append('numeroGarant', historiqueAvenant.numeroGarant.toString());
        data.append('dateAvenant', historiqueAvenant.dateAvenant.toString());
        data.append('groupeId', historiqueAvenant.groupe.id);
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'multipart/form-data');
        headers.set('Accept', 'application/json');
        console.log('++++++++++++++++++data++++++++++++++++++++++');
        console.log(data);
        return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.HISTORIQUE_AVENANT_FILE)}`, data, {headers: headers});
    }

    exportExcelModel(typeHistoriqueAvenant?: TypeHistoriqueAvenant): Observable<any> {
        // @FIXME: post request
        return this.http.get<any>(`${GlobalConfig.getEndpoint(Endpoints.HISTORIQUE_AVENANT_EXPORT_EXCEL_MODEL)}`,
             {params: createRequestOption({typeHistoriqueAvenant}), responseType: 'arraybuffer' as 'json'});
    }

    compareDate(debut?: Date, fin?: Date): Observable<any> {
        // @FIXME: post request
        const avenant: HistoriqueAvenant = {};
        avenant.dateEffet = debut;
        avenant.dateAvenant = fin;
        return this.http.post<any>(`${GlobalConfig.getEndpoint(Endpoints.HISTORIQUE_AVENANT_COMPARE_DATE)}`, avenant);
    }

    getHistoriqueAvenantAdherantsByPoliceAndUnsuspend(policeId: string): Observable<HistoriqueAvenantAdherant[]> {
        // @FIXME: get request
        return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.HISTORIQUE_AVENANT_ADHERANT_UNSUSPEND)}/${policeId}`).pipe(
            map((response: HistoriqueAvenantAdherant[]) => response),
            catchError(this.handleError())
        );
    }

    changeStatus(historiqueAvenantId: string, status: boolean): Observable<HistoriqueAvenant> {
        // @FIXME: get request
        return this.http.get<any>(`${GlobalConfig.getEndpoint(Endpoints.HISTORIQUE_AVENANT_CHANGE_STATUS)}`,
            {params: createRequestOption({historiqueAvenantId, status})}
        );
    }

    /* pushFileToStorage(file: File): Observable<any> {
        const data: FormData = new FormData();
        data.append('file', file);
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'multipart/form-data');
        headers.set('Accept', 'application/json');
        return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.PARAMETRAGE_TYPE_GENRE)}/upload`, data, { headers: headers });
    } */

private handleError<T>() {
    return (error: HttpErrorResponse) => {
      return throwError(error.message || 'Something went wrong');
    };
  }

    calculerPrime(avenantId: string): Observable<Array<HistoriqueAvenantPrime>> {
        return this.http.get<any>(`${GlobalConfig.getEndpoint(Endpoints.HISTORIQUE_AVENANT_CALCUL_PRIME)}`,
            {params: createRequestOption({avenantId})}
        );
    }

    validerPrime(historiqueAvenantPrimes: HistoriqueAvenantPrime[]): Observable<any> {
        return this.http.post<any>(`${GlobalConfig.getEndpoint(Endpoints.HISTORIQUE_AVENANT_VALIDER_PRIME)}`, historiqueAvenantPrimes,
            {observe: 'response'}
        );
    }

    // get-date-fin
    getDateFin(debut: Date, typeDuree: string, duree: number): Observable<any> {
    const historiqueAvenant: HistoriqueAvenant = {};
    historiqueAvenant.dateEffet = debut;
    return this.http.post<any>(`${GlobalConfig.getEndpoint(Endpoints.HISTORIQUE_AVENANT_GET_END)}`, historiqueAvenant,
            {params: createRequestOption({typeDuree, duree}), observe: 'response'});
    }

    findHistoriquePlafondGroupeFamilleActeByGroupeIdAndDeletedIsFalse(groupeId: string):
        Observable<HttpResponse<HistoriquePlafondFamilleActe[]>> {
        return this.http.get<any>(`${GlobalConfig.getEndpoint(Endpoints.HISTORIQUE_AVENANT_HPGFA)}`,
            {params: createRequestOption({groupeId}), observe: 'response'});
    }

    findHistoriqueGroupeByGroupeIdAndDeletedIsFalse(groupeId: string): Observable<HttpResponse<HistoriqueGroupe[]>> {
        return this.http.get<HistoriqueGroupe[]>(`${GlobalConfig.getEndpoint(Endpoints.HISTORIQUE_AVENANT_HG)}`,
            {params: createRequestOption({groupeId}), observe: 'response'});
    }

    findHistoriquePlafondGroupeSousActeByGroupeIdAndDeletedIsFalse(groupeId: string): Observable<HttpResponse<HistoriquePlafondSousActe[]>> {
        return this.http.get<any>(`${GlobalConfig.getEndpoint(Endpoints.HISTORIQUE_AVENANT_HPGSA)}`,
            {params: createRequestOption({groupeId}), observe: 'response'});
    }

    findHistoriquePlafondGroupeByGroupeIdAndDeletedIsFalse(groupeId: string): Observable<HttpResponse<HistoriqueGroupe[]>> {
        return this.http.get<any>(`${GlobalConfig.getEndpoint(Endpoints.HISTORIQUE_AVENANT_HPG)}`,
            {params: createRequestOption({groupeId}), observe: 'response'});
    }

    findHistoriquePlafondGroupeActeByGroupeIdAndDeletedIsFalse(groupeId: string): Observable<HttpResponse<HistoriqueGroupe[]>> {
        return this.http.get<any>(`${GlobalConfig.getEndpoint(Endpoints.HISTORIQUE_AVENANT_HPGA)}`,
            {params: createRequestOption({groupeId}), observe: 'response'});
    }
}
