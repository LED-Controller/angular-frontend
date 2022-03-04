import { Injectable } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Lamp } from '../interfaces/lamp';

@Injectable({
  providedIn: 'root'
})
export class ToolCaseService {

  constructor() { }

  changeIsOnState(event: MatSlideToggleChange):any{
    return event.checked
  }
  changeBrightness(event: any) {
    return event.value/1000;
  }
}
