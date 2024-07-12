// Validación empleada en el formulario para verificar que el número de cédula sea válido

import { AbstractControl, ValidationErrors } from '@angular/forms';

export function cedulaValidator(control: AbstractControl): ValidationErrors | null {
  const cedula = control.value;
  // Mayor a cero
  const esNumeroValido = cedula > 0;
  // Longitud mayor a 4
  const esLongitudValida = cedula.toString().length > 4;

  if (!esNumeroValido || !esLongitudValida) {
    return { cedulaInvalida: 'Ingrese un número válido' };
  }

  return null;
}
