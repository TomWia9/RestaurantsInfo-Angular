import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { EditRestaurantModalComponent } from '../restaurants/edit-restaurant-modal/edit-restaurant-modal.component';
import { DeleteRestaurantModalComponent } from './delete-restaurant-modal/delete-restaurant-modal.component';
import { EditDishModalComponent } from './edit-dish-modal/edit-dish-modal.component';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.scss']
})
export class DishesComponent implements OnInit, OnDestroy {
  restaurantId = '';
  admin = false;
  userSubscription: Subscription;
  deleteRestaurantModalRef: MdbModalRef<DeleteRestaurantModalComponent>;
  updateRestaurantModalRef: MdbModalRef<EditRestaurantModalComponent>;
  addDishModalRef: MdbModalRef<EditDishModalComponent>;

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
    this.deleteRestaurantModalRef = this.modalService.open(
      DeleteRestaurantModalComponent,
      {
        data: { id: this.restaurantId }
      }
    );
  }

  onUpdateRestaurant(): void {
    this.updateRestaurantModalRef = this.modalService.open(
      EditRestaurantModalComponent,
      {
        modalClass: 'modal-lg',
        data: { updateMode: true, id: this.restaurantId }
      }
    );
  }

  onAddDish(): void {
    this.addDishModalRef = this.modalService.open(EditDishModalComponent, {
      data: { updateMode: false, restaurantId: this.restaurantId }
    });
  }
}
