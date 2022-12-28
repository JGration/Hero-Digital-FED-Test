import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/general.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    observe: 'response'
  }),
};

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  private responseUrl: string = 'http://localhost:3000/responses';
  private postUrl: string = 'http://localhost:3000/posts';
  constructor(private http: HttpClient) { }

  getSuccess(): Observable<[]>{
    return this.http.get<[]>(this.responseUrl + '/1')
  }
  getError(): Observable<any>{
    return this.http.get<[]>(this.responseUrl + '/2')
  }
  postForm(obj: string): Observable<object> {
    return this.http.post(this.postUrl, decodeURI(obj), httpOptions) 
  }
}
