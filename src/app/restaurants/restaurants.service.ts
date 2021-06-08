import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse
} from '@angular/common/http';
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
      (error) => {
        console.log(error);
        this.errorCatched.next(
          'An error occurred while loading the restaurants'
        );
        if (error.status === 401) {
          //TODO redirect to /auth/login
        }
        this.loading.next(false);
      }
    );
  }

  fetchRestaurants(params: HttpParams): Observable<HttpResponse<Restaurant[]>> {
    return this.http.get<Restaurant[]>(
      'https://localhost:5001/api/Restaurants',
      {
        observe: 'response',
        //temp token
        headers: new HttpHeaders({
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyMTg2NzQ5Yi1lOGQxLTQ5OTUtOTE2NC0wOGQ5MjVhYTExYjYiLCJ1bmlxdWVfbmFtZSI6InRvbWFzendpYXRyb3dza2k5QGdtYWlsLmNvbSIsImp0aSI6IjlhNzM1YWY2LTI0YjktNGFlMi05ODUwLWViOTYxZDk0MGMyMCIsIm5hbWVpZCI6IjIxODY3NDliLWU4ZDEtNDk5NS05MTY0LTA4ZDkyNWFhMTFiNiIsInJvbGUiOiJVc2VyIiwibmJmIjoxNjIyNjI2NjYzLCJleHAiOjE2MjUyMTg2NjMsImlhdCI6MTYyMjYyNjY2MywiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NTAwMSJ9.hltykO2zoh_P_lhwFaw0uOz-I_rBNRhSt8kKceJqTXI'
        }),
        params: params
      }
    );
  }

  getRestaurantById(id: string): Observable<Restaurant> {
    return this.http.get<Restaurant>(
      `https://localhost:5001/api/Restaurants/${id}`,
      {
        headers: new HttpHeaders({
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyMTg2NzQ5Yi1lOGQxLTQ5OTUtOTE2NC0wOGQ5MjVhYTExYjYiLCJ1bmlxdWVfbmFtZSI6InRvbWFzendpYXRyb3dza2k5QGdtYWlsLmNvbSIsImp0aSI6IjlhNzM1YWY2LTI0YjktNGFlMi05ODUwLWViOTYxZDk0MGMyMCIsIm5hbWVpZCI6IjIxODY3NDliLWU4ZDEtNDk5NS05MTY0LTA4ZDkyNWFhMTFiNiIsInJvbGUiOiJVc2VyIiwibmJmIjoxNjIyNjI2NjYzLCJleHAiOjE2MjUyMTg2NjMsImlhdCI6MTYyMjYyNjY2MywiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NTAwMSJ9.hltykO2zoh_P_lhwFaw0uOz-I_rBNRhSt8kKceJqTXI'
        })
      }
    );
  }
}
