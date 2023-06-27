import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { SideNavComponent } from './components/side-nav/side-nav.component';



@NgModule({
  declarations: [  SideNavComponent ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
  ],
  exports: [
    SideNavComponent,
  ]
})
export class SharedModule { }
