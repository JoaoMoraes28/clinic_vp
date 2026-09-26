import { Component, input, OnInit, output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-location-ball',
  templateUrl: './location-ball.html',
})
export class LocationBall {
  index = input.required<number>();
  hourLabel = input.required<number>();
  scrollTo = output<number>();

  moveCarouselTo() {
    this.scrollTo.emit(this.index())
  }
}
