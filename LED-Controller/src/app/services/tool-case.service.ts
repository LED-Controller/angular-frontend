import { Injectable } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ToolCaseService {

  constructor(private router: Router,
    private tokenStorageService: TokenStorageService,) { }

  changeIsOnState(event: MatSlideToggleChange):any{
    return event.checked
  }
  changeBrightness(event: any) {
    return event.value/1000;
  }
  logOut(){
    this.tokenStorageService.signOut();
    this.router.navigate(['/setup']);
  }
  isActive(error: any){
    if(error.status === 401){this.logOut()}
  }
}
