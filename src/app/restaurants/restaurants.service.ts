import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Restaurant } from './restaurants-list/restaurant.model';
import { RestaurantParams } from './restaurants-params';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {
  constructor(private http: HttpClient) {}

  private restaurants: Restaurant[] = [];
  restaurantsChanged = new Subject<Restaurant[]>();
  errorCatched = new Subject<string>();

  getRestaurants(): Restaurant[] {
    return this.restaurants.slice();
  }

  setRestaurants(restaurantsParams: RestaurantParams): void {
    const params: HttpParams = restaurantsParams.getHttpParams();

    this.fetchRestaurants(params).subscribe(
      (restaurants: Restaurant[]) => {
        console.log(restaurants);
        this.restaurants = restaurants;
        this.restaurantsChanged.next(restaurants.slice());
      },
      (error) => {
        console.log(error);
        this.errorCatched.next(
          'An error occurred while loading the restaurants'
        );
        if (error.status === 401) {
          console.log('401');

          //TODO redirect to /auth/login
        }
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
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyMTg2NzQ5Yi1lOGQxLTQ5OTUtOTE2NC0wOGQ5MjVhYTExYjYiLCJ1bmlxdWVfbmFtZSI6InRvbWFzendpYXRyb3dza2k5QGdtYWlsLmNvbSIsImp0aSI6IjlhNzM1YWY2LTI0YjktNGFlMi05ODUwLWViOTYxZDk0MGMyMCIsIm5hbWVpZCI6IjIxODY3NDliLWU4ZDEtNDk5NS05MTY0LTA4ZDkyNWFhMTFiNiIsInJvbGUiOiJVc2VyIiwibmJmIjoxNjIyNjI2NjYzLCJleHAiOjE2MjUyMTg2NjMsImlhdCI6MTYyMjYyNjY2MywiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NTAwMSJ9.hltykO2zoh_P_lhwFaw0uOz-I_rBNRhSt8kKceJqTXI'
        }),
        params: params
      }
    );
  }
}
