import { Lamp } from './../interfaces/lamp';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UnconfiguredLampsService {

  constructor(private httpClient: HttpClient,private tokenStorageService: TokenStorageService) { }
  ip='';
  port='';
  getCredentials(){
    this.ip= this.tokenStorageService.getIp();
    this.port= this.tokenStorageService.getPort();
  }
  getUnconfiguredLamps(): Observable<string[]>{
    this.getCredentials();
    return this.httpClient.get<string[]>(`http://${this.ip}:${this.port}/unknown`);
  }
  setNewLamp(lamp: Lamp):Observable<Lamp>{
    this.getCredentials();
    return this.httpClient.post<Lamp>(`http://${this.ip}:${this.port}/register`,lamp);
  }
  indentifyLamp(mac: string):Observable<string>{
    this.getCredentials();
    return this.httpClient.post<string>(`http://${this.ip}:${this.port}/blink`,mac);
  }
}
