import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Subject } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromTraining from '../store/training.reducers';
import { Exercise } from 'src/app/training/exercise.model';

import { TrainingService } from 'src/app/training/training.service';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.scss']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  destroy$ = new Subject<void>();

  displayedColumns = [
    'date',
    'name',
    'duration',
    'calories',
    'state'
  ];

  dataSource = new MatTableDataSource<Exercise>();

  constructor(
    private trainingService: TrainingService,
    private store: Store<fromTraining.State>
  ) { }

  ngOnInit() {
    this.store.select(fromTraining.getFinishedExercises)
      .subscribe(finishedExercises => {
        this.dataSource.data = finishedExercises;
      })
    ;
    this.trainingService.fetchCompletedOrCancelledExercises();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
