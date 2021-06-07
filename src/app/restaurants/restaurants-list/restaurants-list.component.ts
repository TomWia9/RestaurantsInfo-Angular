import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PagedList } from 'src/app/shared/pagedList';
import { RestaurantParams } from '../restaurants-params';
import { RestaurantsService } from '../restaurants.service';
import { Restaurant } from './restaurant.model';

@Component({
  selector: 'app-restaurants-list',
  templateUrl: './restaurants-list.component.html',
  styleUrls: ['./restaurants-list.component.scss']
})
export class RestaurantsListComponent implements OnInit, OnDestroy {
  restaurants: PagedList<Restaurant>;
  error = '';
  loading = false;
  restaurantsSubscription: Subscription;
  errorSubscription: Subscription;
  loadingSubscription: Subscription;

  constructor(private restaurantsService: RestaurantsService) {}

  ngOnInit(): void {
    this.loadingSubscription = this.restaurantsService.loading.subscribe(
      (isLoading) => {
        this.loading = isLoading;
      }
    );

    //get first page of all restaurants from backend
    this.restaurantsService.setRestaurants(new RestaurantParams(4, 1));

    this.restaurantsSubscription =
      this.restaurantsService.restaurantsChanged.subscribe((restaurants) => {
        this.restaurants = restaurants;
        console.log(restaurants);
      });

    this.errorSubscription = this.restaurantsService.errorCatched.subscribe(
      (errorMessage) => {
        this.error = errorMessage;
      }
    );
  }

  ngOnDestroy(): void {
    this.restaurantsSubscription.unsubscribe();
    this.errorSubscription.unsubscribe();
    this.loadingSubscription.unsubscribe();
  }
}
