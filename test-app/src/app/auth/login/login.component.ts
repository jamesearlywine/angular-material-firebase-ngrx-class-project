import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromRoot from 'src/app/shared/store/app.reducers';
import { AuthData } from 'src/app/auth/auth-data.model';

import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoading$: Observable<boolean>;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      email: ['', {validators: [Validators.required, Validators.email]}],
      password: ['', {validators: [Validators.required]}]
    });
  }

  login() {
    this.authService.login({
      email: this.form.value.email,
      password: this.form.value.password
    } as AuthData);
  }

}
