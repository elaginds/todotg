import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  public getUser(): Observable<any> {
    return this.http.get('/export/user', {params: {user: 'eds'}});
  }

  public getTags(): Observable<any> {
    return this.http.get('/export/tags', {params: {user: 'eds'}});
  }

  public addTag(text): Observable<any> {
    return this.http.post('/export/tag/add', {text});
  }

  public getTodos(userid): Observable<any> {
    return this.http.get('/export/todo', {params: {userid}});
  }

  public postToDo(todo): Observable<any> {
    return this.http.post('/export/todo', {todo});
  }

  public removeToDo(id): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: { id }
    };

    return this.http.delete('/export/todo', options);
  }

  public editToDo(todo): Observable<any> {
    return this.http.put('/export/todo', {todo});
  }
}
