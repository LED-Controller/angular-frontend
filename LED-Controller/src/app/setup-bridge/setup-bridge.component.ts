import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { SetupBridgeDialogComponent } from './setup-bridge-dialog/setup-bridge-dialog.component';

@Component({
  selector: 'led-setup-bridge',
  templateUrl: './setup-bridge.component.html',
  styleUrls: ['./setup-bridge.component.scss']
})
export class SetupBridgeComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openDialog() {
    const dialogRef = this.dialog.open(SetupBridgeDialogComponent, {panelClass: 'setup-dialog'});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
