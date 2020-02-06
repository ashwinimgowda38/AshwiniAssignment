import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }


  /** api details (URL) */
  private dataUrl = 'https://reqres.in/api/users?page=2';


  /** To get data from api */
  public getData(): Observable<any> {

    return this.httpClient.get(this.dataUrl)
      .pipe(
        catchError(this.handleError<any>('getData', []))
      );
  }


  /** TO handle error */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      alert(error.message);
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
