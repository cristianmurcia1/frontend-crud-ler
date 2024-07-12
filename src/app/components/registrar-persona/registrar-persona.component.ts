import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { edadValidator } from '../../validators/edad-validator'
import { cedulaValidator } from '../../validators/cedula-validator';
import { PersonaService } from 'src/app/services/persona.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-registrar-persona',
  templateUrl: './registrar-persona.component.html',
  styleUrls: ['./registrar-persona.component.scss']
})
export class RegistrarPersonaComponent implements OnInit {
  // Formulario
  personForm: FormGroup;

  // Validar que la fecha de nacimiento no sea superior a la fecha actual
  todayDate = new Date();


  constructor(
    private _fb: FormBuilder,
    private personaService: PersonaService,
    private _dialogRef: MatDialogRef<RegistrarPersonaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.personForm = this._fb.group({
      nombre: ['', [Validators.required]],
      cedula: ['', [Validators.required, cedulaValidator]],
      fechaNacimiento: ['', [Validators.required, edadValidator]]
    });
  }

  ngOnInit(): void {
    this.personForm.patchValue(this.data);
  }

  submitForm() {  
    const formData = this.personForm.value;

    // Validación para identificar cuando se está modificando la información
    if (this.data && this.data.id) {
      // Agregar id para realizar la modificación de la persona
      formData.id = this.data.id;
    }

    this.personaService.registrarPersona(formData)
      .subscribe({
        next: (response) => {
          this._dialogRef.close(true);
        },
        error: (error) => {
          console.error('Error en el servidor -> ', error);
        }
      });
  }
}
