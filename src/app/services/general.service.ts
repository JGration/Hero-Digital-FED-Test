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

  getSuccess(): Observable<any>{
    return this.http.get<any>(this.responseUrl + '/1')
  }
  getError(): Observable<any>{
    return this.http.get<any>(this.responseUrl + '/2')
  }
  postForm(obj: any): Observable<any> {
    return this.http.post(this.postUrl, decodeURI(obj), httpOptions) 
  }
}
