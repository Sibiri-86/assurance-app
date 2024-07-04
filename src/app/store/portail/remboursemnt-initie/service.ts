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
import { Remboursement, RemboursementList } from './model';
import { CheckPlafond, MontantPlafondGarantieResponse, OrdreReglement, OrdreReglementList, OrdreReglementListDirection, OrdreReglementListFinance, OrdreReglementListMedical, Prefinancement, PrefinancementList, ReponseCheckMontantRestantGarantie, TypePaiement } from '../../prestation/prefinancement/model';
import { Prestation } from '../../prestation/tierPayant/model';

@Injectable({providedIn: 'root'})
export class RemboursementService {
constructor(private http: HttpClient) {

}


posRemboursement(idAdherent: string,id: string, typePaiement: TypePaiement, numeroOrange: string, numeroMobicash: string,
  numeroVirement: string, nomBenefiniciaire: string, files: File[]): Observable<any> {
    // @FIXME: post request
    const data: FormData = new FormData();
    console.log("=====files.length===========", files.length);
    for (let i = 0; i < files.length; i++) {
      data.append('fileArray', files[i], files[i].name);
    }
    data.append('typePaiement', typePaiement);
    data.append('idAdherent', idAdherent);
    data.append('numeroOrange', numeroOrange);
    data.append('numeroMobicash', numeroMobicash);
    data.append('numeroVirement', numeroVirement);
    data.append('nomBenefiniciaire', nomBenefiniciaire);
    data.append('id', id);
    
    let headers = new HttpHeaders();
    console.log("=====data===========", data);
    headers.append('Content-Type', 'multipart/form-data');
    headers.set('Accept', 'application/json');
    console.log("mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm");
    console.log(`${GlobalConfig.getEndpoint(Endpoints.PORTAIL)}/createRemboursement`, data, { headers });
    return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.PORTAIL)}/createRemboursement`, data, { headers });
    
  }

  $getRemboursement(numero: number): Observable<RemboursementList> {
    // @FIXME: get request
    return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.PORTAIL)}/createRemboursement/${numero}`).pipe(
        map((response: RemboursementList) => response),
        catchError(this.handleError())
    );
}
validerRemboursementPrestataion(remboursement: Remboursement): Observable<any> {
  // @FIXME: post request
  return this.http.patch(`${GlobalConfig.getEndpoint(Endpoints.PORTAIL)}/createRemboursement/delete`, remboursement);
}
validerRemboursementMedecal(remboursement: Remboursement): Observable<any> {
  // @FIXME: post request
  return this.http.patch(`${GlobalConfig.getEndpoint(Endpoints.PORTAIL)}/createRemboursement/delete`, remboursement);
}
$getRemboursementMedical(): Observable<RemboursementList> {
  // @FIXME: get request
  return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.PORTAIL)}/createRemboursement/medical`).pipe(
      map((response: RemboursementList) => response),
      catchError(this.handleError())
  );
}

$getRemboursementPrestation(): Observable<RemboursementList> {
  // @FIXME: get request
  return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.PORTAIL)}/createRemboursement/prestation`).pipe(
      map((response: RemboursementList) => response),
      catchError(this.handleError())
  );
}

