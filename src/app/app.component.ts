import { Component, OnInit } from '@angular/core';
import { RestaurantsService } from './restaurants/restaurants.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(private restaurantsService: RestaurantsService){}

  ngOnInit(): void {
    //get all (1 page actually) restaurants from backend without any params
    this.restaurantsService.setRestaurants();
  }
}
