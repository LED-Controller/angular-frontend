import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { SetupBridgeDialogComponent } from '../setup-bridge-dialog/setup-bridge-dialog.component';

@Component({
  selector: 'led-setup-bridge-ip',
  templateUrl: './setup-bridge-ip.component.html',
  styleUrls: ['./setup-bridge-ip.component.scss']
})
export class SetupBridgeIpComponent implements OnInit {

  constructor(private tokenStorageService: TokenStorageService,
    public dialog: MatDialog,) { }

  ipAdress= this.tokenStorageService.getIp();

  ngOnInit(): void {
  }
  testConnection(){

    const dialogRef = this.dialog.open(SetupBridgeDialogComponent,{data: this.ipAdress});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
