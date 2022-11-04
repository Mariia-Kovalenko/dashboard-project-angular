import { inject, TestBed } from '@angular/core/testing';

import { AuthInterceptorService } from './auth-interceptor.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient, HttpHeaders } from '@angular/common/http';


describe('Authentication Interceptor', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                {
                provide: HTTP_INTERCEPTORS,
                useClass: AuthInterceptorService,
                multi: true,
                },
            ],
        });
    });

    it('should add authorization header', inject(
        [HttpClient, HttpTestingController],
            (http: HttpClient, httpTestingController: HttpTestingController) => {
                let response;
                const user = {jwt_token: '34567890f09876543poikjhgbvfde4r5678ikjnbvfrt56y'}
                const headers = new HttpHeaders({'authorization': 'Bearer ' + user.jwt_token});
            
                http.get('/', { headers }).subscribe(res => response = res);
            
                const req = httpTestingController.expectOne('/');
                expect(req.request.headers.get('authorization')).toBeTruthy();
            
                req.flush(true);
                httpTestingController.verify();
            }
    ));
})