import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { DishDetailsStartComponent } from './dishes/dish-details/dish-details-start/dish-details-start.component';
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
      { path: 'details', component: DishDetailsStartComponent },
      { path: 'details/:id', component: DishDetailsComponent }
    ]
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent }
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
