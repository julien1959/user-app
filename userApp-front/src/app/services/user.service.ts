import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { User } from '../interfaces/user';
import { tap } from 'rxjs/operators';

const baseUrl = 'http://localhost:8080/api/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _refreshUsers$ = new Subject<void>();

  get refreshUsers$(){
    return this._refreshUsers$;
  }

  constructor(
    private http: HttpClient
  ) { }

  getAllUsers(): Observable<User[]>{
    return this.http.get<User[]>(baseUrl);
  }

  getById(id: number):Observable<User>{
    return this.http.get<User>(`${baseUrl}/${id}`);
  }

  create(user: User): Observable<User>{
    return this.http.post<User>(baseUrl, user);
  }

  delete(id: number): Observable<any>{
    return this.http
    .delete(`${baseUrl}/${id}`)
    .pipe(
      tap(() => {
        this._refreshUsers$.next();
      })
    );
  }

  update(id: number, user: User): Observable<User>{
    return this.http.put<User>(`${baseUrl}/${id}`, user);
  }
}
