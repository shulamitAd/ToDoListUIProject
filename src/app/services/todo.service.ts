import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ToDoItem } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {


  baseApiUrl: string = "https://localhost:7111";

  myHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'x-developer-name': 'Shulamit Tzikinovski'
  });
  
  options = {
    headers: this.myHeaders
  };

  constructor(private http: HttpClient) { }

  getAll(): Observable<ToDoItem[]> {
    
    return this.http.get<ToDoItem[]>(this.baseApiUrl + '/api/TODO', this.options);
  }

  add(newItem: ToDoItem): Observable<ToDoItem> {
    newItem.id = 0;
    return this.http.post<ToDoItem>(this.baseApiUrl + '/api/TODO', newItem, this.options);
  }
  
  get(id: number): Observable<ToDoItem> {
    return this.http.get<ToDoItem>(this.baseApiUrl + '/api/TODO/' + id, this.options);
  }
  
  update(id: number, updateItemRequest: ToDoItem): Observable<ToDoItem> {
    return this.http.put<ToDoItem>(this.baseApiUrl + '/api/TODO/' + id, updateItemRequest, this.options);
  }
  
  delete(id: number): Observable<ToDoItem> {
    return this.http.delete<ToDoItem>(this.baseApiUrl + '/api/TODO/' + id, this.options);
  }
}
