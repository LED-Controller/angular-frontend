import { Login } from './../interfaces/login';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  getLoginData(): Observable<Login>{
    return this.httpClient.get<Login>(`http://localhost:8080/login`)
  }
  setPassword(pass: string): Observable<string>{
    return this.httpClient.post<string>(`http://localhost:8080/password`,pass);
  }
}
