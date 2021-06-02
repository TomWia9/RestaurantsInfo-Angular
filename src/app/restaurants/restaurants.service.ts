import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Restaurant } from './restaurants-list/restaurant.model';
import { RestaurantParams } from './restaurants-params';

@Injectable({
  providedIn: 'root',
})
export class RestaurantsService {
  constructor(private http: HttpClient) {}

  private restaurants: Restaurant[] = [];
  restaurantsChanged = new Subject<Restaurant[]>();

  getRestaurants(): Restaurant[] {
    return this.restaurants.slice();
  }

  setRestaurants(restaurantsParams: RestaurantParams): void {
    let params: HttpParams = this.setParams(restaurantsParams);

    this.fetchRestaurants(params).subscribe(
      (restaurants) => {
        console.log(restaurants);
        this.restaurants = restaurants;
        this.restaurantsChanged.next(restaurants.slice());
      },
      (error) => {
        console.log(error);
      }
    );
  }

  fetchRestaurants(params: HttpParams): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(
      'https://localhost:5001/api/Restaurants',
      {
        //temp token
        headers: new HttpHeaders({
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyMTg2NzQ5Yi1lOGQxLTQ5OTUtOTE2NC0wOGQ5MjVhYTExYjYiLCJ1bmlxdWVfbmFtZSI6InRvbWFzendpYXRyb3dza2k5QGdtYWlsLmNvbSIsImp0aSI6IjlhNzM1YWY2LTI0YjktNGFlMi05ODUwLWViOTYxZDk0MGMyMCIsIm5hbWVpZCI6IjIxODY3NDliLWU4ZDEtNDk5NS05MTY0LTA4ZDkyNWFhMTFiNiIsInJvbGUiOiJVc2VyIiwibmJmIjoxNjIyNjI2NjYzLCJleHAiOjE2MjUyMTg2NjMsImlhdCI6MTYyMjYyNjY2MywiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NTAwMSJ9.hltykO2zoh_P_lhwFaw0uOz-I_rBNRhSt8kKceJqTXI',
        }),
        params: params,
      }
    );
  }

  private setParams(restaurantParams: RestaurantParams): HttpParams {
    let params = new HttpParams();
    params = params.append('pageNumber', restaurantParams.pageNumber);
    params = params.append('pageSize', restaurantParams.pageSize);
    if (restaurantParams.hasDelivery !== undefined) {
      params = params.append('hasDelivery', restaurantParams.hasDelivery);
    }
    if (restaurantParams.sortDirection) {
      params = params.append('sortDirection', restaurantParams.sortDirection);
    }
    if (restaurantParams.sortBy) {
      params = params.append('sortBy', restaurantParams.sortBy);
    }
    if (restaurantParams.searchQuery) {
      params = params.append('searchQuery', restaurantParams.searchQuery);
    }

    return params;
  }
}
