import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor } from './interceptor';

export const httpInterceptProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true}
];
