import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form;

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
    this.userService.login(this.form.value).subscribe((data) => {
      console.log(data);
      localStorage.setItem('authToken', data['token']);
      localStorage.setItem('username', data['username']);
      localStorage.setItem('isAdmin', data['isAdmin']);
    });
    this.router.navigate(['/home']);
  }

  get f() {
    return this.form.controls;
  }

}
