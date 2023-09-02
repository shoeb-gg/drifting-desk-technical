import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {
    AfterViewInit,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { tap } from 'rxjs/internal/operators/tap';

import { WeatherService } from 'src/app/services/weather.service';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnDestroy, AfterViewInit {
    private _unsubscribeAll: Subject<void> = new Subject<void>();
    constructor(public readonly weatherService: WeatherService) {}

    @ViewChild(CdkVirtualScrollViewport) viewPort: CdkVirtualScrollViewport;

    public weatherData: any = [];

    coordinates = [
        [40.7128, -74.006], // New York City, USA
        [48.8566, 2.3522], // Paris, France
        [-33.8688, 151.2093], // Sydney, Australia
        [-22.9068, -43.1729], // Rio de Janeiro, Brazil
        [35.682839, 139.759455], // Tokyo, Japan
        [-33.9249, 18.4241], // Cape Town, South Africa
        [19.4326, -99.1332], // Mexico City, Mexico
        [30.0444, 31.2357], // Cairo, Egypt
        [55.7558, 37.6173], // Moscow, Russia
        [-34.6118, -58.4173], // Buenos Aires, Argentina
    ];

    ngOnInit(): void {
        this.weatherService.weatherData
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((r: any) => {
                if (r.main) {
                    const fetchedData = [...this.weatherData, r.main];

                    this.weatherData = fetchedData;
                    console.log(this.weatherData);
                }
            });

        this.weatherService
            .getWeatherData(this.coordinates[0][0], this.coordinates[0][1])
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((r: any) => {
                if (r) {
                    this.weatherService.weatherData.next(r);
                }
            });
    }

    ngAfterViewInit(): void {
        this.viewPort.scrolledIndexChange
            .pipe(
                tap((index: number) => {
                    this.getWeatherData(index);
                    console.log('index: ' + index);
                })
            )
            .subscribe();
    }

    getWeatherData(index: number) {
        console.log('load');

        this.weatherService
            .getWeatherData(
                this.coordinates[index][0],
                this.coordinates[index][1]
            )
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((r: any) => {
                // this.weatherData.push(r.main);

                // console.log(this.weatherData);

                this.weatherService.weatherData.next(r);
            });
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
