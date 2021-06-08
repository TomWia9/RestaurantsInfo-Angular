import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PagedList } from 'src/app/shared/pagedList';
import { Pagination } from 'src/app/shared/pagination';
import { RestaurantParams } from '../restaurants-params';
import { RestaurantsService } from '../restaurants.service';
import { Restaurant } from '../restaurant.model';

@Component({
  selector: 'app-restaurants-list',
  templateUrl: './restaurants-list.component.html',
  styleUrls: ['./restaurants-list.component.scss']
})
export class RestaurantsListComponent implements OnInit, OnDestroy {
  restaurants: PagedList<Restaurant>;
  error = '';
  loading = false;
  empty = true;
  restaurantsParams: RestaurantParams;
  restaurantsSubscription: Subscription;
  errorSubscription: Subscription;
  loadingSubscription: Subscription;
  restaurantsParamsSubscription: Subscription;

  constructor(private restaurantsService: RestaurantsService) {}

  ngOnInit(): void {
    this.loadingSubscription = this.restaurantsService.loading.subscribe(
      (isLoading) => {
        this.loading = isLoading;
      }
    );

    this.restaurantsParamsSubscription =
      this.restaurantsService.paramsChanged.subscribe(
        (params: RestaurantParams) => {
          this.restaurantsParams = params;
        }
      );

    //get first page of all restaurants from backend
    this.restaurantsService.getRestaurants(new RestaurantParams(4, 1));

    this.restaurantsSubscription =
      this.restaurantsService.restaurantsChanged.subscribe((restaurants) => {
        this.empty = restaurants.totalCount === 0;
        this.restaurants = restaurants;
      });

    this.errorSubscription = this.restaurantsService.errorCatched.subscribe(
      (errorMessage) => {
        this.error = errorMessage;
      }
    );
  }

  getPaginationData(): Pagination {
    return {
      currentPage: this.restaurants.currentPage,
      hasNext: this.restaurants.hasNext,
      hasPrevious: this.restaurants.hasPrevious,
      totalPages: this.restaurants.totalPages,
      totalCount: this.restaurants.totalCount
    };
  }

  ngOnDestroy(): void {
    this.restaurantsSubscription.unsubscribe();
    this.errorSubscription.unsubscribe();
    this.loadingSubscription.unsubscribe();
    this.restaurantsParamsSubscription.unsubscribe();
  }
}
