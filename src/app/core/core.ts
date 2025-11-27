import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class Core {
  constructor(private _snackBar: MatSnackBar) {}

  // Show success message
  openSnackBar(message: string, action: string = 'OK') {
    this._snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });
  }

  // Show error message
  showError(message: string, action: string = 'OK') {
    this._snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'top',
      panelClass: ['error-snackbar']
    });
  }
}