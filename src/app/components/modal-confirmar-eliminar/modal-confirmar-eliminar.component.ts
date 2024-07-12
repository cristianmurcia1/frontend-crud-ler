import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-confirmar-eliminar',
  templateUrl: './modal-confirmar-eliminar.component.html',
  styleUrls: ['./modal-confirmar-eliminar.component.scss']
})
export class ModalConfirmarEliminarComponent {

  constructor(
    private _dialogRef: MatDialogRef<ModalConfirmarEliminarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

}
