import { LightType } from './../../interfaces/lightType';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Lamp } from 'src/app/interfaces/lamp';
import { LampsService } from 'src/app/services/lamps.service';

@Component({
  selector: 'led-edit-lamp',
  templateUrl: './edit-lamp.component.html',
  styleUrls: ['./edit-lamp.component.scss']
})
export class EditLampComponent implements OnInit {

  floatLabelControl = new FormControl('auto');
  panelColor = new FormControl('auto');
  lampName = this.lamp.name;
  lampTyp = this.lamp.typ;

  constructor(@Inject(MAT_DIALOG_DATA) public lamp: Lamp,
  private lampsService: LampsService) { }
  lightType= [LightType.RGB,LightType.RGBW,LightType.NEOPIXEL]
  ngOnInit(): void {

  }
  getLamp(): void {
    this.lampsService.getLamp(this.lamp).subscribe(lamp => this.lamp = lamp)
  }
  editLamp(){
    this.lamp.name = this.lampName;
    this.lamp.typ = this.lampTyp;
    this.lampsService.updateLamp(this.lamp).subscribe();
    this.getLamp();
  }
  deleteLamp(){
    this.lampsService.deleteLamp(this.lamp).subscribe();
  }
}
