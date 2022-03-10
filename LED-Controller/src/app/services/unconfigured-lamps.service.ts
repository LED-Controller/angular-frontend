import { Lamp } from './../interfaces/lamp';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnconfiguredLampsService {

  constructor(private httpClient: HttpClient) { }

  getUnconfiguredLamps(): Observable<string[]>{
    return this.httpClient.get<string[]>(`http://localhost:8080/unknown`);
  }
  setNewLamp(lamp: Lamp):Observable<Lamp>{
    return this.httpClient.post<Lamp>(`http://localhost:8080/register`,lamp);
  }
}
