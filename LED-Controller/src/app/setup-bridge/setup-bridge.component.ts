import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { SetupBridgeIpComponent } from './setup-bridge-ip/setup-bridge-ip.component';

@Component({
  selector: 'led-setup-bridge',
  templateUrl: './setup-bridge.component.html',
  styleUrls: ['./setup-bridge.component.scss']
})
export class SetupBridgeComponent implements OnInit {

  constructor(public dialog: MatDialog,) { }

  ngOnInit(): void {}
  openDialog() {
    const dialogRef = this.dialog.open(SetupBridgeIpComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
