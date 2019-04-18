import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { UserService } from './../services/user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
    constructor(
        private userService: UserService,
        private router: Router,
        private toastr: ToastrService
    ) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.userService.isLoggedIn()) {
            return true;
        }
        this.toastr.error('Please log in to be able to proceed!');
        this.router.navigate(['/user/login']);
        return false;
    }

}
