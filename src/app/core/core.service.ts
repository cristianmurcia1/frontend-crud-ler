// Servicio encargado del snackbar
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(message: string, panelClass: string = '') {
    this._snackBar.open(message, '', {
      duration: 1500,
      panelClass: panelClass ? [panelClass] : []
    });
  }
}