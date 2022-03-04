import { Lamp } from './../interfaces/lamp';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lamps } from '../mocks/lamps-mock';

@Injectable({
  providedIn: 'root'
})
export class LampsService {

  private randomUrl = 'api/heroes';
  constructor(private httpClient: HttpClient) { }

  getLamps(): Lamp[] {
    return Lamps;
  }
  /*
  getLamps(): Observable<Lamp[]> {
    return this.httpClient.get<Lamp[]>(`http://localhost:8080/lamps`);
  }
  */
  getLamp(lamp: Lamp): Observable<Lamp>{
    return this.httpClient.get<Lamp>(`http://localhost:8080/lamps/${lamp.mac}`);
  }
  updateLamp(lamp: Lamp): Observable<Lamp> {
    return this.httpClient.post<Lamp>(`http://localhost:8080/update/${lamp.mac}`,lamp);
  }
  deleteLamp(lamp: Lamp): Observable<void> {
    return this.httpClient.delete<void>(`http://localhost:8080/delete/${lamp.mac}`);
  }
  randomize(lamp: Lamp): Observable<Lamp> {
    return this.httpClient.post<Lamp>(`http://localhost:8080/random/${lamp.mac}`,lamp);
  }
}
