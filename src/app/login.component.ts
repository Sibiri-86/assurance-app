import { AfterViewInit, Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { User } from './store/contrat/exercice/model';
import { ExerciceService } from './store/contrat/exercice/service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {

    destroy$ = new Subject<boolean>();

    credentials: User = {};
    passvisible = false;

    constructor(
                private router: Router,
                private render: Renderer2,
                private exerciceSercice: ExerciceService,
                private messageService: MessageService) {
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.render.selectRootElement('#login').focus();
        }, 0);
    }

    ngOnInit(): void {
       /*  this.store.pipe(select(selectSfdCurrentUser)).pipe(takeUntil(this.destroy$))
            .subscribe(account => {
                if (account) {
                    this.account = account;
                    this.store.pipe(select(selectSfdLoginData)).pipe(takeUntil(this.destroy$))
                        .subscribe(data => {
                            if (data.previousUrl) {
                                this.router.navigate([data.previousUrl]);
                            } else {
                                this.router.navigate(['']);
                            }
                        });
                }
            });
 */
        this.checkStatus();
    }

    checkStatus() {
       /*  this.store.pipe(select(selectRequestStatus)).pipe(takeUntil(this.destroy$))
            .subscribe(statusObj => {
                if (statusObj) {
                    this.showToast(statusObj.status, 'INFORMATION', statusObj.message);
                }
            }); */
    }

    login() {
        if (this.credentials.password && this.credentials.userName) {
            this.exerciceSercice.login(this.credentials).subscribe((res)=> {

            if(res) {
                console.log("==============bien=================");
            }
            });
           // this.store.dispatch(GetLogin(this.credentials));
        }
    }

    handleVisibility() {
        this.passvisible = !this.passvisible;
    }

    showToast(severity: string, summary: string, detail: string) {
        this.messageService.add({severity, summary, detail});
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

}
