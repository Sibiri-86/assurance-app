import { KeycloakService } from 'keycloak-angular';
import { environment } from 'src/environments/environment';

export function initializeKeycloak(
  keycloak: KeycloakService
  ) { /*
   initOptions: {
          onLoad: 'check-sso',
          checkLoginIframe: false
        },
        enableBearerInterceptor: true,
        bearerPrefix: 'Bearer',
        bearerExcludedUrls: [
            '/assets',
            '/clients/public']
            */
    return () =>
      keycloak.init({
        config: {
          url: environment.keycloakConfig.url,
          realm:  environment.keycloakConfig.realm,
          clientId:  environment.keycloakConfig.clientId
        },
        initOptions: {
          onLoad: 'login-required',
          checkLoginIframe: false
        },
        enableBearerInterceptor: true,
        bearerPrefix: 'Bearer',
        bearerExcludedUrls: [
            '/assets',
            '/clients/public']
      })
}
