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
selectedItemMac = "";
countUnconLamps = 0;
lamps: Lamp[] = [];
unconfiguredLamps: string[] = [];
sub: any;
refreshRoutine: any;

  constructor(private lampsService: LampsService,
              private unconfiguredLampsService: UnconfiguredLampsService,
              private toolCaseService: ToolCaseService,
              public dialog: MatDialog,) { }
  ngOnInit(): void {
    this.getLamps();
    this.getUnconfiguredLamps();
    this.index="";
    this.selectedItemMac = "";
    this.sub = this.lampsService.Refreshrequired.subscribe(response => {
      this.getLamps();
    })
    let i = 0
    this.refreshRoutine = setInterval(() => {
      if(i === 5){
        this.getUnconfiguredLamps()
        i = 0
      }
      this.getLamps()
      i++
    },3000)
  }

  ngOnDestroy():void{
    this.sub.unsubscribe();
    clearInterval(this.refreshRoutine)
  }

  //call services
  getLamps(): void {
    console.log(this.selectedItemMac)
    this.lampsService.getLamps().subscribe({
      next: lamps => {
        lamps.sort((a) => (a.online === true? -1 : 1));
        this.modifycheck(lamps,this.lamps);
      },
      error: error =>{console.log(error);
        this.toolCaseService.isActive(error);}});
  }

  modifycheck(newLamps: Lamp[], currentLamps: Lamp[]): void{
    let modify = false
    if(newLamps.length === currentLamps.length)
    {
      for (let i in newLamps){
        if(newLamps[i] !== undefined )
        {
          if(newLamps[i].mac === currentLamps[i].mac && newLamps[i].name === currentLamps[i].name){
            if(newLamps[i].on === currentLamps[i].on && newLamps[i].online === currentLamps[i].online){
              if(newLamps[i].type === currentLamps[i].type && newLamps[i].brightness === currentLamps[i].brightness){
                  if(newLamps[i].color.r === currentLamps[i].color.r && newLamps[i].color.g === currentLamps[i].color.g && newLamps[i].color.b === currentLamps[i].color.b)
                  {}else{modify = true;}
              }else{modify = true;}
            }else{modify = true;}
          }else{modify = true;}
        }else{modify = true;}
      }
    }else{modify = true;}
    if(modify){
      this.lamps = newLamps;
    }
  }

  getUnconfiguredLamps(): void {
    this.unconfiguredLampsService.getUnconfiguredLamps().subscribe({
      next: lamps => {console.log(lamps); this.unconfiguredLamps = lamps; this.countUnconfiguredLamps(lamps);},
      error: error => {console.log(error);
        this.toolCaseService.isActive(error);}});
  }
  changeIsOnState(lamp: Lamp, event: MatSlideToggleChange):any{
    lamp.on = this.toolCaseService.changeIsOnState(event);
    this.lampsService.updateLamp(lamp).subscribe({
      next: data => {this.lamps[this.lamps.findIndex(x => x.mac === lamp.mac)].on = lamp.on;},
      error: error => {console.log(error);
        this.toolCaseService.isActive(error);}});
  }
  changeBrightness(lamp: Lamp, value: number) {
    let i = this.lamps.findIndex(x => x.mac === lamp.mac);
    lamp.brightness = value /1000;
    this.lampsService.updateLamp(lamp).subscribe({
      next: data => {this.lamps[i].brightness = lamp.brightness;},
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
    this.selectedItemMac = item.mac;
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
      this.selectedItemMac = "";
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
