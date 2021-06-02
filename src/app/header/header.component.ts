import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RestaurantParams } from '../restaurants/restaurants-params';
import { RestaurantsService } from '../restaurants/restaurants.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  searchForm: any;

  constructor(private restaurantsService: RestaurantsService) {}

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      restaurantName: new FormControl(null, Validators.required),
    });
  }

  onSearch(): void {
    //TODO depending on the route search for restaurants or dishes
    this.restaurantsService.setRestaurants(
      new RestaurantParams(
        4,
        1,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        this.searchForm.value.restaurantName
      )
    );
    this.searchForm.reset();
  }
}
