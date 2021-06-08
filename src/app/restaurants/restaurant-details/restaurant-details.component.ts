import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Restaurant } from '../restaurant.model';
import { RestaurantsService } from '../restaurants.service';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.scss']
})
export class RestaurantDetailsComponent implements OnInit {
  restaurant: Restaurant;
  constructor(
    private route: ActivatedRoute,
    private restaurantsService: RestaurantsService
  ) {}

  ngOnInit(): void {
    this.restaurantsService
      .getRestaurantById(this.route.snapshot.params['id'])
      .subscribe((restaurant: Restaurant) => {
        this.restaurant = restaurant;
      });
  }
}
