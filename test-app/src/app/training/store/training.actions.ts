import { Action } from '@ngrx/store';
import { Exercise } from 'src/app/training/exercise.model';

export const TRAINING_ACTIONS = {
  SET_AVAILABLE_EXERCISES: '[TRAINING] SET Available Exercises',
  SET_FINISHED_EXERCISES: '[TRAINING] SET Finished Exercises',
  START_EXERCISE: '[TRAINING] Start Exercise',
  STOP_EXERCISE: '[TRAINING] Stop Exercise',
};

export class SetAvailableExercises implements Action {
  readonly type = TRAINING_ACTIONS.SET_AVAILABLE_EXERCISES;
  constructor(public payload: Exercise[]) {}
}
export class SetFinishedExercises implements Action {
  readonly type = TRAINING_ACTIONS.SET_FINISHED_EXERCISES;
  constructor(public payload: Exercise[]) {}
}
export class StartExercise implements Action {
  readonly type = TRAINING_ACTIONS.START_EXERCISE;
  constructor(public payload: string) {}
}
export class StopExercise implements Action {
  readonly type = TRAINING_ACTIONS.STOP_EXERCISE;
  readonly payload = null;
}

export type TrainingActions = SetAvailableExercises | SetFinishedExercises | StartExercise | StopExercise;

