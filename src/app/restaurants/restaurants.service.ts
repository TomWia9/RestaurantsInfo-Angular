import { Injectable } from '@angular/core';
import { Restaurant } from './restaurants-list/restaurant.model';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

  // this will be replaced by data from backend in the future
  private restaurants: Restaurant[] = [
    new Restaurant(
      1,
      'Test restauratnt 1',
      'Test description 1',
      'Fast-Food',
      true,
      'test1@gmail.com',
      {
        city: 'Lublin',
        street: 'street',
        postCode: '12-345',
      }
    ),
    new Restaurant(
      2,
      'Test restauratnt 2',
      'Test description 2',
      'Fast-Food',
      false,
      'test2@gmail.com',
      {
        city: 'Poznan',
        street: 'street',
        postCode: '12-345',
      }
    ),
    new Restaurant(
      3,
      'Test restauratnt 3',
      'Test description 3',
      'Fast-Food',
      true,
      'test3@gmail.com',
      {
        city: 'Warsaw',
        street: 'street',
        postCode: '12-345',
      }
    ),
    new Restaurant(
      4,
      'Test restauratnt 4',
      'Test description 4',
      'Fast-Food',
      false,
      'test4@gmail.com',
      {
        city: 'Warsaw',
        street: 'street',
        postCode: '12-345',
      }
    ),
  ];
   
  constructor() { }

  getRestaurants(): Restaurant[]{
    return this.restaurants.slice();
  }
}
