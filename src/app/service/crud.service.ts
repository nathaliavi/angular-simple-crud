import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { map, tap } from 'rxjs/operators';

import { Users } from '../crud/users'

import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class CrudService {

  private url: string = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json'
    })
  }

  create(user: Users): Observable<Users> {
    return this.http.post<Users>(`${this.url}/users/`, JSON.stringify(user), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  get getUsers(): Observable<any> {
    return this.http.get<any>(`${this.url}/users`).pipe(
      tap(res => res)
    )
  }

  getUserById(id: number): Observable<Users>{
    return this.http.get<Users>(`${this.url}/users/${id}`).pipe(
      tap(res => res)
    )
  }

  editUser(id: number, info: Users): Observable<Users>{
    return this.http.put<Users>(`${this.url}/users/${id}`, JSON.stringify(info), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }


  public deleteUser(id: number){
    return this.http.delete(`${this.url}/users/${id}`)
  } 

  errorHandler(error: any){
    let errorMessage = '';
    if(error.error instanceof ErrorEvent){
      errorMessage = error.error.message
    } else {
      errorMessage = `Error code: ${error.status}\nMessage: ${error.message}`
    }

    console.log(errorMessage);
    return throwError(errorMessage);
    
  }

}
