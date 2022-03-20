import { Lamp } from 'src/app/interfaces/lamp';
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
  refreshRoutine: any;

  ngOnInit(): void {
    console.log(this.lamp)
    this.buildColorPicker();
    this.colorPickerRoutine;
    this.getLamp()
    this.refreshRoutine = setInterval(() => {
      this.refresh()
    },1000)
  }

  ngOnDestroy() {
    clearInterval(this.refreshRoutine);
}

  refresh(){
    this.getLamp()
  }

  getLamp(): void {
    this.lampsService.getLamp(this.lamp).subscribe({
      next: lamp => {
        console.log(lamp);
        localStorage.setItem('rgb-color-r', lamp.color.r+"");
        localStorage.setItem('rgb-color-g', lamp.color.g+"");
        localStorage.setItem('rgb-color-b', lamp.color.b+"");
        this.lamp.color.r = lamp.color.r;
        this.lamp.color.g = lamp.color.g;
        this.lamp.color.b = lamp.color.b;
        this.lamp.brightness = lamp.brightness;
        this.lamp.on = lamp.on;
        this.colorPicker.color.rgbString=`rgb(${this.lamp.color.r},${this.lamp.color.g},${this.lamp.color.b})`
        console.log(lamp);
      },
      error: error => {console.log(error);
        this.toolCaseService.isActive(error);}})
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
      //color: `rgb(${this.lamp.color.r},${this.lamp.color.g},${this.lamp.color.b})`,
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
    let r=parseInt(JSON.parse(localStorage.getItem('rgb-color-r')!));
    let g=parseInt(JSON.parse(localStorage.getItem('rgb-color-g')!));
    let b=parseInt(JSON.parse(localStorage.getItem('rgb-color-b')!));
    if(!isNaN(r)||!isNaN(g)||!isNaN(b)){
      if(!( r === this.lamp.color.r)||!(g === this.lamp.color.g)||!(b === this.lamp.color.b)){
        this.changeColor(r,g,b)
      }
    }
  },100)

  changeColor(r: number, g: number, b: number){
    let lamp = this.lamp
    lamp.color.r = r;
    lamp.color.g = g;
    lamp.color.b = b;
    this.lampsService.updateLamp(lamp).subscribe({
      next: data => {this.refresh()},
      error: error => {console.log(error);
        this.toolCaseService.isActive(error);}});
    console.log(`(${this.lamp.color.r},${this.lamp.color.g},${this.lamp.color.b})`);

  }
  changeIsOnState(event: MatSlideToggleChange):any{
    let lamp = this.lamp
    lamp.on = this.toolCaseService.changeIsOnState(event)
    this.lampsService.updateLamp(lamp).subscribe({
      next: data => {this.refresh()},
      error: error => {console.log(error);
        this.toolCaseService.isActive(error);}});
  }
  changeBrightness(event: any) {
    let lamp = this.lamp
    lamp.brightness = this.toolCaseService.changeBrightness(event)
    this.lampsService.updateLamp(lamp).subscribe({
      next: data => {this.refresh()},
      error: error => {console.log(error);
        this.toolCaseService.isActive(error);}});
  }
  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + '%';
    }
    return value;
  }
  randomMode():void{
    this.lampsService.randomize(this.lamp).subscribe(
      {
        next: lamp => {
          localStorage.setItem('rgb-color-r', lamp.color.r);
          localStorage.setItem('rgb-color-g', lamp.color.g);
          localStorage.setItem('rgb-color-b', lamp.color.b);
          this.lamp.color.r = lamp.color.r;
          this.lamp.color.g = lamp.color.g;
          this.lamp.color.b = lamp.color.b;
          this.lamp.brightness = lamp.brightness;
          this.lamp.on = lamp.on;
          this.colorPicker.color.rgbString=`rgb(${this.lamp.color.r},${this.lamp.color.g},${this.lamp.color.b})`
          console.log(lamp);
        },
        error: error => {
          console.log(error);
          this.toolCaseService.isActive(error);
        }})
    //this.getLamp();
  }
  onClose(){
    clearInterval(this.colorPickerRoutine);
  }
}
