import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Observer } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';

export const createRequestOption = (req?: any): HttpParams => {
  let options: HttpParams = new HttpParams();
  if (req) {
    Object.keys(req).forEach(key => {
      if (key !== 'sort' && key !== 'type' &&
          req[key] !== null && req[key] !== undefined) {
        options = options.set(key, req[key]);
      }
    });
    if (req.sort) {
      req.sort.forEach(val => {
        options = options.append('sort', val);
      });
    }
  }
  return options;
};
@Injectable()
export class LoaderService {
  public isLoading = new BehaviorSubject(false);
  public requests = new Subject<Array<HttpRequest<any>>>();

  constructor() {
  }

  setRequests(reqs: HttpRequest<any>[]) {
    this.requests.next(reqs);
  }

  getRequests() {
    return this.requests.asObservable();
  }
}

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  private requests: Array<HttpRequest<any>> = [];

  constructor(private loaderService: LoaderService) {
    loaderService.getRequests().subscribe(reqs => {
      this.requests = reqs || [];
    });
  }

  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }

    this.loaderService.isLoading.next(this.requests.length > 0);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url.includes('/csrf')) {
      this.requests.push(req);
      this.loaderService.isLoading.next(true);
    }

    // We create a new observable which we return instead of the original
    return new Observable((observer: Observer<any>) => {

      // And subscribe to the original observable to ensure the HttpRequest is made
      const subscription = next.handle(req)
          .subscribe(
              event => {
                if (event instanceof HttpResponse) {
                  this.removeRequest(req);
                  observer.next(event);
                }
              },
              err => {
                this.removeRequest(req);
                observer.error(err);
              },
              () => {
                this.removeRequest(req);
                observer.complete();
              });

      // return teardown logic in case of cancelled requests
      return () => {
        this.removeRequest(req);
        subscription.unsubscribe();
      };
    });
  }
}
