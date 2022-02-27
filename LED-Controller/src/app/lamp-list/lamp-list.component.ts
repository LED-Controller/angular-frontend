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
  constructor() { }

  ngOnInit(): void {
  }

  public lamps = [
    {id: 1, name: 'Wohnzimmer LED-Streifen'},
    {id: 2, name: 'Küchen LED-Streifen'},
  ];

  selectedItem = null;
  focuse(item:any): void {
    this.selectedItem = item;
  }
  index=0;
  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    let elements: string[] = []
    event.path.forEach((element: any) => {
      elements.push(element.className)
    })
    if(!elements.includes("card-container")) {
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
