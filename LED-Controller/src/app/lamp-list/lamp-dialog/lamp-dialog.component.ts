import { Lamp } from './../../interfaces/lamp';
import iro from '@jaames/iro';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToolCaseService } from 'src/app/services/tool-case.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { LampsService } from 'src/app/services/lamps.service';

@Component({
  selector: 'led-lamp-dialog',
  templateUrl: './lamp-dialog.component.html',
  styleUrls: ['./lamp-dialog.component.scss']
})


export class LampDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public lamp: Lamp,
    private toolCaseService: ToolCaseService,
    private dialogRef: MatDialogRef<LampDialogComponent>,
    private lampsService: LampsService) {
      dialogRef.disableClose = true;
  }

  colorPicker: any;
  ngOnInit(): void {
    this.buildColorPicker();
    this.colorPickerRoutine;
  }
  getLamp(): void {
    this.lampsService.getLamp(this.lamp).subscribe(lamp => this.lamp = lamp)
  }
  buildColorPicker(){
    this.colorPicker = iro.ColorPicker('#color-picker',{
      layout: [
        {
          component: iro.ui.Wheel,
          options: {}
        },
      ],
      width: 270,
      color: `rgb(${this.lamp.color.r},${this.lamp.color.g},${this.lamp.color.b})`,
      wheelLightness: false,
    })
    this.colorPicker.on('input:end', function(color: { rgb: any; }) {
     localStorage.setItem('rgb-color-r', color.rgb.r);
     localStorage.setItem('rgb-color-g', color.rgb.g);
     localStorage.setItem('rgb-color-b', color.rgb.b);
    });
  }
  colorPickerRoutine = setInterval(() => {
    let r=localStorage.getItem('rgb-color-r')
    let g=localStorage.getItem('rgb-color-g')
    let b=localStorage.getItem('rgb-color-b')
    if(!( r === this.lamp.color.r+"")||!(g === this.lamp.color.g+"")||!(b === this.lamp.color.b+"")){
      this.changeColor(r!,g!,b!)
    }
  },500)

  changeColor(r: string, g: string, b: string){
    this.lamp.color.r = parseInt(JSON.parse(r));
    this.lamp.color.g = parseInt(JSON.parse(g));
    this.lamp.color.b = parseInt(JSON.parse(b));
    //this.lampsService.updateLamp(this.lamp).subscribe();
    //this.getLamp();
    console.log(`(${this.lamp.color.r},${this.lamp.color.g},${this.lamp.color.b})`);

  }
  changeIsOnState(event: MatSlideToggleChange):any{
    this.lamp.isOn = this.toolCaseService.changeIsOnState(event)
    //this.lampsService.updateLamp(this.lamp).subscribe();
    //this.getLamp();
  }
  changeBrightness(event: any) {
    this.lamp.brightness = this.toolCaseService.changeBrightness(event)
    //this.lampsService.updateLamp(this.lamp).subscribe();
    //this.getLamp();
  }
  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + '%';
    }
    return value;
  }
  randomMode():void{
    this.lampsService.randomize(this.lamp).subscribe(lamp => this.lamp = lamp);
    //this.getLamp();
  }
  onClose(){
    clearInterval(this.colorPickerRoutine)
  }
}
