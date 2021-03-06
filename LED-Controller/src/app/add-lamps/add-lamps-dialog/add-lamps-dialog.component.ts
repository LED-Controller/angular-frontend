import { LightType } from './../../interfaces/lightType';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Lamp } from 'src/app/interfaces/lamp';
import { UnconfiguredLampsService } from 'src/app/services/unconfigured-lamps.service';
import { ToolCaseService } from 'src/app/services/tool-case.service';

@Component({
  selector: 'led-add-lamps-dialog',
  templateUrl: './add-lamps-dialog.component.html',
  styleUrls: ['./add-lamps-dialog.component.scss']
})
export class AddLampsDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public macAdress: string,
  private unconfiguredLampsService: UnconfiguredLampsService,
  private toolCaseService: ToolCaseService,) { }
  lampName="";
  lampTyp= LightType.RGB;
  lightType= [LightType.RGB,LightType.RGBW,LightType.NEOPIXEL]

  ngOnInit(): void {
  }
  createLamp(){
    let lamp: Lamp = {
      mac: this.macAdress,
      name: this.lampName,
      type: this.lampTyp,
      on: true,
      online: true,
      color: {
        r:255,
        g:255,
        b:255,
      },
      brightness: 100,
    }
    this.unconfiguredLampsService.setNewLamp(lamp).subscribe({
      next: data => {console.log(data)},
      error: error => {console.log(error);
        this.toolCaseService.isActive(error);}});
  }
  identifyLamp(){
    this.unconfiguredLampsService.indentifyLamp(this.macAdress).subscribe({
      next: data => {console.log(data)},
      error: error => {console.log(error);
        this.toolCaseService.isActive(error);}
    })
}
}
