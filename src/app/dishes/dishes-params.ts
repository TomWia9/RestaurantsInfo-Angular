import { HttpParams } from '@angular/common/http';
import { Params } from '../shared/params';

export class DishesParams implements Params {
  constructor(
    public pageSize: number,
    public pageNumber: number,
    public sortBy?: string,
    public sortDirection?: number,
    public searchQuery?: string,
    public name?: string,
    public maximumPrice?: number
  ) {}

  getHttpParams(): HttpParams {
    let params = new HttpParams();
    params = params.append('pageNumber', this.pageNumber);
    params = params.append('pageSize', this.pageSize);

    if (this.name && this.name.trim() !== '') {
      params = params.append('name', this.name);
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
    if (this.maximumPrice) {
      params = params.append('maximumPrice', this.maximumPrice);
    }

    return params;
  }
}
