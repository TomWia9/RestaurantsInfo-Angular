import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PagedList } from 'src/app/shared/pagedList';
import { Pagination } from 'src/app/shared/pagination';
import { Dish } from '../dish.model';
import { DishesParams } from '../dishes-params';
import { DishesService } from '../dishes.service';

@Component({
  selector: 'app-dishes-list',
  templateUrl: './dishes-list.component.html',
  styleUrls: ['./dishes-list.component.scss']
})
export class DishesListComponent implements OnInit, OnDestroy {
  restaurantId: string;
  error = '';
  loading = false;
  empty = false;
  dishes: PagedList<Dish>;
  dishesParams: DishesParams;
  dishesSubscription: Subscription;
  dishesParamsSubscription: Subscription;
  errorSubscription: Subscription;
  loadingSubscription: Subscription;

  constructor(
    private dishesService: DishesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.restaurantId = this.route.snapshot.params['id'];

    this.loadingSubscription = this.dishesService.loading.subscribe(
      (isLoading: boolean) => {
        this.loading = isLoading;
      }
    );

    this.dishesParamsSubscription = this.dishesService.paramsChanged.subscribe(
      (params: DishesParams) => {
        this.dishesParams = params;
      }
    );

    //get first page of all restaurant dishes from backend
    this.dishesService.getDishes(new DishesParams(4, 1), this.restaurantId);

    this.dishesSubscription = this.dishesService.dishesChanged.subscribe(
      (dishes: PagedList<Dish>) => {
        this.empty = dishes.totalCount === 0;
        this.dishes = dishes;
        console.log(this.empty);
      }
    );

    this.errorSubscription = this.dishesService.errorCatched.subscribe(
      (errorMessage) => {
        this.error = errorMessage;
      }
    );
  }

  getPaginationData(): Pagination {
    return {
      currentPage: this.dishes.currentPage,
      hasNext: this.dishes.hasNext,
      hasPrevious: this.dishes.hasPrevious,
      totalPages: this.dishes.totalPages,
      totalCount: this.dishes.totalCount
    };
  }

  ngOnDestroy(): void {
    this.dishesSubscription.unsubscribe();
    this.errorSubscription.unsubscribe();
    this.loadingSubscription.unsubscribe();
    this.dishesParamsSubscription.unsubscribe();
  }
}
