import { Component, OnDestroy, OnInit } from '@angular/core';
import { RestaurantParams } from '../restaurants-params';
import { RestaurantsService } from '../restaurants.service';
import { Restaurant } from './restaurant.model';

@Component({
  selector: 'app-restaurants-list',
  templateUrl: './restaurants-list.component.html',
  styleUrls: ['./restaurants-list.component.scss'],
})
export class RestaurantsListComponent implements OnInit, OnDestroy {
  restaurants: Restaurant[] = [];
  error = '';
  restaurantsSubscription: any;
  errorSubscription: any;

  constructor(private restaurantsService: RestaurantsService) {}

  ngOnInit(): void {

    //get first page of all restaurants from backend 
    this.restaurantsService.setRestaurants(new RestaurantParams(4,1));

    this.restaurantsSubscription = this.restaurantsService.restaurantsChanged.subscribe(restaurants => {
      this.restaurants = restaurants;
    });

    this.errorSubscription = this.restaurantsService.errorCatched.subscribe(errorMessage => {
      this.error = errorMessage;
    });

  }

  ngOnDestroy(){
    this.restaurantsSubscription.unsubscribe();
    this.errorSubscription.unsubscribe();
  }
}
