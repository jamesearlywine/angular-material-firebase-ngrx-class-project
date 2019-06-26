import { Action } from '@ngrx/store';
import { AUTH_ACTIONS } from './auth.actions';

export interface State {
  isAuthenticated: boolean;
}

const initialState: State = {
  isAuthenticated: null
};

export function authReducer(oldState: State = initialState, action: Action) {
  let newState = oldState;

  switch (action.type) {

    case AUTH_ACTIONS.LOGGED_IN:
      newState = {
        isAuthenticated: true
      };
      break;

    case AUTH_ACTIONS.LOGGED_OUT:
      newState = {
        isAuthenticated: false
      };
      break;

    default:
      break;

  }

  return newState;
}

export const getIsAuthenticated = (state: State): boolean => state.isAuthenticated;

