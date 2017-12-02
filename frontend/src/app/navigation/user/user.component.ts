import {Component, OnInit} from '@angular/core';
import {SessionService} from "../../services/session.service";
import {User} from "../../types";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  currentUser: User;

  constructor(private sessionService: SessionService) {
    this.currentUser = {} as User
  }

  ngOnInit(): void {
    this.sessionService.getCurrentUser().subscribe(data => {
      this.currentUser = data;
    });
  }

}
