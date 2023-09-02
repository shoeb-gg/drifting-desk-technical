import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
    providedIn: 'root',
})
export class WeatherService {
    constructor(private readonly http: HttpClient) {}

    apiKey = '7a521b1ff6285fe7eabed9cc90b77148';

    public weatherData = new BehaviorSubject<any>({});

    url =
        'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}';

    getWeatherData(lat: number, long: number) {
        return this.http.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${this.apiKey}`
        );
    }
}
