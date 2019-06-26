import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class UIService {

  snackbarDefaultOptions = {
    duration: 3000
  };

  constructor(
    private matSnackBar: MatSnackBar,
  ) {}

  showSnackbar(message: string, action?: string, settings?: object) {
    const options = Object.assign(this.snackbarDefaultOptions, settings);
    this.matSnackBar.open(message, action, options);
  }
}
