import { Empleado } from './../../models/empleado';
import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../../services/empleado.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css'],
})
export class EmpleadoComponent implements OnInit {
  constructor(public empleadoService: EmpleadoService) {}

  ngOnInit(): void {
    this.getEmpleados();
  }

  getEmpleados() {
    this.empleadoService.getEmpleados().subscribe(
      (res) => {
        this.empleadoService.empleados = res;
      },

      (err) => console.log(err)
    );
  }
  enviar(form: NgForm) {
    if (form.value._id) {
      this.empleadoService.putEmpleado(form.value).subscribe(
        (res) => console.log(res),
        (err) => console.error(err)
      );
      console.log('actualizando');
    } else {
      this.empleadoService.crearEmpleado(form.value).subscribe(
        (res) => {
          this.getEmpleados();
          form.reset();
          console.log(res);
        },
        (err) => console.error(err)
      );
    }
  }

/*   resetForm(form: NgForm) {
    form.reset();
  } */

  deleteEmpleado(id: string) {
    if (confirm('¿Seguro de eliminar usuario?')) {
      this.empleadoService.deleteEmpleado(id).subscribe(
        (res) => {
          this.getEmpleados();
        },
        (err) => console.error(err)
      );
    }
  }
  editEmpleado(empleado: Empleado) {
    this.empleadoService.seleccionado = empleado;
    console.log(empleado);
  }
}
