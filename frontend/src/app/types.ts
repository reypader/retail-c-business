export interface PaginatedResult<T> {
  count: number;
  next: string;
  previous: string;
  results: Array<T>;
}

export interface Place {
  url: URL;
  name: string;
  subdivisions: URL;
  subdivisionRoute: string;
  id: number;
}

export interface Region extends Place {
  subregions: URL;
  cities: URL;
}

export interface SubRegion extends Place {
  cities: URL;
}

export interface City extends Place {
  agendas: URL;
}

export interface User {
  username: string;
}
