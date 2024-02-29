import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import config from '../../auth_config.json';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  ping$() {
    return this.http.get(`${config.apiUri}/api/external`);
  }

  getcomments():Observable<any>{
    return this.http.get("http://localhost:4000/books, http://jsonplaceholder.typicode.com/posts/1/comments");
}
}
