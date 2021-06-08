import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DishesParams } from '../dishes-params';
import { DishesService } from '../dishes.service';

@Component({
  selector: 'app-dishes-search',
  templateUrl: './dishes-search.component.html',
  styleUrls: ['./dishes-search.component.scss']
})
export class DishesSearchComponent implements OnInit {
  @Input() restaurantId = '';
  form: FormGroup;

  constructor(private dishesService: DishesService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      maximumPrice: new FormControl(null, [
        Validators.min(1.01),
        Validators.required
      ])
    });
  }

  onSearch(): void {
    this.dishesService.getDishes(
      new DishesParams(
        4,
        1,
        undefined,
        undefined,
        undefined,
        undefined,
        this.form.value.maximumPrice
      ),
      this.restaurantId
    );
  }

  onReset(): void {
    this.dishesService.getDishes(new DishesParams(4, 1), this.restaurantId);
    this.form.reset();
  }
}
