/* eslint-disable no-underscore-dangle */
import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { ComponentBase } from '../modules/models/component-base/component-base.component';
import { SettingsComponent } from '../modules/settings/components/settings/settings.component';
import { BgImage } from '../modules/settings/models/BgImage';
import { SettingsService } from '../modules/settings/services/settings.service';
import { AddTaskComponent } from '../modules/tasks/components/add-task/add-task.component';
import { TasksComponent } from '../modules/tasks/components/tasks/tasks.component';
import { TasksService } from '../modules/tasks/services/tasks.service';
import { Weather } from '../modules/weather/models/Weather';
import { WeatherService } from '../modules/weather/services/weather.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage extends ComponentBase implements OnInit {

  @ViewChild(TasksComponent) private appTaskChild: TasksComponent

  private _loading: HTMLIonLoadingElement;

  public currentDate: string = new Date().toLocaleDateString('fr-FR', {weekday: 'long', month: 'long', day: 'numeric'});
  public modalOpened = false;
  public weatherIcon = 'partly-sunny-outline';
  public currentMeteoTemperature: number;
  public userBackgroundImageUrl: string = "../../assets/bg.jpg";

  constructor(
    private _modalCtrl: ModalController,
    private _weatherService: WeatherService,
    private _settingsService: SettingsService,
    private _tasksService: TasksService,
    private _loadingCtrl: LoadingController,
  ) {
    super();
  }

  public ngOnInit(): void {

    this.getCurrentWeather().subscribe();

    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        this._weatherService.setCurrentWeather(position.coords.latitude, position.coords.longitude);
      })
    }

    this.getBackground().subscribe();

    this.getTasksDb();
  }

  public onAddTaskClick(): void{
    this._modalCtrl.create({
      component: AddTaskComponent,
      swipeToClose: true,
    }).then(modal => {
        modal.present();
        this.modalOpened = true;
        modal.onDidDismiss().then((data) => {
          this.modalOpened = false;
          this.appTaskChild.refreshTasks();
        })
      }
    )
  }

  public doRefresh(event): void {
    console.log('Refreshing tasks...');
    this.getCurrentWeather().subscribe(
      () => {
        event.target.complete();
      }
    );

    this.getBackground().subscribe();

    this.appTaskChild.refreshTasks();
  }

  public openSettings(): void {
    this._modalCtrl.create({
      component: SettingsComponent,
      swipeToClose: true
    }).then(modal => {
      modal.present();
      modal.onDidDismiss().then(() => {
        this.getBackground().subscribe();
      });
    })
  }

  private getBackground(): Observable<BgImage>{
    return this._settingsService.getBackgroundImage().pipe(
      tap((result: BgImage) => {
        this.userBackgroundImageUrl = result.base64String;
      }),
      takeUntil(this.destroyed$)
    );
  }

  private getCurrentWeather(): Observable<any> {
    return this._weatherService.currentWeather.pipe(
      tap((currentWeather: Weather) => {
        if(currentWeather){
          console.log(currentWeather);
          this.currentMeteoTemperature = Math.floor(currentWeather.temperature +1);

          if(currentWeather.weather.includes('cloud')){
            this.weatherIcon = 'cloud-outline';
          }
          if(currentWeather.weather.includes('rain')){
            this.weatherIcon = 'thunderstorm-outline';
          }
          if(currentWeather.weather.includes('clear')){
            this.weatherIcon = 'partly-sunny-outline';
          }
          if(currentWeather.weather.includes('sun')){
            this.weatherIcon = 'sunny-outline';
          }
          if(new Date().getUTCHours() > 19) {
            this.weatherIcon = 'cloudy-night-outline';
          }
        }
      }),
      takeUntil(this.destroyed$)
    );
  }

  private async presentLoading(){
    this._loading = await this._loadingCtrl.create({
      message: "Chargement des données..."
    });

    this._loading.present();
  }

  private async getTasksDb() {
   await this.presentLoading();

   this._tasksService.getTasks().pipe(
     tap(() => {
       this._loading.dismiss();
     }),
     takeUntil(this.destroyed$)
   ).subscribe();
  }

}
