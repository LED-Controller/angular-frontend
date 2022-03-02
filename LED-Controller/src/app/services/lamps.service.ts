import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lamp } from '../interfaces/lamp';
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
  randomize(): Observable<void> {
    return this.httpClient.get<void>(`http://localhost:8080/random`);
  }
}
