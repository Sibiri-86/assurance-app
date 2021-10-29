import { Component } from '@angular/core';
import { AppMainComponent} from './app.main.component';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {
    name:string="";
    role:string ="";
    constructor(public app: AppMainComponent, public keycloak: KeycloakService) {
      this.keycloak.loadUserProfile().then(profile => {
        this.name =profile.firstName + " "+ profile.lastName;
        if(profile['attributes'].role.length!=0){
        this.role=profile['attributes'].role[0]; //gives you array of all attributes of user, extract what you need
        }
      })
    }

    lagout(){
      this.keycloak.logout();
    }
}
