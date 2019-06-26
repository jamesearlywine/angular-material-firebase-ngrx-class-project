import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';

import { Subject, Observable } from 'rxjs';
import { takeUntil, filter, take } from 'rxjs/operators';

import { MatDialog, MatDialogRef } from '@angular/material';
import { StopTimerDialogComponent } from './stop-timer-dialog/stop-timer-dialog.component';
import { StopTimerDialogData } from './stop-timer-dialog/stop-timer-dialog-data.interface';

import { Store } from '@ngrx/store';
import * as fromTraining from '../store/training.reducers';
import { Exercise } from 'src/app/training/exercise.model';

import { TrainingService } from 'src/app/training/training.service';

export interface DialogData {
  response: Subject<boolean>;
}

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit, OnDestroy {

  // @Output() trainingExit = new EventEmitter<void>();

  private destroy$ = new Subject<void>();
  private timer$ = new Subject<void>();

  selectedExercise$: Observable<Exercise>;

  progress: number;
  progressIncrement = 1;
  timer: number;
  timerInterval: number;
  paused = false;

  dialogRef: MatDialogRef<StopTimerDialogComponent>;

  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService,
    private store: Store<fromTraining.State>
  ) { }

  ngOnInit() {
    this.progress = 0;

    this.timer$
      .pipe(takeUntil(this.destroy$))
      .pipe( filter(() => !this.paused) )
      .subscribe(() => this.onTick() )
    ;

    this.selectedExercise$ = this.store.select(fromTraining.getActiveExercise);
    this.selectedExercise$
      .pipe( take(1) )
      .subscribe(selectedExercise => {
        this.timerInterval = selectedExercise.duration / 100 * 1000;
        this.startTimer();
      })
    ;
  }

  ngOnDestroy() {
    this.destroy$.next();
  }


  startTimer() {
    this.stopTimer();
    this.paused = false;
    this.timer = window.setInterval(() => this.timer$.next(), this.timerInterval);
  }
  stopTimer() {
    if (this.timer !== undefined) {
      clearInterval(this.timer);
      this.timer = undefined;
    }
  }
  pauseTimer() { this.paused = true; }
  unpauseTimer() { this.paused = false; }

  onTick() {
    this.progress += this.progressIncrement;
    if (this.progress >= 100) {
      this.onExerciseComplete();
    }
  }

  onExerciseComplete() {
    this.stopTimer();
    this.trainingService.completeExercise();
  }


  onClickStop() {
    this.pauseTimer();
    this.openStopConfirmationDialog()
      .afterClosed()
        .pipe(takeUntil(this.destroy$))
        .subscribe(confirmation => {
          if (confirmation) {
            this.onStopConfirmed();
          } else {
            this.onStopNotConfirmed();
          }
        })
    ;
  }
  onStopConfirmed() {
    this.stopTimer();
    this.trainingService.cancelExercise(this.progress);
  }
  onStopNotConfirmed() {
    this.unpauseTimer();
  }
  openStopConfirmationDialog() {
    this.dialogRef = this.dialog.open(StopTimerDialogComponent, {
      width: '320px',
      data: {progress: this.progress} as StopTimerDialogData
    });

    return this.dialogRef;
  }

}

