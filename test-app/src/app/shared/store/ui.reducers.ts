import { Action } from '@ngrx/store';
import { UI_ACTIONS } from './ui.actions';

export interface State {
  isLoading: boolean;
}

const initialState: State = {
  isLoading: false
};

export function uiReducer(oldState: State = initialState, action: Action) {
  let newState = oldState;

  switch (action.type) {
    case UI_ACTIONS.START_LOADING:
      newState = {
        isLoading: true
      };
      break;
    case UI_ACTIONS.STOP_LOADING:
      newState = {
        isLoading: false
      };
      break;
    default:
      break;
  }

  return newState;
}

export const getIsLoading = (state: State): boolean => state.isLoading;

