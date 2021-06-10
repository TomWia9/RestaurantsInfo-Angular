import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit';

@Component({
  selector: 'app-new-restaurant-modal',
  templateUrl: './new-restaurant-modal.component.html',
  styleUrls: ['./new-restaurant-modal.component.scss']
})
export class NewRestaurantModalComponent {
  constructor(public modalRef: MdbModalRef<NewRestaurantModalComponent>) {}
}
