import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthModule } from 'src/app/modules/auth/auth.module';
import { RegisterPageRoutingModule } from './register-routing.module';
import { RegisterPage } from './register.page';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterPageRoutingModule,
    AuthModule
  ],
  declarations: [RegisterPage]
})
export class RegisterPageModule {}
