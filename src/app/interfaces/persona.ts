export interface Persona {
  [prop:string]:any;

  id?: number;
  nombre: string;
  cedula: number;
  genero: string;
  fechaNacimiento: Date;
}

export interface ResAgregarPersona {
  [prop:string]:any;
  data: Persona,
  message: string
}
