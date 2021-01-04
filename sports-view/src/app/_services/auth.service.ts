import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const token = 'Token ' + localStorage.getItem('token');

const userHttpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json','Authorization': token})
};

const apiUrl = 'http://localhost:8000/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;
  redirectUrl: string;

  constructor(private http: HttpClient) { }

  login(logins): Observable<any> {
    const url = apiUrl + 'rest-auth/login/';
    return this.http.post(url, logins, httpOptions).pipe(
      tap(_ =>
        this.isLoggedIn = true
        ),
        catchError(this.handleError('login', []))
    );
  }

  register(accountInfo): Observable<any> {
    const url = apiUrl + 'rest-auth/registration/';
    return this.http.post(url, accountInfo, httpOptions).pipe(
      tap(_ => this.isLoggedIn = true),
      catchError(this.handleError('register', []))
    );
  }

  user(): Observable<any> {
    return this.http.get(apiUrl + 'rest-auth/user/', userHttpOptions).pipe(
      tap(_ => console.log('got user'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }
}
