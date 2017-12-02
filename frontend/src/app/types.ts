export interface PaginatedResult<T> {
  count: number;
  next: string;
  previous: string;
  results: Array<T>;
}

export interface Place {
  url: string;
  name: string;
}

export interface User {
  username: string;
}
