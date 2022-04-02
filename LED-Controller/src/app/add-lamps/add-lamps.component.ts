import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Lamp } from '../interfaces/lamp';
import { ToolCaseService } from '../services/tool-case.service';
import { UnconfiguredLampsService } from '../services/unconfigured-lamps.service';
import { AddLampsDialogComponent } from './add-lamps-dialog/add-lamps-dialog.component';

@Component({
  selector: 'led-add-lamps',
  templateUrl: './add-lamps.component.html',
  styleUrls: ['./add-lamps.component.scss']
})
export class AddLampsComponent implements OnInit {

  constructor(private unconfiguredLampsService: UnconfiguredLampsService,
              public dialog: MatDialog,
              private toolCaseService: ToolCaseService,
              ) { }

  unconfiguredLamps: string[] = [];
  refreshRoutine:any

  getUnconfiguredLamps(): void {
    this.unconfiguredLampsService.getUnconfiguredLamps().subscribe({
        next: lamps => {console.log(lamps); this.unconfiguredLamps = lamps},
        error: error => {console.log(error);
          this.toolCaseService.isActive(error);}
      })
  }

  ngOnInit(): void {
    this.getUnconfiguredLamps();

    this.refreshRoutine = setInterval(() => {
      this.refresh()
    },10000)
  }
  ngOnDestroy() {
    clearInterval(this.refreshRoutine);
}
  refresh(): void {
    this.getUnconfiguredLamps();
  }
  openDialog(mac: string) {
    this.identifyLamp(mac);
    const dialogRef = this.dialog.open(AddLampsDialogComponent, {data: mac});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(result){this.unconfiguredLamps = this.unconfiguredLamps.filter(item => item !== mac);}
    });
  }
  identifyLamp(mac: string){
      this.unconfiguredLampsService.indentifyLamp(mac).subscribe({
        next: data => {console.log(data)},
        error: error => {console.log(error);
          this.toolCaseService.isActive(error);}})
  }
}
