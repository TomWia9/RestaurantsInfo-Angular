import { Component, Input } from '@angular/core';
import { Pagination } from 'src/app/shared/pagination';
import { RestaurantParams } from '../../restaurants-params';
import { RestaurantsService } from '../../restaurants.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() paginationData: Pagination;
  @Input() restaurantsParams: RestaurantParams;

  constructor(private restaurantsService: RestaurantsService) {}

  onChangePage(pageNumber: number): void {
    this.restaurantsParams.pageNumber = pageNumber;
    this.restaurantsService.getRestaurants(this.restaurantsParams);
  }

  onNextPage(): void {
    this.restaurantsParams.pageNumber++;
    this.restaurantsService.getRestaurants(this.restaurantsParams);
  }

  onPreviousPage(): void {
    this.restaurantsParams.pageNumber--;
    this.restaurantsService.getRestaurants(this.restaurantsParams);
  }
}
