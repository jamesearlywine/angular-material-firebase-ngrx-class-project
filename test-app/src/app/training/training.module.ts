import {  NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TrainingRoutingModule } from './training.routing.module';

import { StoreModule } from '@ngrx/store';
import { trainingReducers } from './store/training.reducers';

import { TrainingComponent } from './training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { StopTimerDialogComponent } from './current-training/stop-timer-dialog/stop-timer-dialog.component';


@NgModule({
  declarations: [
    TrainingComponent,
    PastTrainingsComponent,
    NewTrainingComponent,
    CurrentTrainingComponent,
    StopTimerDialogComponent,
  ],
  imports: [
    SharedModule,
    TrainingRoutingModule,
    StoreModule.forFeature('training', trainingReducers)
  ],
  exports: [],
  entryComponents: [StopTimerDialogComponent]
})
export class TrainingModule {}
