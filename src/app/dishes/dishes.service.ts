import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { PagedList } from '../shared/pagedList';
import { Pagination } from '../shared/pagination';
import { Dish } from './dish.model';
import { DishesParams } from './dishes-params';

@Injectable({
  providedIn: 'root'
})
export class DishesService {
  constructor(private http: HttpClient) {}

  private dishes: PagedList<Dish>;

  dishesChanged = new Subject<PagedList<Dish>>();
  errorCatched = new Subject<string>();
  loading = new Subject<boolean>();
  paramsChanged = new Subject<DishesParams>();

  getDishes(dishesParams: DishesParams, restaurantId: string): void {
    this.loading.next(true);
    this.paramsChanged.next(dishesParams);
    const params: HttpParams = dishesParams.getHttpParams();

    this.fetchDishes(params, restaurantId).subscribe(
      (response: HttpResponse<Dish[]>) => {
        const pagination = response.headers.get('X-Pagination');
        const paginationData: Pagination = JSON.parse(pagination);

        this.dishes = new PagedList<Dish>(
          response.body,
          paginationData.currentPage,
          paginationData.totalPages,
          paginationData.totalCount,
          paginationData.hasPrevious,
          paginationData.hasNext
        );

        this.dishesChanged.next(this.dishes);
        this.loading.next(false);
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
        this.loading.next(false);
      }
    );
  }

  fetchDishes(
    params: HttpParams,
    restaurantId: string
  ): Observable<HttpResponse<Dish[]>> {
    return this.http.get<Dish[]>(
      `https://localhost:5001/api/Restaurants/${restaurantId}/dishes`,
      {
        observe: 'response',
        params: params
      }
    );
  }

  getDishById(restaurantId: string, id: string): Observable<Dish> {
    return this.http.get<Dish>(
      `https://localhost:5001/api/Restaurants/${restaurantId}/dishes/${id}`
    );
  }
}
