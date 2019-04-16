import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './../../../core/services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, DoCheck {
  isLoggedIn: boolean;
  isAdmin: boolean;
  username: string;

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.username = this.userService.username;
  }

  ngDoCheck() {
    this.isLoggedIn = this.userService.isLoggedIn();
    this.isAdmin = this.userService.isAdmin();
    this.username = this.userService.username;
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/home']);
  }

}
