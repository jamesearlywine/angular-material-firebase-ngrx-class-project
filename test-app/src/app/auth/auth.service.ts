import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

import { Store } from '@ngrx/store';
import * as fromRoot from 'src/app/shared/store/app.reducers';
import * as UIActions from 'src/app/shared/store/ui.actions';
import * as AuthActions from 'src/app/shared/store/auth.actions';

import { AuthData } from './auth-data.model';
import { UIService } from '../shared/ui.service';


@Injectable()
export class AuthService {

  constructor(
    private router: Router,
    private angularFireAuth: AngularFireAuth,
    private uiService: UIService,
    private store: Store<fromRoot.State>
  ) {
    this.init();
  }

  init() {
    this.subscribeToAuthListener();
  }


  subscribeToAuthListener() {
    this.angularFireAuth.authState.subscribe(user => {
      if (user) {
        this.store.dispatch(new AuthActions.LoggedIn());
      } else {
        this.store.dispatch(new AuthActions.LoggedOut());
      }
    });
  }



  registerUser(authData: AuthData) {
    this.store.dispatch(new UIActions.StartLoading());

    this.angularFireAuth.auth.createUserWithEmailAndPassword(
      authData.email,
      authData.password
    )
      .then(
        response => {
          this.router.navigate(['/training']);
        },
        error => {
          this.uiService.showSnackbar('Registration failed: ' + error.message);
        },
      )
      .finally(() => {
        this.store.dispatch(new UIActions.StopLoading());
      })
    ;
  }

  login(authData: AuthData) {
    this.store.dispatch(new UIActions.StartLoading());

    this.angularFireAuth.auth.signInWithEmailAndPassword(
      authData.email,
      authData.password
    )
      .then(
        response => {
          this.router.navigate(['/training']);
        },
        error => {
          this.uiService.showSnackbar('Login failed: ' + error.message);
        }
      )
      .finally(() => {
        this.store.dispatch(new UIActions.StopLoading());
      })
    ;
  }

  logout() {
    this.angularFireAuth.auth.signOut()
      .then(() => {
        this.router.navigate(['/']);
      })
    ;
  }

}
