import { style } from '@angular/animations';
import { Component, HostListener,ElementRef, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';


@Component({
  selector: 'led-lamp-list',
  templateUrl: './lamp-list.component.html',
  styleUrls: ['./lamp-list.component.scss']
})
export class LampListComponent implements OnInit {
color: ThemePalette = 'accent';
checked = false;
disabled = false;
index=0;
selectedItem = null;

countNewLamps = 0;
  constructor() { }

  ngOnInit(): void {
    this.index=0;
    this.selectedItem = null;
    this.countNewLamps = 0;
    this.newLamps.forEach(element => {
      this.countNewLamps++;
    });
  }

  public newLamps = [
    {id: 1, name: "XGZUWLK7483949"},
    {id: 2, name: "POIIOSH1122830"}
  ];
  public lamps = [
    {id: 1, name: 'Wohnzimmer LED-Streifen'},
    {id: 2, name: 'Küchen LED-Streifen'},
  ];
  focuse(item:any): void {
    this.selectedItem = item;
  }

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    let elements: string[] = []
    event.path.forEach((element: any) => {
      elements.push(element.className)
      console.log(element.className)
    })
    if(!(elements.includes("card-container ng-star-inserted") ||elements.includes("card-container"))) {
      this.selectedItem = null;
      this.index=-1;
    }
    }
    formatLabel(value: number) {
      if (value >= 1000) {
        return Math.round(value / 1000) + '%';
      }
      return value;
    }
}
