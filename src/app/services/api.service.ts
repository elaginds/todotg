import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  public getTags(): Observable<any> {
    return this.http.get('/api/tags');
  }

  public addTag(text): Observable<any> {
    return this.http.post('/api/tag/add', {text});
  }

  public getTodos(): Observable<any> {
    return this.http.get('/api/todo');
  }

  public postToDo(todo): Observable<any> {
    return this.http.post('/api/todo', {todo});
  }

  public removeToDo(id): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: { id }
    };

    return this.http.delete('/api/todo', options);
  }

  public editToDo(todo): Observable<any> {
    return this.http.put('/api/todo', {todo});
  }
}
