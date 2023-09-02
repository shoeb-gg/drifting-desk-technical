import { Component, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

import { WeatherService } from 'src/app/services/weather.service';

@Component({
    selector: 'app-data',
    templateUrl: './data.component.html',
    styleUrls: ['./data.component.scss'],
})
export class DataComponent implements OnDestroy {
    private _unsubscribeAll: Subject<void> = new Subject<void>();

    constructor(private readonly weatherService: WeatherService) {}

    public lat: number;
    public long: number;

    getWeatherData() {
        this.weatherService
            .getWeatherData(this.lat, this.long)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((r) => {
                console.log(r);

                this.weatherService.weatherData.next(r);
            });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
