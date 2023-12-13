import { Component, OnInit } from '@angular/core';
import { AppMainComponent} from './app.main.component';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import { Router } from '@angular/router';
import { Adherent } from './store/contrat/adherent/model';
import { Observable, Subject } from 'rxjs';
import { AppState } from './store/app.state';
import { Store, select } from '@ngrx/store';
import * as featureActionAdherent from './store/contrat/adherent/actions';
import * as adherentSelector from './store/contrat/adherent/selector';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit{
    name = '';
    role = '';
    logOutUrl= '/';
    destroy$ = new Subject<boolean>();
    adherent: Adherent = {};
    adherentSelected$: Observable<Adherent>;
    constructor( private store: Store<AppState>,public app: AppMainComponent, public keycloak: KeycloakService, private router: Router) {
      

     
    }

    async lagout() {
      console.log('deconnecter');
      // this.router.navigateByUrl('/');
      await this.keycloak.logout()
      /* .then(() => {
        this.keycloak.getToken();
        console.log("oooooooooooothis.keycloak.getToken 1", this.keycloak.getToken());
        this.keycloak.clearToken();
        console.log("oooooooooooothis.keycloak.getToken 2", this.keycloak.getToken());
      }) */;
    }

    ngOnInit(): void {
      console.log('les roles du user est'+this.keycloak.getUserRoles());
      this.keycloak.loadUserProfile().then(profile => {
        console.log("===========profile===========>", profile['attributes'].role);
        this.name = profile.firstName + ' ' + profile.lastName;
        if (profile['attributes'].role){
        this.role = profile['attributes'].role[0]; //gives you array of all attributes of user, extract what you need
        }
        this.adherentSelected$ = this.store.pipe(select(adherentSelector.selectedAdherent));
        this.store.dispatch(featureActionAdherent.searchAdherentByDateSoinsAndMatricule({dateSoins:new Date(), matricule: parseInt(profile.username)}));;
  
         this.adherentSelected$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
             console.log(value);
             if (value) {
               this.adherent = value;
               this.adherent.urlPhoto = value.urlPhoto?.replace("http", "https")?.replace(":92", "");
               console.log('deconnecter');
               //this.images.push(this.adherent.urlPhoto);
               console.log(this.adherent);
     
             }
           });
        console.log("oooooooooooothis.keycloak.getToken 12", this.keycloak.getToken());
      });
    }
}
