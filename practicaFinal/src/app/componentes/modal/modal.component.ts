import { DataApiService } from './../../servicios/data-api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Persona } from 'src/app/entidad/persona';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {


  persona: Persona = {
    id: 0,
    nombre: '',
    apellido: '',
    dni: 0,
  };
  constructor(private servicio: DataApiService, private rutaActiva: ActivatedRoute, private router: Router) {



   }


  ngOnInit() {
    this.rutaActiva.params.subscribe(data => {
      // tslint:disable-next-line: triple-equals
      if (data.id != '0') {

        this.getOne(data.id);

      }
    });

  }
  getOne(id: number) {
    this.servicio.getOne(id).subscribe(data => {
      this.persona = data;
    });
  }

  save() {
    this.rutaActiva.params.subscribe(data => {
      if (data.id === '0') {
        this.add();
      } else {
        this.update(data.id);
      }
    });
  }

  update(id: number) {
    this.servicio.put(id, this.persona).subscribe(data => {
      this.persona = data;
      this.router.navigate(['']);

    });

    }


  add() {
    this.servicio.post(this.persona).subscribe(data => {
      this.persona = data;
      this.router.navigate(['']);
    });
  }

}
