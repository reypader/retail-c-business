import {Injectable} from '@angular/core';
import {ResultListingService} from "./result-listing.service";
import {BackendService} from "./backend.service";
import {Agenda} from "../types";

@Injectable()
export class AgendaService extends ResultListingService<Agenda> {
  getType(): string {
    return "agendas";
  }

  constructor(backend: BackendService) {
    super(backend);
  }

}
