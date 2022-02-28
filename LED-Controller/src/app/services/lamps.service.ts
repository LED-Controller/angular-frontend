import { Injectable } from '@angular/core';
import { Lamp } from '../interfaces/lamp';
import { Lamps } from '../mocks/lamps-mock';

@Injectable({
  providedIn: 'root'
})
export class LampsService {

  constructor() { }

  getLamps(): Lamp[] {
    return Lamps;
  }
}
