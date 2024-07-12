import { AbstractControl, ValidationErrors } from '@angular/forms';

export function edadValidator(control: AbstractControl): ValidationErrors | null {
  const fechaNacimiento = new Date(control.value);
  const today = new Date();
  let edad = today.getFullYear() - fechaNacimiento.getFullYear();
  const mes = today.getMonth() - fechaNacimiento.getMonth();
  const dia = today.getDate() - fechaNacimiento.getDate();

  // Ajusta la edad si el mes y día no han pasado aún en el año actual
  if (mes < 0 || (mes === 0 && dia < 0)) {
    edad--;
  }

  return edad >= 18 ? null : { menorDeEdad: true };
}
