import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MdbModalRef } from 'mdb-angular-ui-kit';
import { Observable, Subscription } from 'rxjs';
import { Dish } from '../dish.model';
import { DishesParams } from '../dishes-params';
import { DishesService } from '../dishes.service';

@Component({
  selector: 'app-edit-dish-modal',
  templateUrl: './edit-dish-modal.component.html',
  styleUrls: ['./edit-dish-modal.component.scss']
})
export class EditDishModalComponent implements OnInit, OnDestroy {
  restaurantId: string;
  dishId: string;
  updateMode = false;
  form: FormGroup;
  success = false;
  error = '';
  dishSubscription: Subscription;
  getDishSubscription: Subscription;
  action: Observable<unknown>;

  constructor(
    public modalRef: MdbModalRef<EditDishModalComponent>,
    private dishesService: DishesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.updateMode) {
      this.getDishSubscription = this.dishesService
        .getDishById(this.restaurantId, this.dishId)
        .subscribe((dish: Dish) => {
          this.createForm(dish);
        });
    } else {
      const dish = new Dish('', '', '', null);
      this.createForm(dish);
    }
  }

  onSubmit(): void {
    if (this.updateMode) {
      this.action = this.dishesService.updateDish(
        this.restaurantId,
        this.dishId,
        this.form.value as Dish
      );
    } else {
      this.action = this.dishesService.addDish(
        this.restaurantId,
        this.form.value as Dish
      );
    }

    this.dishSubscription = this.action.subscribe(
      () => {
        this.success = true;
        this.error = '';
        this.form.reset();
        this.dishesService.getDishes(new DishesParams(4, 1), this.restaurantId);
        //this.router.navigate(['']);
        this.modalRef.close();
      },
      (error) => {
        console.log(error);

        this.error = 'Something went wrong';
        this.success = false;
      }
    );
  }

  private createForm(dish: Dish): void {
    this.form = new FormGroup({
      name: new FormControl(dish.name, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30)
      ]),
      description: new FormControl(dish.description, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(500)
      ]),
      price: new FormControl(dish.price, [
        Validators.required,
        Validators.min(0.01)
      ])
    });
  }

  ngOnDestroy(): void {
    if (this.dishSubscription) {
      this.dishSubscription.unsubscribe();
    }

    if (this.getDishSubscription) {
      this.getDishSubscription.unsubscribe();
    }
  }
}
