import { AuthInterceptor } from './auth.interceptor';
import { Lamp } from './../interfaces/lamp';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lamps } from '../mocks/lamps-mock';

@Injectable({
  providedIn: 'root'
})
export class LampsService {

  constructor(private httpClient: HttpClient) { }

  getLamps(): Observable<any> {
    return this.httpClient.get<any>(`http://localhost:8080/lamps`);
  }
  getLamp(lamp: Lamp): Observable<Lamp>{
    return this.httpClient.get<Lamp>(`http://localhost:8080/lamps/${lamp.mac}`);
  }
  updateLamp(lamp: Lamp): Observable<Lamp> {
    return this.httpClient.post<Lamp>(`http://localhost:8080/update/`,lamp);
  }
  deleteLamp(lamp: Lamp): Observable<void> {
    return this.httpClient.delete<void>(`http://localhost:8080/delete/${lamp.mac}`);
  }
  randomize(lamp: Lamp): Observable<any> {
    return this.httpClient.post<any>(`http://localhost:8080/random`,{"mac": lamp.mac});
  }
}
