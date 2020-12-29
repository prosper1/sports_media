import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { tap, catchError, map } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const ApiUrl = 'http://localhost:8000/api/';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private http: HttpClient,
  ) { }

  getPosts(): Observable<any> {
    return this.http.get(`${ApiUrl}posts/`, httpOptions).pipe(
      tap(_ => console.log('got posts'))
    );
  }

  getPost(postID: number): Observable<any> {
    return this.http.get(`${ApiUrl}posts/${postID}`, httpOptions).pipe(
      tap(_ => console.log('got post'))
    );
  }

  getComments(post: number, user: any): Observable<any> {
    return this.http.get(`${ApiUrl}comments/?user=${user}&post=${post}`, httpOptions).pipe(
      tap(_ => console.log('got comments'))
    );
  }

  getPredictions(): Observable<any> {
    return this.http.get(`${ApiUrl}prediction/`, httpOptions).pipe(
      tap(_ => console.log('got predictions'))
    );
  }

  getPrediction(predictionID: number): Observable<any> {
    return this.http.get(`${ApiUrl}prediction/${predictionID}`, httpOptions).pipe(
      tap(_ => console.log('got predictions'))
    );
  }
}
