import { Component, HostListener, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { LampsService } from '../services/lamps.service';
import { UnconfiguredLampsService } from '../services/unconfigured-lamps.service';
import { Lamp } from '../interfaces/lamp';


@Component({
  selector: 'led-lamp-list',
  templateUrl: './lamp-list.component.html',
  styleUrls: ['./lamp-list.component.scss']
})
export class LampListComponent implements OnInit {
color: ThemePalette = 'accent';
disabled = false;
index=0;
selectedItem = null;
countUnconLamps = 0;
lamps: Lamp[] = [];
unconfiguredLamps: Lamp[] = [];

  constructor(private lampsService: LampsService,
              private unconfiguredLampsService: UnconfiguredLampsService) { }

  getLamps(): void {
    this.lamps = this.lampsService.getLamps();
  }
  getUnconfiguredLamps(): void {
    this.unconfiguredLamps = this.unconfiguredLampsService.getUnconfiguredLamps();
  }
  countUnconfiguredLamps(): void {
    this.countUnconLamps = 0;
    this.unconfiguredLamps.forEach(element => {
      this.countUnconLamps++;
    });
  }
  ngOnInit(): void {
    this.getLamps();
    this.getUnconfiguredLamps();
    this.countUnconfiguredLamps();
    this.index=0;
    this.selectedItem = null;
  }

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
