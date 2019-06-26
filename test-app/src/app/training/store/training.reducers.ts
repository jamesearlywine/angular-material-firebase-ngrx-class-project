import { Action, createFeatureSelector, createSelector } from '@ngrx/store';
import { TrainingActions, TRAINING_ACTIONS } from './training.actions';
import { Exercise } from '../exercise.model';
import * as fromRoot from 'src/app/shared/store/app.reducers';

export interface TrainingState {
  availableExercises: Exercise[];
  finishedExercises: Exercise[];
  activeExercise: Exercise;
}

export interface State extends fromRoot.State {
  training: TrainingState;
}

export const initialState: TrainingState = {
  availableExercises: [],
  finishedExercises: [],
  activeExercise: null
};

export function trainingReducers(state: TrainingState = initialState, action: TrainingActions) {

  switch (action.type) {

    case TRAINING_ACTIONS.SET_AVAILABLE_EXERCISES:
      return {
        ...state,
        availableExercises: action.payload
      };

    case TRAINING_ACTIONS.SET_FINISHED_EXERCISES:
      return {
        ...state,
        finishedExercises: action.payload
      };

    case TRAINING_ACTIONS.START_EXERCISE:
      return {
        ...state,
        activeExercise: {...state.availableExercises.find(ex => ex.id === action.payload)}
      };

    case TRAINING_ACTIONS.STOP_EXERCISE:
      return {
        ...state,
        activeExercise: null
      };

      default:
        return state;
  }
};

export const getTrainingState = createFeatureSelector<TrainingState>('training');

export const getAvailableExercises = createSelector(
  getTrainingState,
  (state: TrainingState) => state.availableExercises
);
export const getFinishedExercises = createSelector(
  getTrainingState,
  (state: TrainingState) => state.finishedExercises
);
export const getActiveExercise = createSelector(
  getTrainingState,
  (state: TrainingState) => state.activeExercise
);
export const getIsExercising = createSelector(
  getTrainingState,
  (state: TrainingState) => state.activeExercise != null
);




