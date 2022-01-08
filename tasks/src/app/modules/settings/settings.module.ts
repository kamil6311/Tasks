import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SettingsComponent } from './components/settings/settings.component';



@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule, IonicModule, FormsModule, ReactiveFormsModule
  ],
  exports: [SettingsComponent]
})
export class SettingsModule { }
