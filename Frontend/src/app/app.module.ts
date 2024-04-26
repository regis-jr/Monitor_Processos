import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProcessListComponent } from './process-list/process-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProcessChartComponent } from './process-chart/process-chart.component';
import { MemoryChartComponent } from './memory-chart/memory-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    ProcessListComponent,
    ProcessChartComponent,
    MemoryChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
