import {
    HistoriqueAdherent,
    HistoriqueAvenant,
    HistoriqueAvenantAdherant,
    HistoriqueAvenantAdherentList,
    HistoriqueAvenantList
} from './model';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {GlobalConfig} from '../../../config/global.config';
import {Endpoints} from '../../../config/module.endpoints';
import {Avenant, TypeHistoriqueAvenant} from '../historiqueAvenant/model';
import {HistoriqueAvenantPrime} from '../historiqueAvenant/model';
import {createRequestOption} from '../../../module/util/loader-util';
import {Adherent} from '../adherent/model';
import { Page } from 'src/app/module/util/pageable';

@Injectable({providedIn: 'root'})
export class HistoriqueAvenantAdherentService {
constructor(private http: HttpClient) {}

getHistoriqueAvenantAdherents(haId: string): Observable<Array<HistoriqueAvenantAdherant>> {
    // @FIXME: get request
    return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.HISTORIQUE_AVENANT_ADHERENT)}/${haId}`).pipe(
      map((response: Array<HistoriqueAvenantAdherant>) => response),
      catchError(this.handleError())
    );
}

getHistoriqueAvenantAdherentsByHistoriqueIdAndTypeHistorique(typeHistoriqueAvenant: TypeHistoriqueAvenant, haId: string):
    Observable<Array<HistoriqueAvenantAdherant>> {
        // @FIXME: get request
    return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.HISTORIQUE_AVENANT_ADHERENT)}`,
        {params: createRequestOption({typeHistoriqueAvenant, haId})}).pipe(
            map((response: Array<HistoriqueAvenantAdherant>) => response),
            catchError(this.handleError())
        );
    }

    getHistoriqueAvenantAdherentsByHistoriqueId(haId: string):
    Observable<Array<HistoriqueAvenantAdherant>> {
        // @FIXME: get request
    return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.HISTORIQUE_AVENANT_ADHERENT)}/retire`,
        {params: createRequestOption({haId})}).pipe(
            map((response: Array<HistoriqueAvenantAdherant>) => response),
            catchError(this.handleError())
        );
    }

    findHistoriqueAvenantAdherentByHistoriqueAvenantIdAndActifIsFalse(haId: string):
    Observable<Array<HistoriqueAvenantAdherant>> {
        // @FIXME: get request
    return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.HISTORIQUE_AVENANT_ADHERENT)}/false`,
        {params: createRequestOption({haId})}).pipe(
            map((response: Array<HistoriqueAvenantAdherant>) => response),
            catchError(this.handleError())
        );
    }

    getAvenantModificationInfo(typeHistoriqueAvenant: TypeHistoriqueAvenant, haId: string, policeId: string):
    Observable<Avenant> {
        // @FIXME: get request
    return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.HISTORIQUE_MODIFICATION)}`,
        {params: createRequestOption({typeHistoriqueAvenant, haId, policeId})}).pipe(
            map((response: Avenant) => response),
            catchError(this.handleError())
        );
    }


    findHistoriqueAvenantAdherantActuallList(idPolice: string): Observable<HistoriqueAvenantAdherant[]> {
        // @FIXME: get request
        return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.CONTRAT_ADHERENT_POLICE_ACTUALISE)}/${idPolice}`).pipe(
            map((response: HistoriqueAvenantAdherant[]) => response),
            catchError(this.handleError())
        );
    }

    findHistoriqueAvenantAdherantActuallByExercice(idPolice: string, exerciceId: string): Observable<HistoriqueAvenantAdherant[]> {
        // @FIXME: get request
        return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.CONTRAT_ADHERENT_POLICE_ACTUALISE)}/${idPolice}/${exerciceId}`).pipe(
            map((response: HistoriqueAvenantAdherant[]) => response),
            catchError(this.handleError())
        );
    }


    findHistoriqueAvenantAdherantActuallByExerciceSecond(idPolice: string, exerciceId: string): Observable<HistoriqueAvenantAdherant[]> {
        // @FIXME: get request
        return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.CONTRAT_ADHERENT_POLICE_ACTUALISE_SECOND)}/${idPolice}/${exerciceId}`).pipe(
            map((response: HistoriqueAvenantAdherant[]) => response),
            catchError(this.handleError())
        );
    } 

    findHistoriqueAvenantAdherantActuallByPoliceAndGroupe( idPolice: string, groupeId: string): Observable<HistoriqueAvenantAdherant[]> {
        // @FIXME: get request
        return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.CONTRAT_ADHERENT_POLICE_ACTUALISE)}/by-police-and-groupe/${idPolice}/${groupeId}`).pipe(
            map((response: HistoriqueAvenantAdherant[]) => response),
            catchError(this.handleError())
        );
    }

    findHistoriqueAvenantPrime(idHa: string): Observable<HistoriqueAvenantPrime[]> {
        // @FIXME: get request
        return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.CONTRAT_HISTORIQUE_AVENANT_PRIME)}`,
            {params: createRequestOption({idHa})}).pipe(
            map((response: HistoriqueAvenantPrime[]) => response),
            catchError(this.handleError())
        );
    }

    findAllHistoriquePlafondGroupeByHistoriqueAvenantAndGroupe(avenantId: string, groupeId: string): Observable<any> {
        return this.http.get<any>(`${GlobalConfig.getEndpoint(Endpoints.HISTORIQUE_AVENANT_ADHERENT)}/hpgf`,
            {params: createRequestOption({avenantId, groupeId})});
    }

    findAllHistoriquePlafondGroupeFamilleActeByHistoriqueAvenantAndGroupe(avenantId: string, groupeId: string): Observable<any> {
        return this.http.get<any>(`${GlobalConfig.getEndpoint(Endpoints.HISTORIQUE_AVENANT_ADHERENT)}/hpgfa`,
            {params: createRequestOption({avenantId, groupeId})});
    }

    findAllHistoriquePlafondGroupeActeByHistoriqueAvenantAndGroupe(avenantId: string, groupeId: string): Observable<any> {
        return this.http.get<any>(`${GlobalConfig.getEndpoint(Endpoints.HISTORIQUE_AVENANT_ADHERENT)}/hpga`,
            {params: createRequestOption({avenantId, groupeId})});
    }

    findAllHistoriquePlafondGroupeSousActeByHistoriqueAvenantAndGroupe(avenantId: string, groupeId: string): Observable<any> {
        return this.http.get<any>(`${GlobalConfig.getEndpoint(Endpoints.HISTORIQUE_AVENANT_ADHERENT)}/hpgsa`,
            {params: createRequestOption({avenantId, groupeId})});
    }

    getListActualisee(policeId: string): Observable<any> {
        return this.http.get<any>( `${GlobalConfig.getEndpoint(Endpoints.HISTORIQUE_AVENANT_ADHERENT)}/liste-actualisee`,
            {params: createRequestOption({policeId})}
        );
    }

    manageSelectionListe(historiqueAdherent: any): Observable<any> {
        return this.http.post<any>( `${GlobalConfig.getEndpoint(Endpoints.HISTORIQUE_AVENANT_ADHERENT)}/manage-selection`,
            historiqueAdherent
        );
    }
    
    getHistoriqueAvenantAdherentByPoliceAndUnsuspend(policeId: string): Observable<any> {
        return this.http.get<any>( `${GlobalConfig.getEndpoint(Endpoints.HISTORIQUE_AVENANT_ADHERENT)}/unsuspend`,
            {params: createRequestOption({policeId})}
        );
    }

    findFamilleByAdherentPrincipal(adherentId: string, exerciceId: string): Observable<any[]> {
        return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.HISTORIQUE_AVENANT_ADHERENT)}/find-famille-by-adhrentPrincipal/${exerciceId}`,
            {params: createRequestOption({adherentId})}
        ).pipe(
            map((response: HistoriqueAvenantAdherant[]) => response)
            
        );
    }

    getListActualiseeByExerciceId(exerciceId: string): Observable<any[]> {
        // @FIXME: get request
        return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.CONTRAT_ADHERENT_ACTUALL_LIST_BY_EXERCICE_ID)}/${exerciceId}`).pipe(
            map((response: Adherent[]) => response),
            catchError(this.handleError())
        );
    }
    
    getlistOfAdherentByExerciceAndGroupe(exoId: string, groupeId: string): Observable<HistoriqueAvenantAdherant[]> {
        // @FIXME: get request
        if(exoId && groupeId) {
        return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.CONTRAT_ADHERENT_ACTUALL_LIST_BY_EXERCICE_ID_AND_GROUPE_ID)}/liste-actualisee-by-exercice-and-groupe`,
            {params: createRequestOption({exoId, groupeId})}).pipe(
                map((response: HistoriqueAvenantAdherant[]) => response),
                catchError(this.handleError())
            );
        }
      }

          // Bircof
        // Rechercher les adhérants par exoId, et groupe
        searchAllAdherentByExerciceAndGroupeByPage (exoId?: string, groupeId?: string, page?: number, size?: number): Observable<Page<Adherent[]>> {
          const params = new HttpParams()
            .set('exoId', exoId)
            .set('groupeId', groupeId)
            .set('page', page.toString())
            .set('size', size.toString());
          return this.http.get<Page<Adherent[]>>(
            `${GlobalConfig.getEndpoint(Endpoints.ADHERANT_BY_EXERCICEAND_GROUPE)}`, { params });
        }


        // Bircof
        // Rechercher UN adhérent principal et ses membres de famille
        adherentPrincipalWithFamily (adherentPrincipalId?: string): Observable<any> {
            const params = new HttpParams()
              .set('adherentPrincipalId', adherentPrincipalId)
            return this.http.get<any>(
              `${GlobalConfig.getEndpoint(Endpoints.ADHERANT_BY_ADHERENT_PRINCIPAL_WITH_FAMILY)}`, { params });
          }

private handleError<T>() {
    return (error: HttpErrorResponse) => {
      return throwError(error.message || 'Something went wrong');
    };
  }
}
