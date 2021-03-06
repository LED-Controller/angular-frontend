import { PasswordIsAlreadySet, Password } from './../interfaces/login';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
import { timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient,private tokenStorageService: TokenStorageService) { }
  ip='';
  port='';
  getCredentials(){
    this.ip= this.tokenStorageService.getIp();
    this.port= this.tokenStorageService.getPort();
  }
  getPasswordStatus(): Observable<PasswordIsAlreadySet>{
    this.getCredentials();

    return this.httpClient.get<PasswordIsAlreadySet>(`http://${this.ip}:${this.port}/login/passwordstatus`)
    .pipe(timeout(5000));
  }

  setPassword(pass: Password): Observable<any>{
    this.getCredentials();
    return this.httpClient.post<any>(`http://${this.ip}:${this.port}/login/password`,pass);
  }

  authenticate(pass: Password): Observable<any>{
    this.getCredentials();
    return this.httpClient.post<any>(`http://${this.ip}:${this.port}/login`,pass)
  }
}
