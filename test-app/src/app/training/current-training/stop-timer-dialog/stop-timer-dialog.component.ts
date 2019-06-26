import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StopTimerDialogData } from './stop-timer-dialog-data.interface';

@Component({
  selector: 'app-stop-timer-dialog',
  templateUrl: './stop-timer-dialog.component.html',
  styleUrls: ['./stop-timer-dialog.component.scss']
})
export class StopTimerDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<StopTimerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StopTimerDialogData) {}

  ngOnInit() {
  }

}
