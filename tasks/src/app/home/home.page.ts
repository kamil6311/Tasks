/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DatabaseService } from '../modules/database/database.service';
import { AddTaskComponent } from '../modules/tasks/components/add-task/add-task.component';
import { SettingsComponent } from '../modules/tasks/components/settings/settings.component';
import { Weather } from '../modules/weather/models/weather';
import { WeatherService } from '../modules/weather/services/weather.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public currentDate: string = new Date().toLocaleDateString('fr-FR', {weekday: 'long', month: 'long', day: 'numeric'});
  public modalOpened = false;
  public weatherIcon = 'partly-sunny-outline';
  public currentMeteoTemperature: number;
  public userBackgroundImageUrl: string = "../../assets/bg.jpg";

  constructor(
    private _modalCtrl: ModalController,
    private _weatherService: WeatherService,
    private _databse: DatabaseService
  ) {}

  public ngOnInit(): void {

    this.getCurrentWeather().subscribe();

    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        this._weatherService.setCurrentWeather(position.coords.latitude, position.coords.longitude);
      })
    }

    this._databse.getBackground().pipe(
      tap((resultUrl: string) => this.userBackgroundImageUrl = resultUrl),
    ).subscribe();
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
    this._databse.getBackground().pipe(
      tap((resultUrl: string) => this.userBackgroundImageUrl = resultUrl)
    ).subscribe();
  }

  public openSettings(): void {
    this._modalCtrl.create({
      component: SettingsComponent,
      swipeToClose: true
    }).then(modal => {
      modal.present();
      modal.onDidDismiss().then(() => {
        this._databse.getBackground().pipe(
          tap((resultUrl: string) => this.userBackgroundImageUrl = resultUrl)
        ).subscribe();
      });
    })
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
      })
    );
  }

}
