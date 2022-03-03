import { Lamp } from './../../interfaces/lamp';
import iro from '@jaames/iro';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'led-lamp-dialog',
  templateUrl: './lamp-dialog.component.html',
  styleUrls: ['./lamp-dialog.component.scss']
})
export class LampDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public lamp: Lamp) { }

  colorPicker: any;

  ngOnInit(): void {
    this.colorPicker = iro.ColorPicker('#color-picker',{
      layout: [
        {
          component: iro.ui.Wheel,
          options: {}
        },
      ],
      // Set the size of the color picker
      width: 270,
      // Set the initial color to pure red
      //color: "rgb("+this.lamp.color+")",
      color: "#f00",
    })
    this.colorPicker.on('input:end', function(color: { rgb: any; }) {
      // log the current color as a RGB string
      console.log(color.rgb);
    });
  }



  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + '%';
    }
    return value;
  }
}
