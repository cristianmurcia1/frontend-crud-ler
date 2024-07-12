import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { edadValidator } from '../../validators/edad-validator'
import { cedulaValidator } from '../../validators/cedula-validator';
import { PersonaService } from 'src/app/services/persona.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from 'src/app/core/core.service';

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
  title: string;


  constructor(
    private _fb: FormBuilder,
    private personaService: PersonaService,
    private coreService: CoreService,
    private _dialogRef: MatDialogRef<RegistrarPersonaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Configurar validaciones del formulario
    this.personForm = this._fb.group({
      nombre: ['', [Validators.required]],
      cedula: ['', [Validators.required, cedulaValidator]],
      genero: ['', [Validators.required]],
      fechaNacimiento: ['', [Validators.required, edadValidator]]
    });

    // Determinar el título de la modal (Agregar o Modificar)
    this.title = data ? 'Modificar información' : 'Agregar persona';
    if (data) {
      this.personForm.get('cedula')?.disable();
    }
  }

  ngOnInit(): void {
    // Cuando se recibe la información para modificar, se hace patchValue para mostrarla en el formulario
    this.personForm.patchValue(this.data);
  }

  // Enviar formulario -> Agregar o modificar persona
  submitForm() {
    const formData = this.personForm.value;
    // console.log(formData);
    // return;

    // Validación para identificar cuando se está modificando la información
    if (this.data && this.data.id) {
      // Agregar id para realizar la modificación de la persona
      formData.id = this.data.id;
      formData.cedula = this.data.cedula;
    }

    this.personaService.registrarPersona(formData)
      .subscribe({
        next: (response) => {
          this._dialogRef.close(true);
        },
        error: (error) => {
          this.coreService.openSnackBar(error.error.message, 'snackbar-red');
          console.error('Error en el servidor -> ', error);
        }
      });
  }
}
