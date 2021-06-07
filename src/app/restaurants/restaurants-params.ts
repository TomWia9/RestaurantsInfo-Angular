import { HttpParams } from '@angular/common/http';
import { Params } from '../shared/params';

export class RestaurantParams implements Params {
  constructor(
    public pageSize: number,
    public pageNumber: number,
    public name?: string,
    public city?: string,
    public category?: string,
    public hasDelivery?: boolean,
    public sortBy?: string,
    public sortDirection?: number,
    public searchQuery?: string
  ) {}

  getHttpParams(): HttpParams {
    let params = new HttpParams();
    params = params.append('pageNumber', this.pageNumber);
    params = params.append('pageSize', this.pageSize);

    if (this.name && this.name.trim() !== '') {
      params = params.append('name', this.name);
    }
    if (this.city && this.city.trim() !== '') {
      params = params.append('city', this.city);
    }
    if (this.category && this.category.trim() !== '') {
      params = params.append('category', this.category);
    }
    if (this.hasDelivery) {
      params = params.append('hasDelivery', this.hasDelivery);
    }
    if (this.sortDirection) {
      params = params.append('sortDirection', this.sortDirection);
    }
    if (this.sortBy && this.sortBy.trim() !== '') {
      params = params.append('sortBy', this.sortBy);
    }
    if (this.searchQuery && this.searchQuery.trim() !== '') {
      params = params.append('searchQuery', this.searchQuery);
    }

    return params;
  }
}
