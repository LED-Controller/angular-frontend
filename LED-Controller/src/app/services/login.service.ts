import { PasswordIsAlreadySet, Password } from './../interfaces/login';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  getPasswordStatus(): Observable<PasswordIsAlreadySet>{
    return this.httpClient.get<PasswordIsAlreadySet>(`http://localhost:8080/login/passwordstatus`)
  }

  setPassword(pass: Password): Observable<any>{
    return this.httpClient.post<any>(`http://localhost:8080/login/password`,pass);
  }

  authenticate(pass: Password): Observable<any>{
    return this.httpClient.post<any>(`http://localhost:8080/login`,pass)
  }
}
