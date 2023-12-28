
import {Adherent, AdherentList, AdherentResearchReponse, ConditionGenerale, ConditionGeneraleList} from './model';
import { HttpClient, HttpEvent, HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {GlobalConfig} from '../../../config/global.config';
import { AdherentFamille } from './model';
import {Endpoints} from '../../../config/module.endpoints';
import {createRequestOption} from '../../../module/util/loader-util';
import { Exercice } from '../exercice/model';

@Injectable({providedIn: 'root'})
export class AdherentService {
constructor(private http: HttpClient) {}

$getAdherents(idPolice: string): Observable<AdherentList> {
    // @FIXME: get request
    return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.CONTRAT_ADHERENT)}/${idPolice}`).pipe(
      map((response: AdherentList) => response),
      catchError(this.handleError())
    );
}

$getAdherentsByExerciceAndGroupeId(idGroupe: string, exerciceId: string): Observable<AdherentList> {
  // @FIXME: get request
  return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.CONTRAT_ADHERENT)}/${idGroupe}/${exerciceId}`).pipe(
    map((response: AdherentList) => response),
    catchError(this.handleError())
  );
}

$getAdherentsAll(idGarantie: string, idPolice: string): Observable<AdherentList> {
  // @FIXME: get request
  return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.CONTRAT_ADHERENT)}`, {params: createRequestOption({idGarantie,
     idPolice})}).pipe(
    map((response: AdherentList) => response),
    catchError(this.handleError())
  );
}

$getAdherentsDistinct(idGarantie: string, idPolice: string): Observable<AdherentList> {
  // @FIXME: get request
  return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.CONTRAT_ADHERENT)}/distinct`, {params: createRequestOption({idGarantie,
     idPolice})}).pipe(
    map((response: AdherentList) => response),
    catchError(this.handleError())
  );
}

getCondition(): Observable<ConditionGeneraleList> {
  // @FIXME: get request
  return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.CONTRAT_ADHERENT)}/condition`).pipe(
    map((response: ConditionGeneraleList) => response),
    catchError(this.handleError())
  );
}
$getAdherentsDistinctGroupe(idGarantie: string, idPolice: string, idGroupe: string): Observable<AdherentList> {
  // @FIXME: get request
  return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.CONTRAT_ADHERENT)}/distinct-groupe`, {params: createRequestOption({idGarantie,
     idPolice, idGroupe})}).pipe(
    map((response: AdherentList) => response),
    catchError(this.handleError())
  );
}

posAdherent(Adherent: Adherent): Observable<any> {
    // @FIXME: post request
    return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_ADHERENT)}`, Adherent);
  }

  posConditionGenerale(conditionGenerale: ConditionGenerale): Observable<any> {
    // @FIXME: post request
    return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_ADHERENT)}/condition-generale`, conditionGenerale);
  }

  deleteConditionGenerale(conditionGenerale: ConditionGenerale): Observable<any> {
    // @FIXME: post request
    return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_ADHERENT)}/condition-generale`, conditionGenerale);
  }

  posAdherentWithFamille(adherentFamille: AdherentFamille): Observable<any> {
    // @FIXME: post request
    return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_ADHERENT_WITH_FAMILLE)}`, adherentFamille);
  }

  
  pushPhotosAdherent(file: File, idAdherent: string): Observable<any> {
    const data: FormData = new FormData();
    data.append('file', file);
    data.append('idAdherent', idAdherent);
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.set('Accept', 'application/json');
    return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_ADHERENT)}/upload`, data, { headers });
  }

  pushCondition(file: File): Observable<any> {
    const data: FormData = new FormData();
    data.append('file', file);
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.set('Accept', 'application/json');
    return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_ADHERENT)}/upload-condition`, data, { headers });
  }
  
  
  pushPhotosAdherentLot(filesList: File[]): Observable<any> {
    const data: FormData = new FormData();
    for (let i = 0; i < filesList.length; i++) {
      data.append('fileArray', filesList[i], filesList[i].name);
    }
   
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.set('Accept', 'application/json');
    return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_ADHERENT)}/upload/lot`, data, { headers });
  }

  pushcarteAdherentLot(filesList: File[], idExercice:string): Observable<any> {
    const data: FormData = new FormData();
    for (let i = 0; i < filesList.length; i++) {
      data.append('fileArray', filesList[i], filesList[i].name);
    }
    data.append('idExercice', idExercice);
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.set('Accept', 'application/json');
    return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_ADHERENT)}/upload/carte/lot`, data, { headers });
  }

  updateAdherent(Adherent: Adherent): Observable<any> {
    // @FIXME: post request
    return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_ADHERENT)}/${Adherent.id}`, Adherent);
  }

  searchAdherent(numero: number): Observable<AdherentResearchReponse> {
    // @FIXME: post request
    if (numero && numero != 0) {
    return this.http.get(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_ADHERENT)}/getByNumero/${numero}`).pipe(
      map((response: AdherentResearchReponse) => response)
      //catchError(this.handleError())
     );
    }
  }

  searchAdherentByNom(nom: string): Observable<AdherentList> {
    // @FIXME: post request
    if (nom) {
    return this.http.get(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_ADHERENT)}/getByNom/${nom}`).pipe(
      map((response: AdherentList) => response)
      //catchError(this.handleError())
     );
    }
  }

deleteAdherent(Adherent: Adherent): Observable<any> {
    // @FIXME: post request
    return this.http.patch(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_ADHERENT)}/${Adherent.id}`, Adherent);
}

