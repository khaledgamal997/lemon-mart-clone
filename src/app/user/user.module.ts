import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LogoutComponent } from './logout/logout.component';
import { NavigationmenuComponent } from './navigationmenu/navigationmenu.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    LogoutComponent,
    NavigationmenuComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
