import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  form;
  loginSub: Subscription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.pattern(/\w{3,16}/)]],
      password: ['', [Validators.required, Validators.pattern(/\w{3,16}/)]],
    });
  }

  submitLogin() {
    if (this.form.valid) {
      this.loginSub = this.userService.login(this.form.value).subscribe(_ => this.router.navigate(['/home']));
    }
  }

  get f() {
    return this.form.controls;
  }

  ngOnDestroy() {
    if (this.loginSub) {
      this.loginSub.unsubscribe();
    }
  }

}
