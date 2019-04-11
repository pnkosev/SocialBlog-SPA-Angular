import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MsgInterceptorService implements HttpInterceptor {
  constructor(
    private toastr: ToastrService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        tap((success: HttpEvent<any>) => {
          if (success instanceof HttpResponse) {
            if (success.body.message || success.body.message !== '') {
              // tslint:disable-next-line: no-string-literal
              this.toastr.success(success.body.message);
            }
          }
        }), catchError((err: HttpErrorResponse) => {
          this.toastr.error(err.error.message);
          if (err.error.errors) {
            const errors = (err.error.errors).reduce((obj, key) => {
              // tslint:disable-next-line: no-string-literal
              obj[key['param']] = key['msg'];
              return obj;
            }, {});
            Object.keys(errors).forEach((e) => this.toastr.error(errors[e]));
          }
          return throwError(err);
        })
      );
  }
}
