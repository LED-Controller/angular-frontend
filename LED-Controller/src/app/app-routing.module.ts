import { SetupBridgeComponent } from './setup-bridge/setup-bridge.component';
import { LampListComponent } from './lamp-list/lamp-list.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddLampsComponent } from './add-lamps/add-lamps.component';

const routes: Routes = [
  { path: 'setup', component: SetupBridgeComponent},
  { path: 'lamp-list', component: LampListComponent},
  { path: 'add-lamps', component: AddLampsComponent},
  { path: '', redirectTo: '/setup', pathMatch: 'full' },
  { path: 'setup/finished', redirectTo: '/lamp-list', pathMatch: 'full' },
  { path: 'lamp-list/add-lamps', redirectTo: 'add-lamps', pathMatch: 'full'},
  { path: 'lamp-list/home', redirectTo: 'lamp-list', pathMatch: 'full'},
  { path: 'add-lamps/home', redirectTo: 'lamp-list', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [SetupBridgeComponent, LampListComponent, AddLampsComponent]
