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
index="";
selectedItem = {};
countUnconLamps = 0;
lamps: Lamp[] = [];
unconfiguredLamps: string[] = [];

  constructor(private lampsService: LampsService,
              private unconfiguredLampsService: UnconfiguredLampsService,
              private toolCaseService: ToolCaseService,
              public dialog: MatDialog,) { }
  ngOnInit(): void {
    this.getLamps();
    this.getUnconfiguredLamps();
    this.index="";
    this.selectedItem= {};
    this.lampsService.Refreshrequired.subscribe(response => {
      this.getLamps();
    })

    let refreshRoutine = setInterval(() => {
      this.refresh()
    },2000)
  }
  //call services
  getLamps(): void {
    this.lampsService.getLamps().subscribe({
      next: lamps => {
        lamps.sort((a) => (a.online === true? -1 : 1))
        this.lamps = lamps;
      },
      error: error =>{console.log(error);
        this.toolCaseService.isActive(error);}});
  }

  refresh(): void {
    this.getLamps();
    this.getUnconfiguredLamps();
  }
  getUnconfiguredLamps(): void {
    this.unconfiguredLampsService.getUnconfiguredLamps().subscribe({
      next: lamps => {console.log(lamps); this.unconfiguredLamps = lamps; this.countUnconfiguredLamps(lamps);},
      error: error => {console.log(error);
        this.toolCaseService.isActive(error);}});
  }
  changeIsOnState(lamp: Lamp, event: MatSlideToggleChange):any{
    lamp.on = this.toolCaseService.changeIsOnState(event)
    this.lampsService.updateLamp(lamp).subscribe({
      next: data => {this.refresh()},
      error: error => {console.log(error);
        this.toolCaseService.isActive(error);}});
  }
  changeBrightness(event: any, lamp: Lamp) {
    lamp.brightness = this.toolCaseService.changeBrightness(event)
    this.lampsService.updateLamp(lamp).subscribe({
      next: data => {this.refresh()},
      error: error => {console.log(error);
        this.toolCaseService.isActive(error);}});
  }
  //define own services
  countUnconfiguredLamps(lamps: any): void {
    this.countUnconLamps = 0;
    lamps.forEach(() => {
      this.countUnconLamps++;
    });
  }
  focuse(item:any): void {
    console.log(item)
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
      if(result===false){this.lamps = this.lamps.filter(item => item.mac !== lamp.mac);}
      this.getUnconfiguredLamps();
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
      this.selectedItem = {};
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
