import { Injectable } from '@angular/core';
import { Lamp } from '../interfaces/lamp';
import { Lamps } from '../mocks/unconfiguredLamps-mock';

@Injectable({
  providedIn: 'root'
})
export class UnconfiguredLampsService {

  constructor() { }

  getUnconfiguredLamps(): Lamp[]{
    return Lamps;
  }
}
