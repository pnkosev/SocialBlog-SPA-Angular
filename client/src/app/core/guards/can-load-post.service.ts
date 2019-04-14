import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { UserService } from './../services/user.service';

@Injectable({
    providedIn: 'root'
})
export class CanLoadPostService implements CanLoad {
    constructor(
        private userService: UserService,
        private router: Router,
        private toastr: ToastrService,
    ) { }
    canLoad(route: Route, segments: UrlSegment[]) {
        if (this.userService.isLoggedIn()) {
            return true;
        }

        this.toastr.error('Please log in in order to have access!');
        this.router.navigate(['/user/login']);
        return false;
    }
}
