import { DataApiService } from './../../servicios/data-api.service';
import { Persona } from './../../entidad/persona';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {

  personas: Persona []=[];
  isLogged=true;

  constructor(private servicio: DataApiService, private router: Router) { }

  ngOnInit() {
  this.getAll();
  }



  getAll() {
    this.servicio.getAll().subscribe(data => {
      this.personas = data;
      console.log(this.personas);
    });
  }

  delete(id: number) {
    const opcion = confirm('¿Está seguro que deseas confirmar el evento?');
    if (opcion === true) {
      this.servicio.delete(id).subscribe(data => {
        console.log(data);
        alert('Registro Eliminado');
        location.reload();
      });
    }
  }
  // Agregar
  agregar(idPersona: number) {
    this.router.navigate(['persona/' + idPersona]);
  }
  // ACTUALIZAR
  update(idPersona: number) {
    this.router.navigate(['persona/' + idPersona]);
  }
}
