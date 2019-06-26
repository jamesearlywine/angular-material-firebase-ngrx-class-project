import { Injectable } from '@angular/core';

import { Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import * as fromRoot from 'src/app/shared/store/app.reducers';
import * as fromTraining from './store/training.reducers';
import * as UIActions from 'src/app/shared/store/ui.actions';
import * as TrainingActions from './store/training.actions';

import { Exercise } from './exercise.model';
import { AngularFirestore } from '@angular/fire/firestore';

import { UIService } from '../shared/ui.service';


@Injectable()
export class TrainingService {

  angularFireSubscriptions: Subscription[] = [];

  constructor(
    public angularFirestore: AngularFirestore,
    private uiService: UIService,
    private store: Store<fromTraining.State>
  ) {
    this.init();
  }

  init() {
    this.subscribeToAuth();
  }

  subscribeToAuth() {

    this.store.select(fromRoot.getIsAuthenticated)
      .subscribe(isAuthenticated => {
        if (isAuthenticated) {
          this.fetchAvailableExercises();
        } else {
          this.unsubscribeAngularFireSubscriptions();
        }
      })
    ;

  }
  fetchAvailableExercises() {
    this.store.dispatch(new UIActions.StartLoading());
    this.angularFireSubscriptions.push(
      this.angularFirestore
        .collection('availableExercises')
        .snapshotChanges()
        .pipe(
          map(docArray => {

            return docArray.map(doc => {
              return {
                id: doc.payload.doc.id,
                ...doc.payload.doc.data()
              } as Exercise;
            });

          })
        )
        .subscribe(
          availableExercises => {
            this.store.dispatch(new TrainingActions.SetAvailableExercises(availableExercises));
            this.store.dispatch(new UIActions.StopLoading());
          },
          error => {
            this.store.dispatch(new UIActions.StopLoading());
          },
        )
    );
  }

  unsubscribeAngularFireSubscriptions() {
    this.angularFireSubscriptions.forEach(subscription => subscription.unsubscribe());
  }

  startExercise(selectedId: string) {
    this.angularFirestore.doc('availableExercises/' + selectedId).update({lastSelected: new Date()});
    this.store.dispatch(new TrainingActions.StartExercise(selectedId));
  }

  completeExercise() {
    this.store.select(fromTraining.getActiveExercise)
      .pipe( take(1) )
      .subscribe((activeExercise: Exercise) => {
        this.addDataToDatabase({
          ...activeExercise,
          date: new Date(),
          state: 'completed'
        });

        this.store.dispatch(new TrainingActions.StopExercise());
      })
    ;
  }

  cancelExercise(progress: number) {
    this.store.select(fromTraining.getActiveExercise)
      .pipe( take(1) )
      .subscribe((activeExercise: Exercise) => {
        this.addDataToDatabase({
          ...activeExercise,
          duration: activeExercise.duration * (progress / 100),
          calories: activeExercise.calories * (progress / 100),
          date: new Date(),
          state: 'cancelled'
        });

        this.store.dispatch(new TrainingActions.StopExercise());
      })
    ;
  }

  private addDataToDatabase(exercise: Exercise) {
    this.angularFirestore.collection('finishedExercises').add(exercise);
  }

  fetchCompletedOrCancelledExercises() {
    this.store.dispatch(new UIActions.StartLoading());
    this.angularFireSubscriptions.push(
      this.angularFirestore
        .collection('finishedExercises')
        .valueChanges()
        .pipe(
          map(exercises => {
            return exercises.map((exercise: any) => {
              exercise.date = new Date(exercise.date.seconds * 1000);
              return exercise as Exercise;
            });
          })
        )
        .subscribe(
          (exercises: Exercise[]) => {
            this.store.dispatch(new UIActions.StopLoading());
            this.store.dispatch(new TrainingActions.SetFinishedExercises(exercises));
          },
          error => {
            this.store.dispatch(new UIActions.StopLoading());

            this.uiService.showSnackbar('Fetching Exercises failed, please try again later');

          }
        )
    );
  }

}
