import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegistrarPersonaComponent } from './components/registrar-persona/registrar-persona.component';
import { PersonaService } from './services/persona.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend-crud';

  constructor(
    private _dialog: MatDialog,
    private personaService: PersonaService
  ){}

  ngOnInit(): void {
    this.personaService.obtenerPersonas()
      .subscribe({
        next: (response) => {
          console.log('Personas -> ', response);
        },
        error: (error) => {
          console.error('Error al consultar personas -> ', error);
        }
      });
  }

  openAddEditPersonForm() {
    this._dialog.open(RegistrarPersonaComponent)
  }
}
