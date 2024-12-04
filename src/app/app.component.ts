import { Component, OnInit } from '@angular/core';
import { SwapiService } from './app.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MyFilterPipe } from './filterPipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, MyFilterPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Swapi-Demo';
  constructor(private swapiService: SwapiService) {}
  people = [];
  detail: any | undefined;
  searchTerm = '';
  filmList!: any[];

  ngOnInit() {
    console.log('onInit');
    this.getPeople();
    this.getFilms();
  }

  getPeople() {
    this.swapiService.getPeople().subscribe((data: any) => {
      this.people = data.results;
    });
  }

  showDetails(url: string) {
    this.swapiService.getDetails(url).subscribe((data: any) => {
      this.detail = data;
      this.getHomeworld(this.detail.homeworld);
      this.detail.filmString = this.getFilmDetails(this.detail.films);
    });
  }
  getHomeworld(url: string) {
    this.swapiService.getDetails(url).subscribe((data: any) => {
      this.detail.homeworldString = data.name;
    });
  }

  getFilms() {
    this.swapiService.getFilms().subscribe((data: any) => {
      this.filmList = data.results;
    });
  }

  getFilmDetails(films: string[]) {
    let retString = [];
    console.log('films', films);
    for (let i = 0; i < films.length; i++) {
      const idx = films[i].charAt(films[i].length - 2);
      console.log('idx', idx);
      const filmObj = this.filmList.find(
        (element) => element.episode_id == idx
      );
      retString.push({ title: filmObj.title });
    }
    console.log('retString', retString);
    return retString;
  }
}
