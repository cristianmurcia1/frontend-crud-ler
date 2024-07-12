import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { RegistrarPersonaComponent } from './components/registrar-persona/registrar-persona.component';
import { PersonaService } from './services/persona.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'cedula', 'fechaNacimiento', 'modificar', 'eliminar'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private personaService: PersonaService
  ){}

  ngOnInit(): void {
    this.obtenerPersonas();
  }
  
  obtenerPersonas() {
    this.personaService.obtenerPersonas()
      .subscribe({
        next: (response) => {
          this.dataSource = new MatTableDataSource(response);
          console.log(this.dataSource.data.length);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        error: (error) => {
          console.error('Error al consultar personas -> ', error);
        }
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openAddPersonForm() {
    const modalPersona = this._dialog.open(RegistrarPersonaComponent)
    modalPersona.afterClosed().subscribe({
      next: (response) => {
        console.log(response);
        if (response) {
          this.obtenerPersonas();
        }
      }
    });
  }

  eliminarPersona(id: number) {
    this.personaService.eliminarPersona(id)
      .subscribe({
        next: (response) => {
          this.obtenerPersonas(); 
        },
        error: (error) => {
          console.error('Error al eliminar la persona -> ', error);
        }
      });
  }

  
}
