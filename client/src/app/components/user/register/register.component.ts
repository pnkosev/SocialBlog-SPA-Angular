import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  form: FormGroup;
  registerSub: Subscription;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.pattern(/\w{3,16}/)]],
      email: ['', [Validators.required, Validators.email]],
      passwords: this.fb.group({
        password: ['', [Validators.required, Validators.pattern(/\w{3,16}/)]],
        repeatPass: ['', [Validators.required, Validators.pattern(/\w{3,16}/)]]
      }, { validator: this.passwordValidator })
    });
  }

  passwordValidator(frm: FormGroup) {
    const password = frm.controls.password;
    const repreatPass = frm.controls.repeatPass;
    return password.value.length !== 0 && repreatPass && password.value !== repreatPass.value ? { invalidMatch: true } : null;
  }

  submitRegister() {
    if (this.form.valid) {
      this.registerSub = this.userService.register(this.form.value).subscribe();
      this.router.navigate(['/home']);
    }
  }

  get f() {
    return this.form.controls;
  }

  ngOnDestroy() {
    if (this.registerSub) {
      this.registerSub.unsubscribe();
    }
  }

}
