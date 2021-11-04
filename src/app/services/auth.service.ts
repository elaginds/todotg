import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {tap, shareReplay, catchError} from 'rxjs/operators';
// import { do } from 'rxjs/operators';
import * as moment from 'moment';
import {Moment} from 'moment';
import {JwtHelperService } from '@auth0/angular-jwt';

const jwtHelper = new JwtHelperService();
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private static setSession(authResult): void {
    const expiresAt = moment().add(authResult.expiresIn, 'second');

    localStorage.setItem('token', authResult.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()) );
  }

  constructor(private http: HttpClient/*,
              public jwtHelper: JwtHelperService*/) {
  }

  login(login: string, password: string ): Observable<any> {
    /*return this.http.post<User>('/api/login', {email, password})
      .tap(res => this.setSession)
      .shareReplay();*/

    return this.http.post('/api/login', {login, password})
      .pipe(
        /*catchError((err) => {
          console.log(err);
          return throwError(err);
        }),*/
        tap(res => AuthService.setSession(res)),
        shareReplay()
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
  }

  public isLoggedIn(): boolean {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  getExpiration(): Moment {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false

    return !jwtHelper.isTokenExpired(token);
  }
}
