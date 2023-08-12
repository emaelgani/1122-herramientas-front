import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { environments } from 'src/environments/environments';
import { LoginResponse } from '../interfaces/login-response.interface';
import { User } from '../interfaces/user.interface';
import { AuthStatus } from '../interfaces/auth-status.enum';
import { CheckTokenResponse } from '../interfaces/check-token.response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environments.baseUrl;
  private http = inject(HttpClient);
  private _currentUser = signal<string | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);


  //! Al mundo exterior.
  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());


  constructor() {
    this.checkAuthStatus().subscribe();
  }

  private setAuthentication(user: string, token: string): boolean {
    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);
    localStorage.setItem('token', token);
    return true;
  }



  login(username: string, password: string): Observable<boolean> {

    const url = `${this.baseUrl}/api/Auth/login`;
    const body = { username, password };

    return this.http.post<LoginResponse>(url, body)
      .pipe(
        map(({ username, token }) => this.setAuthentication(username, token)),
        catchError(err => throwError(() => err.error.message))
      )
  };




  //! Se llama en el constructor de este servicio para checkear el estado.
  checkAuthStatus(): Observable<boolean> {
    const url = `${this.baseUrl}/api/Auth/check-token`;
    const token = localStorage.getItem('token');

    if (!token) {
      this.logout();
      return of(false)
    };
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);

    return this.http.get<CheckTokenResponse>(url, { headers })
      .pipe(
        map(({ username, token }) => this.setAuthentication(username, token)) ,
        catchError(() => {
          this._authStatus.set(AuthStatus.notAuthenticated);
          console.log('error check token');
          return of(false);
        })
      );


  }

  logout() {
    localStorage.removeItem('token');
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.notAuthenticated);
  }

}
