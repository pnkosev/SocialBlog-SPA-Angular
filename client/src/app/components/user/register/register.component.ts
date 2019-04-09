import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form;

  constructor(
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
      }, {validator: this.passwordValidator})
    });
  }

  passwordValidator(frm: FormGroup) {
    const password = frm.controls.password;
    const repreatPass = frm.controls.repeatPass;
    return password.value.length !== 0 && repreatPass && password.value !== repreatPass.value ? { invalidMatch: true } : null;
  }

  submitRegister() {
    console.log(this.form);
    this.router.navigate(['/home']);
  }

  get f() {
    return this.form.controls;
  }

}
