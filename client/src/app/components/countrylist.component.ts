import { Component, OnInit } from '@angular/core';
import { WineService } from '../wine.service'

@Component({
  selector: 'app-countrylist',
  templateUrl: './countrylist.component.html',
  styleUrls: ['./countrylist.component.css']
})
export class CountrylistComponent implements OnInit {
  countries: string[] = []

  constructor(private WineSvc: WineService) { }

  ngOnInit(): void {
    this.WineSvc.getCountries()
    .then(result => this.countries = result)
    .catch(e => console.error('error: ', e))
  }

}