posPrefinancement(prefinancement: Array<Prefinancement>): Observable<any> {
    // @FIXME: post request
    return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.PRESTATION_PREFINANCEMENT)}/enregistrer`, prefinancement);
  }

  checkPrefinancement(prefinancement: Array<Prefinancement>): Observable<any> {
    // @FIXME: post request
    return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.PRESTATION_PREFINANCEMENT)}/consulter`, prefinancement);
  }

  checkPlafondSousActe(plafond: CheckPlafond): Observable<any> {
    // @FIXME: post request
    return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.PRESTATION_PREFINANCEMENT)}/checkPlafond`, plafond);
  }

  searchPrefinancement(matricule: number, dateDeclaration: string): Observable<any> {
    // @FIXME: post request
    return this.http.get(`${GlobalConfig.getEndpoint(Endpoints.PRESTATION_PREFINANCEMENT)}/consulter`, {params :
      this.createRequestOption({matricule, dateDeclaration})});
  }

  findTauxSousActe(groupeId: string, sousActeId: string, idAdherent: string): Observable<any> {
    // @FIXME: post request
    return this.http.get(`${GlobalConfig.getEndpoint(Endpoints.PRESTATION_PREFINANCEMENT)}/taux`, {params :
      this.createRequestOption({groupeId, sousActeId, idAdherent})});;
  }
  
  searchOrdreReglement(numero: string, date: string): Observable<any> {
    // @FIXME: post request
    return this.http.get(`${GlobalConfig.getEndpoint(Endpoints.PRESTATION_PREFINANCEMENT)}/ordreReglement/consulter`, {params :
      this.createRequestOption({numero, date})});
  }

  putUpdatePrefinancement(prefinancement: Prefinancement, etat: TypeEtatSinistre): Observable<any> {
    // @FIXME: post request
    return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.PRESTATION_PREFINANCEMENT)}/etat/${etat}`, prefinancement);
  }

  deletePrestation(prestation: Prestation): Observable<any> {
    // @FIXME: post request
    return this.http.patch(`${GlobalConfig.getEndpoint(Endpoints.PRESTATION_PREFINANCEMENT)}/prestation/${prestation.id}`, null);
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


  $getOrdreReglement(): Observable<OrdreReglementList> {
    // @FIXME: get request
    return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.PRESTATION_PREFINANCEMENT)}/ordreReglement`).pipe(
        map((response: OrdreReglementList) => response),
        catchError(this.handleError())
    );
}

  $getOrdreReglementValide(): Observable<OrdreReglementList> {
    // @FIXME: get request
    return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.PRESTATION_PREFINANCEMENT)}/ordreReglement/valide`).pipe(
        map((response: OrdreReglementList) => response),
        catchError(this.handleError())
    );
  }

  $getPrefinancement(): Observable<PrefinancementList> {
    // @FIXME: get request
    return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.PRESTATION_PREFINANCEMENT)}`).pipe(
        map((response: PrefinancementList) => response),
        catchError(this.handleError())
    );
}

$getPrefinancementValide(): Observable<PrefinancementList> {
    // @FIXME: get request
    return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.PRESTATION_PREFINANCEMENT)}/valide`).pipe(
        map((response: PrefinancementList) => response),
        catchError(this.handleError())
    );
}

$getOrdrePaiementInstance(): Observable<OrdreReglementList> {
  // @FIXME: get request
  return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.PRESTATION_PREFINANCEMENT)}/ordreReglement/instance`).pipe(
      map((response: OrdreReglementList) => response),
      catchError(this.handleError())
  );
}

$getOrdrePaiementInstanceCheque(): Observable<OrdreReglementList> {
  // @FIXME: get request
  return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.PRESTATION_PREFINANCEMENT)}/ordreReglement/cheque`).pipe(
      map((response: OrdreReglementList) => response),
      catchError(this.handleError())
  );
}

$getOrdrePaiementValide(): Observable<OrdreReglementList> {
  // @FIXME: get request
  return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.PRESTATION_PREFINANCEMENT)}/ordreReglement/paiement-valide`).pipe(
      map((response: OrdreReglementList) => response),
      catchError(this.handleError())
  );
}

paiementEspece(ordre: OrdreReglement): Observable<any> {
  // @FIXME: post request
  return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.PRESTATION_PREFINANCEMENT)}/ordreReglement/paiement-espece`, ordre);
}


paiementCheque(ordre: OrdreReglement): Observable<any> {
  // @FIXME: post request
  return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.PRESTATION_PREFINANCEMENT)}/ordreReglement/paiement-cheque`, ordre);
}

paiementChequeCaisseDevalider(ordre: OrdreReglement): Observable<any> {
  // @FIXME: post request
  return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.PRESTATION_PREFINANCEMENT)}/ordreReglement/paiement-devalider`, ordre);
}

checkMontantRestantPlafond(assureId: string, exerciceId: string, familleActeId: string, groupeId: string): Observable<MontantPlafondGarantieResponse> {
  // @FIXME: post request
  if (assureId && exerciceId && familleActeId && groupeId) {
    const adherent : ReponseCheckMontantRestantGarantie = {};
    adherent.assureId = assureId;
    adherent.exerciceId = exerciceId;
    adherent.familleActeId = familleActeId; 
    adherent.groupeId = groupeId; 
  return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.PRESTATION_PREFINANCEMENT)}/checkMontantRestantPlafond`, adherent).pipe(
    map((response: MontantPlafondGarantieResponse) => response)
    //catchError(this.handleError())
   );
  }
}

$getOrdreReglementValideAndWorkFlowMedical(): Observable<OrdreReglementListMedical> {
  // @FIXME: get request
  return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.PRESTATION_PREFINANCEMENT)}/ordreReglement/valide/medical`).pipe(
      map((response: OrdreReglementListMedical) => response),
      catchError(this.handleError())
  );
}

$getOrdreReglementValideAndWorkFlowFinance(): Observable<OrdreReglementListFinance> {
  // @FIXME: get request
  return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.PRESTATION_PREFINANCEMENT)}/ordreReglement/valide/finance`).pipe(
      map((response: OrdreReglementListFinance) => response),
      catchError(this.handleError())
  );
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
