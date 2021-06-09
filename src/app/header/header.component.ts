import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { DishesParams } from '../dishes/dishes-params';
import { DishesService } from '../dishes/dishes.service';
import { RestaurantParams } from '../restaurants/restaurants-params';
import { RestaurantsService } from '../restaurants/restaurants.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  searchForm: FormGroup;
  searchData = 'restaurants';
  restaurantId = '';
  user: User;
  userSubscription: Subscription;

  constructor(
    private restaurantsService: RestaurantsService,
    private dishesService: DishesService,
    private authService: AuthService,
    private router: Router
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/' || event.url === '/restaurants') {
          this.searchData = 'restaurants';
        }
        if (event.url.includes('restaurants/')) {
          this.searchData = 'details';
          const urlFragments = this.router.url.split('/');
          if (urlFragments[urlFragments.length - 2]) {
            this.restaurantId = urlFragments[urlFragments.length - 2];
          }
        }
      }
    });
  }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      name: new FormControl('', Validators.required)
    });

    this.userSubscription = this.authService.user.subscribe((user: User) => {
      this.user = user;
    });
  }

  onSearch(): void {
    if (this.searchData === 'restaurants') {
      this.restaurantsService.getRestaurants(
        new RestaurantParams(
          4,
          1,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          this.searchForm.value.name.trim()
        )
      );
    } else {
      this.dishesService.getDishes(
        new DishesParams(
          4,
          1,
          undefined,
          undefined,
          this.searchForm.value.name.trim()
        ),
        this.restaurantId
      );
    }

    this.searchForm.reset();
  }

  getSearchPlaceholder(): string {
    return this.searchData === 'restaurants'
      ? 'Search for restaurant'
      : 'Search for dishes';
  }

  onLogout(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
