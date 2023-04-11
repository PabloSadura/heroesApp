import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
})
export class AgregarComponent implements OnInit {
  constructor(private activateRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activateRoute.params.subscribe(({ id }) => console.log(id));
  }
}
