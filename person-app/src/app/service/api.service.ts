import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  
  baseUri:string = 'http://localhost:8000/v1/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
 

  constructor(private http: HttpClient) { }

  // Create a Person
  createPerson(data): Observable<any> {
    let url = `${this.baseUri}/person`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Get all persons
  getPersons() {
    return this.http.get(`${this.baseUri}/person`);
  }

  //Get person for a particular person
  getPerson(id): Observable<any> {
    let url = `${this.baseUri}/person/${id}`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  // Update a person
  updatePerson(id, data): Observable<any> {
    let url = `${this.baseUri}/person/${id}`;
    return this.http.put(url, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Delete a person
  deletePerson(id): Observable<any> {
    let url = `${this.baseUri}/person/${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}