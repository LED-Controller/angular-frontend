import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LampsService } from '../services/lamps.service';
import { TokenStorageService } from '../services/token-storage.service';
import { SetupBridgeIpComponent } from './setup-bridge-ip/setup-bridge-ip.component';

@Component({
  selector: 'led-setup-bridge',
  templateUrl: './setup-bridge.component.html',
  styleUrls: ['./setup-bridge.component.scss']
})
export class SetupBridgeComponent implements OnInit {

  constructor(public dialog: MatDialog,private tokenStorageService: TokenStorageService,private router: Router,private lampsService: LampsService,) { }

  load = true;
  ipAddress = '';
  ngOnInit(): void {
    this.ipAddress= this.tokenStorageService.getIp();
    if(this.ipAddress.length > 1){
      this.lampsService.getLamps().subscribe({
        next: () => {
          this.router.navigate(['setup/finished']);
        },
        error: error =>{console.log(error);
          this.load = false}})
    }
    else{
      this.load = false
    }
  }
  openDialog() {
    const dialogRef = this.dialog.open(SetupBridgeIpComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
