import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';

@Injectable({providedIn: 'root'})
export class ConfigService {
  KEYCLOAK_URL: string = environment.keycloakConfig.url;
  KEYCLOAK_REALM: string = environment.keycloakConfig.realm;
  KEYCLOAK_CLIENT_ID: string = environment.keycloakConfig.clientId;
}
