import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SettingsModule } from '../modules/settings/settings.module';
import { TasksModule } from '../modules/tasks/tasks.module';
import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    TasksModule,
    SettingsModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
