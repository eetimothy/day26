import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';

@Injectable()
export class WineService {
    constructor(private http: HttpClient) { }

    //same origin, httpclient request directed to localhost
    //dev an express to serve angular
    async getCountries() {
        return await this.http.get<string[]>('/countries').toPromise()
    }

    async getWines() {
        return await this.http.get<string>('wines').toPromise()
    }
}