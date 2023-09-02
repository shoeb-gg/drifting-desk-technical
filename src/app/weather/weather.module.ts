import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeatherRoutingModule } from './weather-routing.module';
import { FormComponent } from './form/form.component';
import { DataComponent } from './data/data.component';
import { WeatherComponent } from './weather.component';
import { FormsModule } from '@angular/forms';

import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
    declarations: [WeatherComponent, FormComponent, DataComponent],
    imports: [CommonModule, WeatherRoutingModule, FormsModule, ScrollingModule],
})
export class WeatherModule {}
