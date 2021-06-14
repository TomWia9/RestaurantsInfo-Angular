import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MdbModalRef } from 'mdb-angular-ui-kit';
import { Observable, Subscription } from 'rxjs';
import { Restaurant } from '../restaurant.model';
import { RestaurantParams } from '../restaurants-params';
import { RestaurantsService } from '../restaurants.service';

@Component({
  selector: 'app-edit-restaurant-modal',
  templateUrl: './edit-restaurant-modal.component.html',
  styleUrls: ['./edit-restaurant-modal.component.scss']
})
export class EditRestaurantModalComponent implements OnInit, OnDestroy {
  form: FormGroup;
  success = false;
  error = '';
  restaurantSubscription: Subscription;
  getRestaurantSubscription: Subscription;
  id: string; //if updateMode
  updateMode = false;
  action: Observable<unknown>;

  constructor(
    public modalRef: MdbModalRef<EditRestaurantModalComponent>,
    private restaurantsService: RestaurantsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.updateMode) {
      this.getRestaurantSubscription = this.restaurantsService
        .getRestaurantById(this.id)
        .subscribe((restaurant: Restaurant) => {
          this.createForm(restaurant);
        });
    } else {
      const restaurant = new Restaurant('', '', '', '', false, '', '', {
        city: '',
        street: '',
        houseNumber: '',
        postalCode: ''
      });
      this.createForm(restaurant);
    }
  }

  onSubmit(): void {
    if (this.updateMode) {
      this.action = this.restaurantsService.updateRestaurant(
        this.id,
        this.form.value as Restaurant
      );
    } else {
      this.action = this.restaurantsService.addRestaurant(
        this.form.value as Restaurant
      );
    }

    this.restaurantSubscription = this.action.subscribe(
      () => {
        this.success = true;
        this.error = '';
        this.form.reset();
        this.restaurantsService.getRestaurants(new RestaurantParams(4, 1));
        this.router.navigate(['']);
        this.modalRef.close();
      },
      () => {
        this.error = 'Something went wrong';
        this.success = false;
      }
    );
  }

  private createForm(restaurant: Restaurant): void {
    this.form = new FormGroup({
      name: new FormControl(restaurant.name, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30)
      ]),
      description: new FormControl(restaurant.description, [
        Validators.minLength(2),
        Validators.maxLength(500)
      ]),
      category: new FormControl(restaurant.category, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30)
      ]),
      hasDelivery: new FormControl(restaurant.hasDelivery),
      contactNumber: new FormControl(restaurant.contactNumber, [
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(16)
      ]),
      contactEmail: new FormControl(restaurant.contactEmail, [
        Validators.required,
        Validators.email,
        Validators.minLength(4),
        Validators.maxLength(40)
      ]),
      address: new FormGroup({
        city: new FormControl(restaurant.address.city, [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30)
        ]),
        street: new FormControl(restaurant.address.street, [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50)
        ]),
        houseNumber: new FormControl(restaurant.address.houseNumber, [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(5)
        ]),
        postalCode: new FormControl(restaurant.address.postalCode, [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(7)
        ])
      })
    });
  }

  ngOnDestroy(): void {
    if (this.restaurantSubscription) {
      this.restaurantSubscription.unsubscribe();
    }

    if (this.getRestaurantSubscription) {
      this.getRestaurantSubscription.unsubscribe();
    }
  }
}
