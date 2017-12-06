export interface Entity {
  url: URL;
  id: number;
}

export interface PaginatedResult<T> {
  count: number;
  next: string;
  previous: string;
  results: Array<T>;
}

export interface Place extends Entity {
  name: string;
  subdivisions: URL;
  subdivisionRoute: string;
}

export interface Region extends Place {
  subregions: URL;
  cities: URL;
}

export interface SubRegion extends Place {
  cities: URL;
}

export interface City extends Place {
  agendas: URL[];
  region: URL;
  subregion: URL;
}

export interface User {
  username: string;
}

export interface AgendaListItem extends Entity {
  city: URL;
  date: Date;
}

export interface Agenda extends Entity {
  new: boolean;
  land_area: number;
  population: number;
  financial_income: number;
  financial_income_per_capita: number;
  business_tax: number;
  cannabis_tax: number;
  dominant_political_stance: string;
  vote_percent_democrat: number;
  vote_percent_republican: number;
  approved_cannabis: boolean;
  prop_64_vote: boolean;
  vote_percent_prop_64: number;
  medical_use: boolean;
  cultivation_license: boolean;
  cultivation_allowed_areas: string;
  manufacturing_license: boolean;
  manufacturing_allowed_areas: string;
  retail_license: boolean;
  retail_allowed_areas: string;
  distribution_license: boolean;
  microbusiness_license: boolean;
  laboratory_license: boolean;
  cannabis_consultant_start_date: Date;
  other_localities_consulted: string;
  link_to_video: URL;
  date: Date;
  dateString: string
  notes: string;
  city: URL;
  cannabis_consultant: ConsultantCompany;
}


export interface ConsultantCompany extends Entity {
  name: string;
  address: string;
  postal_code: string;
  email: string;
  telephone_number: string;
  fax_number: string;
  notes: string;
}
