export class PagedList<T> {
  constructor(
    public items: T[] = [],
    public currentPage: number,
    public totalPages: number,
    public totalCount: number,
    public hasPrevious: boolean,
    public hasNext: boolean
  ) {}
}
