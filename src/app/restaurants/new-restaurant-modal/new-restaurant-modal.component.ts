import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit';
import { Restaurant } from '../restaurant.model';
import { RestaurantParams } from '../restaurants-params';
import { RestaurantsService } from '../restaurants.service';

@Component({
  selector: 'app-new-restaurant-modal',
  templateUrl: './new-restaurant-modal.component.html',
  styleUrls: ['./new-restaurant-modal.component.scss']
})
export class NewRestaurantModalComponent implements OnInit {
  form: FormGroup;
  success = false;
  error = '';

  constructor(
    public modalRef: MdbModalRef<NewRestaurantModalComponent>,
    private restaurantsService: RestaurantsService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  onSubmit(): void {
    console.log(this.form.value as Restaurant);

    this.restaurantsService
      .addRestaurant(this.form.value as Restaurant)
      .subscribe(
        () => {
          this.success = true;
          this.error = '';
          this.form.reset();
          this.restaurantsService.getRestaurants(new RestaurantParams(4, 1));
        },
        () => {
          this.error = 'Something went wrong';
          this.success = false;
        }
      );
  }

  private createForm(): void {
    this.form = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30)
      ]),
      description: new FormControl('', [
        Validators.minLength(2),
        Validators.maxLength(500)
      ]),
      category: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30)
      ]),
      hasDelivery: new FormControl(false),
      contactNumber: new FormControl('', [
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(16)
      ]),
      contactEmail: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.minLength(4),
        Validators.maxLength(40)
      ]),
      address: new FormGroup({
        city: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30)
        ]),
        street: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50)
        ]),
        houseNumber: new FormControl('', [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(5)
        ]),
        postalCode: new FormControl('', [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(7)
        ])
      })
    });
  }
}
