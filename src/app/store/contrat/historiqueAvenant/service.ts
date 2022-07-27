import {
    AdherentPermute,
    AdherentPermuteList,
    Avenant,
    HistoriqueAvenant,
    HistoriqueAvenantAdherant,
    HistoriqueAvenantList,
    HistoriqueAvenantPrime,
    HistoriqueGroupe,
    HistoriquePlafondActe,
    HistoriquePlafondFamilleActe,
    HistoriquePlafondSousActe,
    TypeHistoriqueAvenant
} from './model';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {throwError, Observable, of} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {GlobalConfig} from '../../../config/global.config';
import {Endpoints} from '../../../config/module.endpoints';
import {createRequestOption} from '../../../module/util/loader-util';
import {Exercice} from '../exercice/model';

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

  permuterAherent(adherentPermutList: AdherentPermuteList): Observable<any> {
    return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.HISTORIQUE_AVENANT)}/permuter`, adherentPermutList,
        {observe: 'response'}
    );
}

updateHistoriqueAvenant(historiqueAvenant: HistoriqueAvenant): Observable<any> {
    // @FIXME: post request
    return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.HISTORIQUE_AVENANT_UPDATE)}`, historiqueAvenant);
  }

deleteHistoriqueAvenant(historiqueAvenant: HistoriqueAvenant): Observable<any> {
    // @FIXME: post request
    console.clear();
    console.log('suppression en cours ....');
    return this.http.get(`${GlobalConfig.getEndpoint(Endpoints.HISTORIQUE_AVENANT)}/delete/${historiqueAvenant.id}`);
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
        if (historiqueAvenant.numeroGarant !== null && historiqueAvenant.numeroGarant !== undefined) {
            data.append('numeroGarant', historiqueAvenant.numeroGarant?.toString());
        }
        const date = new Date();
        date.setFullYear(historiqueAvenant.dateAvenant.getFullYear(), historiqueAvenant.dateAvenant.getMonth(),
        historiqueAvenant.dateAvenant.getDay());
        data.append('year', historiqueAvenant.dateAvenant.getFullYear().toString());
        data.append('month', historiqueAvenant.dateAvenant.getMonth() + 1 + '');
        data.append('day', historiqueAvenant.dateAvenant.getDate().toString());
        data.append('groupeId', historiqueAvenant.groupe.id);
        data.append('fraisAccessoires', historiqueAvenant.fraisAccessoires.toString());
        data.append('fraisBadges', historiqueAvenant.fraisBadges.toString());
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'multipart/form-data');
        headers.set('Accept', 'application/vnd.ms.excel; charset=utf-8');
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
        // console.log('date = ' + debut.getMonth());
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

    getModel(typeHistoriqueAvenant: TypeHistoriqueAvenant): Observable<any> {
        switch (typeHistoriqueAvenant) {
            case TypeHistoriqueAvenant.AFAIRE_NOUVELLE:
                return this.http.get('assets/excell/Model_import_affaire_nouvelle.xlsx', {responseType: 'blob'});
            case TypeHistoriqueAvenant.INCORPORATION:
                return this.http.get('assets/excell/Model_import_incorporation.xlsx', {responseType: 'blob'});
            case TypeHistoriqueAvenant.RETRAIT:
                return this.http.get('assets/excell/model_retrait_adhérent.xlsx', {responseType: 'blob'});
                // return this.http.get('assets/excell/Model_excel_import_retrait.xlsx', {responseType: 'blob'});
            default: break;
        }
        return null;
    }

    getDebutAvenantRenouvellement(policeId: string): Observable<HttpResponse<Exercice>> {
    return this.http.get<Exercice>(`${GlobalConfig.getEndpoint(Endpoints.HISTORIQUE_AVENANT)}/debut-avenant`,
        {params: createRequestOption({policeId}), observe: 'response'});
    }

    getHistoriqueAvenantWithoutActive(policeId: string): Observable<HttpResponse<HistoriqueAvenant[]>> {
        return this.http.get<any>(`${GlobalConfig.getEndpoint(Endpoints.HISTORIQUE_AVENANT)}/active-by-police`,
            {params: createRequestOption({policeId}), observe: 'response'});
    }

    findHistoriqueAvenantByExercice(exerciceId: string): Observable<HttpResponse<HistoriqueAvenant[]>> {
        return this.http.get<any>(`${GlobalConfig.getEndpoint(Endpoints.HISTORIQUE_AVENANT)}/by-exercice`,
            {params: createRequestOption({exerciceId}), observe: 'response'})
            .pipe(
                map((response: any) => response),
                catchError(this.handleError())
            );
    }

    misAJoursHistoriqueAvenant(ha: HistoriqueAvenant): Observable<any> {
        // @FIXME: post request
        return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.HISTORIQUE_AVENANT)}/misAJours`, ha);
    }
    getsHistoriqueAvenantById(avenantId: string): Observable<any> {
        // @FIXME: post request
        return this.http.get(`${GlobalConfig.getEndpoint(Endpoints.HISTORIQUE_AVENANT)}/get-by-id`,
            {params: createRequestOption({avenantId})});
    }

    getsHistoriqueAvenantModifReview(avenantId: string): Observable<Avenant> {
        // @FIXME: post request
        return this.http.get(`${GlobalConfig.getEndpoint(Endpoints.HISTORIQUE_AVENANT)}/get-avenant-by-id`,
            {params: createRequestOption({avenantId})});
    }

    getsHistoriquePlafondGroupeFamilleActe(exerciceId: string): Observable<HistoriquePlafondFamilleActe[]> {
        // @FIXME: post request
        return this.http.get<HistoriquePlafondFamilleActe[]>(`${GlobalConfig.getEndpoint(Endpoints.HISTORIQUE_AVENANT)}/historique-modification-police`,
            {params: createRequestOption({exerciceId})});
    }

    getPrimeTotalByPoliceId(policeId: string): Observable<any> {
        // @FIXME: get request
        return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.HISTORIQUE_AVENANT_PRIME_GET_BY_POLICE_ID)}/${policeId}`).pipe(
            map((response: any) => response),
            catchError(this.handleError())
        );
    }

    getVerifyIsOverlap(debut: Date, typeDuree: string, duree: number, policeId: string): Observable<any> {
        const historiqueAvenant: HistoriqueAvenant = {};
        historiqueAvenant.dateEffet = debut;
        return this.http.post<any>(`${GlobalConfig.getEndpoint(Endpoints.HISTORIQUE_AVENANT_GET_DATE_IS_OVERLAP)}`, historiqueAvenant,
                {params: createRequestOption({typeDuree, duree, policeId}), observe: 'response'});
        }

    getsHistoriquePlafondGroupeActe(exerciceId: string, hpgfaId: string): Observable<HistoriquePlafondActe[]> {
        // @FIXME: post request
        return this.http.get<HistoriquePlafondActe[]>(`${GlobalConfig.getEndpoint(Endpoints.HISTORIQUE_AVENANT)}/historiquePlafondGroupeActe-modification-exercice`,
            {params: createRequestOption({exerciceId, hpgfaId})});
    }

    getsHistoriquePlafondGroupeSousActe(exerciceId: string, hpgaId: string): Observable<HistoriquePlafondSousActe[]> {
        // @FIXME: post request
        return this.http.get<HistoriquePlafondSousActe[]>(`${GlobalConfig.getEndpoint(Endpoints.HISTORIQUE_AVENANT)}/historiquePlafondGroupeSousActe-modification-exercice`,
            {params: createRequestOption({exerciceId, hpgaId})});
    }


    getsHistoriqueAvenantInfoGroupeAndPoliceModifReview(avenantId: string): Observable<Avenant> {
        // @FIXME: post request
        return this.http.get(`${GlobalConfig.getEndpoint(Endpoints.HISTORIQUE_AVENANT)}/get-avenant-by-info-groupe-and-police`,
            {params: createRequestOption({avenantId})});
    }

    getsHistoriqueAvenantPlafondIncorporationAndRetraitModifReview(avenantId: string, groupeId: string): Observable<Avenant> {
        // @FIXME: post request
        return this.http.get(`${GlobalConfig.getEndpoint(Endpoints.HISTORIQUE_AVENANT)}/get-avenant-by-plafond-incorporation-and-retrait`,
            {params: createRequestOption({avenantId, groupeId})});
    }

    getsHistoriqueAvenantIncorpAndRetrait(avenantId: string): Observable<Avenant> {
        // @FIXME: post request
        return this.http.get(`${GlobalConfig.getEndpoint(Endpoints.HISTORIQUE_AVENANT)}/get-avenant-incorp-retrait`,
            {params: createRequestOption({avenantId})});
    }

    postAvenantGroupeAndUpdatePlafond(avenant: Avenant): Observable<any> {
        // @FIXME: post request
        return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.HISTORIQUE_AVENANT)}/groupe-save`, avenant);
    }

    postAvenantUpdatePlafond(avenant: Avenant): Observable<any> {
        // @FIXME: post request
        return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.HISTORIQUE_AVENANT)}/plafond-save`, avenant);
    }

    postAvenantUpdateRenouvellementIncorp(avenant: Avenant): Observable<any> {
        // @FIXME: post request
        return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.HISTORIQUE_AVENANT)}/incorporation-save`, avenant);
    }

    postAvenantUpdateRenouvellementRetrait(avenant: Avenant): Observable<any> {
        // @FIXME: post request
        return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.HISTORIQUE_AVENANT)}/retrait-save`, avenant);
    }


   /*  getHistoriqueAvenantWithoutActive(policeId: string): Observable<HistoriqueAvenant[]> {
        return this.http.get<any>(`${GlobalConfig.getEndpoint(Endpoints.HISTORIQUE_AVENANT)}/active-by-police/${policeId}`).pipe(
            map((response: any) => response),
            catchError(this.handleError())
        );;
    } */
}
