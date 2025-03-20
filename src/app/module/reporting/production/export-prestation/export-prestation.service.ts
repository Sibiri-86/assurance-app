import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConfig } from 'src/app/config/global.config';
import { Endpoints } from 'src/app/config/module.endpoints';

@Injectable({
  providedIn: 'root'
})
export class ExportPrestationService {

constructor(private http: HttpClient) {}

    exportPrestationPrefincementTierPayantToExcel(dateDebut: string, dateFin: string, choose: string) {
      
      const formattedDateDebut = new Date(dateDebut).toISOString().split('T')[0];
      const formattedDateFin = new Date(dateFin).toISOString().split('T')[0];
    
      const params = new HttpParams()
        .set('dateDebut', formattedDateDebut)
        .set('dateFin', formattedDateFin)
        .set('choose', choose);
  
      return this.http.get(GlobalConfig.getEndpoint(Endpoints.PRESTATION_EXPORT_PREFINANCEMENT_TIER_PAYANT), { 
        params,
        responseType: 'blob'
      });
    }
}
