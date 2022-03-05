import { ToolCaseService } from './../services/tool-case.service';
import { Lamp } from './../interfaces/lamp';
import { Component, HostListener, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { LampsService } from '../services/lamps.service';
import { UnconfiguredLampsService } from '../services/unconfigured-lamps.service';
import { LampDialogComponent } from './lamp-dialog/lamp-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { EditLampComponent } from './edit-lamp/edit-lamp.component';


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
              private toolCaseService: ToolCaseService,
              public dialog: MatDialog) { }
  ngOnInit(): void {
    this.getLamps();
    this.getUnconfiguredLamps();
    this.countUnconfiguredLamps();
    this.index="";
    this.selectedItem = null;
  }
  //call services
  getLamps(): void {
    //this.lampsService.getLamps().subscribe(lamps => this.lamps = lamps);
    this.lamps = this.lampsService.getLamps();
  }
  refresh(): void {
    this.getLamps();
    this.getUnconfiguredLamps();
    this.countUnconfiguredLamps();
    console.log("refresh")
  }
  getUnconfiguredLamps(): void {
    this.unconfiguredLamps = this.unconfiguredLampsService.getUnconfiguredLamps();
  }
  changeIsOnState(lamp: Lamp, event: MatSlideToggleChange):any{
    lamp.isOn = this.toolCaseService.changeIsOnState(event)
    //this.lampsService.updateLamp(lamp).subscribe();
    //this.getLamps()
  }
  changeBrightness(event: any, lamp: Lamp) {
    lamp.brightness = this.toolCaseService.changeBrightness(event)
    //this.lampsService.updateLamp(lamp).subscribe();
    //this.getLamps()
  }
  //define own services
  countUnconfiguredLamps(): void {
    this.countUnconLamps = 0;
    this.unconfiguredLamps.forEach(element => {
      this.countUnconLamps++;
    });
  }
  focuse(item:any): void {
    this.selectedItem = item;
  }
  openDialog(lamp: Lamp) {
    const dialogRef = this.dialog.open(LampDialogComponent, {data: lamp},);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openEditDialog(lamp: Lamp) {
    const dialogRef = this.dialog.open(EditLampComponent, {data: lamp},);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    let found: boolean = false
    event.path.forEach((element: any) => {
      if(element.className !== undefined && element.localName !== "circle" && element.localName !== "svg"){
        if(element.className.includes("card-container")||element.className.includes("mat-dialog-container")||element.className.includes("cdk-overlay-container")){
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
}
