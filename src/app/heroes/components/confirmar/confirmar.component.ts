import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
})
export class ConfirmarComponent {
  constructor(
    private dialogref: MatDialogRef<ConfirmarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Heroe
  ) {}

  borrar() {
    this.dialogref.close(true);
  }

  cancelar() {
    this.dialogref.close();
  }
}
