// https://blog.angular-university.io/angular-jwt-authentication/

import { Component } from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup;
  showError = false;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) {
    this.form = this.fb.group({
      login: ['login', Validators.required],
      password: ['1', Validators.required]
    });
  }

  login(): void {
    const val = this.form.value;
    this.showError = false;

    if (val.login && val.password) {
      this.authService.login(val.login, val.password)
        .subscribe(
          (a) => {
            console.log('User is logged in', a);
            this.router.navigateByUrl('/todos').then(r => {
              console.log('LOGIN', r);
            });
          },
          err => {
            console.log(err);
            this.showError = true;
          }
        );
    }
  }
}
