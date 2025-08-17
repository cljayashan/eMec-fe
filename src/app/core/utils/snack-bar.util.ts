import { MatSnackBar } from '@angular/material/snack-bar';

export function snackBarSuccess(
  snackBar: MatSnackBar,
  message: string,
  duration: number = 3000
) {
  return snackBar.open(message, 'Close', {
    duration,panelClass: ['snackbar-success'],
  });
}

export function snackBarError(
  snackBar: MatSnackBar,
  message: string,
  duration: number = 3000
) {
  return snackBar.open(message, 'Close', {
    duration,panelClass: ['snackbar-error'],
  });
}

export function snackBarInfo(
  snackBar: MatSnackBar,
  message: string,
  duration: number = 3000
) {
return snackBar.open(message, 'Close',  {
    duration,
    panelClass: ['snackbar-info'],
});
}
export function snackBarWarning(
  snackBar: MatSnackBar,
  message: string,
  duration: number = 3000
) {
  return snackBar.open(message, 'Close', {
    duration,
    panelClass: ['snackbar-warning'],
  });
}