deleteAdherents(adherent: Array<Adherent>): Observable<any> {
    // @FIXME: post request
    return this.http.patch(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_ADHERENT)}`, adherent);
}
    getAdherentsByPolice(idPolice: string): Observable<Adherent[]> {
        // @FIXME: get request
        return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.CONTRAT_ADHERENT_POLICE)}/${idPolice}`).pipe(
            map((response: Adherent[]) => response),
            catchError(this.handleError())
        );
    }

    findAdherantActuallList(idPolice: string): Observable<Adherent[]> {
        // @FIXME: get request
        return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.CONTRAT_ADHERENT_POLICE_ACTUALL)}/${idPolice}`).pipe(
            map((response: Adherent[]) => response),
            catchError(this.handleError())
        );
    }

    findAdherantActuallListByExerciceId(idExercice: string): Observable<Adherent[]> {
      // @FIXME: get request
      return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.CONTRAT_ADHERENT_EXERCICE_ACTUALL_LIST)}/${idExercice}`).pipe(
          map((response: Adherent[]) => response),
          catchError(this.handleError())
      );
  }

    loadAdherentsByPolice(idPolice: string): Observable<Adherent[]> {
        // @FIXME: get request
        return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.CONTRAT_ADHERENT_POLICE)}/${idPolice}`).pipe(
            map((response: Adherent[]) => response),
            catchError(this.handleError())
        );
    }



pushFileToStorage(file: File): Observable<any> {
  const data: FormData = new FormData();
  data.append('file', file);
  let headers = new HttpHeaders();
  headers.append('Content-Type', 'multipart/form-data');
  headers.set('Accept', 'application/json');
  return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_ADHERENT)}/upload`, data, { headers });
}

