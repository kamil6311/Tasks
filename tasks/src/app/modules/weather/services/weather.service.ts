import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Weather } from '../models/weather';



@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private _currentWeather = new BehaviorSubject<Weather>(null);


  constructor(private _http: HttpClient) {

  }

  public searchWeatherData(latitude: number, longitude: number): Observable<any>{
    return this._http.get(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${environment.weatherApiKey}&units=metric`);

  }

  public get currentWeather(): Observable<Weather>{
    return this._currentWeather.asObservable();
  }

  public setCurrentWeather(latitude: number, longitude: number): void {
    this.searchWeatherData(latitude, longitude).subscribe(weatherData => {
      this._currentWeather.next(new Weather(weatherData.name, weatherData.weather[0].description, weatherData.main.temp))
    });
  }


}