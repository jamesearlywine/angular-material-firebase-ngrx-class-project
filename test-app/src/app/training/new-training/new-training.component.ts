import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromRoot from 'src/app/shared/store/app.reducers';
import * as fromTraining from '../store/training.reducers';
import { Exercise } from 'src/app/training/exercise.model';

import { TrainingService } from 'src/app/training/training.service';
import { UIService } from 'src/app/shared/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {
  isLoading$: Observable<boolean>;

  exercises$: Observable<Exercise[]>;
  selectedExercise: Exercise;
  trainingType: any;

  constructor(
    public trainingService: TrainingService,
    public uiService: UIService,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.exercises$  = this.store.select(fromTraining.getAvailableExercises);
    this.trainingService.fetchAvailableExercises();
  }

  onClickStart(selectedId: string) {
    this.trainingService.startExercise(selectedId);
  }

  onClickTryAgain() {
    this.trainingService.fetchAvailableExercises();
  }
}
