import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, of } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { CookieService } from './CookieService';
import { CredentialsUser } from '../models/CredentialsUser';
import { Token } from '../models/Token';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private readonly urlBase: string = environment.apiToken;

    constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) { }//

    async sendCredentials(credentialsUser: CredentialsUser): Promise<string> {
        if (this.cookieService.check('appToken')) {
            return this.cookieService.get('appToken');
        } else {
            const post = this.http.post<Token>(`${this.urlBase}/GenerateToken`, credentialsUser).pipe(
                retry(0),
                tap((body: any) => {
                    const decodedJWT = JSON.parse(window.atob(body.accessToken.split('.')[1]));
                    const expireCookie = new Date(decodedJWT.exp * 1000);
                    this.cookieService.set('appToken', body.accessToken, expireCookie);
                }),
                catchError(() => of(''))
            );
            return await firstValueFrom(post);
        }
    }
}