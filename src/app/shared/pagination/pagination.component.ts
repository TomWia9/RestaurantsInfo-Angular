import { Component, Input } from '@angular/core';
import { DishesParams } from 'src/app/dishes/dishes-params';
import { DishesService } from 'src/app/dishes/dishes.service';
import { Pagination } from 'src/app/shared/pagination';
import { RestaurantParams } from '../../restaurants/restaurants-params';
import { RestaurantsService } from '../../restaurants/restaurants.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() paginationData: Pagination;
  @Input() params: RestaurantParams | DishesParams;
  @Input() restaurantId = '';

  constructor(
    private restaurantsService: RestaurantsService,
    private dishesService: DishesService
  ) {}

  onChangePage(pageNumber: number): void {
    this.params.pageNumber = pageNumber;
    this.getData();
  }

  onNextPage(): void {
    this.params.pageNumber++;
    this.getData();
  }

  onPreviousPage(): void {
    this.params.pageNumber--;
    this.getData();
  }

  private getData(): void {
    if (this.params instanceof RestaurantParams) {
      this.restaurantsService.getRestaurants(this.params);
    } else {
      this.dishesService.getDishes(this.params, this.restaurantId);
    }
  }
}
