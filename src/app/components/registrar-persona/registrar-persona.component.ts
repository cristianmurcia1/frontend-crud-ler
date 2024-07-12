import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { edadValidator } from '../../validators/edad-validator'
import { cedulaValidator } from '../../validators/cedula-validator';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-registrar-persona',
  templateUrl: './registrar-persona.component.html',
  styleUrls: ['./registrar-persona.component.scss']
})
export class RegistrarPersonaComponent {
  // Formulario
  personForm: FormGroup;

  // Validar que la fecha de nacimiento no sea superior a la fecha actual
  todayDate = new Date();


  constructor(
    private _fb: FormBuilder,
    private personaService: PersonaService
  ) {
    this.personForm = this._fb.group({
      nombre: ['', [Validators.required]],
      cedula: ['', [Validators.required, cedulaValidator]],
      fechaNacimiento: ['', [Validators.required, edadValidator]]
    });
  }

  submitForm() {  
    this.personaService.registrarPersona(this.personForm.value)
      .subscribe({
        next: (response) => {
          console.log('Respuesta del servidor', response);
        },
        error: (error) => {
          console.error('Error en el servidor -> ', error);
        }
      });
  }
}
