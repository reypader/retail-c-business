import {Injectable} from '@angular/core';
import {BackendService} from "./backend.service";
import {Observable} from "rxjs";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import {User} from "../types";
import {environment} from "../../environments/environment"


@Injectable()
export class SessionService {

  constructor(private backend: BackendService) {
  }

  getCurrentUser(): Observable<User> {
    return this.backend.getUrl('users').switchMap(url =>
      this.backend.get<User>(url + "/current").map(user => {
        if ((!user.username || user.username == '')) {
          window.location.href = "/login";
        }
        return user;
      }));
  }


}
