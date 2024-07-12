import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RegistrarPersonaComponent } from './components/registrar-persona/registrar-persona.component';
import { PersonaService } from './services/persona.service';
import { CoreService } from './core/core.service';
import { ModalConfirmarEliminarComponent } from './components/modal-confirmar-eliminar/modal-confirmar-eliminar.component';
import { Persona } from './interfaces/persona';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // Configuración tabla
  displayedColumns: string[] = ['nombre', 'cedula', 'genero', 'fechaNacimiento', 'modificar', 'eliminar'];
  dataSource!: MatTableDataSource<Persona>;
  searchValue: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private personaService: PersonaService,
    private coreService: CoreService
  ){}

  ngOnInit(): void {
    // Consultar personas al iniciar la aplicación
    this.obtenerPersonas();
  }
  
  // Consultar personas
  obtenerPersonas() {
    this.personaService.obtenerPersonas()
      .subscribe({
        next: (response) => {
          this.dataSource = new MatTableDataSource(response);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        error: (error) => {
          console.error('Error al consultar personas -> ', error);
        }
      });
  }

  // Realizar búsqueda en la tabla
  applyFilter(event: Event) {
    this.searchValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = this.searchValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Abrir ventana modal para agregar una persona
  openAddPersonForm() {
    const modalPersona = this.dialog.open(RegistrarPersonaComponent, {
      disableClose: true // Evitar que se cierre la modal al dar clic fuera de ella
    });
    modalPersona.afterClosed().subscribe({
      next: (response) => {
        if (response) {
          this.obtenerPersonas();
          this.coreService.openSnackBar('Persona creada exitosamente', 'snackbar-blue');
        }
      }
    });
  }

  // Abrir ventana modal para modificar la información de una persona
  openEditPersonForm(persona: Persona) {
    const modalPersona = this.dialog.open(RegistrarPersonaComponent, {
      data: persona,
      disableClose: true
    });
    modalPersona.afterClosed().subscribe({
      next: (response) => {
        if (response) {
          this.obtenerPersonas();
          this.coreService.openSnackBar('Información modificada exitosamente', 'snackbar-blue');
        }
      }
    });
  }

  confirmarEliminarPersona(persona: Persona) {
    const modalConfirmarEliminar = this.dialog.open(ModalConfirmarEliminarComponent, {
      data: persona,
      disableClose: true
    });
    modalConfirmarEliminar.afterClosed().subscribe({
      next: (response) => {
        if (response) {
          this.eliminarPersona(persona.id!)
        }
      }
    });
  }

  eliminarPersona(id: number) {
    this.personaService.eliminarPersona(id)
      .subscribe({
        next: (response) => {
          this.obtenerPersonas(); 
          this.coreService.openSnackBar('Persona eliminada exitosamente', 'snackbar-red');
        },
        error: (error) => {
          console.error('Error al eliminar la persona -> ', error);
        }
      });
  }
  
}
