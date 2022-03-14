import { LoginService } from './../services/login.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SetupBridgeDialogComponent } from '../setup-bridge/setup-bridge-dialog/setup-bridge-dialog.component';
import { Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'led-connect-to-bridge',
  templateUrl: './connect-to-bridge.component.html',
  styleUrls: ['./connect-to-bridge.component.scss']
})
export class ConnectToBridgeComponent implements OnInit {

  i = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public login: any,
  private loginService: LoginService,
  public dialog: MatDialog,
  private router: Router,
  private tokenStorageService: TokenStorageService,) { }

  passwordIsSet=false;
  status = "init"
  ngOnInit(): void {

    this.loginService.getPasswordStatus().subscribe({
      next: data =>{
        this.passwordIsSet = data.passwordIsAlreadySet
        if(this.passwordIsSet){
          this.loginService.authenticate({password: this.login.password}).subscribe({
            next: data => {
              this.tokenStorageService.saveToken(data.token);
              this.tokenStorageService.saveUser(data.user);
              this.status="success"
              this.weiterleitungRoutine("success");
            },
            error: error => {
              console.log(error);
              this.status="error";
              this.weiterleitungRoutine("error");
          }});
        }
        if(!this.passwordIsSet){
          this.loginService.setPassword({password: this.login.password}).subscribe({
            next: data => {
              this.tokenStorageService.saveToken(data.token);
              this.tokenStorageService.saveUser(data.user);
              this.status="success"
              this.weiterleitungRoutine("success");
            },
            error: error => {
              console.log(error);
              this.status="error";
              this.weiterleitungRoutine("error");
          }});
        }
      },
      error: error =>{console.log(error);
        this.weiterleitungRoutine("error")}})
  }

  weiterleitungRoutine(staus: any){
    this.i = 0;
    let routine = setInterval(() => {
      this.i=this.i+20
      if(this.i===100){
        if(staus === "success"){
          this.router.navigate(['setup/finished'])
          this.dialog.closeAll()
        }
        if(staus === "error")
        {
          this.dialog.closeAll()
          const dialogRef = this.dialog.open(SetupBridgeDialogComponent, {data: this.login.ipAdress});
        }
        clearTimeout(routine)
      }
    },500)

  }
}
