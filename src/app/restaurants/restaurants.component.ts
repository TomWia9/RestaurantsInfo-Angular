import { Component, OnDestroy, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { NewRestaurantModalComponent } from './new-restaurant-modal/new-restaurant-modal.component';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent implements OnInit, OnDestroy {
  admin = false;
  userSubscription: Subscription;
  modalRef: MdbModalRef<NewRestaurantModalComponent>;

  constructor(
    private authService: AuthService,
    private modalService: MdbModalService
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe((user: User) => {
      if (user) {
        this.admin = user.role === 'Administrator';
      }
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  onNewRestaurant(): void {
    this.modalRef = this.modalService.open(NewRestaurantModalComponent, {
      modalClass: 'modal-lg'
    });
  }
}
