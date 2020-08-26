import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler) {

        const idToken = localStorage.getItem('token');

        if (idToken) {
            const req = request.clone({
                setHeaders: {
                    Authorization: 'mr_tracker ' + idToken
                }
            });
            return next.handle(req);
        } else {
            return next.handle(request);
        }
    }
}
 