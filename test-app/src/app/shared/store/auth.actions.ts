import { Action } from '@ngrx/store';

export const AUTH_ACTIONS = {
  LOGGED_IN: '[AUTH] Logged In',
  LOGGED_OUT: '[AUTH] Logged Out',
};

export class LoggedIn implements Action {
  readonly type = AUTH_ACTIONS.LOGGED_IN;
}
export class LoggedOut implements Action {
  readonly type = AUTH_ACTIONS.LOGGED_OUT;
}

export type AuthAction = LoggedIn | LoggedOut;
