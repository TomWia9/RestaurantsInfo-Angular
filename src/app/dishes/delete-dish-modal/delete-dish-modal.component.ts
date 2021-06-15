import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MdbModalRef } from 'mdb-angular-ui-kit';
import { Subscription } from 'rxjs';
import { DishesService } from '../dishes.service';

@Component({
  selector: 'app-delete-dish-modal',
  templateUrl: './delete-dish-modal.component.html',
  styleUrls: ['./delete-dish-modal.component.scss']
})
export class DeleteDishModalComponent implements OnDestroy {
  error = '';
  restaurantId: string;
  dishId: string;
  deleteDishSubscription: Subscription;

  constructor(
    public modalRef: MdbModalRef<DeleteDishModalComponent>,
    private dishesService: DishesService,
    private router: Router
  ) {}

  onDelete(): void {
    this.deleteDishSubscription = this.dishesService
      .deleteDish(this.restaurantId, this.dishId)
      .subscribe(
        () => {
          this.modalRef.close();
          this.router.navigate(['']);
        },
        (error) => {
          this.error = error;
        }
      );
  }

  ngOnDestroy(): void {
    if (this.deleteDishSubscription) {
      this.deleteDishSubscription.unsubscribe();
    }
  }
}
