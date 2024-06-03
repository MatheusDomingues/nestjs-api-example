export class PagedResponse<T> {
  data: T;
  count: number;

  constructor(data: T, count: number) {
    this.data = data;
    this.count = count;
  }
}
