import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';
import { Dish } from '../dish.model';
import { DishesService } from '../dishes.service';
import { EditDishModalComponent } from '../edit-dish-modal/edit-dish-modal.component';

@Component({
  selector: 'app-dish-details',
  templateUrl: './dish-details.component.html',
  styleUrls: ['./dish-details.component.scss']
})
export class DishDetailsComponent implements OnInit, OnDestroy {
  restaurantId = '';
  dish: Dish;
  dishSubscription: Subscription;
  userSubscription: Subscription;
  modalRef: MdbModalRef<EditDishModalComponent>;
  admin = false;

  constructor(
    private dishesService: DishesService,
    private route: ActivatedRoute,
    private modalService: MdbModalService,
    private authService: AuthService
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

    this.userSubscription = this.authService.user.subscribe((user: User) => {
      if (user) {
        this.admin = user.role === 'Administrator';
      }
    });
  }

  onUpdateDish(): void {
    this.modalRef = this.modalService.open(EditDishModalComponent, {
      data: {
        updateMode: true,
        restaurantId: this.restaurantId,
        dishId: this.dish.id
      }
    });
  }

  ngOnDestroy(): void {
    this.dishSubscription.unsubscribe();
  }
}
