import { AbstractControl, ValidationErrors } from '@angular/forms';

export function cedulaValidator(control: AbstractControl): ValidationErrors | null {
  const cedula = control.value;
  const esNumeroValido = cedula > 0;
  const esLongitudValida = cedula.toString().length > 4;

  if (!esNumeroValido || !esLongitudValida) {
    return { cedulaInvalida: 'Ingrese un número válido' };
  }

  return null;
}