private handleError<T>() {
    return (error: HttpErrorResponse) => {
      return throwError(error.message || 'Something went wrong');
    };
  }

    getAdherentPrincipauxByGroupe(idGpe: string): Observable<Adherent[]> {
        // @FIXME: get request
        return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.CONTRAT_ADHERENT_PRINCIPAL_GROUPE)}/${idGpe}`).pipe(
            map((response: Adherent[]) => response),
            catchError(this.handleError())
        );
    }

    getAdherentByGroupe(idGroupe: string): Observable<AdherentList> {
        // @FIXME: get request
        return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.CONTRAT_ADHERENT)}/${idGroupe}`).pipe(
          map((response: AdherentList) => response),
          catchError(this.handleError())
        );
      
    }

    getAdherentByGroupeAndExercice(idGroupe: string, idExercice: string): Observable<AdherentList> {
      // @FIXME: get request
      return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.CONTRAT_ADHERENT)}/getAssureByGroupeAndExercice/${idGroupe}/${idExercice}`).pipe(
        map((response: AdherentList) => response),
        catchError(this.handleError())
      );
    
  }


    getListeActualisee(policeId: string): Observable<Array<Adherent>> {
      // @FIXME: get request
      // adherent/liste-actualisee
      return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.CONTRAT_ADHERENT)}/liste-actualisee`
      , {params: createRequestOption({policeId})}).pipe(
          map((response: Adherent[]) => response),
          catchError(this.handleError())
      );
  }

  getListeActualiseeFinal(exerciceId: string): Observable<Array<Adherent>> {
    // @FIXME: get request
    // adherent/liste-actualisee
    return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.CONTRAT_ADHERENT)}/liste-actualisee-by-exercice-final`
    , {params: createRequestOption({exerciceId})}).pipe(
        map((response: Adherent[]) => response),
        catchError(this.handleError())
    );
}

  findFamilleByAdherent(adherentId: string, dateSoins: Date): Observable<Array<Adherent>> {
    // @FIXME: get request
    // adherent/liste-actualisee

    if (adherentId) {
      const adherent :Adherent = {};
      adherent.dateEntree = dateSoins;
      adherent.id = adherentId; 
    return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_ADHERENT)}/famille`, adherent).pipe(
      map((response: Adherent[]) => response)
    
     );
    }
    
}

    searchAssure(numero: number): Observable<AdherentResearchReponse> {
        // @FIXME: post request
        if (numero && numero !== 0) {
            return this.http.get(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_ADHERENT)}/getAssureByNumero/${numero}`).pipe(
                map((response: AdherentResearchReponse) => response)
                // catchError(this.handleError())
            );
        }
    }


    findAll(exercice: Date): Observable<AdherentList> {
      const exerce: Exercice = {};
      exerce.debut = exercice;
      // @FIXME: post request

          return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_ADHERENT)}/findAll`, exerce).pipe(
              map((response: AdherentList) => response)
              // catchError(this.handleError())
          );
    
  }

    getAdherentPrincipalByPolice(policeId: string): Observable<Array<Adherent>> {
        // @FIXME: get request
        // adherent/liste-actualisee
        return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.CONTRAT_ADHERENT)}/find-adherent-principal-by-police`
            , {params: createRequestOption({policeId})}).pipe(
            map((response: Adherent[]) => response),
            catchError(this.handleError())
        );
    }

    $getAdherentByGroupes(idGroupe: string): Observable<AdherentList> {
      // @FIXME: get request
      return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.CONTRAT_ADHERENT)}/${idGroupe}`).pipe(
        map((response: AdherentList) => response),
        catchError(this.handleError())
      );
  }

  loadAdherentsByPoliceAndExercice(policeId: string, exoId: string): Observable<Adherent[]> {
    // @FIXME: get request
    return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.CONTRAT_ADHERENT_POLICE)}/${policeId}/${exoId}`).pipe(
        map((response: Adherent[]) => response),
        catchError(this.handleError())
    );
}

searchAdherentByDateSoinsAndMatricule(dateSoins: Date, matricule: number): Observable<AdherentResearchReponse> {
  // @FIXME: post request
  if (matricule && matricule != 0) {
    const adherent :Adherent = {};
    adherent.dateEntree = dateSoins;
    adherent.numero = matricule; 
  return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_ADHERENT)}/getByDateSoinsAndNumero`, adherent).pipe(
    map((response: AdherentResearchReponse) => response)
    //catchError(this.handleError())
   );
  }
}

searchAllAdherentByDateSoinsAndMatriculeGarant(dateSoins: Date, matriculeGarant: string): Observable<Adherent[]> {
  // @FIXME: post request
  if (matriculeGarant ) {
    const adherent :Adherent = {};
    adherent.dateEntree = dateSoins;
    adherent.matriculeGarant = matriculeGarant; 
  return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_ADHERENT)}/getAssureByMatricule-garant-adherent`, adherent).pipe(
    map((response: Adherent[]) => response)
    //catchError(this.handleError())
   );
  }
}

searchAllAdherentByDateSoinsAndSouscripteur(dateSoins: Date, nom: string): Observable<Adherent[]> {
  // @FIXME: post request
  if (nom ) {
    const adherent :Adherent = {};
    adherent.dateEntree = dateSoins;
    adherent.nom = nom; 
  return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_ADHERENT)}/getAssureBySouscripteur-adherent`, adherent).pipe(
    map((response: Adherent[]) => response)
    //catchError(this.handleError())
   );
  }
}

searchAllAdherentByDateSoinsAndSouscripteurMatriculeGarant(dateSoins: Date, nom: string,  matriculeGarant: string): Observable<Adherent[]> {
  // @FIXME: post request
  if (nom && matriculeGarant) {
    const adherent :Adherent = {};
    adherent.dateEntree = dateSoins;
    adherent.nom = nom;
    adherent.matriculeGarant = matriculeGarant; 
  return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.CONTRAT_ADHERENT)}/getAssureBySouscripteur-Matricule-garant-adherent`, adherent).pipe(
    map((response: Adherent[]) => response)
    //catchError(this.handleError())
   );
  }
}

}

