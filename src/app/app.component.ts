import { Component, OnInit } from '@angular/core';
import { RestaurantParams } from './restaurants/restaurants-params';
import { RestaurantsService } from './restaurants/restaurants.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(private restaurantsService: RestaurantsService){}

  ngOnInit(): void {
    //get first page of all restaurants from backend 
    this.restaurantsService.setRestaurants(new RestaurantParams(4,1));
  }
}
