import { LoginService } from './../../services/login.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConnectToBridgeComponent } from 'src/app/connect-to-bridge/connect-to-bridge.component';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { SetupBridgeIpComponent } from '../setup-bridge-ip/setup-bridge-ip.component';

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
    ipAdress: this.ipAdress,
    password: "",
    pwStatus: false,
  }
  status = "init"
  i = 0;

  constructor(fb: FormBuilder,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public ipAdress: any,
    private tokenStorageService: TokenStorageService,
    private loginService: LoginService) {
    this.options = fb.group({
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl,
    });
  }

  ngOnInit(): void {
    this.loginService.getPasswordStatus().subscribe({
      next: data => {this.login.pwStatus = data.passwordIsAlreadySet;
        this.status="loaded";
      },
      error: error => {console.log(error);
      this.status="error";
      this.i = 0;
      let routine = setInterval(() => {
        this.i=this.i+20
        if(this.i===100){
          this.dialog.closeAll()
          const dialogRef = this.dialog.open(SetupBridgeIpComponent);
          clearTimeout(routine)
        }
      },500)

    },
    })
  }
  connectToBridge() {
    const dialogRef = this.dialog.open(ConnectToBridgeComponent, {data: this.login});
  }
}
