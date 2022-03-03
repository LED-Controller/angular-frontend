import { MacAdresses } from './../mocks/unconfiguredLamps-mock';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UnconfiguredLampsService {

  constructor() { }

  getUnconfiguredLamps(): string[]{
    return MacAdresses;
  }
}
