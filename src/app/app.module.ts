import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MdbModule } from 'mdb-angular-ui-kit';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { RestaurantsListComponent } from './restaurants/restaurants-list/restaurants-list.component';
import { PaginationComponent } from './shared/pagination/pagination.component';
import { AdvancedSearchComponent } from './restaurants/advanced-search/advanced-search.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DishesComponent } from './dishes/dishes.component';
import { RestaurantDetailsComponent } from './restaurants/restaurant-details/restaurant-details.component';
import { DishesListComponent } from './dishes/dishes-list/dishes-list.component';
import { EmptyListInfoComponent } from './shared/empty-list-info/empty-list-info.component';
import { DishesSearchComponent } from './dishes/dishes-search/dishes-search.component';
import { DishDetailsComponent } from './dishes/dish-details/dish-details.component';
import { DishDetailsStartComponent } from './dishes/dish-details/dish-details-start/dish-details-start.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthComponent } from './auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RestaurantsComponent,
    RestaurantsListComponent,
    PaginationComponent,
    AdvancedSearchComponent,
    LoadingSpinnerComponent,
    PageNotFoundComponent,
    DishesComponent,
    RestaurantDetailsComponent,
    DishesListComponent,
    EmptyListInfoComponent,
    DishesSearchComponent,
    DishDetailsComponent,
    DishDetailsStartComponent,
    AuthComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MdbModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
