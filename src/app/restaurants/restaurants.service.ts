import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { PagedList } from '../shared/pagedList';
import { Pagination } from '../shared/pagination';
import { Restaurant } from './restaurant.model';
import { RestaurantParams } from './restaurants-params';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {
  constructor(private http: HttpClient) {}

  restaurantsChanged = new Subject<PagedList<Restaurant>>();
  errorCatched = new Subject<string>();
  loading = new Subject<boolean>();
  paramsChanged = new Subject<RestaurantParams>();

  getRestaurants(restaurantsParams: RestaurantParams): void {
    this.loading.next(true);
    this.paramsChanged.next(restaurantsParams);
    const params: HttpParams = restaurantsParams.getHttpParams();

    this.fetchRestaurants(params).subscribe(
      (response: HttpResponse<Restaurant[]>) => {
        const pagination = response.headers.get('X-Pagination');
        const paginationData: Pagination = JSON.parse(pagination);

        const restaurants = new PagedList<Restaurant>(
          response.body,
          paginationData.currentPage,
          paginationData.totalPages,
          paginationData.totalCount,
          paginationData.hasPrevious,
          paginationData.hasNext
        );

        this.restaurantsChanged.next(restaurants);
        this.loading.next(false);
      },
      () => {
        this.errorCatched.next(
          'An error occurred while loading the restaurants'
        );

        this.loading.next(false);
      }
    );
  }

  private fetchRestaurants(
    params: HttpParams
  ): Observable<HttpResponse<Restaurant[]>> {
    return this.http.get<Restaurant[]>(
      'https://localhost:5001/api/Restaurants',
      {
        observe: 'response',
        params: params
      }
    );
  }

  addRestaurant(restaurant: Restaurant): Observable<Restaurant> {
    return this.http.post<Restaurant>(
      'https://localhost:5001/api/Restaurants',
      restaurant
    );
  }

  getRestaurantById(id: string): Observable<Restaurant> {
    return this.http.get<Restaurant>(
      `https://localhost:5001/api/Restaurants/${id}`
    );
  }

  deleteRestaurant(id: string): Observable<unknown> {
    return this.http.delete<unknown>(
      `https://localhost:5001/api/Restaurants/${id}`
    );
  }
}
