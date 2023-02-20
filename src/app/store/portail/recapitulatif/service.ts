import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable} from 'rxjs';
import { GlobalConfig } from 'src/app/config/global.config';
import { Endpoints } from 'src/app/config/module.endpoints';
import { Report } from 'src/app/store/medical/ordonnance-medical/model';
import { DepenseFamille, Recapitulatif } from './model';

@Injectable({providedIn: 'root'})
export class PortailService {
constructor(private http: HttpClient) {

}

fetchDepenseFamille$(depenseFamille: DepenseFamille): Observable<any> {
    // @FIXME: post request+
    console.log('========Recapitulatif=========>', depenseFamille);
    return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.PORTAIL)}/assureConsommation`, depenseFamille);
}

fetchDepenseAssureByMatricule$(numero: Number): Observable<any> {
    // @FIXME: post request+
    console.log('========Recapitulatif=========>', numero);
    return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.PORTAIL)}/suivi-remb`, numero);
}

fetchDepenseAssureByMatriculeAndOrdreValid$(numero: Number): Observable<any> {
    // @FIXME: post request+
    console.log('========Recapitulatif=========>', numero);
    return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.PORTAIL)}/suivi-remb-valid`, numero);
}

fetchDepenseAssureByMatriculeAndOrdreValidAndPaiementValid$(numero: Number): Observable<any> {
    // @FIXME: post request+
    console.log('========Recapitulatif=========>', numero);
    return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.PORTAIL)}/suivi-remb-valid-paiement-valid`, numero);
}

fetchfactureInitieByMatricule$(numero: string): Observable<any> {
    // @FIXME: post request+
    console.log('========Recapitulatif=========>', numero);
    return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.PORTAIL)}/suivi-facture`, numero);
}



}
