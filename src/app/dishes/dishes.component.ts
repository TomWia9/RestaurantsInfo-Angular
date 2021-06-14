import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { DeleteRestaurantModalComponent } from './delete-restaurant-modal/delete-restaurant-modal.component';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.scss']
})
export class DishesComponent implements OnInit, OnDestroy {
  restaurantId = '';
  admin = false;
  userSubscription: Subscription;
  modalRef: MdbModalRef<DeleteRestaurantModalComponent>;

  constructor(
    private authService: AuthService,
    private modalService: MdbModalService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.restaurantId = this.route.snapshot.params['id'];
    this.userSubscription = this.authService.user.subscribe((user: User) => {
      if (user) {
        this.admin = user.role === 'Administrator';
      }
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  onDeleteRestaurant(): void {
    this.modalRef = this.modalService.open(DeleteRestaurantModalComponent, {
      data: { id: this.restaurantId }
    });
  }
}
