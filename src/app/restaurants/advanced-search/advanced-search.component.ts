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
      name: new FormControl(null, [Validators.maxLength(100)]),
      city: new FormControl(null, [Validators.maxLength(35)]),
      category: new FormControl(null, [Validators.maxLength(50)]),
      sortBy: new FormControl(null),
      sortDirection: new FormControl(null),
      delivery: new FormControl(false)
    });
  }

  //TODO refactor
  onSearch(): void {
    const delivery = this.searchForm.value.delivery;
    const name = this.searchForm.value.name;
    const city = this.searchForm.value.city;
    const category = this.searchForm.value.category;
    const sortBy = this.searchForm.value.sortBy;
    const sortDirection = this.searchForm.value.sortDirection;

    const params = new RestaurantParams(
      4,
      1,
      name === null || '' ? undefined : name,
      city === null || '' ? undefined : city,
      category === null || '' ? undefined : category,
      delivery === false ? undefined : true,
      sortBy === null || '' ? undefined : sortBy,
      sortDirection === null || '' ? undefined : sortDirection,
      undefined
    );
    console.log(params);

    this.restaurantsService.setRestaurants(params);
  }

  onReset(): void {
    this.restaurantsService.setRestaurants(new RestaurantParams(4, 1));
    this.searchForm.reset();
  }
}
