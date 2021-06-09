import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Dish } from '../dish.model';
import { DishesService } from '../dishes.service';

@Component({
  selector: 'app-dish-details',
  templateUrl: './dish-details.component.html',
  styleUrls: ['./dish-details.component.scss']
})
export class DishDetailsComponent implements OnInit, OnDestroy {
  restaurantId = '';
  dish: Dish;
  dishSubscription: Subscription;
  constructor(
    private dishesService: DishesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.restaurantId = this.route.snapshot.parent.params['id'];

    this.route.params.subscribe((params) => {
      this.dishSubscription = this.dishesService
        .getDishById(this.restaurantId, params['id'])
        .subscribe((dish) => {
          this.dish = dish;
        });
    });
  }

  ngOnDestroy(): void {
    this.dishSubscription.unsubscribe();
  }
}
