import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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

  onChangePage(direction: number): void {
    const pageNumber = (this.paginationData.currentPage += direction);
    this.restaurantsParams.pageNumber = pageNumber;
    this.restaurantsService.getRestaurants(this.restaurantsParams);
  }
}
