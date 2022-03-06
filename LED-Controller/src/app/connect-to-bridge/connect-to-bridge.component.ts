import { LoginService } from './../services/login.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SetupBridgeDialogComponent } from '../setup-bridge/setup-bridge-dialog/setup-bridge-dialog.component';
import { Router } from '@angular/router';

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
  private router: Router) { }

  status = "init"
  ngOnInit(): void {
    this.loginService.getLoginData().subscribe({
      next: data => {
        console.log(data)
        this.status="success"
        this.weiterleitungRoutine("success");
      },
      error: error => {
        console.log(error.status);
        this.status="error";
        this.weiterleitungRoutine("error");
    }});
  }

  weiterleitungRoutine(staus: any){
    this.i = 0;
    let routine = setInterval(() => {
      console.log("drin")
      this.i=this.i+20
      if(this.i===100){
        if(staus === "success")
        {
          this.router.navigate(['setup/finished'])
          this.dialog.closeAll()
        }else
        {
          this.dialog.closeAll()
          const dialogRef = this.dialog.open(SetupBridgeDialogComponent);
        }
        clearTimeout(routine)
      }
    },500)

  }
}
