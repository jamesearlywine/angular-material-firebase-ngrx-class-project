import { Action } from '@ngrx/store';

export const UI_ACTIONS = {
  START_LOADING: '[UI] Start Loading',
  STOP_LOADING: '[UI] Stop Loading'
};

export class StartLoading implements Action {
  readonly type = UI_ACTIONS.START_LOADING;
}
export class StopLoading implements Action {
  readonly type = UI_ACTIONS.STOP_LOADING;
}

export type UIAction = StartLoading | StopLoading;
