import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MdbModalRef } from 'mdb-angular-ui-kit';
import { Subscription } from 'rxjs';
import { RestaurantsService } from 'src/app/restaurants/restaurants.service';

@Component({
  selector: 'app-delete-restaurant-modal',
  templateUrl: './delete-restaurant-modal.component.html',
  styleUrls: ['./delete-restaurant-modal.component.scss']
})
export class DeleteRestaurantModalComponent implements OnDestroy {
  error = '';
  id: string;
  deleteRestaurantSubscription: Subscription;

  constructor(
    public modalRef: MdbModalRef<DeleteRestaurantModalComponent>,
    private restaurantsService: RestaurantsService,
    private router: Router
  ) {}

  onDelete(): void {
    this.deleteRestaurantSubscription = this.restaurantsService
      .deleteRestaurant(this.id)
      .subscribe(
        () => {
          this.modalRef.close();
          this.router.navigate(['']);
        },
        (error) => {
          console.log(error);

          this.error = error;
        }
      );
  }

  ngOnDestroy(): void {
    if (this.deleteRestaurantSubscription) {
      this.deleteRestaurantSubscription.unsubscribe();
    }
  }
}
