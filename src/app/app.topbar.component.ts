import { Component } from '@angular/core';
import { AppMainComponent} from './app.main.component';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {
    name = '';
    role = '';
    logOutUrl= '/';
    constructor(public app: AppMainComponent, public keycloak: KeycloakService, private router: Router) {
      console.log('les roles du user est'+this.keycloak.getUserRoles());
      this.keycloak.loadUserProfile().then(profile => {
        console.log("===========profile===========>", profile['attributes'].role);
        this.name = profile.firstName + ' ' + profile.lastName;
        if (profile['attributes'].role.length != 0){
        this.role = profile['attributes'].role[0]; //gives you array of all attributes of user, extract what you need
        }
        console.log("oooooooooooothis.keycloak.getToken 12", this.keycloak.getToken());
      })
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
}
