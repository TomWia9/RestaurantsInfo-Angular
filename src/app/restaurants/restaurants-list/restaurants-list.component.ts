import { Component, OnDestroy, OnInit } from '@angular/core';
import { RestaurantsService } from '../restaurants.service';
import { Restaurant } from './restaurant.model';

@Component({
  selector: 'app-restaurants-list',
  templateUrl: './restaurants-list.component.html',
  styleUrls: ['./restaurants-list.component.scss'],
})
export class RestaurantsListComponent implements OnInit, OnDestroy {
  restaurants: Restaurant[] = [];
  restaurantsSubscription: any;

  constructor(private restaurantsService: RestaurantsService) {}

  ngOnInit(): void {
    this.restaurantsSubscription = this.restaurantsService.restaurantsChanged.subscribe(restaurants => {
      this.restaurants = restaurants;
    });

  }

  ngOnDestroy(){
    this.restaurantsSubscription.unsubscribe();
  }
}
