import { Component, AfterViewInit } from '@angular/core';
declare var particlesJS: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit() {
    particlesJS.load('particles', '../assets/particles.json');
  }

}
