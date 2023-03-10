import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GlobalConfig } from 'src/app/config/global.config';
import { Endpoints } from 'src/app/config/module.endpoints';
import { ProduitPharmaceutiqueExclu, ProduitPharmaceutiqueExcluEntite, ProduitPharmaceutiqueExcluEntiteList } from '../../parametrage/produit-pharmaceutique-exclu/model';
import { Prefinancement } from '../../prestation/prefinancement/model';
import { Sinistre } from '../../prestation/tierPayant/model';
import { ConsommationPortail, DepenseFamille, PrefinancementPortail, TiersPayantPortail} from './model';

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

fetchFactureEnCoursByMatriculeAndOrdreEnCours$(numero: string): Observable<any> {
    // @FIXME: post request+
    console.log('========Recapitulatif=========>', numero);
    return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.PORTAIL)}/suivi-facture-en-cours`, numero);
}

fetchFactureEnCoursByMatriculeAndOrdreValid$(numero: string): Observable<any> {
    // @FIXME: post request+
    console.log('========Recapitulatif=========>', numero);
    return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.PORTAIL)}/suivi-facture-valid`, numero);
}

fetchFactureEnCoursByMatriculeAndOrdreValidAndPaiementValid$(numero: string): Observable<any> {
    // @FIXME: post request+
    console.log('========Recapitulatif=========>', numero);
    return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.PORTAIL)}/suivi-facture-valid-paiement-valid`, numero);
}

postProduitPharmaceutiqueExclu(produitPharmaceutiqueExclu: ProduitPharmaceutiqueExcluEntite): Observable<any> {
    // @FIXME: post request
    return this.http.post(`${GlobalConfig.getEndpoint(Endpoints.PORTAIL)}/createProduitPharmaceutiqueExclu`, produitPharmaceutiqueExclu);
  }

  $getProduitPharmaceutiqueExclu(): Observable<ProduitPharmaceutiqueExcluEntiteList> {
    // @FIXME: get request
    return this.http.get( `${GlobalConfig.getEndpoint(Endpoints.PORTAIL)}/getProduitPharmaceutiqueExclu`).pipe(
      map((response: ProduitPharmaceutiqueExcluEntiteList) => response),
      catchError(this.handleError())
    );
  }

  getProduitPharmaceutiqueExcluEntiteDtoBySourcripteurAndGroupe(produitPharmaceutiqueExclu: ProduitPharmaceutiqueExcluEntite): Observable<any> {
    // @FIXME: get request
    return this.http.put( `${GlobalConfig.getEndpoint(Endpoints.PORTAIL)}/ProduitPharmaceutiqueExclu-sous-groupe`, produitPharmaceutiqueExclu).pipe(
        map((response: any) => response),
        catchError(this.handleError())
    );
}

findRacheteInExcluList(produitPharmaceutiqueExclu: ProduitPharmaceutiqueExclu): Observable<any> {
    // @FIXME: get request
    return this.http.put( `${GlobalConfig.getEndpoint(Endpoints.PORTAIL)}/find-rachat-by-sous-groupe`, produitPharmaceutiqueExclu).pipe(
        map((response: any) => response),
        catchError(this.handleError())
    );
}

updateRachatExclusion(produitPharmaceutiqueExclu: Array<ProduitPharmaceutiqueExclu>): Observable<any> {
  // @FIXME: get request
  return this.http.put( `${GlobalConfig.getEndpoint(Endpoints.PORTAIL)}/update-rachat-exclusion`, produitPharmaceutiqueExclu).pipe(
      map((response: any) => response),
      catchError(this.handleError())
  );
}

fetchDepenseAndFamille$(depenseFamille: ConsommationPortail): Observable<any> {
  // @FIXME: post request+
  console.log('========Recapitulatif=========>', depenseFamille);
  return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.PORTAIL)}/assureConsommation-and-famille`, depenseFamille);
}

fetchDepenseSinistreAndFamille$(depenseFamille: PrefinancementPortail): Observable<any> {
  // @FIXME: post request+
  console.log('========Recapitulatif=========>', depenseFamille);
  return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.PORTAIL)}/assureConsommation-sinistre-and-famille`, depenseFamille);
}

fetchDepenseSinistreTiersPayantAndFamille$(depenseFamille: TiersPayantPortail): Observable<any> {
  // @FIXME: post request+
  console.log('========Recapitulatif=========>', depenseFamille);
  return this.http.put(`${GlobalConfig.getEndpoint(Endpoints.PORTAIL)}/assureConsommation-sinistre-tiers-payant-and-famille`, depenseFamille);
}

  private handleError<T>() {
    return (error: HttpErrorResponse) => {
      return throwError(error.message || 'Something went wrong');
    };
  }


}
