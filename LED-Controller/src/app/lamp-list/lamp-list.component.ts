import { Component, HostListener, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { LampsService } from '../services/lamps.service';
import { UnconfiguredLampsService } from '../services/unconfigured-lamps.service';
import { Lamp } from '../interfaces/lamp';
import { LampDialogComponent } from './lamp-dialog/lamp-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'led-lamp-list',
  templateUrl: './lamp-list.component.html',
  styleUrls: ['./lamp-list.component.scss']
})
export class LampListComponent implements OnInit {
color: ThemePalette = 'accent';
disabled = false;
index="";
selectedItem = null;
countUnconLamps = 0;
lamps: Lamp[] = [];
unconfiguredLamps: string[] = [];

  constructor(private lampsService: LampsService,
              private unconfiguredLampsService: UnconfiguredLampsService,
              public dialog: MatDialog) { }

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
    this.index="";
    this.selectedItem = null;
  }
  refresh(): void {
    this.getLamps();
    this.getUnconfiguredLamps();
    this.countUnconfiguredLamps();
  }
  focuse(item:any): void {
    this.selectedItem = item;
  }

  openDialog(lamp: Lamp) {
    console.log(lamp);
    const dialogRef = this.dialog.open(LampDialogComponent, {data: lamp});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    let found: boolean = false
    event.path.forEach((element: any) => {
      console.dir(element)
      if(element.className !== undefined && element.localName !== "circle" && element.localName !== "svg"){
        if(element.className.includes("card-container")||element.className.includes("mat-dialog-container")){
          found = true
        }
      }})
    if(!found) {
      this.selectedItem = null;
      this.index="";
    }
  }
  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + '%';
    }
    return value;
  }
  //
  test():void{
    this.lampsService.randomize().subscribe();

  }
}
