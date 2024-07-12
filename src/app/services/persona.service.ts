import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private baseApi: string = environment.baseApi;

  constructor(private http: HttpClient) { }

  // Consultar personas
  obtenerPersonas() {
    return this.http.get<any>(`${this.baseApi}/usuarios`);
  }

  // Registrar persona
  registrarPersona(body: FormData) {
    return this.http.post<any>(`${this.baseApi}/usuarios`, body);
  }

  // Eliminar persona
  eliminarPersona(id: number) {
    return this.http.delete<object>(`${this.baseApi}/usuarios/${id}`);
  }


}
