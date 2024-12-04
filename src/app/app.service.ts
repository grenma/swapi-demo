import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SwapiService {
  _url = 'https://swapi.dev/api/people';
  _filmUrl = 'https://swapi.dev/api/films';

  constructor(private http: HttpClient) {}

  getPeople() {
    return this.http.get(`${this._url}`);
  }

  getDetails(url: string) {
    return this.http.get(url);
  }

  getFilms() {
    return this.http.get<any>(`${this._filmUrl}`);
  }
}
