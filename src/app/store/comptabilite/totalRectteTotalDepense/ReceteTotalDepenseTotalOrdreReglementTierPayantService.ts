import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GlobalConfig } from "src/app/config/global.config";
import { Endpoints } from "src/app/config/module.endpoints";
@Injectable({providedIn: 'root'})

export class ReceteTotalDepenseTotalOrdreReglementTierPayantService{
    constructor(private http: HttpClient) {}

    apiUrl =  GlobalConfig.getEndpoint(Endpoints.COMPTABILITE_APPROVISIONNEMENT);

  // Récupérer toutes les recettes ordonnées par ID décroissant
  getAllOrderedDesc(page: number, size: number): Observable<any> {
    console.log("datadatadata Service",  page, size);

    return this.http.get(`${this.apiUrl}/all?page=${page}&size=${size}`);
  }

  // Récupérer les recettes selon une plage de dates
  getByDateRange(startDate: string, endDate: string, page: number, size: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/by-date?startDate=${startDate}&endDate=${endDate}&page=${page}&size=${size}`);
  }

  // Récupérer les recettes selon un compte spécifique
  getByCompteId(compteId: string, page: number, size: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/by-compte?compteId=${compteId}&page=${page}&size=${size}`);
  }

  // Récupérer les recettes selon un compte spécifique
  findfirst(): Observable<any> {
    return this.http.get(`${this.apiUrl}/first`);
  }
}