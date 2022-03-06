import { Login } from './../../interfaces/login';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConnectToBridgeComponent } from 'src/app/connect-to-bridge/connect-to-bridge.component';

@Component({
  selector: 'led-setup-bridge-dialog',
  templateUrl: './setup-bridge-dialog.component.html',
  styleUrls: ['./setup-bridge-dialog.component.scss']
})
export class SetupBridgeDialogComponent implements OnInit {
  hide = true;
  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');
  login={
    ipAdress: "",
    password: "",
  }

  constructor(fb: FormBuilder,
    public dialog: MatDialog) {
    this.options = fb.group({
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl,
    });
  }

  ngOnInit(): void {
  }
  openDialog() {
    const dialogRef = this.dialog.open(ConnectToBridgeComponent, {data: this.login});
  }
}
