import { MatSlideToggleChange } from "@angular/material/slide-toggle";
import { Lamp } from "./interfaces/lamp";

export class Toolcase{
  public changeIsOnState(lamp: Lamp, event: MatSlideToggleChange):any {
    console.log(event.checked)
    lamp.isOn=event.checked;
  }
  changeBrightness(event: any, lamp: Lamp):any {
    console.log(event.value/1000);
    lamp.brightness=event.value/1000;
  }
}
