import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard extends KeycloakAuthGuard {
  name = '';
  roleConnecte = '';
  constructor(
    protected readonly router: Router,
    protected readonly keycloak: KeycloakService
  ) {
    super(router, keycloak);
  }

  isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
    let permission;
      if (!this.authenticated) {
        this.keycloakAngular.login().catch((e) => console.error(e));
        return reject(false);
      }

      const requiredRoles: string[] = route.data.roles;
      if (!requiredRoles || requiredRoles.length === 0) {
        permission = true;
      } else {
        if (!this.roles || this.roles.length === 0) {
        permission = false
        }
        if (requiredRoles.every((role) => this.roles.indexOf(role) > -1))
        {
            permission=true;
        } else {
            permission=false;
        };
      }
      if(!permission){
          this.router.navigate(['/']);
        /* if(!this.role && this.role != "ASSURE" || !this.role && this.role != "PRESTATAIRE" || !this.role && this.role != "GARANT" || !this.role && this.role != "SOUSCRIPTEUR") {
          this.router.navigate(['/']);
          console.log("on est rentrer laaaaaaaaaaaaaaaaa");
        } */
          
      }
      resolve(permission)
    });
  }
}