import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RestaurantParams } from '../restaurants-params';
import { RestaurantsService } from '../restaurants.service';

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.scss']
})
export class AdvancedSearchComponent implements OnInit {
  searchForm: FormGroup;

  constructor(private restaurantsService: RestaurantsService) {}

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      name: new FormControl('', [Validators.maxLength(100)]),
      city: new FormControl('', [Validators.maxLength(35)]),
      category: new FormControl('', [Validators.maxLength(50)]),
      sortBy: new FormControl(''),
      sortDirection: new FormControl(0),
      delivery: new FormControl(false)
    });
  }

  onSearch(): void {
    const params = new RestaurantParams(
      4,
      1,
      this.searchForm.value.name.trim(),
      this.searchForm.value.city.trim(),
      this.searchForm.value.category.trim(),
      this.searchForm.value.delivery,
      this.searchForm.value.sortBy.trim(),
      this.searchForm.value.sortDirection
    );

    this.restaurantsService.setRestaurants(params);
  }

  onReset(): void {
    this.restaurantsService.setRestaurants(new RestaurantParams(4, 1));
    this.searchForm.reset();
  }
}
