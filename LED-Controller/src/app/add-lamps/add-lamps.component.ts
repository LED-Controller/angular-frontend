import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Lamp } from '../interfaces/lamp';
import { UnconfiguredLampsService } from '../services/unconfigured-lamps.service';
import { AddLampsDialogComponent } from './add-lamps-dialog/add-lamps-dialog.component';

@Component({
  selector: 'led-add-lamps',
  templateUrl: './add-lamps.component.html',
  styleUrls: ['./add-lamps.component.scss']
})
export class AddLampsComponent implements OnInit {

  constructor(private unconfiguredLampsService: UnconfiguredLampsService,
              public dialog: MatDialog) { }

  unconfiguredLamps: string[] = [];

  getUnconfiguredLamps(): void {
    this.unconfiguredLamps = this.unconfiguredLampsService.getUnconfiguredLamps();
  }

  ngOnInit(): void {
    this.getUnconfiguredLamps();
  }
  refresh(): void {
    this.getUnconfiguredLamps();
    console.log("refresh")
  }
  openDialog(mac: string) {
    const dialogRef = this.dialog.open(AddLampsDialogComponent, {data: mac});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.refresh();
    });
  }
}
