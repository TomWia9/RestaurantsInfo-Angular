import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DishDetailsComponent } from './dishes/dish-details/dish-details.component';
import { DishesComponent } from './dishes/dishes.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';

const routes: Routes = [
  { path: '', redirectTo: '/restaurants', pathMatch: 'full' },
  { path: 'restaurants', component: RestaurantsComponent },
  {
    path: 'restaurants/:id',
    component: DishesComponent,
    children: [
      { path: '', redirectTo: 'details', pathMatch: 'full' },
      { path: 'details', component: DishDetailsComponent }
    ]
  },
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
