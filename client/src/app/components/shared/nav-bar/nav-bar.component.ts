import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './../../../core/services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements DoCheck {
  isLoggedIn: boolean;

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngDoCheck() {
    this.isLoggedIn = this.userService.isLoggedIn();
  }

  logout() {
    this.userService.logout().subscribe();
    this.router.navigate(['/home']);
    localStorage.clear();
  }

}
