import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { Account } from 'app/core/user/account.model';
import { KeycloakService } from 'keycloak-angular';

@Injectable({ providedIn: 'root' })
export class AccountService {
  name = '';
  role = '';
  listAuthorities: String[];
  
  private userIdentity: Account;
  private authenticated = false;
  private authenticationState = new Subject<any>();
  private accountCache$: Observable<Account>;

  constructor(private http: HttpClient, public keycloak: KeycloakService) {
    console.log('les roles du user est'+this.keycloak.getUserRoles());
    this.listAuthorities = this.keycloak.getUserRoles();
      this.keycloak.loadUserProfile().then(profile => {
        console.log("===========profile===========>", profile['attributes'].role);
        this.name = profile.firstName + ' ' + profile.lastName;
        if (profile['attributes'].role.length != 0){
        this.role = profile['attributes'].role[0]; //gives you array of all attributes of user, extract what you need
        }
        console.log("oooooooooooothis.keycloak.getToken 12", this.keycloak.getToken());
      })
  }

  fetch(): Observable<Account> {
    return this.http.get<Account>(SERVER_API_URL + 'api/account');
  }

  save(account: Account): Observable<Account> {
    return this.http.post<Account>(SERVER_API_URL + 'api/account', account);
  }

  authenticate(identity) {
    this.userIdentity = identity;
    this.authenticated = identity !== null;
    this.authenticationState.next(this.userIdentity);
  }

  hasAnyAuthority(authorities: string[] | string): boolean {
    if (!this.authenticated || !this.userIdentity || !this.userIdentity.authorities) {
      return false;
    }

    if (!Array.isArray(authorities)) {
      authorities = [authorities];
    }

    return authorities.some((authority: string) => this.userIdentity.authorities.includes(authority));
  }

  identity(force?: boolean): Observable<Account> {
    if (force) {
      this.accountCache$ = null;
    }

    if (!this.accountCache$) {
      this.accountCache$ = this.fetch().pipe(
        tap(
          account => {
            if (account) {
              this.userIdentity = account;
              this.authenticated = true;
            } else {
              this.userIdentity = null;
              this.authenticated = false;
            }
            this.authenticationState.next(this.userIdentity);
          },
          () => {
            this.userIdentity = null;
            this.authenticated = false;
            this.authenticationState.next(this.userIdentity);
          }
        ),
        shareReplay()
      );
    }
    return this.accountCache$;
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  isIdentityResolved(): boolean {
    return this.userIdentity !== undefined;
  }

  getAuthenticationState(): Observable<any> {
    return this.authenticationState.asObservable();
  }

  getImageUrl(): string {
    return this.isIdentityResolved() ? this.userIdentity.imageUrl : null;
  }
}
