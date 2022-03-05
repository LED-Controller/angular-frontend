import { LightType } from './../../interfaces/lightType';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Lamp } from 'src/app/interfaces/lamp';

@Component({
  selector: 'led-edit-lamp',
  templateUrl: './edit-lamp.component.html',
  styleUrls: ['./edit-lamp.component.scss']
})
export class EditLampComponent implements OnInit {

  floatLabelControl = new FormControl('auto');
  panelColor = new FormControl('auto');

  constructor(@Inject(MAT_DIALOG_DATA) public lamp: Lamp) { }
  lightType= [LightType.RGB,LightType.RGBW,LightType.NEOPIXEL]
  ngOnInit(): void {

  }
}
