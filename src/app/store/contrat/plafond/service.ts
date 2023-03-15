import { from } from "rxjs";
import {Bareme, BaremeList, Plafond, PlafondConfig, PlafondList} from "./model";
import {HttpClient, HttpEvent, HttpRequest, HttpHeaders, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {GlobalConfig} from '../../../config/global.config';
import {Endpoints} from '../../../config/module.endpoints';
import { Groupe } from "../groupe/model";
import {PlafondActe, PlafondFamilleActe, PlafondSousActe} from '../../parametrage/plafond/model';
import {createRequestOption} from '../../../module/util/loader-util';
import {AdherentResearchReponse} from '../adherent/model';

@Injectable({providedIn: 'root'})
export class PlafondService {
constructor(private http: HttpClient) {}

$getPlafonds(): Observable<PlafondList> {
    // @FIXME: get request
    return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.CONTRAT_PLAFOND)}`).pipe(
      map((response: PlafondList) => response),
      catchError(this.handleError())
    );
  }

$getPlafondsByGroupe(groupe: Groupe): Observable<any> {
    // @FIXME: get plafond by groupe
    console.log(groupe);
    if(groupe){
    return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_PLAFOND)}/consulter`, groupe);
    }
  }

posPlafond(Plafond: Plafond): Observable<any> {
    // @FIXME: post request
    return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_PLAFOND)}`, Plafond);
  }

updatePlafond(Plafond: Plafond): Observable<any> {
    // @FIXME: post request
    return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_PLAFOND)}/${Plafond.id}`, Plafond);
  }

deletePlafond(Plafond: Plafond): Observable<any> {
    // @FIXME: post request
    return this.http.patch(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_PLAFOND)}/${Plafond.id}`, null);
}

deletePlafonds(plafond: Array<Plafond>): Observable<any> {
    // @FIXME: post request
    return this.http.patch(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_PLAFOND)}`, plafond);
}

/**service pour le parametrage des baremes */
postBareme(bareme: Bareme): Observable<any> {
  // @FIXME: post request
  return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.BAREME)}`, bareme);
}

updateBareme(bareme: Bareme): Observable<any> {
  // @FIXME: post request
  return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.BAREME)}/${bareme.id}`, bareme);
}

deleteBareme(bareme: Bareme): Observable<any> {
  // @FIXME: post request
  return this.http.patch(`${GlobalConfig.getEndpoint(Endpoints.BAREME)}/${bareme.id}`, bareme);
}

$getBaremes(): Observable<BaremeList> {
  // @FIXME: get request
  return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.BAREME)}`).pipe(
    map((response: BaremeList) => response),
    catchError(this.handleError())
  );
}

$getBaremesConfig(typeBareme: string, taux: number): Observable<PlafondConfig> {
  // @FIXME: get request
  if(typeBareme && taux){
  return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.BAREME)}/config/${typeBareme}/${taux}`).pipe(
    map((response: PlafondConfig) => response),
    catchError(this.handleError())
  );
  }
}

$getBaremesConfigSansTaux(typeBareme: string): Observable<PlafondConfig> {
  // @FIXME: get request
  if(typeBareme){
  return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.BAREME)}/config/${typeBareme}`).pipe(
    map((response: PlafondConfig) => response),
    catchError(this.handleError())
  );
  }
}

pushFileToStorage(file: File): Observable<any> {
  const data: FormData = new FormData();
  data.append('file', file);
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'multipart/form-data');
  headers.set('Accept', 'application/json');
  return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_PLAFOND)}/upload`, data, { headers: headers });
}

private handleError<T>() {
    return (error: HttpErrorResponse) => {
      return throwError(error.message || 'Something went wrong');
    };
  }

    getPlafondGroupeFamilleActeByGroupe(idGroupe: string): Observable<HttpResponse<PlafondFamilleActe[]>> {
        return this.http.get<PlafondFamilleActe[]>(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_PLAFOND)}/famille-acte-groupe`,
            {params: createRequestOption({idGroupe}), observe: 'response'});
    }

    getPlafondGroupeActeByGroupe(idGroupe: string): Observable<HttpResponse<PlafondActe[]>> {
        return this.http.get<PlafondActe[]>(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_PLAFOND)}/acte-groupe`,
            {params: createRequestOption({idGroupe}), observe: 'response'
        });
    }

    getPlafondGroupeSousActeByGroupe(idGroupe: string): Observable<HttpResponse<PlafondSousActe[]>> {
        return this.http.get<PlafondSousActe[]>(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_PLAFOND)}/sous-acte-groupe`,
            {params: createRequestOption({idGroupe}), observe: 'response'}
        );
    }

    getPlafondEnCours(numero: number): Observable<Array<PlafondFamilleActe>> {
        // @FIXME: post request
        if (numero && numero !== 0) {
            return this.http.get(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_PLAFOND)}/getPlafondByAssureId/${numero}`).pipe(
                map((response: Array<PlafondFamilleActe>) => response)
                // catchError(this.handleError())
            );
        }
      }

      getPlafondActeEnCours(idPGFA: string): Observable<Array<PlafondActe>> {
        // @FIXME: post request
            return this.http.get(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_PLAFOND)}/findPlafondGroupeActesByPlafondFamilleActeId/${idPGFA}`).pipe(
                map((response: Array<PlafondActe>) => response)
                // catchError(this.handleError())
            );
      }

      getPlafondSousActeEnCours(idPGA: string): Observable<Array<PlafondSousActe>> {
        // @FIXME: post request
            return this.http.get(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_PLAFOND)}/findPlafondGroupeSousActesByPlafondActeId/${idPGA}`).pipe(
                map((response: Array<PlafondSousActe>) => response)
                // catchError(this.handleError())
            );
      }

    getPlafondGroupeByGroupe(groupeId: string): Observable<HttpResponse<Plafond>> {
        return this.http.get<Plafond>(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_PLAFOND)}/plafond-goupe-by-groupe`,
            {params: createRequestOption({groupeId}), observe: 'response'}
        );
    }

    getPlafondGroupeyGroupe(idGroupe: string): Observable<HttpResponse<Plafond>> {
      return this.http.get<Plafond>(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_PLAFOND)}/plafond-groupe`,
          {params: createRequestOption({idGroupe}), observe: 'response'});
  }

  getPlafondGroupeFamilleActeByGroupeAndExerciceId(idExo: string, idGroupe: string): Observable<HttpResponse<PlafondFamilleActe[]>> {
    return this.http.get<PlafondFamilleActe[]>(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_PLAFOND)}/famille-acte-groupe-byGroupe-andExercice`,
        {params: createRequestOption({idExo,idGroupe}), observe: 'response'});
}

findBaremeByUserConnect(username: string): Observable<HttpResponse<PlafondSousActe[]>> {
  return this.http.get<PlafondSousActe[]>(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_PLAFOND)}/username-connect`,
      {params: createRequestOption({username}), observe: 'response'});
}

findGarantieByUserConnect(username: string): Observable<HttpResponse<PlafondFamilleActe[]>> {
  return this.http.get<PlafondFamilleActe[]>(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_PLAFOND)}/garantie/username-connect`,
      {params: createRequestOption({username}), observe: 'response'});
}

getPlafondGroupeFamilleActeByGroupeAndExerciceIdRenouv(idGroupe: string, idExercice: string): Observable<HttpResponse<PlafondFamilleActe[]>> {
  return this.http.get<PlafondFamilleActe[]>(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_PLAFOND)}/famille-acte-groupe-byGroupe-and-Exercice-Renouv`,
      {params: createRequestOption({idGroupe, idExercice}), observe: 'response'});
}
}

