import { PrimeNGConfig } from 'primeng/api';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { fromEvent, Subject } from 'rxjs';
import { Router } from '@angular/router';
import {takeUntil } from 'rxjs/operators';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
    theme = 'blue';
    layout = 'layout-blue';
    layoutMode = 'horizontal';
    wrapperMode = false;
    inputStyle = 'outlined';
    ripple: boolean;
    destroy$: Subject<boolean> = new Subject<boolean>();
    callRefreshStartTime: number;
    seconds: number;

    constructor(private primengConfig: PrimeNGConfig, private router: Router, private keycloakService: KeycloakService) {
     }

    ngOnInit() {
        this.primengConfig.ripple = true;
        this.ripple = true;

        this.callRefreshStartTime = new Date().getTime();

        fromEvent(document, 'mousedown').pipe(takeUntil(this.destroy$)).subscribe(e => {
        this.refreshToken();
    });

        fromEvent(document, 'keypress').pipe(takeUntil(this.destroy$)).subscribe(e => {
        this.refreshToken();
    });
    }

    refreshToken(): void {
        const interval = (window as any).globalConfig.refreshTokenFunctionCallTimeSpan;
        if (new Date().getTime() - this.callRefreshStartTime >= interval) {
          this.callRefreshStartTime = new Date().getTime();
          const minTokenValidity = (window as any).globalConfig.refreshTokenMinTokenValidity;
          this.keycloakService.updateToken(minTokenValidity).then(refreshed => {
            if (refreshed) {
              console.log('Keycloak Token refreshed after ' + minTokenValidity + ' ms');
            } else {
              console.log('Keycloak Token still valid ');
            }
          }).catch(error => {
            console.error('Error occurred when refreshing the token: ' + error);
          });
        }
      }

      ngOnDestroy(): void {
        this.destroy$.next(true);
        // Now let's also unsubscribe from the subject itself:
        this.destroy$.unsubscribe();
      }
}
