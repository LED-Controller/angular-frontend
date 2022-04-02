import { LightType } from './../../interfaces/lightType';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Lamp } from 'src/app/interfaces/lamp';
import { LampsService } from 'src/app/services/lamps.service';
import { ToolCaseService } from 'src/app/services/tool-case.service';

@Component({
  selector: 'led-edit-lamp',
  templateUrl: './edit-lamp.component.html',
  styleUrls: ['./edit-lamp.component.scss']
})
export class EditLampComponent implements OnInit {

  floatLabelControl = new FormControl('auto');
  panelColor = new FormControl('auto');
  lampName = this.lamp.name;
  lampTyp = this.lamp.type;

  constructor(@Inject(MAT_DIALOG_DATA) public lamp: Lamp,
  private lampsService: LampsService,
  private toolCaseService: ToolCaseService,) { }
  lightType= [LightType.RGB,LightType.RGBW,LightType.NEOPIXEL]
  ngOnInit(): void {

  }
  getLamp(): void {
    /*
    this.lampsService.getLamp(this.lamp).subscribe({
      next: lamp => {this.lamp = lamp},
      error: error => {console.log(error);
        this.toolCaseService.isActive(error);}})*/
  }
  editLamp(){
    this.lamp.name = this.lampName;
    this.lamp.type = this.lampTyp;
    this.lampsService.updateLamp(this.lamp).subscribe({
      next: data => {console.log(data)},
      error: error => {console.log(error);
        this.toolCaseService.isActive(error);}});
    this.getLamp();
  }
  deleteLamp(){
    this.lampsService.deleteLamp(this.lamp).subscribe({
        next: data => {console.log(data)},
        error: error => {console.log(error);
          this.toolCaseService.isActive(error);}}
    );
  }
}
