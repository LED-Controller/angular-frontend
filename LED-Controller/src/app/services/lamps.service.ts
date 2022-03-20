import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Lamp } from './../interfaces/lamp';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LampsService {

  private _refreshrequired = new Subject<void>();

  get Refreshrequired() {
    return this._refreshrequired
  }

  constructor(private httpClient: HttpClient,private tokenStorageService: TokenStorageService) { }
  ip='';
  port='';
  getCredentials(){
    this.ip= this.tokenStorageService.getIp();
    this.port= this.tokenStorageService.getPort();
  }
  getLamps(): Observable<Lamp[]> {
    this.getCredentials();
    //return this.httpClient.get<Lamp[]>(`http://${this.ip}:${this.port}/lamps`);
    return this.httpClient.get<Lamp[]>(`http://localhost:8080/lamps`);
  }
  getLamp(lamp: Lamp): Observable<Lamp>{
    this.getCredentials();
    //return this.httpClient.get<Lamp>(`http://${this.ip}:${this.port}/lamps${lamp.mac}`);
    return this.httpClient.get<Lamp>(`http://localhost:8080/lamps/${lamp.mac}`);
  }
  updateLamp(lamp: Lamp): Observable<Lamp> {
    this.getCredentials();
    //return this.httpClient.post<Lamp>(`http://${this.ip}:${this.port}/update/`,lamp);
    return this.httpClient.post<Lamp>(`http://localhost:8080/update/`,lamp).pipe(tap(() => {
      this.Refreshrequired.next();
    }))
  }
  deleteLamp(lamp: Lamp): Observable<void> {
    this.getCredentials();
    //return this.httpClient.delete<void>(`http://${this.ip}:${this.port}/delete/${lamp.mac}`);
    return this.httpClient.delete<void>(`http://localhost:8080/delete/${lamp.mac}`);
  }
  randomize(lamp: Lamp): Observable<any> {
    this.getCredentials();
    //return this.httpClient.post<any>(`http://${this.ip}:${this.port}/random`,lamp.mac);
    return this.httpClient.post<any>(`http://localhost:8080/random`,lamp.mac).pipe(tap(() => {
      this.Refreshrequired.next();
    }))
  }
}
