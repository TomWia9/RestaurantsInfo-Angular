
//TODO create enum for sortDirection
export class RestaurantParams{
    constructor(public pageSize: number, public pageNumber: number, public hasDelivery?: boolean, public sortBy?: string, public sortDirection?: number, public searchQuery?: string){}
}