import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { CountrylistComponent } from './components/countrylist.component';
import { CountryComponent } from './components/country.component';
import { WineService } from './wine.service';

const ROUTES = [
  { path: '', component: CountrylistComponent },
  { path: 'country', component: CountryComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    AppComponent,
    CountrylistComponent,
    CountryComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    HttpClientModule
  ],
  providers: [WineService],
  bootstrap: [AppComponent]
})
export class AppModule { }
