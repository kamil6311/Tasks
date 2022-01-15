import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthModule } from '../modules/auth/auth.module';
import { AuthPageRoutingModule } from './auth-routing.module';
import { AuthPage } from './auth.page';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthPageRoutingModule,
    AuthModule
  ],
  declarations: [AuthPage]
})
export class AuthPageModule {}
