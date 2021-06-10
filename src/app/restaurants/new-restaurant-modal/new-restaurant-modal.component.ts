import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit';

@Component({
  selector: 'app-new-restaurant-modal',
  templateUrl: './new-restaurant-modal.component.html',
  styleUrls: ['./new-restaurant-modal.component.scss']
})
export class NewRestaurantModalComponent implements OnInit {
  form: FormGroup;
  success = false;
  error = '';

  constructor(public modalRef: MdbModalRef<NewRestaurantModalComponent>) {}

  ngOnInit(): void {
    this.createForm();
  }

  onSubmit(): void {
    console.log(this.form.value);
  }

  private createForm(): void {
    this.form = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
      category: new FormControl(''),
      hasDelivery: new FormControl(false),
      contactNumber: new FormControl(''),
      contactEmail: new FormControl(''),
      address: new FormGroup({
        city: new FormControl(''),
        street: new FormControl(''),
        houseNumber: new FormControl(''),
        postalCode: new FormControl('')
      })
    });
  }
}
